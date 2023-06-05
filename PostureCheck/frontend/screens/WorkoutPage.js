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


//Get the image
const IMAGE_PATHS = {
  childspose: require("../../assets/childspose.png"),
};



function GetImage(input) {
  let index = 0;
  let doneRead = false;
  let type = "";
  let temp = "";
  while (!doneRead) {
    let begin = 0;
    let end = 0;
    begin = input.indexOf("|", index) + 1;
    end = input.indexOf("|", begin + 1);
    index = end;
    // console.log("start: " + begin + "\tend: " + end )
    if (end == -1 || begin == -1) {
      doneRead = true;
    }
    if (!doneRead) {
      var inp = input.substring(begin, end);
      // console.log(":"+ inp + ":");
      if (type == "") {
        type = inp;
      } else {
        if (type == "Image") {
          return IMAGE_PATHS[inp]
        }
        type = "";
      }
    }
  }
  return null;
}








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
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText, GlobalStyle.buttonSpace]}>
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
  let types = await Backend.ExGetAll();
  // console.log(types)
  for (let i = 0; i < types.length; i++) {
    btnArr.push(MakeButton(types[i]["Name"], inp));
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
      setButtonElements(buttons);
    }

    initializeButtons();
  }, []);
  console.log(buttonElements)
  return (
    <ScrollView style={GlobalStyle.container} showsVerticalScrollIndicator={false}>
      {buttonElements}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});


