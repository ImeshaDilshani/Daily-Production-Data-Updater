document.addEventListener('DOMContentLoaded', () => {
    const formTasksContainer = document.getElementById('formTasks');
    const addTaskBtn = document.getElementById('addTaskBtn');
    let taskCount = 1;

    // Function to add a new task form section
    function addTaskForm() {
        if (taskCount >= 5) {
            alert('You can only add up to 5 tasks.');
            return;
        }
        taskCount++;

        // Create a new form task section
        const newTask = document.createElement('div');
        newTask.className = 'task-container';

        newTask.innerHTML = `
            <label for="line">Select Line:</label>
            <div id="lineOptions${taskCount}" class="line-options"></div>
    
            <label for="packingItems">Packing Item:</label>
            <select class="packingItems">
                <option value="">Select Packing Item</option>
            </select>
            <br>
            
            <label for="packingTypes">Packing Type:</label>
            <select class="packingTypes">
                <option value="">Select Packing Type</option>
            </select>
            <br>

            <label for="packingQty">Packing Qty:</label>
            <input type="number" class="packingQty" name="packingQty" required>
            <br>

            <label for="packingHrs">Packing Hrs:</label>
            <input type="number" class="packingHrs" name="packingHrs" required>
            <br>
        `;

        // Append new task to the container
        formTasksContainer.appendChild(newTask);

        // Initialize the line options for the new task
        initializeLineOptions(newTask.querySelector(`#lineOptions${taskCount}`));
    }

    // Initialize line options for each task
    function initializeLineOptions(container) {
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
                container.appendChild(label);

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        fetchPackingItemsByLine(item.line, container.parentNode);
                    } else {
                        clearPackingItems(container.parentNode); // Clear items when checkbox is unchecked
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching lines:', error));
    }

    // Fetch packing items by line and update the respective select
    function fetchPackingItemsByLine(line, formContainer) {
        fetch('http://127.0.0.1:5000/api/products/packing-items-by-line', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ line: line })
        })
        .then(response => response.json())
        .then(data => {
            const packingItemsSelect = formContainer.querySelector('.packingItems');
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

    // Clear packing items
    function clearPackingItems(formContainer) {
        const packingItemsSelect = formContainer.querySelector('.packingItems');
        packingItemsSelect.innerHTML = '<option value="">Select Packing Item</option>';
    }

    // Event listener for adding new task forms
    addTaskBtn.addEventListener('click', addTaskForm);

    // Initialize the first task form
    initializeLineOptions(document.querySelector('#lineOptions'));
});
