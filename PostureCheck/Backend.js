import * as SQLite from 'expo-sqlite';
import * as FileSystem from "expo-file-system";
import {
    Asset
} from "expo-asset";

let DB = SQLite.openDatabase("./storeage.db")
//https://reactdevstation.github.io/2020/04/04/sqllite.html
//https://forums.expo.dev/t/sqlite-existing-database/6470/3

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

const SCORE_THRESHOLD = 0.2

export async function dbDeleteTable(tableName) {
    return new Promise((resolve, reject) => {
        DB.transaction(
            (tx) => {
                tx.executeSql(
                    `DROP TABLE IF EXISTS ${tableName}`,
                    [],
                    () => {
                        console.log(`Table ${tableName} deleted successfully`);
                        resolve();
                    },
                    (error) => {
                        console.log(`Error deleting table ${tableName}:`, error);
                        reject(error);
                    }
                );
            },
            (txError) => {
                console.log(`Transaction error:`, txError);
                reject(txError);
            }
        );
    });
}



const getRowByPrimaryKey = (tableName, primaryKeyValue, callback) => {
    DB.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM ${tableName} WHERE Name = ?`,
            [primaryKeyValue],
            (_, {
                rows
            }) => {
                //   console.log(rows)
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

const getRowByPrimaryKeyLogs = (tableName, primaryKeyValue, callback) => {
    DB.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM ${tableName} WHERE [Index] = ?`,
            [primaryKeyValue],
            (_, {
                rows
            }) => {
                //   console.log(rows)
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



function dbMakeTable(str) {
    DB.transaction((tx) => {
        tx.executeSql(
            str
        );
    });
}

// makeSQLiteDirAsync()
export function dbLoader() {
    dbMakeTable(LOGGER_STR)
    dbMakeTable(TYPE_STORE_STR)
}


/**
 * close the database
 */
export function dbEnd() {
    if (DB != null) {
        DB.closeAsync();
    } else {
        console.warn("DATABASE NOT STARTED");
    }
}


/**
 * ONLY USE FOR TESTING, IT DELETES ALL TABLES
 */
export function dbNukeAll() {
	console.warn("Deleted all tables from database")
    dbDeleteTable("TypeStore")
    dbDeleteTable("Logger")

}


/**
 * 	today's date in YYYYMMDD format
 * @returns dateCode
 */
export function GetDay() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const rtnDate = `${year}${month}${day}`;
    return rtnDate
}

function calculateDaysBetweenDates(date1, date2) {
	const year1 = Math.floor(date1 / 10000);
	const month1 = Math.floor((date1 % 10000) / 100) - 1;
	const day1 = date1 % 100;
  
	const year2 = Math.floor(date2 / 10000);
	const month2 = Math.floor((date2 % 10000) / 100) - 1;
	const day2 = date2 % 100;
  
	const dateObject1 = new Date(year1, month1, day1);
	const dateObject2 = new Date(year2, month2, day2);
  
	const diffInMs = Math.abs(dateObject2 - dateObject1);
	const daysBetween = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
	return daysBetween;
  }


/**
 * get the  dateCode for x days back
 * @param {int} howBack number of days back
 * @returns dateCode for x days back
 */
export function GetDaysBack(howBack) {
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate.getTime() - howBack * 24 * 60 * 60 * 1000);
    const year = lastWeekDate.getFullYear();
    const month = String(lastWeekDate.getMonth() + 1).padStart(2, '0');
    const day = String(lastWeekDate.getDate()).padStart(2, '0');
    const rtnDate = `${year}${month}${day}`;
    return rtnDate
}

/**
 * Clears all data in TypeStore
 */
export function ExClear() {
    let sqlCmd = `DELETE FROM TypeStore`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [],
            (txObj, result) => {
                console.log("Cleaerd exersiszes from type store")
            },
            (txObj, error) => {
                console.log('Error executing SQL: ', error);
            }
        );
    });
}




/**
 * gets the list of exercise names from table
 * @returns list of names
 */
export async function ExGetNames() {
    console.log("getting names")
    return new Promise((resolve, reject) => {
        let nameArr = [];
        DB.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM TypeStore',
                    [],
                    // (_, { rows }) => {
                    //   const row = rows.item(0);
                    //   nameArr.push(row["Name"]);
                    //   console.log("GETTING");
                    // },
                    (_, {
                        rows
                    }) => {
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);
                            nameArr.push(row["Name"]);
                            console.log("GETTING");

                        }
                    },
                    (error) => {
                        console.log('Error executing SQL: ', error);
                        reject(error);
                    }
                );
            },
            (txError) => {
                console.log('Transaction error: ', txError);
                reject(txError);
            },
            () => {
                console.log("Transaction completed");
                resolve(nameArr);
            }
        );
    });
}

export async function ExGetAll(){
	let rtnArr = []
	sqlCmd = `SELECT * FROM TypeStore`
    await new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql(
			    sqlCmd,
                [],
                (_, { rows }) => {
                rtnArr = rows._array;
                resolve()
            },
            (error) => {
                console.log('Error executing SQL: ', error);
                reject()
            }
            )
         });
    });
	return rtnArr
}


export async function ExGet(name) {
    let rtnArr = [name, "NA", "|Main|Default|", 5];
    try {
        await new Promise((resolve, reject) => {
            getRowByPrimaryKey('TypeStore', name, (row) => {
                if (row) {
                    console.log(name + ' was found in TypeStore');
                    rtnArr = row;
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
 * Inset to the exersize array from input
 * @param {*} inArr (name, catigory, instructions, estimated lenght, weighting)
 */
export function ExAdd(inArr) {
    const sqlCmd = `INSERT into TypeStore (Name, Category, Instructions, "Estimated length", Weighting) VALUES (?, ?, ?, ?, ?)`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [inArr[0], inArr[1], inArr[2], inArr[3], inArr[4]],
            (_tx, result) => {
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

/**
 * Makes a of exercises
 */
export function ExMakeTest() {
    let e0 = ['UpperTest', 'Upper', '"|Main|Upper Test|Text|Somethings|"', 75, 2, ]
    let e1 = ['Lower_test', 'Lower', '"|Main|Lower Test|Text|Somethings|"', 60, 1]
    let e2 = ['Coustom test', 'NA', '"|Main|Coustom Test|Text|Somethings|"', 30, 0.5]
    let e3 = ['Office brake', 'Na', '"|Main|Office brake|Text|Somethings|"', 20, 1]
    ExAdd(e0)
    ExAdd(e1)
    ExAdd(e2)
    ExAdd(e3)
}

/**
 * Makes the default exersizes for the app
 */
export function ExMakeDefault(){
    let e0 = ['Childs pose', 'Upper', '|Image|childspose|Main|Childs pose|Text|This resting pose stretch lengthens your spine, glutes and hamstrings. This helps to release tension in your lower back and neck|Sub|Steps:|Text|1) Step1\n2 Step2\n3) Step3', 75, 2, ]
    ExAdd(e0)

}

/**
 * Clears all logs
 */
export function LogClear() {
    let sqlCmd = `DELETE FROM Logger`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [],
            (txObj, result) => {
                console.log("Cleared stored data from logger")
            },
            (txObj, error) => {
                console.log('Error executing SQL: ', error);
            }
        );
    });
}

/**
 * prints all the logs to consol
 */
export function LogPrintAll() {
    let sqlCmd = 'SELECT * FROM Logger'
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [],
            (_, {
                rows
            }) => {
                // Access the retrieved rows here
                //   console.log(rows)
                const data = rows._array;
                console.log(data); // or do something else with the data
            },
            (error) => {
                console.log('Error\tLogsPrintAll:\t: ', error);
            }
        );
    });
}

/**
 * Gets all logs from the given dateCode
 * @param {int} dateCode 
 * @returns array of logs
 */
export async function LogFromDay(dateCode) {
    // console.log("GetLogsFromDay------------------------------------------------------")
    let rtnArr = [];
    const sqlCmd = `SELECT * FROM Logger WHERE DateDone = ?`;
    await new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql(
                sqlCmd,
                [dateCode],
                (_, {rows}) => {
                    console.log(rows._array.length);
					for(let i = 0; i < rows._array.length; i++){
						rtnArr.push(rows.item(i));
					}
					console.log(rtnArr)
                    resolve();
                },
                (_, error) => {
                    console.log('Error\tGetLogsFromDay:\t', error);
                    reject(error);
                }
            );
        });
    });
    return rtnArr;
}

/**
 * gets the given date's score
 * @param {int} dateCode 
 * @returns 
 */
export async function LogDayScore(dateCode){
	let score = 0
	// let typeInfo = await ExGetAll()
	let dayInfo = await LogFromDay(dateCode)
	// console.log(dayInfo)
	for(let i = 0; i < dayInfo.length; i++){
		let exData = await ExGet(dayInfo[i]["TypeInfo"])
		score += Math.min(dayInfo[i]["TimeDone"]/exData["Estimated length"],1)*exData["Weighting"]
	}
	console.log(score)
	return score
}



/**
 * gets the latest log
 * @returns 
 */
export async function LogLatest() {
    let rtnArr
	const sqlCmd = `SELECT * FROM Logger WHERE [Index] = (SELECT MAX([Index]) FROM Logger)`
	await new Promise((resolve, reject) => {
		DB.transaction(tx => {
		  tx.executeSql(
			sqlCmd,
			[],
			(_, { rows }) => {
				console.log(rows.item(0))
				rtnArr = rows.item(0)
				resolve()
			},
			(_, error) => {
				console.log('Error\LogsLatest:\t', error);
				reject(error);
			}
		  );
		});
	  });
	console.log("Hel;lo")
    return rtnArr
}

/**
 * gets the log at index
 * @param {int} i index
 * @returns 
 */
export async function LogAt(i) {
	let rtnArr = []
    try {
        await new Promise((resolve, reject) => {
            getRowByPrimaryKeyLogs('Logger', i, (row) => {
                if (row) {
					rtnArr = row

                    console.log(row);
                } else {
					rtnArr = row
                    console.log(i + ' was not found in Logs');
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
 * Gets the current streak
 * @returns  streak
 */
export async function LogGetStreak(){
	let streak =0
	let n = await LogLatest()
	let o = await LogAt(1)
	// console.log(o["DateDone"])

	let daysBack = calculateDaysBetweenDates(n["DateDone"], o["DateDone"])
	for(let i = daysBack; daysBack > 0; daysBack--){
		let dayScore = await LogDayScore(GetDaysBack(i))
		if(dayScore >= SCORE_THRESHOLD){
			streak++
		} else {
			streak = 0
		}
	}
	console.log("currrent strak is:\t" + streak)
	return streak
}


/**
 * Gets the current streak with callback
 * @returns  streak
 */
export async function LogGetStreakCallback(callback){
	let streak =0
	let n = await LogLatest()
	let o = await LogAt(1)
	// console.log(o["DateDone"])

	let daysBack = calculateDaysBetweenDates(n["DateDone"], o["DateDone"])
	for(let i = daysBack; daysBack > 0; daysBack--){
		let dayScore = await LogDayScore(GetDaysBack(i))
		if(dayScore >= SCORE_THRESHOLD){
			streak++
		} else {
			streak = 0
		}
	}
	console.log("currrent strak is:\t" + streak)
    if(callback){
        callback(streak)
    }
}

/**
 * Sets the lastest item in logs to done,, and logs its date
 * @param {int} TimeDone 
 */
export async function LogFinishLatest(TimeDone) {
	const sqlCmd = `UPDATE Logger SET IsDone = True, DateDone = ?, TimeDone = ?   WHERE [Index] = (SELECT MAX([Index]) FROM Logger)`
	await new Promise((resolve, reject) => {
		DB.transaction(tx => {
		  tx.executeSql(
			sqlCmd,
			[GetDay(), TimeDone],
			(_, { rows }) => {
				resolve(rows > 0);
			},
			(_, error) => {
				console.log('Error\LogFinishLatest:\t', error);
				reject(error);
			}
		  );
		});
	});
}


/**
 * sets the latest log's difficulty
 * @param {int} difficulty 
 */
export async function LogSetLatestDifficulty(difficulty) {
	const sqlCmd = `UPDATE Logger SET Difficulty = ?   WHERE [Index] = (SELECT MAX([Index]) FROM Logger)`
	await new Promise((resolve, reject) => {
		DB.transaction(tx => {
		  tx.executeSql(
			sqlCmd,
			[difficulty],
			(_, { rows }) => {
				resolve(rows > 0);
			},
			(_, error) => {
				console.log('Error\LogSetLatestDifficulty:\t', error);
				reject(error);
			}
		  );
		});
	});
}


/**
 * creates a new log with the exercise name
 * @param {string} exName the exercise name
 */
export function LogData(exName) {
    const sqlCmd = `INSERT into Logger (IsDone, DateDone, Difficulty, TimeDone, TypeInfo) VALUES (?, ?, ?, ?, ?)`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [false, ToTimeCode(), -1, 0, exName],
            (_tx, result) => {
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


/**
 * 
 * @param {*} inArr [Difficulty, time done, typeinfo]
 * @param {bool} done Is it done?
 * @param {int} daWen dateCode finished
 */
function LogDataTest(inArr, done, daWen) {
    const sqlCmd = `INSERT into Logger (IsDone, DateDone, Difficulty, TimeDone, TypeInfo) VALUES (?, ?, ?, ?, ?)`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [done, daWen, inArr[0], inArr[1], inArr[2]],
            (_tx, result) => {
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


/**
 * Makes test log data
 */
export function TestLogData() {
    LogClear()
    const myArray = ['UpperTest', 'Lower_test', 'Coustom test', 'Office brake'];
    for (let i = 0; i < 7; i++) { // makes the week
        let dayLoad = Math.floor(Math.random() * 5) // 5 entities max per a day
        for (let v = 0; v < dayLoad; v++) { // makes the day
            const randNum = Math.floor(Math.random() * myArray.length);
            const randEx = myArray[randNum];
            let ArrT = [1, 5]
            ArrT.push(randEx)
            // console.log(ArrT, true, GetDaysBack(i))
            LogDataTest(ArrT, true, GetDaysBack(i))
        }
    }
}


/**
 * Tesing intialy, (ignore this)
 * @param {int} numbers 
 */
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
            (_, {
                rows
            }) => {
                // Access the retrieved rows here
                //   console.log(rows)
				// console.log(rows)
                const data = rows._array;
                console.log(data); // or do something else with the data
            },
            (error) => {
                console.log('Error executing SQL: ', error);
            }
        );
    });
}