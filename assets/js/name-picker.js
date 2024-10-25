$(document).ready(function() {
    let i = 0, intervalHandle = null;
    const headerNames = $('#headerNames');
    const headingTitle = $('#headingTitle');
    const namePickerCointainer = $('#namePickerContainer');
    const loadingSpinner = $('#loadingSpinner');
    
    $('#startButton').click(function() {
        $(this).hide();
        namePickerCointainer.toggleClass('increased-margin');
        
        headingTitle.text('Getting Names').fadeIn();
        loadingSpinner.show();
        fetchNamesFromAPI().then(namesList => {
            loadingSpinner.hide();
            if (namesList.length === 0) {
                headingTitle.text('NO Name found').fadeIn();
                return; 
            }
            headingTitle.text('Asking fate').fadeIn();

            intervalHandle = setInterval(() => headerNames.text(namesList[i++ % namesList.length]), 100);

            setTimeout(() => {
                clearInterval(intervalHandle);
                const selectedWinner = namesList[Math.floor(Math.random() * namesList.length)];
                headerNames.css('opacity', '0');
                setTimeout(() => {
                    headingTitle.text('Congratulations').fadeIn();
                    headerNames.css({ 'color': '#EB586F', 'font-weight': '800' })
                               .css('opacity', '1').text(selectedWinner).fadeIn();
                }, 500);
            }, 5000);
        });
    });
});

function fetchNamesFromAPI() {
    const sheetID = $('#sheetID').val();  
    const colName = $('#colName').val();
    const apiURL = 'https://script.google.com/macros/s/AKfycbwDnes-AzTp2MdKMA5SXrsattoWA99tVAHkMKkjTjoAKpN_nJKVidSInaGxNbKnOjJiBg/exec'
    return $.get(`${apiURL}?sheet_id=${sheetID}&column_name=${colName}`)
        .then(response => {
            if (response.status === 'success') {
                return response.data;  
            } else {
                alert('Error: ' + response.message);
                return [];
            }
        })
        .catch(error => {
            alert('Error fetching data from API');
            return [];
        });
}
