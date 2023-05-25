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
import { stretches } from "../../automation/MyData";

export default class Stretches extends component {
  //constructs props
  constructor(props) {
    super(props);
    this.state = {};
  }

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
  
  
  let testStr = "|Main|Essay #1|Sub|Dylan Beppu|Sub|Wri 1000|Text|\n\tAmerican public schools are a frequent source of debate and conflict. Some people argue that schools do too much, others too little. Historically schools have changed dramatically, from one room schoolhouses to multi service institutions. American public schools have changed a lot in particular, due to American public schools being an extension of the United States government, making them subject to the fluctuations in politics. Due to the connection to the United States government, American public schools change and adapt their curriculum, services, and teaching styles to meet the wants and needs of American citizens.|Text|\tPeople can influence In Sarah Mervosh’s article “In Minneapolis Schools, White Families are asked to help do the integrating”, the state redrew school districts to encourage integration between different races (Mervosh 9). However, the intended integration between people didn’t happen just some school statistics changed yet the school is still segregated. Mervosh interviewed Ms. Friestleben, a principal at a school affected by the redistricting, who wants her students to feel honored and recognized by all, having mixed feelings about the white students being able to recognize their accomplishments (Mervosh 10). Despite some schools in the region being able to integrate well with other ethnicities, some schools such as North High have changed statistically little yet left the community on edge. Racial integration was a failure, however it demonstrates that public schools will adapt to the wants of American citizens, although to what extent and to which group varies.|"


  renderExercises = ({ item }) => {
    <SafeAreaView>
      <ScrollView>
        <View>
        {makeFromString(testStr)}?
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.time}</Text>
          <Text>{item.steps}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>;
  };
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={stretches}
          renderItem={this.renderExercises}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({});
