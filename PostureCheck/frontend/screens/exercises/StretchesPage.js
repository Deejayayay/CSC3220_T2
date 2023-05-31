import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import Constants from "expo-constants";
// import CountdownTimer from "../../Components/timer";


//excercise pages
export default function Stretches({ navigation, route }) {
  return (
    <View>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    marginLeft: 30,
    marginRight: 30,
  },
  headers: {
    marginTop: 20,
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "500",
  },
  subHeaders: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "500",
  },
  body: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
  },
  startButton: {
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    alignSelf: "center",
    position: "absolute",
    width: 100,
    height: 50,
    marginTop: 650,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#BCD4A7",
  },
  startButtonText: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 13,
  },
  repeatButton: {
    flexDirection: "row",
  },
  image: {
    marginLeft: 30,
    marginRight: 30,
    width: 300,
    height: 300,
  },
  imageContainer: {
    alignItems: "center",
  },
  modal: {
    alignContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  timerContainer: {
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    height: 300,
    width: 300,
    marginTop: 250,
    borderRadius: 300 / 2,
    backgroundColor: "#BCD4A7",
    alignItems: "center",
    alignSelf: "center",
  },
  timerText: {
    marginTop: 140,
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "500",
  },
});
