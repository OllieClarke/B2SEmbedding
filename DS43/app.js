//Write a message to the console
console.log("Hello Back to School!");

// Create some constants and variables that we will use later
// to find out about the structure of the workbook
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// To make our job easier going forward, we are going to log all the information about the workbook
// Let's make a function that allows us to do this.
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);
}

// Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
