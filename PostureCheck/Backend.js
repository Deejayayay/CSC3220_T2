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

export async function deleteTable(tableName) {
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


function makeTable(str) {
    DB.transaction((tx) => {
        tx.executeSql(
            str
        );
    });
}

// makeSQLiteDirAsync()
export function loader() {
    makeTable(LOGGER_STR)
    makeTable(TYPE_STORE_STR)
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
 * ONLY USE FOR TESTING, IT DELETES ALL TABLES
 */
export function NukeAll() {
	console.warn("Deleted all tables from database")
    deleteTable("TypeStore")
    deleteTable("Logger")

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

/**
 * get the  dateCode for x days back
 * @param {*} howBack number of days back
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

export function ClearEx() {
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
export async function GetExNames() {
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


export async function GetEx(name) {
    let rtnArr = [name, "NA", "|Main|Default|", 5];
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


/**
 * Inset to the exersize array from input
 * @param {*} inArr (name, catigory, instructions, estimated lenght, weighting)
 */
export function AddEx(inArr) {
    // let addon = `VALUES(`
    // addon = addon + inArr[0] + "," + inArr[1] + "," + inArr[2] + "," + inArr[3] + "," + inArr[4] + `)`
    // console.log("calling")
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
 * Makes a of exersizes
 */
export function MakeTestEx() {
    let e0 = ['UpperTest', 'Upper', '"|Main|Upper Test|Text|Somethings|"', 75, 2, ]
    let e1 = ['Lower_test', 'Lower', '"|Main|Lower Test|Text|Somethings|"', 60, 1]
    let e2 = ['Coustom test', 'NA', '"|Main|Coustom Test|Text|Somethings|"', 30, 0.5]
    let e3 = ['Office brake', 'Na', '"|Main|Office brake|Text|Somethings|"', 20, 1]
    AddEx(e0)
    AddEx(e1)
    AddEx(e2)
    AddEx(e3)
}



export function ClearLogs() {
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
export function LogsPrintAll() {
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
export async function LogsFromDay(dateCode) {
    // console.log("GetLogsFromDay------------------------------------------------------")
    let rtnArr = [];
    const sqlCmd = `SELECT * FROM Logger WHERE DateDone = ?`;
    await new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql(
                sqlCmd,
                [dateCode],
                (_, {
                    rows
                }) => {
                    console.log(rows._array);
                    rtnArr.push(rows.item(0));
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
 * the  latest log
 * @returns 
 */
export async function LogsLatest() {
    let rtnArr = []
	const sqlCmd = `SELECT * FROM Logger WHERE [Index] = (SELECT MAX([Index]) FROM Logger)`
	// const sqlCmd = `SELECT MAX([Index]) as latestIndex FROM Logger;`;
	await new Promise((resolve, reject) => {
		DB.transaction(tx => {
		  tx.executeSql(
			sqlCmd,
			[],
			(_, { rows }) => {
				console.log(rows.item(0))
				rtnArr = rows.item(0)
			},
			(_, error) => {
				console.log('Error\LogsLatest:\t', error);
				reject(error);
			}
		  );
		});
	  });
    return rtnArr
}




/**
 *  Finishes the latest log
 * @param {*} endT end of the exercise (negative is to remove it)
 */
export function LogFinishLatest() {

}


/**
 *  Sets the last exercise
 * @param {*} endT end of the exercise (negative is to remove it)
 */
export function LogSetLatestDifficulty(endT) {

}


/**
 * 
 * @param {*} inArr [Difficulty, time done, typeinfo]
 * @param {*} done is finished
 */
export function LogData(inArr, done) {
    const sqlCmd = `INSERT into Logger (IsDone, DateDone, Difficulty, TimeDone, TypeInfo) VALUES (?, ?, ?, ?, ?)`
    DB.transaction((tx) => {
        tx.executeSql(
            sqlCmd,
            [done, ToTimeCode(), inArr[0], inArr[1], inArr[2]],
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


export function TestLogData() {
    ClearLogs()
    const myArray = ['UpperTest', 'Lower_test', 'Coustom test', 'Office brake'];
    for (let i = 0; j = 7, i < j; i++) { // makes the week
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
                const data = rows._array;
                console.log(data); // or do something else with the data
            },
            (error) => {
                console.log('Error executing SQL: ', error);
            }
        );
    });
}