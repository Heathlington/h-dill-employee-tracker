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
    case "view departments":
      viewDept()
      break
    case "add employee":
      addEmp()
      break
    case "add role":
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
const addEmp = async() => {
  const empl = await db.promise().query("SELECT id AS value, last_name AS name FROM employee")
  const role = await db.promise().query("SELECT id AS value, title AS name FROM role")
  const response=await inquirer.prompt([
    {
      type:"input",
      name:"first_name",
      message:"What is the new employee's first name?"
    },{
      type:"input",
      name:"last_name",
      message:"What is the new employee's last name?" 
    },{
      type: "list",
      name: "role_id",
      message: "What is the new role?",
      choices: role[0]
    },{
      type: "list",
      name: "manager_id",
      message: "Who is the new employees manager?",
      choices: empl[0]
    }
  ])
  db.query("INSERT INTO employee SET ?", response,  (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu() 
  })
}

const addRoles = async() => {
  const dept = await db.promise().query("SELECT id AS value, name As name FROM department")
  const response=await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Name of new role?"
    },{
      type: "input",
      name: "salary",
      message: "What is the salary for the new role?"
    },{
      type: "list",
      name: "department_id",
      message: "Which department is the new role in?",
      choices: dept[0]
    }
  ])
  db.query("INSERT INTO role SET ?", response, (err, rows) => {
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

const updateRole = async() => {
  const empl = await db.promise().query("SELECT id AS value, last_name AS name FROM employee")
  const role = await db.promise().query("SELECT id AS value, title AS name FROM role")
  const response=await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee would you like to change?",
      choices: empl[0]
    },
    {
      type: "list",
      name: "role_id",
      message: "What role would you like to change to?",
      choices: role[0]
    }
  ])
  db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id], (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    opsMenu()
  })
}

opsMenu()
