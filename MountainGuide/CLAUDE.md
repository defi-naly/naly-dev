# MountainGuide — CLAUDE.md

iOS SwiftUI app for mountain activities — paragliding, ski touring, hiking, climbing.

## Project Overview
- 7 domains: Weather, Avalanche, Flying, Navigation, Rope Systems, Glacier Travel, First Aid
- 70 Explore articles (10 per domain), 30+ interactive lessons
- Light theme (White Risk inspired), institutional blue accent (#1B5C85)
- Lottie v4 + Rive for animations, swisstopo maps, Canvas diagram scenes
- Canvas-based programmatic illustrations (159 compositions across 7 domains)

## Build
```bash
xcodebuild -project MountainGuide.xcodeproj -scheme MountainGuide \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -derivedDataPath /tmp/MountainGuideBuild build
```
Use `-derivedDataPath /tmp/MountainGuideBuild` to avoid stale SPM cache in default DerivedData.

## Key Conventions
- `LottiePlayerView` (not `LottieAnimationView`) to avoid Lottie namespace clash
- All image refs gracefully fall back to `PhotoPlaceholder` when assets are missing
- Content files live in `Content/Explore/` (articles) and `Content/*Lessons.swift` (lessons)

## Task Tracking
After completing MountainGuide work, update the task status below so the next conversation knows what's done.

### Visual Learning Implementation — Complete

- [x] Step 1: Models — heroImageName/heroImageCaption on ExploreArticle, animationName on ExploreSection + TeachingStep
- [x] Step 2: Hero image view with parallax + gradient scrim in ExploreArticleView
- [x] Step 3: Staggered section reveal animation
- [x] Step 4: Graceful image fallback (UIImage check → PhotoPlaceholder)
- [x] Step 5: 70 hero imageset directories in Assets.xcassets/Photos/Heroes/
- [x] Step 6: heroImageName added to all 70 articles across 7 Explore files
- [x] Step 7: 69 new section imageset directories in Assets.xcassets/Photos/ (18 already existed, 87 total)
- [x] Step 8: imageName/imageCaption added to ~75 sections across 7 Explore files
- [x] Step 9: lottie-ios v4.4+ SPM dependency in project.pbxproj
- [x] Step 10: LottiePlayerView wrapper (native SwiftUI LottieView)
- [x] Step 11: Lottie integrated in ExploreArticleView + LessonTeachingPhase
- [x] Step 12: 12 placeholder Lottie JSON files in Animations/
- [x] Step 13: ~15 animationName refs in content files
- [x] Step 14: New files registered in project.pbxproj
- [x] Step 15: BUILD SUCCEEDED

### Illustrations + Rive Animations — Complete (Steps 1-8), Deferred (9-10)

**Goal:** Replace all 159 PhotoPlaceholders with Canvas-based programmatic illustrations, and replace Lottie with Rive for animations.

**Architecture:**
- `Views/Illustrations/Primitives/` — ~62 reusable drawing functions (sky, terrain, snow, weather, vegetation, equipment, human, pattern)
- `Views/Illustrations/Domains/` — 7 domain files composing primitives into 157 illustrations
- `IllustrationView.swift` + `IllustrationRegistry.swift` — entry point + lookup dictionary
- `RiveAnimationView.swift` — Rive wrapper replacing LottiePlayerView
- Fallback chain: Real photo (UIImage) → Illustration → PhotoPlaceholder

**Steps:**
- [x] Step 1: Primitives library (8 files in Views/Illustrations/Primitives/)
- [x] Step 2: IllustrationView + IllustrationRegistry
- [x] Step 3: Weather illustrations (reference domain, 21 compositions)
- [x] Step 4: Remaining 6 domain illustrations (Avalanche, Glacier, Rope, Navigation, Flying, FirstAid)
- [x] Step 5: Integrate into ExploreArticleView
- [x] Step 6: Rive SDK + RiveAnimationView
- [x] Step 7: Replace Lottie → Rive in views
- [x] Step 8: Register all new files in project.pbxproj + BUILD SUCCEEDED
- [ ] Step 9: Remove Lottie (deferred until Rive confirmed working)
- [ ] Step 10: Add ambient TimelineView animations to ~15 illustrations

### Field Tools + Weather — Sprint 1 — Complete

**Goal:** Add field instruments (inclinometer, compass, altimeter, GRM calculator), weather conditions (Open-Meteo API), and restructure navigation (Settings → sheet, new Field tab).

**Architecture:**
- `Views/Field/` — 7 new view files (FieldView, InclinometerView, CompassView, AltimeterView, ReductionMethodView, ConditionsView, InstrumentCard)
- `Services/WeatherService.swift` — Open-Meteo API client with 30-min cache, mountain-level wind data
- `Models/WeatherData.swift` — Weather models (conditions, mountain weather, forecasts, trends)
- Navigation: Settings tab → gear icon sheet on Dashboard; new Field tab with Instruments/Conditions segments

**Steps:**
- [x] Step 1: Field tab shell + navigation restructure (FieldView, MountainGuideApp tab swap, Dashboard gear icon)
- [x] Step 2: Inclinometer (CMMotionManager, slope gauge, zone colors, haptic feedback, lock/calibrate)
- [x] Step 3: Compass (CLLocationManager heading, Canvas compass rose, declination, aspect assessment)
- [x] Step 4: Altimeter/Barometer (CMAltimeter, GPS altitude, pressure trend tracking)
- [x] Step 5: Graphical Reduction Method calculator (danger level interval slider, slope angle, aspect selector, conditions toggle, risk visualization)
- [x] Step 6: Weather conditions (Open-Meteo API, current conditions, mountain winds at altitude, freezing level, 24h forecast chart, domain-specific assessments)
- [x] Step 7: Theme extensions (slope zone colors, weather colors, tool accent) + InstrumentCard reusable component
- [x] Step 8: Register all 9 new files in project.pbxproj (I-series UUIDs) + BUILD SUCCEEDED

### Avalanche Bulletin + Tour Planner — Sprint 2 — Complete

**Goal:** Real-time SLF avalanche bulletins, swisstopo slope angle map overlay, tour/route planning with integrated risk assessment.

**Architecture:**
- `Models/BulletinData.swift` — CAAML v6 Codable structs (Bulletin, DangerRating, AvalancheProblem, BulletinRegion) + extensions
- `Models/TourData.swift` — Waypoint, TourRoute models with haversine distance, elevation gain/loss, aspect, slope estimate
- `Services/BulletinService.swift` — SLF API client (aws.slf.ch), 2-hour cache, region selection
- `Services/TourStore.swift` — UserDefaults tour persistence, CRUD operations
- `Views/Field/BulletinView.swift` — Full bulletin display with danger banner, problems, weather, snowpack, tendency
- `Views/Field/BulletinCardViews.swift` — DangerLevelBanner, AvalancheProblemCard, BulletinAspectRose, ElevationBandView, RegionSelector, SLFAttribution
- `Views/Field/TourPlannerView.swift` — Main planner: map + waypoints + route summary + save
- `Views/Field/TourMapView.swift` — UIViewRepresentable: swisstopo basemap + slope angle overlay (alpha 0.55) + polylines + tap-to-add waypoints
- `Views/Field/TourListView.swift` — Saved tours browser with swipe-to-delete
- `Views/Field/RiskAssessmentView.swift` — Combined GRM risk: bulletin danger + route slope + aspect overlap analysis

**Steps:**
- [x] Step 1: BulletinData models (CAAML v6 structs, danger rating extensions, HTML stripping)
- [x] Step 2: TourData models (Waypoint, TourRoute, haversine, bearing, elevation, slope)
- [x] Step 3: Theme danger colors (European 5-level scale + dangerColor(for:) method)
- [x] Step 4: BulletinService (SLF API client, 2-hour cache, region selection)
- [x] Step 5: TourStore (UserDefaults persistence, CRUD, reorder)
- [x] Step 6: BulletinView + BulletinCardViews (danger banner, aspect rose, problem cards, region pills)
- [x] Step 7: TourMapView + TourPlannerView + TourListView + RiskAssessmentView
- [x] Step 8: FieldView updates (Planner segment, Bulletin nav link) + pbxproj (J-series UUIDs) + BUILD SUCCEEDED

### Multi-Sport Restructure — Sprint 1 — Complete

**Goal:** Collapse 5 tabs to 4. Merge three learning views. Introduce activity concept.

**Architecture:**
- 4-tab navigation: Map, Learn, Tools, Profile (was: Dashboard, Learn, Explore, Review, Field)
- `Models/Activity.swift` — Activity enum (.paragliding, .skiTouring, .hiking, .climbing) with relevantDomains, tools, colors, icons
- `Services/ActivityStore.swift` — ObservableObject singleton, persists current activity to UserDefaults
- `Views/Learn/LearnView.swift` — Unified learn tab with 3 segments: Modules | Articles | Review
- `Views/Map/MapTabView.swift` — Map tab with swisstopo basemap + activity selector overlay
- `Views/Profile/ProfileView.swift` — Profile tab with Progress (gamification) | Activities segments
- `Views/Components/ActivitySelectorBar.swift` — Horizontal scrolling pill bar for activity selection

**Steps:**
- [x] Step 1: Activity.swift (enum + ToolId enum)
- [x] Step 2: ActivityStore.swift (singleton, UserDefaults)
- [x] Step 3: LearnView.swift (segmented: Modules | Articles | Review)
- [x] Step 4: MountainGuideApp.swift (4-tab: map, learn, tools, profile)
- [x] Step 5: MapTabView.swift (placeholder with TourMapView + ActivitySelectorBar)
- [x] Step 6: ProfileView.swift (Progress + Activities segments)
- [x] Step 7: ActivitySelectorBar.swift (horizontal pill bar)
- [x] Step 8: pbxproj (K-series UUIDs) + BUILD SUCCEEDED

### Multi-Sport Restructure — Sprint 2 — Complete

**Goal:** Full paragliding features — airspace, thermals, pre-flight assessment, flight logging.

**Architecture:**
- `Models/AirspaceData.swift` — OpenAIP airspace models (AirspaceClass enum, Airspace struct, polygon geometry)
- `Models/ThermalForecast.swift` — Aviation weather models (ThermalForecast, FlyabilityIndex 0-100, FlyabilityVerdict)
- `Models/ActivityLog.swift` — Flight/tour/hike log models (TrackPoint, FlightLog, ActivityRecord enum)
- `Services/AirspaceService.swift` — OpenAIP API client with 24h cache + Swiss fallback data
- `Services/FlightLogger.swift` — GPS track recorder via CLLocationManager + vario calculation
- `Services/ActivityLogStore.swift` — UserDefaults persistence for activity records
- `Views/Map/ActivityMapView.swift` — UIViewRepresentable: swisstopo + airspace polygons + slope overlay + GPS track
- `Views/Map/AirspaceOverlay.swift` — AirspacePolygon (MKPolygon subclass) + renderer with class-based colors
- `Views/Activity/PreFlightView.swift` — Pre-flight assessment: flyability gauge, wind, thermals, cloud base, airspace warnings, GO/NO-GO
- `Views/Activity/FlightLogView.swift` — Flight history list with stats
- `WeatherService.swift` — Extended with fetchAviationWeather (CAPE, cloud base, thermals)
- `MapTabView.swift` — Expanded with activity overlays + layer toggle buttons
- `FieldView.swift` — Activity-aware tool filtering (paragliding: pre-flight + flight log; ski touring: inclinometer + GRM + bulletin)
- `ProfileView.swift` — Activities segment wired to ActivityLogStore

**Steps:**
- [x] Step 1: AirspaceData.swift (OpenAIP models)
- [x] Step 2: ThermalForecast.swift (aviation weather + FlyabilityIndex)
- [x] Step 3: ActivityLog.swift (FlightLog, TrackPoint, ActivityRecord)
- [x] Step 4: AirspaceService.swift (OpenAIP API + Swiss fallback)
- [x] Step 5: WeatherService extension (fetchAviationWeather)
- [x] Step 6: FlightLogger.swift (GPS + vario)
- [x] Step 7: ActivityLogStore.swift (persistence)
- [x] Step 8: AirspaceOverlay.swift + ActivityMapView.swift (map rendering)
- [x] Step 9: MapTabView expansion (activity overlays + layer toggles)
- [x] Step 10: PreFlightView.swift + FlightLogView.swift
- [x] Step 11: FieldView.swift activity filtering
- [x] Step 12: ProfileView.swift ActivityLogStore wiring
- [x] Step 13: pbxproj (L-series UUIDs) + BUILD SUCCEEDED

### Lifecycle Model — Sprint 3 — Complete

**Goal:** Data models, 3-axis XP, file-based storage foundation.

**Architecture:**
- `Models/ActivitySource.swift` — ActivitySource enum (manual/healthKit/xcontest/igcImport) + XPAxis enum (preparation/prowess/safety)
- `Models/PostTripReview.swift` — PostTripReview, ConditionsSnapshot, HazardEntry, HazardCategory, HazardSeverity
- `Models/MergedActivity.swift` — MergedActivity for Hike & Fly combos
- `Services/ActivityFileStore.swift` — Actor-based JSON file storage (Documents/Activities/ + Documents/Reviews/)
- Modified: ActivityLog.swift (HeartRateZones, ClimbLogRecord, source fields, .climb case)
- Modified: GamificationState.swift (3-axis XP with custom Codable migration, totalXP → computed)
- Modified: KnowledgeStore.swift (addXP gains axis parameter, addProwessXP method)
- Modified: ActivityLogStore.swift (file-based persistence via ActivityFileStore)
- Modified: DashboardView.swift (GamificationBanner + XPAxisBars)
- Modified: Theme.swift (XP axis colors)

**Steps:**
- [x] Step 1: ActivityFileStore.swift (file-based JSON storage)
- [x] Step 2: ActivitySource.swift + XPAxis enum
- [x] Step 3: Extend ActivityLog.swift (HeartRateZones, ClimbLogRecord, source)
- [x] Step 4: 3-axis XP in GamificationState.swift (custom Codable migration)
- [x] Step 5: KnowledgeStore addXP(axis:) + addProwessXP
- [x] Step 6: PostTripReview.swift model
- [x] Step 7: MergedActivity.swift model
- [x] Step 8: GamificationBanner 3-axis mini-bars
- [x] Step 9: Theme XP axis colors
- [x] Step 10: pbxproj (M-series UUIDs) + BUILD SUCCEEDED

### Lifecycle Model — Sprint 4 — Complete

**Goal:** HealthKit integration to read Garmin workouts via Apple Health.

**Architecture:**
- `Services/HealthKitService.swift` — HKWorkout reader, auto-sync, mountain type filtering
- `Views/Settings/HealthKitConnectionView.swift` — Authorization + sync UI
- `Views/Activity/ImportProgressView.swift` — Bulk import progress sheet
- `MountainGuide.entitlements` — HealthKit capability

**Steps:**
- [x] Step 1: HealthKit entitlement + Info.plist key
- [x] Step 2: HealthKitService.swift (workout query, route extraction, HR sampling)
- [x] Step 3: Auto-sync on app launch
- [x] Step 4: HealthKitConnectionView.swift
- [x] Step 5: Connected Accounts in SettingsView
- [x] Step 6: ImportProgressView.swift
- [x] Step 7: pbxproj (N-series UUIDs) + BUILD SUCCEEDED

### Lifecycle Model — Sprint 5 — Complete

**Goal:** XContest integration for paragliding flights + smart merge for Hike & Fly detection.

**Architecture:**
- `Services/XContestService.swift` — XContest JSON API V2 client
- `Services/IGCParser.swift` — IGC flight file parser (B-records → TrackPoint)
- `Services/IGCImporter.swift` — Document picker for .igc files
- `Engine/MergeEngine.swift` — Same-day hike+flight detection within 5km haversine
- `Views/Activity/MergeSuggestionCard.swift` — Merge suggestion UI
- `Views/Settings/XContestConnectionView.swift` — XContest username + sync config

**Steps:**
- [x] Step 1: XContestService.swift
- [x] Step 2: IGCParser.swift
- [x] Step 3: IGCImporter.swift
- [x] Step 4: MergeEngine.swift
- [x] Step 5: MergeSuggestionCard.swift
- [x] Step 6: XContestConnectionView.swift
- [x] Step 7: SettingsView + MountainGuideApp XContest wiring
- [x] Step 8: pbxproj (O-series UUIDs) + BUILD SUCCEEDED

### Lifecycle Model — Sprint 6 — Complete

**Goal:** Post-trip reviews award Safety XP. Enhanced logbook replaces basic activity list. Preparation XP triggers.

**Architecture:**
- `Content/HazardContent.swift` — Domain-specific hazard checklists per activity type
- `Views/Activity/PostTripReviewView.swift` — 5-step review flow (conditions → hazards → decisions → lessons → summary)
- `Views/Activity/ReviewStepViews.swift` — Step subviews + FlowLayout + ReviewSummaryView
- `Views/Activity/ActivityDetailView.swift` — Full activity detail with map track + stats + HR zones + review
- `Views/Profile/LogbookView.swift` — Enhanced logbook with filtering, source badges, merge suggestions, monthly grouping
- `Views/Profile/StatsView.swift` — Lifetime stats, activity breakdown, 3-axis XP chart, monthly trend
- Modified: GamificationEngine.swift (calculateReviewXP)
- Modified: ProfileView.swift (3 segments: Progress/Logbook/Stats)
- Modified: MountainGuideApp.swift (review badge on Profile tab)
- Modified: BulletinView.swift (Preparation XP trigger, once/day)
- Modified: PreFlightView.swift (Preparation XP trigger, once/day)
- Modified: TourPlannerView.swift (Preparation XP trigger on save, once/day)

**Steps:**
- [x] Step 1: HazardContent.swift (activity-specific hazard checklists)
- [x] Step 2: PostTripReviewView.swift (5-step review flow)
- [x] Step 3: ReviewStepViews.swift (conditions, hazards, decisions, lessons, summary)
- [x] Step 4: GamificationEngine.calculateReviewXP
- [x] Step 5: Preparation XP triggers (BulletinView, PreFlightView, TourPlannerView)
- [x] Step 6: LogbookView.swift (enhanced logbook)
- [x] Step 7: ActivityDetailView.swift (activity detail with map + stats + review)
- [x] Step 8: ProfileView.swift (3 segments: Progress/Logbook/Stats)
- [x] Step 9: StatsView.swift (lifetime stats tab)
- [x] Step 10: MountainGuideApp review badge
- [x] Step 11: pbxproj (P-series UUIDs) + BUILD SUCCEEDED

### UX Restructure — Home Dashboard + Map Layers + Tools Categories — Complete

**Goal:** Home dashboard as landing page, map layers for all activities, categorized tools, slimmed profile.

**Architecture:**
- `Views/Home/HomeView.swift` — New dashboard landing: ActivitySelectorBar, ConditionsSnapshotCard (weather + activity assessment), StatCards, GamificationBanner, ActivityBreakdownCard, MonthlyTrendCard, StreakHeatmap
- `Views/Profile/StatsView.swift` — Extracted ActivityBreakdownCard + MonthlyTrendCard as public reusable structs
- `MountainGuideApp.swift` — 4 tabs: Home (house.fill), Learn (book.fill), Field (map.fill), Profile (person.fill); default .home
- `Views/Field/FieldView.swift` — 4 segments: Map | Instruments | Conditions | Planner; instruments grouped by ToolCategorySection per activity
- `Views/Map/MapTabView.swift` — Centered toggles, hiking trails + POI toggles, climbing slope + crag toggles, SwissPOI data (10 huts, 10 peaks, 8 crags)
- `Views/Map/ActivityMapView.swift` — Hiking trails tile overlay (swisstopo WMTS), POI annotations (MKMarkerAnnotationView), POIAnnotation class
- `Views/Profile/ProfileView.swift` — 2 segments: Progress | Logbook; trimmed ProgressContent (no GamificationBanner/StatCards/StreakHeatmap, those moved to Home)

**Steps:**
- [x] Step 1: Extract ActivityBreakdownCard + MonthlyTrendCard from StatsView
- [x] Step 2: Create HomeView.swift (dashboard + ConditionsSnapshotCard)
- [x] Step 3: Update MountainGuideApp.swift (4 tabs, default .home)
- [x] Step 4: Restructure FieldView (Map segment + categorized tools)
- [x] Step 5: Fix MapTabView toggle centering + add layers for all activities
- [x] Step 6: Add hiking trails + POI overlays to ActivityMapView
- [x] Step 7: Slim ProfileView (remove Stats segment, trim ProgressContent)
- [x] Step 8: pbxproj (Q-series UUIDs) + BUILD SUCCEEDED

### ParaglidingEarth Launch Sites on Map — Complete

**Goal:** Show ParaglidingEarth takeoff sites on the swisstopo map when paragliding is the active activity.

**Architecture:**
- `Models/LaunchSiteData.swift` — LaunchSite model + WindDirection enum, GeoJSON parsing (all string properties)
- `Services/ParaglidingEarthService.swift` — ParaglidingEarth API client (getBoundingBoxSites), 24h cache, 10 Swiss fallback sites
- `Views/Map/ActivityMapView.swift` — LaunchSiteAnnotation class, `launchSites` parameter, updateLaunchSites method, orange markers with wind callout
- `Views/Map/MapTabView.swift` — ParaglidingEarthService wiring, showLaunchSites toggle, "Launch Sites" toggle button

**Steps:**
- [x] Step 1: LaunchSiteData.swift (LaunchSite model, WindDirection enum, GeoJSON parser)
- [x] Step 2: ParaglidingEarthService.swift (API client, bounds cache, Swiss fallback)
- [x] Step 3: ActivityMapView.swift (LaunchSiteAnnotation, updateLaunchSites, annotation rendering)
- [x] Step 4: MapTabView.swift (service wiring, toggle, data passing)
- [x] Step 5: pbxproj (R-series UUIDs) + BUILD SUCCEEDED

### SLF Avalanche Danger Map Overlay — Complete

**Goal:** Show SLF avalanche danger zones as colored polygon overlays on the swisstopo map when ski touring is the active activity.

**Architecture:**
- `Models/BulletinData.swift` — Added DangerRegionCollection, DangerRegionFeature, DangerRegionGeometry, DangerRegionProperties GeoJSON Codable structs
- `Views/Map/DangerRegionOverlay.swift` — DangerRegionPolygon (MKPolygon subclass) + DangerRegionOverlayHelper (addRegions + renderer), 0.25 fill / 0.7 stroke alpha
- `Services/BulletinService.swift` — Added `dangerRegions` published property + `fetchDangerGeoJSON()` with 2-hour cache (separate from bulletin endpoint)
- `Views/Map/ActivityMapView.swift` — Added `dangerRegions` parameter, `updateDangerRegions` coordinator method, DangerRegionPolygon renderer case
- `Views/Map/MapTabView.swift` — Added `showDanger` toggle (default on), bulletinService wiring, "Danger" toggle button for ski touring, fetch on .task/.onChange

**Steps:**
- [x] Step 1: GeoJSON Codable structs in BulletinData.swift
- [x] Step 2: DangerRegionOverlay.swift (DangerRegionPolygon + DangerRegionOverlayHelper)
- [x] Step 3: BulletinService.swift (dangerRegions + fetchDangerGeoJSON)
- [x] Step 4: ActivityMapView.swift (dangerRegions param, coordinator method, renderer)
- [x] Step 5: MapTabView.swift (showDanger toggle, fetch wiring, Danger button)
- [x] Step 6: pbxproj (S-series UUIDs) + BUILD SUCCEEDED

### Weather & Map Optimization — Complete

**Goal:** Fix hardcoded weather location, unify location management, reduce map overlay churn, parallelize API calls, consistent WeatherService injection.

**Architecture:**
- `Services/LocationService.swift` — Shared CLLocationManager singleton, @Published currentLocation, effectiveLocation (Zurich fallback), battery-efficient significant-change monitoring after initial fix
- `MountainGuideApp.swift` — Injects LocationService + WeatherService into environment
- `Views/Home/HomeView.swift` — Uses device location via LocationService, @EnvironmentObject for weather, freshness footer (location name + relative timestamp)
- `Views/Field/ConditionsView.swift` — Uses shared LocationService (removed duplicate ConditionsLocationManager class)
- `Views/Activity/PreFlightView.swift` — @EnvironmentObject for weather (was @StateObject)
- `Views/Map/ActivityMapView.swift` — Identity-guarded overlay updates (Set<String> tracking for airspaces, danger regions, POIs, launch sites)
- `Views/Map/MapTabView.swift` — Parallel `async let` for airspace + launch site fetches
- `Models/BulletinData.swift` — Deterministic fallback ID for DangerRegionFeature (was UUID().uuidString)
- `Services/WeatherService.swift` — `lastFetchTime` exposed as @Published private(set)

**Steps:**
- [x] Step 1: LocationService.swift (shared singleton, CLLocationManagerDelegate, nonisolated delegates)
- [x] Step 2: MountainGuideApp.swift (inject LocationService + WeatherService as environmentObjects)
- [x] Step 3: HomeView.swift (device location, @EnvironmentObject weather, freshness footer, .onChange for location)
- [x] Step 4: ConditionsView.swift (shared LocationService, removed ConditionsLocationManager)
- [x] Step 5: PreFlightView.swift (@EnvironmentObject weather)
- [x] Step 6: ActivityMapView.swift (identity guards on overlay/annotation updates)
- [x] Step 7: MapTabView.swift (parallel async let for data fetches)
- [x] Step 8: BulletinData.swift (deterministic fallback ID) + WeatherService.swift (@Published lastFetchTime)
- [x] Step 9: pbxproj (T-series UUIDs) + BUILD SUCCEEDED
