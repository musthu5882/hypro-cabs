document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const tripType = document.getElementById('tripType');
    const vehicleType = document.getElementById('vehicleType');
    const startDate = document.getElementById('startDate');
    const startTime = document.getElementById('startTime');
    const endDate = document.getElementById('endDate');
    const endTime = document.getElementById('endTime');
    const extraCharges = document.getElementById('extraCharges');
    const totalKm = document.getElementById('totalKm');
    const calcBtn = document.getElementById('calcBtn');
    
    // Result Elements
    const resultBox = document.getElementById('resultBox');
    const receiptContent = document.getElementById('receiptContent');
    const finalAmount = document.getElementById('finalAmount');
    const invoiceBtn = document.getElementById('invoiceBtn');

    // Store calculated data here
    let currentTripData = null;

    calcBtn.addEventListener('click', () => {
        const type = tripType.value;
        const vehicleKey = vehicleType.value;
        const rates = TARIFF_RATES[vehicleKey];
        const km = parseFloat(totalKm.value) || 0;
        const extras = parseFloat(extraCharges.value) || 0;

        let baseFare = 0;
        let summary = "";

        // --- CALCULATION LOGIC ---
        if (type === 'intercity') {
            baseFare = km * rates.intercity.perKm;
            summary = "Intercity Drop";
        }
        else if (type === 'local') {
            // Simplified Logic for Demo
            // You can paste your complex local calculation here
            const r = rates.local;
            baseFare = r.base.price + (km > r.base.kms ? (km - r.base.kms) * r.extraKmRate : 0);
            summary = "Local Hourly Package";
        }
        else if (type === 'outstation') {
            baseFare = km * rates.outstation.perKm;
            summary = "Outstation Trip";
        }
        else if (type === 'multiday') {
            const days = 1; // Default
            baseFare = rates.multiday.dailyRent * days; 
            summary = "Multi-Day Trip";
        }

        const total = Math.ceil(baseFare + extras);

        // --- SAVE DATA TO VARIABLE ---
        currentTripData = {
            tripType: summary,
            vehicleName: rates.name,
            km: km,
            baseFare: Math.ceil(baseFare),
            extras: extras,
            startDT: `${startDate.value} ${startTime.value}`,
            endDT: `${endDate.value} ${endTime.value}`
        };

        // Show Result
        receiptContent.textContent = `${summary}\nKM: ${km}\nBase: ₹${Math.ceil(baseFare)}\nExtras: ₹${extras}`;
        finalAmount.textContent = `₹${total}`;
        resultBox.style.display = 'block';
    });

    // --- SEND DATA TO INVOICE PAGE ---
    invoiceBtn.addEventListener('click', () => {
        if(!currentTripData) {
            alert("Please calculate the fare first!");
            return;
        }
        // Save to LocalStorage
        localStorage.setItem('hypro_invoice_data', JSON.stringify(currentTripData));
        // Redirect
        window.location.href = "invoice.html";
    });
});
