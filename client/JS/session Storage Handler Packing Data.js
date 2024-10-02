// Function to validate form data
function validateForms() {
    // Select all forms including the initial one and dynamic ones
    const allForms = document.querySelectorAll('.dynamic-form, #taskForm');
    let isValid = true;

    // Iterate over each form to check data
    allForms.forEach((form) => {
        // Check if all required fields are filled
        const packingItem = form.querySelector('.packing-items, #packingItems').value;
        const packingType = form.querySelector('.packing-types, #packingTypes').value;
        const packingQty = form.querySelector('.packing-qty, #packingQty').value;
        const packingHrs = form.querySelector('.packing-hrs, #packingHrs').value;

        if (!packingItem || !packingType || !packingQty || !packingHrs) {
            isValid = false; // If any field is empty, mark form as invalid
        }
    });

    return isValid;
}

// Async function to fetch sap_code from API
async function fetchSapCode(packingType, packingItem) {
    try {
        const response = await fetch('http://localhost:5000/api/products/search-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packingType, packingItem })
        });

        const data = await response.json();
        if (data.length > 0) {
            return data[0].sap_code;
        } else {
            console.error('No sap_code found for the provided packingType and packingItem.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching sap_code:', error);
        return null;
    }
}

// Function to save form data to sessionStorage
async function savePackingDataToSession() {
    // Initialize arrays to hold the data
    let packingItemsArray = [];
    let packingTypesArray = [];
    let packingQtyArray = [];
    let packingHrsArray = [];
    let sapCodesArray = [];

    // Select all forms including the initial one and dynamic ones
    const allForms = document.querySelectorAll('.dynamic-form, #taskForm');

    // Iterate over each form to gather data
    for (const form of allForms) {
        // Get the selected packing item
        const packingItem = form.querySelector('.packing-items, #packingItems').value;
        const packingType = form.querySelector('.packing-types, #packingTypes').value;
        const packingQty = form.querySelector('.packing-qty, #packingQty').value;
        const packingHrs = form.querySelector('.packing-hrs, #packingHrs').value;

        if (packingItem && packingType) {
            packingItemsArray.push(packingItem);
            packingTypesArray.push(packingType);
            packingQtyArray.push(packingQty);
            packingHrsArray.push(packingHrs);

            // Fetch sap_code from API
            const sapCode = await fetchSapCode(packingType, packingItem);
            if (sapCode) {
                sapCodesArray.push(sapCode);
            } else {
                // Push null to keep array lengths consistent
                sapCodesArray.push(null);
            }
        }
    }

    // Store the arrays in sessionStorage
    sessionStorage.setItem('packingItems', JSON.stringify(packingItemsArray));
    sessionStorage.setItem('packingTypes', JSON.stringify(packingTypesArray));
    sessionStorage.setItem('packingQty', JSON.stringify(packingQtyArray));
    sessionStorage.setItem('packingHrs', JSON.stringify(packingHrsArray));
    sessionStorage.setItem('sapCodes', JSON.stringify(sapCodesArray));

    console.log('Packing data stored in sessionStorage:', {
        packingItems: packingItemsArray,
        packingTypes: packingTypesArray,
        packingQty: packingQtyArray,
        packingHrs: packingHrsArray,
        sapCodes: sapCodesArray
    });
}

// Attach the function to the Next Page button
document.getElementById('lhPageNextBtn').addEventListener('click', handleNextPage);

async function handleNextPage(event) {
    if (event) event.preventDefault(); // Prevent form submission if inside a form

    // Validate the form data
    if (validateForms()) {
        // Save form data to sessionStorage
        await savePackingDataToSession();
        
        // Navigate to the next page
        console.log('Navigating to LossHours.html');
        window.location.href = 'LossHours.html'; // Update this URL to the actual next page
    } else {
        // Alert the user if any field is missing
        alert('Please fill in all fields before proceeding to the next page.');
    }
}


