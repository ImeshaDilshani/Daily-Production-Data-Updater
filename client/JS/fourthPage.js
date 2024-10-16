const packingItemsSelect = document.getElementById('packingItems');
const packingTypesSelect = document.getElementById('packingTypes');
const lineOptions = document.getElementById('lineOptions');

const lineOptionsSelect = document.createElement('select');
lineOptionsSelect.id = 'lineOptionsDropdown';
lineOptions.appendChild(lineOptionsSelect);

// Fetch lines and populate the dropdown
fetch('http://127.0.0.1:5000/api/products/lines')
  .then(response => response.json())
  .then(data => {
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a Line';
    lineOptionsSelect.appendChild(defaultOption);

    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.line;
      option.textContent = item.line;
      lineOptionsSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching lines:', error));

// Add event listener to main lineOptions dropdown
lineOptionsSelect.addEventListener('change', () => {
  const selectedLine = lineOptionsSelect.value;
  if (selectedLine) {
    fetchPackingItemsByLine(selectedLine, packingItemsSelect);
  }
});

// Fetch packing items based on the selected line
function fetchPackingItemsByLine(line, itemsSelectElement) {
  fetch(`http://127.0.0.1:5000/api/products/packing-items-by-line?line=${line}`)
    .then(response => response.json())
    .then(data => {
      itemsSelectElement.innerHTML = '<option value="">Select Packing Item</option>';
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.packing_item;
        option.textContent = item.packing_item;
        itemsSelectElement.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching packing items:', error));
}

// Fetch and populate packing items for the initial form
fetch('http://127.0.0.1:5000/api/products/packing-items')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.packing_item;
      option.textContent = item.packing_item;
      packingItemsSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching packing items:', error));

// Fetch packing types for the initial form
fetch('http://127.0.0.1:5000/api/products/packing-types')
  .then(response => response.json())
  .then(data => {
    data.forEach(type => {
      const option = document.createElement('option');
      option.value = type.packing_type;
      option.textContent = type.packing_type;
      packingTypesSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching packing types:', error));

// Event listener for packing item selection in the initial form
packingItemsSelect.addEventListener('change', () => {
  const selectedItem = packingItemsSelect.value;
  if (selectedItem) {
    fetchPackingTypesByItem(selectedItem, packingTypesSelect);
  }
});

// Fetch packing types based on the selected item
function fetchPackingTypesByItem(item, typesSelectElement) {
  fetch('http://127.0.0.1:5000/api/products/search-products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packingItem: item })
  })
  .then(response => response.json())
  .then(data => {
    typesSelectElement.innerHTML = '<option value="">Select Packing Type</option>';
    data.forEach(type => {
      const option = document.createElement('option');
      option.value = type.packing_type;
      option.textContent = type.packing_type;
      typesSelectElement.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching packing types:', error));
}

// Dynamic Form Creation
const repeatBtn = document.getElementById('repeatBtn');
const taskForm = document.getElementById('taskForm');

repeatBtn.addEventListener('click', () => {
  const currentFormsCount = document.querySelectorAll('.dynamic-form').length;
  if (currentFormsCount < 6) {
    createNewForm();
  } else {
    alert('You can add a maximum of 7 forms.');
  }
});

function createNewForm() {
  const newForm = document.createElement('div');
  newForm.classList.add('dynamic-form');
  newForm.innerHTML = `
    <label>ඔයා වැඩ කරපු Line එක තෝරන්න</label>
    <div class="line-options">
      <select class="line-options-dropdown">
        ${lineOptionsSelect.innerHTML}
      </select>
    </div>
    <br>

    <label for="packingItems">Packing Item:</label>
    <select class="packing-items">
      <option value="">Select Packing Item</option>
    </select>
    <br>

    <label for="packingTypes">Packing Type:</label>
    <select class="packing-types">
      <option value="">Select Packing Type</option>
    </select>
    <br>

    <label for="packingQty">Packing Qty:</label>
    <input type="number" class="packing-qty" name="packingQty" placeholder="Enter Packing Qty" required>
    <br>

    <label for="packingHrs">Packing Hours:</label>
    <input type="text" class="packing-hrs" placeholder="HH:MM" required>

    <br>

    <button class="cancel-btn">Cancel</button>
  `;

  taskForm.insertBefore(newForm, repeatBtn);

  const newLineSelect = newForm.querySelector('.line-options-dropdown');
  const newPackingItemsSelect = newForm.querySelector('.packing-items');
  const newPackingTypesSelect = newForm.querySelector('.packing-types');

  // Event listener for line selection in new form
  newLineSelect.addEventListener('change', () => {
    fetchPackingItemsByLine(newLineSelect.value, newPackingItemsSelect);
  });

  // Event listener for packing item selection in new form
  newPackingItemsSelect.addEventListener('change', () => {
    fetchPackingTypesByItem(newPackingItemsSelect.value, newPackingTypesSelect);
  });

  const cancelBtn = newForm.querySelector('.cancel-btn');
  cancelBtn.addEventListener('click', () => {
    newForm.remove();
  });

  // Apply HH:MM validation to the new packing hours input
  const newPackingHrsInput = newForm.querySelector('.packing-hrs');
  newPackingHrsInput.addEventListener('input', formatHHMM);
  newPackingHrsInput.addEventListener('blur', validateHHMM);
}

function formatHHMM(e) {
  let value = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers

  // Add colon after entering 2 digits (HH)
  if (value.length > 2) {
    value = value.slice(0, 2) + ':' + value.slice(2);
  }

  // Limit input to 5 characters (HH:MM)
  e.target.value = value.slice(0, 5);
}

function validateHHMM(e) {
  let value = e.target.value;

  // Split the value into hours and minutes
  const [hours, minutes] = value.split(":");

  // Validate hours (should be between 0 and 23)
  if (hours && (parseInt(hours) < 0 || parseInt(hours) > 23)) {
    alert("Please enter valid hours (0-23).");
    e.target.value = '';
  }

  // Validate minutes (should be between 0 and 59)
  if (minutes && (parseInt(minutes) < 0 || parseInt(minutes) > 59)) {
    alert("Please enter valid minutes (0-59).");
    e.target.value = '';
  }
}