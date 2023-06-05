import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { GlobalStyle } from "../styles/globalstyles";
import React, { useState } from 'react';

//variable to access Backend Class
let Backend = require("../../Backend");
//streak saved as a variable
let streak = Backend.LogGetStreak

//Making the Graphs and returns a react jsx code of the buttons
function GraphButtons(idx) {
  //show modal
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  
  return (
    <View>
      <TouchableOpacity
        key={idx}
        style={styles.graphColumnContainers}
        onPress={show}
      >
        <View style={styles.graphColumns}>
          <Modal visible={visible} animationType="slide" onRequestClose={hide}>
            <Text>Day Statistics</Text>

            <Text>Workouts Completed</Text>

            <Text>Total time worked out</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hide}>
              <ScrollView>
                <Text style={[GlobalStyle.headers, GlobalStyle.modalButton]}>
                  exit
                </Text>
              </ScrollView>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableOpacity>
      <Text>Day {idx + 1}</Text>
    </View>
  );
}

//loop to create the graphs
async function MakeGraph() {
  //array that holds the buttons and columns
  let columnArr = [];
  //Loop to iterate through 7 days of the week
  for (var i = 0; i < 7; i++) {
    //calls to GraphButtons
    columnArr.push(GraphButtons(i));
  }
  //returns array
  return columnArr;
}

//Progress Boxes and the Graphs and page in general
export default function ProgressPage({ navigation, route }) {
  const [graphElements, setGraphElements] = React.useState([]);

  React.useEffect(() => {
    async function initializeGraph() {
      const bars = await MakeGraph(navigation);
      setGraphElements(bars);
    }
    initializeGraph();
  }, []);
  return (
    <ScrollView>
      <Text style={styles.header}>Progress Chart</Text>
      <View style={styles.graphContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {graphElements}
        </ScrollView>
      </View>

      <View style={styles.progressBoxes}>
        <Text
          style={[
            GlobalStyle.headers,
            GlobalStyle.marginText,
            styles.progressHeader,
          ]}
        >
          Total Days Excercised
        </Text>

        <Text>day#</Text>
      </View>

      <View style={styles.progressBoxes}>
        <Text
          style={[
            GlobalStyle.headers,
            GlobalStyle.marginText,
            styles.progressHeader,
          ]}
        >
          You're on a streak!!!
        </Text>
      </View>
    </ScrollView>
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
    height: 170,
  },
  progressHeader: {
    marginTop: 10,
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
    borderWidth: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 250,
    width: 70,
  },
  graphColumns: {
    backgroundColor: "black",
    width: 70,
    height: 70,
  },
  modalButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    marginTop: 650,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#BCD4A7",
  },
});
