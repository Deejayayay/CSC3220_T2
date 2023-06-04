import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { GlobalStyle } from "../styles/globalstyles";
import { useState } from "react";
import { LogsGetStreak } from "../../Backend";


function GraphButtons(idx) {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
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
      <ScrollView>
        <Text style={styles.header}>Progress Chart</Text>
        <View style={styles.graphContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {MakeGraph()}
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
            You're on a XX streak!!! 
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
    width: 70,
    height: 50,
  },
  modalButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    marginTop: 650,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#BCD4A7",
  },
});
