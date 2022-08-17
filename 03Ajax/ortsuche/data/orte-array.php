<?php
	// data/orte-array.php
  // http://php.net/manual/de/function.error-reporting.php
  // error_reporting(E_ALL & ~E_NOTICE);
  error_reporting(E_ALL);
	/* 
		Array für jQuery-UI Autocomplete Widget bereitstellen
			Widget sendet Variable 'term'
			Variable 'ort' wird zur Kompatibilität 
			mit anderen Beispielen zusätzlich abgefragt
	*/
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "../includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als JSON Inhaltstyp übertragen
	header("Content-Type: application/json; encoding=UTF-8");	

	// Stichwort der Ortsuche?
	$ort = isset($_GET["term"]) ? $_GET["term"] : 
							(isset($_POST["term"]) ? $_POST["term"] : 
									(isset($_POST["ort"]) ? $_POST["ort"] : 
											(isset($_GET["ort"]) ? $_GET["ort"] : "")));
  
	/* 
		Zum Stichwort passende Orte finden
		? ist Platzhalter für das Stichwort
	*/
	$query = "SELECT DISTINCT Ort 
							FROM kommunaldatenbank 
							WHERE Ort LIKE CONCAT('%',?,'%') 
							ORDER BY Ort ASC LIMIT 0, 20;";
							
	/* 
		Prepared Statement
		verhindert die Manipulation der SQL Anweisung
		durch Einschleusen von Befehlen in einen Parameter
	*/		
	
	$stmt   =   $mysqli ->  prepare($query);
	$stmt   ->  bind_param("s", $ort);
	$stmt   ->  execute();

	$resultat = $stmt   ->  get_result();

	/* Datensätze in Array Lesen */
	$orte = array();
	while($data = $resultat -> fetch_assoc()) {
		/* Ortsnamen in Anführungszeichen */
		$orte[] = "\"" . $data['Ort'] . "\"";
	}
	/* Array ausgeben als Komma-getrennte Zeichenkette */
	echo   "[" . implode(",", $orte) . "]";
	/* Datenbank schließen und Ressourcen freigeben */
	closedb();

?>