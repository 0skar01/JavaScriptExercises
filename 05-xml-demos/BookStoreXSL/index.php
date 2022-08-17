<?php
$file_xml = "bookstore.xml";
$file_xsl = "bookstore1.xsl";
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
if(isset($_POST['category'])) {
  $obj_xsltprocessor -> 
      setParameter(null, 'category', $_POST['category']);
}
// XSL-Transformation durchführen, Ergebnis ist Zeichenkette!
$str_output = $obj_xsltprocessor -> transformToXml($obj_xml);
// Ausgabe des Ergebnisses in die Seite
echo $str_output;
?>