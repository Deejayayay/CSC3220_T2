import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    TouchableOpacity,
  } from "react-native";
  import { GlobalStyle } from "../styles/globalstyles";
  import React, { useState } from 'react';


let Backend = require('../../Backend');
let _day = Backend.GetDay()
let sp = require('./exercises/StretchesPage')
export function LoadDay(day){
  _day = day
}


function make(inArr, navPage){
  console.log(inArr["TypeInfo"])
  return(
<TouchableOpacity
      key = {inArr['Index']}
      style={GlobalStyle.buttons}
      onPress={() => {
        sp.setName(inArr['TypeInfo']);
        navPage.navigate("Stretches", { language: "english" });
      }}
    >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText, GlobalStyle.buttonSpace]}>
        {inArr["TypeInfo"]}
      </Text>
      <Text>Difficulty:{inArr["Difficulty"]}</Text>
      <Text>TimeDone:{inArr["TimeDone"]}</Text>

    </TouchableOpacity>



  )
}


async function MakeADay(navi){
  let dayInfo = []
  let stuffDone = await Backend.LogFromDay(Backend.GetDay())
  console.log("Getting dat")
  console.log(stuffDone.length)
  for(let i = 0; i < stuffDone.length; i++){
    console.log(stuffDone[i])
    dayInfo.push(make(stuffDone[i], navi))
  }

  return dayInfo
}




export default function ChartPage({ navigation, route }) {
  const [daysInfo, setDaysInfo] =React. useState([]);


  React.useEffect(() => {
    async function initPage() {
      const buttons = await MakeADay(navigation);
      setDaysInfo(buttons);
    }
    initPage();
  }, []);

  return (
    <ScrollView>
      {daysInfo}
      {/* <Text>Test</Text> */}
    </ScrollView>
  );
}