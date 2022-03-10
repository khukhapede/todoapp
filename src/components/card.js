import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useMutation } from "react-query";

import { API } from "../config/api";

export default function Cards(props) {
  let api = API();
  const test = false;
  const { todo, isdone, time, refetchTodo, id } = props;

  let timeCon = new Date(time);

  let newDate = `${timeCon.getDate()}-${
    timeCon.getMonth() + 1
  }-${timeCon.getFullYear()}`;
  let newTime = `${timeCon.getHours()}:${timeCon.getMinutes()}:${timeCon.getSeconds()}`;

  const updateIsdone = useMutation(async (todoId) => {
    try {
      let body = JSON.stringify({
        matchObj: {
          id: todoId,
        },
        newData: {
          isdone: "yes",
        },
      });

      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      const response = await api.put(config);

      if (response.message == "table row updated") {
        refetchTodo();
      }
    } catch (error) {
      console.log(error);
    }
  });

  const deleteTodo = useMutation(async (todoId) => {
    try {
      let body = JSON.stringify({
        id: todoId,
      });

      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      const response = await api.delete(config);
      if (response.message == "row deleted") {
        refetchTodo();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.mainTextStyle}>{todo}</Text>
        <Text style={styles.secondaryTextStyle}>{newDate}</Text>
        <Text style={styles.secondaryTextStyle}>{newTime}</Text>
      </View>
      <View style={styles.right}>
        {isdone == "yes" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              deleteTodo.mutate(id);
            }}
          >
            <Image
              source={require("../../icons/trash.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              updateIsdone.mutate(id);
            }}
          >
            <Image
              source={require("../../icons/checkbox.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: 350,
    height: 80,
    backgroundColor: "#badfff",
    borderRadius: 10,
    marginVertical: 7,
    overflow: "hidden",
  },
  left: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingStart: 20,
  },
  mainTextStyle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 24,
  },
  secondaryTextStyle: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 15,
    color: "#666666",
    marginVertical: 2,
  },    
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
