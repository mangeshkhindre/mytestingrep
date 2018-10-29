Dim src
Dim dest
Dim oFSO

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1 = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath = objEnvProjectBasePath1("ProjectBasePath")

src =Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults\Report\" 
dest =Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults\Index.zip" 
''dest =Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults\ConsolidatedReport.zip" 
sourceFileHtml=Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults\index.html"
sXMLFiles=Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults"
sSummaryReport=Local_ProjectBasePath + "Suite_BatFiles"

WScript.sleep 8000

Set objFSOxml = CreateObject("Scripting.FileSystemObject")
objFSOxml.CopyFile sXMLFiles&"\ConsolidatedReport.html", sXMLFiles&"\index.html"
Set objFSOxml = Nothing

Set objFSOxml1 = CreateObject("Scripting.FileSystemObject")
objFSOxml1.CopyFile sSummaryReport&"\SummaryReport\EmailSummaryConsolidatedReport.html", sXMLFiles&"\Report\summary.html"
Set objFSOxml1 = Nothing

Set oFSO = CreateObject("Scripting.FileSystemObject")

If oFSO.FolderExists(src) Then
Else
' Create a new folder
oFSO.CreateFolder src
End If
' Copy a file into the new folder
' Note that the destination folder path must end with a path separator (\)
oFSO.CopyFile sourceFileHtml, src

''Create zip file

'write zip file header 
Set fso = createobject("Scripting.FileSystemObject") 
Set file = fso.OpenTextFile(dest, 2, True)
file.write "PK" & chr(5) & chr(6) & string(18,chr(0)) 
file.close 

Set shl = createobject("Shell.Application") 
shl.namespace(dest).copyhere shl.namespace(src).items 
Do until shl.namespace(dest).items.count = shl.namespace(src).items.count 
WScript.sleep 3000
Loop


'Set objFSOxml = CreateObject("Scripting.FileSystemObject")
'objFSOxml.CopyFile sXMLFiles&"\ConsolidatedReport.html", sXMLFiles&"\Index.html"
'Set objFSOxml = Nothing

