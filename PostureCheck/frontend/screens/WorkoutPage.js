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
let Backend = require("../../Backend.js")
let Stretches = require('./exercises/stretches')


function MakeButton(btnName, nav){
  
  return (
    <TouchableOpacity
    style={GlobalStyle.buttons} 
    onPress={() =>
      {Stretches.Create(btnName)
      }
    }
  >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>{btnName}</Text>
  </TouchableOpacity>
  );
}

function MakeAll(inp){
  let btnArr = []
  let names = Backend.GetExNames()
  for(var i=0; j=names.length,i<j; i++){
    btnArr.push(MakeButton(names[i], inp))
  }
  return btnArr
}


export default function Workouts({ navigation, route }) {
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
        </TouchableOpacity>
        {/* {MakeButton("Hello", navigation)} */}
        {MakeAll(navigation)}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
