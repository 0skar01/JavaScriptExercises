<?php
	// data/orte-html-detail.php
	// Datenbank öffnen und $mysqli Objekt bereitstellen
  include "../includes/functions.inc.php";
	connectdb();
	
	// Ausgabe als HTML Inhaltstyp übertragen
	header("Content-Type: text/html; encoding=UTF-8");

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

	/* 
		Für jeden Datensatz einen TBODY in eine Tabelle schreiben
	*/
	echo "<table class=\"ortsdetail\">";
	while($rs = $resultat -> fetch_assoc()) {
		$kreis = $rs['kreis']=="" ? "Kreisfreie Stadt" : $rs['kreis'];
		echo "\n<tbody>
			<tr>
				<th colspan=\"2\">
					<strong>{$rs['ortsname']}</strong>, 
					Bezirk: <strong>{$rs['bezirk']}</strong>, 
					Kreis: <strong>$kreis</strong>
				</th>  
			</tr>
			<tr>
				<th colspan=\"2\">
					{$rs['titel']} {$rs['vorname']} {$rs['name']}
				</th>
			</tr>
			<tr>
				<td>
					{$rs['strasse']}<br/>  
					{$rs['postleitzahl']} {$rs['ortsname']}<br/>  
					<a href=\"http://{$rs['internet']}\">
					{$rs['internet']}</a>  
				</td>
				<td>
					Telefon: {$rs['telefon']}<br/>  
					Fax: {$rs['fax']}<br/>  
					E-Mail: <a href=\"mailto:{$rs['email']}\">
					{$rs['email']}</a>  
				</td>
			</tr> 
		</tbody>";
	}
	echo "\n</table>";
	/* Datenbank schließen und Ressourcen freigeben */
	closedb();

?>