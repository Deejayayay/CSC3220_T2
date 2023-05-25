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
          <Text style={[GlobalStyle.headers, GlobalStyle.marginText]}>Exercise #3</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
