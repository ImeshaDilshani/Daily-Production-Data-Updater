fetch('http://127.0.0.1:5000/api/employees/line')
        .then(response => response.json())
        .then(data => {
            const select = document.createElement('select');
            select.id = 'lineSelect';
            lineOptions.appendChild(select);

            // Create default "Select Line" option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select line';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            // Add fetched lines to the dropdown list
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.line;
                option.textContent = item.line;
                select.appendChild(option);
            });

            // Add event listener to dropdown list
            select.addEventListener('change', () => {
                console.log('Selected line:', select.value);
                // Add any additional logic you want to handle when line is selected
            });
        })
        .catch(error => console.error('Error fetching lines:', error));

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