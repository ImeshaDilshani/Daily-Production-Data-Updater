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
            <input type="text" class="LTNormalHours" name="LTNormalHours" placeholder="HH:MM" required>
            <br>

            <label for="LossTimeOT">Loss Time OT</label>
            <input type="text" class="LossTimeOT" name="LossTimeOT" placeholder="HH:MM" required>

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

            // Handle input and validation for HH:MM format
    taskForm.addEventListener('input', function (e) {
        if (e.target.matches('.LTNormalHours') || e.target.matches('.LossTimeOT')) {
            let value = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers

            // Add colon after entering 2 digits (HH)
            if (value.length > 2) {
                value = value.slice(0, 2) + ':' + value.slice(2);
            }

            // Limit input to 5 characters (HH:MM)
            e.target.value = value.slice(0, 5);
        }
    });

    taskForm.addEventListener('blur', function (e) {
        if (e.target.matches('.LTNormalHours') || e.target.matches('.LossTimeOT')) {
            let value = e.target.value;

            // Split the value into hours and minutes
            const [hours, minutes] = value.split(":");

            // Validate hours (should be between 0 and 23)
            if (hours && (parseInt(hours) < 0 || parseInt(hours) > 23)) {
                alert("Please enter valid hours (0-23).");
                e.target.value = '';
            }

            // Validate minutes (should be between 0 and 59)
            if (minutes && (parseInt(minutes) < 0 || parseInt(minutes) > 59)) {
                alert("Please enter valid minutes (0-59).");
                e.target.value = '';
            }
        }
    });
    }
});
