document.addEventListener('DOMContentLoaded', () => {
    
    const lineOptions = document.getElementById('lineOptions');
    const employeeCardsContainer = document.getElementById('employee-cards-container');

    // Fetch line options and create radio buttons
    // fetch('http://127.0.0.1:5000/api/employees/line')
    //     .then(response => response.json())
    //     .then(data => {
    //         data.forEach(item => {
    //             const label = document.createElement('label');
    //             const radio = document.createElement('input');

    //             radio.type = 'radio';
    //             radio.name = 'line';
    //             radio.value = item.line;

    //             label.appendChild(radio);
    //             label.appendChild(document.createTextNode(item.line));
    //             lineOptions.appendChild(label);

    //             // Add event listener to radio buttons
    //             radio.addEventListener('change', () => fetchEmployeesByLine(item.line));
    //         });
    //     })
    //     .catch(error => console.error('Error fetching lines:', error));

    // Fetch line options and populate dropdown list
    fetch('http://127.0.0.1:5000/api/employees/line')
        .then(response => response.json())
        .then(data => {
            const select = document.createElement('select');
            select.id = 'lineSelect';
            lineOptions.appendChild(select);

            // Create default "Select Line" option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select your line';
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
            select.addEventListener('change', () => fetchEmployeesByLine(select.value));
        })
        .catch(error => console.error('Error fetching lines:', error));


    // Function to fetch employee data based on selected line
    async function fetchEmployeesByLine(line) {
        const response = await fetch('http://127.0.0.1:5000/api/employees/search-employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ line })
        });

        if (response.ok) {
            const employees = await response.json();
            // Store the employee data in local storage
            // localStorage.setItem('employees', JSON.stringify(employees));
            createEmployeeCards(employees);
        } else {
            console.error('Failed to fetch employees:', response.statusText);
        }
    }

    // Function to create and display employee cards
    function createEmployeeCards(employees) {

        employeeCardsContainer.innerHTML = ''; // Clear previous cards

        employees.forEach(employee => {

            const card = document.createElement('div');
            card.className = 'card';
            
            card.onclick = () => handleCardClick(employee);

            const img = document.createElement('img');
            img.src = `images/${employee.epf_number}.jpg`;
            img.alt = 'profileCard';
            card.appendChild(img);

            const name = document.createElement('h4');
            name.textContent = employee.full_name;
            card.appendChild(name);

            const epf = document.createElement('h4');
            epf.textContent = `EPF NO: ${employee.epf_number}`;
            card.appendChild(epf);

            employeeCardsContainer.appendChild(card);
        });
    }

    // Load employees from local storage on page load
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        createEmployeeCards(JSON.parse(storedEmployees));
    }

    // Handle card click
function handleCardClick(employee) {
    // Check the value of 'clickedCard' in session storage
    const clickedCard = sessionStorage.getItem('clickedCard');

    if (clickedCard === 'no 01') {
        // If 'clickedCard' is 'no 01', store employee in local storage
        localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    } else if (clickedCard === 'no 02') {
        // If 'clickedCard' is 'no 02', store employee in session storage
        sessionStorage.setItem('selectedEmployee', JSON.stringify(employee));
    }

    // Redirect to the next page (thirdPage.html)
    window.location.href = 'thirdPage.html';
}

});