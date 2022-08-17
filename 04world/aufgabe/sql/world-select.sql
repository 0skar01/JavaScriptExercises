-- Kontinent auswählen

SELECT DISTINCT Continent FROM Country ORDER BY Continent ASC;
SELECT DISTINCT Continent AS Kontinent FROM Country ORDER BY Continent;

-- Region auswählen
SELECT DISTINCT Region FROM Country WHERE Continent = 'Asia' ORDER BY Region;

-- Land auswählen, brauche Code, um die Stadt zu wählen
SELECT DISTINCT Name AS Land, Code FROM Country WHERE Region = 'Middle East' ORDER BY Name;

-- Stadt auswählen
SELECT country.Code, city.ID, city.Name from country, city 
	where country.Code=city.CountryCode and country.Name='".$_GET["land"]."'
	ORDER BY city.Name ASC;




-- 
SELECT COUNT DISTINCT Name FROM Country
-- 239 unterschiedliche Namen und Codes der Länder
SELECT DISTINCT COUNT( Name) AS 'AnzLänder' FROM Country
SELECT DISTINCT COUNT( Code) AS 'AnzCodes' FROM Country

-- countrylanguage ist über den Code verknüpft, 984 Datensätze
-- city ist über den Code verknüpft, xxx Datensätze