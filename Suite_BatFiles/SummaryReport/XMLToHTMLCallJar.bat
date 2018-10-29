pushd "%~dp0"
set  AutomationBasepath="%~dp0"

set sJavaDepFiles=%AutomationBasepath%

set sJavaDepFiles=%sJavaDepFiles:\=\\%

::set sJavaDepFiles=C:\\Automation\\QTP\\Encompass\\Main\\Core2P\\Suite_BatFiles\\SummaryReport
java -cp XMLToHTML.jar;. XMLToHTML %sJavaDepFiles%EmailSummaryConsolidatedReport.xsl %sJavaDepFiles%EmailSummaryConsolidatedReport.xml %sJavaDepFiles%EmailSummaryConsolidatedReport.html

