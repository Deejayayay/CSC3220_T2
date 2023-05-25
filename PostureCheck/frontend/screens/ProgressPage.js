import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { GlobalStyle } from "../styles/globalstyles";

export default function ProgressPage({ navigation, route }) {
  return (
    <SafeAreaView>
      <View style={GlobalStyle.container}>
      <ScrollView>
        <View style={styles.imgContainer}></View>
        <Text style={styles.header}>You're on a XX streak!!!</Text>

          <View style={styles.progressBoxes}>
            <Text style={[GlobalStyle.body, GlobalStyle.marginText]}>
              Total Days Excercised
            </Text>
          </View>

          <View style={styles.progressBoxes}>
            <Text style={[GlobalStyle.body, GlobalStyle.marginText]}>
              Total time {"\n"} worked out
            </Text>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  header: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "center",
  },
  progressBoxes: {
    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#BCD4A7",
    width: 150,
    height: 150,
    
  },
  imgContainer: {
    height: 220,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: "#BCD4A7",
  },
});
