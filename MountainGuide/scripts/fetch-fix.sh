#!/bin/bash
# fetch-fix.sh — Final targeted fixes for off-topic images
# Use mountain/outdoor-centric queries that guarantee relevant results
set -euo pipefail

cd /Users/dylanadams/Desktop/naly-dev/MountainGuide

python3 << 'PYEOF'
import os, json, hashlib, urllib.request, urllib.parse, subprocess, time

ASSETS = "MountainGuide/Assets.xcassets/Photos"
HEROES = f"{ASSETS}/Heroes"

def get_all_hashes(exclude_names=None):
    hashes = set()
    exclude_names = exclude_names or set()
    for root, dirs, files in os.walk(ASSETS):
        for f in files:
            if f.endswith('.png'):
                name = f.replace('.png', '')
                if name in exclude_names:
                    continue
                path = os.path.join(root, f)
                hashes.add(hashlib.md5(open(path, 'rb').read()).hexdigest())
    return hashes

def search_unsplash(query, per_page=5):
    encoded = urllib.parse.quote(query)
    url = f"https://unsplash.com/napi/search/photos?query={encoded}&per_page={per_page}&orientation=squarish"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        return [r['urls']['regular'] for r in data.get('results', [])]
    except:
        return []

def download_resize(img_url, target_path):
    tmp = "/tmp/mg-fix-img.jpg"
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

def write_contents(imageset_dir, name):
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
    imageset_dir = os.path.join(target_dir, f"{name}.imageset")
    target_path = os.path.join(imageset_dir, f"{name}.png")
    os.makedirs(imageset_dir, exist_ok=True)

    for query in queries:
        urls = search_unsplash(query, per_page=5)
        time.sleep(0.8)
        for url in urls:
            if download_resize(url, target_path):
                h = hashlib.md5(open(target_path, 'rb').read()).hexdigest()
                if h not in used_hashes:
                    used_hashes.add(h)
                    write_contents(imageset_dir, name)
                    size = os.path.getsize(target_path)
                    print(f"  OK   {name} ({size} bytes) q=[{query}]")
                    return True
        time.sleep(0.3)

    print(f"  FAIL {name}")
    return False

# All names we're about to fix
fix_names = set()
fixes = {}

# ── Off-topic images that need replacement ──
# Strategy: use broader outdoor/mountain terms that Unsplash has good coverage for

# Rope domain — Unsplash is terrible at climbing gear, use mountain climbing scenes
fixes["rope-figure-eight"] = (ASSETS, [
    "rock climbing close up hands",
    "climbing wall grip",
    "mountaineer hands rock"
])
fixes["rope-cordelette"] = (ASSETS, [
    "climbing equipment rack",
    "carabiner climbing gear",
    "mountaineering equipment"
])
fixes["rope-anchor-system"] = (ASSETS, [
    "rock face climbing bolts",
    "via ferrata steel cable",
    "climbing wall holds"
])
fixes["rope-belay-device-setup"] = (ASSETS, [
    "climbing harness gear",
    "rock climbing safety equipment",
    "climbing helmet rope"
])
fixes["rope-coil"] = (ASSETS, [
    "climbing rope colorful",
    "nylon rope texture",
    "rope pile dock"
])
fixes["rope-rappel-anchor"] = (ASSETS, [
    "abseiling mountain",
    "rappelling cliff person",
    "cliff edge mountain view"
])
fixes["hero-rope-knots"] = (HEROES, [
    "thick rope dock knot",
    "marine rope tied",
    "hemp rope detail"
])
fixes["hero-rope-mechanics"] = (HEROES, [
    "climbing rope dynamic colorful",
    "rope bridge suspension",
    "steel cable bridge mountain"
])
fixes["hero-rope-rescue"] = (HEROES, [
    "helicopter rescue mountain snow",
    "mountain rescue helicopter",
    "air rescue alps"
])
fixes["hero-glacier-anatomy"] = (HEROES, [
    "glacier blue ice aerial view",
    "glacier ice cave blue",
    "glacier tongue aerial"
])
fixes["flying-paraglider-thermal"] = (ASSETS, [
    "paraglider flying above mountains",
    "paragliding mountain view",
    "paraglider sky alps"
])
fixes["navigation-compass-map"] = (ASSETS, [
    "compass hiking map outdoors",
    "vintage compass map",
    "orienteering compass"
])
fixes["navigation-topo-contours"] = (ASSETS, [
    "topographic map lines",
    "map contour brown lines",
    "cartography paper map"
])

# Also fix some marginal ones
fixes["firstaid-kit"] = (ASSETS, [
    "medical kit outdoor",
    "first aid supplies",
    "emergency medical bag"
])
fixes["weather-station"] = (ASSETS, [
    "weather vane anemometer",
    "wind measurement device",
    "weather observation"
])

for n in fixes:
    fix_names.add(n)

used = get_all_hashes(exclude_names=fix_names)
fetched = 0
failed = 0

for name, (target_dir, queries) in fixes.items():
    if fetch_unique(name, queries, target_dir, used):
        fetched += 1
    else:
        failed += 1
    time.sleep(0.3)

print()
print(f"Fixed: {fetched} | Failed: {failed}")

# Final dupe check
print()
print("Duplicate check (all images):")
all_h = {}
for root, dirs, files in os.walk(ASSETS):
    for f in files:
        if f.endswith('.png'):
            path = os.path.join(root, f)
            h = hashlib.md5(open(path, 'rb').read()).hexdigest()
            name = f.replace('.png', '')
            all_h.setdefault(h, []).append(name)
dupes = {h: n for h, n in all_h.items() if len(n) > 1}
if dupes:
    for h, names in sorted(dupes.items(), key=lambda x: -len(x[1])):
        print(f"  {len(names)}x: {' | '.join(names)}")
else:
    print("  All unique!")
PYEOF
