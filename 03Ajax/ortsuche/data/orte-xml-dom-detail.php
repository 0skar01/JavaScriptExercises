<?php
	// data/orte-xml-dom.php
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
		DOM-XML Objekt erstellen und Datensätze als Knoten hinzufügen
		createElement(), createTextNode() und appendChild()
		sind aus JavaScript bekannt.
		Die Spaltennamen des Abfrageergebnisses
		werden als XML-Elementnamen eingesetzt.
		Das funktioniert mit beliebigen Tabellen!!! :)
  */
	$dom = new DomDocument("1.0", "UTF-8"); 
	$orte = $dom -> createElement("orte");
	while($rs = $resultat -> fetch_assoc()) {
		$ort = $dom -> createElement("ort");
		foreach($rs as $key => $value) {
			$feld = $dom -> createElement($key);	
			$feld -> appendChild($dom -> createTextNode($value));
			$ort -> appendChild($feld);
		}
		$orte -> appendChild($ort);
	}
	$dom -> appendChild($orte);
	/* saveXML() erzeugt aus einem DOM-Objekt eine XML Zeichenkette */
	echo $dom -> saveXML(); 
	/* Datenbank schließen und Ressourcen freigeben */
	closedb();

?>