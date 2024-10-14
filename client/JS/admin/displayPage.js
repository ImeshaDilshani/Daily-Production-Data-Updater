// Function to fetch and display data
document.getElementById('fetch-data-btn').addEventListener('click', async () => {
    try {
        // Fetch data from the API
        const response = await fetch('http://localhost:5000/api/get-data');
        const data = await response.json();

        // Check if data exists
        if (data && data.length > 0) {
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Clear any existing data

            // Insert rows into the table
            data.forEach(item => {
                const row = `<tr>
                    <td>${item.epf_number}</td>
                    <td>${item.date_of_production}</td>
                    <td>${item.production_division}</td>
                    <td>${item.sap_code}</td>
                    <td>${item.packing_qty}</td>
                    <td>${item.packing_hrs}</td>
                    <td>${item.additional_action}</td>
                    <td>${item.loss_time_normal_hrs}</td>
                    <td>${item.loss_time_ot}</td>
                    <td>${item.packing_item}</td>
                    <td>${item.packing_type}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            // Show the table after populating data
            document.getElementById('data-table').style.display = 'table';
        } else {
            alert('No data found!');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        alert('Failed to fetch data');
    }
});

// Function to download the Excel file
document.getElementById('download-excel-btn').addEventListener('click', () => {
    // Create an invisible link element to download the file
    const link = document.createElement('a');
    link.href = 'http://localhost:5000/api/export-excel';
    link.setAttribute('download', 'production_data.xlsx');
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the link after downloading
    document.body.removeChild(link);
});

// Fetch EPF numbers and populate EPF number dropdown
fetch('http://127.0.0.1:5000/api/employees/epf-number')
.then(response => response.json())
.then(data => {
const eptNumberOptions = document.getElementById('eptNumberOptions');
const select = document.createElement('select');
select.id = 'epfSelect';
eptNumberOptions.appendChild(select);

// Create default "Select EPF Number" option
const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'Select EPF Number';
defaultOption.disabled = true;
defaultOption.selected = true;
select.appendChild(defaultOption);

// Add fetched EPF numbers to the dropdown list
data.forEach(item => {
const option = document.createElement('option');
option.value = item.epf_number;
option.textContent = item.epf_number;
select.appendChild(option);
});

// Event listener to handle selection of EPF number
select.addEventListener('change', () => {
console.log('Selected EPF Number:', select.value);
// Add any additional logic you want to handle when an EPF number is selected
});
})
.catch(error => console.error('Error fetching EPF numbers:', error));