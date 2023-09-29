#!/bin/bash

echo "Starting the update_device.sh script..."

# Get the list of devices
echo "Fetching the list of devices..."
devices=$(applesimutils --list)
echo "Fetched the list of devices."

# Extract the name and type of the first available iPhone device
echo "Extracting the name and type of the first available iPhone device..."
device_info=$(echo $devices | jq -r '.[] | select(.name | test("iPhone")) | {name: .name, type: .deviceTypeIdentifier} | @base64' | head -n 1)

if [ -z "$device_info" ]; then
  echo "Error: No iPhone device found!"
  exit 1
fi

device_name=$(echo $device_info | base64 --decode | jq -r '.name')
device_type=$(echo $device_info | base64 --decode | jq -r '.type')
echo "Selected Device Name: $device_name"
echo "Selected Device Type: $device_type"

# Create a backup of the .detoxrc.js file
echo "Creating a backup of the .detoxrc.js file..."
echo "Backup created as .detoxrc.js.bak."

# Update .detoxrc.js with the new device name and type
echo "Updating .detoxrc.js with the new device name and type..."
sed -i.bak -e "s/type: 'iPhone 15 Pro'/type: '$device_name'/" -e "s/type: 'com.apple.CoreSimulator.SimDeviceType.iPhone-15-Pro'/type: '$device_type'/" .detoxrc.js
echo ".detoxrc.js has been updated."

echo "Script execution completed."
