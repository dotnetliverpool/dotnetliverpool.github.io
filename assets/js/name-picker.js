$(document).ready(function() {
    // Add list of names here
    const namesList = [
        'Anne Catherine Jr',
        'Bobanyh Fredrick Castille',
        'Catherine Jeniffer huston', 
        'Dave Cybdall Pauline',
        'Erin Nwizugbe Fernandez',
        'Franklink Juminogo Grefory',
        'Gloria Farnelia Orphelia'
    ];

    // Default variables
    let i = 0;
    let intervalHandle = null;
    const headerNames = $('#headerNames');
    const headingTitle = $('#headingTitle')
    const namePickerCointainer = $('#namePickerContainer')
    
    // Start the name shuffle on button click
    $('#startButton').click(function() {
        $(this).hide(); // Hide the start button
        namePickerCointainer.toggleClass('increased-margin') // toggle the class
        headingTitle.text('Asking fate').fadeIn();
        intervalHandle = setInterval(function() {
            headerNames.text(namesList[i++ % namesList.length]);
        }, 100); // Change name every 200ms
        
        // Stop the name shuffle after 10 seconds
        setTimeout(function() {
            clearInterval(intervalHandle); // Stop rotating names
            const randomIndex = Math.floor(Math.random() * namesList.length);
            const selectedWinner = namesList[randomIndex]; // Get the winner
            // headerNames.text('');
            headerNames.css('opacity', '0'); // Fade out the name display
            setTimeout(() => {
                headingTitle.text('Congratulations').fadeIn(); // add party emoji
                headerNames.css({
                    'color': '#EB586F',
                    'font-weight': '800' 
                })
                headerNames.css('opacity', '1').text(`${selectedWinner}`).fadeIn();
            }, 500); // Wait for fade out
        }, 5000); // 10 seconds
    });
});
