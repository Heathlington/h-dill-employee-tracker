INSERT INTO department (department_id)
VALUES ("Sales"),
       ("Engineering"),
       ("Finanace"),
       ("Legal");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Lead", 100000),
       (1, "Salesperson", 80000 ),
       (2, "Lead Engineer", 150000),
       (2, "Software Engineer", 120000),
       (1, "Account Manager", 160000),
       (3, "Accountant", 125000),
       (4, "Legal Team Lead", 250000),
       (4, "Lawyer Lead", 200000);

INSERT INTO employee (manager_id, first_name, last_name, role_id)
VALUES (NULL,"John", "Doe", 1),
       (1, "Mike", "Chan", 2 ),
       (2, )

       