document.addEventListener('DOMContentLoaded', () => {
    // const submitBtn = document.getElementById('submitBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const lineOptionsTemplate = document.getElementById('lineOptions');
    const taskForm = document.getElementById('taskForm');

    // Event listener for Add New button
    repeatBtn.addEventListener('click', () => {
        const currentFormsCount = document.querySelectorAll('.dynamic-form').length;
        if (currentFormsCount < 4) { // Limit to 5 forms
            createNewForm();
        } else {
            alert('You can add a maximum of 5 forms.');
        }
    });

    // Function to create a new set of form elements
    function createNewForm() {
        const newForm = document.createElement('div');
        newForm.classList.add('dynamic-form');

        newForm.innerHTML = `
            <label>Select Line:</label>
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
            <input type="number" class="packing-hrs" name="packingHrs" required>
            <br>
        `;

        taskForm.insertBefore(newForm, repeatBtn);

        // Add event listener to checkboxes in the new form
        const checkboxes = newForm.querySelectorAll('input[name="line"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    fetchPackingItemsByLine(checkbox.value, newForm);
                } else {
                    // Handle unchecking if needed
                }
            });
        });

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

    // Function to fetch packing items by line
    function fetchPackingItemsByLine(line, form) {
        fetch(`http://127.0.0.1:5000/api/products/packing-items-by-line?line=${line}`)
            .then(response => response.json())
            .then(data => {
                const packingItemsSelect = form.querySelector('.packing-items');
                packingItemsSelect.innerHTML = '<option value="">Select Packing Item</option>'; // Clear previous options

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.packing_item;
                    option.textContent = item.packing_item;
                    packingItemsSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching packing items:', error));
    }



    // // Handle form submission
    // submitBtn.addEventListener('click', () => {
    //     const forms = document.querySelectorAll('.dynamic-form');
    //     const formData = [];

    //     forms.forEach(form => {
    //         const packingItemsSelect = form.querySelector('.packing-items');
    //         const packingTypesSelect = form.querySelector('.packing-types');
    //         const packingQtyInput = form.querySelector('.packing-qty');
    //         const packingHrsInput = form.querySelector('.packing-hrs');

    //         const data = {
    //             packingItem: packingItemsSelect.value,
    //             packingType: packingTypesSelect.value,
    //             packingQty: packingQtyInput.value,
    //             packingHrs: packingHrsInput.value
    //         };
    //         formData.push(data);
    //     });

    //     // Example of what to do with formData:
    //     console.log('Form Data:', formData);
    //     // Send formData to server or process as needed
    // });
});
