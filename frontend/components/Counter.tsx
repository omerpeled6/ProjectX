import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useCounterStore } from "../store/counterStore";
import Loading from "./Loading";
import Error from "./Error";
import CounterDisplay from "./CounterDisplay";
import CounterButtons from "./CounterButtons";

export default function Counter() {
  const {
    count,
    isLoading,
    error,
    fetchCounter,
    updateCounterSilent,
    increment,
    decrement,
    startPolling,
    stopPolling,
  } = useCounterStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch initial data and start polling
  useEffect(() => {
    fetchCounter();
    startPolling();

    return () => {
      stopPolling();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fetchCounter, startPolling, stopPolling]);

  const debouncedUpdate = (value: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => updateCounterSilent(value), 500);
  };

  const handleIncrement = () => debouncedUpdate(increment());
  const handleDecrement = () => debouncedUpdate(decrement());

  if (isLoading) {
    return <Loading message="Loading counter..." />;
  }

  if (error) {
    return <Error message="Server is down" onRetry={fetchCounter} />;
  }

  return (
    <View style={styles.container}>
      <CounterDisplay count={count} />
      <CounterButtons
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
});
