
    // const submitBtn = document.getElementById('submitBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const lineOptionsTemplate = document.getElementById('lineOptions');
    const taskForm = document.getElementById('taskForm');

    // Event listener for Add New button
    repeatBtn.addEventListener('click', () => {
        const currentFormsCount = document.querySelectorAll('.dynamic-form').length;
        if (currentFormsCount < 6) { // Limit to 7 forms
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
            <div class="line-options">${lineOptionsTemplate.innerHTML}</div>
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
            <input type="number" class="packing-qty" name="packingQty" required>
            <br>
    
            <label for="packingHrs">Packing Hrs:</label>
            <input type="time" class="packing-hrs" name="packingHrs" required>
            <br>

            <button class="cancel-btn">Cancel</button>
        `;

        taskForm.insertBefore(newForm, repeatBtn);

        // Add event listener for the Cancel button
    const cancelBtn = newForm.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
        newForm.remove(); // Remove the form when cancel is clicked
    });

        // Add event listener to checkboxes in the new form
        // const checkboxes = newForm.querySelectorAll('input[name="line"]');
        // checkboxes.forEach(checkbox => {
        //     checkbox.addEventListener('change', () => {
        //         if (checkbox.checked) {
        //             fetchPackingItemsByLine(checkbox.value, newForm); // Pass newForm as context
        //         } else {
        //             // Handle unchecking if needed
        //         }
        //     });
        // });

        // Populate packing items in the new form
        const newPackingItemsSelect = newForm.querySelector('.packing-items');
        fetch('http://127.0.0.1:5000/api/products/packing-items')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.packing_item;
                    option.textContent = item.packing_item;
                    newPackingItemsSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching packing items:', error));

        // Event listener for packing item selection in the new form
        newPackingItemsSelect.addEventListener('change', () => {
            const selectedItem = newPackingItemsSelect.value;
            if (selectedItem) {
                fetch('http://127.0.0.1:5000/api/products/search-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ packingItem: selectedItem })
                })
                    .then(response => response.json())
                    .then(data => {
                        const newPackingTypesSelect = newForm.querySelector('.packing-types');
                        newPackingTypesSelect.innerHTML = '<option value="">Select Packing Type</option>'; // Clear previous options
                        data.forEach(type => {
                            const option = document.createElement('option');
                            option.value = type.packing_type;
                            option.textContent = type.packing_type;
                            newPackingTypesSelect.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error fetching packing types:', error));
            }
        });
    }

    function fetchPackingItemsByLine(line, formContext) {
        console.log('Fetching packing items for line:', line);
        fetch(`http://127.0.0.1:5000/api/products/packing-items-by-line?line=${line}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received packing items data:', data);

                if (data.length === 0) {
                    console.log('No packing items found for the selected line');
                    return;
                }

                // Find the packing-items select within the specified formContext
                const packingItemsSelect = formContext.querySelector('.packing-items');
    
                // Clear previous options
                packingItemsSelect.innerHTML = '<option value="">Select Packing Item</option>';
    
                // Populate the packing items select box based on the response
                data.forEach(item => {
                    console.log('Adding item:', item.packing_item);
                    const option = document.createElement('option');
                    option.value = item.packing_item;
                    option.textContent = item.packing_item;
                    packingItemsSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching packing items:', error));
    }


