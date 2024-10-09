let deferredPrompt; // Variable to store the event

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

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log("Service Worker Registered"));
    });

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-info bar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show your custom install button here if you have one
    });
}

// Function to trigger the install prompt
function showInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null; // Clear the variable after showing prompt
        });
    }
}

// Call showInstallPrompt() when you want to display the prompt
