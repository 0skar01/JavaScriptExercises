<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  version="1.0">
<xsl:output method="html"
	doctype-system="about:legacy-compat"
	encoding="UTF-8"
	indent="yes" />
    <xsl:decimal-format name="de" decimal-separator="," grouping-separator="."/>
    <xsl:variable name="lower">abcdefghijklmnopqrstuvwxyzäöü</xsl:variable>
    <xsl:variable name="upper">ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ</xsl:variable>
    <xsl:param name="category"></xsl:param>
    <xsl:param name="pfad" select="bookstore/book[starts-with(@category, $category)]"/>
<xsl:template match="/">
<html lang="de">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bookstore</title>
    <link rel="stylesheet" href="css/bookstore.css" />
  </head>
  <body>
    <h1>XSL-Transformation</h1>
    <h2>Bookstore</h2>
    <h3>Alle Titel</h3>
    <ul>
        <xsl:for-each select="bookstore/book">
            <li><xsl:value-of select="title"/></li>
        </xsl:for-each>
    </ul>
    <p><xsl:value-of select="bookstore/book/title"/></p>
    <h2><xsl:value-of select="count($pfad)"/> Titel gefunden</h2>
    <form action="index.php" method="post">
        <fieldset>
            <legend>Bücher suchen</legend>
            <input type="radio" value="" name="category" id="category0">
                <xsl:if test="$category=''">
                    <xsl:attribute name="checked">checked</xsl:attribute>
                </xsl:if>
            </input>
            <label for="category0">alle</label>
            <xsl:for-each select="bookstore/book">
                <xsl:sort select="@category" order="descending"/>
                <xsl:if test="not(preceding-sibling::book/@category=@category)">
                    <input type="radio" value="{@category}" name="category" id="category{position()}">
                        <xsl:if test="@category=$category">
                            <xsl:attribute name="checked">checked</xsl:attribute>
                        </xsl:if>
                    </input>
                    <label for="category{position()}"><xsl:value-of select="@category"/></label> 
                </xsl:if>
            </xsl:for-each>
            &#160;
            <input type="submit" value="Anzeigen"/>
        </fieldset>
    </form>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Titel</th>
                <th>Autor</th>
                <th>Jahr</th>
                <th>Preis</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            <!-- <xsl:for-each select="bookstore/book[@category='web']"> -->
            <!-- <xsl:for-each select="bookstore/book[price &gt;= 100]"> -->
                <!-- <xsl:sort select="title" order="descending"/> -->
            <xsl:for-each select="$pfad">
                <xsl:sort select="year" order="ascending" data-type="number"/>
                <xsl:sort select="price" order="ascending" data-type="number"/>
                <tr>
                    <td>
                        <xsl:value-of select="position()"/>
                    </td>
                    <td>
                        <xsl:value-of select="title"/>
                    </td>
                    <td>
                        <xsl:for-each select="author">
                            <xsl:value-of select="."/>
                            <xsl:if test="not(position()=last())">,
                            </xsl:if>
                        </xsl:for-each>
                    </td>
                    <td>
                        <xsl:value-of select="year"/>
                    </td>
                    <td>
                        <xsl:value-of select="format-number(price, '#.##0,00', 'de')"/>
                    </td>
                    <td>
                        <xsl:value-of select="translate(substring(./@category,1,1),'abcdefghijklmnopqrstuvwxyzäöü','ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ')"/>
                        <xsl:value-of select="substring(./@category,2)"/>,
                        <xsl:choose>
                            <xsl:when test="./@cover">
                                <xsl:value-of select="translate(substring(./@cover,1,1),'abcdefghijklmnopqrstuvwxyzäöü','ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ')"/>
                                <xsl:value-of select="substring(./@cover,2)"/>
                            </xsl:when>
                            <xsl:otherwise>Hardcover</xsl:otherwise>
                        </xsl:choose>
                    </td>
                </tr>
            </xsl:for-each>
        </tbody>
    </table>
    
  </body>
</html>
</xsl:template>
</xsl:stylesheet>
