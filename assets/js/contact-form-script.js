$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError("#contactForm");
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        sendContactEmail("#contactForm", "#name", "#email", "#message");
    }
});




async function sendContactEmail(formID, nameID, emailID, messageID){
    var name = $(nameID).val();
    var email = $(emailID).val();
    var message = $(messageID).val();

    var emailData = {
        subject: `Contact Email from Dotnet Liverpool from ${email}`,
        message: `Full Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        // Send the email via POST request
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbwDnes-AzTp2MdKMA5SXrsattoWA99tVAHkMKkjTjoAKpN_nJKVidSInaGxNbKnOjJiBg/exec', 
        {
          method: 'POST',
          redirect: 'follow',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });
  
        formSuccess(formID);
      } catch (error) {
        formError(formID);
        submitMSG(false, "An error occurred while sending the email.");
      }
}

function formSuccess(formID){
    $(formID)[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(formID){
    $(formID).removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);

    setTimeout(function() {
        $("#msgSubmit").fadeOut("slow", function() {
            $(this).removeClass().text(""); // Clear the text and classes
        });
    }, 3000);
}