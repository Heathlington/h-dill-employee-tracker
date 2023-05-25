// Import and require inquirer
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // Add MySQL password
      password: '1234',
      database: 'empTracker_db'
    },
    console.log(`Connected to the empTracker_db database.`)
  );

  //A function that asks what the user wants to do - using inquirer
  //function: view an employee 
  //uses db.query Select * FROM employee    console.table(rows)
  const viewEmp =() => {
db.query("SELECT * FROM employee", (err, rows) =>{
    if (err){
        console.log(err)
    }
    console.table(rows)
    //run main menu 
})
  }

  const viewRoles =() => {
    db.query("SELECT * FROM role", (err, rows) =>{
        if (err){
            console.log(err)
        }
        console.table(rows)
        //run main menu 
    })
  }

    const viewDept =() => {
    db.query("SELECT * FROM department", (err, rows) =>{
        if (err){
            console.log(err)
        }
        console.table(rows)
        //run main menu 
    })
  }
  const addEmp =() => {
  db.query("SELECT * FROM employee", (err, rows) =>{
    if (err){
        console.log(err)
    }
    console.table(rows)
    //run main menu 
})
  }

  const addRoles =() => {
    db.query("SELECT * FROM role", (err, rows) =>{
        if (err){
            console.log(err)
        }
        console.table(rows)
        //run main menu 
    })
  }

  const addDept =() => {
    db.query("SELECT * FROM department", (err, rows) =>{
        if (err){
            console.log(err)
        }
        console.table(rows)
        //run main menu 
    })
  }

  const updateRole =() => {
    db.query("SELECT * FROM role", (err, rows) =>{
        if (err){
            console.log(err)
        }
        console.table(rows)
        //run main menu 
    })
  }

  

