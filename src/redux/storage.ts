import createWebStorage from "redux-persist/lib/storage/createWebStorage";

interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const createNoopStorage = (): Storage => {
  return {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
  };
};

const storage: Storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
