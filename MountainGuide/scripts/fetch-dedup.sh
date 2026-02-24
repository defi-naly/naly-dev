#!/bin/bash
# fetch-dedup.sh — Re-fetch duplicate/bad images with maximally distinct queries
set -euo pipefail

ASSETS="MountainGuide/Assets.xcassets/Photos"
HEROES="$ASSETS/Heroes"
TMP_IMG="/tmp/mg-fetch-img.jpg"
SLEEP_SECS=1.2
FETCHED=0
FAILED=0

fetch() {
    local name="$1"
    local query="$2"
    local target_dir="$3"
    local target_path="$target_dir/$name.imageset/$name.png"
    local contents_path="$target_dir/$name.imageset/Contents.json"

    mkdir -p "$target_dir/$name.imageset"

    local encoded_query
    encoded_query=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$query")
    local search_url="https://unsplash.com/napi/search/photos?query=${encoded_query}&per_page=3&orientation=squarish"

    # Get up to 3 results so we can pick one that's different
    local img_url
    img_url=$(curl -s "$search_url" | python3 -c "
import sys, json, hashlib, os

target_dir = '$target_dir'
name = '$name'

# Collect hashes of all existing PNGs in Assets to avoid dupes
existing_hashes = set()
for root, dirs, files in os.walk('MountainGuide/Assets.xcassets/Photos'):
    for f in files:
        if f.endswith('.png'):
            path = os.path.join(root, f)
            # Skip the file we're about to replace
            if name + '.png' == f:
                continue
            try:
                existing_hashes.add(hashlib.md5(open(path, 'rb').read()).hexdigest())
            except:
                pass

try:
    d = json.load(sys.stdin)
    results = d.get('results', [])
    if results:
        # Just pick first result - with unique queries this should be fine
        print(results[0]['urls']['regular'])
    else:
        print('')
except:
    print('')
" 2>/dev/null)

    if [ -z "$img_url" ]; then
        echo "  FAIL $name (no results: $query)"
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

echo "=== De-duplicate & Fix Bad Images ==="
echo "Strategy: maximally distinct single-word or niche queries"
echo ""

# ── ROPE DOMAIN ──
# Avoid generic "climbing rope" queries that all return the same GoPro guy
echo "── Rope ──"
fetch "rope-coil"               "orange rope coiled ground"             "$ASSETS"
fetch "rope-belay-device-setup" "belay device carabiner harness"        "$ASSETS"
fetch "rope-figure-eight"       "eight knot close"                      "$ASSETS"
fetch "rope-cordelette"         "nylon cord sling"                      "$ASSETS"
fetch "rope-anchor-system"      "trad climbing gear rack"               "$ASSETS"
fetch "rope-rappel-anchor"      "rappel descent rope cliff"             "$ASSETS"
fetch "rope-crevasse-lip"       "glacier edge snow overhang"            "$ASSETS"
fetch "hero-rope-knots"         "nautical knot rope"                    "$HEROES"
fetch "hero-rope-mechanics"     "bungee rope stretch"                   "$HEROES"
fetch "hero-rope-rescue"        "search rescue helicopter winch"        "$HEROES"
fetch "hero-rope-anchors"       "piton bolt rock"                       "$HEROES"
fetch "hero-rope-belaying"      "sport climbing wall outdoor"           "$HEROES"

# ── GLACIER DOMAIN ──
echo ""
echo "── Glacier ──"
fetch "glacier-prusik-ascent"          "ice climbing vertical"                "$ASSETS"
fetch "glacier-rescue-complications"   "crevasse rescue rope"                 "$ASSETS"
fetch "glacier-kiwi-coils"             "mountaineer carrying coils"           "$ASSETS"
fetch "glacier-flow-patterns"          "blue glacial ice texture"             "$ASSETS"
fetch "glacier-simultaneous-travel"    "group hiking glacier"                 "$ASSETS"
fetch "glacier-marginal-crevasse"      "rocky glacier lateral moraine"        "$ASSETS"
fetch "glacier-bergschrund"            "bergschrund"                          "$ASSETS"
fetch "glacier-crevasse-field"         "icefall seracs glacier"               "$ASSETS"
fetch "glacier-summer-melt"            "glacier meltwater river"              "$ASSETS"
fetch "glacier-camp-anchors"           "alpine basecamp tent snow"            "$ASSETS"
fetch "glacier-probe-technique"        "avalanche probe snow"                 "$ASSETS"
fetch "hero-glacier-anatomy"           "glacier aerial crevasse"              "$HEROES"
fetch "hero-glacier-crevasse-id"       "crevasse pattern glacier"             "$HEROES"

# ── AVALANCHE DOMAIN ──
echo ""
echo "── Avalanche ──"
fetch "avalanche-triangle-overview"    "avalanche warning sign"               "$ASSETS"
fetch "avalanche-slab-anatomy"         "snowpack layers"                      "$ASSETS"
fetch "avalanche-debris"               "avalanche path debris"                "$ASSETS"
fetch "avalanche-crystal-types"        "snowflake crystal macro"              "$ASSETS"
fetch "avalanche-wind-signs"           "snow cornice ridge"                   "$ASSETS"
fetch "avalanche-slope-angle"          "steep slope ski touring"              "$ASSETS"
fetch "avalanche-terrain-trap"         "narrow mountain gully winter"         "$ASSETS"

# ── FIRST AID ──
echo ""
echo "── First Aid ──"
fetch "firstaid-improvised-litter"     "mountain stretcher carry"             "$ASSETS"
fetch "firstaid-altitude-symptoms"     "mountain summit altitude"             "$ASSETS"
fetch "firstaid-sam-splint"            "splint arm injury"                    "$ASSETS"
fetch "firstaid-snow-shelter"          "bivouac emergency winter"             "$ASSETS"
fetch "hero-firstaid-hypothermia"      "frostbite cold winter"                "$HEROES"
fetch "hero-firstaid-wounds"           "wound bandage field"                  "$HEROES"
fetch "hero-firstaid-fractures"        "fracture treatment outdoor"           "$HEROES"

# ── FLYING ──
echo ""
echo "── Flying ──"
fetch "flying-paraglider-thermal"      "paraglider soaring thermal"           "$ASSETS"
fetch "flying-low-save-terrain"        "emergency landing field"              "$ASSETS"
fetch "flying-cumulus-markers"         "fair weather cumulus"                  "$ASSETS"
fetch "flying-convergence-line"        "weather front clouds"                 "$ASSETS"
fetch "flying-xc-cockpit-setup"        "flight instrument panel"              "$ASSETS"
fetch "flying-speed-bar-cockpit"       "paraglider harness cockpit"           "$ASSETS"

# ── NAVIGATION ──
echo ""
echo "── Navigation ──"
fetch "navigation-compass-map"         "compass map orienteering"             "$ASSETS"
fetch "navigation-topo-contours"       "topographic map contour"              "$ASSETS"

# ── WEATHER ──
echo ""
echo "── Weather ──"
fetch "weather-atmosphere-layers"      "atmosphere sunset sky layers"         "$ASSETS"
fetch "weather-cloud-street"           "cloud formation rows"                 "$ASSETS"
fetch "weather-lightning-ridge"        "lightning storm night"                 "$ASSETS"
fetch "weather-station"                "weather station instruments"           "$ASSETS"
fetch "weather-pressure-map"           "barometer pressure instrument"        "$ASSETS"

echo ""
echo "=== De-dup Done ==="
echo "Fetched: $FETCHED | Failed: $FAILED"

# Re-check duplicates
echo ""
echo "Remaining duplicates:"
python3 -c "
import os, hashlib
from collections import defaultdict
hashes = defaultdict(list)
for root, dirs, files in os.walk('MountainGuide/Assets.xcassets/Photos'):
    for f in files:
        if f.endswith('.png'):
            path = os.path.join(root, f)
            h = hashlib.md5(open(path, 'rb').read()).hexdigest()
            hashes[h].append(os.path.basename(os.path.dirname(path)).replace('.imageset',''))
dupes = {h: p for h, p in hashes.items() if len(p) > 1}
if dupes:
    for h, paths in sorted(dupes.items(), key=lambda x: -len(x[1])):
        print(f'  {len(paths)}x: {\" | \".join(paths)}')
else:
    print('  None!')
"
