$(document).ready(function(){
    $('.modal').modal();
  });

  $(document).ready(function() {
    $('.modal-trigger').on('click', function() {
      // Change button color using inline CSS
      $(this).css('background-color', 'red');
      $(this).css('color', 'white'); // Optional: Change text color too
      
      // Alternatively, toggle a class for predefined styles
      // $(this).toggleClass('clicked-button');
    });
  });
  