$(document).ready(function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON' ,
  }).done(function(responseData){
    var test = $('#result');
    var vote_form = $('<form id="votes", method="POST", action="https://bb-election-api.herokuapp.com/vote">');
    for (i = 0; i < responseData.candidates.length; i++){
      console.log(responseData.candidates[i].name);
      var can = $('<li>');
      can.html(responseData.candidates[i].name + ' has ' + responseData.candidates[i].votes + ' votes.');
      var vote_button = $('<button>').attr('name', 'vote for ' + responseData.candidates[i].name);
      test.append(can);
      vote_form.append(vote_button);

      var vote_details = $('<input>').attr(
        {name: responseData.candidates[i].id,
        class: 'vote_button',
        value: responseData.candidates[i].id,
        type: 'hidden'
        });
        vote_button.append(vote_details);
       console.log(vote_button.name);
    }
    test.append(vote_form)

  });

  $('.vote_button').on('click', function(event){
    event.preventDefault();
    console.log('Prevented default');
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/vote',
      method: 'POST',
      data: {'id': $(this).val() }
    }).done(function(responseData){
      console.log(responseData);
      alert('button clicked')
    }).fail(function(){
      console.log('failed');
    }).always(function(){
      console.log('always');
    });

  });
  // Imagination!

});
