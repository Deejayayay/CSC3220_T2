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
      style={[GlobalStyle.debugBtn]}
      onPress={funct}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText, GlobalStyle.space]}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}

let Today = Backend.GetDay()
//for making things easer with database testing
export default function SettingsPage({ navigation, route }) {
  return (
      <ScrollView style={{flex: 1}}>
        {MakeButton("TimeTest", () => Backend.GetDay())}
        {MakeButton("Add Log Data Test", () => Backend.TestLogData())}
        {MakeButton("Print Logs", () => Backend.LogPrintAll())}
        {MakeButton("Get all logs from Today", () => Backend.LogFromDay(Today))}
        {MakeButton("Get Latest Log", () => Backend.LogLatest())}
        {MakeButton("Set latest time to 50", () => Backend.LogFinishLatest(50))}
        {MakeButton("Get log at index 1", () => Backend.LogAt(1))}
        {MakeButton("Get current day score", () => Backend.LogDayScore(Backend.GetDay()))}
        {MakeButton("Get streak", () => Backend.LogGetStreak())}

        {MakeButton("Print typedb", () => Backend.TestGetAll())}
        {MakeButton("Add Test Exercise", () => Backend.ExMakeTest())}
        {MakeButton("Clear Exercises", () => Backend.ExClear())}
        {MakeButton("Clear logs", () => Backend.LogClear())}
        {MakeButton("Nuke All", () => Backend.dbNukeAll())}

      </ScrollView>
  );
}
const styles = StyleSheet.create({});
