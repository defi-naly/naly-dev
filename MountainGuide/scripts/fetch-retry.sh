#!/bin/bash
# fetch-retry.sh — Retry failed images with broader search queries
set -euo pipefail

ASSETS="MountainGuide/Assets.xcassets/Photos"
HEROES="$ASSETS/Heroes"
TMP_IMG="/tmp/mg-fetch-img.jpg"
SLEEP_SECS=1.5
FETCHED=0
FAILED=0

fetch_image() {
    local name="$1"
    local query="$2"
    local target_dir="$3"
    local target_path="$target_dir/$name.imageset/$name.png"
    local contents_path="$target_dir/$name.imageset/Contents.json"

    mkdir -p "$target_dir/$name.imageset"

    local encoded_query
    encoded_query=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$query'''))")
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
        echo "  FAIL $name (query: $query)"
        FAILED=$((FAILED + 1))
        return 0
    fi

    if ! curl -sL -o "$TMP_IMG" "$img_url"; then
        echo "  FAIL $name (download failed)"
        FAILED=$((FAILED + 1))
        return 0
    fi

    if ! sips --resampleWidth 1024 --resampleHeight 1024 -s format png "$TMP_IMG" --out "$target_path" >/dev/null 2>&1; then
        echo "  FAIL $name (sips failed)"
        FAILED=$((FAILED + 1))
        return 0
    fi

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
    sleep "$SLEEP_SECS"
}

echo "=== Retry Failed Images (34) ==="
echo ""

# Heroes - 7 failed
echo "── Heroes ──"
fetch_image "hero-firstaid-fractures"  "splint fracture wilderness"            "$HEROES"
fetch_image "hero-glacier-crevasse-id" "glacier crevasse ice"                  "$HEROES"
fetch_image "hero-navigation-night"    "night mountain headlamp"               "$HEROES"
fetch_image "hero-rope-belaying"       "rock climbing belay"                   "$HEROES"
fetch_image "hero-rope-improvised"     "climbing anchor natural rock"          "$HEROES"
fetch_image "hero-rope-multi-pitch"    "multi pitch rock climbing"             "$HEROES"
fetch_image "hero-rope-top-rope"       "rock climbing outdoor"                 "$HEROES"

# Avalanche - 3 failed
echo ""
echo "── Avalanche ──"
fetch_image "avalanche-terrain-trap"   "avalanche gully mountain snow"         "$ASSETS"
fetch_image "avalanche-debris"         "avalanche snow destruction"            "$ASSETS"
fetch_image "avalanche-wind-signs"     "snow cornice mountain wind"            "$ASSETS"

# First Aid - 6 failed
echo ""
echo "── First Aid ──"
fetch_image "firstaid-head-to-toe"     "medical examination patient outdoor"   "$ASSETS"
fetch_image "firstaid-altitude-symptoms" "mountain altitude headache climber"  "$ASSETS"
fetch_image "firstaid-improvised-litter" "stretcher rescue mountain"           "$ASSETS"
fetch_image "firstaid-kit"             "first aid kit medical"                 "$ASSETS"
fetch_image "firstaid-snow-shelter"    "snow cave shelter winter"              "$ASSETS"
fetch_image "firstaid-wound-irrigation" "wound care bandage medical"           "$ASSETS"

# Flying - 3 failed
echo ""
echo "── Flying ──"
fetch_image "flying-blue-thermal-haze" "paragliding sky haze"                  "$ASSETS"
fetch_image "flying-low-save-terrain"  "paragliding landing field"             "$ASSETS"
fetch_image "flying-three-lift-sources" "paragliding soaring mountain"         "$ASSETS"

# Glacier - 8 failed
echo ""
echo "── Glacier ──"
fetch_image "glacier-bergschrund"      "glacier ice crevasse mountain"         "$ASSETS"
fetch_image "glacier-crevasse-field"   "glacier crevasse ice blue"             "$ASSETS"
fetch_image "glacier-kiwi-coils"       "mountaineering rope coils glacier"     "$ASSETS"
fetch_image "glacier-marginal-crevasse" "glacier edge moraine crevasse"        "$ASSETS"
fetch_image "glacier-probe-technique"  "snow probe avalanche safety"           "$ASSETS"
fetch_image "glacier-prusik-ascent"    "climbing rope ascending"               "$ASSETS"
fetch_image "glacier-rope-team"        "mountaineering glacier rope team"      "$ASSETS"
fetch_image "glacier-snow-bridge"      "glacier snow bridge crossing"          "$ASSETS"

# Rope - 2 failed
echo ""
echo "── Rope ──"
fetch_image "rope-anchor-system"       "climbing anchor bolts rock"            "$ASSETS"
fetch_image "rope-rappel-anchor"       "rappelling climbing descent"           "$ASSETS"

# Weather - 5 failed
echo ""
echo "── Weather ──"
fetch_image "weather-atmosphere-layers" "sky layers atmosphere clouds"         "$ASSETS"
fetch_image "weather-cloud-street"     "rows of cumulus clouds sky"            "$ASSETS"
fetch_image "weather-lenticular"       "lenticular cloud mountain"             "$ASSETS"
fetch_image "weather-lightning-ridge"  "lightning mountain storm"              "$ASSETS"
fetch_image "weather-station"          "weather station instruments"           "$ASSETS"

echo ""
echo "=== Retry Done ==="
echo "Fetched: $FETCHED | Failed: $FAILED"
echo "Total images: $(find "$ASSETS" -name '*.png' | wc -l | tr -d ' ')"
