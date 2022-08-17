<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" version="1.0">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />
  <xsl:param name="stichwort"></xsl:param>
  <xsl:variable name="result" select="atom:feed/atom:entry[contains(translate(., $lower, $upper),translate($stichwort, $lower, $upper))]"></xsl:variable>
  <xsl:variable name="lower">abcdefghijklmnopqrstuvwxyzäöü</xsl:variable>
  <xsl:variable name="upper">ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ</xsl:variable>
  <xsl:template match="/">
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seitentitel</title>
        <link rel="stylesheet" href="stylesheet.css" />
      </head>
      <body>
        <div>
          <h1>XSL-Transformation</h1>
          <h1>
            <xsl:value-of select="atom:feed/atom:title"></xsl:value-of>
          </h1>
          <form action="feed.php" method="get">
            <label for="stichwort">Stichwortsuche: </label>
            <input type="text" name="stichwort" id="stichwort" value="{$stichwort}" />
            &#160;
            <input type="submit" value="suchen" />
          </form>
          <xsl:if test="not($stichwort='') and not(count($result) = 0)">
            Ihre Suche nach "
            <strong>
              <xsl:value-of select="$stichwort" />
            </strong>
            " ergab
            <strong>
              <xsl:value-of select="count($result)" />
            </strong>
            Treffer.
          </xsl:if>
          <xsl:if test="count($result) = 0">
            Es gibt keine aktuellen Artikel zu Ihrem Suchbegriff "
            <strong>
              <xsl:value-of select="$stichwort" />
            </strong>
            ". Bitte überprüfen Sie Ihr Stichwort und starten Sie eine neue Suche.
          </xsl:if>
        </div>
        <xsl:if test="count($result)&gt; 3">
          <div>
            <h1>Artikel-Übersicht</h1>
            <xsl:for-each select="$result">
              <p>
                <a href="#article{position()}">
                  <xsl:value-of select="atom:title" />
                </a>
              </p>
            </xsl:for-each>
          </div>
        </xsl:if>
        <xsl:for-each select="$result">
          <article id="article{position()}">
            <h2>
              <a href="{atom:link/@href}">
                <xsl:value-of select="atom:title" />
              </a>
            </h2>
            <p>
              <xsl:value-of disable-output-escaping="yes" select="atom:summary"></xsl:value-of>
            </p>
            <p>
              Autor:
              <xsl:value-of select="atom:author/atom:name" />
              , Updated:
              <xsl:value-of select="concat(substring(atom:updated, 9, 2), '.', substring(atom:updated, 6, 2), '.', substring(atom:updated, 1, 4), ', ', substring(atom:updated, 12, 5), 'Uhr')" />
              ,
              <a href="{atom:id}">Artikel lesen </a>
              <xsl:if test="count($result)&gt; 3">
                <a href="#">, zum Seitenanfang</a>
              </xsl:if>
            </p>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>