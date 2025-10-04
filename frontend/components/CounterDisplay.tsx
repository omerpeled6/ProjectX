import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface CounterDisplayProps {
  count: number;
}

export default function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
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
  },
});
