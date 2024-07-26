document.addEventListener('DOMContentLoaded', () => {
    const lineSelect = document.getElementById('line');
    const epfNumberSelect = document.getElementById('epfNumber');
    const fullNameSelect = document.getElementById('fullName');

    // Fetch line
    fetch('http://127.0.0.1:5000/api/employees/line')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.line;
                option.textContent = item.line;
                lineSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching line:', error));

    // Fetch epf-number
    fetch('http://127.0.0.1:5000/api/employees/epf-number')
        .then(response => response.json())
        .then(data => {
            data.forEach(type => {
                const option = document.createElement('option');
                option.value = type.epf_number;
                option.textContent = type.epf_number;
                epfNumberSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching epf-number:', error));

    // Fetch full-Name
    fetch('http://127.0.0.1:5000/api/employees/full-name')
        .then(response => response.json())
        .then(data => {
            data.forEach(type => {
                const option = document.createElement('option');
                option.value = type.full_name;
                option.textContent = type.full_name;
                fullNameSelect .appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching full-name:', error));

    // Handle line selection
    lineSelect.addEventListener('change', () => {
        const selectedLine = lineSelect.value;
        if (selectedLine) {
            fetch('http://127.0.0.1:5000/api/employees/search-employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ line: selectedLine })
            })
                .then(response => response.json())
                .then(data => {
                    epfNumberSelect.innerHTML = '<option value="">Select EPF Name</option>';
                    fullNameSelect.innerHTML = '<option value="">Select Full Name</option>';
                    data.forEach(type => {
                        const option = document.createElement('option');
                        option.value = type.epf_number;
                        option.textContent = type.epf_number;
                        epfNumberSelect.appendChild(option);
                    });
                    data.forEach(type => {
                        const option = document.createElement('option');
                        option.value = type.full_name;
                        option.textContent = type.full_name;
                        fullNameSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching EPF Number:', error));
        }
    });

    // Handle form submission
    submitBtn.addEventListener('click', () => {
        const selectedLine = lineSelect.value;
        const selectedEpfNumber = epfNumberSelect.value;

        if (selectedLine && selectedEpfNumber) {
            const requestData = {
                line: selectedLine,
                epf_number: selectedEpfNumber
            };

            fetch('http://127.0.0.1:5000/api/employees/search-employees', {
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
            alert('Please select all.');
        }
    });

});