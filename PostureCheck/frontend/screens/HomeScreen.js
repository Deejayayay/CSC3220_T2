//imported files
import { ScrollView } from "react-native-gesture-handler";
import { GlobalStyle } from "../styles/globalstyles";

//components
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

let Backend = require("../../Backend.js");

//npm install react-native-snap-carousel

// for image carousel

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={GlobalStyle.container}>
      <TouchableOpacity
        style={GlobalStyle.buttons}
        onPress={() =>
          navigation.navigate("Exercises", { language: "english" })
        }
      >
        <Text
          style={[
            GlobalStyle.headers,
            GlobalStyle.buttonSpace,
            GlobalStyle.marginText,
          ]}
        >
          Exercises and Stretches
        </Text>
        <Text style={[GlobalStyle.subHeaders, GlobalStyle.marginText]}>
          Exercises to Fix your posture
        </Text>
        <Image
          style={styles.img}
          source={require('../../assets/exercise.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyle.buttons]}
        onPress={() =>
          navigation.navigate("Progress Tracking", { language: "english" })
        }
      >
        <Text
          style={[
            GlobalStyle.headers,
            GlobalStyle.marginText,
            GlobalStyle.buttonSpace,
          ]}
        >
          Progress Tracker
        </Text>
        <Text style={[GlobalStyle.subHeaders, GlobalStyle.marginText]}>
          Track Your Fitness Journey
        </Text>
        <Image
          source={require("../../assets/bar-chart.png")}
          style={styles.img}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyle.buttons, styles.settings]}
        onPress={() =>
          navigation.navigate("Debug", { language: "english" })
        }
      >
        <Text
          style={[
            GlobalStyle.headers,
            GlobalStyle.marginText,
            GlobalStyle.buttonSpace,
          ]}
        >
          Debug
        </Text>
        <Text style={[GlobalStyle.subHeaders, GlobalStyle.marginText]}>
          Configure the App
        </Text>
        <Image
          source={require("../../assets/settings.png")}
          style={styles.img}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 110,
    width: 110,
    alignSelf: "center",
    marginLeft: 180,
  },
  settings: {
    marginBottom: 20,
  }
});
