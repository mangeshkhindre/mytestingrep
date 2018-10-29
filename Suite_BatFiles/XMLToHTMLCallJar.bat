pushd "%~dp0"
set  AutomationBasepath="%~dp0"

set sJavaDepFiles=%AutomationBasepath%

set sJavaDepFiles=%sJavaDepFiles:\=\\%

::set sJavaDepFiles=C:\\Automation\\QTP\\Encompass\\Main\\Core2P\\Suite_BatFiles
java -cp XMLToHTML.jar;. XMLToHTML %sJavaDepFiles%ConsolidatedReport.xsl %sJavaDepFiles%BatchXMLResults\\ConsolidatedReport.xml %sJavaDepFiles%BatchXMLResults\\ConsolidatedReport.html

