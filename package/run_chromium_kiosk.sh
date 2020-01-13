#!/bin/bash

#https://peter.sh/experiments/chromium-command-line-switches/

command -v chromium-browser >/dev/null 2>&1 || {
    echo "Chromium Browser not found. installing."
    sudo apt-get update
    sudo apt-get install -y chromium-browser
}

command -v unclutter >/dev/null 2>&1 || {
    echo "Unclutter not found. installing."
    sudo apt-get update
    sudo apt-get install -y unclutter
}

# Hide the mouse from the display
unclutter &
 
# If Chromium crashes (usually due to rebooting), 
# clear the crash flag so we don't see the warning bar
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

# explicitly clear all browsing data on load?

# Start the browser in kiosk mode
/usr/bin/chromium-browser \
    --no-default-browser-check \
    --no-first-run \
    --password-store=basic \
    --force-device-scale-factor=0.75 \
    --app=http://localhost:3000 \
    --kiosk