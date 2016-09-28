

// var csvRequest = new Request({
//   url:"/lists/biblical_names.txt",
//   onSuccess:function(response){
//       //The response text is available in the 'response' variable
//       //Set the value of the textarea with the id 'csvResponse' to the response
//     $("names").value = response;
//   }
// }).send();

$.ajax("/lists/biblical_names.txt",{
  type:    "GET",
  success: function(text) {
    // `text` is the file text
    console.log(text);
    console.log($("#names"));
    $("#names")[0].value = text;
  },
  error:   function() {
    // An error occurred
    console.log("something died");
  }
});

console.log('This would be the main JS file.');
