export const sqlQuestions = [
  // --- THEORY MCQs (1-25) ---
  {
    id: 1,
    text: "What does SQL stand for?",
    options: ["Structured Query Language", "Strong Question Language", "Structured Question Layout", "Standard Query List"],
    answer: 0
  },
  {
    id: 2,
    text: "Which SQL statement is used to extract data from a database?",
    options: ["GET", "EXTRACT", "SELECT", "OPEN"],
    answer: 2
  },
  {
    id: 3,
    text: "Which SQL statement is used to update data in a database?",
    options: ["SAVE", "MODIFY", "UPDATE", "CHANGE"],
    answer: 2
  },
  {
    id: 4,
    text: "Which SQL statement is used to delete data from a database?",
    options: ["REMOVE", "DELETE", "COLLAPSE", "DROP"],
    answer: 1
  },
  {
    id: 5,
    text: "Which SQL statement is used to insert new data in a database?",
    options: ["ADD NEW", "INSERT INTO", "INSERT NEW", "ADD RECORD"],
    answer: 1
  },
  {
    id: 6,
    text: "With SQL, how do you select a column named 'FirstName' from a table named 'Persons'?",
    options: ["SELECT Persons.FirstName", "SELECT FirstName FROM Persons", "EXTRACT FirstName FROM Persons", "GET FirstName FROM Persons"],
    answer: 1
  },
  {
    id: 7,
    text: "With SQL, how do you select all the columns from a table named 'Persons'?",
    options: ["SELECT *.Persons", "SELECT [all] FROM Persons", "SELECT * FROM Persons", "SELECT ALL FROM Persons"],
    answer: 2
  },
  {
    id: 8,
    text: "With SQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' is 'Peter'?",
    options: ["SELECT * FROM Persons WHERE FirstName='Peter'", "SELECT [all] FROM Persons WHERE FirstName='Peter'", "SELECT * FROM Persons WHERE FirstName<>'Peter'", "SELECT [all] FROM Persons WHERE FirstName LIKE 'Peter'"],
    answer: 0
  },
  {
    id: 9,
    text: "With SQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' starts with an 'a'?",
    options: ["SELECT * FROM Persons WHERE FirstName='%a%'", "SELECT * FROM Persons WHERE FirstName='a'", "SELECT * FROM Persons WHERE FirstName LIKE 'a%'", "SELECT * FROM Persons WHERE FirstName LIKE '%a'"],
    answer: 2
  },
  {
    id: 10,
    text: "The OR operator displays a record if ANY conditions listed are true. The AND operator displays a record if ALL of the conditions listed are true.",
    options: ["False", "True"],
    answer: 1
  },
  {
    id: 11,
    text: "With SQL, how do you select all the records from a table named 'Persons' where the 'FirstName' is 'Peter' and the 'LastName' is 'Jackson'?",
    options: ["SELECT * FROM Persons WHERE FirstName='Peter' AND LastName='Jackson'", "SELECT FirstName='Peter', LastName='Jackson' FROM Persons", "SELECT * FROM Persons WHERE FirstName<>'Peter' AND LastName<>'Jackson'"],
    answer: 0
  },
  {
    id: 12,
    text: "With SQL, how do you select all the records from a table named 'Persons' where the 'LastName' is alphabetically between (and including) 'Hansen' and 'Pettersen'?",
    options: ["SELECT * FROM Persons WHERE LastName BETWEEN 'Hansen' AND 'Pettersen'", "SELECT LastName>'Hansen' AND LastName<'Pettersen' FROM Persons", "SELECT * FROM Persons WHERE LastName>'Hansen' AND LastName<'Pettersen'"],
    answer: 0
  },
  {
    id: 13,
    text: "Which SQL keyword is used to return only different values?",
    options: ["UNIQUE", "NOSAME", "DISTINCT", "COUNT"],
    answer: 2
  },
  {
    id: 14,
    text: "Which SQL keyword is used to sort the result-set?",
    options: ["SORT BY", "ORDER BY", "ORDER", "SORT"],
    answer: 1
  },
  {
    id: 15,
    text: "With SQL, how can you return all the records from a table named 'Persons' sorted descending by 'FirstName'?",
    options: ["SELECT * FROM Persons ORDER BY FirstName DESC", "SELECT * FROM Persons SORT 'FirstName' DESC", "SELECT * FROM Persons ORDER FirstName DESC", "SELECT * FROM Persons SORT BY FirstName DESC"],
    answer: 0
  },
  {
    id: 16,
    text: "With SQL, how can you insert a new record into the 'Persons' table?",
    options: ["INSERT ( 'Jimmy', 'Jackson') INTO Persons", "INSERT INTO Persons VALUES ('Jimmy', 'Jackson')", "INSERT VALUES ('Jimmy', 'Jackson') INTO Persons"],
    answer: 1
  },
  {
    id: 17,
    text: "With SQL, how can you insert 'Olsen' as the 'LastName' in the 'Persons' table?",
    options: ["INSERT INTO Persons (LastName) VALUES ('Olsen')", "INSERT ('Olsen') INTO Persons (LastName)", "INSERT INTO Persons (LastName) SELECT 'Olsen'"],
    answer: 0
  },
  {
    id: 18,
    text: "How can you change 'Hansen' into 'Nilsen' in the 'LastName' column in the Persons table?",
    options: ["UPDATE Persons SET LastName='Nilsen' WHERE LastName='Hansen'", "MODIFY Persons SET LastName='Nilsen' WHERE LastName='Hansen'", "UPDATE Persons SET LastName='Hansen' INTO LastName='Nilsen'", "MODIFY Persons SET LastName='Hansen' INTO LastName='Nilsen'"],
    answer: 0
  },
  {
    id: 19,
    text: "With SQL, how can you delete the records where the 'FirstName' is 'Peter' in the Persons Table?",
    options: ["DELETE FROM Persons WHERE FirstName = 'Peter'", "DELETE FirstName='Peter' FROM Persons", "DELETE ROW FirstName='Peter' FROM Persons"],
    answer: 0
  },
  {
    id: 20,
    text: "With SQL, how can you return the number of records in the 'Persons' table?",
    options: ["SELECT COUNT(*) FROM Persons", "SELECT COLUMNS(*) FROM Persons", "SELECT NUMBER(*) FROM Persons", "SELECT TOTAL(*) FROM Persons"],
    answer: 0
  },
  {
    id: 21,
    text: "What is the most common type of join?",
    options: ["INNER JOIN", "INSIDE JOIN", "JOINED", "FULL JOIN"],
    answer: 0
  },
  {
    id: 22,
    text: "Which operator is used to select values within a range?",
    options: ["WITHIN", "BETWEEN", "RANGE", "FROM"],
    answer: 1
  },
  {
    id: 23,
    text: "The NOT NULL constraint enforces a column to NOT accept NULL values.",
    options: ["True", "False"],
    answer: 0
  },
  {
    id: 24,
    text: "Which operator is used to search for a specified pattern in a column?",
    options: ["GET", "LIKE", "SEARCH", "FROM"],
    answer: 1
  },
  {
    id: 25,
    text: "Which SQL constraint is used to uniquely identify each record in a table?",
    options: ["UNIQUE", "FOREIGN KEY", "PRIMARY KEY", "CHECK"],
    answer: 2
  },

  // --- QUERY/CODE MCQs (26-50) ---
  {
    id: 26,
    text: "Which query returns the count of employees in each department?",
    options: [
      "SELECT Department, COUNT(*) FROM Employees",
      "SELECT Department, COUNT(*) FROM Employees GROUP BY Department",
      "SELECT COUNT(*) FROM Employees GROUP BY Department",
      "SELECT DISTINCT Department, COUNT(*) FROM Employees"
    ],
    answer: 1
  },
  {
    id: 27,
    text: "What is the result of 'SELECT 5 + NULL'?",
    options: ["5", "0", "NULL", "Error"],
    answer: 2
  },
  {
    id: 28,
    text: "How do you select the current date in SQL?",
    options: ["SELECT GETDATE()", "SELECT CURDATE()", "SELECT CURRENT_DATE", "All of the above (database dependent)"],
    answer: 3
  },
  {
    id: 29,
    text: "Which query deletes all data from a table without removing the structure?",
    options: ["DELETE FROM table_name", "TRUNCATE TABLE table_name", "DROP TABLE table_name", "Both A and B"],
    answer: 3
  },
  {
    id: 30,
    text: "Which join returns all rows when there is a match in one of the tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    answer: 3
  },
  {
    id: 31,
    text: "Which SQL function is used to convert a string to uppercase?",
    options: ["UPPER()", "UCASE()", "UPPERCASE()", "Both A and B"],
    answer: 3
  },
  {
    id: 32,
    text: "Which clause is used to filter the results of a GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
    answer: 1
  },
  {
    id: 33,
    text: "Which query finds the maximum salary in the 'Employees' table?",
    options: ["SELECT MAX(Salary) FROM Employees", "SELECT TOP 1 Salary FROM Employees ORDER BY Salary DESC", "SELECT Salary FROM Employees WHERE Salary = MAX(Salary)", "Both A and B"],
    answer: 3
  },
  {
    id: 34,
    text: "What does the following query do? 'SELECT * FROM Products WHERE Price > (SELECT AVG(Price) FROM Products)'",
    options: [
      "Selects products with price higher than the average price",
      "Selects the average price of products",
      "Selects products with the highest price",
      "This query is invalid"
    ],
    answer: 0
  },
  {
    id: 35,
    text: "Which SQL command is used to add a new column to an existing table?",
    options: ["UPDATE TABLE", "ALTER TABLE", "MODIFY TABLE", "ADD COLUMN"],
    answer: 1
  },
  {
    id: 36,
    text: "What is the correct syntax to create a view?",
    options: [
      "CREATE VIEW view_name AS SELECT statement",
      "CREATE VIEW view_name FROM SELECT statement",
      "MAKE VIEW view_name AS SELECT statement",
      "NEW VIEW view_name FROM SELECT statement"
    ],
    answer: 0
  },
  {
    id: 37,
    text: "Which query selects the first 5 records from the 'Customers' table in MySQL?",
    options: [
      "SELECT TOP 5 * FROM Customers",
      "SELECT * FROM Customers LIMIT 5",
      "SELECT * FROM Customers WHERE ROWNUM <= 5",
      "SELECT FIRST 5 * FROM Customers"
    ],
    answer: 1
  },
  {
    id: 38,
    text: "Which function is used to return the smallest value in a column?",
    options: ["MIN()", "SMALL()", "LEAST()", "LOW()"],
    answer: 0
  },
  {
    id: 39,
    text: "What is the purpose of the 'AS' keyword?",
    options: [
      "To join two tables",
      "To create an alias for a column or table",
      "To sort the results",
      "To filter null values"
    ],
    answer: 1
  },
  {
    id: 40,
    text: "Which SQL keyword is used to combine the result-set of two or more SELECT statements?",
    options: ["JOIN", "UNION", "MERGE", "COMBINE"],
    answer: 1
  },
  {
    id: 41,
    text: "Which query finds the second highest salary?",
    options: [
      "SELECT MAX(Salary) FROM Employees WHERE Salary < (SELECT MAX(Salary) FROM Employees)",
      "SELECT Salary FROM Employees ORDER BY Salary DESC LIMIT 1,1",
      "SELECT TOP 1 Salary FROM (SELECT TOP 2 Salary FROM Employees ORDER BY Salary DESC) AS T ORDER BY Salary ASC",
      "All of the above (database dependent)"
    ],
    answer: 3
  },
  {
    id: 42,
    text: "Which SQL command is used to save changes in a transaction?",
    options: ["SAVE", "COMMIT", "ROLLBACK", "FINISH"],
    answer: 1
  },
  {
    id: 43,
    text: "What is the result of 'SELECT COUNT(*)' on a table with 0 rows?",
    options: ["NULL", "Error", "0", "None"],
    answer: 2
  },
  {
    id: 44,
    text: "Which query finds employees whose name contains 'an'?",
    options: [
      "SELECT * FROM Employees WHERE Name LIKE '%an%'",
      "SELECT * FROM Employees WHERE Name CONTAINS 'an'",
      "SELECT * FROM Employees WHERE Name IN ('an')",
      "SELECT * FROM Employees WHERE Name = '*an*'"
    ],
    answer: 0
  },
  {
    id: 45,
    text: "Which operator is used to combine multiple values in a WHERE clause?",
    options: ["BETWEEN", "IN", "EXISTS", "ANY"],
    answer: 1
  },
  {
    id: 46,
    text: "Which function is used to remove leading and trailing spaces from a string?",
    options: ["TRIM()", "STRIP()", "CLEAN()", "REMOVE()"],
    answer: 0
  },
  {
    id: 47,
    text: "How do you add a PRIMARY KEY to an existing table 'Users' on column 'ID'?",
    options: [
      "ALTER TABLE Users ADD PRIMARY KEY (ID)",
      "UPDATE TABLE Users SET PRIMARY KEY (ID)",
      "MODIFY TABLE Users ADD PRIMARY KEY (ID)",
      "ALTER TABLE Users SET PRIMARY KEY (ID)"
    ],
    answer: 0
  },
  {
    id: 48,
    text: "Which query returns the unique departments from the 'Employees' table?",
    options: [
      "SELECT UNIQUE Department FROM Employees",
      "SELECT DISTINCT Department FROM Employees",
      "SELECT DIFFERENT Department FROM Employees",
      "SELECT SINGLE Department FROM Employees"
    ],
    answer: 1
  },
  {
    id: 49,
    text: "What does 'EXISTS' operator do?",
    options: [
      "Checks if a table exists",
      "Checks for the existence of any record in a subquery",
      "Checks if a column is not null",
      "Checks if a database is online"
    ],
    answer: 1
  },
  {
    id: 50,
    text: "Which SQL keyword is used to provide a default value for a column?",
    options: ["VALUE", "SET", "DEFAULT", "INITIAL"],
    answer: 2
  }
];
