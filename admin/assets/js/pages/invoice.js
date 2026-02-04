window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    
    if(params.has('km')) document.getElementById('in_close_km').value = params.get('km'); 
    if(params.has('fare')) document.getElementById('in_base').value = params.get('fare');
    if(params.has('extra')) document.getElementById('in_extra').value = params.get('extra');
    if(params.has('vehicle')) document.getElementById('in_veh_type').value = params.get('vehicle');
    
    document.getElementById('in_date_now').valueAsDate = new Date();
    
    if(!document.getElementById('in_inv_no').value) {
        document.getElementById('in_inv_no').value = "INV-" + Math.floor(1000 + Math.random() * 9000);
    }
    
    updateInvoice();
};

function toggleEditor() {
    const sidebar = document.getElementById('editorPanel');
    const btn = document.getElementById('toggleSidebar');
    sidebar.classList.toggle('closed');
    if(sidebar.classList.contains('closed')) {
        btn.innerHTML = '<i class="fa-solid fa-pen"></i> <span>Edit Data</span>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-expand"></i> <span>Hide Editor</span>';
    }
}

function calcReadings() {
    const startKm = parseFloat(document.getElementById('in_start_km').value) || 0;
    const closeKm = parseFloat(document.getElementById('in_close_km').value) || 0;
    let totalKm = (closeKm > startKm) ? closeKm - startKm : 0;
    
    document.getElementById('res_total_km').innerText = totalKm;
    document.getElementById('out_start_km').innerText = startKm;
    document.getElementById('out_close_km').innerText = closeKm;
    document.getElementById('out_total_km').innerText = totalKm;

    const startT = document.getElementById('in_start_time').value;
    const endT = document.getElementById('in_end_time').value;
    
    if(startT) document.getElementById('out_start_dt').innerText = formatDateTime(new Date(startT));
    if(endT) document.getElementById('out_end_dt').innerText = formatDateTime(new Date(endT));

    if(startT && endT) {
        const s = new Date(startT);
        const e = new Date(endT);
        const diffMs = e - s;
        if(diffMs > 0) {
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            let durText = (days > 0 ? `${days}D ` : "") + `${hrs}H ${mins}M`;
            document.getElementById('res_duration').innerText = durText;
            document.getElementById('out_duration').innerText = durText;
        } else {
            document.getElementById('res_duration').innerText = "0D 0H";
            document.getElementById('out_duration').innerText = "--";
        }
    }
}

function calcTotal() {
    const base = parseFloat(document.getElementById('in_base').value) || 0;
    const extra = parseFloat(document.getElementById('in_extra').value) || 0;
    const disc = parseFloat(document.getElementById('in_discount').value) || 0;

    document.getElementById('out_base').innerText = base.toFixed(2);
    document.getElementById('row_extra').style.display = extra > 0 ? 'table-row' : 'none';
    document.getElementById('out_extra').innerText = extra.toFixed(2);
    document.getElementById('row_disc').style.display = disc > 0 ? 'table-row' : 'none';
    document.getElementById('out_disc').innerText = disc.toFixed(2);

    const total = (base + extra) - disc;
    document.getElementById('out_total').innerText = total.toFixed(2);
}

function updateInvoice() {
    const mapIds = {
        'in_inv_no': 'out_inv_no', 'in_trip_type': 'out_trip_type',
        'in_veh_no': 'out_veh_no', 'in_veh_type': 'out_veh_type',
        'in_driver': 'out_driver', 'in_cust': 'out_cust',
        'in_company': 'out_company', 'in_pay_mode': 'out_pay_mode',
        'in_from': 'out_from', 'in_to': 'out_to', 'in_note': 'out_note'
    };
    for (let key in mapIds) {
        const el = document.getElementById(key);
        if(el) document.getElementById(mapIds[key]).innerText = el.value || "--";
    }
    
    // Via Logic
    const via = document.getElementById('in_via').value;
    const viaDiv = document.getElementById('div_via');
    if(via) {
        viaDiv.style.display = 'flex';
        document.getElementById('out_via').innerText = via;
    } else {
        viaDiv.style.display = 'none';
    }

    // Rate Note Logic
    const rate = document.getElementById('in_rate_note').value;
    const rateDiv = document.getElementById('div_rate_note');
    if(rate) {
        rateDiv.style.display = 'block';
        document.getElementById('out_rate_note').innerText = rate;
    } else {
        rateDiv.style.display = 'none';
    }

    document.getElementById('div_note').style.display = document.getElementById('in_note').value ? 'block' : 'none';
    
    const d = document.getElementById('in_date_now').value;
    if(d) document.getElementById('out_date').innerText = new Date(d).toLocaleDateString('en-GB');

    calcReadings();
    calcTotal();
}

function formatDateTime(date) {
    if(isNaN(date.getTime())) return "--";
    return date.toLocaleString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute:'2-digit', hour12: true 
    });
}
