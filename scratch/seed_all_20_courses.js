const coursesData = [
  // ==========================================
  // BCA COURSES (4 COURSES)
  // ==========================================
  {
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    category: "BCA",
    description: "Foundational full stack web development certification evaluating essential HTML5 structure, semantic markup, CSS3 styling, responsive layouts, and core JavaScript DOM manipulation.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "HTML5 Document Anatomy & Semantic Tags",
      "CSS3 Styling, Box Model & Flexbox",
      "JavaScript Variables, Functions & Logic",
      "Browser DOM Manipulation & Event Handling"
    ],
    questions: [
      {
        questionText: "What does HTML stand for in web development?",
        options: [{_id: "1", text: "HyperText Markup Language"}, {_id: "2", text: "HighText Machine Language"}, {_id: "3", text: "HyperTransfer Markup Language"}, {_id: "4", text: "Home Tool Markup Language"}],
        correctOptionIds: ["1"],
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for documents designed to be displayed in a web browser."
      },
      {
        questionText: "Which HTML tag is used to define the most important, largest heading?",
        options: [{_id: "1", text: "<heading>"}, {_id: "2", text: "<h6>"}, {_id: "3", text: "<h1>"}, {_id: "4", text: "<head>"}],
        correctOptionIds: ["3"],
        explanation: "<h1> defines the most important and typically largest heading in an HTML document hierarchy."
      },
      {
        questionText: "Which HTML attribute specifies an alternative text for an image if the image cannot be displayed?",
        options: [{_id: "1", text: "title"}, {_id: "2", text: "src"}, {_id: "3", text: "alt"}, {_id: "4", text: "caption"}],
        correctOptionIds: ["3"],
        explanation: "The alt attribute provides alternative text for screen readers or broken image links."
      },
      {
        questionText: "In CSS, which property is used to change the background color of an element?",
        options: [{_id: "1", text: "color"}, {_id: "2", text: "background-color"}, {_id: "3", text: "bgcolor"}, {_id: "4", text: "surface-color"}],
        correctOptionIds: ["2"],
        explanation: "background-color sets the background color of an HTML element."
      },
      {
        questionText: "What is the correct CSS syntax to select an element with id='header'?",
        options: [{_id: "1", text: ".header"}, {_id: "2", text: "#header"}, {_id: "3", text: "*header"}, {_id: "4", text: "header"}],
        correctOptionIds: ["2"],
        explanation: "In CSS, the hash symbol (#) selects elements by their ID attribute."
      },
      {
        questionText: "Which CSS box model component represents the transparent space inside the border, surrounding the content?",
        options: [{_id: "1", text: "Margin"}, {_id: "2", text: "Padding"}, {_id: "3", text: "Border"}, {_id: "4", text: "Outline"}],
        correctOptionIds: ["2"],
        explanation: "Padding is the clear space between the element content and its surrounding border."
      },
      {
        questionText: "Which keyword in JavaScript declares a block-scoped variable that can be reassigned?",
        options: [{_id: "1", text: "var"}, {_id: "2", text: "const"}, {_id: "3", text: "let"}, {_id: "4", text: "define"}],
        correctOptionIds: ["3"],
        explanation: "let declares a block-scoped variable that can be reassigned later in the program."
      },
      {
        questionText: "What will the expression `typeof [1, 2, 3]` evaluate to in standard JavaScript?",
        options: [{_id: "1", text: "\"array\""}, {_id: "2", text: "\"object\""}, {_id: "3", text: "\"list\""}, {_id: "4", text: "\"undefined\""}],
        correctOptionIds: ["2"],
        explanation: "In JavaScript, arrays are technically objects, so typeof returns 'object'. Array.isArray() is used to check for arrays."
      },
      {
        questionText: "Which method is used in modern JavaScript to attach an event listener to a DOM element?",
        options: [{_id: "1", text: "element.attach()"}, {_id: "2", text: "element.addEventListener()"}, {_id: "3", text: "element.onEvent()"}, {_id: "4", text: "element.listen()"}],
        correctOptionIds: ["2"],
        explanation: "addEventListener() registers the specified listener event on a target DOM element."
      },
      {
        questionText: "Which CSS display property turns a container into a flexible box layout?",
        options: [{_id: "1", text: "display: grid;"}, {_id: "2", text: "display: block;"}, {_id: "3", text: "display: flex;"}, {_id: "4", text: "display: inline-block;"}],
        correctOptionIds: ["3"],
        explanation: "display: flex initializes the CSS Flexbox formatting context for responsive layout distribution."
      }
    ]
  },
  {
    title: "Database Management Systems (DBMS) & SQL",
    slug: "dbms-sql-fundamentals",
    category: "BCA",
    description: "Essential principles of Relational Databases, SQL queries, ER modeling, normalization, Primary & Foreign keys, and ACID transactions.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Introduction to DBMS & Relational Architecture",
      "SQL DDL, DML, DQL Queries & Joins",
      "Normalization (1NF, 2NF, 3NF, BCNF) & Integrity Constraints",
      "ACID Properties, Transactions & Concurrency Control"
    ],
    questions: [
      {
        questionText: "What does the acronym 'DBMS' stand for in computer science?",
        options: [{_id: "1", text: "Database Management System"}, {_id: "2", text: "Data Binary Management Source"}, {_id: "3", text: "Digital Business Model System"}, {_id: "4", text: "Direct Backup Memory Storage"}],
        correctOptionIds: ["1"],
        explanation: "DBMS stands for Database Management System, software designed to store, manage, and retrieve data efficiently."
      },
      {
        questionText: "Which SQL clause is used to filter rows returned by a SELECT query?",
        options: [{_id: "1", text: "GROUP BY"}, {_id: "2", text: "ORDER BY"}, {_id: "3", text: "WHERE"}, {_id: "4", text: "HAVING"}],
        correctOptionIds: ["3"],
        explanation: "The WHERE clause filters records based on specified conditional criteria."
      },
      {
        questionText: "What type of key uniquely identifies each record in a relational database table?",
        options: [{_id: "1", text: "Foreign Key"}, {_id: "2", text: "Candidate Key"}, {_id: "3", text: "Primary Key"}, {_id: "4", text: "Composite Key"}],
        correctOptionIds: ["3"],
        explanation: "A Primary Key uniquely identifies every record in a table and cannot contain NULL values."
      },
      {
        questionText: "Which SQL command is classified under Data Definition Language (DDL)?",
        options: [{_id: "1", text: "INSERT"}, {_id: "2", text: "CREATE"}, {_id: "3", text: "UPDATE"}, {_id: "4", text: "DELETE"}],
        correctOptionIds: ["2"],
        explanation: "CREATE, ALTER, and DROP are DDL commands that define and alter database schema structures."
      },
      {
        questionText: "In relational database design, what does 'ACID' represent?",
        options: [{_id: "1", text: "Atomicity, Consistency, Isolation, Durability"}, {_id: "2", text: "Access, Control, Integrity, Data"}, {_id: "3", text: "Audit, Concurrency, Indexing, Delivery"}, {_id: "4", text: "Aggregation, Computation, Iteration, Deletion"}],
        correctOptionIds: ["1"],
        explanation: "ACID properties ensure reliable transaction processing in database management systems."
      },
      {
        questionText: "Which normal form requires eliminating partial dependency of non-prime attributes on candidate keys?",
        options: [{_id: "1", text: "First Normal Form (1NF)"}, {_id: "2", text: "Second Normal Form (2NF)"}, {_id: "3", text: "Third Normal Form (3NF)"}, {_id: "4", text: "Boyce-Codd Normal Form (BCNF)"}],
        correctOptionIds: ["2"],
        explanation: "2NF requires that the table is in 1NF and all non-key attributes are fully functionally dependent on the primary key."
      },
      {
        questionText: "Which SQL JOIN returns all records when there is a match in either the left or the right table?",
        options: [{_id: "1", text: "INNER JOIN"}, {_id: "2", text: "LEFT JOIN"}, {_id: "3", text: "RIGHT JOIN"}, {_id: "4", text: "FULL OUTER JOIN"}],
        correctOptionIds: ["4"],
        explanation: "FULL OUTER JOIN returns all rows from both tables, with NULL in columns where matching rows do not exist."
      },
      {
        questionText: "What is a Foreign Key in a relational schema?",
        options: [{_id: "1", text: "A key used to encrypt passwords"}, {_id: "2", text: "A field that links to the primary key of another table"}, {_id: "3", text: "A key that must contain null values"}, {_id: "4", text: "A temporary session identifier"}],
        correctOptionIds: ["2"],
        explanation: "A Foreign Key establishes a referential link between columns across two relational tables."
      },
      {
        questionText: "Which SQL aggregate function computes the total arithmetic sum of a numeric column?",
        options: [{_id: "1", text: "TOTAL()"}, {_id: "2", text: "SUM()"}, {_id: "3", text: "COUNT()"}, {_id: "4", text: "ADD()"}],
        correctOptionIds: ["2"],
        explanation: "SUM() calculates the total sum of numeric values in a table column."
      },
      {
        questionText: "What type of database structure is utilized by MongoDB?",
        options: [{_id: "1", text: "Relational Tables"}, {_id: "2", text: "Document-oriented (BSON/JSON)"}, {_id: "3", text: "Graph-only Triples"}, {_id: "4", text: "Flat text CSV file"}],
        correctOptionIds: ["2"],
        explanation: "MongoDB is a NoSQL document database that stores records as flexible, JSON-like BSON documents."
      }
    ]
  },
  {
    title: "Core Java Programming & OOP Concepts",
    slug: "core-java-programming",
    category: "BCA",
    description: "Foundational Java programming covering JVM architecture, Object-Oriented Programming (OOP), Inheritance, Polymorphism, Collections, and Exception Handling.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "JVM Architecture & Bytecode Execution",
      "Object-Oriented Programming: Classes, Objects & Inheritance",
      "Polymorphism, Interfaces & Abstract Classes",
      "Exception Handling & Java Collections Framework"
    ],
    questions: [
      {
        questionText: "Which component of the Java platform executes compiled bytecode (.class files)?",
        options: [{_id: "1", text: "JDK"}, {_id: "2", text: "JVM (Java Virtual Machine)"}, {_id: "3", text: "JRE compiler"}, {_id: "4", text: "JDB debugger"}],
        correctOptionIds: ["2"],
        explanation: "The Java Virtual Machine (JVM) executes compiled Java bytecode on target operating systems."
      },
      {
        questionText: "Which OOP concept allows a child class to inherit attributes and methods from a parent class?",
        options: [{_id: "1", text: "Encapsulation"}, {_id: "2", text: "Inheritance"}, {_id: "3", text: "Polymorphism"}, {_id: "4", text: "Abstraction"}],
        correctOptionIds: ["2"],
        explanation: "Inheritance allows a subclass to acquire properties and behaviors from a superclass using the 'extends' keyword."
      },
      {
        questionText: "What is the size of the primitive 'int' data type in Java?",
        options: [{_id: "1", text: "16 bits (2 bytes)"}, {_id: "2", text: "32 bits (4 bytes)"}, {_id: "3", text: "64 bits (8 bytes)"}, {_id: "4", text: "8 bits (1 byte)"}],
        correctOptionIds: ["2"],
        explanation: "In Java, an int is a 32-bit signed two's complement integer (4 bytes)."
      },
      {
        questionText: "Which keyword is used in Java to prevent a class from being subclassed?",
        options: [{_id: "1", text: "static"}, {_id: "2", text: "abstract"}, {_id: "3", text: "final"}, {_id: "4", text: "protected"}],
        correctOptionIds: ["3"],
        explanation: "A final class cannot be extended by any other subclass in Java."
      },
      {
        questionText: "What is the root superclass of all classes in the Java class hierarchy?",
        options: [{_id: "1", text: "java.lang.System"}, {_id: "2", text: "java.lang.Object"}, {_id: "3", text: "java.lang.Class"}, {_id: "4", text: "java.lang.Base"}],
        correctOptionIds: ["2"],
        explanation: "Every class in Java directly or indirectly inherits from java.lang.Object."
      },
      {
        questionText: "Which block in Java exception handling is guaranteed to execute regardless of whether an exception was thrown?",
        options: [{_id: "1", text: "try"}, {_id: "2", text: "catch"}, {_id: "3", text: "finally"}, {_id: "4", text: "throw"}],
        correctOptionIds: ["3"],
        explanation: "The finally block always runs after try-catch completion, commonly used for resource cleanup."
      },
      {
        questionText: "Which Java collection interface forbids duplicate elements?",
        options: [{_id: "1", text: "List"}, {_id: "2", text: "Set"}, {_id: "3", text: "Queue"}, {_id: "4", text: "ArrayList"}],
        correctOptionIds: ["2"],
        explanation: "The Set interface (e.g., HashSet, TreeSet) models a mathematical set containing no duplicate elements."
      },
      {
        questionText: "What is the difference between method overloading and method overriding in Java?",
        options: [{_id: "1", text: "Overloading occurs in the same class with different parameters; overriding occurs across inheritance hierarchies"}, {_id: "2", text: "Overloading requires the abstract keyword"}, {_id: "3", text: "Overriding occurs only in static methods"}, {_id: "4", text: "There is no difference in Java"}],
        correctOptionIds: ["1"],
        explanation: "Overloading defines methods with identical names but different signatures in the same class; overriding redefines a parent method in a subclass."
      },
      {
        questionText: "Which keyword creates an instance of a class in Java?",
        options: [{_id: "1", text: "create"}, {_id: "2", text: "instantiate"}, {_id: "3", text: "new"}, {_id: "4", text: "malloc"}],
        correctOptionIds: ["3"],
        explanation: "The 'new' keyword allocates heap memory and calls the class constructor to initialize the object."
      },
      {
        questionText: "What is the default value of a boolean instance variable in Java?",
        options: [{_id: "1", text: "true"}, {_id: "2", text: "false"}, {_id: "3", text: "null"}, {_id: "4", text: "0"}],
        correctOptionIds: ["2"],
        explanation: "Uninitialized primitive boolean instance variables default to false in Java."
      }
    ]
  },
  {
    title: "C Programming & Problem Solving",
    slug: "c-programming-fundamentals",
    category: "BCA",
    description: "Core procedural programming in C covering syntax, data types, control structures, functions, arrays, pointers, dynamic memory allocation, and file handling.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "C Language Fundamentals, Data Types & Operators",
      "Control Structures: Conditionals, Loops & Functions",
      "Pointers, Memory Addresses & Pointer Arithmetic",
      "Arrays, Strings & Dynamic Memory Allocation (malloc, free)"
    ],
    questions: [
      {
        questionText: "Who is credited with creating the C programming language?",
        options: [{_id: "1", text: "Bjarne Stroustrup"}, {_id: "2", text: "Dennis Ritchie"}, {_id: "3", text: "James Gosling"}, {_id: "4", text: "Guido van Rossum"}],
        correctOptionIds: ["2"],
        explanation: "Dennis Ritchie developed the C programming language in the early 1970s at Bell Labs."
      },
      {
        questionText: "Which operator in C returns the memory address of a variable?",
        options: [{_id: "1", text: "* (Dereference)"}, {_id: "2", text: "& (Address-of)"}, {_id: "3", text: "-> (Arrow)"}, {_id: "4", text: ". (Dot)"}],
        correctOptionIds: ["2"],
        explanation: "The ampersand (&) operator yields the memory address of its operand variable."
      },
      {
        questionText: "What is the format specifier used in printf() to output an integer value in C?",
        options: [{_id: "1", text: "%f"}, {_id: "2", text: "%c"}, {_id: "3", text: "%d"}, {_id: "4", text: "%s"}],
        correctOptionIds: ["3"],
        explanation: "%d (or %i) format specifier formats signed decimal integers for output."
      },
      {
        questionText: "What character signifies the termination of a string literal in C?",
        options: [{_id: "1", text: "'\\n'"}, {_id: "2", text: "'\\0' (Null character)"}, {_id: "3", text: "'\\t'"}, {_id: "4", text: "';'"}],
        correctOptionIds: ["2"],
        explanation: "Strings in C are character arrays terminated with a null terminator character ('\\0')."
      },
      {
        questionText: "Which standard header file contains declarations for malloc() and free()?",
        options: [{_id: "1", text: "<stdio.h>"}, {_id: "2", text: "<stdlib.h>"}, {_id: "3", text: "<string.h>"}, {_id: "4", text: "<math.h>"}],
        correctOptionIds: ["2"],
        explanation: "<stdlib.h> provides memory allocation functions including malloc(), calloc(), realloc(), and free()."
      },
      {
        questionText: "What happens when an array index goes out of bounds in standard C?",
        options: [{_id: "1", text: "ArrayIndexOutOfBoundsException is thrown"}, {_id: "2", text: "Undefined behavior (possible memory corruption or crash)"}, {_id: "3", text: "Array automatically expands its size"}, {_id: "4", text: "Compiler replaces it with NULL"}],
        correctOptionIds: ["2"],
        explanation: "C does not perform array boundary checks at runtime; indexing past limits leads to undefined behavior."
      },
      {
        questionText: "What is the size of a pointer variable on a modern 64-bit operating system architecture?",
        options: [{_id: "1", text: "2 bytes"}, {_id: "2", text: "4 bytes"}, {_id: "3", text: "8 bytes"}, {_id: "4", text: "16 bytes"}],
        correctOptionIds: ["3"],
        explanation: "On a 64-bit architecture, memory addresses are 64 bits wide, making pointer variables 8 bytes in size."
      },
      {
        questionText: "Which loop in C is guaranteed to execute its code block at least once?",
        options: [{_id: "1", text: "for loop"}, {_id: "2", text: "while loop"}, {_id: "3", text: "do-while loop"}, {_id: "4", text: "foreach loop"}],
        correctOptionIds: ["3"],
        explanation: "A do-while loop evaluates its exit condition at the bottom, guaranteeing at least one execution pass."
      },
      {
        questionText: "Which function must be called to release dynamically allocated memory in C?",
        options: [{_id: "1", text: "delete()"}, {_id: "2", text: "remove()"}, {_id: "3", text: "free()"}, {_id: "4", text: "clear()"}],
        correctOptionIds: ["3"],
        explanation: "free() releases heap memory previously allocated by malloc() or calloc(), preventing memory leaks."
      },
      {
        questionText: "What is the standard return type of the main() function in ANSI C?",
        options: [{_id: "1", text: "void"}, {_id: "2", text: "int"}, {_id: "3", text: "char"}, {_id: "4", text: "float"}],
        correctOptionIds: ["2"],
        explanation: "In standard C, main() returns an int representing the program's exit status code to the operating system."
      }
    ]
  },

  // ==========================================
  // B.TECH COURSES (4 COURSES)
  // ==========================================
  {
    title: "Cyber Job Simulation: Enterprise Threat Defense & Incident Response",
    slug: "cyber-job-simulation-threat-defense",
    category: "B.Tech",
    description: "Rigorous enterprise cybersecurity job simulation covering SOC Tier 1/2 alert triage, SIEM threat hunting, packet forensics, malware containment, and Zero Trust access architecture.",
    durationMinutes: 20,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "SOC Incident Response Lifecycle & Triaging",
      "SIEM Log Analysis & Threat Hunting (Splunk/ELK)",
      "Network Forensics & Packet Dissection (Wireshark)",
      "Zero Trust Architecture & Cryptographic Defenses"
    ],
    questions: [
      {
        questionText: "Which phase of the Cyber Kill Chain immediately follows Weaponization?",
        options: [{_id: "1", text: "Reconnaissance"}, {_id: "2", text: "Delivery"}, {_id: "3", text: "Exploitation"}, {_id: "4", text: "Installation"}],
        correctOptionIds: ["2"],
        explanation: "Delivery directly follows weaponization in the Lockheed Martin Cyber Kill Chain."
      },
      {
        questionText: "What is the primary role of a Security Operations Center (SOC) Tier 1 Analyst?",
        options: [{_id: "1", text: "Remediate firewall firmware vulnerabilities"}, {_id: "2", text: "Triage, analyze, and escalate suspicious incoming security alerts"}, {_id: "3", text: "Perform reverse engineering on compiled kernel drivers"}, {_id: "4", text: "Draft national cybersecurity policies"}],
        correctOptionIds: ["2"],
        explanation: "Tier 1 analysts conduct primary alert triage and validate incident signals."
      },
      {
        questionText: "Which HTTP status code commonly reveals unhandled backend database errors during SQL injection testing?",
        options: [{_id: "1", text: "200 OK"}, {_id: "2", text: "302 Found"}, {_id: "3", text: "500 Internal Server Error"}, {_id: "4", text: "404 Not Found"}],
        correctOptionIds: ["3"],
        explanation: "500 Internal Server Error often occurs when malformed SQL syntax causes database exceptions."
      },
      {
        questionText: "What type of attack involves poisoning DNS query responses to misdirect legitimate users to attacker servers?",
        options: [{_id: "1", text: "DNS Spoofing / Cache Poisoning"}, {_id: "2", text: "SYN Flood"}, {_id: "3", text: "ARP Reflection"}, {_id: "4", text: "BGP Hijacking"}],
        correctOptionIds: ["1"],
        explanation: "DNS cache poisoning injects corrupt DNS records to redirect network traffic."
      },
      {
        questionText: "Which symmetric encryption algorithm is mandated by NIST for classified enterprise data at rest?",
        options: [{_id: "1", text: "DES-56"}, {_id: "2", text: "RC4"}, {_id: "3", text: "AES-256"}, {_id: "4", text: "Blowfish"}],
        correctOptionIds: ["3"],
        explanation: "AES-256 is the internationally accepted standard for military-grade symmetric encryption."
      },
      {
        questionText: "What is the core philosophical tenet of a Zero Trust Architecture (ZTA)?",
        options: [{_id: "1", text: "Trust internal subnet packets implicitly"}, {_id: "2", text: "Never trust, always verify every access request regardless of origin"}, {_id: "3", text: "Authenticate only once per 24 hours"}, {_id: "4", text: "Rely entirely on external boundary firewalls"}],
        correctOptionIds: ["2"],
        explanation: "Zero Trust enforces continuous verification of identity and least privilege everywhere."
      },
      {
        questionText: "Which tool is widely utilized in enterprise SOC environments for SIEM data correlation?",
        options: [{_id: "1", text: "Splunk Enterprise"}, {_id: "2", text: "VLC Player"}, {_id: "3", text: "Postman"}, {_id: "4", text: "FileZilla"}],
        correctOptionIds: ["1"],
        explanation: "Splunk is an industry-leading SIEM platform for real-time log ingestion and correlation."
      },
      {
        questionText: "What classification of malware disguises itself as harmless software to provide backdoor persistence?",
        options: [{_id: "1", text: "Worm"}, {_id: "2", text: "Trojan Horse"}, {_id: "3", text: "Ransomware"}, {_id: "4", text: "Spyware"}],
        correctOptionIds: ["2"],
        explanation: "A Trojan masquerades as benign software while harboring unauthorized backdoor payloads."
      },
      {
        questionText: "Which web vulnerability occurs when untrusted input is reflected into browser DOM without escaping?",
        options: [{_id: "1", text: "SQL Injection"}, {_id: "2", text: "Cross-Site Scripting (XSS)"}, {_id: "3", text: "Path Traversal"}, {_id: "4", text: "Server-Side Request Forgery"}],
        correctOptionIds: ["2"],
        explanation: "XSS allows adversaries to execute malicious JavaScript in victim browsers."
      },
      {
        questionText: "Which security framework principle mandates granting users only the minimum access needed for job duties?",
        options: [{_id: "1", text: "Principle of Least Privilege (PoLP)"}, {_id: "2", text: "Defense in Depth"}, {_id: "3", text: "Fail-Safe Defaults"}, {_id: "4", text: "Complete Mediation"}],
        correctOptionIds: ["1"],
        explanation: "Least Privilege minimizes exposure by restricting access to necessary capabilities only."
      }
    ]
  },
  {
    title: "Python for Data Science, ML & Advanced Numerical Analysis",
    slug: "python-data-science-machine-learning",
    category: "B.Tech",
    description: "Industry-grade Python evaluation assessing multidimensional array computation, statistical pipelines, supervised classification, feature engineering, and model validation.",
    durationMinutes: 20,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "NumPy Vectorization & N-Dimensional Array Math",
      "Pandas DataFrame Wrangling & Feature Engineering",
      "Scikit-Learn Regression & Classification Workflows",
      "Hyperparameter Optimization & Cross-Validation"
    ],
    questions: [
      {
        questionText: "What NumPy function creates a 1D array of evenly spaced values within a specified interval?",
        options: [{_id: "1", text: "np.arange()"}, {_id: "2", text: "np.zeros()"}, {_id: "3", text: "np.array_split()"}, {_id: "4", text: "np.matrix()"}],
        correctOptionIds: ["1"],
        explanation: "np.arange() returns evenly spaced values within a given half-open interval."
      },
      {
        questionText: "Which pandas method imputes missing values (NaN) with a designated replacement value?",
        options: [{_id: "1", text: "df.dropna()"}, {_id: "2", text: "df.fillna()"}, {_id: "3", text: "df.replace_null()"}, {_id: "4", text: "df.clean()"}],
        correctOptionIds: ["2"],
        explanation: "df.fillna() fills NA/NaN values using specified values, methods, or interpolations."
      },
      {
        questionText: "In supervised machine learning, what does the 'Bias-Variance Tradeoff' describe?",
        options: [{_id: "1", text: "Balancing training dataset file size against CPU core clock speeds"}, {_id: "2", text: "The tradeoff between underfitting (high bias) and overfitting (high variance)"}, {_id: "3", text: "Memory allocation between RAM and swap partitions"}, {_id: "4", text: "The proportion of categorical vs numerical columns"}],
        correctOptionIds: ["2"],
        explanation: "Bias-Variance Tradeoff describes the conflict between high bias (underfitting) and high variance (overfitting)."
      },
      {
        questionText: "Which metric is most informative when evaluating a classifier on an imbalanced medical dataset?",
        options: [{_id: "1", text: "Overall Accuracy"}, {_id: "2", text: "Recall and F1-Score"}, {_id: "3", text: "Mean Squared Error (MSE)"}, {_id: "4", text: "R-squared value"}],
        correctOptionIds: ["2"],
        explanation: "Recall and F1-Score measure the balance between precision and sensitivity, which is critical for imbalanced classes."
      },
      {
        questionText: "What algorithm iteratively builds an ensemble of weak decision trees by optimizing gradient loss?",
        options: [{_id: "1", text: "K-Means Clustering"}, {_id: "2", text: "Gradient Boosting Trees (XGBoost/LightGBM)"}, {_id: "3", text: "Principal Component Analysis (PCA)"}, {_id: "4", text: "Linear Discriminant Analysis"}],
        correctOptionIds: ["2"],
        explanation: "Gradient Boosting builds decision trees sequentially, each correcting the residual errors of prior trees."
      },
      {
        questionText: "Which Python visualization library operates natively as a high-level wrapper over Matplotlib?",
        options: [{_id: "1", text: "Seaborn"}, {_id: "2", text: "PyQt5"}, {_id: "3", text: "Tkinter"}, {_id: "4", text: "Numba"}],
        correctOptionIds: ["1"],
        explanation: "Seaborn provides an attractive high-level API for drawing statistical graphics on top of Matplotlib."
      },
      {
        questionText: "What is the primary purpose of Principal Component Analysis (PCA)?",
        options: [{_id: "1", text: "Supervised classification of image pixels"}, {_id: "2", text: "Dimensionality reduction while preserving maximum variance"}, {_id: "3", text: "Encrypted transmission of CSV tables"}, {_id: "4", text: "Sorting database rows in descending order"}],
        correctOptionIds: ["2"],
        explanation: "PCA reduces the number of dimensions in large datasets while retaining as much variance as possible."
      },
      {
        questionText: "In Scikit-Learn, which class splits datasets into K consecutive folds for cross-validation?",
        options: [{_id: "1", text: "KFold"}, {_id: "2", text: "Splitter"}, {_id: "3", text: "BatchIterator"}, {_id: "4", text: "RandomSampler"}],
        correctOptionIds: ["1"],
        explanation: "KFold divides a dataset into K non-overlapping folds to perform rigorous cross-validation."
      },
      {
        questionText: "What type of machine learning does K-Means clustering represent?",
        options: [{_id: "1", text: "Supervised Regression"}, {_id: "2", text: "Unsupervised Learning"}, {_id: "3", text: "Reinforcement Learning"}, {_id: "4", text: "Semi-Supervised Label Propagation"}],
        correctOptionIds: ["2"],
        explanation: "K-Means is an unsupervised clustering algorithm that partitions unlabeled data into K distinct clusters."
      },
      {
        questionText: "Which loss function is universally minimized during linear regression model fitting?",
        options: [{_id: "1", text: "Categorical Cross-Entropy"}, {_id: "2", text: "Mean Squared Error (MSE)"}, {_id: "3", text: "Hinge Loss"}, {_id: "4", text: "Binary Cross-Entropy"}],
        correctOptionIds: ["2"],
        explanation: "Linear Regression minimizes the Mean Squared Error (MSE) between actual and predicted target values."
      }
    ]
  },
  {
    title: "Data Structures & Algorithms (DSA)",
    slug: "data-structures-and-algorithms",
    category: "B.Tech",
    description: "Comprehensive algorithmic problem solving covering asymptotic analysis (Big-O), linear structures (stacks, queues, linked lists), trees, heaps, graphs, and sorting algorithms.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Asymptotic Notation & Time/Space Complexity",
      "Linear Data Structures: Arrays, Linked Lists, Stacks & Queues",
      "Non-Linear Structures: Binary Search Trees, Heaps & Graphs",
      "Searching & Sorting Algorithms (Binary Search, Merge Sort, Quick Sort)"
    ],
    questions: [
      {
        questionText: "What is the worst-case time complexity of QuickSort when poorly chosen pivots are selected?",
        options: [{_id: "1", text: "O(n log n)"}, {_id: "2", text: "O(n)"}, {_id: "3", text: "O(n^2)"}, {_id: "4", text: "O(log n)"}],
        correctOptionIds: ["3"],
        explanation: "QuickSort degrades to O(n^2) when chosen pivots consistently partition arrays into unbalanced 0 and n-1 subproblems."
      },
      {
        questionText: "Which data structure operates on a Strict First-In, First-Out (FIFO) basis?",
        options: [{_id: "1", text: "Stack"}, {_id: "2", text: "Queue"}, {_id: "3", text: "Priority Queue"}, {_id: "4", text: "Max Heap"}],
        correctOptionIds: ["2"],
        explanation: "A standard Queue enqueues elements at the rear and dequeues from the front, observing FIFO order."
      },
      {
        questionText: "What is the average time complexity to search for an element in a balanced Binary Search Tree (BST)?",
        options: [{_id: "1", text: "O(1)"}, {_id: "2", text: "O(log n)"}, {_id: "3", text: "O(n)"}, {_id: "4", text: "O(n log n)"}],
        correctOptionIds: ["2"],
        explanation: "In a balanced BST, each comparison halves the search space, yielding O(log n) average time complexity."
      },
      {
        questionText: "Which algorithm finds the shortest path between a starting node and all other nodes in a graph with non-negative edge weights?",
        options: [{_id: "1", text: "Prim's Algorithm"}, {_id: "2", text: "Dijkstra's Algorithm"}, {_id: "3", text: "Kruskal's Algorithm"}, {_id: "4", text: "Floyd-Warshall Algorithm"}],
        correctOptionIds: ["2"],
        explanation: "Dijkstra's algorithm uses a priority queue to compute single-source shortest paths on graphs with non-negative weights."
      },
      {
        questionText: "What is the primary advantage of a Doubly Linked List over a Singly Linked List?",
        options: [{_id: "1", text: "Requires less memory per node"}, {_id: "2", text: "Allows bidirectional traversal (forward and backward)"}, {_id: "3", text: "Provides O(1) random index access like arrays"}, {_id: "4", text: "Automatically sorts data on insertion"}],
        correctOptionIds: ["2"],
        explanation: "A Doubly Linked List stores references to both the next and previous nodes, enabling bidirectional traversal."
      },
      {
        questionText: "What is the space complexity of Depth First Search (DFS) on a tree of height h using recursion?",
        options: [{_id: "1", text: "O(1)"}, {_id: "2", text: "O(h)"}, {_id: "3", text: "O(n^2)"}, {_id: "4", text: "O(2^h)"}],
        correctOptionIds: ["2"],
        explanation: "The call stack memory consumption in recursive DFS corresponds directly to the maximum height h of the tree."
      },
      {
        questionText: "In a Min-Heap, where is the smallest element always located?",
        options: [{_id: "1", text: "At the root node"}, {_id: "2", text: "At the leftmost leaf node"}, {_id: "3", text: "At the rightmost leaf node"}, {_id: "4", text: "At the center internal node"}],
        correctOptionIds: ["1"],
        explanation: "By definition, the root of a Min-Heap contains the minimum key of all elements in the heap."
      },
      {
        questionText: "Which sorting algorithm possesses a guaranteed worst-case time complexity of O(n log n) and is stable?",
        options: [{_id: "1", text: "QuickSort"}, {_id: "2", text: "Selection Sort"}, {_id: "3", text: "Merge Sort"}, {_id: "4", text: "HeapSort"}],
        correctOptionIds: ["3"],
        explanation: "Merge Sort consistently divides arrays into halves and merges them, guaranteeing O(n log n) worst-case time and stability."
      },
      {
        questionText: "What data structure is utilized internally to convert infix expressions to postfix expressions?",
        options: [{_id: "1", text: "Queue"}, {_id: "2", text: "Stack"}, {_id: "3", text: "B-Tree"}, {_id: "4", text: "Circular Linked List"}],
        correctOptionIds: ["2"],
        explanation: "Dijkstra's Shunting-yard algorithm utilizes an operator stack to convert infix expressions to postfix notation."
      },
      {
        questionText: "What is the worst-case lookup time in a Hash Table when severe hash collisions occur?",
        options: [{_id: "1", text: "O(1)"}, {_id: "2", text: "O(log n)"}, {_id: "3", text: "O(n)"}, {_id: "4", text: "O(n^2)"}],
        correctOptionIds: ["3"],
        explanation: "If all keys hash to the same bucket (forming a long linked list), searching degrades to O(n)."
      }
    ]
  },
  {
    title: "Introduction to Artificial Intelligence (AI)",
    slug: "introduction-to-artificial-intelligence",
    category: "B.Tech",
    description: "Foundational artificial intelligence concepts covering intelligent agents, search algorithms, heuristic methods, supervised & reinforcement learning, neural networks, and AI ethics.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Foundations of AI & Intelligent Agents",
      "Search Strategies (BFS, DFS, A* Heuristic Search)",
      "Knowledge Representation, Logic & Expert Systems",
      "Introduction to Machine Learning, Neural Networks & NLP"
    ],
    questions: [
      {
        questionText: "Who is widely recognized as the 'Father of Artificial Intelligence' who organized the 1956 Dartmouth workshop?",
        options: [{_id: "1", text: "Alan Turing"}, {_id: "2", text: "John McCarthy"}, {_id: "3", text: "Marvin Minsky"}, {_id: "4", text: "Claude Shannon"}],
        correctOptionIds: ["2"],
        explanation: "John McCarthy coined the term 'Artificial Intelligence' and organized the seminal 1956 Dartmouth conference."
      },
      {
        questionText: "What evaluation method tests whether an artificial machine can exhibit intelligent behavior indistinguishable from a human?",
        options: [{_id: "1", text: "Turing Test"}, {_id: "2", text: "Bellman Equation"}, {_id: "3", text: "Shannon Entropy Test"}, {_id: "4", text: "PageRank Test"}],
        correctOptionIds: ["1"],
        explanation: "The Turing Test assesses a machine's ability to exhibit natural language behavior indistinguishable from a human."
      },
      {
        questionText: "Which search algorithm uses both path cost g(n) and heuristic estimate h(n) to find optimal paths?",
        options: [{_id: "1", text: "Breadth-First Search (BFS)"}, {_id: "2", text: "Depth-First Search (DFS)"}, {_id: "3", text: "A* Search Algorithm"}, {_id: "4", text: "Hill Climbing"}],
        correctOptionIds: ["3"],
        explanation: "A* evaluates nodes using f(n) = g(n) + h(n), guaranteeing optimal paths when h(n) is admissible."
      },
      {
        questionText: "What is an 'Intelligent Agent' composed of in AI architecture?",
        options: [{_id: "1", text: "Architecture and Program (Sensors and Actuators)"}, {_id: "2", text: "Only CPU and RAM circuits"}, {_id: "3", text: "A database table with SQL views"}, {_id: "4", text: "A web browser client"}],
        correctOptionIds: ["1"],
        explanation: "An intelligent agent perceives its environment through sensors and acts upon it through actuators."
      },
      {
        questionText: "Which mathematical function introduces non-linearity into an Artificial Neural Network node?",
        options: [{_id: "1", text: "Linear Cost Function"}, {_id: "2", text: "Activation Function (e.g. ReLU, Sigmoid)"}, {_id: "3", text: "Dot Product Summation"}, {_id: "4", text: "Variance Normalization"}],
        correctOptionIds: ["2"],
        explanation: "Activation functions (such as ReLU, Sigmoid, and Tanh) introduce non-linear mapping capabilities into neural networks."
      },
      {
        questionText: "What paradigm of machine learning learns optimal behavior through trial-and-error rewards and penalties?",
        options: [{_id: "1", text: "Supervised Learning"}, {_id: "2", text: "Unsupervised Clustering"}, {_id: "3", text: "Reinforcement Learning"}, {_id: "4", text: "Rule-Based Deductive Reasoning"}],
        correctOptionIds: ["3"],
        explanation: "Reinforcement learning agents maximize cumulative rewards through environmental interactions and feedback."
      },
      {
        questionText: "In Natural Language Processing (NLP), what is the process of converting raw text into discrete word tokens?",
        options: [{_id: "1", text: "Tokenization"}, {_id: "2", text: "Stemming"}, {_id: "3", text: "Lemmatization"}, {_id: "4", text: "Vector Quantization"}],
        correctOptionIds: ["1"],
        explanation: "Tokenization segments strings of text into individual words, symbols, or sub-word tokens."
      },
      {
        questionText: "What algorithm is used to compute gradients and update connection weights in multi-layer perceptrons?",
        options: [{_id: "1", text: "Backpropagation"}, {_id: "2", text: "Forward Elimination"}, {_id: "3", text: "Breadth-First Expansion"}, {_id: "4", text: "Quicksort Partitioning"}],
        correctOptionIds: ["1"],
        explanation: "Backpropagation calculates loss gradients with respect to each weight using the chain rule of calculus."
      },
      {
        questionText: "What type of heuristic is considered 'Admissible' in A* search?",
        options: [{_id: "1", text: "One that never overestimates the actual cost to reach the goal"}, {_id: "2", text: "One that always equals zero"}, {_id: "3", text: "One that calculates negative values"}, {_id: "4", text: "One that overestimates by 50%"}],
        correctOptionIds: ["1"],
        explanation: "An admissible heuristic never overestimates the true remaining cost to achieve the destination goal."
      },
      {
        questionText: "What is 'Overfitting' in machine learning and AI model training?",
        options: [{_id: "1", text: "When a model learns training noise and performs poorly on unseen test data"}, {_id: "2", text: "When a model fails to learn the training dataset"}, {_id: "3", text: "When dataset rows exceed available GPU memory"}, {_id: "4", text: "When training epochs complete too quickly"}],
        correctOptionIds: ["1"],
        explanation: "Overfitting occurs when a complex model memorizes training noise rather than generalizable patterns."
      }
    ]
  },

  // ==========================================
  // COMPUTER SCIENCE & IT COURSES (4 COURSES)
  // ==========================================
  {
    title: "Cloud Infrastructure, DevOps & Container Orchestration",
    slug: "cloud-devops-container-orchestration",
    category: "Computer Science & IT",
    description: "Production cloud engineering covering Linux kernel virtualization, Docker container lifecycle, Kubernetes Pod orchestration, Terraform IaC, and CI/CD automated deployment pipelines.",
    durationMinutes: 20,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Containerization Engine & Dockerfile Optimization",
      "Kubernetes Architecture (Control Plane, Pods, Services)",
      "Infrastructure as Code (IaC) with Terraform",
      "Continuous Integration & Continuous Delivery (CI/CD)"
    ],
    questions: [
      {
        questionText: "What Linux kernel feature enables Docker container resource limits (CPU, memory, I/O)?",
        options: [{_id: "1", text: "Namespaces"}, {_id: "2", text: "Control Groups (cgroups)"}, {_id: "3", text: "Chroot jail"}, {_id: "4", text: "SELinux booleans"}],
        correctOptionIds: ["2"],
        explanation: "cgroups regulate and allocate memory, CPU, and device bandwidth among processes."
      },
      {
        questionText: "In Kubernetes architecture, what component coordinates all API calls and acts as the cluster gateway?",
        options: [{_id: "1", text: "kube-scheduler"}, {_id: "2", text: "kube-apiserver"}, {_id: "3", text: "kube-controller-manager"}, {_id: "4", text: "kubelet"}],
        correctOptionIds: ["2"],
        explanation: "kube-apiserver exposes the Kubernetes REST API and coordinates all cluster operations."
      },
      {
        questionText: "What is the smallest deployable computing unit that can be scheduled in Kubernetes?",
        options: [{_id: "1", text: "Container"}, {_id: "2", text: "Pod"}, {_id: "3", text: "Node"}, {_id: "4", text: "ReplicaSet"}],
        correctOptionIds: ["2"],
        explanation: "A Pod encapsulates one or more containers sharing network and storage namespaces."
      },
      {
        questionText: "Which Kubernetes Service type provisions an external cloud provider load balancer IP address?",
        options: [{_id: "1", text: "ClusterIP"}, {_id: "2", text: "NodePort"}, {_id: "3", text: "LoadBalancer"}, {_id: "4", text: "ExternalName"}],
        correctOptionIds: ["3"],
        explanation: "Service type LoadBalancer interacts with cloud provider APIs to provision dedicated external load balancers."
      },
      {
        questionText: "Which command in Docker CLI generates a portable image from a written Dockerfile?",
        options: [{_id: "1", text: "docker run"}, {_id: "2", text: "docker build"}, {_id: "3", text: "docker compose up"}, {_id: "4", text: "docker create"}],
        correctOptionIds: ["2"],
        explanation: "docker build packages context and instructions into read-only OCI container images."
      },
      {
        questionText: "What is the core purpose of Infrastructure as Code (IaC) tools like Terraform?",
        options: [{_id: "1", text: "Compile C++ code into machine assembly"}, {_id: "2", text: "Provision, manage, and version cloud infrastructure declaratively"}, {_id: "3", text: "Inspect web browser cache headers"}, {_id: "4", text: "Stream real-time video over UDP"}],
        correctOptionIds: ["2"],
        explanation: "Terraform uses declarative HCL code to orchestrate cloud resources idempotently across providers."
      },
      {
        questionText: "Which CI/CD deployment strategy runs two identical production environments to enable zero-downtime cutover?",
        options: [{_id: "1", text: "Rolling Update"}, {_id: "2", text: "Blue-Green Deployment"}, {_id: "3", text: "Canary Deployment"}, {_id: "4", text: "Recreate Deployment"}],
        correctOptionIds: ["2"],
        explanation: "Blue-Green deployment provisions identical environments, switching routing smoothly upon health check validation."
      },
      {
        questionText: "What distributed key-value store persists all cluster state data in a Kubernetes control plane?",
        options: [{_id: "1", text: "Redis"}, {_id: "2", text: "etcd"}, {_id: "3", text: "Cassandra"}, {_id: "4", text: "PostgreSQL"}],
        correctOptionIds: ["2"],
        explanation: "etcd is a consistent and highly available Raft-based key-value store used as Kubernetes backing database."
      },
      {
        questionText: "In Dockerfile best practices, why are multi-stage builds recommended?",
        options: [{_id: "1", text: "They run Docker in parallel CPU threads"}, {_id: "2", text: "They separate build tools from final runtime images to drastically reduce image size"}, {_id: "3", text: "They prevent containers from needing root privileges"}, {_id: "4", text: "They automatically sign Docker images with SSL certificates"}],
        correctOptionIds: ["2"],
        explanation: "Multi-stage builds leave compiler SDKs and build artifacts behind, yielding lean production images."
      },
      {
        questionText: "Which command verifies the current state of infrastructure managed by Terraform?",
        options: [{_id: "1", text: "terraform plan"}, {_id: "2", text: "terraform init"}, {_id: "3", text: "terraform validate"}, {_id: "4", text: "terraform apply"}],
        correctOptionIds: ["1"],
        explanation: "terraform plan creates an execution plan, reading current state and determining changes needed."
      }
    ]
  },
  {
    title: "Data Analytics & Business Intelligence",
    slug: "data-analytics-business-intelligence",
    category: "Computer Science & IT",
    description: "Practical data analytics workflows covering exploratory data analysis (EDA), data cleaning, statistical measures, KPI dash-boarding, and Business Intelligence decision-making.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Data Analytics Lifecycle & Core Analytics Types",
      "Data Cleaning, Preprocessing & Quality Assessment",
      "Exploratory Data Analysis (EDA) & Statistical Metrics",
      "Data Visualization, KPI Dashboards & Decision Support"
    ],
    questions: [
      {
        questionText: "What is the primary objective of Data Analytics?",
        options: [{_id: "1", text: "To inspect, clean, transform, and model data to discover actionable insights for decision-making"}, {_id: "2", text: "To assemble motherboard hardware components"}, {_id: "3", text: "To format physical hard drive storage sectors"}, {_id: "4", text: "To style website colors and typography"}],
        correctOptionIds: ["1"],
        explanation: "Data Analytics involves analyzing raw data to extract meaningful conclusions and guide strategic business choices."
      },
      {
        questionText: "Which type of data analytics answers the question: 'What happened in the past?'",
        options: [{_id: "1", text: "Descriptive Analytics"}, {_id: "2", text: "Predictive Analytics"}, {_id: "3", text: "Prescriptive Analytics"}, {_id: "4", text: "Cognitive Analytics"}],
        correctOptionIds: ["1"],
        explanation: "Descriptive analytics summarizes historical data to understand past trends and performance indicators."
      },
      {
        questionText: "In statistics and data analytics, what does the 'Median' represent?",
        options: [{_id: "1", text: "The sum of all values divided by the total count"}, {_id: "2", text: "The middle value that separates the higher half from the lower half of an ordered dataset"}, {_id: "3", text: "The most frequently occurring value in the dataset"}, {_id: "4", text: "The difference between maximum and minimum values"}],
        correctOptionIds: ["2"],
        explanation: "The Median is the middle number in a sorted dataset, resisting skew from extreme outliers."
      },
      {
        questionText: "What does the acronym 'KPI' stand for in Business Intelligence?",
        options: [{_id: "1", text: "Kernel Processing Index"}, {_id: "2", text: "Key Performance Indicator"}, {_id: "3", text: "Knowledge Protocol Interface"}, {_id: "4", text: "Key Protection Identity"}],
        correctOptionIds: ["2"],
        explanation: "A Key Performance Indicator (KPI) is a quantifiable metric used to measure progress toward strategic organizational goals."
      },
      {
        questionText: "What is the primary goal of Data Cleaning (Data Cleansing)?",
        options: [{_id: "1", text: "Deleting all records containing even integers"}, {_id: "2", text: "Identifying and rectifying errors, duplicates, and missing values in a dataset"}, {_id: "3", text: "Compressing text files into ZIP archives"}, {_id: "4", text: "Encrypting network file transfers"}],
        correctOptionIds: ["2"],
        explanation: "Data cleaning ensures datasets are accurate, complete, and consistent before conducting analysis or training models."
      },
      {
        questionText: "Which chart type is best suited for tracking trends in continuous data over time?",
        options: [{_id: "1", text: "Pie Chart"}, {_id: "2", text: "Line Chart"}, {_id: "3", text: "Scatter Plot"}, {_id: "4", text: "Tree Map"}],
        correctOptionIds: ["2"],
        explanation: "Line charts connect data points sequentially, making them ideal for displaying time-series trends and patterns."
      },
      {
        questionText: "What is an 'Outlier' in a statistical distribution?",
        options: [{_id: "1", text: "A data point that differs significantly from other observations in the dataset"}, {_id: "2", text: "A spreadsheet column header label"}, {_id: "3", text: "A primary key constraint in a relational database"}, {_id: "4", text: "A file format extension"}],
        correctOptionIds: ["1"],
        explanation: "An outlier is an observation point that lies an abnormal distance away from other values in a random sample."
      },
      {
        questionText: "In Exploratory Data Analysis (EDA), what does 'Correlation' measure?",
        options: [{_id: "1", text: "The direct causal link between two events"}, {_id: "2", text: "The strength and direction of a linear relationship between two variables"}, {_id: "3", text: "The execution speed of SQL database queries"}, {_id: "4", text: "The storage byte size of tabular CSV files"}],
        correctOptionIds: ["2"],
        explanation: "Correlation measures the linear relationship between two variables, ranging from -1 (inverse) to +1 (direct)."
      },
      {
        questionText: "What is an enterprise 'Data Warehouse'?",
        options: [{_id: "1", text: "A centralized repository consolidating integrated data from multiple operational sources for reporting and analysis"}, {_id: "2", text: "A physical storage warehouse for decommissioned computers"}, {_id: "3", text: "A temporary USB backup drive"}, {_id: "4", text: "A local browser cache storage location"}],
        correctOptionIds: ["1"],
        explanation: "A Data Warehouse aggregates data from diverse operational systems into a unified schema for business intelligence."
      },
      {
        questionText: "Which popular Python library is primarily used for tabular data manipulation and DataFrame analysis?",
        options: [{_id: "1", text: "Pandas"}, {_id: "2", text: "Pygame"}, {_id: "3", text: "Flask"}, {_id: "4", text: "Tkinter"}],
        correctOptionIds: ["1"],
        explanation: "Pandas provides high-performance data structures (such as DataFrame and Series) for data wrangling and statistical operations."
      }
    ]
  },
  {
    title: "Full Stack Web Engineering & MERN Architecture",
    slug: "fullstack-mern-web-engineering",
    category: "Computer Science & IT",
    description: "Modern enterprise web architecture using MongoDB, Express.js, React, and Node.js. Covers asynchronous event loop, RESTful API design, JWT authentication, and state management.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Node.js Event-Driven Architecture & Express Middleware",
      "React Component Lifecycle, Virtual DOM & Hooks",
      "RESTful API Design, CORS & JWT Authentication",
      "MongoDB Mongoose Schemas, Aggregations & Indexing"
    ],
    questions: [
      {
        questionText: "What architectural model does the Node.js runtime utilize to handle concurrent connections?",
        options: [{_id: "1", text: "Single-threaded event loop with non-blocking I/O"}, {_id: "2", text: "One thread per socket connection"}, {_id: "3", text: "Synchronous blocking thread pool only"}, {_id: "4", text: "Multi-process fork for every incoming packet"}],
        correctOptionIds: ["1"],
        explanation: "Node.js uses a single-threaded event loop along with libuv thread pool to execute non-blocking asynchronous operations."
      },
      {
        questionText: "In React, what hook is used to perform side effects like data fetching and subscriptions in functional components?",
        options: [{_id: "1", text: "useState"}, {_id: "2", text: "useEffect"}, {_id: "3", text: "useMemo"}, {_id: "4", text: "useContext"}],
        correctOptionIds: ["2"],
        explanation: "useEffect executes side-effect logic after component rendering, replacing lifecycle methods like componentDidMount."
      },
      {
        questionText: "What does the Express.js `next()` function call execute?",
        options: [{_id: "1", text: "It restarts the web server daemon"}, {_id: "2", text: "It passes control to the next middleware function in the request pipeline"}, {_id: "3", text: "It commits the transaction to MongoDB"}, {_id: "4", text: "It terminates the client HTTP connection"}],
        correctOptionIds: ["2"],
        explanation: "In Express middleware, calling next() invokes the subsequent middleware handler in the application stack."
      },
      {
        questionText: "Where are JSON Web Tokens (JWT) typically attached in HTTP request headers for authenticated endpoints?",
        options: [{_id: "1", text: "Content-Type: application/jwt"}, {_id: "2", text: "Authorization: Bearer <token>"}, {_id: "3", text: "Accept-Encoding: jwt"}, {_id: "4", text: "User-Agent: JWT"}],
        correctOptionIds: ["2"],
        explanation: "JWTs are standardly passed in the Authorization header utilizing the Bearer authentication scheme."
      },
      {
        questionText: "What is the Virtual DOM in React?",
        options: [{_id: "1", text: "A lightweight in-memory representation of the actual browser DOM"}, {_id: "2", text: "A physical virtual machine running in the cloud"}, {_id: "3", text: "A database table storing HTML markup"}, {_id: "4", text: "A browser extension for debugging"}],
        correctOptionIds: ["1"],
        explanation: "React maintains a Virtual DOM in memory to calculate diffs efficiently before committing changes to the real DOM."
      },
      {
        questionText: "Which HTTP method should be used for idempotent updates that replace an existing resource completely?",
        options: [{_id: "1", text: "POST"}, {_id: "2", text: "PUT"}, {_id: "3", text: "PATCH"}, {_id: "4", text: "CONNECT"}],
        correctOptionIds: ["2"],
        explanation: "PUT is an idempotent HTTP verb intended to replace the target resource entirely with the request payload."
      },
      {
        questionText: "In MongoDB Mongoose, which method populates referenced documents from another collection using ObjectIds?",
        options: [{_id: "1", text: ".join()"}, {_id: "2", text: ".populate()"}, {_id: "3", text: ".merge()"}, {_id: "4", text: ".link()"}],
        correctOptionIds: ["2"],
        explanation: "Mongoose's populate() method replaces specified paths in documents with documents from other collections."
      },
      {
        questionText: "What does CORS stand for in web security and API development?",
        options: [{_id: "1", text: "Cross-Origin Resource Sharing"}, {_id: "2", text: "Central Object Routing Standard"}, {_id: "3", text: "Client Origin Routing System"}, {_id: "4", text: "Cryptographic Online Resource Security"}],
        correctOptionIds: ["1"],
        explanation: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts cross-origin HTTP requests."
      },
      {
        questionText: "Which React hook is used to optimize performance by memoizing complex calculation results between re-renders?",
        options: [{_id: "1", text: "useCallback"}, {_id: "2", text: "useMemo"}, {_id: "3", text: "useRef"}, {_id: "4", text: "useReducer"}],
        correctOptionIds: ["2"],
        explanation: "useMemo caches the calculated result of an expensive function until one of its dependencies changes."
      },
      {
        questionText: "In Node.js, what is the default package manager bundled with the runtime?",
        options: [{_id: "1", text: "pip"}, {_id: "2", text: "npm"}, {_id: "3", text: "maven"}, {_id: "4", text: "composer"}],
        correctOptionIds: ["2"],
        explanation: "npm (Node Package Manager) is the standard dependency manager distributed alongside Node.js."
      }
    ]
  },
  {
    title: "Computer Networks & Network Security Protocols",
    slug: "computer-networks-security",
    category: "Computer Science & IT",
    description: "In-depth computer networking and protocol security covering OSI and TCP/IP models, routing protocols, subnetting, transport layer handshakes, and cryptographic security protocols.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "OSI & TCP/IP Reference Models & Layer Responsibilities",
      "IPv4 Subnetting, CIDR & Dynamic Routing Protocols (OSPF, BGP)",
      "TCP 3-Way Handshake, Flow Control & UDP Protocol Differences",
      "Network Security: TLS Handshake, Firewalls & VPN Protocols"
    ],
    questions: [
      {
        questionText: "How many layers are defined in the standard OSI (Open Systems Interconnection) reference model?",
        options: [{_id: "1", text: "4 layers"}, {_id: "2", text: "5 layers"}, {_id: "3", text: "7 layers"}, {_id: "4", text: "9 layers"}],
        correctOptionIds: ["3"],
        explanation: "The OSI model consists of 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
      },
      {
        questionText: "Which protocol is responsible for mapping IP addresses to physical MAC hardware addresses on a local subnet?",
        options: [{_id: "1", text: "DHCP"}, {_id: "2", text: "ARP (Address Resolution Protocol)"}, {_id: "3", text: "DNS"}, {_id: "4", text: "ICMP"}],
        correctOptionIds: ["2"],
        explanation: "ARP resolves Layer 3 IP addresses into Layer 2 physical MAC addresses within a broadcast domain."
      },
      {
        questionText: "What are the three packets exchanged during a classic TCP three-way handshake?",
        options: [{_id: "1", text: "SYN, SYN-ACK, ACK"}, {_id: "2", text: "INIT, ACK, FIN"}, {_id: "3", text: "PING, PONG, ACK"}, {_id: "4", text: "HELLO, VERIFY, READY"}],
        correctOptionIds: ["1"],
        explanation: "TCP establishes connection reliability via a three-way handshake: SYN -> SYN-ACK -> ACK."
      },
      {
        questionText: "How many usable host IP addresses are available in a subnet with a /24 CIDR prefix (e.g. 192.168.1.0/24)?",
        options: [{_id: "1", text: "256"}, {_id: "2", text: "254"}, {_id: "3", text: "255"}, {_id: "4", text: "128"}],
        correctOptionIds: ["2"],
        explanation: "A /24 subnet contains 256 total addresses; subtracting the network address (.0) and broadcast address (.255) leaves 254 usable host IPs."
      },
      {
        questionText: "Which protocol operates at the Transport Layer and provides connectionless, low-latency communication without acknowledgments?",
        options: [{_id: "1", text: "TCP"}, {_id: "2", text: "UDP (User Datagram Protocol)"}, {_id: "3", text: "SCTP"}, {_id: "4", text: "IPsec"}],
        correctOptionIds: ["2"],
        explanation: "UDP sends datagrams without establishing connections or verifying packet delivery, making it ideal for streaming and gaming."
      },
      {
        questionText: "What default port does encrypted HTTPS traffic utilize across the internet?",
        options: [{_id: "1", text: "80"}, {_id: "2", text: "8080"}, {_id: "3", text: "443"}, {_id: "4", text: "22"}],
        correctOptionIds: ["3"],
        explanation: "TCP Port 443 is the standard registered port for HTTPS communication secured by TLS/SSL."
      },
      {
        questionText: "Which diagnostic protocol powers the 'ping' utility by sending Echo Request and Echo Reply messages?",
        options: [{_id: "1", text: "IGMP"}, {_id: "2", text: "ICMP (Internet Control Message Protocol)"}, {_id: "3", text: "SNMP"}, {_id: "4", text: "RIP"}],
        correctOptionIds: ["2"],
        explanation: "ICMP Echo Request (Type 8) and Echo Reply (Type 0) packets verify reachability and network round-trip time."
      },
      {
        questionText: "What is the primary role of the Border Gateway Protocol (BGP)?",
        options: [{_id: "1", text: "Assign dynamic IP addresses to home laptops"}, {_id: "2", text: "Route traffic between autonomous systems (AS) across the global Internet backbone"}, {_id: "3", text: "Encrypt files inside zip archives"}, {_id: "4", text: "Manage local Wi-Fi passwords"}],
        correctOptionIds: ["2"],
        explanation: "BGP is the exterior gateway protocol that enables routing between independent Autonomous Systems across the internet."
      },
      {
        questionText: "Which security protocol encrypts IP traffic at the Network Layer (Layer 3) to create secure Virtual Private Network (VPN) tunnels?",
        options: [{_id: "1", text: "TLS"}, {_id: "2", text: "SSH"}, {_id: "3", text: "IPsec (Internet Protocol Security)"}, {_id: "4", text: "PGP"}],
        correctOptionIds: ["3"],
        explanation: "IPsec operates at the Network Layer (Layer 3) to authenticate and encrypt IP packets across VPN tunnels."
      },
      {
        questionText: "What mechanism is used by network routers to translate private LAN IP addresses into a single public WAN IP?",
        options: [{_id: "1", text: "NAT (Network Address Translation)"}, {_id: "2", text: "VLAN tagging"}, {_id: "3", text: "BGP Peering"}, {_id: "4", text: "STP (Spanning Tree Protocol)"}],
        correctOptionIds: ["1"],
        explanation: "NAT (specifically NAPT / PAT) maps multiple private IP addresses to a single public IP using unique port numbers."
      }
    ]
  },

  // ==========================================
  // BBA COURSES (4 COURSES)
  // ==========================================
  {
    title: "Business Analytics & Strategic Decision Intelligence",
    slug: "business-analytics-strategic-decision",
    category: "BBA",
    description: "Executive managerial analytics evaluating KPI cohort modeling, customer lifetime value (CLV), Monte Carlo market risk simulations, econometric forecasting, and pricing strategy.",
    durationMinutes: 20,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Strategic Metric Formulation & Balanced Scorecard",
      "Customer Acquisition Cost (CAC) & Retention Cohorts",
      "Predictive Demand Modeling & Price Elasticity",
      "Monte Carlo Simulation & Capital Allocation Decisions"
    ],
    questions: [
      {
        questionText: "What does the managerial metric 'Customer Lifetime Value' (CLV) measure?",
        options: [{_id: "1", text: "Total net profit generated by a customer relationship over its entire duration"}, {_id: "2", text: "The physical age of the customer in demographic surveys"}, {_id: "3", text: "Daily social media impressions generated by marketing ads"}, {_id: "4", text: "The server bandwidth consumed by a registered user"}],
        correctOptionIds: ["1"],
        explanation: "CLV estimates total net profit an enterprise expects to earn from a customer relationship."
      },
      {
        questionText: "What is considered a sustainable benchmark ratio between Customer Lifetime Value (CLV) and Customer Acquisition Cost (CAC)?",
        options: [{_id: "1", text: "0.5 : 1"}, {_id: "2", text: "1 : 1"}, {_id: "3", text: "3 : 1 or greater"}, {_id: "4", text: "0.1 : 1"}],
        correctOptionIds: ["3"],
        explanation: "A healthy SaaS/enterprise business model targets a CLV:CAC ratio of at least 3:1."
      },
      {
        questionText: "What does Price Elasticity of Demand (PED) measure in economic analysis?",
        options: [{_id: "1", text: "The percentage change in quantity demanded divided by the percentage change in price"}, {_id: "2", text: "The physical durability of retail goods packaging"}, {_id: "3", text: "Employee salary inflation rates"}, {_id: "4", text: "Total inventory storage volume"}],
        correctOptionIds: ["1"],
        explanation: "PED quantifies how sensitive customer demand volume is to fluctuations in product pricing."
      },
      {
        questionText: "What is the primary role of a 'Balanced Scorecard' in corporate strategy?",
        options: [{_id: "1", text: "A sports tournament ranking system"}, {_id: "2", text: "A performance management framework translating strategy into operational metrics across Financial, Customer, Internal, and Learning perspectives"}, {_id: "3", text: "A legal accounting ledger format for bankruptcy filings"}, {_id: "4", text: "An automated password generation algorithm"}],
        correctOptionIds: ["2"],
        explanation: "Kaplan and Norton's Balanced Scorecard balances financial indicators with operational customer and process metrics."
      },
      {
        questionText: "What is Net Promoter Score (NPS) primarily used to evaluate in business management?",
        options: [{_id: "1", text: "Employee payroll deduction calculations"}, {_id: "2", text: "Customer loyalty, brand satisfaction, and likelihood of peer recommendation"}, {_id: "3", text: "Supply chain freight shipping transit delays"}, {_id: "4", text: "Company balance sheet asset depreciation"}],
        correctOptionIds: ["2"],
        explanation: "NPS measures customer loyalty by asking how likely clients are to recommend the company on a 0-10 scale."
      },
      {
        questionText: "What statistical simulation technique models the probability of outcomes under extreme market uncertainty using random sampling?",
        options: [{_id: "1", text: "Monte Carlo Simulation"}, {_id: "2", text: "Bubble Sort Algorithm"}, {_id: "3", text: "Double-Entry Ledger Balancing"}, {_id: "4", text: "Waterfall Project Planning"}],
        correctOptionIds: ["1"],
        explanation: "Monte Carlo simulations repeatedly sample random variables to model probability distributions in financial risk analysis."
      },
      {
        questionText: "In marketing analytics, what does 'Churn Rate' quantify?",
        options: [{_id: "1", text: "The percentage of subscribers or customers who discontinue service during a specified period"}, {_id: "2", text: "The speed at which new products are assembled in factories"}, {_id: "3", text: "The total volume of raw materials discarded in production"}, {_id: "4", text: "The annual dividend payout percentage"}],
        correctOptionIds: ["1"],
        explanation: "Customer Churn Rate measures the rate at which existing customers cancel subscriptions or cease purchasing."
      },
      {
        questionText: "What strategic tool analyzes an enterprise's internal Strengths and Weaknesses alongside external Opportunities and Threats?",
        options: [{_id: "1", text: "SWOT Analysis"}, {_id: "2", text: "PESTEL Matrix"}, {_id: "3", text: "Ansoff Matrix"}, {_id: "4", text: "Porter's Value Chain"}],
        correctOptionIds: ["1"],
        explanation: "SWOT analysis categorizes internal capabilities and external market dynamics for strategic planning."
      },
      {
        questionText: "In financial business decisions, what does 'Break-Even Point' signify?",
        options: [{_id: "1", text: "The sales volume at which total revenue exactly equals total costs (zero profit and zero loss)"}, {_id: "2", text: "The maximum credit limit extended by banking institutions"}, {_id: "3", text: "The point where company stock prices reach their all-time high"}, {_id: "4", text: "The date when annual corporate taxes are remitted"}],
        correctOptionIds: ["1"],
        explanation: "Break-Even Point represents the operational volume where total revenue covers both fixed and variable expenses."
      },
      {
        questionText: "What does 'Return on Investment' (ROI) mathematically express?",
        options: [{_id: "1", text: "(Net Profit / Total Cost of Investment) * 100"}, {_id: "2", text: "Total Revenue - Fixed Costs"}, {_id: "3", text: "Gross Margin / Outstanding Shares"}, {_id: "4", text: "Operating Cash Flow + Long-Term Debt"}],
        correctOptionIds: ["1"],
        explanation: "ROI measures the efficiency or profitability of an investment as a percentage of its initial cost."
      }
    ]
  },
  {
    title: "Digital Marketing, SEO & Social Media Growth Strategies",
    slug: "digital-marketing-growth-strategies",
    category: "BBA",
    description: "Modern growth marketing strategies assessing search engine optimization (SEO), Google Ads PPC, conversion rate optimization (CRO), email marketing funnels, and social media brand positioning.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "SEO Fundamentals: On-Page, Off-Page & Technical Ranking Factors",
      "Search Engine Marketing (SEM), Google Ads & PPC Bidding",
      "Social Media Marketing, Content Funnels & Influencer Outreach",
      "Conversion Rate Optimization (CRO), A/B Testing & Attribution Models"
    ],
    questions: [
      {
        questionText: "What does 'SEO' stand for in digital marketing?",
        options: [{_id: "1", text: "Search Engine Optimization"}, {_id: "2", text: "Social Enterprise Organization"}, {_id: "3", text: "Systematic Email Outreach"}, {_id: "4", text: "Sales Engagement Operation"}],
        correctOptionIds: ["1"],
        explanation: "Search Engine Optimization (SEO) improves organic website visibility in search engine results."
      },
      {
        questionText: "In pay-per-click (PPC) advertising, what does 'CTR' signify?",
        options: [{_id: "1", text: "Cost To Return"}, {_id: "2", text: "Click-Through Rate"}, {_id: "3", text: "Customer Tracking Ratio"}, {_id: "4", text: "Conversion Timing Record"}],
        correctOptionIds: ["2"],
        explanation: "Click-Through Rate (CTR) is the ratio of users who click on a link/ad to the total users who view it."
      },
      {
        questionText: "What is the primary purpose of conducting A/B Testing in conversion rate optimization (CRO)?",
        options: [{_id: "1", text: "To compare two versions of a webpage to see which performs better with real users"}, {_id: "2", text: "To test server network cable speeds"}, {_id: "3", text: "To encrypt credit card payment forms"}, {_id: "4", text: "To backup MySQL databases twice daily"}],
        correctOptionIds: ["1"],
        explanation: "A/B testing splits traffic between variants A and B to statistically determine which drives higher conversions."
      },
      {
        questionText: "What is an organic 'Backlink' in search engine algorithms?",
        options: [{_id: "1", text: "A hyperlink on an external website pointing to your domain"}, {_id: "2", text: "A browser back button click"}, {_id: "3", text: "A refund transaction link in an eCommerce store"}, {_id: "4", text: "A link to your internal contact page"}],
        correctOptionIds: ["1"],
        explanation: "Backlinks from authoritative domains signal trust and relevance to search engines like Google."
      },
      {
        questionText: "In digital marketing funnels, what does 'TOFU' stand for?",
        options: [{_id: "1", text: "Top of the Funnel (Awareness Phase)"}, {_id: "2", text: "Total Operational Function Utility"}, {_id: "3", text: "Targeted Outreach For Users"}, {_id: "4", text: "Tracked Online Form Unit"}],
        correctOptionIds: ["1"],
        explanation: "TOFU (Top of Funnel) focuses on driving broad brand awareness and attracting prospective leads."
      },
      {
        questionText: "What metric measures the total advertising spend required to convert one paying customer?",
        options: [{_id: "1", text: "CAC (Customer Acquisition Cost)"}, {_id: "2", text: "CPM (Cost Per Mille)"}, {_id: "3", text: "Bounce Rate"}, {_id: "4", text: "Impression Share"}],
        correctOptionIds: ["1"],
        explanation: "CAC represents total sales and marketing expenses divided by the number of new customers acquired."
      },
      {
        questionText: "What is 'Remarketing' (or Retargeting) in digital advertising campaigns?",
        options: [{_id: "1", text: "Serving ads specifically to users who previously visited your website or app"}, {_id: "2", text: "Selling products in secondary flea markets"}, {_id: "3", text: "Rebranding corporate logos annually"}, {_id: "4", text: "Cold emailing randomly generated email lists"}],
        correctOptionIds: ["1"],
        explanation: "Retargeting uses cookie/pixel tracking to re-engage past visitors and encourage them to complete conversions."
      },
      {
        questionText: "What does Google's 'Quality Score' assess in Google Ads PPC auctions?",
        options: [{_id: "1", text: "The relevance and expected performance of your ads, keywords, and landing page experience"}, {_id: "2", text: "The total dollar balance in the advertiser's bank account"}, {_id: "3", text: "The physical age of the business entity"}, {_id: "4", text: "The number of employees in the advertising agency"}],
        correctOptionIds: ["1"],
        explanation: "Quality Score rates ad relevance, expected CTR, and landing page quality to determine ad rank and CPC."
      },
      {
        questionText: "What is 'Bounce Rate' in website web analytics?",
        options: [{_id: "1", text: "The percentage of visitors who leave after viewing only a single page without taking action"}, {_id: "2", text: "The speed at which images download on mobile 4G"}, {_id: "3", text: "The rate of failed email deliveries due to full inboxes"}, {_id: "4", text: "The frequency of server restarts"}],
        correctOptionIds: ["1"],
        explanation: "Bounce Rate measures single-page sessions where the user navigates away without interacting further."
      },
      {
        questionText: "Which marketing channel generally delivers the highest documented ROI for eCommerce re-engagement?",
        options: [{_id: "1", text: "Email Marketing"}, {_id: "2", text: "Billboard Advertising"}, {_id: "3", text: "Print Magazines"}, {_id: "4", text: "Radio Commercials"}],
        correctOptionIds: ["1"],
        explanation: "Email marketing consistently delivers the highest documented return on investment for retention and upselling."
      }
    ]
  },
  {
    title: "Human Resource Management & Organizational Behavior",
    slug: "human-resource-management-leadership",
    category: "BBA",
    description: "Core organizational leadership principles covering strategic talent acquisition, employee motivation theories, performance appraisals, conflict resolution, and workplace diversity.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Strategic HR Planning & Job Analysis (Job Description vs Job Specification)",
      "Recruitment, Talent Sourcing & Competency-Based Interviewing",
      "Motivation Theories (Maslow, Herzberg, Vroom) & Leadership Styles",
      "Performance Appraisal Systems (360-Degree Feedback) & Labor Relations"
    ],
    questions: [
      {
        questionText: "What is the primary document detailing the duties, responsibilities, and working conditions of a role?",
        options: [{_id: "1", text: "Job Description"}, {_id: "2", text: "Job Specification"}, {_id: "3", text: "Job Evaluation"}, {_id: "4", text: "Employment Contract"}],
        correctOptionIds: ["1"],
        explanation: "A Job Description specifies what tasks, roles, and responsibilities the job entails."
      },
      {
        questionText: "In Maslow's Hierarchy of Needs, which level represents the ultimate realization of personal potential?",
        options: [{_id: "1", text: "Physiological Needs"}, {_id: "2", text: "Social Needs"}, {_id: "3", text: "Esteem Needs"}, {_id: "4", text: "Self-Actualization"}],
        correctOptionIds: ["4"],
        explanation: "Self-Actualization sits at the pinnacle of Maslow's pyramid, representing fulfillment of one's full talent and potential."
      },
      {
        questionText: "What is a '360-Degree Performance Appraisal' in modern human resource management?",
        options: [{_id: "1", text: "An evaluation collecting feedback from superiors, peers, subordinates, and self-assessment"}, {_id: "2", text: "A physical medical examination conducted once a year"}, {_id: "3", text: "A rotating cubicle seating arrangement"}, {_id: "4", text: "An automated software test of typing speed"}],
        correctOptionIds: ["1"],
        explanation: "360-degree feedback gathers comprehensive multi-rater reviews across all operational touchpoints."
      },
      {
        questionText: "According to Herzberg's Two-Factor Theory, which of the following is classified as a 'Motivator' rather than a 'Hygiene factor'?",
        options: [{_id: "1", text: "Working Conditions"}, {_id: "2", text: "Base Salary"}, {_id: "3", text: "Recognition and Achievement"}, {_id: "4", text: "Company Policies"}],
        correctOptionIds: ["3"],
        explanation: "Herzberg identified Achievement, Recognition, and Responsibility as intrinsic motivators driving job satisfaction."
      },
      {
        questionText: "What leadership style empowers employees with maximum autonomy and minimal direct supervisory intervention?",
        options: [{_id: "1", text: "Autocratic Leadership"}, {_id: "2", text: "Laissez-Faire Leadership"}, {_id: "3", text: "Bureaucratic Leadership"}, {_id: "4", text: "Transactional Leadership"}],
        correctOptionIds: ["2"],
        explanation: "Laissez-faire (hands-off) leadership provides team members with broad independence to make operational decisions."
      },
      {
        questionText: "What does 'Attrition Rate' measure in corporate HR metrics?",
        options: [{_id: "1", text: "The rate at which employees leave an organization through resignation, retirement, or departure"}, {_id: "2", text: "The percentage of employees who arrive late to the office"}, {_id: "3", text: "The number of hours employees spend in training workshops"}, {_id: "4", text: "The annual growth in employee salaries"}],
        correctOptionIds: ["1"],
        explanation: "Attrition rate (turnover) tracks workforce departures over a measured calendar period."
      },
      {
        questionText: "What is 'Onboarding' in the employee lifecycle?",
        options: [{_id: "1", text: "The process of integrating and assimilating a new hire into company culture, tools, and roles"}, {_id: "2", text: "Booking corporate airline tickets for sales executives"}, {_id: "3", text: "Conducting exit interviews before firing staff"}, {_id: "4", text: "Filing annual corporate income taxes"}],
        correctOptionIds: ["1"],
        explanation: "Onboarding welcomes, educates, and socializes new employees into organization workflows and culture."
      },
      {
        questionText: "Which conflict resolution strategy prioritizes finding a mutually beneficial win-win outcome for all parties?",
        options: [{_id: "1", text: "Competing / Forcing"}, {_id: "2", text: "Collaborating / Problem Solving"}, {_id: "3", text: "Avoiding / Withdrawing"}, {_id: "4", text: "Accommodating / Smoothing"}],
        correctOptionIds: ["2"],
        explanation: "Collaborating focuses on integrating both parties' concerns to achieve an optimal win-win resolution."
      },
      {
        questionText: "What is the primary purpose of a 'Succession Plan' in enterprise human capital management?",
        options: [{_id: "1", text: "To systematically identify and develop high-potential employees to fill key leadership roles when vacancies occur"}, {_id: "2", text: "To automate monthly utility bill payments"}, {_id: "3", text: "To decommission legacy factory machinery"}, {_id: "4", text: "To file patent trademark applications"}],
        correctOptionIds: ["1"],
        explanation: "Succession planning ensures leadership continuity by grooming internal talent for critical executive roles."
      },
      {
        questionText: "In labor relations, what is 'Collective Bargaining'?",
        options: [{_id: "1", text: "Negotiation process between employers and a trade union representing workers regarding wages and conditions"}, {_id: "2", text: "Purchasing bulk office supplies at discount rates"}, {_id: "3", text: "A group job interview technique"}, {_id: "4", text: "Calculating annual inventory depreciation"}],
        correctOptionIds: ["1"],
        explanation: "Collective bargaining is formal negotiations between employer leadership and labor union representatives."
      }
    ]
  },
  {
    title: "Corporate Financial Management & Business Valuation",
    slug: "corporate-financial-management",
    category: "BBA",
    description: "Managerial finance evaluating capital budgeting (NPV, IRR), weighted average cost of capital (WACC), working capital optimization, capital structure, and dividend policies.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Time Value of Money (TVM) & Discounted Cash Flows (DCF)",
      "Capital Budgeting Techniques: NPV, IRR, Payback Period & Profitability Index",
      "Cost of Capital & Weighted Average Cost of Capital (WACC)",
      "Working Capital Management, Cash Conversion Cycle & Capital Structure"
    ],
    questions: [
      {
        questionText: "What capital budgeting metric evaluates projects by discounting future cash flows at the required rate of return and subtracting the initial investment?",
        options: [{_id: "1", text: "Net Present Value (NPV)"}, {_id: "2", text: "Accounting Rate of Return (ARR)"}, {_id: "3", text: "Simple Payback Period"}, {_id: "4", text: "Operating Margin"}],
        correctOptionIds: ["1"],
        explanation: "Net Present Value (NPV) measures project value creation by comparing discounted inflows against initial capital outlays."
      },
      {
        questionText: "What does the Internal Rate of Return (IRR) represent in corporate finance?",
        options: [{_id: "1", text: "The discount rate that sets the Net Present Value (NPV) of a project exactly to zero"}, {_id: "2", text: "The statutory corporate tax rate"}, {_id: "3", text: "The average interest rate charged on bank overdrafts"}, {_id: "4", text: "The percentage of profits paid out as dividends"}],
        correctOptionIds: ["1"],
        explanation: "IRR is the break-even discount rate where expected project cash inflows equal the initial investment (NPV = 0)."
      },
      {
        questionText: "What does 'WACC' stand for in financial management and valuation?",
        options: [{_id: "1", text: "Weighted Average Cost of Capital"}, {_id: "2", text: "Working Asset Credit Control"}, {_id: "3", text: "Weekly Accounting Cash Count"}, {_id: "4", text: "World Association of Corporate Controllers"}],
        correctOptionIds: ["1"],
        explanation: "Weighted Average Cost of Capital (WACC) represents the blended cost of debt and equity financing."
      },
      {
        questionText: "How is 'Working Capital' mathematically calculated on a company's balance sheet?",
        options: [{_id: "1", text: "Current Assets - Current Liabilities"}, {_id: "2", text: "Total Revenue - Operating Expenses"}, {_id: "3", text: "Long-term Debt + Shareholder Equity"}, {_id: "4", text: "Gross Margin / Cost of Goods Sold"}],
        correctOptionIds: ["1"],
        explanation: "Working Capital = Current Assets - Current Liabilities; it reflects short-term liquidity and operational health."
      },
      {
        questionText: "According to the Time Value of Money principle, why is a rupee received today worth more than a rupee received in the future?",
        options: [{_id: "1", text: "Because money today can be invested to earn returns, and inflation erodes future purchasing power"}, {_id: "2", text: "Because older paper currency weighs more"}, {_id: "3", text: "Because banks close on weekends"}, {_id: "4", text: "Because future years have fewer days"}],
        correctOptionIds: ["1"],
        explanation: "A sum in hand today has greater earning potential (interest/investment) and avoids future inflation erosion."
      },
      {
        questionText: "What is the primary risk associated with a high Debt-to-Equity ratio (high financial leverage)?",
        options: [{_id: "1", text: "Increased financial distress and bankruptcy risk due to fixed interest payment obligations"}, {_id: "2", text: "Reduction in corporate brand trademark value"}, {_id: "3", text: "Lower product production volumes"}, {_id: "4", text: "Automatic delisting from commercial directories"}],
        correctOptionIds: ["1"],
        explanation: "High leverage magnifies fixed interest burdens, increasing insolvency risks during economic downturns."
      },
      {
        questionText: "What does the 'Quick Ratio' (Acid-Test Ratio) exclude from Current Assets to measure immediate liquidity?",
        options: [{_id: "1", text: "Cash and Bank balances"}, {_id: "2", text: "Inventory (Stock) and Prepaid Expenses"}, {_id: "3", text: "Marketable Securities"}, {_id: "4", text: "Accounts Receivable"}],
        correctOptionIds: ["2"],
        explanation: "The Quick Ratio excludes illiquid inventory and prepaid expenses to assess strict short-term solvency."
      },
      {
        questionText: "What does the Capital Asset Pricing Model (CAPM) calculate for an equity investment?",
        options: [{_id: "1", text: "Expected return on equity based on risk-free rate, market risk premium, and systematic risk (Beta)"}, {_id: "2", text: "Daily depreciation of factory buildings"}, {_id: "3", text: "Foreign exchange transfer commission fees"}, {_id: "4", text: "Monthly employee retirement benefits"}],
        correctOptionIds: ["1"],
        explanation: "CAPM calculates expected equity returns using: Er = Rf + Beta * (Rm - Rf)."
      },
      {
        questionText: "What does 'EBITDA' stand for in financial earnings reports?",
        options: [{_id: "1", text: "Earnings Before Interest, Taxes, Depreciation, and Amortization"}, {_id: "2", text: "Equity Balance Including Tax Deductions and Assets"}, {_id: "3", text: "Enterprise Business Income Through Domestic Accounts"}, {_id: "4", text: "Estimated Bank Inflows To Disburse Annually"}],
        correctOptionIds: ["1"],
        explanation: "EBITDA measures core operating profitability before non-operating expenses and capital structure costs."
      },
      {
        questionText: "What is an enterprise 'Share Buyback' (Stock Repurchase)?",
        options: [{_id: "1", text: "When a corporation buys back its own outstanding shares from the open market to return capital to investors"}, {_id: "2", text: "When employees purchase inventory at wholesale rates"}, {_id: "3", text: "When banks seize collateral after default"}, {_id: "4", text: "When an IPO is cancelled before listing"}],
        correctOptionIds: ["1"],
        explanation: "A share buyback absorbs outstanding shares, increasing EPS and returning surplus cash to shareholders."
      }
    ]
  },

  // ==========================================
  // B.COM COURSES (4 COURSES)
  // ==========================================
  {
    title: "Financial Analytics, Forensic Accounting & Quantitative Models",
    slug: "financial-analytics-forensic-accounting",
    category: "B.Com",
    description: "Rigorous corporate accounting analytics evaluating Benford's Law forensic fraud detection, Altman Z-Score insolvency prediction, Cash Flow statement forensics, and audit evidence.",
    durationMinutes: 20,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Forensic Auditing & Benford's Law Anomaly Screening",
      "Financial Distress Modeling (Altman Z-Score & Beneish M-Score)",
      "Cash Flow Statement Forensics & Revenue Manipulation Detection",
      "Statutory Audit Evidence & Internal Financial Controls (IFC)"
    ],
    questions: [
      {
        questionText: "What mathematical law analyzes first-digit frequency distributions in accounting ledgers to detect artificial manipulation?",
        options: [{_id: "1", text: "Moore's Law"}, {_id: "2", text: "Benford's Law"}, {_id: "3", text: "Ohm's Law"}, {_id: "4", text: "Zipf's Law"}],
        correctOptionIds: ["2"],
        explanation: "Benford's Law states that in naturally occurring numerical datasets, digit 1 appears as the leading digit ~30.1% of the time."
      },
      {
        questionText: "What does the Altman Z-Score model assess in corporate financial health?",
        options: [{_id: "1", text: "The probability of a firm entering corporate bankruptcy or financial distress"}, {_id: "2", text: "Brand reputation on consumer review portals"}, {_id: "3", text: "Employee retention over a 5-year tenure"}, {_id: "4", text: "Daily stock exchange trading volume"}],
        correctOptionIds: ["1"],
        explanation: "Edward Altman's Z-Score uses five financial ratios to predict corporate bankruptcy probability."
      },
      {
        questionText: "What constitutes the 'Fraud Triangle' proposed by criminologist Donald Cressey?",
        options: [{_id: "1", text: "Pressure (Incentive), Opportunity, and Rationalization"}, {_id: "2", text: "Greed, Speed, and Ignorance"}, {_id: "3", text: "Debt, Inflation, and Taxes"}, {_id: "4", text: "Technology, Passwords, and Access"}],
        correctOptionIds: ["1"],
        explanation: "The Fraud Triangle model identifies Pressure, Opportunity, and Rationalization as the three conditions present in occupational fraud."
      },
      {
        questionText: "What accounting malpractice involves recording future anticipated revenue into current periods before delivery?",
        options: [{_id: "1", text: "Premature Revenue Recognition"}, {_id: "2", text: "Depreciation Acceleration"}, {_id: "3", text: "LIFO Inventory Valuation"}, {_id: "4", text: "Goodwill Amortization"}],
        correctOptionIds: ["1"],
        explanation: "Premature revenue recognition violates GAAP accrual matching principles to artificially inflate current earnings."
      },
      {
        questionText: "What financial ratio compares Cash Flow from Operations directly against Net Income to evaluate earnings quality?",
        options: [{_id: "1", text: "CFO-to-Net-Income Ratio (Quality of Earnings)"}, {_id: "2", text: "Inventory Turnover"}, {_id: "3", text: "Gross Profit Margin"}, {_id: "4", text: "Current Ratio"}],
        correctOptionIds: ["1"],
        explanation: "A persistent divergence between Operating Cash Flow and Net Income is a classic indicator of aggressive accrual manipulation."
      },
      {
        questionText: "Which forensic metric is calculated by the Beneish M-Score to detect fraudulent earnings manipulation?",
        options: [{_id: "1", text: "Days Sales in Receivables Index (DSRI) & Gross Margin Index (GMI)"}, {_id: "2", text: "Social media sentiment scores"}, {_id: "3", text: "Server response time in milliseconds"}, {_id: "4", text: "Warehouse square footage metrics"}],
        correctOptionIds: ["1"],
        explanation: "The Beneish M-Score uses financial indices including DSRI, GMI, and AQI to detect financial statement manipulation."
      },
      {
        questionText: "In financial forensics, what is 'Channel Stuffing'?",
        options: [{_id: "1", text: "Forcing distributors to accept more inventory than they can sell to artificially inflate vendor revenue"}, {_id: "2", text: "Creating multiple television advertising channels"}, {_id: "3", text: "Overfilling physical delivery trucks"}, {_id: "4", text: "Combining duplicate customer records in CRM"}],
        correctOptionIds: ["1"],
        explanation: "Channel stuffing artificially inflates accounts receivable and sales by forcing excess products onto distributors."
      },
      {
        questionText: "Under international auditing standards, which document confirms independent third-party bank balances?",
        options: [{_id: "1", text: "External Bank Confirmation Letter"}, {_id: "2", text: "Internal petty cash voucher"}, {_id: "3", text: "Sales invoice copy"}, {_id: "4", text: "Employee badge swipe report"}],
        correctOptionIds: ["1"],
        explanation: "Direct external bank confirmations provide reliable third-party corroborative audit evidence."
      },
      {
        questionText: "What is 'Lapping' in accounts receivable fraud?",
        options: [{_id: "1", text: "Stealing payment from customer A, then concealing it using subsequent payment from customer B"}, {_id: "2", text: "Running audit software tests in repeating loops"}, {_id: "3", text: "Overpaying vendor invoices to receive personal credit card points"}, {_id: "4", text: "Double-counting physical inventory boxes"}],
        correctOptionIds: ["1"],
        explanation: "Lapping is an embezzlement scheme where cash receipts are stolen and covered by subsequent customer payments."
      },
      {
        questionText: "What does 'SOX' (Sarbanes-Oxley Act) Section 404 mandate for public enterprise governance?",
        options: [{_id: "1", text: "Management and auditors must assess and report on the effectiveness of Internal Controls over Financial Reporting (ICFR)"}, {_id: "2", text: "All corporate servers must run open-source Linux"}, {_id: "3", text: "Corporations must donate 5% of net profit to charity"}, {_id: "4", text: "Annual shareholder meetings must be held outdoors"}],
        correctOptionIds: ["1"],
        explanation: "SOX Section 404 requires rigorous internal controls over financial reporting to protect investors from accounting scandals."
      }
    ]
  },
  {
    title: "Corporate Accounting & Financial Reporting Standards",
    slug: "corporate-accounting-financial-reporting",
    category: "B.Com",
    description: "Core corporate accounting practice covering Ind AS / IFRS standards, preparation of corporate Balance Sheets, Profit & Loss accounts, Cash Flow Statements, and share capital transactions.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Accounting for Share Capital: Issue, Forfeiture & Reissue of Shares",
      "Preparation of Company Financial Statements (Schedule III)",
      "Cash Flow Statement Preparation as per Ind AS 7 / AS 3",
      "Accounting Standards (Ind AS / IFRS) & Depreciation Methods"
    ],
    questions: [
      {
        questionText: "According to the Companies Act 2013, which Schedule governs the presentation format for company Balance Sheets and Profit & Loss statements?",
        options: [{_id: "1", text: "Schedule I"}, {_id: "2", text: "Schedule III"}, {_id: "3", text: "Schedule V"}, {_id: "4", text: "Schedule VII"}],
        correctOptionIds: ["2"],
        explanation: "Schedule III of the Companies Act 2013 provides the mandatory format for corporate financial reporting in India."
      },
      {
        questionText: "When shares are forfeited for non-payment of call money, which account is debited with the called-up amount?",
        options: [{_id: "1", text: "Share Capital Account"}, {_id: "2", text: "Calls-in-Arrears Account"}, {_id: "3", text: "Share Forfeiture Account"}, {_id: "4", text: "Securities Premium Account"}],
        correctOptionIds: ["1"],
        explanation: "Upon forfeiture, the Share Capital Account is debited with the total called-up face value of the forfeited shares."
      },
      {
        questionText: "Which Accounting Standard (Ind AS) governs the preparation and presentation of the Statement of Cash Flows?",
        options: [{_id: "1", text: "Ind AS 2"}, {_id: "2", text: "Ind AS 7"}, {_id: "3", text: "Ind AS 16"}, {_id: "4", text: "Ind AS 33"}],
        correctOptionIds: ["2"],
        explanation: "Ind AS 7 (equivalent to IAS 7 / AS 3) prescribes standards for reporting Operating, Investing, and Financing cash flows."
      },
      {
        questionText: "How are dividends paid to equity shareholders classified on the Statement of Cash Flows?",
        options: [{_id: "1", text: "Operating Activity"}, {_id: "2", text: "Financing Activity"}, {_id: "3", text: "Investing Activity"}, {_id: "4", text: "Non-cash item"}],
        correctOptionIds: ["2"],
        explanation: "Dividend payments represent cash returns to capital providers and are categorized under Financing Activities."
      },
      {
        questionText: "What accounting principle requires that expenses incurred to generate revenue must be recognized in the same accounting period as the revenue?",
        options: [{_id: "1", text: "Matching Principle"}, {_id: "2", text: "Conservatism Principle"}, {_id: "3", text: "Cost Principle"}, {_id: "4", text: "Materiality Principle"}],
        correctOptionIds: ["1"],
        explanation: "The Matching Principle ensures that revenues and related expenses are paired in the period they occur."
      },
      {
        questionText: "Which account is credited when forfeited shares are reissued at a profit (gain on reissue)?",
        options: [{_id: "1", text: "General Reserve"}, {_id: "2", text: "Capital Reserve Account"}, {_id: "3", text: "Profit & Loss Account"}, {_id: "4", text: "Securities Premium"}],
        correctOptionIds: ["2"],
        explanation: "Net surplus generated on the reissue of forfeited shares represents capital profit, transferred to the Capital Reserve Account."
      },
      {
        questionText: "Under Ind AS 16, what method of depreciation writes off equal depreciation expense each year across the asset's useful life?",
        options: [{_id: "1", text: "Straight-Line Method (SLM)"}, {_id: "2", text: "Written Down Value (WDV)"}, {_id: "3", text: "Sum-of-the-Years'-Digits"}, {_id: "4", text: "Units of Production"}],
        correctOptionIds: ["1"],
        explanation: "Straight-Line Method (SLM) allocates equal depreciation amounts across each year of an asset's useful operational life."
      },
      {
        questionText: "What is 'Goodwill' in corporate accounting when acquired during a business combination?",
        options: [{_id: "1", text: "The excess of purchase price over the fair value of net identifiable assets acquired"}, {_id: "2", text: "A physical warehouse inventory item"}, {_id: "3", text: "Cash reserves kept in foreign banks"}, {_id: "4", text: "Unearned sales revenue"}],
        correctOptionIds: ["1"],
        explanation: "Goodwill represents intangible value (brand, synergies) paid over the net asset value in an acquisition."
      },
      {
        questionText: "What is the accounting equation governing all double-entry balance sheets?",
        options: [{_id: "1", text: "Assets = Liabilities + Equity"}, {_id: "2", text: "Assets = Revenue - Expenses"}, {_id: "3", text: "Equity = Current Assets - Bank Loans"}, {_id: "4", text: "Liabilities = Assets + Cash"}],
        correctOptionIds: ["1"],
        explanation: "The fundamental accounting equation is Assets = Liabilities + Shareholder Equity."
      },
      {
        questionText: "Which financial statement provides a snapshot of a company's financial position at a specific point in time?",
        options: [{_id: "1", text: "Profit and Loss Statement"}, {_id: "2", text: "Balance Sheet"}, {_id: "3", text: "Cash Flow Statement"}, {_id: "4", text: "Statement of Retained Earnings"}],
        correctOptionIds: ["2"],
        explanation: "The Balance Sheet reports assets, liabilities, and equity on a specific date, providing a point-in-time snapshot."
      }
    ]
  },
  {
    title: "Goods & Services Tax (GST) & Indian Taxation Practice",
    slug: "gst-taxation-laws",
    category: "B.Com",
    description: "Practical compliance and legal frameworks of Indian taxation covering GST architecture, Input Tax Credit (ITC), reverse charge, GSTR returns, and Income Tax deductions.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "GST Constitutional Framework, CGST, SGST & IGST Concept",
      "Supply: Time, Place & Value of Supply under GST",
      "Input Tax Credit (ITC) Rules, Eligibility & Reversals",
      "GST Invoicing, E-Way Bill & Filing Returns (GSTR-1, GSTR-3B)"
    ],
    questions: [
      {
        questionText: "What type of tax is the Goods and Services Tax (GST) in India?",
        options: [{_id: "1", text: "Direct Tax"}, {_id: "2", text: "Comprehensive Destination-based Indirect Tax"}, {_id: "3", text: "Local Municipality Tax only"}, {_id: "4", text: "Wealth Tax"}],
        correctOptionIds: ["2"],
        explanation: "GST is a multi-stage, destination-based indirect tax levied on the consumption of goods and services."
      },
      {
        questionText: "Which component of GST is levied by the Central Government on an inter-state supply of goods or services?",
        options: [{_id: "1", text: "CGST"}, {_id: "2", text: "SGST"}, {_id: "3", text: "IGST (Integrated GST)"}, {_id: "4", text: "UTGST"}],
        correctOptionIds: ["3"],
        explanation: "Integrated Goods and Services Tax (IGST) is levied on all inter-state supplies and imports into India."
      },
      {
        questionText: "What mechanism prevents cascading (tax on tax) under GST?",
        options: [{_id: "1", text: "Input Tax Credit (ITC)"}, {_id: "2", text: "Reverse Charge Mechanism"}, {_id: "3", text: "Composition Levy"}, {_id: "4", text: "TDS deduction"}],
        correctOptionIds: ["1"],
        explanation: "Input Tax Credit (ITC) allows businesses to deduct tax paid on inputs from tax payable on outward supplies."
      },
      {
        questionText: "What is the threshold limit for generating an electronic E-Way Bill for the movement of goods in India?",
        options: [{_id: "1", text: "Rs. 10,000"}, {_id: "2", text: "Rs. 25,000"}, {_id: "3", text: "Rs. 50,000"}, {_id: "4", text: "Rs. 1,00,000"}],
        correctOptionIds: ["3"],
        explanation: "An E-Way Bill is mandatory for inter-state consignment values exceeding Rs. 50,000."
      },
      {
        questionText: "What is the Reverse Charge Mechanism (RCM) under GST?",
        options: [{_id: "1", text: "The liability to pay tax is on the recipient of goods/services rather than the supplier"}, {_id: "2", text: "The government refunds taxes automatically within 24 hours"}, {_id: "3", text: "Taxes are doubled on luxury automobiles"}, {_id: "4", text: "A mechanism to cancel business licenses"}],
        correctOptionIds: ["1"],
        explanation: "Under RCM, the recipient of goods or services pays GST directly to the government instead of the supplier."
      },
      {
        questionText: "Which GST return is a monthly summary return containing details of outward supplies, input tax credit, and tax payment?",
        options: [{_id: "1", text: "GSTR-1"}, {_id: "2", text: "GSTR-3B"}, {_id: "3", text: "GSTR-9"}, {_id: "4", text: "GSTR-4"}],
        correctOptionIds: ["2"],
        explanation: "GSTR-3B is a monthly self-declaration summary return used to pay tax liabilities and claim ITC."
      },
      {
        questionText: "How many digits make up a standard GST Identification Number (GSTIN) in India?",
        options: [{_id: "1", text: "10 digits"}, {_id: "2", text: "12 digits"}, {_id: "3", text: "15 alphanumeric characters"}, {_id: "4", text: "16 digits"}],
        correctOptionIds: ["3"],
        explanation: "A GSTIN consists of 15 alphanumeric characters, beginning with a 2-digit state code followed by the 10-digit PAN."
      },
      {
        questionText: "Which body chaired by the Union Finance Minister makes recommendations on GST rates and legal provisions?",
        options: [{_id: "1", text: "Reserve Bank of India (RBI)"}, {_id: "2", text: "GST Council"}, {_id: "3", text: "NITI Aayog"}, {_id: "4", text: "Law Commission of India"}],
        correctOptionIds: ["2"],
        explanation: "The GST Council, created under Article 279A of the Indian Constitution, governs GST policies and tax slabs."
      },
      {
        questionText: "What does 'HSN Code' stand for in GST invoicing?",
        options: [{_id: "1", text: "Harmonized System of Nomenclature"}, {_id: "2", text: "High Standards Network"}, {_id: "3", text: "Home State Number"}, {_id: "4", text: "Handling Shipment Notice"}],
        correctOptionIds: ["1"],
        explanation: "HSN (Harmonized System of Nomenclature) is an internationally standardized system of names and numbers to classify goods."
      },
      {
        questionText: "Which deduction under Chapter VI-A of the Income Tax Act allows up to Rs. 1,50,000 for specified investments (PPF, ELSS, EPF)?",
        options: [{_id: "1", text: "Section 80D"}, {_id: "2", text: "Section 80C"}, {_id: "3", text: "Section 80G"}, {_id: "4", text: "Section 80TTA"}],
        correctOptionIds: ["2"],
        explanation: "Section 80C provides tax deductions up to Rs. 1.5 lakh for eligible investments like PPF, EPF, and life insurance premiums."
      }
    ]
  },
  {
    title: "Auditing Principles & Enterprise Internal Assurance",
    slug: "auditing-assurance-standards",
    category: "B.Com",
    description: "Statutory auditing frameworks, audit planning, internal control testing, vouching, verification of assets and liabilities, and auditor reporting responsibilities.",
    durationMinutes: 15,
    questionCount: 10,
    passingPercentage: 60,
    maxAttempts: 1,
    status: "PUBLISHED",
    syllabus: [
      "Nature, Scope & Objectives of Audit (Standards on Auditing - SAs)",
      "Audit Planning, Risk Assessment & Materiality in Financial Statements",
      "Internal Control Systems, Internal Check & Audit Trail Evaluation",
      "Vouching, Verification of Assets/Liabilities & Types of Audit Reports"
    ],
    questions: [
      {
        questionText: "What is the primary objective of an independent statutory audit of financial statements?",
        options: [{_id: "1", text: "To express an opinion on whether the financial statements present a true and fair view"}, {_id: "2", text: "To prepare balance sheet ledgers for the company"}, {_id: "3", text: "To guarantee 100% absence of any immaterial errors"}, {_id: "4", text: "To calculate annual staff salary bonuses"}],
        correctOptionIds: ["1"],
        explanation: "An auditor evaluates financial statements to express an objective opinion on their true and fair view."
      },
      {
        questionText: "What is the act of checking documentary evidence supporting entries recorded in books of accounts called?",
        options: [{_id: "1", text: "Vouching"}, {_id: "2", text: "Verification"}, {_id: "3", text: "Valuation"}, {_id: "4", text: "Posting"}],
        correctOptionIds: ["1"],
        explanation: "Vouching is the examination of documentary evidence (invoices, receipts, vouchers) supporting transactions."
      },
      {
        questionText: "What type of audit opinion is issued when the auditor concludes that financial statements as a whole are materially misstated and pervasive?",
        options: [{_id: "1", text: "Unmodified / Clean Opinion"}, {_id: "2", text: "Qualified Opinion"}, {_id: "3", text: "Adverse Opinion"}, {_id: "4", text: "Disclaimer of Opinion"}],
        correctOptionIds: ["3"],
        explanation: "An Adverse Opinion is issued when misstatements are both material and pervasive to the financial statements."
      },
      {
        questionText: "What is 'Audit Risk' in professional auditing practice?",
        options: [{_id: "1", text: "The risk that the auditor expresses an inappropriate audit opinion when financial statements are materially misstated"}, {_id: "2", text: "The risk of office computers catching fire"}, {_id: "3", text: "The risk of declining market stock prices"}, {_id: "4", text: "The risk of client failing to pay audit fees"}],
        correctOptionIds: ["1"],
        explanation: "Audit Risk comprises Inherent Risk, Control Risk, and Detection Risk."
      },
      {
        questionText: "What is the purpose of 'Internal Check' within an organization's internal controls?",
        options: [{_id: "1", text: "Arranging work so that one employee's work is automatically and independently checked by another employee"}, {_id: "2", text: "Hiring external police detectives to observe staff"}, {_id: "3", text: "Installing CCTV cameras in conference rooms"}, {_id: "4", text: "Double-printing sales receipts"}],
        correctOptionIds: ["1"],
        explanation: "Internal check divides duties so that no single employee handles a transaction from initiation to completion."
      },
      {
        questionText: "Which document represents the formal written record of audit procedures, evidence obtained, and conclusions reached by the auditor?",
        options: [{_id: "1", text: "Audit Working Papers (Audit Documentation)"}, {_id: "2", text: "Company Annual Report brochure"}, {_id: "3", text: "Vendor product catalog"}, {_id: "4", text: "Employee attendance register"}],
        correctOptionIds: ["1"],
        explanation: "Audit working papers (SA 230) document the planning, evidence, tests, and findings supporting the audit opinion."
      },
      {
        questionText: "What is the distinction between 'Verification' and 'Valuation' of assets?",
        options: [{_id: "1", text: "Verification confirms title, ownership, and existence; valuation confirms proper financial monetary worth"}, {_id: "2", text: "Verification applies only to cash; valuation applies to employees"}, {_id: "3", text: "They are completely identical concepts"}, {_id: "4", text: "Valuation must be performed exclusively by banks"}],
        correctOptionIds: ["1"],
        explanation: "Verification confirms that assets exist and are owned by the firm; valuation confirms appropriate accounting value."
      },
      {
        questionText: "Under Section 139 of the Companies Act 2013, what is the term of appointment for an individual statutory auditor in a company?",
        options: [{_id: "1", text: "1 consecutive term of 5 years"}, {_id: "2", text: "10 years without break"}, {_id: "3", text: "1 single month"}, {_id: "4", text: "Lifetime appointment"}],
        correctOptionIds: ["1"],
        explanation: "An individual auditor can hold office for one term of 5 consecutive years, subject to cooling-off rules."
      },
      {
        questionText: "What is a 'Disclaimer of Opinion' in an auditor's report?",
        options: [{_id: "1", text: "When the auditor is unable to obtain sufficient appropriate audit evidence and the possible effects are material and pervasive"}, {_id: "2", text: "When the auditor recommends investing in company shares"}, {_id: "3", text: "When the company earns record quarterly profit"}, {_id: "4", text: "When the audit is performed free of cost"}],
        correctOptionIds: ["1"],
        explanation: "A Disclaimer of Opinion is issued when limitation on scope prevents the auditor from forming an audit opinion."
      },
      {
        questionText: "What principle requires an auditor to maintain an attitude that includes a questioning mind and critical assessment of audit evidence?",
        options: [{_id: "1", text: "Professional Skepticism"}, {_id: "2", text: "Blind Trust"}, {_id: "3", text: "Commercial Expediency"}, {_id: "4", text: "Casual Observation"}],
        correctOptionIds: ["1"],
        explanation: "Professional Skepticism (SA 200) requires alertness to conditions indicating potential misstatements or fraud."
      }
    ]
  }
];

function seed() {
  const database = db.getSiblingDB("ats_skill_certification");
  print(">>> Starting direct database seed for all 20 professional courses...");

  let updatedCourses = 0;
  let insertedQuestions = 0;

  for (const item of coursesData) {
    const existing = database.courses.findOne({ slug: item.slug });
    let courseId;

    if (existing) {
      courseId = existing._id.toString();
      database.courses.updateOne(
        { _id: existing._id },
        {
          $set: {
            title: item.title,
            category: item.category,
            description: item.description,
            syllabus: item.syllabus,
            durationMinutes: item.durationMinutes,
            questionCount: item.questionCount,
            passingPercentage: item.passingPercentage,
            maxAttempts: item.maxAttempts,
            status: "PUBLISHED",
            updatedAt: new Date()
          }
        }
      );
      print(`>>> Updated existing course: [${item.category}] ${item.title}`);
    } else {
      const newCourseId = new ObjectId().toString();
      courseId = newCourseId;
      database.courses.insertOne({
        _id: newCourseId,
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: item.description,
        syllabus: item.syllabus,
        durationMinutes: item.durationMinutes,
        questionCount: item.questionCount,
        passingPercentage: item.passingPercentage,
        maxAttempts: item.maxAttempts,
        status: "PUBLISHED",
        createdAt: new Date(),
        updatedAt: new Date(),
        _class: "com.atsskill.certification.model.Course"
      });
      print(`>>> Inserted new course: [${item.category}] ${item.title}`);
    }
    updatedCourses++;

    // Seed questions if fewer than required
    const currentQCount = database.questions.countDocuments({ courseId: courseId });
    if (currentQCount < item.questions.length) {
      // Remove old incomplete questions to re-seed clean set
      database.questions.deleteMany({ courseId: courseId });
      
      const qDocs = item.questions.map(q => ({
        _id: new ObjectId().toString(),
        courseId: courseId,
        questionText: q.questionText,
        options: q.options,
        correctOptionIds: q.correctOptionIds,
        explanation: q.explanation,
        difficulty: "MEDIUM",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        _class: "com.atsskill.certification.model.Question"
      }));

      database.questions.insertMany(qDocs);
      insertedQuestions += qDocs.length;
      print(`    -> Seeded ${qDocs.length} MCQs for course [${item.title}]`);
    } else {
      print(`    -> Already has ${currentQCount} MCQs for course [${item.title}]`);
    }
  }

  print(`\n>>> SEED COMPLETE!`);
  print(`Total courses active: ${database.courses.countDocuments({ status: "PUBLISHED" })}`);
  print(`Total questions in database: ${database.questions.countDocuments({})}`);
}

seed();
