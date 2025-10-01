import { useQuery, useMutation } from "@tanstack/react-query";
import { counterApi } from "../api/api";
import { CounterResponse } from "../types/counter";

export const useCounter = () => {
  return useQuery<CounterResponse>({
    queryKey: ["counter"],
    queryFn: () => counterApi.getCounter(),
  });
};

export const useUpdateCounter = () => {
  return useMutation<CounterResponse, Error, number>({
    mutationFn: (count: number) => counterApi.updateCounter(count),
  });
};
