// Import and require inquirer
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');
const { async } = require('rxjs');

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

const opsMenu = async () => {
  const data = await inquirer.prompt([
   {
    type: "list",
    name: "choice",
    choices: ["view employees", "view roles", "view departments", "add role", "add department", "add employee", "update employee role"]
   } 
  ])
  //based off wha the user selects- run corresponding function
  switch(data.choice){
    case "view employees":
      viewEmp()
      break
    case "view roles":
      viewRoles()
      break
    case "view department":
      viewDept()
      break
    case "add employees":
      addEmp()
      break
    case "add roles":
      addRoles()
      break
    case "add department":
      addDept()
      break
    case "update employee role":
      updateRole()
      break  
  }
}
//A function that asks what the user wants to do - using inquirer
//function: view an employee 
//uses db.query Select * FROM employee    console.table(rows)
const viewEmp = () => {
  db.query("SELECT * FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu()
  })
}

const viewRoles = () => {
  db.query("SELECT * FROM role JOIN department ON role.department_id=department.id", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu()
  })
}

const viewDept = () => {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu() 
  })
}
const addEmp = () => {
  db.query("SELECT * FROM employee", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu() 
  })
}

const addRoles = () => {
  db.query("SELECT * FROM role", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu() 
  })
}

const addDept = async() => {
  const response=await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Name of new department?"
    }
  ])

  db.query("INSERT INTO department SET ?", response, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu()
  })
}

const updateRole = () => {
  db.query("SELECT * FROM role", (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu()
  })
}

opsMenu()
