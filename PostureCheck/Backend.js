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
 * Open the database
 */
export function Start() {
	// DB =    SQLite.openDatabase("./AppDatabase.db");  
	start()
	// openDatabaseIShipWithApp()
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



export function GetEx(name) {
	let rtnArr = []
	//TODO: replace with actual database read
	let testStr = "|Main|Essay #1|Sub|Dylan Beppu|Sub|Wri 1000|Text|\n\tAmerican public schools are a frequent source of debate and con\n\n\n\n\n\n\n\n\n\n\n\n\nflict. Some people argue that schools do too much, others too little. Historically schools have changed dramatically, from one room schoolhouses to multi service institutions. American public schools have changed a lot in particular, due to American public schools being an extension of the United States government, making them subject to the fluctuations in politics. Due to the connection to the United States government, American public schools change and adapt their curriculum, services, and teaching styles to meet the wants and needs of American citizens.|Text|\tPeople can influence In Sarah Mervosh’s article “In Minneapolis Schools, White Families are asked to help do the integrating”, the state redrew school districts to encourage integration between different races (Mervosh 9). However, the intended integration between people didn’t happen just some school statistics changed yet the school is still segregated. Mervosh interviewed Ms. Friestleben, a principal at a school affected by the redistricting, who wants her students to feel honored and recognized by all, having mixed feelings about the white students being able to recognize their accomplishments (Mervosh 10). Despite some schools in the region being able to integrate well with other ethnicities, some schools such as North High have changed statistically little yet left the community on edge. Racial integration was a failure, however it demonstrates that public schools will adapt to the wants of American citizens, although to what extent and to which group varies.|"
	//name, category, instructions, estimated length
	rtnArr = [name, "Category", testStr, 5]
	return rtnArr
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
	//TODO: debuggin ish~
	// DB.run('BEGIN TRANSACTION');

	// sql = `SELECT Instructions FROM TypeStore`


    // DB.transaction(
	// 	(tx) => {
	// 	//   tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
	// 	  tx.executeSql("SELECT * from TypeStore", [], (_, { rows }) =>
	// 		console.log(JSON.stringify(rows))
	// 	  );
	// 	},
	// 	null,
	// 	console.log("called")
	//   );
  
	// useEffect(() => {
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
	//   }, []);


  	// DB.transaction(
    //     (tx) => {
    //       const sqlCmd = "SELECT * from TypeStore";
    //       tx.executeSql(sqlCmd, [], (_tx, resultSet) => {
    //         console.log(_tx)
    //       });
    //     },
    //     (err) => {
    //       reject(err);
    //     },
    //     () => {
    //     //   resolve(selectTasksResultSet);
	// 	console.log("im here")
    //     }
	// )





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

	// readDataFromTable()
	// 	.then((data) => {
	// 		console.log('Data:', data);
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error:', error);
	// 	});

	// DB.transaction(tx => {
	//     tx.executeSql(
	//         `SELECT Name FROM TypeStore`,
	//         [],
	//         (sqlTxn, res) => {
	//             console.log("found data")
	// 			console.log(sqlTxn)
	//         },
	//         error => {
	//             console.log("database error: " + error.message)
	//         }

	//         // out,
	//      );
	// });
	// console.log(out)
}