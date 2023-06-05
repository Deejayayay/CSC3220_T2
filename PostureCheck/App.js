//imported screens for navigation
import HomeScreen from "./frontend/screens/HomeScreen";
import ProgressPage from "./frontend/screens/ProgressPage";
import Workouts from "./frontend/screens/WorkoutPage";
import Stretches from "./frontend/screens/exercises/StretchesPage";
import Settings from "./frontend/screens/SettingsPage";
import ChartPage from "./frontend/screens/ChartPage";

//components
//import { StyleSheet} from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Database
let Backend = require("./Backend.js");

let testNEw = ["Hello", "Me", '"|Text|Display|"', 1, 1];

let testNEw2 = [`So f this loads, then wtf`, "Test", `|Text|Why?|`, 1, 1];

//app
export default function App() {
  // Backend.makeSQLiteDirAsync();
  Backend.dbLoader();
  // Backend.ExAdd(testNEw)
  Backend.ExMakeDefault();
  // Backend.AddEx(testNEw2)

  // Backend.TestGetAll()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#BCD4A7",
          },
        }}
      >
        <Stack.Screen name="Posture Checker" component={HomeScreen} />
        <Stack.Screen name="Exercises" component={Workouts} />
        <Stack.Screen name="Progress Tracking" component={ProgressPage} />
        <Stack.Screen name="Stretches" component={Stretches} />
        <Stack.Screen name="Debug" component={Settings} />
        <Stack.Screen name="Chart Page" component={ChartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//const styles = StyleSheet.create({});
