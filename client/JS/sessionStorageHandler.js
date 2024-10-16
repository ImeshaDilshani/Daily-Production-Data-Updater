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

        const packingItem1 = sessionStorage.getItem('packing_Items_1');
        const packingItem2 = sessionStorage.getItem('packing_Items_2');
        const packingItem3 = sessionStorage.getItem('packing_Items_3');
        const packingItem4 = sessionStorage.getItem('packing_Items_4');
        const packingItem5 = sessionStorage.getItem('packing_Items_5');
        const packingItem6 = sessionStorage.getItem('packing_Items_6');
        const packingItem7 = sessionStorage.getItem('packing_Items_7');

        const packingType1 = sessionStorage.getItem('packing_types_1');
        const packingType2 = sessionStorage.getItem('packing_types_2');
        const packingType3 = sessionStorage.getItem('packing_types_3');
        const packingType4 = sessionStorage.getItem('packing_types_4');
        const packingType5 = sessionStorage.getItem('packing_types_5');
        const packingType6 = sessionStorage.getItem('packing_types_6');
        const packingType7 = sessionStorage.getItem('packing_types_7');

        const sapCodes1 = sessionStorage.getItem('sap_code_1');
        const sapCodes2 = sessionStorage.getItem('sap_code_2');
        const sapCodes3 = sessionStorage.getItem('sap_code_3');
        const sapCodes4 = sessionStorage.getItem('sap_code_4');
        const sapCodes5 = sessionStorage.getItem('sap_code_5');
        const sapCodes6 = sessionStorage.getItem('sap_code_6');
        const sapCodes7 = sessionStorage.getItem('sap_code_7');

        const packingQty1 = sessionStorage.getItem('packing_qty_1');
        const packingQty2 = sessionStorage.getItem('packing_qty_2');
        const packingQty3 = sessionStorage.getItem('packing_qty_3');
        const packingQty4 = sessionStorage.getItem('packing_qty_4');
        const packingQty5 = sessionStorage.getItem('packing_qty_5');
        const packingQty6 = sessionStorage.getItem('packing_qty_6');
        const packingQty7 = sessionStorage.getItem('packing_qty_7');

        const packingHrs1 = sessionStorage.getItem('packing_hrs_1');
        const packingHrs2 = sessionStorage.getItem('packing_hrs_2');
        const packingHrs3 = sessionStorage.getItem('packing_hrs_3');
        const packingHrs4 = sessionStorage.getItem('packing_hrs_4');
        const packingHrs5 = sessionStorage.getItem('packing_hrs_5');
        const packingHrs6 = sessionStorage.getItem('packing_hrs_6');
        const packingHrs7 = sessionStorage.getItem('packing_hrs_7');

        const additionalAction1 = sessionStorage.getItem('additional_action_1');
        const additionalAction2 = sessionStorage.getItem('additional_action_2');
        const additionalAction3 = sessionStorage.getItem('additional_action_3');
        const additionalAction4 = sessionStorage.getItem('additional_action_4');
        const additionalAction5 = sessionStorage.getItem('additional_action_5');
        const additionalAction6 = sessionStorage.getItem('additional_action_6');
        const additionalAction7 = sessionStorage.getItem('additional_action_7');

        const ltNormalHours1 = sessionStorage.getItem('loss_time_normal_1');
        const ltNormalHours2 = sessionStorage.getItem('loss_time_normal_2');
        const ltNormalHours3 = sessionStorage.getItem('loss_time_normal_3');
        const ltNormalHours4 = sessionStorage.getItem('loss_time_normal_4');
        const ltNormalHours5 = sessionStorage.getItem('loss_time_normal_5');
        const ltNormalHours6 = sessionStorage.getItem('loss_time_normal_6');
        const ltNormalHours7 = sessionStorage.getItem('loss_time_normal_7');

        const lossTimeOT1 = sessionStorage.getItem('loss_time_ot_1');
        const lossTimeOT2 = sessionStorage.getItem('loss_time_ot_2');
        const lossTimeOT3 = sessionStorage.getItem('loss_time_ot_3');
        const lossTimeOT4 = sessionStorage.getItem('loss_time_ot_4');
        const lossTimeOT5 = sessionStorage.getItem('loss_time_ot_5');
        const lossTimeOT6 = sessionStorage.getItem('loss_time_ot_6');
        const lossTimeOT7 = sessionStorage.getItem('loss_time_ot_7');

        console.log('Data retrieved from storage:', {
            epf_number,
            dateOfProduction,
            divisionSection,

            packingItem1,
            packingItem2,
            packingItem3,
            packingItem4,
            packingItem5,
            packingItem6,
            packingItem7,

            packingType1,
            packingType2,
            packingType3,
            packingType4,
            packingType5,
            packingType6,
            packingType7,

            sapCodes1,
            sapCodes2,
            sapCodes3,
            sapCodes4,
            sapCodes5,
            sapCodes6,
            sapCodes7,

            packingQty1,
            packingQty2,
            packingQty3,
            packingQty4,
            packingQty5,
            packingQty6,
            packingQty7,

            packingHrs1,
            packingHrs2,
            packingHrs3,
            packingHrs4,
            packingHrs5,
            packingHrs6,
            packingHrs7,

            additionalAction1,
            additionalAction2,
            additionalAction3,
            additionalAction4,
            additionalAction5,
            additionalAction6,
            additionalAction7,

            ltNormalHours1,
            ltNormalHours2,
            ltNormalHours3,
            ltNormalHours4,
            ltNormalHours5,
            ltNormalHours6,
            ltNormalHours7,

            lossTimeOT1,
            lossTimeOT2,
            lossTimeOT3,
            lossTimeOT4,
            lossTimeOT5,
            lossTimeOT6,
            lossTimeOT7,
            
        });

        const dataToSend = {
            epf_number: epf_number,
            date_of_production: dateOfProduction, // Use snake_case to match backend expectation
            production_division: divisionSection, // Use snake_case to match backend expectation
            
            packing_item_1: packingItem1,
            packing_item_2: packingItem2,
            packing_item_3: packingItem3,
            packing_item_4: packingItem4,
            packing_item_5: packingItem5,
            packing_item_6: packingItem6,
            packing_item_7: packingItem7,

            packing_type_1: packingType1,
            packing_type_2: packingType2,
            packing_type_3: packingType3,
            packing_type_4: packingType4,
            packing_type_5: packingType5,
            packing_type_6: packingType6,
            packing_type_7: packingType7,

            sap_code_1: sapCodes1,
            sap_code_2: sapCodes2,
            sap_code_3: sapCodes3,
            sap_code_4: sapCodes4,
            sap_code_5: sapCodes5,
            sap_code_6: sapCodes6,
            sap_code_7: sapCodes7,

            packing_qty_1: packingQty1,
            packing_qty_2: packingQty2,
            packing_qty_3: packingQty3,
            packing_qty_4: packingQty4,
            packing_qty_5: packingQty5,
            packing_qty_6: packingQty6,
            packing_qty_7: packingQty7,

            packing_hrs_1: packingHrs1,
            packing_hrs_2: packingHrs2,
            packing_hrs_3: packingHrs3,
            packing_hrs_4: packingHrs4,
            packing_hrs_5: packingHrs5,
            packing_hrs_6: packingHrs6,
            packing_hrs_7: packingHrs7,

            additional_action_1: additionalAction1,
            additional_action_2: additionalAction2,
            additional_action_3: additionalAction3,
            additional_action_4: additionalAction4,
            additional_action_5: additionalAction5,
            additional_action_6: additionalAction6,
            additional_action_7: additionalAction7,

            loss_time_normal_hrs_1: ltNormalHours1,
            loss_time_normal_hrs_2: ltNormalHours2,
            loss_time_normal_hrs_3: ltNormalHours3,
            loss_time_normal_hrs_4: ltNormalHours4,
            loss_time_normal_hrs_5: ltNormalHours5,
            loss_time_normal_hrs_6: ltNormalHours6,
            loss_time_normal_hrs_7: ltNormalHours7,

            loss_time_ot_1: lossTimeOT1,
            loss_time_ot_2: lossTimeOT2,
            loss_time_ot_3: lossTimeOT3,
            loss_time_ot_4: lossTimeOT4,
            loss_time_ot_5: lossTimeOT5,
            loss_time_ot_6: lossTimeOT6,
            loss_time_ot_7: lossTimeOT7,
        };

        // Send data to the backend using Fetch API
        fetch('http://localhost:5000/api/submit/submit-production-data', {
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
