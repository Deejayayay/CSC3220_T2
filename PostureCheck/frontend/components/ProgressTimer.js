// Problems: 
// - I dont know how to actualy stop the timer from running.
// - I have not styled the component yet.
// - It does not interact with the database yet.

import { useState } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

export function ProgressTimer (props) {

    // Variable that holds the timer string. This is updated every second.
    const [dynamicText, setDynamicText] = useState("00 : 00 : 00")

    /* Variable that holds the text displayed in start/stop button. This changes
    when the button is ProgressBarAndroidBase. */
    const [startStopText, setStartStopText] = useState("Start Timer")

    // Variables to hold seconds, minutes, and hours.
    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    const RunTimer = () => {

        const IntervalTimer = setInterval(() => {

            // The bellow series of if statements converts seconds to minutes and hours.
            seconds++;
            if (seconds == 60) {
    
                minutes++;
                seconds = 0;
            }
            if (minutes == 60) {
    
                hours++;
                minutes = 0;
            }
    
            // The bellow series of if statements correctly formats the timer's text.
    
            let timeString = "";
    
            if (hours < 10) {
    
                timeString += ("0" + hours + " : ");
            }
            else {
    
                timeString += (hours + " : ");
            }
    
            if (minutes < 10) {
    
                timeString += ("0" + minutes + " : ");
            }
            else {
    
                timeString += (minutes + " : ");
            }
    
            if (seconds < 10) {
    
                timeString += ("0" + seconds);
            }
            else {
    
                timeString += seconds;
            }
    
            setDynamicText(timeString);
    
        }, 1000);

        // Flips the text on the start/stop button.
        if (startStopText == "Start Timer") {

            setStartStopText("Stop Timer");
        }
        else {

            setStartStopText("Start Timer");
        }
    }

    // The component created is a button that controls the timer and the timer itself.
    return (

        <View style = {styles.container}>

            <Button title = {startStopText}
                onPress = {RunTimer}
            />

            <Text>{dynamicText}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#BCD4A7',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });