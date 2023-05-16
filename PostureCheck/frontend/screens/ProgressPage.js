import { StyleSheet, Text, View, ScrollView } from "react-native";
import { GlobalStyle } from "../styles/globalstyles";

export default function ProgressPage({ navigation, route }) {
  return (
    <ScrollView>
      <ScrollView>
        <View style={GlobalStyle.container}>
          <View>
            <Text style={GlobalStyle.header}>You're on a XX streak!!!</Text>
          </View>

          <View style={styles.infoContainers}>
            <View style={styles.box}>
              <Text style={styles.infoText}>Total Days Excercised</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.infoText}>Total time worked out</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    shadowColor: '#171717',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: -2, height: 4},
    borderRadius: 20,
    backgroundColor: '#BCD4A7',
    width: 150,
    height: 150,
  },
  infoContainers: {
    width: 325,
    marginTop: 50,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
});
