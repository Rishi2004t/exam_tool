export const sqlQuestions = [
  // --- SET 1: HARD / INTERVIEW LEVEL (20 QUESTIONS) ---
  // 1-10 Theory-based
  {
    id: 1,
    text: "In the standard SQL execution order, which of the following is the correct sequence of evaluation?",
    options: [
      "SELECT → FROM → WHERE → GROUP BY → HAVING",
      "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
      "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY",
      "SELECT → WHERE → FROM → GROUP BY → HAVING → LIMIT"
    ],
    answer: 1,
    explanation: "SQL queries follow a specific logical processing order: 1. FROM (and JOINs), 2. WHERE, 3. GROUP BY, 4. HAVING, 5. SELECT (including Window Functions), 6. DISTINCT, 7. ORDER BY, 8. LIMIT. Knowing this is crucial for understanding why aliases defined in SELECT cannot be used in WHERE."
  },
  {
    id: 2,
    text: "What is the primary difference between a correlated subquery and a non-correlated subquery regarding performance?",
    options: [
      "Correlated subqueries are always faster because they use indices.",
      "Non-correlated subqueries are executed once for each row of the outer query.",
      "Correlated subqueries are executed once for every row processed by the outer query, potentially leading to O(N*M) complexity.",
      "There is no performance difference; the query optimizer treats them identically."
    ],
    answer: 2,
    explanation: "A correlated subquery references columns from the outer query. This means it must be re-evaluated for every candidate row in the outer query, which can be very slow compared to a non-correlated subquery that is executed once and its result cached."
  },
  {
    id: 3,
    text: "Consider a LEFT JOIN between Table A and Table B. If you move a filter condition on Table B from the ON clause to the WHERE clause, what happens?",
    options: [
      "The result remains identical; the optimizer handles it.",
      "The query effectively becomes an INNER JOIN because rows where Table B has no match (NULL) will be filtered out by the WHERE condition.",
      "The query returns more rows because the WHERE clause is broader.",
      "The query will return an error if Table B columns are used in WHERE."
    ],
    answer: 1,
    explanation: "This is a classic 'Logic Trap'. In a LEFT JOIN, conditions in the 'ON' clause determine what to join. Conditions in 'WHERE' are applied AFTER the join. If you filter Table B in WHERE (e.g., B.status = 'active'), any row where Table B was NULL (because no match was found) will fail the check, effectively turning the LEFT JOIN into an INNER JOIN."
  },
  {
    id: 4,
    text: "Which of the following statements about NULL handling in SQL is TRUE?",
    options: [
      "NULL = NULL returns True.",
      "NOT (NULL) returns True.",
      "NULL + 5 returns 5.",
      "The result of any comparison with NULL (like =, <, >) is UNKNOWN (effectively False in a WHERE clause)."
    ],
    answer: 3,
    explanation: "SQL uses Three-Valued Logic: True, False, and Unknown. NULL represents a missing/unknown value. Comparing NULL using standard operators (=, <>) results in Unknown. To check for NULL, you MUST use 'IS NULL' or 'IS NOT NULL'."
  },
  {
    id: 5,
    text: "When using RANK() and DENSE_RANK() on a dataset with duplicate values (e.g., scores: 10, 10, 8), what is the correct outcome for the third value?",
    options: [
      "RANK: 1, 1, 2; DENSE_RANK: 1, 1, 3",
      "RANK: 1, 1, 3; DENSE_RANK: 1, 1, 2",
      "Both will return 1, 1, 2.",
      "RANK: 1, 2, 3; DENSE_RANK: 1, 1, 2"
    ],
    answer: 1,
    explanation: "RANK() leaves gaps in the sequence if there are ties (1, 1, 3). DENSE_RANK() does not leave gaps (1, 1, 2). This is a common interview question regarding window functions."
  },
  {
    id: 6,
    text: "What does the 'EXISTS' operator do that 'IN' might struggle with when dealing with NULLs in the subquery?",
    options: [
      "EXISTS returns True if the subquery returns NULL.",
      "IN returns False if the subquery contains a NULL value and no match is found, whereas EXISTS is unaffected by NULLs in the result set.",
      "EXISTS is slower than IN for large datasets.",
      "There is no difference in behavior regarding NULLs."
    ],
    answer: 1,
    explanation: "If a subquery returns any NULLs, 'NOT IN' will return no rows because the comparison 'value <> NULL' is always Unknown. 'NOT EXISTS', however, handles this correctly as it only checks for the existence of rows meeting the criteria, regardless of NULLs in other columns."
  },
  {
    id: 7,
    text: "In a GROUP BY query, what is the 'Hidden Column' trap (mostly relevant in older MySQL versions or non-strict modes)?",
    options: [
      "Including columns in SELECT that are neither aggregated nor part of GROUP BY.",
      "Using an alias in the HAVING clause.",
      "Using a subquery inside the GROUP BY clause.",
      "Grouping by a column that has all NULL values."
    ],
    answer: 0,
    explanation: "Standard SQL requires that every column in the SELECT list (that isn't an aggregate) must appear in the GROUP BY clause. Failing to do so results in indeterminate values for those 'hidden' columns, as the engine doesn't know which row's value to pick for the group."
  },
  {
    id: 8,
    text: "Which Window Function would you use to find the value from the previous row in a specific order?",
    options: [
      "LEAD()",
      "LAG()",
      "FIRST_VALUE()",
      "PREV_VAL()"
    ],
    answer: 1,
    explanation: "LAG() provides access to a row at a given physical offset that comes BEFORE the current row. LEAD() provides access to a row AFTER the current row."
  },
  {
    id: 9,
    text: "What is the purpose of a Recursive CTE (Common Table Expression)?",
    options: [
      "To perform calculations faster than a standard JOIN.",
      "To query hierarchical data (like organizational charts or bill of materials).",
      "To loop through a result set and update rows one by one.",
      "To create a temporary table that persists for the session."
    ],
    answer: 1,
    explanation: "Recursive CTEs allow a query to reference itself. This is the standard way in SQL to traverse tree-like or graph structures, which is otherwise very difficult with standard JOINs."
  },
  {
    id: 10,
    text: "How does 'HAVING COUNT(*) > 1' differ from 'WHERE COUNT(*) > 1'?",
    options: [
      "They are identical in performance.",
      "WHERE filters before grouping; HAVING filters after grouping. Aggregates like COUNT(*) cannot be used in WHERE.",
      "HAVING is only for strings, WHERE is for numbers.",
      "WHERE is faster because it uses indices."
    ],
    answer: 1,
    explanation: "Aggregates cannot appear in the WHERE clause because WHERE evaluates rows BEFORE they are grouped. HAVING is designed specifically to filter groups after the GROUP BY phase."
  },
  // 11-20 Code-based
  {
    id: 11,
    text: "Query: SELECT COUNT(*) FROM Employees WHERE Salary > ANY (SELECT Salary FROM Managers); What does this return?",
    options: [
      "Employees who earn more than every manager.",
      "Employees who earn more than at least one manager.",
      "The total number of employees and managers.",
      "An error because ANY is not a valid SQL keyword."
    ],
    answer: 1,
    explanation: "The 'ANY' operator (synonymous with SOME) returns True if the comparison is true for AT LEAST ONE value in the set. To find employees who earn more than ALL managers, you would use '> ALL'."
  },
  {
    id: 12,
    text: "Query: SELECT Name, RANK() OVER(PARTITION BY DeptID ORDER BY Salary DESC) as rnk FROM Employees; If two employees in Dept 1 have the same highest salary, what is their 'rnk'?",
    options: [
      "1 and 2",
      "1 and 1",
      "0 and 1",
      "Indeterminate"
    ],
    answer: 1,
    explanation: "Window functions with PARTITION BY group rows into buckets. Within each bucket, the ORDER BY determines the rank. Ties in RANK() result in the same value (1 and 1)."
  },
  {
    id: 13,
    text: "Query: SELECT * FROM TableA A WHERE NOT EXISTS (SELECT 1 FROM TableB B WHERE B.ID = A.ID); This is logically equivalent to which join?",
    options: [
      "INNER JOIN",
      "LEFT JOIN where B.ID IS NULL",
      "RIGHT JOIN",
      "CROSS JOIN"
    ],
    answer: 1,
    explanation: "A 'NOT EXISTS' subquery is a standard way to perform an 'Anti-Join'—finding rows in Table A that have no match in Table B. This is logically identical to a LEFT JOIN where the right side returns NULL."
  },
  {
    id: 14,
    text: "What is the output of: SELECT COALESCE(NULL, NULL, 'Target', 'Backup');",
    options: [
      "NULL",
      "Error",
      "Target",
      "Backup"
    ],
    answer: 2,
    explanation: "COALESCE returns the FIRST non-NULL value in its argument list. Here, it skips the first two NULLs and returns 'Target'."
  },
  {
    id: 15,
    text: "Query: SELECT DeptID, SUM(Salary) FROM Employees GROUP BY DeptID HAVING DeptID > 5; Is this query valid?",
    options: [
      "Yes, but it is inefficient compared to using WHERE.",
      "No, HAVING can only contain aggregates.",
      "No, DeptID must be in the SELECT list.",
      "Yes, and it is the most efficient way to filter."
    ],
    answer: 0,
    explanation: "While valid, filtering on a non-aggregated column (DeptID) should ideally be done in WHERE. Filtering in HAVING happens after the grouping process, which is less efficient because the engine groups rows that it will eventually discard."
  },
  {
    id: 16,
    text: "What happens if you execute: SELECT 1/0;",
    options: [
      "Returns NULL",
      "Returns 0",
      "Returns Infinity",
      "Throws a 'Division by zero' error (standard behavior)"
    ],
    answer: 3,
    explanation: "Standard SQL behavior is to throw an error on division by zero. Some databases (like MySQL) might return NULL, but for 'Hard/FAANG' level questions, assume standard SQL compliance where it causes a runtime error."
  },
  {
    id: 17,
    text: "In a transaction with SERIALIZABLE isolation level, what is prevented?",
    options: [
      "Dirty Reads only",
      "Dirty Reads and Non-repeatable Reads only",
      "Dirty Reads, Non-repeatable Reads, and Phantom Reads",
      "Nothing, it is the lowest isolation level."
    ],
    answer: 2,
    explanation: "SERIALIZABLE is the highest isolation level. It ensures that the result of concurrent transactions is the same as if they were executed one after another, preventing all three major read phenomena."
  },
  {
    id: 18,
    text: "Query: SELECT * FROM Employees WHERE Name LIKE '_a%'; Which names will be matched?",
    options: [
      "Names starting with 'a'",
      "Names containing 'a'",
      "Names where the second letter is 'a'",
      "Names ending with 'a'"
    ],
    answer: 2,
    explanation: "The underscore (_) is a wildcard for a SINGLE character. The percent sign (%) is a wildcard for zero or more characters. Thus, '_a%' matches any string where 'a' is the second character."
  },
  {
    id: 19,
    text: "Which query correctly finds the top 3 highest paid employees?",
    options: [
      "SELECT * FROM Employees ORDER BY Salary DESC LIMIT 3",
      "SELECT * FROM Employees WHERE Salary IN (SELECT TOP 3 Salary FROM Employees)",
      "SELECT * FROM (SELECT *, RANK() OVER(ORDER BY Salary DESC) as r FROM Employees) WHERE r <= 3",
      "Both A and C (depending on tie-handling preference)"
    ],
    answer: 3,
    explanation: "LIMIT 3 (MySQL/PostgreSQL) is a direct way, but RANK() is often preferred in interviews because it handles ties (if 5 people have the same top salary, you might want all of them or just 3)."
  },
  {
    id: 20,
    text: "What does UNION ALL do differently than UNION?",
    options: [
      "UNION ALL is faster because it doesn't remove duplicates.",
      "UNION ALL removes duplicates, UNION does not.",
      "UNION ALL can only be used on numeric columns.",
      "There is no difference; they are aliases."
    ],
    answer: 0,
    explanation: "UNION performs a DISTINCT operation on the final result set to remove duplicates, which requires an expensive sort/hash. UNION ALL simply appends the sets, making it much faster if you know there are no duplicates or don't care about them."
  },

  // --- SET 2: EXPERT LEVEL (30 QUESTIONS) ---
  {
    id: 21,
    text: "Given a table 'Logs' with 'id' and 'status', how do you find the start and end of sequences of 'Success' status (Island/Gap Problem)?",
    options: [
      "Using GROUP BY status",
      "Using a Recursive CTE",
      "Using (id - ROW_NUMBER() OVER(ORDER BY id)) to group consecutive IDs",
      "It is impossible in a single SQL query"
    ],
    answer: 2,
    explanation: "This is the classic 'Islands' problem. Subtracting a monotonic sequence (ROW_NUMBER) from the unique ID creates a constant value for consecutive records, allowing you to GROUP BY that constant to find the start/end of the 'island'."
  },
  {
    id: 22,
    text: "What is the result of 'SELECT COUNT(comm)' if the table has 10 rows and 'comm' is NULL for all rows?",
    options: ["10", "NULL", "0", "Error"],
    answer: 2,
    explanation: "Aggregate functions like COUNT(column), SUM, AVG skip NULL values. Since all values are NULL, the count is 0. Note that COUNT(*) counts rows regardless of NULLs."
  },
  {
    id: 23,
    text: "In a B-Tree index, which operation is least efficient?",
    options: [
      "Exact match (WHERE ID = 5)",
      "Range scan (WHERE ID BETWEEN 10 AND 20)",
      "Leading wildcard search (WHERE Name LIKE '%John')",
      "Order by on the indexed column"
    ],
    answer: 2,
    explanation: "B-Tree indices are ordered. A leading wildcard (%John) prevents the engine from using the index tree to narrow down the search, forcing a full index or table scan."
  },
  {
    id: 24,
    text: "Which join type is used to find 'Rows in A not in B' AND 'Rows in B not in A' simultaneously?",
    options: [
      "LEFT JOIN",
      "INNER JOIN",
      "FULL OUTER JOIN where A.key IS NULL OR B.key IS NULL",
      "CROSS JOIN"
    ],
    answer: 2,
    explanation: "A FULL OUTER JOIN returns all rows from both tables. By filtering for rows where one side's key is NULL, you get the 'Symmetric Difference'."
  },
  {
    id: 25,
    text: "What is a 'Lateral Join' (or CROSS APPLY in SQL Server)?",
    options: [
      "A join that only works on horizontal partitions.",
      "A join that allows a subquery to reference columns from preceding tables in the FROM clause.",
      "A faster version of an INNER JOIN.",
      "A join used only for JSON data."
    ],
    answer: 1,
    explanation: "Standard subqueries in FROM cannot see other tables in the same FROM clause. LATERAL joins break this restriction, acting like a 'foreach' loop for SQL."
  },
  {
    id: 26,
    text: "Query: SELECT * FROM T1 WHERE col1 NOT IN (SELECT col2 FROM T2); If T2 contains a NULL in col2, what is the result?",
    options: [
      "Rows where col1 does not match any non-NULL col2.",
      "Zero rows (Empty set).",
      "An error.",
      "All rows from T1."
    ],
    answer: 1,
    explanation: "The 'NOT IN' trap. 'x NOT IN (1, 2, NULL)' is equivalent to 'x <> 1 AND x <> 2 AND x <> NULL'. Since 'x <> NULL' is always UNKNOWN, the entire condition is never TRUE."
  },
  {
    id: 27,
    text: "How do you implement a 'Pivot' in SQL without using a built-in PIVOT function?",
    options: [
      "Using multiple LEFT JOINs",
      "Using CASE WHEN inside aggregate functions (e.g., SUM(CASE WHEN ...))",
      "Using a Recursive CTE",
      "Using the GROUP_CONCAT function"
    ],
    answer: 1,
    explanation: "The standard way to pivot is using 'Conditional Aggregation'. You create a CASE statement for each target column and wrap it in an aggregate like MAX or SUM."
  },
  {
    id: 28,
    text: "What is the 'N+1 Problem' in the context of database queries?",
    options: [
      "A query that returns N rows plus one header row.",
      "Executing one query to get N records, then executing N additional queries to get related data for each record.",
      "A performance optimization where you add one index to a table.",
      "A deadlock scenario involving N processes."
    ],
    answer: 1,
    explanation: "The N+1 problem usually occurs with ORMs. Instead of one JOIN query, the application makes 1 query for the main list and then 1 query for EACH item's details, which is extremely inefficient."
  },
  {
    id: 29,
    text: "What does 'SELECT ... FOR UPDATE' do?",
    options: [
      "Updates the records immediately.",
      "Locks the selected rows so other transactions cannot modify or lock them until the current transaction ends.",
      "Creates a backup of the rows before updating.",
      "Selects only rows that are currently being updated."
    ],
    answer: 1,
    explanation: "FOR UPDATE is used for 'Pessimistic Locking'. It ensures that once you read a row, nobody else can change it until you are done with your transaction."
  },
  {
    id: 30,
    text: "Which of the following is a 'Non-Sargable' expression?",
    options: [
      "WHERE order_date >= '2023-01-01'",
      "WHERE YEAR(order_date) = 2023",
      "WHERE customer_id = 500",
      "WHERE status IN ('Active', 'Pending')"
    ],
    answer: 1,
    explanation: "SARGable stands for 'Search ARGument Able'. Wrapping a column in a function (like YEAR(order_date)) prevents the database from using an index on that column. You should use a range: order_date >= '2023-01-01' AND order_date < '2024-01-01'."
  },
  {
    id: 31,
    text: "In Postgres, what is the 'VACUUM' command used for?",
    options: [
      "To delete all data from the database.",
      "To reclaim storage occupied by 'dead tuples' (deleted or updated rows) and update statistics.",
      "To compress the database files on disk.",
      "To clear the query cache."
    ],
    answer: 1,
    explanation: "Postgres uses MVCC. Updates/Deletes don't remove data immediately but mark it as dead. VACUUM cleans these up so the space can be reused."
  },
  {
    id: 32,
    text: "Query: SELECT AVG(val) FROM (SELECT 10 as val UNION ALL SELECT 20 UNION ALL SELECT NULL) as T; Result?",
    options: ["10", "15", "NULL", "Error"],
    answer: 1,
    explanation: "Aggregates ignore NULLs. The average is calculated as (10 + 20) / 2 = 15. If it counted NULL as 0, the result would be 10, but that is not how SQL works."
  },
  {
    id: 33,
    text: "What is the difference between a Clustered and a Non-Clustered index?",
    options: [
      "Clustered index stores the actual data rows at the leaf level; Non-Clustered stores pointers to the data.",
      "Non-Clustered is faster for range scans.",
      "You can have multiple Clustered indices on one table.",
      "Clustered indices are only for Primary Keys."
    ],
    answer: 0,
    explanation: "A table can only have one Clustered index because the data itself is physically sorted by that index. Non-clustered indices are separate structures that point back to the data."
  },
  {
    id: 34,
    text: "What is 'Predicate Pushdown' in query optimization?",
    options: [
      "Moving filter conditions as close to the data source as possible (before joins or aggregations).",
      "Pushing data from the server to the client.",
      "A technique to speed up SELECT * queries.",
      "Deleting records that don't match a predicate."
    ],
    answer: 0,
    explanation: "By 'pushing down' filters (predicates), the engine reduces the amount of data it needs to process early in the execution plan, significantly improving performance."
  },
  {
    id: 35,
    text: "Which constraint allows a column to have multiple NULL values but ensures all non-NULL values are unique?",
    options: [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    answer: 1,
    explanation: "In standard SQL, a UNIQUE constraint allows multiple NULLs (because NULL is not equal to NULL). Only the non-NULL values must be unique. (Note: SQL Server behaves differently by default)."
  },
  {
    id: 36,
    text: "What is the 'Self-Join' typically used for?",
    options: [
      "To compare rows within the same table (e.g., finding employees who earn more than their managers).",
      "To join a table with its own indices.",
      "To duplicate the data in a table.",
      "To speed up subqueries."
    ],
    answer: 0,
    explanation: "A self-join is just a regular join where the table is joined with itself. It is essential for hierarchical data or comparing records in the same category."
  },
  {
    id: 37,
    text: "Which window function would you use to divide a result set into 4 equal groups (quartiles)?",
    options: [
      "QUARTILE(4)",
      "NTILE(4)",
      "DIVIDE(4)",
      "RANK() / 4"
    ],
    answer: 1,
    explanation: "NTILE(n) divides the rows into 'n' buckets as equally as possible and assigns a bucket number to each row."
  },
  {
    id: 38,
    text: "What is the 'Phantom Read' phenomenon?",
    options: [
      "Reading data that was never committed.",
      "Reading the same row twice and getting different values.",
      "A transaction re-executing a query and finding new 'phantom' rows added by another committed transaction.",
      "A query that returns NULL when it should return data."
    ],
    answer: 2,
    explanation: "Phantom reads occur when another transaction inserts/deletes rows that fall into the range being read by the current transaction."
  },
  {
    id: 39,
    text: "How do you select the top 1 row for each group in SQL?",
    options: [
      "Using GROUP BY and MAX()",
      "Using ROW_NUMBER() OVER(PARTITION BY group_col ORDER BY sort_col) and filtering where rnk = 1",
      "Using DISTINCT ON (group_col) in Postgres",
      "Both B and C"
    ],
    answer: 3,
    explanation: "ROW_NUMBER is the standard way. Postgres also offers the convenient 'DISTINCT ON' syntax which is very efficient for this specific use case."
  },
  {
    id: 40,
    text: "In a SQL query, if you have both WHERE and HAVING, which one is executed first?",
    options: [
      "HAVING",
      "WHERE",
      "They are executed in parallel",
      "It depends on the query optimizer"
    ],
    answer: 1,
    explanation: "WHERE filters the base rows before any grouping occurs. HAVING filters the result of the aggregation."
  },
  {
    id: 41,
    text: "What is a 'Materialized View'?",
    options: [
      "A view that is saved as a virtual table.",
      "A view whose result is physically stored on disk and can be refreshed periodically.",
      "A view that can only be queried once.",
      "A view that uses only materialized data types."
    ],
    answer: 1,
    explanation: "Unlike standard views (which are just saved queries), Materialized Views store the actual result data to provide very fast access to complex calculations."
  },
  {
    id: 42,
    text: "Query: SELECT 'Result' WHERE NULL = NULL; What does this return?",
    options: [
      "Result",
      "Empty Set",
      "NULL",
      "Error"
    ],
    answer: 1,
    explanation: "Since 'NULL = NULL' is UNKNOWN (not True), the WHERE clause fails, and no rows are returned."
  },
  {
    id: 43,
    text: "Which aggregate function is not affected by NULLs?",
    options: ["SUM()", "AVG()", "COUNT(*)", "COUNT(column)"],
    answer: 2,
    explanation: "COUNT(*) counts every row in the table, including rows that are entirely NULL. All other aggregates skip NULL values."
  },
  {
    id: 44,
    text: "What is 'Normalization' intended to reduce?",
    options: [
      "Query speed",
      "Data redundancy and update anomalies",
      "The number of tables in a database",
      "Security risks"
    ],
    answer: 1,
    explanation: "Normalization organizes data to ensure each piece of info is stored only once, preventing inconsistencies when data is updated."
  },
  {
    id: 45,
    text: "What is the 'Composite Index' rule regarding column order?",
    options: [
      "The order doesn't matter.",
      "You must always use all columns of the index in the WHERE clause.",
      "The index can only be used if the leading (leftmost) column is present in the query filter.",
      "The most unique column must be last."
    ],
    answer: 2,
    explanation: "A composite index (col1, col2) can be used for (col1) or (col1, col2), but NOT for (col2) alone. This is called the 'Leftmost Prefix' rule."
  },
  {
    id: 46,
    text: "In SQL, what is the difference between TRUNCATE and DELETE?",
    options: [
      "DELETE is a DDL command; TRUNCATE is DML.",
      "TRUNCATE is faster because it doesn't log individual row deletions and resets identity seeds.",
      "DELETE can be rolled back; TRUNCATE never can (in all databases).",
      "They are exactly the same."
    ],
    answer: 1,
    explanation: "TRUNCATE is a DDL operation that deallocates data pages. It is significantly faster than DELETE (DML) for large tables but usually cannot be used with a WHERE clause."
  },
  {
    id: 47,
    text: "What does the 'CROSS JOIN' produce?",
    options: [
      "The intersection of two tables.",
      "The union of two tables.",
      "The Cartesian Product (every row from A matched with every row from B).",
      "An error if there is no common column."
    ],
    answer: 2,
    explanation: "A CROSS JOIN matches every row of the first table with every row of the second. If Table A has 10 rows and B has 10, the result has 100 rows."
  },
  {
    id: 48,
    text: "Which SQL clause is used to handle 'Top N' queries in standard SQL (SQL:2008)?",
    options: [
      "LIMIT",
      "TOP",
      "FETCH FIRST n ROWS ONLY",
      "ROWNUM"
    ],
    answer: 2,
    explanation: "While LIMIT and TOP are popular, the ANSI standard syntax is 'OFFSET x ROWS FETCH NEXT y ROWS ONLY'."
  },
  {
    id: 49,
    text: "What is a 'Correlated Subquery'?",
    options: [
      "A subquery that uses a JOIN.",
      "A subquery that can run independently of the outer query.",
      "A subquery that depends on values from the outer query for its execution.",
      "A subquery that returns multiple columns."
    ],
    answer: 2,
    explanation: "Correlated subqueries are evaluated once for each row of the outer query because they 'reach out' and use columns from the outer scope."
  },
  {
    id: 50,
    text: "Query: SELECT Name FROM Employees WHERE Salary > (SELECT Salary FROM Employees WHERE Name = 'John'); If there are two employees named 'John', what happens?",
    options: [
      "It compares against the higher salary.",
      "It compares against both salaries (OR logic).",
      "The query throws an error because the subquery returns more than one value.",
      "It returns names of everyone earning more than either John."
    ],
    answer: 2,
    explanation: "A scalar comparison (> , =) expects exactly one value. If the subquery returns multiple rows, the engine throws a 'Subquery returned more than 1 value' error. You should use '> ALL' or '> ANY' to handle multiple results."
  }
];
