import { create } from "zustand";
import { counterApi } from "../api/api";

interface CounterState {
  count: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

interface CounterActions {
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
  fetchCounter: () => Promise<void>;
  updateCounter: (count: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type CounterStore = CounterState & CounterActions;

const initialState: CounterState = {
  count: 0,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useCounterStore = create<CounterStore>((set, get) => ({
  ...initialState,

  setCount: (count: number) => set({ count }),

  increment: () => {
    const { count } = get();
    set({ count: count + 1 });
  },

  decrement: () => {
    const { count } = get();
    set({ count: count - 1 });
  },

  fetchCounter: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await counterApi.getCounter();
      set({
        count: response.counter.count,
        isLoading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch counter",
        isLoading: false,
      });
    }
  },

  updateCounter: async (count: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await counterApi.updateCounter(count);
      set({
        count: response.counter.count,
        isLoading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update counter",
        isLoading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  reset: () => set(initialState),
}));
