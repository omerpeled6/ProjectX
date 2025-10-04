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
    updateCounter,
    increment,
    decrement,
  } = useCounterStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleIncrement = () => {
    increment();
    debouncedUpdate();
  };

  const handleDecrement = () => {
    decrement();
    debouncedUpdate();
  };

  const debouncedUpdate = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updateCounter(count);
    }, 2000);
  };

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
