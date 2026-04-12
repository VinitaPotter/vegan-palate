import { create } from "zustand";
interface RecipesState {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  db: IDBDatabase | null;
  initDb: () => void;
  getCityCoords: (city: string) => Promise<{ lat: number; lng: number } | null>;
}

export const useRecipeStore = create<RecipesState>((set, get) => ({
  db: null,
  favoriteIds: [],

  toggleFavorite: (id: number) => {
    const { db, favoriteIds } = get();
    if (!db) return;

    const isFav = favoriteIds.includes(id);
    const transaction = db.transaction("favorites", "readwrite");
    const store = transaction.objectStore("favorites");
    if (isFav) {
      store.delete(id);
      set({ favoriteIds: favoriteIds.filter((f) => f !== id) });
    } else {
      store.put({ id });
      set({ favoriteIds: [...favoriteIds, id] });
    }
  },

  initDb: () => {
    const request = indexedDB.open("favorites", 2);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("cities")) {
        const cityStore = db.createObjectStore("cities", { keyPath: "name" });

        cityStore.transaction.oncomplete = () => {
          const cityTransaction = db.transaction("cities", "readwrite");
          const store = cityTransaction.objectStore("cities");

          const majorCities = [
            { name: "new york", lat: 40.7128, lng: -74.006 },
            { name: "la", lat: 34.0522, lng: -118.2437 },
            { name: "los angeles", lat: 34.0522, lng: -118.2437 },
            { name: "vancouver", lat: 49.2827, lng: -123.1207 },
            { name: "paris", lat: 48.8566, lng: 2.3522 },
            { name: "london", lat: 51.5074, lng: -0.1278 },
            { name: "madrid", lat: 40.4168, lng: -3.7038 },
            { name: "rome", lat: 41.9028, lng: 12.4964 },
            { name: "amsterdam", lat: 52.3676, lng: 4.9041 },
            { name: "mexico", lat: 19.4326, lng: -99.1332 },
            { name: "rio de janeiro", lat: -22.9068, lng: -43.1729 },
            { name: "abu dhabi", lat: 24.4539, lng: 54.3773 },
            { name: "dubai", lat: 25.2048, lng: 55.2708 },
            { name: "qatar", lat: 25.2769, lng: 51.52 }, // Doha
            { name: "delhi", lat: 28.6139, lng: 77.209 },
            { name: "mumbai", lat: 19.076, lng: 72.8777 },
            { name: "kolkata", lat: 22.5726, lng: 88.3639 },
            { name: "pune", lat: 18.5204, lng: 73.8567 },
            { name: "chennai", lat: 13.0827, lng: 80.2707 },
            { name: "bangalore", lat: 12.9716, lng: 77.5946 },
            { name: "tokyo", lat: 35.6762, lng: 139.6503 },
            { name: "seoul", lat: 37.5665, lng: 126.978 },
            { name: "hanoi", lat: 21.0285, lng: 105.8542 },
            { name: "ho chi minh", lat: 10.8231, lng: 106.6297 },
            { name: "bangkok", lat: 13.7563, lng: 100.5018 },
            { name: "sydney", lat: -33.8688, lng: 151.2093 },
            { name: "shanghai", lat: 31.2304, lng: 121.4737 },
            { name: "johannesburg", lat: -26.2041, lng: 28.0473 },
            { name: "nairobi", lat: -1.2921, lng: 36.8219 },
            { name: "cairo", lat: 30.0444, lng: 31.2357 },
          ];

          majorCities.forEach((city) => store.put(city));
        };
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      set({ db });

      const transaction = db.transaction("favorites", "readonly");
      const store = transaction.objectStore("favorites");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const savedIds = getAllRequest.result.map(
          (item: { id: number }) => item.id,
        );
        set({ db, favoriteIds: savedIds });
      };
    };
  },

  getCityCoords: async (cityName: string) => {
    const { db } = get();
    if (!db) return null;

    const normalizedName = cityName;

    const cachedData = await new Promise<any>((resolve) => {
      const transaction = db.transaction("cities", "readonly");
      const store = transaction.objectStore("cities");
      const request = store.get(normalizedName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });

    if (cachedData) {
      return { lat: cachedData.lat, lng: cachedData.lng };
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(normalizedName)}`,
      );
      const data = await response.json();

      if (data && data[0]) {
        const coords = {
          name: normalizedName,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };

        const saveCities = db.transaction("cities", "readwrite");
        saveCities.objectStore("cities").put(coords);

        await new Promise((res) => setTimeout(res, 1100));

        return { lat: coords.lat, lng: coords.lng };
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }

    return null;
  },
}));
