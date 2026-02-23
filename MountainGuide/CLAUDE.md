# MountainGuide — CLAUDE.md

iOS SwiftUI app for mountain safety education.

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
