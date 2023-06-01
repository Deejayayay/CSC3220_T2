import * as SQLite from 'expo-sqlite';
import * as FileSystem from "expo-file-system";
import {
	Asset
} from "expo-asset";



let TestVal = 0
let blink = null
let testDb = ["Hello", "Hu"]
let sql
let DB
let dbFile
//https://reactdevstation.github.io/2020/04/04/sqllite.html
//https://forums.expo.dev/t/sqlite-existing-database/6470/3
let CLEAR_DB = false

const LOGGER_STR = `
	 CREATE TABLE IF NOT EXISTS Logger	(
		[Index]    INTEGER PRIMARY KEY AUTOINCREMENT
						   NOT NULL,
		IsDone     INTEGER NOT NULL
						   DEFAULT (0),
		DateDone   NUMERIC NOT NULL
						   DEFAULT (0),
		Difficulty INTEGER DEFAULT (0) 
						   NOT NULL,
		TimeDone   NUMERIC DEFAULT (0) 
						   NOT NULL,
		TypeInfo           REFERENCES TypeStore (Name) 
	)`
const TYPE_STORE_STR = `
	CREATE TABLE IF NOT EXISTS TypeStore (
		Name               TEXT    PRIMARY KEY
								   NOT NULL,
		Category           TEXT    DEFAULT Misc
								   NOT NULL,
		Instructions       TEXT,
		[Estimated length] NUMERIC NOT NULL
								   DEFAULT (1),
		Weighting          NUMERIC NOT NULL
								   DEFAULT (1) 
	)
`

function makeTable(str){
	DB.transaction((tx) => {
		tx.executeSql(
			str
		);
	 });
}

// makeSQLiteDirAsync()
export function loader(){
	DB = SQLite.openDatabase("./storeage.db")
	makeTable(LOGGER_STR)
	makeTable(TYPE_STORE_STR)
}





/**
 * makes the timecode 
 * @returns timecode
 */
export function ToTimeCode() {
	let rtnVal = Date().getFullYear + "" + (Date().getMonth + 1) + "" + Date().GetDay
	return rtnVal
}

/**
 * Get the tiem 
 * @param {*} howBack 
 * @returns 
 */
export function GetDaysBack(howBack) {
  //TODO: find caulations for this
	let rtnVal = Date().getFullYear + "" + (Date().getMonth + 1) + "" + Date().GetDay
	return rtnVal
}


/**
 * close the database
 */
export function End() {
	if (DB != null) {
		DB.closeAsync();
	} else {
		console.warn("DATABASE NOT STARTED");
	}
}



/**
 * gets the list of exercise names from table
 * @returns list of names
 */
export function GetExNames() {
	let nameArr = []
	//TODO: Replace with database read
	for (var i = 0; i < 10; i++) {
		nameArr.push("Test_" + i)
	}
	return nameArr
}



const getRowByPrimaryKey = (tableName, primaryKeyValue, callback) => {
  DB.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tableName} WHERE Name = ?`,
      [primaryKeyValue],
      (_, { rows }) => {
        console.log(rows)
        if (rows.length > 0) {
          // Get the first row from the result
          const row = rows.item(0);
          if (callback) { // Check if callback function is defined
            callback(row);
          }
        } else {
          console.log("hello")
          if (callback) { // Check if callback function is defined
            callback(null); // No row found
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  });
};

export async function GetEx(name) {
  let rtnArr = [name, "Category", "|Main|T|", 5];

  try {
    await new Promise((resolve, reject) => {
      getRowByPrimaryKey('TypeStore', name, (row) => {
        if (row) {
			console.log(name + ' was found in TypeStore');
			rtnArr = [name, row["Category"], row["Instructions"], row["Estimated length"]];
        } else {
        	console.log(name + ' was not found in TypeStore');
        	rtnArr = [name, 'NA', '|Main|Cannot find exercise|', -1];
        }
        resolve();
      });
    });
  } catch (error) {
    console.error(error);
  }
  return rtnArr;
}

  
/**
 * Gets the exercise image (for making the workout page)
 * @param {*} name 
 * @returns the image name (put the path in the string to image)
 */
export function GetExImg(name) {
	//TODO: Implment
	let imgName = "icon"
	return imgName
}

let testNEw = [   'Hello',
'Me',
'"|Text|Display|"',
1,
1]


/**
 * Inset to the exersize array from input
 * @param {*} inArr row to input
 */
export function AddEx(inArr) {
	// let addon = `VALUES(`
	// addon = addon + inArr[0] + "," + inArr[1] + "," + inArr[2] + "," + inArr[3] + "," + inArr[4] + `)`

	DB.transaction((tx) => {
		tx.executeSql(
		  'INSERT INTO TypeStore (Name, Category, Instructions, "Estimated length", Weighting) VALUES (?, ?, ?, ?, ?)',
		  testNEw,
		  (_, result) => {
			if (result.rowsAffected > 0) {
			  console.log('Data inserted successfully.');
			} else {
			  console.log('Failed to insert data.');
			}
		  },
		  (error) => {
			console.log('Error executing SQL: ', error);
		  }
		);
	});

}


//Logs stuffs
export function GetLogs() {

}

export function GetLatest() {
	let rtnTab
	rtnTab.Push()
	return rtnTab
}


/**
 *  Sets the last exercise
 * @param {*} endT end of the exercise (negative is to remove it)
 */
export function SetLatest(endT) {

}

export function GetDay() {

}

export function LogData() {

}



export function TestPass(numbers) {
	console.log(testDb[1])
	console.log("Times called: " + numbers)
	numbers++
}

export function TestGetAll() {
		DB.transaction((tx) => {
		  tx.executeSql(
			'SELECT * FROM TypeStore',
			[],
			(_, { rows }) => {
			  // Access the retrieved rows here
			  const data = rows._array;
			  console.log( data); // or do something else with the data
			},
			(error) => {
			  console.log('Error executing SQL: ', error);
			}
		  );
		});
}