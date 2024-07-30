#! /usr/bin/env node
import inquirer from  "inquirer"

class Student{
    static counter = 10000;
    id: number;
    name: string;
    course: string[];  
    balance:number

    constructor(name:string){
        this.id = Student.counter++;
        this.name = name;
        this.course = [];
        this.balance = 100;
    }
    // method to enroll a student in a course i
    enroll_course(course: string){
        this.course.push(course);
    }

      //   Method to view a student balance
      view_balance(){
        console.log(`balance for ${this.name} : ${this.balance}`)
      } 
      // method to pay student fees
      pay_fees(amount : number){
        this.balance -= amount;
        console.log(`$${amount} fees paid sccessfullly for ${this.name}`);
        console.log(`Remaning Balance : $${this.balance}`);
        
      }

    // Meyhod to display
    show_status(){
        console.log(`id:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`courses:${this.course}`);
        console.log(`balance:${this.balance}`);      
    }
}

// Difining a Student_managner clss to manage student
class Student_manager{
  students: Student[]

    constructor(){
      this.students =[];
   
  }

  // Method to add a new Student
  add_students(name:string){
    let student = new Student(name);
    this.students.push(student);
    console.log(`Student:${name} added succesfully. Student ID:${student.id}`);
  }

  // Method to enroll a student in a course
  enroll_student(student_id: number, course: string){
     let student = this.find_student(student_id);
     if(student){
      student.enroll_course(course);
      console.log(`${student.name} enrolled in ${course} successfully`);
     }
  }
   // Method tp view a student balance
   view_student_balance(student_id: number){
    let student = this.find_student(student_id);
    if (student){
      student.view_balance()
     }
    else{
      console.log("student not found. please enter a correct student ID"); 
     }
  }

   // Method to pay student fees

   pay_student_fees(student_id:number,amount:number){
    let student = this.find_student(student_id);
    if(student){
       student.pay_fees(amount);
    }
  }

  // Method to Disply student satuts

  show_student_status(student_id:number){
    let student = this.find_student(student_id);
    if (student){
      student.show_status();
    }
  }

   // Method to find a student by  student_id
   find_student(student_id:number){
    return this.students.find(std => std.id === student_id)
  }
}

// main function to Run the program

async function main(){
  console.log("Welcome to  ^code with vandana^ -  student managemant system");
  console.log("-" .repeat(60));

  let student_manager = new Student_manager();

  // while loop to keep program running
  while(true){
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an options",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit"
        ]
      }
    ]);

    // Using Switch Case to handle user choice

    switch(choice.choice){
      case "Add Student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter a Student Name",
          }
        ]);
        student_manager.add_students(name_input.name);
        break;
      
      case "Enroll Student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter a Course Name",
          }
        ]); 
        student_manager.enroll_student(course_input.student_id, course_input.course);
        break;
    
   case "View Student Balance":
    let balance_input = await inquirer.prompt([
      {
        name: "student_id",
        type: "number",
        message: "Enter a Student ID",
      }
    ]);
    student_manager.view_student_balance(balance_input.student_id);
    break;
    
  case "Pay Fees":
    let fees_input = await inquirer.prompt([
      {
        name: "student_id",
        type: "number",
        message: " Enter a Student ID",
      },
      {
        name: "amount",
        type: "number",
        message: "Enter the amount"
      }
    ]);
    student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
     break;
       
  case "Show Status":   
      let Status_input = await inquirer.prompt([
        {
          name: "student_id",
          type: "number",
          message: "Enter a Student ID",
        }
      ]);
      student_manager.show_student_status(Status_input.student_id);
      break;

    case "Exit":
      console.log("Exiting....");
      process.exit();   
    }
  }
}

// Calling a Function
main();

