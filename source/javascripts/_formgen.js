$(function(){
  $('#codegen').append("<form action='sharer.php' method='POST'/>");
  $('#codegen form').append("<div class= 'appm'>Save this</div>");
  $('#codegen form').append("<input type='text' placeholder='Name' name='routename' id='rname'/>");
  $('#codegen form').append("<input type='text' placeholder='description' id='rdescription' name='routedescription' class= 'address'/>");
  $('#codegen form').append("<input type='text' placeholder='tags' id='tags' name='routetags'  />");
  $('#codegen form').append("<br><input type='submit' id='savebutton' value = 'Save' />");
  $('#codegen form').append("</form>");
});
