#!/bin/bash
# fetch-images.sh — Download stock photos from Unsplash for missing MountainGuide Explore images
# Usage: cd MountainGuide && bash scripts/fetch-images.sh

set -euo pipefail

ASSETS="MountainGuide/Assets.xcassets/Photos"
HEROES="$ASSETS/Heroes"
TMP_IMG="/tmp/mg-fetch-img.jpg"
SLEEP_SECS=1.5

# Counters
FETCHED=0
SKIPPED=0
FAILED=0

fetch_image() {
    local name="$1"
    local query="$2"
    local target_dir="$3"
    local target_path="$target_dir/$name.imageset/$name.png"
    local contents_path="$target_dir/$name.imageset/Contents.json"

    # Skip if PNG already exists (unless it's the broken thermals image)
    if [ -f "$target_path" ] && [ "$name" != "hero-weather-thermals" ]; then
        echo "  SKIP $name (already exists)"
        SKIPPED=$((SKIPPED + 1))
        return 0
    fi

    # Create imageset dir if missing
    mkdir -p "$target_dir/$name.imageset"

    # Search Unsplash
    local encoded_query
    encoded_query=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$query'))")
    local search_url="https://unsplash.com/napi/search/photos?query=${encoded_query}&per_page=1&orientation=squarish"

    local img_url
    img_url=$(curl -s "$search_url" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    if d.get('results') and len(d['results']) > 0:
        print(d['results'][0]['urls']['regular'])
    else:
        print('')
except:
    print('')
" 2>/dev/null)

    if [ -z "$img_url" ]; then
        echo "  FAIL $name (no search results for: $query)"
        FAILED=$((FAILED + 1))
        return 0
    fi

    # Download
    if ! curl -sL -o "$TMP_IMG" "$img_url"; then
        echo "  FAIL $name (download failed)"
        FAILED=$((FAILED + 1))
        return 0
    fi

    # Resize to 1024x1024 PNG
    if ! sips --resampleWidth 1024 --resampleHeight 1024 -s format png "$TMP_IMG" --out "$target_path" >/dev/null 2>&1; then
        echo "  FAIL $name (sips resize failed)"
        FAILED=$((FAILED + 1))
        return 0
    fi

    # Update Contents.json to reference the file
    cat > "$contents_path" << CJSON
{
  "images" : [
    {
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "filename" : "$name.png",
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
CJSON

    local size
    size=$(stat -f%z "$target_path" 2>/dev/null || echo "?")
    echo "  OK   $name (${size} bytes)"
    FETCHED=$((FETCHED + 1))

    # Rate limit
    sleep "$SLEEP_SECS"
}

echo "=== MountainGuide Image Fetcher ==="
echo ""

# ─── HEROES (20 entries: 19 missing + 1 broken) ───
echo "── Heroes ──"

fetch_image "hero-weather-thermals"    "thermal convection cumulus clouds alpine mountain"  "$HEROES"
fetch_image "hero-firstaid-altitude"   "altitude sickness mountain climber high elevation"  "$HEROES"
fetch_image "hero-firstaid-evacuation" "mountain rescue helicopter evacuation stretcher"    "$HEROES"
fetch_image "hero-firstaid-fractures"  "wilderness splinting broken bone mountain"          "$HEROES"
fetch_image "hero-firstaid-hypothermia" "hypothermia winter mountain cold exposure"          "$HEROES"
fetch_image "hero-firstaid-wounds"     "wilderness wound care bandaging mountain"            "$HEROES"
fetch_image "hero-glacier-anatomy"     "glacier crevasse ice blue alpine"                   "$HEROES"
fetch_image "hero-glacier-crevasse-id" "crevasse field glacier surface danger"              "$HEROES"
fetch_image "hero-navigation-emergency" "lost hiker mountain emergency navigation"          "$HEROES"
fetch_image "hero-navigation-night"    "night hiking headlamp mountain trail"               "$HEROES"
fetch_image "hero-rope-anchors"        "climbing anchor rock bolt mountain"                 "$HEROES"
fetch_image "hero-rope-belaying"       "belaying climber rock face safety"                  "$HEROES"
fetch_image "hero-rope-crevasse"       "crevasse rescue glacier rope system"                "$HEROES"
fetch_image "hero-rope-improvised"     "improvised anchor climbing mountain rescue"         "$HEROES"
fetch_image "hero-rope-knots"          "climbing knots rope carabiner"                      "$HEROES"
fetch_image "hero-rope-mechanics"      "climbing rope dynamic fall protection"              "$HEROES"
fetch_image "hero-rope-multi-pitch"    "multi pitch climbing route mountain wall"            "$HEROES"
fetch_image "hero-rope-rappelling"     "rappelling abseiling cliff mountain"                "$HEROES"
fetch_image "hero-rope-rescue"         "rescue hauling system climbing mountain"            "$HEROES"
fetch_image "hero-rope-top-rope"       "top rope climbing crag outdoor"                     "$HEROES"

# ─── SECTION IMAGES (71 entries) ───
echo ""
echo "── Section: Avalanche ──"

fetch_image "avalanche-triangle-overview"  "avalanche danger triangle snowpack terrain weather"  "$ASSETS"
fetch_image "avalanche-slab-anatomy"       "slab avalanche layers snow cross section"            "$ASSETS"
fetch_image "avalanche-slope-angle"        "steep mountain slope angle measurement"              "$ASSETS"
fetch_image "avalanche-terrain-trap"       "avalanche terrain trap gully cliff band"             "$ASSETS"
fetch_image "avalanche-debris"             "avalanche debris field snow blocks"                  "$ASSETS"
fetch_image "avalanche-crystal-types"      "snow crystal depth hoar facets"                      "$ASSETS"
fetch_image "avalanche-column-test"        "extended column test snowpack stability"             "$ASSETS"
fetch_image "avalanche-wind-signs"         "wind loading snow cornice drift"                     "$ASSETS"
fetch_image "avalanche-group-decision"     "group decision making backcountry skiing"            "$ASSETS"
fetch_image "avalanche-transceiver-search" "avalanche transceiver beacon search rescue"          "$ASSETS"

echo ""
echo "── Section: First Aid ──"

fetch_image "firstaid-scene-safety"        "wilderness first aid scene safety assessment"    "$ASSETS"
fetch_image "firstaid-assessment"          "patient assessment primary survey mountain"      "$ASSETS"
fetch_image "firstaid-head-to-toe"         "head to toe examination wilderness medicine"    "$ASSETS"
fetch_image "firstaid-altitude-symptoms"   "altitude sickness headache mountain symptoms"   "$ASSETS"
fetch_image "firstaid-frostbite-stages"    "frostbite fingers toes cold injury"             "$ASSETS"
fetch_image "firstaid-heat-exhaustion"     "heat exhaustion dehydration hiking summer"      "$ASSETS"
fetch_image "firstaid-hypothermia-treatment" "hypothermia treatment warming blanket rescue"  "$ASSETS"
fetch_image "firstaid-hypothermia-wrap"    "hypothermia wrap insulation emergency rescue"    "$ASSETS"
fetch_image "firstaid-improvised-litter"   "improvised stretcher litter wilderness evacuation" "$ASSETS"
fetch_image "firstaid-kit"                 "wilderness first aid kit medical supplies"       "$ASSETS"
fetch_image "firstaid-lightning-position"  "lightning protection position crouch mountain"   "$ASSETS"
fetch_image "firstaid-sam-splint"          "sam splint improvised splinting fracture"        "$ASSETS"
fetch_image "firstaid-snow-shelter"        "snow shelter quinzhee emergency bivouac winter"  "$ASSETS"
fetch_image "firstaid-wound-irrigation"    "wound irrigation cleaning wilderness medicine"   "$ASSETS"

echo ""
echo "── Section: Flying ──"

fetch_image "flying-blue-thermal-haze"     "blue haze thermal dome paragliding sky"         "$ASSETS"
fetch_image "flying-convergence-line"      "convergence line paragliding clouds"            "$ASSETS"
fetch_image "flying-cumulus-markers"       "cumulus cloud thermal markers paragliding"       "$ASSETS"
fetch_image "flying-low-save-terrain"      "low save paragliding landing field valley"      "$ASSETS"
fetch_image "flying-paraglider-thermal"    "paraglider circling thermal rising air"         "$ASSETS"
fetch_image "flying-sea-breeze-front"      "sea breeze front convergence coast"             "$ASSETS"
fetch_image "flying-speed-bar-cockpit"     "paraglider speed bar cockpit instruments"       "$ASSETS"
fetch_image "flying-sunny-slope"           "sunny slope thermal source paragliding"         "$ASSETS"
fetch_image "flying-thermal-street"        "thermal street cloud street paragliding"        "$ASSETS"
fetch_image "flying-three-lift-sources"    "ridge lift thermal dynamic lift paragliding"    "$ASSETS"
fetch_image "flying-valley-overview"       "alpine valley panorama paragliding"             "$ASSETS"
fetch_image "flying-xc-cockpit-setup"      "cross country paragliding GPS cockpit vario"   "$ASSETS"

echo ""
echo "── Section: Glacier ──"

fetch_image "glacier-bergschrund"          "bergschrund glacier headwall crevasse"          "$ASSETS"
fetch_image "glacier-camp-anchors"         "glacier camp tent anchors snow alpine"          "$ASSETS"
fetch_image "glacier-crevasse-field"       "crevasse field glacier surface ice"             "$ASSETS"
fetch_image "glacier-flow-patterns"        "glacier flow movement ice patterns blue"        "$ASSETS"
fetch_image "glacier-kiwi-coils"           "kiwi coils rope glacier carrying mountaineering" "$ASSETS"
fetch_image "glacier-marginal-crevasse"    "marginal crevasse glacier edge rock moraine"    "$ASSETS"
fetch_image "glacier-probe-technique"      "glacier probe technique snow testing crevasse"  "$ASSETS"
fetch_image "glacier-prusik-ascent"        "prusik ascending crevasse self rescue rope"     "$ASSETS"
fetch_image "glacier-rescue-complications" "crevasse rescue complication rope system"       "$ASSETS"
fetch_image "glacier-rope-team"            "rope team glacier travel alpine mountaineering" "$ASSETS"
fetch_image "glacier-simultaneous-travel"  "glacier simultaneous travel roped team"         "$ASSETS"
fetch_image "glacier-snow-bridge"          "snow bridge crevasse hidden danger glacier"     "$ASSETS"
fetch_image "glacier-summer-melt"          "glacier summer melt water streams ice"          "$ASSETS"
fetch_image "glacier-wanded-route"         "wanded route glacier markers bamboo poles"      "$ASSETS"

echo ""
echo "── Section: Navigation ──"

fetch_image "navigation-compass-map"       "compass on topographic map bearing navigation"  "$ASSETS"
fetch_image "navigation-map-scale"         "topographic map scale distance measuring"       "$ASSETS"
fetch_image "navigation-route-card"        "navigation route card timing planning mountain" "$ASSETS"
fetch_image "navigation-topo-contours"     "topographic contour lines elevation map"        "$ASSETS"

echo ""
echo "── Section: Rope Systems ──"

fetch_image "rope-anchor-system"           "climbing anchor equalized rock bolts mountain"  "$ASSETS"
fetch_image "rope-belay-device-setup"      "belay device ATC setup climbing harness"        "$ASSETS"
fetch_image "rope-coil"                    "coiled climbing rope mountaineering"            "$ASSETS"
fetch_image "rope-cordelette"              "cordelette anchor building climbing"            "$ASSETS"
fetch_image "rope-crevasse-lip"            "crevasse lip rescue edge glacier rope"          "$ASSETS"
fetch_image "rope-figure-eight"            "figure eight follow through knot climbing"      "$ASSETS"
fetch_image "rope-rappel-anchor"           "rappel anchor station climbing descent"         "$ASSETS"

echo ""
echo "── Section: Weather ──"

fetch_image "weather-atmosphere-layers"    "atmosphere layers troposphere stratosphere sky"  "$ASSETS"
fetch_image "weather-cloud-street"         "cloud street cumulus rows thermal convection"    "$ASSETS"
fetch_image "weather-cold-front"           "cold front weather system clouds approaching"   "$ASSETS"
fetch_image "weather-convergence-line"     "weather convergence line clouds meeting"        "$ASSETS"
fetch_image "weather-cumulonimbus"         "cumulonimbus thunderstorm anvil cloud"          "$ASSETS"
fetch_image "weather-cumulus"              "cumulus clouds fair weather blue sky mountain"   "$ASSETS"
fetch_image "weather-foehn-wall"           "foehn wall cloud mountain alpine"               "$ASSETS"
fetch_image "weather-lenticular"           "lenticular cloud mountain wave"                 "$ASSETS"
fetch_image "weather-lightning-ridge"      "lightning strike mountain ridge thunderstorm"    "$ASSETS"
fetch_image "weather-pressure-map"         "weather pressure map isobars synoptic chart"    "$ASSETS"
fetch_image "weather-station"              "mountain weather station instruments alpine"     "$ASSETS"

echo ""
echo "=== Done ==="
echo "Fetched: $FETCHED | Skipped: $SKIPPED | Failed: $FAILED"
echo "Total images: $(find "$ASSETS" -name '*.png' | wc -l | tr -d ' ')"
