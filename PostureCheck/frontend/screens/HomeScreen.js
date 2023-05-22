import { GlobalStyle } from "../styles/globalstyles";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <TouchableOpacity
        style={GlobalStyle.buttons}
        onPress={() =>
          navigation.navigate("Exercises", { language: "english" })
        }
      >
        <Text style={GlobalStyle.headers}>Exercises and Stretches</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GlobalStyle.buttons}
        onPress={() =>
          navigation.navigate("Progress Tracking", { language: "english" })
        }
      >
        <Text style={GlobalStyle.headers}>Progress Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GlobalStyle.buttons}
        onPress={() =>
          navigation.navigate("Settings", { language: "english" })
        }
      >
        <Text style={GlobalStyle.headers}>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginTop: 20,
    marginLeft: 20
  }
});
