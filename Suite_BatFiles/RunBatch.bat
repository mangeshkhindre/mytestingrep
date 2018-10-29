pushd "%~dp0"

for %%i in ("%~dp0..") do set "folder=%%~fi"
set  AutomationBasepath=%folder%

Set TestCaseFile=%1
::Set TestCaseFile="TestCase_Push2QA_SecondaryMarket_Sheet4.xlsx"
::Echo %TestCaseFile%
Set ServerName=%2
::Echo %ServerName%

CScript %AutomationBasepath%"\Suite_BatFiles\DeleteXMLFiles.vbs"

CScript %AutomationBasepath%"\Test Configuration\RunBatch.vbs" %TestCaseFile% %ServerName%

CScript %AutomationBasepath%\Suite_BatFiles\SummaryReport\EmailSummaryConsolidatedReport.vbs

CScript %AutomationBasepath%\Suite_BatFiles\ConsolidatedBatchReport.vbs
CScript %AutomationBasepath%\Suite_BatFiles\SummaryReport\XMLToHTMLCallBat.vbs

CScript %AutomationBasepath%\Suite_BatFiles\XMLToHTMLCallBat.vbs
CScript %AutomationBasepath%\Suite_BatFiles\ConvertHTMLToZip.vbs

CScript %AutomationBasepath%\Suite_BatFiles\MailAlert.vbs %EmailRecipientList% %NODE_LABELS%