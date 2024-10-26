function buildJsonResponse(status, message, data = null) {
  const response = { status, message };
  if (data) response.data = data;
  return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
}

  function doPost(e) {
    const SECRET_KEY = ''; /* Store this somewhere secure */
     
    if (!e.postData || e.postData === 'undefined') {
      console.log('e.postData is missing')
      return;
    }
    
    const body = JSON.parse(e.postData.contents);

    // Turnstile injects a token in "cf-turnstile-response".
    const token = body["cf-turnstile-response"];
    const subject = body.subject;
    const message = body.message;

    const formData = {
      "secret": SECRET_KEY,
      "response": token
    }

    const options = {
      'method': 'post',
      'payload': formData
    }

    // Validate the token by calling the "/siteverify" API endpoint.
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const response = UrlFetchApp.fetch(url, options);
    const outcome = JSON.parse(response.getContentText());
  
  try {
    if (outcome.success) {
       var aliases = GmailApp.getAliases().find(x => x === "contact@dotnetliverpool.org.uk");
       var recipient = "josh@dotnetliverpool.org.uk"
       GmailApp.sendEmail(recipient, subject, message, {'from': aliases, cc: "samson@dotnetliverpool.org.uk"})
       
       return buildJsonResponse('success', 'Email Sent Successfully!')
    } else {
      return buildJsonResponse('error', "Cloudflare user validation failed.", outcome);
    }
  }  catch (error) {
    return buildJsonResponse('error', error.message);
  }
}