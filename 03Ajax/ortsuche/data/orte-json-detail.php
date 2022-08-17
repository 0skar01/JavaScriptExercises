<?php
	// data/orte-json-detail.php
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "../includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als JSON Inhaltstyp übertragen
	header("Content-Type: application/json; encoding=UTF-8");

	// Gesuchter Ortsname?
	$ort = isset($_POST["ort"]) ? 
			$_POST["ort"] : (isset($_GET["ort"]) ? $_GET["ort"] : "");

	/* 
		Datensätze zum gesuchten Ortsnamen finden
		? ist Platzhalter für dden Ortsnamen
	*/
	$query = "SELECT ort AS ortsname, bezirk, kreis, titel, 
			vorname, name, strasse, postleitzahl, 
			internet, telefon, telefax AS fax, email 
			FROM kommunaldatenbank 
			WHERE ort=?;";

	/* 
		Prepared Statement
		verhindert die Manipulation der SQL Anweisung
		durch Einschleusen von Befehlen in einen Parameter
	*/
	$stmt   =   $mysqli ->  prepare($query);
	$stmt   ->  bind_param("s", $ort);
	$stmt   ->  execute();

	$resultat = $stmt  ->  get_result();

	/* Pause, kann AJAX Timeout-Fehler verursachen */
	sleep(1);

	/* Datensätze in Assoziativen Array Lesen */
	$ort = array();
	while($rs = $resultat -> fetch_assoc()) {
			/* $ort[] = array("ort" => $rs); */
			$ort[] = $rs;
	}
	$orte = array("orte" => $ort);
  
  // echo var_dump($orte);
  // echo "<hr/>";
  
	/*
		Array als JSON-String ausgeben
		http://php.net/manual/en/function.json-encode.php 
	*/
	echo json_encode($orte);
	/* Datenbank schließen und Ressourcen freigeben */
	closedb();

?>