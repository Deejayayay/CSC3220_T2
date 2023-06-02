//imported files
import { GlobalStyle } from "../styles/globalstyles";
//import { homescreen } from "../automation/MyData";

//components
import { StyleSheet,Text,SafeAreaView, TouchableOpacity, Image} from "react-native";

let Backend = require("../../Backend.js")

//npm install react-native-swiper 
  // for image carousel
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <TouchableOpacity
        style={styles.exercisesButton}
        onPress={() =>
          navigation.navigate("Exercises", { language: "english" })
        }
      >
        <Text style={[GlobalStyle.headers, GlobalStyle.buttonSpace, GlobalStyle.marginText]}>Exercises and Stretches</Text>
        <Text style={[GlobalStyle.subHeaders, GlobalStyle.marginText]}>Exercises to Fix your posture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyle.buttons,]}
        onPress={() => navigation.navigate("Progress Tracking", { language: "english" })
        }
      >
        <Text style={[GlobalStyle.headers, GlobalStyle.marginText, GlobalStyle.buttonSpace]}>
          Progress Tracker
        </Text>
        <Text style={[GlobalStyle.subHeaders, GlobalStyle.marginText]}>
          Track Your Fitness Journey
        </Text>
        <Image source={require('../../assets/bar-chart.png')} style={styles.img} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  exercisesButton: {
    height: 490,
    borderRadius: 20,
    marginTop: 20,
    elevation: 3,
    flexDirection: "column",
    backgroundColor: "#BCD4A7",
  },
  img: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 100,
  },

});
