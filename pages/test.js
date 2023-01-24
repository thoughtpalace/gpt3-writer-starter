// This is the function that will be called when the plugin is run.
function selectComments() {
  // Get all the elements on the page with the class "comment-renderer"
  var commentElements = document.getElementsByClassName("comment-renderer");
  
  // Loop through all the comment elements and add a highlight to each one.
  for (var i = 0; i < commentElements.length; i++) {
    commentElements[i].style.backgroundColor = "yellow";
  }
}

// Add an event listener to the plugin's button. When the button is clicked,
// run the selectComments function.
document.getElementById("my-plugin-button").addEventListener("click", selectComments);
