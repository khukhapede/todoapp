import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import MainScreen from "./src/screens/mainScreen";

import { useFonts, Ubuntu_500Medium } from "@expo-google-fonts/ubuntu";

import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function App() {
  let [fontsloaded] = useFonts({
    Ubuntu_500Medium,
  });

  if (!fontsloaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <QueryClientProvider client={client}>
            <View style={styles.viewStyle}>
              <MainScreen />
            </View>
          </QueryClientProvider>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  viewStyle: {
    width: "100%",
    backgroundColor: "white",
  },
});
