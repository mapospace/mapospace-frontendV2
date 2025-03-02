"use client";

import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState, useRef, useMemo } from "react";

const H3Map = ({ h3Data, center = { lat: 28.6139, lng: 77.209 }, zoom = 12, Icon, label }) => {
    const [hoveredPolygon, setHoveredPolygon] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const mapRef = useRef(null);

    const getColorByValue = (value) => {
        if (value > 40000) return "#0136f8";
        if (value > 35000) return "#1a4af9";
        if (value > 30000) return "#345ef9";
        if (value > 25000) return "#4d72fa";
        if (value > 20000) return "#6786fb";
        if (value > 15000) return "#809bfc";
        if (value > 10000) return "#99affc";
        if (value > 5000) return "#b3c3fd";
        return "#ccd7fe";
    };

    const polygons = useMemo(() =>
        h3Data.map((item, index) => ({
            id: index,
            path: item.coordinates.map(([lat, lng]) => ({ lat, lng })),
            color: getColorByValue(item.totalOrderValue),
            value: item.totalOrderValue,
            center: item.coordinates.reduce(
                (acc, [lat, lng]) => ({ lat: acc.lat + lat / item.coordinates.length, lng: acc.lng + lng / item.coordinates.length }),
                { lat: 0, lng: 0 }
            )
        })),
        [h3Data]
    );

    const handleMouseOver = (poly) => {
        setHoveredPolygon(poly);

        if (mapRef.current) {
            const projection = mapRef.current.getProjection();
            if (projection) {
                const point = projection.fromLatLngToPoint(new window.google.maps.LatLng(poly.center.lat, poly.center.lng));
                setTooltipPosition({ x: point.x, y: point.y });
            }
        }
    };

    const handleMouseOut = () => {
        setHoveredPolygon(null);
        setTooltipPosition(null);
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "8px" }}
                center={mapCenter} // Prevents reset
                zoom={zoom}
                options={{
                    streetViewControl: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false
                }}
                onLoad={(map) => (mapRef.current = map)}
            >
                {polygons.map((poly) => (
                    <Polygon
                        key={poly.id}
                        paths={poly.path}
                        options={{
                            fillColor: poly.color,
                            fillOpacity: 0.4,
                            strokeColor: "#000",
                            strokeWeight: 1,
                        }}
                        onMouseOver={() => handleMouseOver(poly)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
            </GoogleMap>

            {hoveredPolygon && tooltipPosition && (
                <div
                    style={{
                        position: "absolute",
                        top: `10px`,
                        left: `10px`,
                        background: "rgba(256,256,256)",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        pointerEvents: "none",
                        // transform: "translate(-50%, -50%)"
                    }}
                    className="flex flex-col items-center justify-center border border-secondary-900"
                >
                    <Icon className="text-black w-10 h-10" />
                    <div className="text-black text-f-2xl font-normal">
                        {label}
                    </div>
                    <div className="text-secondary-900  text-f-2xl font-semibold"> {hoveredPolygon.value.toFixed(2)}
                    </div>

                </div>
            )}
        </div>
    );
};

export default H3Map;
