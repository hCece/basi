<!DOCTYPE html>
<html>
<head>
	<title>Storico corse</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>
    <script src="../../shared/lib/Update.js"></script>


	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2 id="title"> </h2>
	<table>
		<thead>
			<tr>
				<th>ICD</th>
				<th>Partenza</th>
                <th>Arrivo</th>
                <th>data</th>
                <th>Cliente</th>
                <th>Tassista</th>
                <th>Importo</th>
                <th>Tel</th>
                <th></th>
			</tr>
		</thead>

		<tbody id="table-body">
		</tbody>

	</table>
	<div id="popup1" class="popup">
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup1()">&times;</span>
            <p>Voto: <span id="Votovalue"></span></p>
            <p>Commento: <span id="Commentovalue"></span></p>
        </div>
    </div>
    <div id="popup2" class="popup">
            <div class="popup-content">
                <span class="close-btn" onclick="closePopup2()">&times;</span>
                <p>Nessuna recensione inserita per questa corsa</p>
                <p>scrivine una adesso!</p>

                    <div>
                        <label for="votoInput">Voto:</label>
                        <input type="number" id="votoInput" min="1" max="10"><br><br>
                    </div>
                    <div>
                         <label for="commentoInput" >Commento:</label><br>
                        <textarea id="commentoInput" maxlength="200" rows="8" cols="50"></textarea><br><br>
                    </div>
                    <div>
                        <button class="submit" id="submit" >Invia recensione</button>
                    </div>
            </div>
    </div>
  </body>
      <script src="script.js"></script>

</html>