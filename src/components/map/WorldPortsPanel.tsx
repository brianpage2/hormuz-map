"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { WorldPortContact, WorldPortsResponse } from "@/app/api/world-ports/route";

const PAGE_SIZE = 8;

type SearchFields = {
  nation: string;
  harbor: string;
  engn: string;
  site: string;
};

const EMPTY_FIELDS: SearchFields = {
  nation: "",
  harbor: "",
  engn: "",
  site: "",
};

function normalizeSiteUrl(site: string) {
  if (!site) {
    return "";
  }

  if (/^https?:\/\//i.test(site)) {
    return site;
  }

  return `https://${site}`;
}

function PortRow({ item }: { item: WorldPortContact }) {
  const siteUrl = normalizeSiteUrl(item.site);

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {item.harbor || "항만명 미상"}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {item.nation || "국가 미상"}
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[11px] text-slate-600">
          <span className="font-medium text-slate-700">기관</span>{" "}
          {item.engn || "정보 없음"}
        </p>
        <p className="text-[11px] text-slate-600">
          <span className="font-medium text-slate-700">사이트</span>{" "}
          {siteUrl ? (
            <a
              href={siteUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-cyan-700 underline decoration-cyan-200 underline-offset-2"
            >
              {item.site}
            </a>
          ) : (
            "정보 없음"
          )}
        </p>
      </div>
    </div>
  );
}

export default function WorldPortsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<SearchFields>(EMPTY_FIELDS);
  const [query, setQuery] = useState<SearchFields>(EMPTY_FIELDS);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<WorldPortsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (nextPage: number, nextQuery: SearchFields) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(nextPage),
        pageSize: String(PAGE_SIZE),
      });

      if (nextQuery.nation) params.set("nation", nextQuery.nation);
      if (nextQuery.harbor) params.set("harbor", nextQuery.harbor);
      if (nextQuery.engn) params.set("engn", nextQuery.engn);
      if (nextQuery.site) params.set("site", nextQuery.site);

      const res = await fetch(`/api/world-ports?${params.toString()}`);
      if (!res.ok) {
        throw new Error("API 오류");
      }

      const json: WorldPortsResponse = await res.json();
      setData(json);
    } catch {
      setError("세계 주요 항만 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !data && !loading) {
      void fetchData(1, EMPTY_FIELDS);
    }
  }, [data, fetchData, isOpen, loading]);

  const hasActiveQuery = useMemo(
    () => Object.values(query).some((value) => value.trim().length > 0),
    [query]
  );
  const totalPages = useMemo(() => {
    if (!data?.totalCount) {
      return 1;
    }

    return Math.max(1, Math.ceil(data.totalCount / PAGE_SIZE));
  }, [data]);

  function updateDraftField(field: keyof SearchFields, value: string) {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = {
      nation: draft.nation.trim(),
      harbor: draft.harbor.trim(),
      engn: draft.engn.trim(),
      site: draft.site.trim(),
    };

    setPage(1);
    setQuery(nextQuery);
    void fetchData(1, nextQuery);
  }

  function handleReset() {
    setDraft(EMPTY_FIELDS);
    setQuery(EMPTY_FIELDS);
    setPage(1);
    void fetchData(1, EMPTY_FIELDS);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    void fetchData(nextPage, query);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg transition-all ${
          isOpen
            ? "bg-cyan-600 text-white shadow-cyan-500/30"
            : "bg-white/96 text-slate-800 border border-slate-200 hover:bg-white backdrop-blur"
        }`}
      >
        <span>🌍</span>
        <span>세계 주요 항만</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white/96 shadow-2xl backdrop-blur overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">
              세계 주요 항만 연락처
            </h3>
            {data && (
              <p className="text-[11px] text-slate-500 mt-1">
                조회 {data.currentCount.toLocaleString()}건
                {data.totalCount > 0 ? ` · 전체 ${data.totalCount.toLocaleString()}건` : ""}
              </p>
            )}
          </div>

          <form onSubmit={handleSearch} className="border-b border-slate-100 p-4">
            <div className="grid grid-cols-2 gap-2">
              <input
                value={draft.nation}
                onChange={(event) => updateDraftField("nation", event.target.value)}
                placeholder="국가"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-400"
              />
              <input
                value={draft.harbor}
                onChange={(event) => updateDraftField("harbor", event.target.value)}
                placeholder="항만"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-400"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="submit"
                className="rounded-full bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white"
              >
                검색
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                초기화
              </button>
            </div>

            {data?.usingSampleKey && (
              <p className="mt-2 text-[10px] text-slate-400">
                sample key 모드에서는 페이지와 건수가 제한될 수 있습니다.
              </p>
            )}
          </form>

          <div className="max-h-[420px] overflow-y-auto p-4">
            {loading && (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                세계 주요 항만 데이터 불러오는 중...
              </div>
            )}

            {error && (
              <div className="py-4 text-center">
                <p className="text-xs text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={() => void fetchData(page, query)}
                  className="text-xs text-cyan-600 underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {data && !loading && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">
                  {hasActiveQuery ? "필터 적용 결과" : "전체 항만 목록 일부"}
                  {data.message ? ` · ${data.message}` : ""}
                </p>

                {data.items.length > 0 ? (
                  data.items.map((item, index) => (
                    <PortRow
                      key={`${item.nation}-${item.harbor}-${item.engn}-${index}`}
                      item={item}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-5 text-center text-xs text-slate-500">
                    조건에 맞는 항만 정보가 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>

          {data && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-2.5">
              <p className="text-[10px] text-slate-400">
                출처: {data.source}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changePage(Math.max(1, page - 1))}
                  disabled={page <= 1 || loading}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-600 disabled:opacity-40"
                >
                  이전
                </button>
                <span className="text-[10px] text-slate-500">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => changePage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages || loading}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-600 disabled:opacity-40"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
