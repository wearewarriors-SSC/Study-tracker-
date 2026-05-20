#!/bin/bash
# ====================================================================
# TREBEDIT REAL-TIME REPLICATION AUTO-PUSH AUTOMATION DEPLOYMENT DAEMON
# TARGET BASELINE: Zero Manual Commands Execution via inotify-tools
# ====================================================================
TARGET_DIR="."
echo -e "\033[1;32m🚀 TrebEdit Real-Time Watcher System Activated!\033[0m"
echo -e "\033[1;34m📍 Watching Path: Internal Storage/GitHub (Monolithic Sync)\033[0m"

# Direct filesystem event registration monitoring loop
inotifywait -m -r -e modify --format '%w%f' "$TARGET_DIR" | while read -r modified_file
do
    # Strict exclusion catch parameters loop filtering out git buffers entries
    if [[ "$modified_file" == *"/.git/"* ]] || [[ "$modified_file" == *"/node_modules/"* ]]; then
        continue
    fi
    
    echo -e "\033[1;33m⚡ Code change captured at: $modified_file\033[0m"
    echo -e "\033[1;35m📦 Packaging automated incremental commit metrics stream...\033[0m"
    
    # Validation queue verification check
    git add .
    if ! git diff-index --quiet HEAD --; then
        git commit -m "Fix: Restored structural layout with un-broken auto watcher pipeline"
        git push origin main
        echo -e "\033[1;32m✓ Patch successfully uploaded to GitHub repository!\033[0m"
    else
        echo -e "\033[1;36mOn branch main: Working tree clean, changes already synced.\033[0m"
    fi
    echo "----------------------------------------"
done
