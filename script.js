const form = document.getElementById('registrar-vehicle-form');
const saveButton = document.getElementById('save-button');

const getInputValue = (id) => document.getElementById(id).value;

saveButton.addEventListener('click', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault(); // prevents default form submission behavior

  // Validate user input (optional, modify based on your required fields)
  const requiredFields = ['vehicle-type', 'manufacturer', 'model', 'model-year', 'license-plate', 'fuel-type', 'mileage'];
  for (const field of requiredFields) {
    if (!getInputValue(field)) {
      alert(`Please fill in the "${field}" field.`);
      return; // Stop execution if any required field is empty
    }
  }

  // Access and format data
  const vehicleType = getInputValue('vehicle-type');
  const photoElement = document.getElementById('photo');
  const photoFileName = photoElement.files[0].name; // Get filename, not actual image data (for simplicity)
  const manufacturer = getInputValue('manufacturer');
  const model = getInputValue('model');
  const modelYear = getInputValue('model-year');
  const licensePlate = getInputValue('license-plate');
  const fuelType = getInputValue('fuel-type');
  const mileage = getInputValue('mileage');

  // Prepare CSV data and header row
  const csvData = [[vehicleType, photoFileName, manufacturer, model, modelYear, licensePlate, fuelType, mileage]];
  const headerRow = ['Vehicle Type', 'Photo', 'Manufacturer', 'Model', 'Model Year', 'License Plate', 'Fuel Type', 'Mileage'];

  // Generate CSV string
  const csvString = headerRow.join(',') + '\n' + csvData.map((row) => row.join(',')).join('\n');

  // Build table data elements
  const tableElement = document.getElementById('vehicle-data-table');
  tableElement.innerHTML = ''; // Clear any existing content

  const tableRow = document.createElement('tr');
  const cells = [];

  for (const dataPoint of csvData[0]) {
    const tableCell = document.createElement('td');
    if (dataPoint === photoFileName) {
      // Handle "photo" column with desired format
      tableCell.innerHTML = `<img src="" alt="${photoFileName}" style="width: 100px; height: 100px;">`;
    } else {
      tableCell.textContent = dataPoint;
    }
    cells.push(tableCell);
  }

  tableRow.append(...cells);
  tableElement.appendChild(tableRow);

  // (Optional) Show success message or perform additional actions
  alert('Vehicle data saved successfully!');
}
