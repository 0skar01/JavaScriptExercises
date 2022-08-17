<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />
    <xsl:param name="country"></xsl:param>
    <param name="pfad" select="catalog/cd/country"/>
    <xsl:template match="/">
        <html lang="de">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CD Katalog</title>
                <link rel="stylesheet" href="css/catalog.css" />
            </head>
            <body>
                <h1>CD Katalog</h1>
                <form action="" method="">
                    <fieldset>
                        <legend>CD suchen</legend>
                        <input type="radio" value="" name="country" id="country0">
                            <xsl:if test="$country=''">
                                <xsl:attribute name="checked">checked</xsl:attribute>
                            </xsl:if>
                        </input>
                        <label for="country0"><img src="img/worldwide.svg" alt=""/></label>
                        <xsl:for-each select="catalog/cd">
                            <xsl:sort select="@country" order="ascending"/>
                            <xsl:if test="not(preceding-sibling::book/@country=@country">
                                <input type="radio" value="{@country}" name="country" id="country{positioin()}">
                                    <xsl:if test="@country=$country">
                                        <xsl:attribute name="checked">checked</xsl:attribute>
                                    </xsl:if>
                                </input>
                                <label for="category{position()}"><xsl:value-of select="@category"/></label>
                            </xsl:if>
                        </xsl:for-each>
                        &#160;
                        <input type="submit" value="suchen"/>
                    </fieldset>
                </form>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>