"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const mapCenter = {
    lat: 28.6139, // New Delhi (default center)
    lng: 77.2090,
};

const ClusterMap = ({ data, label, Icon }) => {
    const mapRef = useRef(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        if (window.google && window.google.maps && mapRef.current) {
            createClusterMarkers(mapRef.current);
        }
    }, [data]);

    const onMapLoad = (map) => {
        mapRef.current = map;
        createClusterMarkers(map);
    };

    const createClusterMarkers = (map) => {
        if (!data.length) return;

        const markers = data.map((order) => {
            const { coordinates } = order.location;
            const marker = new window.google.maps.Marker({
                position: { lat: coordinates[1], lng: coordinates[0] },
                title: `Order ID: ${order.orderId} - Value: ₹${order.orderValue}`,
            });

            // Add hover event listeners
            marker.addListener("mouseover", () => {
                setSelectedMarker({
                    position: { lat: coordinates[1], lng: coordinates[0] },
                    orderId: order.orderId,
                    orderValue: order.orderValue,
                });
            });

            marker.addListener("mouseout", () => {
                setSelectedMarker(null);
            });

            return marker;
        });

        new MarkerClusterer({ markers, map });
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onLoad={onMapLoad}
            options={{
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
            }}
        >
            {selectedMarker && (
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
                    <div className="text-secondary-900 text-f-2xl font-semibold">
                        {selectedMarker.orderValue.toFixed(2)}
                    </div>

                </div>
                // <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
                //     <div style={{ fontSize: "14px", fontWeight: "bold", color: '#000' }}>
                //         Order ID: {selectedMarker.orderId} <br />
                //         Value: ₹{selectedMarker.orderValue}
                //     </div>
                // </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default ClusterMap;
