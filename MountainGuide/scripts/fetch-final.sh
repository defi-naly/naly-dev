#!/bin/bash
# fetch-final.sh — Final retry for last 7 stubborn images
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

echo "=== Final Retry (7 remaining) ==="

fetch_image "hero-firstaid-fractures"   "broken arm splint"                 "$HEROES"
fetch_image "firstaid-head-to-toe"      "patient assessment"                "$ASSETS"
fetch_image "firstaid-snow-shelter"     "igloo snow winter"                 "$ASSETS"
fetch_image "flying-low-save-terrain"   "paraglider landing"               "$ASSETS"
fetch_image "glacier-bergschrund"       "glacier headwall ice"              "$ASSETS"
fetch_image "glacier-kiwi-coils"        "climbing rope coils"              "$ASSETS"
fetch_image "glacier-marginal-crevasse" "glacier moraine edge"             "$ASSETS"

echo ""
echo "=== Final Done ==="
echo "Fetched: $FETCHED | Failed: $FAILED"
echo "Total images: $(find "$ASSETS" -name '*.png' | wc -l | tr -d ' ')"
