pushd "%~dp0"
for %%i in ("%~dp0..") do set "folder=%%~fi"
set  AutomationBasepath=%folder%

CScript %AutomationBasepath%\Suite_BatFiles\ConvertHTMLToZip.vbs
