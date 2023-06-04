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
        {MakeButton("print all logs", () => Backend.LogPrintAll())}
        {MakeButton("Get all logs from today", () => Backend.LogFromDay(Today))}
        {MakeButton("Get latest log", () => Backend.LogLatest())}
        {MakeButton("Set latest time to 50", () => Backend.LogFinishLatest(50))}
        {MakeButton("Get log at index 1", () => Backend.LogAt(1))}
        {MakeButton("Get curr day score", () => Backend.LogDayScore(Backend.GetDay()))}
        {MakeButton("Get streak", () => Backend.LogGetStreak())}

        {MakeButton("print typedb", () => Backend.TestGetAll())}
        {MakeButton("Add test ex", () => Backend.ExMakeTest())}
        {MakeButton("Clear exersizes", () => Backend.ExClear())}
        {MakeButton("Clear logs", () => Backend.LogClear())}
        {MakeButton("Deleat evrything", () => Backend.dbNukeAll())}

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
