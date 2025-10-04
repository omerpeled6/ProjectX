import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({
  message = "Something went wrong",
  onRetry,
}: ErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
