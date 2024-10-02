document.addEventListener('DOMContentLoaded', function () {
    const repeatActionBtn = document.getElementById('repeatActionBtn');
    const taskForm = document.getElementById('taskForm');

    // Event listener for Add New button
    repeatActionBtn.addEventListener('click', () => {
        const currentFormsCount = document.querySelectorAll('.dynamic-action-form').length;
        if (currentFormsCount < 6) { // Limit to 7 forms
            createNewActionForm();
        } else {
            alert('You can add a maximum of 7 forms.');
        }
    });

    // Function to create a new set of form elements for actions
    function createNewActionForm() {
        const newActionForm = document.createElement('div');
        newActionForm.classList.add('dynamic-action-form');

        newActionForm.innerHTML = `
            <label for="additionalAction">අමතර ක්‍රියාව</label>
            <select class="additional-action">
                <option value="">Select Your Answer</option>
            </select>
            <br>
            <label for="LTNormalHours">Loss Time සාමාන්‍ය පැය</label>
            <input type="time" class="lt-normal-hours" name="LTNormalHours" placeholder="The value must be a number" required>
            <br>
            <label for="LossTimeOT">Loss Time OT</label>
            <input type="time" class="loss-time-ot" name="LossTimeOT" placeholder="The value must be a number" required>
            <br>
            <button class="cancel-btn">Cancel</button>
        `;

        // Insert new form before the repeatActionBtn
        taskForm.insertBefore(newActionForm, repeatActionBtn);

        // Attach the cancel event listener to the new form's cancel button
        const cancelButton = newActionForm.querySelector('.cancel-btn');
        cancelButton.addEventListener('click', function () {
            newActionForm.remove(); // Remove the form when Cancel is clicked
        });

        // Populate additional actions in the new form
        const newAdditionalActionSelect = newActionForm.querySelector('.additional-action');
        fetch('http://localhost:5000/api/activities/activities-item')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.activity_name;
                    option.textContent = item.activity_name;
                    newAdditionalActionSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Failed to load activities:', error));
    }
});
