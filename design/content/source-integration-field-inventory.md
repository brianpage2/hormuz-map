# External Source Integration Field Inventory

Updated: 2026-04-15

## Purpose

This document lists the values we can realistically connect from the requested external sources for the Hormuz site.

Principles:

- Only official source pages, official portals, or official docs were used.
- `Public web page` does not mean `stable public API`.
- If an official portal exists but field schema is hidden behind login or contract, the source is marked accordingly.
- Values below are grouped into `confirmed public`, `confirmed account/contract`, and `login-hidden / schema not public`.

## Site-Normalized Field Buckets

These are the normalized field groups we can map incoming data into:

- `source`: provider name, access level, refresh pattern
- `entity keys`: carrier, vessel name, voyage number, IMO, MMSI, container number, booking number, BL number, PO number
- `tracking`: current location, previous movements, event status, milestone name, milestone timestamp, event place, actual/planned flag
- `schedule`: origin, destination, POO, POL, POD, delivery point, ports of call, terminal, ETD, ETA, berth ETA, arrival date, departure date, transit time
- `live position`: latitude, longitude, inland leg visibility, vessel history, updated ETA deviation
- `reefer / IoT`: temperature, humidity, ambient temperature, GPS position, gas variation, controlled atmosphere, cold treatment, off-power period, defrost period, datalog export
- `security`: advisory id, warning title, report type, area, report timestamp, incident text, reporting form fields
- `market`: commodity symbol, commodity name, benchmark, price, currency, unit, change, historical series timestamp
- `news`: headline, deck/summary, section, author, publish time, article URL, media type

## Source Inventory

### 1. Maersk

- Access: official APIs plus public tracking pages. Most useful integrations require account access.
- Confirmed values:
  - shipment or container lookup by `Bill of Lading number` or `container number`
  - `current location`
  - `previous movements`
  - `expected schedule`
  - milestone timeline, with Maersk explicitly stating `up to nine milestones` from booking to delivery
  - API families explicitly advertised for `schedules`, `booking`, `tracking`, and `invoice`
- Best use on site:
  - carrier-specific tracking card
  - Maersk shipment milestone timeline
  - schedule confirmation layer against AIS-based vessel movement
- Access note:
  - public page gives visibility fields
  - API schema details require Maersk onboarding
- Official sources:
  - https://www.maersk.com/digital-services/data-integrations/api
  - https://www.maersk.com/support/faqs/2024/06/06/how-to-track-shipments
  - https://www.maersk.com/support/faqs/milestones-is-maersk-tracking

### 2. MSC

- Access: official Direct Integrations and myMSC/iReefer. Core integration is account-based.
- Confirmed values:
  - shipping data exchange through `API and EDI`
  - booking and in-transit shipment management in existing customer systems
  - reefer monitoring via `iReefer`
  - `position`
  - `temperature`
  - `humidity`
  - `container GPS location`
  - `relative humidity`
  - `ambient temperature`
  - `container journey log`
  - `key milestone events`
  - `Controlled Atmosphere overview`
  - `Cold Treatment overview`
  - `off-power tracking`
  - `defrost period tracking`
  - `datalog downloads`
- Best use on site:
  - MSC reefer condition panel
  - high-risk cargo monitor for perishable shipments
  - carrier-specific event log
- Access note:
  - iReefer Essential/Pro/Ultimate are package-based
  - API availability is confirmed, but schema requires account access
- Official sources:
  - https://www.msc.com/ko/solutions/digital-solutions/direct-integrations
  - https://www.msc.com/ireefer
  - https://www.msc.com/en/newsroom/press-releases/2025/february/msc-launches-ireefer

### 3. CMA CGM

- Access: public tracking pages plus customer-facing digital services. Some connected container features are premium.
- Confirmed values:
  - lookup by `container number`, `shipment ref`, or `my ref`
  - `container number`
  - `container type`
  - `POO`
  - `POL`
  - `POD`
  - `ETA berth at POD`
  - current shipment `status`
  - PDF export of tracking details
  - SMART reefer / connected container values:
  - `location`
  - `temperature`
  - `gas variations`
  - anomaly notifications
- Best use on site:
  - CMA CGM route card with POO/POL/POD and berth ETA
  - reefer anomaly alert feed
  - port-arrival countdown
- Access note:
  - public tracking is visible now
  - structured API docs were not publicly exposed in the same depth
- Official sources:
  - https://www.cma-cgm.com/eBusiness/tracking
  - https://www.cma-cgm.com/news/4044/cma-cgm-launches-smart-reefer-container-a-connected-container-for-your-refrigerated-goods-

### 4. Hapag-Lloyd

- Access: very strong public tracking pages plus account/API options for Live Position.
- Confirmed values:
  - track by `booking`
  - track by `container`
  - track by `Bill of Lading`
  - container-level `status information`
  - `container movement`
  - `actual data`
  - `planned movements`
  - tracking subscriptions for status changes
  - vessel tracker values:
  - `all ports of call`
  - `arrival dates`
  - `departure dates`
  - `complete transit time`
  - `vessel details`
  - `terminal details`
  - Live Position values:
  - `real-time container location`
  - `shipment overview`
  - `updated ETA`
  - `ETA deviation`
  - `inland distance traveled`
  - `vessel history`
  - CSV download
  - Hapag-Lloyd LIVE reefer:
  - official page confirms `condition` and `location` data sets in near real time
- Best use on site:
  - premium carrier tracking card
  - vessel schedule comparison against AIS position
  - delay-detection widget using ETA deviation
- Access note:
  - public tracking is immediately useful
  - Live Position API is available but requires onboarding
- Official sources:
  - https://www.hapag-lloyd.com/en/online-business/track/track.html
  - https://www.hapag-lloyd.com/en/online-business/track/live-position.html
  - https://www.hapag-lloyd.com/en/company/press/releases/2020/02/-hapag-lloyd-live---hapag-lloyd-launches-remote-reefer-supply-ch.html

### 5. COSCO SHIPPING Lines

- Access: official E-Lines platform. Public user-guide PDFs reveal field families, but operational use is login-based.
- Confirmed values:
  - shipment details lookup by `booking number`
  - shipment details lookup by `Bill of Lading number`
  - shipment details lookup by `container number`
  - shipment details lookup by `user reference number`
  - shipment detail field groups:
  - `status`
  - `reference numbers`
  - `parties`
  - `routing`
  - `container and cargo`
  - sailing schedule selection inputs:
  - `origin city`
  - `destination city`
  - `pickup / deliver clause`
  - `intended date range`
  - `port of load`
  - `vessel name`
  - `voyage`
  - `earliest departure date`
  - `latest arrival date`
- Best use on site:
  - COSCO shipment details drawer
  - route candidate explorer for origin/destination pairs
  - carrier-specific routing validator
- Access note:
  - no stable public API schema was confirmed
  - values are confirmed from official COSCO guides, not from an open JSON spec
- Official sources:
  - https://elines.coscoshipping.com/reference/en/resultBySailing.pdf
  - https://elines.coscoshipping.com/reference/en/BookingRequest.pdf

### 6. ONE (Ocean Network Express)

- Access: public digital solutions pages. Useful tracking exists, but a public developer schema was not confirmed.
- Confirmed values:
  - lookup by `B/L number`
  - lookup by `booking number`
  - lookup by `container number`
  - `current position`
  - `history of previous shipments`
  - `event status`
  - `visibility summary`
  - `arriving shipments`
  - `departing shipments`
  - time-window filters for active shipments
- Best use on site:
  - ONE shipment visibility panel
  - event-history summary
  - arrival/departure watchlist
- Access note:
  - public feature set is clear
  - public API schema was not confirmed from official sources in this pass
- Official source:
  - https://www.one-line.com/en/digital-solutions/one-mobile-app/features

### 7. HMM

- Access: official API portal. Package names are publicly visible; detailed schemas require login.
- Confirmed API families:
  - `Track and Trace (DCSA)`
  - `Port-to-Port Schedule`
  - `Vessel Schedule`
  - `By Calling Port Schedule`
- Values we can safely plan for now:
  - track-and-trace event set for container/shipment lifecycle
  - schedule search by port pair
  - vessel schedule by vessel
  - port-call schedule by calling port
- Best use on site:
  - Korean carrier schedule layer
  - HMM-specific track-and-trace module
  - schedule API fallback when AIS is sparse
- Access note:
  - family names are confirmed
  - field-level schema still needs authenticated portal review before implementation
- Official sources:
  - https://apiportal.hmm21.com/package/package/1604ff3c-284d-45ba-a626-a0b9f1bcb13a
  - https://apiportal.hmm21.com/package/package/feaac76e-75ed-4747-8586-1e7c45007337

### 8. Evergreen

- Access: official ShipmentLink platform. Public site clearly exposes tracking and itinerary functions, but robots protection limited full inspection in this pass.
- Confirmed values from official visible entry points:
  - `tracking`
  - `cargo tracking`
  - `booking inquiry`
  - `export schedules`
  - itinerary search by `origin`
  - itinerary search by `destination`
  - tracking by reference number
- Best use on site:
  - Evergreen schedule search
  - cargo tracking card
  - export-schedule snapshot
- Access note:
  - official web capabilities are confirmed
  - machine-readable public API schema was not confirmed
- Official source:
  - https://www.shipmentlink.com/

### 9. PIL

- Access: public digital solutions page plus account-based data integration.
- Confirmed values:
  - track and trace by:
  - `container number`
  - `B/L number`
  - `booking reference`
  - `P.O. number`
  - `Empty Release`
  - `Storing Order`
  - schedules by:
  - `port`
  - `point-to-point`
  - `vessel`
  - schedule filters:
  - `origin`
  - `destination`
  - `port code`
  - `vessel code`
  - `date from`
  - `date to`
  - data integration support:
  - `EDI`
  - `API`
  - `DCSA Track & Trace subscription-based API`
  - carbon calculator inputs:
  - `origin`
  - `destination`
  - `TEUs`
  - `cargo nature`
  - output in `tons of CO2e`
- Best use on site:
  - PIL service-route and tracking view
  - carbon estimate widget for route comparisons
  - DCSA event subscription candidate
- Access note:
  - this is one of the clearer officially documented carrier integration surfaces
- Official source:
  - https://www.pilship.com/digital-solutions/

### 10. OilPriceAPI

- Access: public commercial API with published docs and self-service API key.
- Confirmed values:
  - `WTI`
  - `Brent`
  - `Natural Gas`
  - 50+ energy and agricultural commodity prices
  - normalized REST responses
  - historical price data
  - webhooks
  - SDK access
  - update cadence advertised at `5-minute updates`
- Best use on site:
  - Hormuz oil-price strip above the map
  - Brent/WTI spread widget
  - energy shock panel beside UKMTO warnings
- Access note:
  - one of the easiest external APIs to add quickly
- Official source:
  - https://www.oilpriceapi.com/us

### 11. S&P Global Market Intelligence

- Access: enterprise/licensed product, not open public API.
- Confirmed values:
  - `600+ data fields`
  - `200,000+ ships over 100 gross tons`
  - `ships`
  - `owners`
  - `shipbuilders`
  - `ship movements`
  - `fixtures`
  - `casualties`
  - `ports`
  - `companies`
  - product references to `Sea-web` and `AISLive`
- Best use on site:
  - enterprise-grade ship profile enrichment
  - owner/company network graph
  - casualty and fixture overlays
- Access note:
  - excellent data depth
  - licensing burden is high, so not the first implementation target
- Official source:
  - https://www.spglobal.com/market-intelligence/en/solutions/ship-and-port-data

### 12. UKMTO

- Access: public official site, no commercial barrier for advisory pages.
- Confirmed values:
  - `latest warnings / advisories / notices` on the official site
  - reporting format values in the VRS reporting scheme
  - `daily report` workflow for vessels in the Voluntary Reporting Area
  - maritime security context for `Indian Ocean`, `Arabian Sea`, `Gulf of Aden`, and `Red Sea`
- Best use on site:
  - highest-priority public security feed for Hormuz-adjacent risk awareness
  - banner alerts
  - advisory timeline
  - shipmaster reporting guide linkout
- Access note:
  - public and strategically relevant
  - should be one of the first external sources integrated
- Official source:
  - https://www.ukmto.org/indian-ocean/reporting-formats

### 13. Kpler

- Access: enterprise maritime intelligence platform. Product capabilities are public, implementation requires contract.
- Confirmed values:
  - `real-time ship tracking`
  - `AIS`
  - `vessel movements`
  - `predictive ETA alerts`
  - `port events`
  - `ship-to-ship transfers`
  - `ownership`
  - `classification`
  - `vessel characteristics`
  - `historical AIS archive`
  - `container movements`
  - `terminal congestion`
  - `risk and compliance`
  - `sanctions screening`
  - delivery options via `API`, `NMEA`, `Kafka`, and `Snowflake`
- Best use on site:
  - premium vessel risk layer
  - predictive congestion and ETA intelligence
  - sanctions / deceptive-practice overlay
- Access note:
  - strategically strong, operationally expensive
  - better as phase-2 or enterprise-only module
- Official sources:
  - https://www.kpler.com/product/maritime
  - https://www.kpler.com/product/maritime/data-services

### 14. MarineTraffic

- Access: official AIS API docs. Commercial API, but schema visibility is public.
- Confirmed values:
  - AIS data API with API key auth
  - service families explicitly surfaced in official docs:
  - `vessel positions`
  - `port calls`
  - `berth calls`
  - `voyage / ETA`
  - `containers API`
  - ship database / vessel particulars
  - historical tracks and events through related service families
- Best use on site:
  - best off-the-shelf vessel intelligence fallback if AISStream is insufficient
  - port-arrival and berth activity overlay
  - voyage ETA enrichment
- Access note:
  - very implementable if budget allows
  - cleaner integration path than web-scraping carrier sites
- Official source:
  - https://servicedocs.marinetraffic.com/

### 15. Clarksons Research

- Access: subscription portal / enterprise products.
- Confirmed values:
  - product families:
  - `Shipping Intelligence Network`
  - `World Fleet Register`
  - `Sea/net`
  - `Offshore Intelligence Network`
  - `World Offshore Register`
  - `Research Portal`
- Best use on site:
  - fleet register enrichment
  - research-grade market benchmarks
  - analyst-level vessel and offshore context
- Access note:
  - strong data value, but no public open API confirmed
  - licensing and portal access are required
- Official source:
  - https://www.clarksons.net/wfr/Navigation?path=support&website=PORTAL

### 16. Reuters

- Access: licensed content API.
- Confirmed values:
  - Reuters API for content delivery
  - `GraphQL`
  - `JSON`
  - filtered content delivery
  - `text`
  - `video`
  - `pictures`
  - `archive`
  - live video API with `machine-readable metadata`
- Best use on site:
  - premium breaking-news feed
  - curated Hormuz / shipping / oil headline rail
  - newsroom-grade alert ingestion
- Access note:
  - valuable but licensed
  - not a low-friction first integration
- Official source:
  - https://reutersagency.com/content-delivery-platforms/api-integrations/

### 17. CNBC

- Access: public RSS-style feed endpoints on CNBC pages.
- Confirmed values:
  - CNBC pages expose `?format=rss`
  - practical RSS item fields available for ingestion:
  - `title`
  - `link`
  - `publication time`
  - `description / summary`
  - category or section context from feed grouping
- Best use on site:
  - free headline rail for business / energy / markets coverage
  - oil and macro sentiment panel beside commodity prices
  - fast first-step news ingestion before licensed feeds
- Access note:
  - technically easy
  - editorial quality is useful, but it is not a structured maritime API
- Official source:
  - https://www.cnbc.com/?format=rss

## Immediate Priority Ranking

### Priority A: fastest realistic adds

- `UKMTO`: public, Hormuz-relevant, high-signal security alerts
- `OilPriceAPI`: clean API, direct value for oil and risk narrative
- `CNBC RSS`: quick headline layer for energy / markets context
- `MarineTraffic`: strongest operational fallback if live vessel data remains weak
- `PIL`: official DCSA track-and-trace integration path is clearly documented

### Priority B: useful, but account/onboarding needed

- `Maersk`
- `MSC`
- `CMA CGM`
- `Hapag-Lloyd`
- `HMM`
- `ONE`
- `COSCO`
- `Evergreen`

### Priority C: premium / contract-heavy

- `Kpler`
- `S&P Global Market Intelligence`
- `Clarksons Research`
- `Reuters`

## Recommended Next Build Order

1. Add `UKMTO` public advisories as the site's security feed.
2. Add `OilPriceAPI` for Brent, WTI, and gas benchmarks.
3. Add `CNBC RSS` as a lightweight news rail filtered to oil, shipping, Red Sea, Iran, and Strait of Hormuz keywords.
4. Decide whether to buy `MarineTraffic` or fix `AISStream` with a server proxy first.
5. After live vessel coverage is stable, add carrier-specific schedule layers starting with `HMM`, `PIL`, and `Hapag-Lloyd`.
