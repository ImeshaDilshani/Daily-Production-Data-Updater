
    fetch('http://localhost:5000/api/activities/activities-item')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // console.log('Response data:', data); // Log the response data
            if (Array.isArray(data)) {
                const select = document.getElementById('additionalAction');
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.activity_name;
                    option.textContent = item.activity_name;
                    select.appendChild(option);
                });
            } else {
                console.error('Expected an array but got:', data);
                // alert('Failed to load activities. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Failed to load activities:', error);
            // alert('Failed to load activities. Please try again later.');
        });



