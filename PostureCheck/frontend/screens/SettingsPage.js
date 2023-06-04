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
      onPress={funct}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}

let Today = Backend.GetDay()
//for making things easer with database testing
export default function SettingsPage({ navigation, route }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Debugging</Text>
        {MakeButton("TimeTest", () => Backend.GetDay())}
        {MakeButton("Add Log data Test", () => Backend.TestLogData())}
        {MakeButton("print all logs", () => Backend.LogsPrintAll())}
        {MakeButton("Get all logs from today", () => Backend.LogsFromDay(Today))}
        {MakeButton("Get latest log", () => Backend.LogsLatest())}

        {MakeButton("print typedb", () => Backend.TestGetAll())}
        {MakeButton("Add test ex", () => Backend.MakeTestEx())}
        {MakeButton("Clear exersizes", () => Backend.ClearEx())}
        {MakeButton("Clear logs", () => Backend.ClearLogs())}
        {MakeButton("Deleat evrything", () => Backend.NukeAll())}

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
