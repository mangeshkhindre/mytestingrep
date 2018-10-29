pushd "%~dp0"

for %%i in ("%~dp0..") do set "folder=%%~fi"
set  AutomationBasepath=%folder%

Set TestCaseFile=%1
::Set TestCaseFile="TestCase_Smoke_Dev.xlsx"
::Echo %TestCaseFile%
::Echo %NODE_LABELS%
::Echo %BUILD_URL%

CScript %AutomationBasepath%"\Suite_BatFiles\DeleteXMLFiles.vbs"
CScript %AutomationBasepath%"\Test Configuration\RunMultipleBatch.vbs" %TestCaseFile%
CScript %AutomationBasepath%\Suite_BatFiles\SummaryReport\EmailSummaryConsolidatedReport.vbs
CScript %AutomationBasepath%\Suite_BatFiles\ConsolidatedBatchReport.vbs
CScript %AutomationBasepath%\Suite_BatFiles\SummaryReport\XMLToHTMLCallBat.vbs
CScript %AutomationBasepath%\Suite_BatFiles\XMLToHTMLCallBat.vbs
CScript %AutomationBasepath%\Suite_BatFiles\ConvertHTMLToZip.vbs
CScript %AutomationBasepath%\Suite_BatFiles\MailAlert.vbs %EmailRecipientList% %NODE_LABELS%