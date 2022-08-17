<?php
$file_xml = "feed_auto-ATOM1.0.xml";
$file_xsl = "transform-to-html5.xsl";
// DOM-Objekt für XML erstellen und Datei laden
$obj_xml = new DomDocument();
$obj_xml -> load($file_xml);
// DOM-Objekt für XSL erstellen und Datei laden
$obj_xsl = new DomDocument();
$obj_xsl -> load($file_xsl);
// Objekt für XSL-Transformation erstellen
$obj_xsltprocessor = new XsltProcessor();
// Stylesheet XSL-Objekt importieren
$obj_xsltprocessor -> importStylesheet($obj_xsl);
// Parameter auslesen und übergeben
// setParameter( NAMESPACE, PARAMETERNAME, WERT)
// echo $_GET['stichwort'];
if(isset($_GET['stichwort'])) {
  $obj_xsltprocessor -> 
      setParameter(null, 'stichwort', $_GET['stichwort']);
}
// XSL-Transformation durchführen, Ergebnis ist Zeichenkette!
$str_output = $obj_xsltprocessor -> transformToXml($obj_xml);
// Ausgabe des Ergebnisses in die Seite
echo $str_output;
?>