import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
// import { stretches } from "../../automation/MyData";
let Backend = require("../../../Backend.js")

let _name = ""
let _category = ""
let _steps = ""
let _eta = 0

function MakeText(input){
  return(
    <Text style={GlobalStyle.body}>
            <Text numberOfLines={5}>{input}</Text>
    </Text>
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
    console.log("start: " + begin + "\tend: " + end )
    if(end == -1 || begin == -1){
      doneRead = true
    }
    if(!doneRead){
      var inp = input.substring(begin, end)
      console.log(":"+ inp + ":");
      if(type == ""){
        type = inp
      } else {
        if(type == "Image"){
          // pageGen.s
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

export function Create(name){
  let temp = Backend.ExGet(name)
  _name = temp["Name"]
  _category = temp["Category"]
  _steps = temp["Instructions"]
  _eta = temp["Estimated length"]
}


// export default class Stretches extends component {
//   //constructs props
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

 
  


//   renderExercises = ({ item }) => {
//     <SafeAreaView>
//       <ScrollView>
//         <View>
//         {makeFromString(_steps)}?
//           <Text>{item.title}</Text>
//           <Text>{item.description}</Text>
//           <Text>{item.time}</Text>
//           <Text>{item.steps}</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>;
//   };
//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           data={stretches}
//           renderItem={this.renderExercises}
//           keyExtractor={(item) => item.id}
//         />
//       </SafeAreaView>
//     );
//   }
// }
const styles = StyleSheet.create({});
