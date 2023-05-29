import * as SQLite from 'expo-sqlite';

let TestVal = 0
let blink = null
let testDb =  ["Hello", "Hu"]
let sql 
let DB 


readDataFromTable = () => {
    return new Promise((resolve, reject) => {
        DB.transaction((tx) => {
        // Execute a SELECT query
        tx.executeSql('SELECT * FROM TypeStore', [], (_, { rows }) => {
          // Extract the rows from the result object
          const data = rows._array;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        });
      });
    });
  };
  



module.exports = {
    Start: function(){
        DB =    SQLite.openDatabase("../AppDatabase.sql");  
    },

    End: function(){
        if(DB != null){
            DB.closeAsync();
        } else {
            console.warn("DATABASE NOT STARTED");
        }
    },

    GetExNum: function(){
        //TODO: replace with actual database read
  
        // return 
    },

    //Read the soted rutiens
    GetEx: function(name){

    },

    GetAllEx: function(){
        // DB.run('BEGIN TRANSACTION');

        sql = `SELECT Instructions FROM TypeStore`
        // DB.all(sql, [], (err, rows) => {
        //     if (err) return console.error(err.message);
        //     rows.forEach((row) => {
        //         console.log(row);
        //     });
        // })
        // let out = ""
        // DB.transaction((tx) => {
        //     tx.executeSql(sql, [], (tx, result) => {
        //       out = result.rows; // Assuming result.rows contains the retrieved data
        //       console.log(out); // Log the data after it has been retrieved
        //     });
        //   });

        readDataFromTable()
        .then((data) => {
          console.log('Data:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        // DB.transaction(tx => {
        //     tx.executeSql(
        //         `SELECT Name FROM TypeStore`,
        //         [],
        //         (sqlTxn, res) => {
        //             console.log("found data")
        //         },
        //         error => {
        //             console.log("database error: " + error.message)
        //         }

        //         // out,
        //      );
        // });
        // console.log(out)
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


