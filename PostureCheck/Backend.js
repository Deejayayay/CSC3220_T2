import * as SQLite from "expo-sqlite";

let DB = null
let TestVal = 0
let blink = null
let testDb =  ["Hello", "Hu"]


module.exports = {
    Start: function(){
        DB = SQLite.openDatabase("../AppDatabase");  
        DB.transaction
    },

    End: function(){
        if(DB != null){
            DB.closeAsync;
        } else {
            console.warn("DATABASE NOT STARTED");
        }
    },

    GetExNum: function(){
        //TODO: replace with actual database read
  
        return 
    },

    //Read the soted rutiens
    GetEx: function(name){

    },

    AddEx: function(){

    },


    //Logs stuffs
    GetLogs: function(){

    },

    GetLatest: function(){
        
    },

    SetLatest: function(){

    },

    GetDay: function(){

    },

    LogData: function(){

    },



    TestPass: function(numbers){
        console.log(testDb[1])
        console.log("Times called: "+numbers)
        numbers++
    }
    
    
}


