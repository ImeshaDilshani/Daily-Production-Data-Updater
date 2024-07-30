document.addEventListener('DOMContentLoaded', () => {
    const packingItemsSelect = document.getElementById('packingItems');
    const packingTypesSelect = document.getElementById('packingTypes');
    const submitBtn = document.getElementById('submitBtn');
    const lineOptions = document.getElementById('lineOptions');
    

    fetch('http://127.0.0.1:5000/api/products/lines')
    .then(response => response.json())
    .then(data => { 
        data.forEach(item => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');

            checkbox.type = 'checkbox';
            checkbox.name = 'line';
            checkbox.value = item.line;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(item.line));
            lineOptions.appendChild(label);

            // Add event listener to checkboxes
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    fetchPackingItemsByLine(item.line);
                } else {
                    // Handle unchecking if needed
                }
            });
        });
    })
    .catch(error => console.error('Error fetching lines:', error));

    function fetchPackingItemsByLine(line) {
        // Fetch packing items by line
        fetch(`http://127.0.0.1:5000/api/products/packing-items-by-line?line=${line}`)
            .then(response => response.json())
            .then(data => {
                const packingItemsSelect = document.getElementById('packingItems');
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

    // Fetch packing items
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

    // Fetch packing types
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

    // Handle packing item selection
    packingItemsSelect.addEventListener('change', () => {
        const selectedItem = packingItemsSelect.value;
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
                    // Clear the packing types select box
                    packingTypesSelect.innerHTML = '<option value="">Select Packing Type</option>';

                    // Populate the packing types select box based on the response
                    data.forEach(type => {
                        const option = document.createElement('option');
                        option.value = type.packing_type;
                        option.textContent = type.packing_type;
                        packingTypesSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching packing types:', error));
        }
    });

    // Handle form submission
    submitBtn.addEventListener('click', () => {
        const selectedPackingItem = packingItemsSelect.value;
        const selectedPackingType = packingTypesSelect.value;

        if (selectedPackingItem && selectedPackingType) {
            const requestData = {
                packingItem: selectedPackingItem,
                packingType: selectedPackingType
            };

            fetch('http://127.0.0.1:5000/api/products/search-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Search Results:', data);
                })
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            alert('Please select both packing item and type.');
        }
    });
});

function h() {
    console.log('Navigating to packing.html');
    window.location.href = 'fourthPage.html';
}