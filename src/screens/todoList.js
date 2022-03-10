import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "react-query";

import { API } from "../config/api";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import Cards from "../components/card";
import ModalInput from "../components/modal";

import { supabase } from "../../lib/supabase";

export default function TodoList() {
  let api = API();

  const [modalVisible, setModalVisible] = useState(false);

  let {
    data: todoData,
    isLoading,
    refetch,
  } = useQuery("todoCache", async () => {
    const config = {
      method: "GET",
    };

    const response = await api.get(config);

    return response;
  });

  // console.log(`loading :${isLoading}`);

  //  if console.log(`ini datanya ${todoData[2].todo}`);

  // async function testFetch() {
  //   let { data: dataFetch, error } = await supabase
  //     .from("todoLists")
  //     .select("*");
  //   setData(dataFetch);
  //   console.log(data);
  // }

  // useEffect(() => {
  //   testFetch();
  // }, []);

  const renderItem = ({ item }) => (
    <Cards
      todo={item.todo}
      isdone={item.isdone}
      time={item.created_at}
      refetchTodo={refetch}
      id={item.id}
    />
  );

  return (
    <View>
      <ModalInput
        refetchTodo={refetch}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => refetch()}>
          <Image
            source={require("../../icons/refresh.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image
            source={require("../../icons/add.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardList}>
        {isLoading ? (
          <Text>loading</Text>
        ) : (
          <FlatList
            data={todoData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
    paddingRight: 10,
  },
  cardList: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
