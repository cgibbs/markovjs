

var csvRequest = new Request({
  url:"https://raw.githubusercontent.com/cgibbs/markovjs/gh-pages/lists/biblical_names.txt",
  onSuccess:function(response){
      //The response text is available in the 'response' variable
      //Set the value of the textarea with the id 'csvResponse' to the response
    $("names").value = response;
  }
}).send();

console.log('This would be the main JS file.');
