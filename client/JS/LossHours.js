document.addEventListener('DOMContentLoaded', () => {
    const additionalActionSelect = document.getElementById('additionalAction');

    fetch('/api/activities-item')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(activity => {
                const option = document.createElement('option');
                option.value = activity.activity_name;
                option.textContent = activity.activity_name;
                additionalActionSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching activities:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load activities. Please try again later.';
            document.body.appendChild(errorMessage);
        });
});
