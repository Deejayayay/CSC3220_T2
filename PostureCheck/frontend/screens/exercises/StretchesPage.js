import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from 'react';
import { Image } from "react-native";
import Constants from "expo-constants";
import { GlobalStyle } from "../../styles/globalstyles";

// import CountdownTimer from "../../Components/timer";

let Backend = require("../../../Backend.js")
// import img1 from '../../../assets/childspose.png';

let _name = ""
let _category = ""
let _steps = "|Text|me|"
let _eta = 0

const IMAGE_PATHS = {
  childspose: require('../../../assets/childspose.png'),
}


function MakeText(input){
  return(
    <Text style={GlobalStyle.body}>
            <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

function MakeImage(input){
  return(
  <Image
  source={IMAGE_PATHS[input]}
  style={styles.img}
  />
  );
}
function MakeTitle(input){
  return(
    <Text style={GlobalStyle.headers}>
            <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

function MakeHeader(input){
  return(
    <Text style={GlobalStyle.subHeaders}>
            <Text numberOfLines={5}>{input}</Text>
    </Text>
  );
}

/**
 * getes the curretly selcted exersize
 * @returns selected type primary key
 */
export function GetSelectedEx(){
  return _name
}

function makeFromString(input){
  let index = 0
  let doneRead = false
  let type = ""
  let temp = ""
  let pageGen = [] 
  while(!doneRead){
    let begin = 0
    let end = 0
    begin = input.indexOf('|', index) + 1;
    end =  input.indexOf('|', begin+1);
    index = end;
    // console.log("start: " + begin + "\tend: " + end )
    if(end == -1 || begin == -1){
      doneRead = true
    }
    if(!doneRead){
      var inp = input.substring(begin, end)
      // console.log(":"+ inp + ":");
      if(type == ""){
        type = inp
      } else {
        if(type == "Image"){
          pageGen.push(MakeImage(inp))

        } else if(type == "List") {

        } else if(type == "Sub") {
          pageGen.push(MakeHeader(inp))

        } else if(type == "Main") {
          pageGen.push(MakeTitle(inp))

        } else if(type == "Text") {
          pageGen.push(MakeText(inp))
        }
        type=""
      }
    }
  }
  return pageGen
}


export function setName(namu){
  _name = namu
}
// export async function Create(name){
//   console.log("I am step 0")
//   let temp = await Backend.GetEx(name)
//   console.log(temp[2])
//   _name = temp[0]
//   _category = temp[1]
//   _steps = temp[2]
//   _eta = temp[3]
//   setLoaded(true)
// }

// //excercise pages
// export default function Stretches({ navigation, route }) {
//   const [loaded, setLoaded] = useState(false);

//   //TODO: Find a way to update this page after its been created
//   return (
//     <ScrollView>
//       {/* <Text>test</Text> */}
//       {/* {makeFromString(_steps)} */}
//     {loaded ? makeFromString(_steps) : null}
//     </ScrollView>
//   );
// }

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
    <ScrollView showsVerticalScrollIndicator={false}>
      {loaded ? makeFromString(_steps) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    marginLeft: 30,
    marginRight: 30,
  },
  headers: {
    marginTop: 20,
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "500",
  },
  subHeaders: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "500",
  },
  body: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
  },
  startButton: {
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    alignSelf: "center",
    position: "absolute",
    width: 100,
    height: 50,
    marginTop: 650,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#BCD4A7",
  },
  startButtonText: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 13,
  },
  repeatButton: {
    flexDirection: "row",
  },
  image: {
    marginLeft: 30,
    marginRight: 30,
    width: 300,
    height: 300,
  },
  imageContainer: {
    alignItems: "center",
  },
  modal: {
    alignContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  timerContainer: {
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    height: 300,
    width: 300,
    marginTop: 250,
    borderRadius: 300 / 2,
    backgroundColor: "#BCD4A7",
    alignItems: "center",
    alignSelf: "center",
  },
  timerText: {
    marginTop: 140,
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "500",
  },
});
