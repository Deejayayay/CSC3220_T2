import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { GlobalStyle } from "../styles/globalstyles";
import React, { useState } from 'react';

let Backend = require("../../Backend.js")
let Stretches = require('./exercises/stretches')
let sp = require('./exercises/StretchesPage')



async function MakeButton(btnName, nav) {
  try{
  return (
    <TouchableOpacity
      key = {btnName}
      style={GlobalStyle.buttons}
      onPress={() => {
        sp.setName(btnName);
        nav.navigate("Stretches", { language: "english" });
      }}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
    } catch (error) {
      console.error('Promise rejection in MakeButton:', error);
      // Handle the error appropriately, such as showing an error message or taking corrective action.
      // You can also throw the error again to propagate it further if needed.
      throw error;
    }
}

async function MakeAll(inp) {
  try {
  let btnArr = [];
  let names = await Backend.GetExNames();
  let j = 0;
  for (let i = 0; i < names.length; i++) {
    console.log("Making item: " + names[i]);
    btnArr.push(MakeButton(names[i], inp));
  }
  return await Promise.all(btnArr);
} catch (error) {
  console.error('Promise rejection in MakeButton:', error);
  // Handle the error appropriately, such as showing an error message or taking corrective action.
  // You can also throw the error again to propagate it further if needed.
  throw error;
}
}

export default function Workouts({ navigation, route }) {
  const [buttonElements, setButtonElements] = React.useState([]);

  React.useEffect(() => {
    async function initializeButtons() {
      const buttons = await MakeAll(navigation);
      console.log("ReactstateStart")
      setButtonElements(buttons);
    }

    initializeButtons();
  }, []);
  console.log("DONE_______________________")
  console.log(buttonElements)
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Stretches", { language: "english" })
          }
        >
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #1</Text>
        </TouchableOpacity>
        {/* {MakeButton("Hello", navigation)} */}
        {MakeAll(navigation)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});


