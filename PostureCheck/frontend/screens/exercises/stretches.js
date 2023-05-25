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

  renderExercises = ({ item }) => {
    <SafeAreaView>
      <ScrollView>
        <View>
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
