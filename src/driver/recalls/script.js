request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;
for (var i = 0; i < sp.length; i++) { //look for the cookie with username
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    user = cookie.substring('user='.length);
    console.log(user);
    break;
  }
}
  window.onload = function () {
  const updateTable = new UpdateTable();
  const tableBody = document.getElementById("table-body"); // Get the tbody element
  updateTable.update(tableBody,PhpRequest.DB.RichiamiTassista,{user:user});

}
document.getElementById("title").textContent = "Lista richiami " + user;