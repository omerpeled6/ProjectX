import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.message}>{message}</Text>
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
  message: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 16,
  },
});
