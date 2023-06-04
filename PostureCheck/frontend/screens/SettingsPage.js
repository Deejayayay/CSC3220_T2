import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Easing, Image } from "react-native";
import { GlobalStyle } from "../styles/globalstyles";
import React, { useState } from 'react';
let Backend = require("../../Backend.js")

function MakeButton(btnName, funct) {
  return (
    <TouchableOpacity
      style={GlobalStyle.debugBtn}
      onPress={() => {
       funct();
      }}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}

function MakeTestLogs(){
  let testTemp = []
  let e0 = ['UpperTest', 'Upper', '"|Main|Upper Test|Text|Somethings|"', 75,2,]
	let e1 = ['Lower_test', 'Lower', '"|Main|Lower Test|Text|Somethings|"', 60,1]
	let e2 = ['Coustom test', 'NA', '"|Main|Coustom Test|Text|Somethings|"', 30,0.5]
	let e3 = ['Office brake', 'Na', '"|Main|Office brake|Text|Somethings|"', 20,1]
  for(let i=0;  j = 10 , i<j; i++){
    
  }
  Backend.TestLogData()
}

//for making things easer with database testing
export default function SettingsPage({ navigation, route }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>settings</Text>
        {MakeButton("TimeTest", Backend.GetDay)}



        {MakeButton("print typedb", Backend.TestGetAll)}
        {MakeButton("Add test ex", Backend.MakeTestEx)}
        {MakeButton("Clear exersizes", Backend.ClearEx)}
        {MakeButton("Clear logs", Backend.ClearLogs)}
        {MakeButton("Deleat evrything", Backend.NukeAll)}

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
