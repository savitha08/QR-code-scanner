const reader = new Html5Qrcode("reader");
const resultElement = document.getElementById("result");
const errorMessageElement = document.getElementById("error-message");
const actionButton = document.getElementById("action-btn");

const config = { fps: 10, qrbox: { width: 250, height: 250 } };

reader
  .start(
    { facingMode: "environment" }, // Use rear camera by default
    config,
    (decodedText, decodedResult) => {
      // Hide error message (if any)
      errorMessageElement.style.display = "none";

      // Successfully scanned a QR code
      resultElement.textContent = decodedText;

      // Display action button for valid URLs
      if (isValidURL(decodedText)) {
        actionButton.style.display = "block";
        actionButton.onclick = () => window.open(decodedText, "_blank");
      } else {
        actionButton.style.display = "none";
      }
    },
    (errorMessage) => {
      console.error(`Scanning error: ${errorMessage}`);
    }
  )
  .catch((err) => {
    console.error(`Error starting QR code scanner: ${err}`);
    errorMessageElement.textContent = "Unable to access the camera. Check permissions or use HTTPS.";
    errorMessageElement.style.display = "block";
  });

// Helper function to validate URLs
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
