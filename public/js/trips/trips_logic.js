// hide origin input field when origin dropdown option is selected
$('#origin-location-dropdown').change(function() {
  var watchedVal = $(this).val();
  watchedVal != 'saved-location' ? $('#origin-input').hide() : $('#origin-input').show();
})

// show and hide button to toggle show origin input field
$('#origin-location-dropdown').change(function() {
  var watchedVal = $(this).val();
  watchedVal != 'saved-location' ? $('#input-custom-origin').show() : $('#input-custom-origin').hide();
})

// show origin input field when button is clicked
$('#input-custom-origin').click(function() {
  $('#origin-input').show();
})


// hide origin dropdown if input field has value, show if not
$('#origin-input').keyup(function(){
  $(this).val().length ? $('#origin-side').find('.select-dropdown').hide() :   $('#origin-side').find('.select-dropdown').show();
})

// hide destination input field when destination dropdown option is selected
$('#destination-location-dropdown').change(function() {
  var watchedVal = $(this).val();
  watchedVal != 'saved-location' ? $('#destination-input').hide() : $('#destination-input').show();
})

// show and hide button to toggle show destination input field
$('#destination-location-dropdown').change(function() {
  var watchedVal = $(this).val();
  watchedVal != 'saved-location' ? $('#input-custom-destination').show() : $('#input-custom-destination').hide();
})

// show destination input field when button is clicked
$('#input-custom-destination').click(function() {
  $('#destination-input').show();
  $('#destination-location-dropdown').val();
})

// hide destination dropdown if input field has value, show if not
$('#destination-input').keyup(function(){
  $(this).val().length ? $('#destination-side').find('.select-dropdown').hide() :   $('#destination-side').find('.select-dropdown').show();
})
