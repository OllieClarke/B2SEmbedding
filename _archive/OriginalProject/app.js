//write something to the console
console.log("Hello Back to School!");
//set viz as a global variable
let viz;

// 1. Create a variable to store the vizContainer
// 2. Create a variable to store the dashboard options
// 3. Create a variable to store the url - if it doesn't load, might need to specify height and width
// 4. Create a variable to store the Export buttons
const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "800px",
  width: "1000px",
};
const url =
  "https://public.tableau.com/views/EmbeddingDashboardB2S/EmbeddingDashboard?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";
const exportpdfbutton = document.getElementById("exportPDF");
const exportPPTbutton = document.getElementById("exportPPT");

// Define our functions:
// initViz() loads the viz in our container
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
initViz();

// add event listeners to our buttons and viz
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);
document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

//export viz to pdf
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

//export viz to ppt
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

//get the range put in our parameters so we can filter by it
function getRangeValues() {
  const sMinValue = document.getElementById("sMinValue").value;
  const sMaxValue = document.getElementById("sMaxValue").value;
  const pMinValue = document.getElementById("pMinValue").value;
  const pMaxValue = document.getElementById("pMaxValue").value;
  //write the values to the console
  console.log(sMinValue, sMaxValue, pMinValue, pMaxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //write the sheet to the console
  console.log(sheets);
  const sheet1ToFilter = sheets[1];
  const sheet2ToFilter = sheets[0];
  //filter Sum(Sales) between the values and send a message
  sheet1ToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: sMinValue,
    max: sMaxValue,
  });
  sheet2ToFilter
    .applyRangeFilterAsync("SUM(Profit)", { min: pMinValue, max: pMaxValue })
    .then(alert("Your Viz is now filtered🐋"));
}
