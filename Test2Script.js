const form = document.getElementById('vehicle-form');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const displayButton = document.getElementById('display-button');

// Retrieve stored data from localStorage or initialize an empty array
let cars = JSON.parse(localStorage.getItem('savedCars')) || [];

saveButton.addEventListener('click', handleFormSubmit);
displayButton.addEventListener('click', displaySavedVehicleData);
cancelButton.addEventListener('click', resetForm);

function handleFormSubmit(event) {
  event.preventDefault();

  // Get input values for a single car
  const vehicleType = document.getElementById('vehicle-type').value;
  const photoElement = document.getElementById('photo');
  const photoFileName = photoElement.files[0].name;
  const manufacturer = document.getElementById('manufacturer').value;
  const model = document.getElementById('model').value;
  const modelYear = document.getElementById('model-year').value;
  const licensePlate = document.getElementById('license-plate').value;
  const fuelType = document.getElementById('fuel-type').value;
  const mileage = document.getElementById('mileage').value;

  // Validate input (optional, modify based on your requirements)
  const requiredFields = [vehicleType, manufacturer, model, modelYear, licensePlate, fuelType, mileage];
  for (const field of requiredFields) {
    if (!field) {
      alert('Please fill in all required fields.');
      return;
    }
  }

  // Store the details of a single car in an object
  const carDetails = {
    vehicleType,
    photoFileName,
    manufacturer,
    model,
    modelYear,
    licensePlate,
    fuelType,
    mileage
  };

  // Push the details of the current car into the 'cars' array
  cars.push(carDetails);

  // Store the updated 'cars' array in localStorage
  localStorage.setItem('savedCars', JSON.stringify(cars));

  // Reset the form after adding the car details
  form.reset();
}



function resetForm() {
  // Reset the form and clear the localStorage data
  form.reset();
  localStorage.removeItem('savedCars');
}

function generateVehicleDataHTML(car) {
  return `
    <!-- HTML content for displaying a single car's data -->
    <tr>
      <td>${car.vehicleType}</td>
      <td><img src="${car.photoFileName}" alt="${car.photoFileName}" style="width: 100px; height: 100px;"></td>
      <td>${car.manufacturer}</td>
      <td>${car.model}</td>
      <td>${car.modelYear}</td>
      <td>${car.licensePlate}</td>
      <td>${car.fuelType}</td>
      <td>${car.mileage}</td>
    </tr>
  `;
}

// Function to display saved vehicle data in a new tab
function displaySavedVehicleData() {
  // Retrieve stored cars from localStorage
  const cars = JSON.parse(localStorage.getItem('savedCars')) || [];

  // Generate HTML content for the table rows
  const tableRows = cars.map(generateVehicleDataHTML).join('');

  // HTML content for displaying saved vehicle data
  const htmlContent = `
    <html>
    <head>
      <title>Saved Vehicle Data</title>
      <!-- Optional styling for the table -->
      <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      h1 {
        text-align: center;
        margin-top: 20px;
      }
  
      input[type="text"] {
        padding: 10px;
        margin: 20px auto;
        display: block;
        width: 80%;
        max-width: 400px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
  
      table {
        border-collapse: collapse;
        width: 90%;
        margin: 20px auto;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
      }
  
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
  
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
  
      tbody tr:hover {
        background-color: #f5f5f5;
      }/* Styling for the table */
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        
      </style>
      <script>
        function searchTable() {
          const input = document.getElementById('searchInput').value.toUpperCase();
          const table = document.getElementById('dataTable');
          const rows = table.getElementsByTagName('tr');

          for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
            const rowData = rows[i].getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < rowData.length; j++) {
              if (rowData[j]) {
                const txtValue = rowData[j].textContent || rowData[j].innerText;

                if (txtValue.toUpperCase().indexOf(input) > -1) {
                  found = true;
                  break;
                }
              }
            }

            if (found) {
              rows[i].style.display = '';
            } else {
              rows[i].style.display = 'none';
            }
          }
        }
      </script>
    </head>
    <body>
      <h1>Saved Vehicle Data</h1>
      <input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search for vehicles...">
      <button onclick="displayFilteredVehicleData()">Filter by Manufacturer</button>
      <table id="dataTable">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Photo</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Model Release Date</th>
            <th>License Plate</th>
            <th>Fuel Type</th>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
          <!-- Rows for displaying saved vehicle data -->
        </tbody>
      </table>
      <script src="Filter.js"></script>
    </body>
    </html>
  `;

  // Open a new tab and populate it with the generated HTML content
  const newTab = window.open('');
  newTab.document.write(htmlContent);
}
