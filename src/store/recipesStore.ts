import { create } from "zustand";
interface RecipesState {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  db: IDBDatabase | null;
  initDb: () => void;
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
    const request = indexedDB.open("favorites", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("favorites", { keyPath: "id" });
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
}));
