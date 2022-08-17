<?php
	// data/orte-xml.php
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "../includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als XML Inhaltstyp übertragen
	header("Content-Type: application/xml; encoding=UTF-8");

	/* 
		Simulation korrupter Daten 
		die("<orte></ort>"); 
	*/
	
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
	sleep(2);

	/* 
		Ortsdaten als XML-Zeichenkette ausgeben 
		Die Spaltennamen des Abfrageergebnisses
		werden als XML-Elementnamen eingesetzt.
		Das funktioniert mit beliebigen Tabellen!!! :)
	*/
	echo '<?xml version="1.0" encoding="utf-8"?>';
	echo "<orte>";
	while($rs = $resultat -> fetch_assoc()) {
		echo "<ort>";
		foreach($rs as $key => $value) {
			echo "<$key>$value</$key>";
		}
		echo "</ort>";
	}
	echo "</orte>";
	/* Datenbank schließen und Ressourcen freigeben */
	closedb();

?>