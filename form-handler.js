// Google Apps Script form handler for contact form

// Flag to track submission status
let isSubmitting = false;

// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent the default form submission
  event.preventDefault();
  
  // Prevent duplicate submissions
  if (isSubmitting) {
    console.log('Form submission already in progress');
    return false;
  }
  
  // Set submission flag to true
  isSubmitting = true;
  
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
      // Reset submission flag
      isSubmitting = false;
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
      // Reset submission flag
      isSubmitting = false;
    }, 3000);
  });
  
  // Return false to ensure the form doesn't submit traditionally
  return false;
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});
function scrollToContact() {
  const element = document.getElementById('contactFormSection');
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  }
}
