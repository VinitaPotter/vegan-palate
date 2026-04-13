/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRecipeStore } from "../store/recipesStore";

interface eventIF {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string;
  start: string;
  end: string;
  category?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  image?: string | null;
  organizerWebsite?: string | null;
  coords?: { lat: number; lng: number };
  [key: string]: any;
}

const treeIcon = L.divIcon({
  html: `<div style="font-size: 3rem; line-height: 1;">🌳</div>`,
  className: "dummy-none",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const lemonIcon = L.divIcon({
  html: `<div style="font-size: 2rem; line-height: 1;">🍋</div>`,
  className: "dummy-none",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function Events() {
  const getCityCoords = useRecipeStore((state) => state.getCityCoords);
  const [eventsData, setEventsData] = useState<eventIF[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dummy: eventIF[] = [
    {
      id: "evt_1",
      title: "VEGAN T-SHIRTS , HOODIES AND MORE",
      start: "2026-12-31T18:00:00",
      end: "2026-12-31T20:00:00",
      description: "Score cool vegan tees, hoodies, and accessories online.",
      country: "United States",
      isVirtual: true,
      isExpired: false,
      image: "https://vexvegan.live/resources/hero-festival.jpg",
    },
  ];

  function LocationMarker() {
    const [position, setPosition] = useState<any>(null);
    const map = useMapEvents({
      locationfound(e) {
        if (!position) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        }
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={lemonIcon}>
        <Popup closeButton={false}>You are here</Popup>
      </Marker>
    );
  }

  useEffect(() => {
    async function getData() {
      const initialEvents = [...dummy];
      setEventsData(initialEvents);

      // FIX 1: Use for...of instead of forEach to allow 'await'
      for (const event of initialEvents) {
        const query = (event.city || event.state || event.country || "")
          .trim()
          .toLowerCase();

        if (!query) continue;

        const coords = await getCityCoords(query);

        if (coords) {
          setEventsData((prev) =>
            prev.map((item) =>
              item.id === event.id
                ? { ...item, coords: { lat: coords.lat, lng: coords.lng } }
                : item,
            ),
          );
        }
      }
      setLoading(false);
    }

    getData(); // FIX 2: Call it once, don't call it inside itself
  }, [getCityCoords]);

  function getDateString(start: string, end: string): string {
    const s = new Date(start);
    const e = new Date(end);
    if (s.getDate() === e.getDate()) {
      return `${s.toLocaleDateString()} from ${s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} to ${e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
    return `${s.toLocaleDateString()} to ${e.toLocaleDateString()}`;
  }

  return (
    <div className="m-20 relative">
      {loading && (
        <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <p className="animate-spin text-5xl">🌱</p>
          <p className="font-bold text-xl mt-4">Loading vegan map...</p>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-[70vh] w-full rounded-2xl border-4 border-white shadow-xl"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />

        {eventsData.map(
          (event) =>
            event.coords?.lat && (
              <Marker
                key={`${event.id}-located`}
                position={[event.coords.lat, event.coords.lng]}
                icon={treeIcon}
              >
                <Popup closeButton={false}>
                  <div className="text-sm max-w-[200px]">
                    <img
                      src={
                        event.image ||
                        "https://vexvegan.live/resources/hero-festival.jpg"
                      }
                      alt=""
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <strong className="text-lg block text-primary leading-tight">
                      {event.title}
                    </strong>
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {event.city || event.country}
                    </p>
                    <p className="text-xs mt-1">
                      🗓️ {getDateString(event.start, event.end)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ),
        )}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
