// components/Maps/GoogleMapsProvider.jsx
"use client"; // ✅ Force this component to run on the client side

import { useLoadScript } from "@react-google-maps/api";
import React from "react";

const libraries = ["visualization", "drawing"];

const GoogleMapsProvider = ({ children }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Use environment variable
        libraries
    });

    if (!isLoaded) return <div>Loading Google Maps...</div>;

    return <>{children}</>;
};

export default GoogleMapsProvider;
