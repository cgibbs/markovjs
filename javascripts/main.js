$(document).ready(function() {
  console.log("test onload");
  document.getElementById("selButton").addEventListener("click", function(event) {
    var s = $("#sel")[0];
    $.ajax("javascripts/lists/" + s.options[s.selectedIndex].value + ".txt", {
      type:    "GET",
      success: function(text) {
        // `text` is the file text
        $("#names")[0].value = text;
      },
      error:   function() {
        // An error occurred
        console.log("something died");
      }
    });
  }, false);
});
