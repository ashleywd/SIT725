$(document).ready(function(){
    $('.modal').modal(); // Initialise modal class as a modal
    $('.modal-trigger').on('click', function() {
      if ($(this).css('background-color') === 'rgb(255, 0, 0)') { // Check if the colour is red
        $(this).css('background-color', ''); // Reset to default
      } else {
        $(this).css('background-color', 'red'); // Change colour to red
      }
  });
});