//Write a message to the console
console.log("Hello Back to School!");

// Create some constants and variables that we will use later
// to find out about the structure of the workbook
const viz = document.getElementById("tableauViz");
// Tell JS which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");
const filterRangeButton = document.getElementById("filter_range");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;

// To make our job easier going forward, we are going to log all the information about the workbook
// Let's make a function that allows us to do this.
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  //Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(
      `The sheet with index [${index}] is: "${element.name}" it is a ${element.sheetType}`
    );
  });

  // We are normally only interested in interacting with the active sheet (tab), so lets get that
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // List all of the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index [${index}] is: "${worksheetName}"`);
  });
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
}

// make a function for the oregon button
function oregonWashFunction() {
  // print the button value
  console.log(oregonWashingtonButton.value);
  // filter the states in all the sheets in the active sheet
  listSheets.forEach((element) => {
    element.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  });
}

// make a function for the oregon button
function clearFilterFunction() {
  // print the button value
  console.log(clearFilterButton.value);
  // filter the states in all the sheets in the active sheet
  listSheets.forEach((element) => {
    element.clearFilterAsync("State");
  });
}

function unDo() {
  //log what's pressed
  console.log(undoButton.value);

  //Undo last action to viz
  viz.undoAsync();
}

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});
// Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearFilterFunction);
undoButton.addEventListener("click", unDo);
