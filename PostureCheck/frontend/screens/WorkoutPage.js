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
  return (
    <TouchableOpacity
      style={GlobalStyle.buttons}
      onPress={() => {
        sp.Create(btnName);
        nav.navigate("Stretches", { language: "english" });
      }}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}

async function MakeAll(inp) {
  let btnArr = [];
  let names = await Backend.GetExNames();
  let j = 0;
  for (let i = 0; i < names.length; i++) {
    console.log("Making item: " + names[i]);
    btnArr.push(MakeButton(names[i], inp));
  }
  return await Promise.all(btnArr);
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
{/* 
        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Stretches", { language: "english" })
          }
        >
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Stretches", { language: "english" })
          }
        >
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #3</Text>
        </TouchableOpacity> */}
        {/* {MakeButton("Hello", navigation)} */}
        {MakeAll(navigation)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});


