<?php
  include "../includes/functions.inc.php";
	connectdb();
  sleep(1);
  header("Content-Type: application/xml; encoding=UTF-8");
  echo '<?xml version="1.0" encoding="UTF-8"?>';
  /*
  GET oder POST verarbeiten für einfaches Testen
  liste : regionen, laender, staedte, landesinfo, stadtinfo 
  suche 
  POST und GET Variable müssen noch in den "Sicherheitscheck"!
  */
 $liste = isset($_POST['liste']) ? $_POST['liste'] : 
              (isset($_GET['liste']) ? $_GET['liste'] : '' );
  $suche = isset($_POST['suche']) ? $_POST['suche'] : 
              (isset($_GET['suche']) ? $_GET['suche'] : '' );
  $sql = "";
  $anzFelder = 1;
	
  switch ($liste) {
      case "regionen":
          $sql = "SELECT DISTINCT Region 
                  FROM Country 
                  WHERE Continent = ? 
                  ORDER BY Region;";
          break;
      case "laender":
          $sql = "SELECT DISTINCT Name AS Land 
                  FROM Country 
                  WHERE Region = ? 
                  ORDER BY Name;";        
          break;
      case "staedte":
					$sql = "SELECT city.ID, city.Name from country
									JOIN city ON country.Code=city.CountryCode
                  WHERE country.Name=?
                  ORDER BY city.Name ASC;";				
          $anzFelder = 2;		 
          break;
      case "landesinfo":
          $sql = "SELECT * FROM country 
                  WHERE name=?";
          break;
      case "stadtinfo":
          $sql = "SELECT Name, District, Population FROM city 
                  WHERE ID=?";
          break;		
  }
  if($sql == "") {
    die ("<Daten>Ungültige Suche, keine Daten!</Daten>");
  } else {
    // Wenn ein Datensatz aus mehr als einem Feld besteht
    // wird er in das Tag Datensatz gebündelt
    $anfang = $anzFelder == 1 ? "" : "<Datensatz>";
    $ende = $anzFelder == 1 ? "" : "</Datensatz>";
    
    // Prepared Statements vorbereiten
    $stmt   =   $mysqli ->  prepare($sql);
    
    if($liste == "stadtinfo") {    
      $stmt   ->  bind_param("i", $suche);
    } else {
      $stmt   ->  bind_param("s", $suche);    
    }
    $stmt   ->  execute();
    $resultat = $stmt  ->  get_result();
    echo "<Daten>";
    while($rs = $resultat -> fetch_assoc()){
      echo $anfang;
      foreach($rs as $key => $value) {
        echo "<$key>$value</$key>";
      }
      echo $ende;
    }
    echo "</Daten>";
  }
  closedb();
?>
