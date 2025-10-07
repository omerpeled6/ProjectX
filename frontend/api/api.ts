import axios from "axios";
import { CounterResponseSchema } from "../types/counter";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://project-x-nu-mauve.vercel.app",
});

export const counterApi = {
  getCounter: async () => {
    const res = await api.get("/counter");
    return CounterResponseSchema.parse(res.data);
  },
  updateCounter: async (count: number) => {
    const res = await api.post("/counter/update", { count });
    return CounterResponseSchema.parse(res.data);
  },
};
