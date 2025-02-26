"use client";

import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const H3Map = ({ h3Data }) => {
    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
        const parsedPolygons = h3Data.map((item) => ({
            path: item.coordinates.map(([lat, lng]) => ({ lat, lng })),
            color: getColorByValue(item.totalOrderValue),
        }));
        setPolygons(parsedPolygons);
    }, [h3Data]);

    const getColorByValue = (value) => {
        if (value > 40000) return "#0136f8"; // Red
        if (value > 35000) return "#1a4af9"; // Orange Red
        if (value > 30000) return "#345ef9"; // Dark Orange
        if (value > 25000) return "#4d72fa"; // Orange
        if (value > 20000) return "#6786fb"; // Gold
        if (value > 15000) return "#809bfc"; // Green Yellow
        if (value > 10000) return "#99affc"; // Chartreuse
        if (value > 5000) return "#b3c3fd"; // Lime Green
        return "#ccd7fe"; // Green
    };
    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "8px" }}
            center={{ lat: 28.6139, lng: 77.209 }}
            zoom={12}
            options={{
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false
            }}
        >
            {polygons.map((poly, index) => (
                <Polygon
                    key={index}
                    paths={poly.path}
                    options={{
                        fillColor: poly.color,
                        fillOpacity: 0.4,
                        strokeColor: "#000",
                        strokeWeight: 1,
                    }}
                />
            ))}
        </GoogleMap>
    )
}

export default H3Map