const View = {
    initModal: function() {
        console.log('Initializing modal');
        // Vanilla JS initialization
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            // Optional configuration
            dismissible: true
        });
        console.log('Modal instances:', instances);
    },
  
    toggleModalTriggerColor: function() {
        $('.modal-trigger').on('click', function() {
            console.log('Modal trigger clicked');
            $(this).css('background-color', 
                $(this).css('background-color') === 'rgb(255, 0, 0)' ? '' : 'red'
            );
        });
    },
  
    showResult: function(result) {
        $('#resultText').text(result);
    },
  
    showError: function(message) {
        M.toast({ html: message, classes: 'red' });
    },
  
    resetModal: function() {
        $('#num1, #num2').val('');
        $('#resultText').text('0');
        M.updateTextFields();
    }
};