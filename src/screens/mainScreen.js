import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";

import TodoList from "./todoList";

export default function MainScreen() {
  return (
    <View>
      <TodoList />
    </View>
  );
}
