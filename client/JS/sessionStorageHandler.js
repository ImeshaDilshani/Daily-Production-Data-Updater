document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    } else {
        console.error('Submit button not found!');
        return;
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent form submission

        // Validate the form data
        if (validateForms()) {
            // If validation is successful, store the form data
            storeFormData();

            // Retrieve and send the form data to the server
            sendFormData();
            window.location.href = 'confirmation.html';

        } else {
            // Alert the user if any field is missing
            alert('Please fill in all fields before proceeding.');
        }
    }

    function validateForms() {
        let isValid = true; // Assume all forms are valid

        // Select all forms including the initial one and dynamic ones
        const allForms = document.querySelectorAll('.dynamic-action-form, #taskForm');

        if (allForms.length === 0) {
            console.error('No forms found!');
            return false;
        }

        // Iterate over each form to check data
        allForms.forEach(form => {
            const additionalActionSelect = form.querySelector('.additional-action, #additionalAction');
            const ltNormalHoursInput = form.querySelector('.lt-normal-hours, #LTNormalHours');
            const lossTimeOTInput = form.querySelector('.loss-time-ot, #LossTimeOT');

            if (!additionalActionSelect || !additionalActionSelect.value) {
                isValid = false; // Mark form as invalid if field is missing
                console.warn('Missing additionalAction value in a form!');
            }
            if (!ltNormalHoursInput || !ltNormalHoursInput.value) {
                isValid = false; // Mark form as invalid if field is missing
                console.warn('Missing LTNormalHours value in a form!');
            }
            if (!lossTimeOTInput || !lossTimeOTInput.value) {
                isValid = false; // Mark form as invalid if field is missing
                console.warn('Missing LossTimeOT value in a form!');
            }
        });

        return isValid; // Return true if all forms are valid, otherwise false
    }

    function storeFormData() {
        // Arrays to store the form data
        let additionalActions = [];
        let ltNormalHours = [];
        let lossTimeOTs = [];

        // Select all forms including the initial one and dynamic ones
        const allForms = document.querySelectorAll('.dynamic-action-form, #taskForm');

        // Iterate over each form to gather data
        allForms.forEach(form => {
            const additionalActionSelect = form.querySelector('.additional-action, #additionalAction');
            const ltNormalHoursInput = form.querySelector('.lt-normal-hours, #LTNormalHours');
            const lossTimeOTInput = form.querySelector('.loss-time-ot, #LossTimeOT');

            if (additionalActionSelect && additionalActionSelect.value) {
                additionalActions.push(additionalActionSelect.value);
            }
            if (ltNormalHoursInput && ltNormalHoursInput.value) {
                ltNormalHours.push(ltNormalHoursInput.value);
            }
            if (lossTimeOTInput && lossTimeOTInput.value) {
                lossTimeOTs.push(lossTimeOTInput.value);
            }
        });

        // Store arrays in session storage
        // sessionStorage.setItem('additionalAction', JSON.stringify(additionalActions));
        // sessionStorage.setItem('LTNormalHours', JSON.stringify(ltNormalHours));
        // sessionStorage.setItem('LossTimeOT', JSON.stringify(lossTimeOTs));
        // Save each item in session storage with the required naming convention
    additionalActions.forEach((action, index) => {
        sessionStorage.setItem(`additional_action_${index + 1}`, action);
    });
    
    ltNormalHours.forEach((hours, index) => {
        sessionStorage.setItem(`loss_time_normal_${index + 1}`, hours);
    });

    lossTimeOTs.forEach((ot, index) => {
        sessionStorage.setItem(`loss_time_ot_${index + 1}`, ot);
    });

        console.log('Stored in sessionStorage:', {
            additionalAction: additionalActions,
            LTNormalHours: ltNormalHours,
            LossTimeOT: lossTimeOTs
        });
    }

    function sendFormData() {
        // Retrieve the value of 'clickedCard' from session storage
    const clickedCard = sessionStorage.getItem('clickedCard');
    let epf_number = null;

    // Check if clickedCard is 'no 01' or 'no 02'
    if (clickedCard === 'no 01') {
        // Get epf_number from local storage
        const selectedEmployee = JSON.parse(localStorage.getItem('selectedEmployee'));
        if (selectedEmployee && selectedEmployee.epf_number) {
            epf_number = selectedEmployee.epf_number;
        } else {
            console.error('No selectedEmployee found in local storage.');
            return;
        }
    } else if (clickedCard === 'no 02') {
        // Get epf_number from session storage
        const selectedEmployee = JSON.parse(sessionStorage.getItem('selectedEmployee'));
        if (selectedEmployee && selectedEmployee.epf_number) {
            epf_number = selectedEmployee.epf_number;
        } else {
            console.error('No selectedEmployee found in session storage.');
            return;
        }
    } else {
        console.error('Invalid clickedCard value!');
        return;
    }

        // Retrieve stored data from session storage
        const dateOfProduction = sessionStorage.getItem('date');
        const divisionSection = sessionStorage.getItem('divisionSection');
        
        const packingHrs = JSON.parse(sessionStorage.getItem('packingHrs') || '[]');
        const packingQty = JSON.parse(sessionStorage.getItem('packingQty') || '[]');
        const sapCodes = JSON.parse(sessionStorage.getItem('sapCodes') || '[]');
        const additionalAction = JSON.parse(sessionStorage.getItem('additionalAction') || '[]');
        const ltNormalHours = JSON.parse(sessionStorage.getItem('LTNormalHours') || '[]');
        const lossTimeOT = JSON.parse(sessionStorage.getItem('LossTimeOT') || '[]');
        const packingItem = JSON.parse(sessionStorage.getItem('packingItems') || '[]');
        const packingType = JSON.parse(sessionStorage.getItem('packingTypes') || '[]');

        // Log data retrieved from storage
        // console.log('Data retrieved from storage:', {
        //     epf_number,
        //     dateOfProduction,
        //     divisionSection,
        //     packingHrs,
        //     packingQty,
        //     sapCodes,
        //     additionalAction,
        //     ltNormalHours,
        //     lossTimeOT
        // });

        console.log('Data retrieved from storage:', {
            epf_number,
            dateOfProduction,
            divisionSection,
            packingHrs,
            packingQty,
            sapCodes,
            additionalAction,
            ltNormalHours,
            lossTimeOT,
            packingItem,
            packingType
        });

        const dataToSend = {
            epf_number: epf_number,
            date_of_production: dateOfProduction, // Use snake_case to match backend expectation
            production_division: divisionSection, // Use snake_case to match backend expectation
            packing_hrss: packingHrs, // Use snake_case to match backend expectation
            packing_qtys: packingQty, // Use snake_case to match backend expectation
            sap_codes: sapCodes, // Use snake_case to match backend expectation
            additional_actions: additionalAction, // Use snake_case to match backend expectation
            loss_time_normal_hrss: ltNormalHours, // Use snake_case to match backend expectation
            loss_time_ots: lossTimeOT, // Use snake_case to match backend expectation
            packing_items: packingItem, // Use snake_case to match backend expectation
            packing_types: packingType // Use snake_case to match backend expectation
        };
        

        // Prepare the data object to send to the server
        // const dataToSend = {
        //     epf_number: epf_number,
        //     dateOfProduction: dateOfProduction,
        //     divisionSection: divisionSection,
        //     packingHrs: packingHrs,
        //     packingQty: packingQty,
        //     sapCodes: sapCodes,
        //     additionalAction: additionalAction,
        //     ltNormalHours: ltNormalHours,
        //     lossTimeOT: lossTimeOT
        // };
        

        // Send data to the backend using Fetch API
        fetch('http://localhost:5000/api/submit/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
