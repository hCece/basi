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
  const update = new Update();
  const tableBody = document.getElementById("table-body"); // Get the tbody element
  update.table(tableBody,PhpRequest.Richiami.Tassista,{user:user});
   if (response == '[]') { // Check if the response is null
        // Hide the table and show error message
        tableBody.style.display = "none";
        table.style.display = "none"
        document.getElementById("title").innerHTML = "Nessun richiamo, continua così";

      }
}
document.getElementById("title").textContent = "Lista richiami " + user;