"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScriptNext, Polygon, Rectangle, Circle, Marker, DrawingManager } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "80vh",
};

const center = {
    lat: 28.6139, // New Delhi
    lng: 77.2090,
};

const mapStyle = [
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    }
];

const Maps = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Store drawn shapes data
    const [polygonPaths, setPolygonPaths] = useState([]); // Polygon coordinates
    const [rectangleBounds, setRectangleBounds] = useState(null); // Rectangle bounds
    const [circleData, setCircleData] = useState(null); // Circle center & radius
    const [markerPosition, setMarkerPosition] = useState(null); // Marker position

    const mapRef = useRef(null);
    const drawingManagerRef = useRef(null); // Prevent duplicate DrawingManager instances
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

    // Ensure Google Maps API is loaded before showing DrawingManager
    useEffect(() => {
        if (window.google && window.google.maps) {
            setIsGoogleLoaded(true);
        }
    }, []);

    // Function to handle polygon completion
    const onPolygonComplete = (polygon) => {
        const path = polygon.getPath().getArray().map(coord => ({
            lat: coord.lat(),
            lng: coord.lng()
        }));
        setPolygonPaths(path);
        polygon.setMap(null); // Remove the drawn polygon after capturing coordinates
    };

    // Function to handle rectangle completion
    const onRectangleComplete = (rectangle) => {
        const bounds = rectangle.getBounds();
        const newData = {
            north: bounds.getNorthEast().lat(),
            south: bounds.getSouthWest().lat(),
            east: bounds.getNorthEast().lng(),
            west: bounds.getSouthWest().lng()
        }
        console.log("onRectangleComplete", newData)
        setRectangleBounds(newData);
        rectangle.setMap(null); // Remove the rectangle after capturing bounds
    };

    // Function to handle circle completion
    const onCircleComplete = (circle) => {
        const newData = {
            center: { lat: circle.getCenter().lat(), lng: circle.getCenter().lng() },
            radius: circle.getRadius()
        }
        console.log("onCircleComplete", newData)
        setCircleData(newData);
        circle.setMap(null); // Remove the circle after capturing data
    };

    // Function to handle marker completion
    const onMarkerComplete = (marker) => {
        const newData = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
        }
        console.log("onMarkerComplete", newData)
        setMarkerPosition(newData);
        marker.setMap(null); // Remove the marker after capturing position
    };

    // Prevent duplicate DrawingManager instances
    const onDrawingManagerLoad = (drawingManager) => {
        if (!drawingManagerRef.current) {
            drawingManagerRef.current = drawingManager;
        }
    };

    if (!apiKey) return <p>Loading Google Maps...</p>;

    return (
        <LoadScriptNext googleMapsApiKey={apiKey} libraries={["drawing"]} onLoad={() => setIsGoogleLoaded(true)}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{ styles: mapStyle }}
                onLoad={(map) => (mapRef.current = map)}
            >
                {/* Ensure Google Maps API is loaded before using DrawingManager */}
                {isGoogleLoaded && !drawingManagerRef.current && (
                    <DrawingManager
                        onLoad={onDrawingManagerLoad} // Prevents re-adding DrawingManager
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google.maps.ControlPosition.TOP_CENTER,
                                drawingModes: ["polygon", "rectangle", "marker", "circle"],
                            },
                            polygonOptions: {
                                fillColor: "#FF0000",
                                fillOpacity: 0.4,
                                strokeWeight: 2,
                                clickable: true,
                                editable: true,
                                draggable: true,
                            },
                            rectangleOptions: {
                                fillColor: '#0136f8',
                                fillOpacity: 0.3,
                                strokeWeight: 2,
                            },
                            circleOptions: {
                                fillColor: "#FFA500",
                                fillOpacity: 0.3,
                                strokeWeight: 2,
                            },
                            markerOptions: {
                                draggable: true,
                            }
                        }}
                        onPolygonComplete={onPolygonComplete}
                        onRectangleComplete={onRectangleComplete}
                        onCircleComplete={onCircleComplete}
                        onMarkerComplete={onMarkerComplete}
                    />
                )}

                {/* Render Polygon if drawn */}
                {polygonPaths.length > 0 && (
                    <Polygon
                        paths={polygonPaths}
                        options={{
                            fillColor: "#00FF00",
                            fillOpacity: 0.5,
                            strokeColor: "#00FF00",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                )}

                {/* Render Rectangle if drawn */}
                {rectangleBounds && (
                    <Rectangle
                        bounds={rectangleBounds}
                        options={{
                            fillColor: "#0136f8",
                            fillOpacity: 0.3,
                            strokeWeight: 2,
                        }}
                    />
                )}

                {/* Render Circle if drawn */}
                {circleData && (
                    <Circle
                        center={circleData.center}
                        radius={circleData.radius}
                        options={{
                            fillColor: "#FFA500",
                            fillOpacity: 0.3,
                            strokeWeight: 2,
                        }}
                    />
                )}

                {/* Render Marker if placed */}
                {markerPosition && (
                    <Marker position={markerPosition} />
                )}
            </GoogleMap>
        </LoadScriptNext>
    );
};

export default Maps;
