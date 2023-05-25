//imported screens
import HomeScreen from "./frontend/screens/HomeScreen";
import ProgressPage from "./frontend/screens/ProgressPage";
import SettingsPage from "./frontend/screens/SettingsPage";
import Workouts from "./frontend/screens/WorkoutPage";

//components
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//app 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#BCD4A7",
          },
        }}
      >
        <Stack.Screen 
          name="Posture Check" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Exercises" 
          component={Workouts} 
        />
        <Stack.Screen 
          name="Progress Tracking" 
          component={ProgressPage} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsPage}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});