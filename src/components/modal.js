import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import { useMutation } from "react-query";

import { API } from "../config/api";

export default function ModalInput(props) {
  const { modalVisible, setModalVisible, refetchTodo } = props;
  const [changeVal, onChangeVal] = useState("");

  let api = API();

  const insertTodo = useMutation(async () => {
    let body = JSON.stringify([
      {
        todo: changeVal,
      },
    ]);

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    const response = await api.post(config);

    if (response[0].todo == changeVal) {
      refetchTodo();
      setModalVisible(!modalVisible);
    }
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Input your todo:</Text>
          <TextInput style={styles.input} onChangeText={onChangeVal} />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => insertTodo.mutate()}
          >
            <Text style={styles.textStyle}>add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: "Ubuntu_500Medium",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    fontFamily: "Ubuntu_500Medium",
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#0A666D",
    borderWidth: 2,
    textAlign: "center",
    fontSize: 20,
  },
});
