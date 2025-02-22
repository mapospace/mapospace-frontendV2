import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, LoadScript, HeatmapLayer, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "600px"
};

const center = {
    lat: 28.65, // Center around Delhi
    lng: 77.2
};

const data = [
    {
        totalSales: 5464.17,
        location: { coordinates: [77.27, 28.740000000000002] }
    },
    {
        totalSales: 36063.35,
        location: { coordinates: [77.16, 28.5] }
    }
];

const Heatmap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API Key
        libraries: ["visualization"] // Required for heatmap
    });

    // ✅ Only create heatmap data after Google Maps has loaded
    const heatmapData = useMemo(() => {
        if (!isLoaded || !window.google) return [];

        return data.map(point => ({
            location: new window.google.maps.LatLng(
                point.location.coordinates[1], // Lat
                point.location.coordinates[0]  // Lng
            ),
            weight: point.totalSales // Weight by sales
        }));
    }, [isLoaded]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            <HeatmapLayer
                data={heatmapData.map(p => p.location)}
                options={{
                    radius: 40,
                    opacity: 0.7,
                    gradient: [
                        "rgba(0, 255, 255, 0)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 191, 255, 1)",
                        "rgba(0, 127, 255, 1)",
                        "rgba(0, 63, 255, 1)",
                        "rgba(0, 0, 255, 1)",
                        "rgba(0, 0, 223, 1)",
                        "rgba(0, 0, 191, 1)",
                        "rgba(0, 0, 159, 1)",
                        "rgba(0, 0, 127, 1)"
                    ]
                }}
            />
        </GoogleMap>
    );
};

export default Heatmap;
