document.getElementById('submitBtn').addEventListener('click', async () => {
    const epf_number = document.getElementById('epf_number').value;
    const date_of_production = document.getElementById('date_of_production').value;
    const sap_code = document.getElementById('sap_code').value;
    const packing_qty = document.getElementById('packing_qty').value;
    const packing_hrs = document.getElementById('packing_hrs').value;
    const additional_action = document.getElementById('additional_action').value;
    const loss_time_normal_hrs = document.getElementById('loss_time_normal_hrs').value;
    const loss_time_ot = document.getElementById('loss_time_ot').value;

    const formData = {
        epf_number,
        date_of_production,
        sap_code,
        packing_qty,
        packing_hrs,
        additional_action,
        loss_time_normal_hrs,
        loss_time_ot
    };

    try {
        const response = await fetch('http://localhost:5000/api/submit/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (data.success) {
            alert('Form submitted successfully');
        } else {
            alert('Failed to submit form');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit form');
    }
});
