var $tbody = document.querySelector('tbody');
var dtSearch = document.querySelector('#dt');
var searchBtn = document.querySelector('#search');
var citySearch = document.querySelector('#city');
var stateSearch = document.querySelector('#state');
var countrySearch = document.querySelector('#country');
var shapeSearch = document.querySelector('#shape');
var $loadMoreBtn = document.querySelector("#load-btn");

searchBtn.addEventListener('click', searchButtonClick);

var ufoData = dataSet;

function renderTable(ufoData) {
    $tbody.innerHTML = '';
    for (var i = 0; i < ufoData.length; i++) {
    var sighting = ufoData[i];
    var row = $tbody.insertRow(i);
    var items = Object.keys(sighting);

        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var cell = row.insertCell(j);
            cell.innerText = sighting[item];
        }
    }
}  

function searchButtonClick() {
    var dtQuery = dtSearch.value.trim().toLowerCase();
    var cityQuery = citySearch.value.trim().toLowerCase();
    var stateQuery = stateSearch.value.trim().toLowerCase();
    var countryQuery = countrySearch.value.trim().toLowerCase();
    var shapeQuery = shapeSearch.value.trim().toLowerCase();
    
    queryResult = ufoData.filter(function (sighting){
        var dt = sighting.datetime.substring(0, dtQuery.length).toLowerCase();
        var ct = sighting.city.substring(0, cityQuery.length).toLowerCase(); 
        var st = sighting.state.substring(0, stateQuery.length).toLowerCase();
        var cy = sighting.country.substring(0, countryQuery.length).toLowerCase();
        var sh = sighting.shape.substring(0, shapeQuery.length).toLowerCase();
        
       if (dtQuery === dt && cityQuery === ct && stateQuery === st && countryQuery === cy && shapeQuery === sh) {
            return true;
        }
        return false;
    });
    renderTable(queryResult); 
}

var startingIndex = 0;
var resultsPerPage = 100;
function renderTableSection() {
  // Set the value of endingIndex to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the ufodata array to render
  var dataSubset = ufoData.slice(startingIndex, endingIndex);
  for (var i = 0; i < dataSubset.length; i++) {
    var alien = dataSubset[i];
    var fields = Object.keys(alien);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = alien[field];
    }
  }
}
// Add an event listener to the button, call handleButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleButtonClick);
function handleButtonClick() {
  // Increase startingIndex by 100 and render the next section of the table
  startingIndex += resultsPerPage;
  renderTableSection();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= ufoData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Addresses Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}
// Render the table for the first time on page load
renderTableSection();

