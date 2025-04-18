#!/bin/bash

# Create textures directory if it doesn't exist
mkdir -p public/textures

# Download earth texture map (Blue Marble from NASA)
curl -L "https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.200412.3x21600x10800.jpg" -o "public/textures/earth-texture.jpg"

# Download earth bump map (Topography data)
curl -L "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_08_rev_elev_21600x10800.png" -o "public/textures/earth-bump.jpg"

# Download cloud texture
curl -L "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud.mod02.2002169.721.1km.jpg" -o "public/textures/earth-clouds.jpg"

echo "Textures downloaded successfully!" 