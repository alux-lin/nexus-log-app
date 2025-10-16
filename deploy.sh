#!/bin/bash

# A script to build the Nexus Log React app and package it as a WordPress plugin.
#
# INSTRUCTIONS:
# 1. Save this file as "deploy.sh" INSIDE your "nexus-log-app" folder.
# 2. Open your terminal and navigate into the "nexus-log-app" folder.
# 3. Run the command: chmod +x deploy.sh
#    (You only need to do this once to make the script executable).
# 4. Run the script from within "nexus-log-app" by typing: ./deploy.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 Starting Nexus Log deployment script from within app directory..."

# --- Step 1: Build the React Application ---
echo " "
echo "📦 Building React app in current directory..."
# No need to cd, we are already in the app directory.
npm run build
echo "✅ React build complete. Output is in 'dist/' folder."

# --- Step 2: Update the Plugin Files ---
echo " "
echo "🚚 Updating WordPress plugin files..."
# Define paths relative to the current (nexus-log-app) directory
PLUGIN_PATH="../nexus-log-plugin"
PLUGIN_APP_PATH="$PLUGIN_PATH/app"
# Remove the old app folder to ensure a clean slate
rm -rf "$PLUGIN_APP_PATH"
# Create a new, empty app folder
mkdir "$PLUGIN_APP_PATH"
# Copy all files from the local build output (dist) into the plugin's app folder
cp -R dist/* "$PLUGIN_APP_PATH/"
echo "✅ Plugin files updated."

# --- Step 3: Create the New Zip File ---
echo " "
echo "🤐 Creating new plugin zip file..."
# Define the path for the final zip file in the parent directory
ZIP_FILE_PATH="nexus-log-plugin.zip"
# Remove the old zip file if it exists
rm -f "$ZIP_FILE_PATH"
# Navigate to the parent directory to create the zip correctly
cd ..
# Create a new zip archive of the entire plugin directory
zip -r "$ZIP_FILE_PATH" nexus-log-plugin
# Navigate back into the app directory so the user's terminal session is where it started
cd nexus-log-app
echo "✅ New zip file created at: $ZIP_FILE_PATH"

# --- All Done! ---
echo " "
echo "🎉 Deployment complete! You can now upload 'nexus-log-plugin.zip' to your WordPress site."

