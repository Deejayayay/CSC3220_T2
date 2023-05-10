--
-- File generated with SQLiteStudio v3.4.4 on Wed May 10 15:07:10 2023
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Logger
CREATE TABLE IF NOT EXISTS Logger (
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
);


-- Table: TypeStore
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
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
