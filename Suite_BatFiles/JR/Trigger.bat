pushd "%~dp0"
set s1="C:\Automation\QTP\Encompass\Main\Core2P\Function Library"
set sDepFiles=C:\Automation\QTP\Encompass\Main\Core2P\Suite_BatFiles
set sJavaDepFiles=C:\\Automation\\QTP\\Encompass\\Main\\Core2P\\Suite_BatFiles
cscript %sDepFiles%\DeleteXMLFiles.vbs
::call %s1%\Merge3Library.bat
::for /f "delims=" %%x in (%sDepFiles%\ScriptOrder.txt) do (
::setx nQTPScript %%x
::set nQTPScript=%%x
::cscript %sDepFiles%\execution.vbs
::)
::Consolidated Report Generation
cscript %sDepFiles%\ConsolidatedBatchReport.vbs
java -cp XMLToHTML.jar;. XMLToHTML %sJavaDepFiles%\\BatchXMLResults %sJavaDepFiles%\\BatchXMLResults
java -cp PassFailUpdateInHTML.jar;. PassFailUpdateInHTML %sJavaDepFiles% %sJavaDepFiles%\\BatchXMLResults
cscript %sDepFiles%\MailAlert.vbs
