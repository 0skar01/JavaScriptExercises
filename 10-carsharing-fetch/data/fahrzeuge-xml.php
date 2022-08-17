<?php
	// data/fahrzeuge-xml.php
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als XML Inhaltstyp übertragen
	header("Content-Type: application/xml; encoding=UTF-8");

	// Gesuchte Station?
	$station = isset($_POST["station"]) ? 
			$_POST["station"] : (isset($_GET["station"]) ? $_GET["station"] : "");

	/* 
		Datensätze zur gesuchten stationsid finden
		? ist Platzhalter für die stationsid
	*/
	$query = "SELECT v.vId, v.stationId, c.vClassName, m.vModelName, v.licensePlate
				FROM vehicle AS v
				JOIN vclass AS c ON c.vClassId = v.vClassId
				JOIN vmodel AS m ON m.vModelId = v.vModelId
				WHERE v.vStatus = 1 AND v.stationId=?
				ORDER BY v.stationId, v.vClassId, m.vModelName;";


	/* 
		Prepared Statement
		verhindert die Manipulation der SQL Anweisung
		durch Einschleusen von Befehlen in einen Parameter
	*/
	
	if($stmt = $mysqli->prepare($query)) { 
		$stmt->bind_param('s', $station);
		$stmt->execute();
		$resultat = $stmt  ->  get_result();

		/* Pause, kann AJAX Timeout-Fehler verursachen */
		sleep(1);

		echo '<?xml version="1.0" encoding="utf-8"?>';
		echo "<vehiclesAtStation>";
		while($rs = $resultat -> fetch_assoc()) {
			echo "<vehicle>";
			foreach($rs as $key => $value) {
				echo "<$key>$value</$key>";
			}
			echo "</vehicle>";
		}
		echo "</vehiclesAtStation>";  
		/* Datenbank schließen und Ressourcen freigeben */
		closedb();	
	} else {
		$error = $mysqli->errno . ' ' . $mysqli->error;
		echo $error; 
	}
?>