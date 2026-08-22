import os, json, glob

matches = []
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.json') or f.endswith('.md') or f.endswith('.js') or f.endswith('.ts'):
            path = os.path.join(root, f)
            try:
                content = open(path, encoding='utf-8', errors='ignore').read()
                if '57' in content:
                    lines = content.split('\n')
                    for i, l in enumerate(lines):
                        if '57' in l and any(w in l.lower() for w in ['node', 'canonical', 'tree', 'org', 'master', 'hierarchy']):
                            print(f"{path}:{i+1} -> {l.strip()}")
            except:
                pass
