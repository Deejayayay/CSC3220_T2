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

function MakeButton(btnName, nav){
  
  return (
    <TouchableOpacity
    style={GlobalStyle.buttons} 
    onPress={() =>
      {Backend.TestPass(5) 
      // nav.navigate("Workout#", { language: "english" })
      }
    }
  >
      <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>{btnName}</Text>
  </TouchableOpacity>
  );
}



export default function Workouts({ navigation, route }) {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Workout#", { language: "english" })
          }
        >
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Workout#", { language: "english" })
          }
        >
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyle.buttons}
          onPress={() =>
            navigation.navigate("Workout#", { language: "english" })
          }
        >
          {MakeButton("Hello", navigation)}
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #3</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
