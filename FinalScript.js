const form = document.getElementById('vehicle-form');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

// Array to store details of multiple cars
const cars = [];

saveButton.addEventListener('click', handleFormSubmit);

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

  // Reset the form after adding the car details
  form.reset();
}

// Function to generate HTML content for displaying saved vehicle data
function generateVehicleDataHTML(car) {
  return `
    <!-- HTML content for displaying a single car's data -->
    <tr>
      <td>${car.vehicleType}</td>
      <td><img src="" alt="${car.photoFileName}" style="width: 100px; height: 100px;"></td>
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
  const htmlContent = `
    <html>
    <head>
      <title>Saved Vehicle Data</title>
      <!-- Optional styling for the table -->
      <style>
        /* Styling for the table */
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
    </head>
    <body>
      <h1>Saved Vehicle Data</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Photo</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Model Year</th>
            <th>License Plate</th>
            <th>Fuel Type</th>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          ${cars.map(generateVehicleDataHTML).join('')}
          <!-- Rows for displaying saved vehicle data -->
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Open a new tab and populate it with the generated HTML content
  const newTab = window.open('');
  newTab.document.write(htmlContent);
}

// Event listener for the "Display Data" button
document.getElementById('display-button').addEventListener('click', displaySavedVehicleData);

// Event listener for the "Cancel" button to reload the page
cancelButton.addEventListener('click', function() {
  window.location.reload(); // Reloads the current page
});