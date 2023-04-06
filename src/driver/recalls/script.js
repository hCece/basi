request = new PhpRequest();

let cookies = document.cookie;

var sp = cookies.split(';'); // here we split the cookies by semicolon and
var user = null;            //look for the cookie with username
for (var i = 0; i < sp.length; i++) {
  var cookie = sp[i].trim();
  if (cookie.indexOf('user=') == 0) {
    user = cookie.substring('user='.length);
    console.log(user);
    break;
  }
}

//when the page is requested fill the table by RichiamiTassta procedure
window.onload = function () {
  const update = new Update();
  const tableBody = document.getElementById("table-body");
  update.table(tableBody,PhpRequest.Richiami.Tassista,{user:user});
  console.log(response);
   if (tableBody.innerHTML == '') { //if user does not have any recalls (table body is empty) display a message
        tableBody.style.display = "none";
        table.style.display = "none"
        document.getElementById("title").innerHTML = "Nessun richiamo, continua così";

      }
}
document.getElementById("title").textContent = "Lista richiami " + user;