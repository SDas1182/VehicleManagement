// Retrieve stored data from localStorage or initialize an empty array
let cars = JSON.parse(localStorage.getItem('savedCars')) || [];

// Function to filter cars by manufacturer
function filterByManufacturer(manufacturer) {
  const filteredCars = cars.filter(car => car.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()));
  return filteredCars;
}

// Function to display saved vehicle data in a table
function displayVehicleData(tableData) {
  const table = document.getElementById('dataTable');
  table.innerHTML = `
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
      ${tableData}
      <!-- Rows for displaying vehicle data -->
    </tbody>
  `;
}

// Function to display filtered vehicle data in the table
function displayFilteredVehicleData() {
    const inputManufacturer = prompt('Enter manufacturer name to filter cars:', ''); // Prompt user for manufacturer name
  
    if (inputManufacturer) {
      const filteredCars = filterByManufacturer(inputManufacturer);
      const tableRows = filteredCars.map(generateVehicleDataHTML).join('');
      displayVehicleData(tableRows, filteredCars); // Pass the filtered cars array
    }
  }
  
  // Function to display saved vehicle data in a table
  function displayVehicleData(tableData, carsArray) {
    const table = document.getElementById('dataTable');
    const headerRow = `
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
        ${tableData}
        <!-- Rows for displaying vehicle data -->
      </tbody>
    `;
  
    table.innerHTML = headerRow;
  
    // Update the image source for filtered rows
    carsArray.forEach((car, index) => {
      const imgElement = table.rows[index + 1].cells[1].querySelector('img'); // Find the image element
      if (imgElement) {
        imgElement.src = car.photoFileName; // Set the image source for the corresponding row
      }
    });
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

// Function to search and filter table data by keyword
function searchTable() {
  const input = document.getElementById('searchInput').value.toUpperCase();
  const table = document.getElementById('dataTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
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
