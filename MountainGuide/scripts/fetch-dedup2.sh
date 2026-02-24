#!/bin/bash
# fetch-dedup2.sh — Final pass: use Python to fetch with duplicate avoidance
set -euo pipefail

cd /Users/dylanadams/Desktop/naly-dev/MountainGuide

python3 << 'PYEOF'
import os, json, hashlib, urllib.request, urllib.parse, subprocess, time, sys

ASSETS = "MountainGuide/Assets.xcassets/Photos"
HEROES = f"{ASSETS}/Heroes"

def get_existing_hashes():
    """Collect MD5 hashes of all current PNGs."""
    hashes = {}
    for root, dirs, files in os.walk(ASSETS):
        for f in files:
            if f.endswith('.png'):
                path = os.path.join(root, f)
                h = hashlib.md5(open(path, 'rb').read()).hexdigest()
                name = f.replace('.png', '')
                hashes[name] = h
    return hashes

def search_unsplash(query, per_page=5):
    """Search Unsplash, return list of regular URLs."""
    encoded = urllib.parse.quote(query)
    url = f"https://unsplash.com/napi/search/photos?query={encoded}&per_page={per_page}&orientation=squarish"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        return [r['urls']['regular'] for r in data.get('results', [])]
    except:
        return []

def download_and_resize(img_url, target_path):
    """Download image and resize to 1024x1024 PNG."""
    tmp = "/tmp/mg-dedup-img.jpg"
    try:
        req = urllib.request.Request(img_url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=15)
        with open(tmp, 'wb') as f:
            f.write(resp.read())
        subprocess.run(
            ["sips", "--resampleWidth", "1024", "--resampleHeight", "1024",
             "-s", "format", "png", tmp, "--out", target_path],
            capture_output=True, check=True
        )
        return True
    except:
        return False

def write_contents_json(imageset_dir, name):
    contents = {
        "images": [
            {"idiom": "universal", "scale": "1x"},
            {"filename": f"{name}.png", "idiom": "universal", "scale": "2x"},
            {"idiom": "universal", "scale": "3x"}
        ],
        "info": {"author": "xcode", "version": 1}
    }
    with open(os.path.join(imageset_dir, "Contents.json"), 'w') as f:
        json.dump(contents, f, indent=2)

def fetch_unique(name, queries, target_dir, used_hashes):
    """Try multiple queries, pick first result whose hash isn't already used."""
    imageset_dir = os.path.join(target_dir, f"{name}.imageset")
    target_path = os.path.join(imageset_dir, f"{name}.png")
    os.makedirs(imageset_dir, exist_ok=True)

    for query in queries:
        urls = search_unsplash(query, per_page=5)
        time.sleep(0.8)
        for url in urls:
            if download_and_resize(url, target_path):
                h = hashlib.md5(open(target_path, 'rb').read()).hexdigest()
                if h not in used_hashes:
                    used_hashes.add(h)
                    write_contents_json(imageset_dir, name)
                    size = os.path.getsize(target_path)
                    print(f"  OK   {name} ({size} bytes) [{query}]")
                    return True
                # else: duplicate, try next URL
        time.sleep(0.5)

    print(f"  FAIL {name} (all queries exhausted)")
    return False

# Build set of hashes we want to keep (non-duplicate originals)
print("Scanning existing images...")
name_hashes = get_existing_hashes()

# Find which names are duplicates
hash_to_names = {}
for name, h in name_hashes.items():
    hash_to_names.setdefault(h, []).append(name)

duplicate_groups = {h: names for h, names in hash_to_names.items() if len(names) > 1}
all_duped_names = set()
for h, names in duplicate_groups.items():
    # Keep the first name, re-fetch the rest
    for n in names[1:]:
        all_duped_names.add(n)

print(f"Found {len(all_duped_names)} images that need de-duplication")
print()

# Set of hashes that are "taken" — start with all unique images
used_hashes = set()
for name, h in name_hashes.items():
    if name not in all_duped_names:
        used_hashes.add(h)

# Also add the kept first-of-group
for h, names in duplicate_groups.items():
    used_hashes.add(h)

# Define replacement queries — multiple fallback queries per image
# Using very diverse, specific terms to maximize uniqueness
replacements = {
    # Rope domain
    "rope-anchor-system":           ["climbing protection cam nut", "trad gear rack", "climbing hardware"],
    "glacier-rescue-complications":  ["mountain rescue difficult", "high altitude rescue team", "alpine emergency"],
    "hero-rope-knots":              ["bowline knot rope", "rope knots sailing", "knot tying close up"],
    "glacier-kiwi-coils":           ["alpine mountaineering rope carry", "climber rope shoulder mountain", "expedition gear carry"],

    "glacier-summer-melt":          ["glacial stream meltwater", "ice melting summer", "glacier retreat water"],
    "hero-glacier-crevasse-id":     ["deep ice crevasse blue", "glacier crack danger", "crevasse opening"],
    "glacier-crevasse-field":       ["glacier icefall broken", "chaotic ice glacier", "glacier surface cracks"],
    "glacier-flow-patterns":        ["glacier striations ice", "ice flow blue", "glacial ice layers"],

    "glacier-probe-technique":      ["snow depth probe", "avalanche rescue probe", "probe pole snow mountain"],
    "rope-crevasse-lip":            ["snow overhang ledge", "glacier snow edge", "cornice snow mountain edge"],
    "avalanche-slab-anatomy":       ["snow layer profile", "snowpit layers", "snow stratigraphy"],

    "firstaid-altitude-symptoms":   ["mountain high altitude hiker", "thin air mountain summit", "altitude mountain fatigue"],
    "weather-foehn-wall":           ["foehn wind alps cloud", "cloud wall mountains", "orographic clouds alps"],

    "firstaid-improvised-litter":   ["wilderness rescue carry", "mountain emergency transport", "backcountry rescue carry"],
    "hero-firstaid-wounds":         ["first aid bandage outdoor", "wound dressing wilderness", "emergency wound care"],

    "firstaid-sam-splint":          ["arm sling injury", "emergency splint treatment", "immobilize arm outdoor"],
    "hero-firstaid-fractures":      ["broken bone treatment", "bone fracture emergency", "injury treatment limb"],

    "hero-rope-crevasse":           ["glacier rescue operation", "ice climbing rescue", "rope rescue snow"],
    "avalanche-debris":             ["avalanche destruction", "snow slide aftermath", "avalanche damage"],

    "hero-rope-belaying":           ["lead climbing outdoor rock", "sport climber rock face", "climbing belay partner"],
    "hero-rope-top-rope":           ["rock climbing outdoor crag", "climber on wall outdoor", "bouldering outdoor"],

    "hero-navigation-emergency":    ["lost hiker mountain fog", "hiker GPS navigation", "mountain navigation compass"],
    "avalanche-slope-angle":        ["steep snow covered slope", "mountain slope winter", "incline snow mountain"],

    "avalanche-wind-signs":         ["wind drift snow mountain", "windblown snow patterns", "snow wind deposit"],
    "firstaid-snow-shelter":        ["snow hole shelter", "winter bivouac dig", "snow cave entrance"],

    "flying-blue-thermal-haze":     ["haze sky thermal", "heat shimmer air", "atmospheric haze mountains"],
    "flying-paraglider-thermal":    ["paraglider circling sky", "paragliding turn thermal", "paraglider spiral"],

    "weather-station":              ["meteorological station", "weather instruments outdoor", "anemometer wind measurement"],
    "weather-pressure-map":         ["barometer instrument", "atmospheric pressure gauge", "weather forecast chart"],

    "glacier-rope-team":            ["roped mountaineers glacier", "expedition glacier walk", "climbers roped snow"],
    "glacier-simultaneous-travel":  ["alpine team mountaineering", "group glacier crossing", "mountaineers walking snow"],

    "rope-rappel-anchor":           ["abseiling cliff face", "climber descending rope", "rappel setup rock"],
    "flying-low-save-terrain":      ["green landing field valley", "open field mountains", "meadow mountain valley"],
    "flying-convergence-line":      ["cloud line sky front", "meeting clouds weather", "stratocumulus clouds line"],
}

fetched = 0
failed = 0

for name, queries in replacements.items():
    # Determine target dir
    target_dir = HEROES if name.startswith("hero-") else ASSETS
    if fetch_unique(name, queries, target_dir, used_hashes):
        fetched += 1
    else:
        failed += 1
    time.sleep(0.3)

print()
print(f"=== Done: Fetched {fetched} | Failed {failed} ===")

# Final duplicate check
print()
print("Final duplicate check:")
final_hashes = get_existing_hashes()
h2n = {}
for name, h in final_hashes.items():
    h2n.setdefault(h, []).append(name)
dupes = {h: n for h, n in h2n.items() if len(n) > 1}
if dupes:
    for h, names in sorted(dupes.items(), key=lambda x: -len(x[1])):
        print(f"  {len(names)}x: {' | '.join(names)}")
else:
    print("  None! All unique!")
PYEOF
