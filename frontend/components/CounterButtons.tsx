import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

interface CounterButtonsProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function CounterButtons({
  count,
  onIncrement,
  onDecrement,
}: CounterButtonsProps) {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.btn, styles.minus]}
        onPress={onDecrement}
      >
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.plus]} onPress={onIncrement}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
