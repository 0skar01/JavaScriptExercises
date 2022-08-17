<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />
    <xsl:variable name="lower">abcdefghijklmnopqrstuvwxyzäöü</xsl:variable>
    <xsl:variable name="upper">ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ</xsl:variable>
    <xsl:param name="stichwort"></xsl:param>
    <xsl:param name="city"></xsl:param>
    <xsl:variable name="getId" select="standorte/cities/city[@id = $city]/@id" />
    <xsl:param name="path" select="standorte/stationen/station[@cityref = $getId and contains(translate(., $lower, $upper), translate($stichwort, $lower, $upper))]" />
    <xsl:template match="/">
        <html lang="de">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Standorte</title>
                <link rel="stylesheet" href="../css/standorte.css" />
            </head>
            <body>
                <h1>Carsharing Standorte</h1>
                <form action="standorte.php" method="get">
                    <fieldset>
                        <legend>station suchen</legend>
                        <h3>Stadt auswählen</h3>
                        <xsl:for-each select="standorte/cities/city">
                            <div>
                                <input type="radio" value="{@id}" name="city" id="city{position()}">
                                    <xsl:if test="@id=$city">
                                        <xsl:attribute name="checked">checked</xsl:attribute>
                                    </xsl:if>
                                </input>
                                <label for="city{position()}">
                                    <xsl:value-of select="." />
                                </label>
                            </div>
                        </xsl:for-each>
                        <br />
                        <br />
                        <label for="stichwort">Stichwort: </label>
                        <input type="text" id="stichwort" name="stichwort" value="{$stichwort}" />
                        &#160;
                        <input type="submit" value="Anzeigen" id="button"/>
                        <xsl:if test="not($city) and not($stichwort)">
                            <p>Bitte wählen Sie eine Stadt und geben Sie - optional - ein Stichwort ein!</p>
                        </xsl:if>
                        <xsl:if test="$stichwort and not($city)">
                            <p>Bitte wählen Sie zunächst eine Stadt aus.</p>
                        </xsl:if>
                        <xsl:if test="count($path) = 0 and $city">
                            <p>
                                Ich habe leider keine Station in
                                <Strong>
                                    <xsl:value-of select="standorte/cities/city[@id = $getId]" />
                                    ,
                                    <xsl:value-of select="$stichwort" />
                                </Strong>
                                gefunden
                            </p>
                        </xsl:if>
                        <xsl:if test="count($path) = 1 and $city">
                            <p>
                                Ich habe eine Station in
                                <Strong>
                                    <xsl:value-of select="standorte/cities/city[@id = $getId]" />
                                    ,
                                    <xsl:value-of select="$stichwort" />
                                </Strong>
                                gefunden
                            </p>
                        </xsl:if>
                        <xsl:if test="count($path) &gt; 1 and $city">
                            <p>
                                Ich habe
                                <Strong>
                                    <xsl:value-of select="count($path)" />
                                </Strong>
                                Stationen in
                                <Strong>
                                    <xsl:value-of select="standorte/cities/city[@id = $getId]" />
                                    ,
                                    <xsl:value-of select="$stichwort" />
                                </Strong>
                                gefunden
                            </p>
                        </xsl:if>
                    </fieldset>
                </form>

                <xsl:for-each select="$path">
                    <section>
                        <a href="{geopos/@url}">
                            <h2>
                                <xsl:value-of select="name" />
                                (
                                <xsl:value-of select="address/city" />
                                )
                                <svg xmlns="http://www.w3.org/2000/svg" style="display: inline-block; width: 1.5rem; height: 1.5rem;">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../images/icons.svg#icon-spot"></use>
                                </svg>
                            </h2>
                        </a>
                        <p>
                            <xsl:value-of select="address/street" />
                            &#160;
                            <xsl:value-of select="address/number" />
                        </p>
                        <p>
                            <xsl:value-of select="address/zip" />
                            &#160;
                            <xsl:value-of select="address/city" />
                            &#160;(
                            <xsl:value-of select="address/district" />
                            )
                        </p>
                    </section>
                </xsl:for-each>
                <xsl:if test="count($path) &gt; 2">
                    <section>
                        <a href="#">zum Seitenanfang</a>
                    </section>
                </xsl:if>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>