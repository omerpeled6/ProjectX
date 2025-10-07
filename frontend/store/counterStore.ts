import { create } from "zustand";
import { counterApi } from "../api/api";

interface CounterState {
  count: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  isPolling: boolean;
  pollingInterval: NodeJS.Timeout | null;
  isUpdating: boolean;
}

interface CounterActions {
  increment: () => number;
  decrement: () => number;
  fetchCounter: () => Promise<void>;
  updateCounter: (count: number) => Promise<void>;
  updateCounterSilent: (count: number) => Promise<void>;
  startPolling: (interval?: number) => void;
  stopPolling: () => void;
  reset: () => void;
}

type CounterStore = CounterState & CounterActions;

const initialState: CounterState = {
  count: 0,
  isLoading: false,
  error: null,
  lastUpdated: null,
  isPolling: false,
  pollingInterval: null,
  isUpdating: false,
};

const updateCount = (response: any) => ({
  count: response.counter.count,
  lastUpdated: Date.now(),
});

export const useCounterStore = create<CounterStore>((set, get) => ({
  ...initialState,

  increment: () => {
    const { count } = get();
    const newCount = count + 1;
    set({ count: newCount });
    return newCount;
  },

  decrement: () => {
    const { count } = get();
    const newCount = count - 1;
    set({ count: newCount });
    return newCount;
  },

  fetchCounter: async () => {
    set({ isLoading: true, error: null });
    const response = await counterApi.getCounter();
    set({ ...updateCount(response), isLoading: false });
  },

  updateCounter: async (count: number) => {
    set({ isLoading: true, error: null });
    const response = await counterApi.updateCounter(count);
    set({ ...updateCount(response), isLoading: false });
  },

  updateCounterSilent: async (count: number) => {
    const { isPolling, pollingInterval } = get();

    // Stop polling during update
    if (isPolling && pollingInterval) {
      clearInterval(pollingInterval);
      set({ isPolling: false, pollingInterval: null });
    }

    set({ isUpdating: true });
    try {
      const response = await counterApi.updateCounter(count);
      set({ ...updateCount(response), isUpdating: false });

      // Restart polling after update
      const { startPolling } = get();
      startPolling();
    } catch (error) {
      set({ isUpdating: false });
      // Restart polling even on error
      const { startPolling } = get();
      startPolling();
      throw error;
    }
  },

  startPolling: (interval = 3000) => {
    const { isPolling } = get();
    if (isPolling) return;

    const poll = async () => {
      const { isUpdating } = get();
      // Don't poll if we're currently updating
      if (isUpdating) return;

      const response = await counterApi.getCounter();
      set(updateCount(response));
    };

    const intervalId = setInterval(poll, interval);
    set({ isPolling: true, pollingInterval: intervalId });
  },

  stopPolling: () => {
    const { pollingInterval } = get();
    if (pollingInterval) {
      clearInterval(pollingInterval);
      set({ isPolling: false, pollingInterval: null });
    }
  },

  reset: () => {
    const { pollingInterval } = get();
    if (pollingInterval) clearInterval(pollingInterval);
    set(initialState);
  },
}));
