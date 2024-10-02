// Function to save form data to sessionStorage
function saveFormDataToSession() {
    // Get form elements
    const date = document.getElementById('date').value;
    const divisionSection = document.getElementById('division-section').value;

    // Save form data in sessionStorage
    sessionStorage.setItem('date', date);
    sessionStorage.setItem('divisionSection', divisionSection);

    console.log('Form data saved to sessionStorage');
}

// Function to load form data from sessionStorage (if exists)
function loadFormDataFromSession() {
    const date = sessionStorage.getItem('date');
    const divisionSection = sessionStorage.getItem('divisionSection');

    if (date) {
        document.getElementById('date').value = date;
    }

    if (divisionSection) {
        document.getElementById('division-section').value = divisionSection;
    }

    console.log('Form data loaded from sessionStorage');
}

// Save form data when the form is submitted or on button click
document.getElementById('taskForm').addEventListener('submit', saveFormDataToSession);
document.getElementById('secondPageNextBtn').addEventListener('click', saveFormDataToSession);

// Load form data when the page loads
window.onload = loadFormDataFromSession;
