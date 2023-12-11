let data;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const cityBtn = document.getElementById("city");
const stateBtn = document.getElementById("state");
const centerBtn = document.getElementById("name");

async function getapi() {
  showLoader();
  const url = "https://isro.vercel.app/api/centres";
  const response = await fetch(url);
  data = await response.json();
  show(data);
  hideloader();
}

function showLoader() {
  document.getElementById("loadingSpan").style.display = "block";
}

function hideloader() {
  document.getElementById("loadingSpan").style.display = "none";
}

function show(data) {
  let tableRow = `<tr>
              <th>S.no</th>
              <th>Center Name</th>
              <th>City</th>
              <th>State</th>
            </tr>`;

  for (let eachRow of data.centres) {
    tableRow += `<tr>
              <td class = "tableRowle-data">${eachRow.id} </td>
              <td>${eachRow.name} </td>
              <td>${eachRow.Place}</td>
              <td>${eachRow.State}</td>
            </tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tableRow;
}

let flag = "";

function cityButtonn() {
  flag = "city";
  searchData();
}

function stateButton() {
  flag = "state";
  searchData();
}

function centerButton() {
  flag = "name";
  searchData();
}

function searchData() {
  let inputValue = document.getElementById("search").value;
  let tableRow = `<tr>
                    <th>S.no</th>
                    <th>Center Name</th>
                    <th>Place</th>
                    <th>State</th>
                  </tr>`;

  if (inputValue != "") {
    if (flag === "name") {
      searchByName(tableRow, inputValue);
    } else if (flag === "city") {
      searchByCity(tableRow, inputValue);
    } else if (flag === "state") {
      searchByState(tableRow, inputValue);
    }
  }
}

function searchByName(tableRow, inputValue) {
  let i = 1;

  cityBtn.classList.remove("active");
  stateBtn.classList.remove("active");
  centerBtn.classList.add("active");

  for (let eachRow of data.centres) {
    if (eachRow.name.toLowerCase().includes(inputValue.toLowerCase())) {
      tableRow += `<tr>
                    <td>${i++} </td>
                    <td>${eachRow.name} </td>
                    <td>${eachRow.Place}</td>
                    <td>${eachRow.State}</td>
                  </tr>`;
    }
  }

  if (i <= 1) {
    tableRow += `<tr>
                  <td colspan="4" style="text-align: center;">No Record Found!!</td>
                </tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tableRow;
}

function searchByState(tableRow, inputValue) {
  let i = 1;

  cityBtn.classList.remove("active");
  stateBtn.classList.add("active");
  centerBtn.classList.remove("active");

  for (let eachRow of data.centres) {
    if (eachRow.State.toLowerCase().includes(inputValue.toLowerCase())) {
      tableRow += `<tr>
                <td>${i++} </td>
                <td>${eachRow.name} </td>
                <td>${eachRow.Place}</td>
                <td>${eachRow.State}</td>
              </tr>`;
    }
  }

  if (i <= 1) {
    tableRow += `<tr>
                  <td colspan="4" style="text-align: center;">No Record Found!!</td>
                </tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tableRow;
}

function searchByCity(tableRow, inputValue) {
  let i = 1;

  cityBtn.classList.add("active");
  stateBtn.classList.remove("active");
  centerBtn.classList.remove("active");

  for (let eachRow of data.centres) {
    if (eachRow.Place.toLowerCase().includes(inputValue.toLowerCase())) {
      tableRow += `<tr>
                    <td>${i++} </td>
                    <td>${eachRow.name} </td>
                    <td>${eachRow.Place}</td>
                    <td>${eachRow.State}</td>
                  </tr>`;
    }
  }

  if (i <= 1) {
    tableRow += `<tr>
                  <td colspan="4" style="text-align: center;">No Record Found!!</td>
                </tr>`;
  }
  document.getElementById("isroCenters").innerHTML = tableRow;
}

getapi();
