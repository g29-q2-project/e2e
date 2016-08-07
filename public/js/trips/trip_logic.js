$('#origin-dropdown').on('change', function() {
  var selectedVal = $(this).find(':selected').text();
  return selectedVal != 'saved-trips' ? $('#origin-input').hide() : $('#origin-input').show();
})
