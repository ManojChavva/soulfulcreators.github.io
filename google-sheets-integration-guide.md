# Connecting Contact Form to Google Sheets

This guide explains how to connect the contact form to Google Sheets using Google Apps Script.

## Setup Steps

1. **Google Sheet Setup**
   - Open the Google Sheet: https://docs.google.com/spreadsheets/d/1_1I694i4_BE8x7a6DaUtleQ5ulMezmC_kh9jBU5B_as/edit?usp=sharing
   - Ensure the sheet has the following headers in row 1:
     - Timestamp
     - Name
     - Email
     - Phone Number
     - Comments

2. **Google Apps Script Setup**
   1. In your Google Sheet, go to Extensions > Apps Script
   2. Replace the code in Code.gs with the following:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     
     sheet.appendRow([
       data.timestamp,
       data.name,
       data.email,
       data.phone,
       data.comments
     ]);
     
     return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
   3. Click Deploy > New Deployment
   4. Click "Select type" and choose "Web app"
   5. Set the following:
      - Description: "Contact Form Handler"
      - Execute as: "Me"
      - Who has access: "Anyone"
   6. Click "Deploy"
   7. Authorize the application when prompted
   8. Copy the Web App URL provided after deployment

3. **Update the Website Code**
   1. In the form-handler.js file, replace 'YOUR_GOOGLE_SCRIPT_URL' with the Web App URL you copied
   2. Update the contact form in index.html to include:
      - An ID for the form: id="contact-form"
      - A success message div: id="form-success"
      - An error message div: id="form-error"
      - An ID for the submit button: id="submit-button"

4. **Testing**
   - Submit a test entry through the form
   - Verify that the data appears in your Google Sheet
   - Check that the timestamp is recorded correctly

## Security Notes
- The form submission uses no-cors mode due to CORS restrictions with Google Apps Script
- Form data is sent via HTTPS
- Google's authentication handles access control to the spreadsheet

## Troubleshooting
- If form submissions fail, check the browser console for errors
- Verify that the Google Script URL is correct
- Ensure the Google Sheet and Apps Script are properly configured
- Check that all required form fields have proper IDs