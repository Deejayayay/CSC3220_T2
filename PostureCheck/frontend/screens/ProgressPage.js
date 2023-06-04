import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Modal
} from "react-native";
import { GlobalStyle } from "../styles/globalstyles";
import { useState } from "react";

function GraphButtons(idx) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    
    <Pressable key={idx} style={styles.graphColumnContainers} onPress={show}>
      <View style={styles.graphColumns}>

        <Modal visible={visible} animationType="slide" onRequestClose={hide}>
          <Text>e1</Text>

          <Pressable style={styles.modalButton} onPress={hide}>
              <Text> exit </Text>
          </Pressable>
        </Modal>
      </View>
    </Pressable>
  );
}

function MakeGraph() {
  let columnArr = [];
  for (var i = 0; i < 7; i++) {
    columnArr.push(GraphButtons(i));
  }
  return columnArr;
}

export default function ProgressPage({ navigation, route }) {
  return (
    <SafeAreaView>
        <ScrollView>
          <Text style={styles.header}>Progress Chart</Text>
          <View style={styles.graphContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>{MakeGraph()}</ScrollView>
          
          </View>

          <Text style={styles.header}>You're on a XX streak!!!</Text>
          
            <View style={styles.progressBoxes}>
              <Text style={[GlobalStyle.headers, GlobalStyle.marginText, styles.progressHeader]}>
                Total Days Excercised
              </Text>
            </View>

            <View style={styles.progressBoxes}>
              <Text style={[GlobalStyle.headers, GlobalStyle.marginText, styles.progressHeader]}>
                Total time worked out
              </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "center",
  },
  progressBoxes: {
    marginTop: 25,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: "#BCD4A7",
    width: 370,
    height: 150,
  },
  progressHeader: {
    marginTop: 10
  },
  graphContainer: {
    flexDirection: "row",
    height: 300,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#BCD4A7",
    justifyContent: "space-evenly",
  },
  graphColumnContainers: {
    borderColor: "black",
    justifyContent: "flex-end",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 280,
    width: 70,
  },
  graphColumns: {
    backgroundColor: "black",
  },
  modalButton: {
    width: 50,
    height: 20,
    backgroundColor: "#BCD4A7",
    marginBottom: 20
  }
});
