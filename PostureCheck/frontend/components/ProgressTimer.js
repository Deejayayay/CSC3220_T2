// Call logdata. Update with LogFinishLatest.
import { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, TouchableHighlight, BackHandler } from "react-native"
import { LogData, LogLatest, LogFinishLatest } from "../../Backend.js"
import { GetSelectedEx } from "../screens/exercises/StretchesPage.js"
import { GlobalStyle } from "../styles/globalstyles.js"

let Backend = require('../../Backend.js');

function Options(idx){
    return(
        <TouchableOpacity style={styles.buttons} onPress={() => SetDiff(idx + 1)}>
            <Text style={[GlobalStyle.body, styles.text]}>
                {idx + 1}
            </Text>
        </TouchableOpacity>                        
    );
}

function MakeOptions(){
    let optArr = [];
    console.log(i);
    for(var i = 0;i < 10;i++){
        optArr.push(Options(i));
    }
    return optArr;
}

//sets the difference
function SetDiff(dif){
    Backend.LogSetLatestDifficulty(dif);
    console.log(dif)
}
export function ProgressTimer (props) {

    // Variable that holds the timer string. This is updated every second.
    const [dynamicText, setDynamicText] = useState("00 : 00 : 00")

    /* Variable that holds the text displayed in start/stop button. This changes
    when the button is ProgressBarAndroidBase. */
    const [startStopText, setStartStopText] = useState("Start Timer")

    // Variables to hold seconds, minutes, and hours.
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    // This variable is used to stop the timer when the button is pressed for a second time.
    const currentTimer = useRef(null);

    // This function is called whenever the start/stop button is pressed.
    const UpdateTimer = () => {

        // Flips the text on the start/stop button.
        if (startStopText == "Start Timer") {

            // Create entry in the database.
            LogData(GetSelectedEx());

            // Initial time is reset.
            setDynamicText("00 : 00 :00");

            // The useState hook does not work well when it is constantly updated in setInterval so these variables are used.
            let timerSeconds = seconds;
            let timerMinutes = minutes;
            let timerHours = hours;

            const IntervalTimer = setInterval(() => {

                // The bellow series of if statements convert seconds to minutes and hours.
                timerSeconds += 1;
                if (timerSeconds == 60) {
    
                    timerMinutes += 1;
                    timerSeconds = 0;
                }
                if (timerMinutes == 60) {
    
                    timerHours += 1;
                    timerMinutes = 0;
                }
    
                // The bellow series of if statements correctly formats the timer's text.
                let timeString = "";
    
                // Hour formatting...
                if (timerHours < 10) {
    
                    timeString += ("0" + timerHours + " : ");
                }
                else {
    
                    timeString += (timerHours + " : ");
                }
    
                // Minute formatting...
                if (timerMinutes < 10) {
    
                    timeString += ("0" + timerMinutes + " : ");
                }
                else {
    
                    timeString += (timerMinutes + " : ");
                }
    
                // Second Formatting...
                if (timerSeconds < 10) {
    
                    timeString += ("0" + timerSeconds);
                }
                else {
    
                    timeString += timerSeconds;
                }

                setSeconds(timerSeconds);
                setMinutes(timerMinutes);
                setHours(timerHours);
                setDynamicText(timeString);

            }, 1000);

            // The currentTimer variable is neccacary so that the timer does not reset before the interval is cleared.
            currentTimer.current = IntervalTimer;
            setStartStopText("Stop Timer");
        }
        else {

            // Interval is cleared and button text is changed.
            clearInterval(currentTimer.current);
            setStartStopText("Start Timer");

            // The total number of seconds is logged into the database.
            LogFinishLatest((hours * 3600) + (minutes * 60) + seconds);

            // Reset time variables.
            setSeconds(0);
            setMinutes(0);
            setHours(0);

            SetDifficulty();
        }

    }

    const [modalIsVisible, setModalIsVisible] = useState(false);

    function SetDifficulty(dif) {
        
        setModalIsVisible(true);
    }

    /* If the user exits the page before the timer stops this useeffect automatically loggs the data.
    useEffect => (() => {

        if (startStopText == "Stop Timer") {

            UpdateTimer();
        }

    }, [props.visible]);

    */

    /* I don't know how exactly we want to style this yet but the timer code works. Here's the important stuff:

    - startStopText: Variable that holds the physical text of the start/stop button. This should be the title of
    the button used.

    - UpdateTimer: Function that stops/starts the timer function. This should be the onPress function for the button.

    - dynamicText: String that displays the time logged so far. This is updated after each second.

    */
    
    return (
            <View>
            <Button title = {startStopText + "\n" + dynamicText}
                onPress = {UpdateTimer}
            />

            <Modal animationType="slide" visible={modalIsVisible}>
                <View style={styles.con}>
                    <Text style={[styles.text, GlobalStyle.headers]}>
                        How difficult was the exercise?
                    </Text>
                    <View style={styles.buttContainer}>
                        {MakeOptions()} 
                    </View>
                </View>

                <TouchableOpacity  style={styles.modalButton} onPress={() => setModalIsVisible(false)}>
                    <Text style={[GlobalStyle.headers, styles.text]}>Exit</Text>
                </TouchableOpacity>
            </Modal>
            </View>
    );
}

const styles = StyleSheet.create({
    exercisesButton: {
        height: 490,
        borderRadius: 20,
        marginTop: 20,
        elevation: 3,
        flexDirection: "column",
        backgroundColor: "#BCD4A7",
      },
      buttContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
      },
      buttons: {
        borderWidth: 1,
        backgroundColor: "#BCD4A7",
        width: 25,
        height: 25,
        borderRadius: 20,
      },
      text: {
        alignSelf: 'center'
      },
      con: {
        marginTop: 350,
      },
      modalButton: {
        alignSelf: 'center',
        marginTop: 200,
        borderRadius:20,
        width: 80,
        height: 35,
        backgroundColor: "#BCD4A7",
      },
  });