import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useCounter, useUpdateCounter } from "../hooks/useCounter";

export default function Counter() {
  const { data, isLoading } = useCounter();
  const updateCounter = useUpdateCounter();
  const [count, setCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with server data
  useEffect(() => {
    if (data?.counter.count !== undefined) {
      setCount(data.counter.count);
    }
  }, [data?.counter.count]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const updateCount = (newCount: number) => {
    setCount(newCount);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updateCounter.mutate(newCount);
    }, 2000);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.btn, styles.minus]}
          onPress={() => updateCount(count - 1)}
        >
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.plus]}
          onPress={() => updateCount(count + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 32,
  },
  count: {
    fontSize: 64,
    fontWeight: "700",
    color: "#3b82f6",
    marginBottom: 40,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  minus: {
    backgroundColor: "#ef4444",
  },
  plus: {
    backgroundColor: "#10b981",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  disabled: {
    opacity: 0.5,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 16,
  },
});
