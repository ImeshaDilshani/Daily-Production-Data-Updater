document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const lineSelect = document.getElementById('line');
    const epfNumberSelect = document.getElementById('epfNumber');
    const fullNameSelect = document.getElementById('fullName');
    const nextPageBtn = document.getElementById('nextPageBtn');

    // Load saved values from local storage
    const savedLine = localStorage.getItem('line');
    const savedEpfNumber = localStorage.getItem('epfNumber');
    const savedFullName = localStorage.getItem('fullName');

    if (savedLine) {
        lineSelect.value = savedLine;
    }

    if (savedEpfNumber) {
        epfNumberSelect.value = savedEpfNumber;
    }

    if (savedFullName ) {
        fullNameSelect.value = savedFullName;
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const line = lineSelect.value;
        const epfNumber = epfNumberSelect.value;
        const fullName = fullNameSelect.value;

        // Save the selected values to local storage
        localStorage.setItem('line', line);
        localStorage.setItem('epfNumber', epfNumber);
        localStorage.setItem('fullName', fullName);

        const formData = {
            line,
            epfNumber,
            fullName
        };

        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                // Log and throw an error if the response is not ok
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Form submitted successfully!');
            } else {
                alert('Error submitting form: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form. Check the console for details.');
        });
    });

    nextPageBtn.addEventListener('click', () => {
        window.location.href = 'secondPage.html';
    });
});
