// Google Apps Script form handler for contact form

// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent the default form submission
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const comments = document.getElementById('comments').value;
  
  // Show loading state
  document.getElementById('submit-button').disabled = true;
  document.getElementById('submit-button').textContent = 'Submitting...';
  
  // Prepare data for submission
  const data = {
    name: name,
    email: email, 
    phone: phone,
    comments: comments,
    timestamp: new Date().toISOString()
  };
  
  // Send form data to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbxwPfIYPlcDMqtGO0Tv38QJHwXFy8U790TR_Uidblz60itnP2XqeSAXdOB0kO7pxMO2Dg/exec', {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  })
  .then(response => {
    // Since no-cors mode doesn't give us response details, we assume success
    document.getElementById('submit-button').textContent = 'Submitted!';
    document.getElementById('contact-form').reset();
    
    // Show success message
    const successMessage = document.getElementById('form-success');
    successMessage.style.display = 'block';
    
    // Hide success message after 3 seconds
    setTimeout(function() {
      successMessage.style.display = 'none';
      document.getElementById('submit-button').disabled = false;
      document.getElementById('submit-button').textContent = 'Submit';
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('submit-button').disabled = false;
    document.getElementById('submit-button').textContent = 'Submit';
    
    // Show error message
    const errorMessage = document.getElementById('form-error');
    errorMessage.style.display = 'block';
    
    // Hide error message after 3 seconds
    setTimeout(function() {
      errorMessage.style.display = 'none';
    }, 3000);
  });
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});