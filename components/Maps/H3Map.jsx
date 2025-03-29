"use client";

import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState, useRef, useMemo } from "react";

const H3Map = ({
  h3Data,
  center = { lat: 28.6139, lng: 77.209 },
  zoom = 12,
  label,
  type,
}) => {
  const [hoveredPolygon, setHoveredPolygon] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const mapRef = useRef(null);

  const brandSecondary = {
    50: "#f5f0ff",
    100: "#e0d8fc",
    200: "#d1c5fa",
    300: "#c2b1f9",
    400: "#b39ef7",
    500: "#a48bf6",
    600: "#9577f4",
    700: "#8664f3",
    800: "#7751f1",
    900: "#683ef0",
    1000: "#5d37d8",
  };

  const getColorByValue = (value) => {
    if (value > 40000) return brandSecondary[1000];
    if (value > 35000) return brandSecondary[900];
    if (value > 30000) return brandSecondary[800];
    if (value > 25000) return brandSecondary[700];
    if (value > 20000) return brandSecondary[600];
    if (value > 15000) return brandSecondary[500];
    if (value > 10000) return brandSecondary[400];
    if (value > 5000) return brandSecondary[300];
    if (value > 2000) return brandSecondary[200];
    return brandSecondary[100];
  };

  const mapTheme = useMemo(() => [
    {
      elementType: "geometry",
      stylers: [{ color: "#f0f0f7" }] // Slight violet-gray background
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#4b5563" }] // dark gray text
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d1d5db" }] // border lines subtle
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#cbd5e1" }] // grayish roads
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#9ca3af" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b7280" }]
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#d1c5fa" }] // lavender water (brand color 200)
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#5d37d8" }] // deep purple water label
    },
    {
      featureType: "landscape.man_made",
      stylers: [{ visibility: "off" }]
    }
  ], []);
  

  const polygons = useMemo(() => {
    const key = type === "product" ? "totalOrderValue" : "totalTickets";

    return h3Data.map((item, index) => ({
      id: index,
      path: item.coordinates.map(([lat, lng]) => ({ lat, lng })),
      color: getColorByValue(item[key]),
      value: item[key],
      center: item.coordinates.reduce(
        (acc, [lat, lng]) => ({
          lat: acc.lat + lat / item.coordinates.length,
          lng: acc.lng + lng / item.coordinates.length,
        }),
        { lat: 0, lng: 0 }
      ),
    }));
  }, [h3Data, type]);

  const handleMouseOver = (poly) => {
    setHoveredPolygon(poly);
    if (mapRef.current) {
      const projection = mapRef.current.getProjection();
      if (projection) {
        const point = projection.fromLatLngToPoint(
          new window.google.maps.LatLng(poly.center.lat, poly.center.lng)
        );
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
        center={mapCenter}
        zoom={zoom}
        options={{
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          styles: mapTheme,
        }}
        onLoad={(map) => (mapRef.current = map)}
      >
        {polygons.map((poly, index) => (
          <Polygon
            key={poly.id}
            paths={poly.path}
            options={{
              fillColor: poly.color,
              fillOpacity: hoveredPolygon?.id === poly.id ? 0.85 : 0.5,
              strokeColor:
                hoveredPolygon?.id === poly.id ? brandSecondary[1000] : "#bbb",
              strokeOpacity: 1,
              strokeWeight: hoveredPolygon?.id === poly.id ? 3 : 1,
              zIndex: hoveredPolygon?.id === poly.id ? 20 : 1,
            }}
            onMouseOver={() => handleMouseOver(poly)}
            onMouseOut={handleMouseOut}
            // Animate via className or delay simulation
            className="animate-[fadeIn_0.5s_ease-in-out]"
          />
        ))}
      </GoogleMap>

      {/* Tooltip */}
      {hoveredPolygon && (
        <div
          className="absolute top-[10px] left-[10px] bg-white text-secondary-900 px-4 py-2 rounded-lg shadow-xl pointer-events-none animate-[pop_0.3s_ease-in-out]"
          style={{
            border: `2px solid ${brandSecondary[600]}`,
            fontWeight: 600,
            fontSize: "18px",
            transform: "scale(1.05)",
          }}
        >
          <div className="text-f-l tracking-wide">{label}</div>
          <div className="text-f-3xl font-bold text-secondary-800">
            {hoveredPolygon.value.toFixed(2)}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-md shadow-lg z-50 text-sm">
        <div className="text-gray-700 font-medium mb-2">Order Volume</div>
        <div className="flex items-center gap-1">
          {Object.values(brandSecondary).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}
            ></div>
          ))}
          <span className="ml-2 text-gray-400">Low → High</span>
        </div>
      </div>
    </div>
  );
};

export default H3Map;
