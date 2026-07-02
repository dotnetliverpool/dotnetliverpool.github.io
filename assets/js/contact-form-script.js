var $contactForm = $("#contactForm");
if ($contactForm.length) {
    $contactForm.validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError("#contactForm");
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            sendContactEmail("#contactForm", "#name", "#email", "#message", "input[name=cf-turnstile-response]");
        }
    });
}


async function sendContactEmail(formID, nameID, emailID, messageID, tokenID) {
    var name = $(nameID).val();
    var email = $(emailID).val();
    var message = $(messageID).val();
    var token = $(formID).find(tokenID).val();

    if (!token) {
        if (isLocalPreview()) {
            openLocalEmailFallback(name, email, message);
            submitMSG(true, "Local preview: opened your email client instead of using the bot check.");
            return;
        }

        formError(formID);
        submitMSG(false, "Please complete the validation before sending the message.");
        return;
    }

    var emailData = {
        subject: `Contact Email from Dotnet Liverpool from ${email}`,
        message: `Full Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        'cf-turnstile-response': token
    };

    try {
        // Apps Script does not return CORS headers, so this must be fire-and-forget.
        await fetch(
          'https://script.google.com/macros/s/AKfycbx1i4nYkaF0Ge_zClQMFPveyxCZ6yiMG8kvqmTBWD_0NfTlU4TWOhXn6_P6WHmw1stzGg/exec', 
        {
          mode: "no-cors",
          method: 'POST',
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(emailData),
        });

        formSuccess(formID);
      } catch (error) {
        formError(formID);
        submitMSG(false, "An error occurred while sending the email.");
      }
}

function isLocalPreview() {
    return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function openLocalEmailFallback(name, email, message) {
    var subject = encodeURIComponent(`Consultancy enquiry from ${email}`);
    var body = encodeURIComponent(`Full Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    window.location.href = `mailto:contact@dotnetliverpool.org.uk?subject=${subject}&body=${body}`;
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
    $("#msgSubmit").show()
    setTimeout(function() {
        $("#msgSubmit").fadeOut("slow", function() {
            $(this).removeClass().text(""); // Clear the text and classes
        });
    }, 3000);
}
