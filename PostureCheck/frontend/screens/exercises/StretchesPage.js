import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { GlobalStyle } from "../../styles/globalstyles";
import { ProgressTimer } from "../../components/ProgressTimer.js"

let Backend = require("../../../Backend.js");

let _name = "";
let _category = "";
let _steps = "|Text|me|";
let _eta = 0;

const IMAGE_PATHS = {
  childspose: require("../../../assets/childspose.png"),
  forwardfold: require("../../../assets/sfb.png"),
  highplank: require("../../../assets/highplank.png"),

};

function MakeText(input) {
  return (
    <Text style={GlobalStyle.body}>
      <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

function MakeImage(input) {
  return <Image source={IMAGE_PATHS[input]} style={GlobalStyle.img} />;
}
function MakeTitle(input) {
  return (
    <Text style={GlobalStyle.headers}>
      <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

function MakeHeader(input) {
  return (
    <Text style={GlobalStyle.subHeaders}>
      <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

/**
 * getes the curretly selcted exersize
 * @returns selected type primary key
 */
export function GetSelectedEx() {
  return _name;
}

function makeFromString(input) {
  let index = 0;
  let doneRead = false;
  let type = "";
  let temp = "";
  let pageGen = [];
  while (!doneRead) {
    let begin = 0;
    let end = 0;
    begin = input.indexOf("|", index) + 1;
    end = input.indexOf("|", begin + 1);
    index = end;
    console.log("start: " + begin + "\tend: " + end )
    if (end == -1 || begin == -1) {
      doneRead = true;
    }
    if (!doneRead) {
      var inp = input.substring(begin, end);
      // console.log(":"+ inp + ":");
      if (type == "") {
        type = inp;
      } else {
        console.log(inp)

        if (type == "Image") {
          pageGen.push(MakeImage(inp));
        } else if (type == "List") {
        } else if (type == "Sub") {
          pageGen.push(MakeHeader(inp));
        } else if (type == "Main") {
          pageGen.push(MakeTitle(inp));
        } else if (type == "Text") {
          pageGen.push(MakeText(inp));
        }
        type = "";
      }
    }
  }
  return pageGen;
}

export function setName(namu) {
  _name = namu;
}

export default function Stretches({ navigation, route }) {
  const [loaded, setLoaded] = useState(false);

  async function Create() {
    console.log("I am step 0");
    let temp = await Backend.ExGet(_name);
    // console.log(temp[2]);
    // _name = temp[0];
    _category = temp["Instructions"];
    _steps = temp["Instructions"];
    _eta = temp["Estimated length"];
    setLoaded(true); // Update the loaded state variable
  }

  // Call Create function on component mount
  React.useEffect(() => {
    Create();
  }, []);

  return (
    <View>
    <ScrollView style={GlobalStyle.container} showsVerticalScrollIndicator={false}>
        {loaded ? makeFromString(_steps) : null}
        <ProgressTimer/>
      </ScrollView>
      <View style={styles.container}>
      </View>
      <Modal visible={setLoaded}>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
