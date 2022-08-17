<?php
	// data/fahrzeuge-json.php
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als JSON Inhaltstyp übertragen
	header("Content-Type: application/json; encoding=UTF-8");

	// Gesuchte Station?
	$station = isset($_POST["station"]) ? 
			$_POST["station"] : (isset($_GET["station"]) ? $_GET["station"] : "");
	// $station = 's2503';
	

	/* 
		Datensätze zum gesuchten stationsnamen finden
		? ist Platzhalter für dden stationsnamen
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

		/* Datensätze in Assoziativen Array Lesen */
		$vehicles = array();
		while($rs = $resultat -> fetch_assoc()) {
				$vehicles[] = array("vehicle" => $rs);
				// $vehicles[] = $rs;
		}
		$vehicles = array("vehiclesAtStation" => $vehicles);
	  
	 
		/*
			Array als JSON-String ausgeben
			http://php.net/manual/en/function.json-encode.php 
		*/
		echo json_encode($vehicles);
		/* Datenbank schließen und Ressourcen freigeben */
		closedb();
	} else {
		$error = $mysqli->errno . ' ' . $mysqli->error;
		echo $error; 
	}
?>