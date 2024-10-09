function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create the PDF content
    doc.text('Name: ' + name, 10, 10);
    doc.text('Email: ' + email, 10, 20);
    doc.text('Phone: ' + phone, 10, 30);

    // Save the generated PDF
    doc.save('form-data.pdf');
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function() { console.log("Service Worker Registered"); });
}
