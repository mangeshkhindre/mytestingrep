
Dim objTextStreamDel,fso11Del,fPath1Del

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1   = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath        = objEnvProjectBasePath1("ProjectBasePath")

xmlPathDel=Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults"
Set objfso11Del =CreateObject("Scripting.FileSystemObject")
Set fso11Del = CreateObject("Scripting.FileSystemObject")
fPath1Del=xmlPathDel
Set objTextStreamDel = objfso11Del.OpenTextFile(fPath1Del&"\TestDelete.txt", 8,True)
'Display the contents of the text file
objTextStreamDel.WriteLine "Elliemae"
'Close the file and clean up
objTextStreamDel.Close
If fso11Del.FileExists(fPath1Del&"\TestDelete.txt") Then
fso11Del.DeleteFile fPath1Del&"\*.*", True
End if
Set objTextStreamDel = Nothing
Set objfso11Del = Nothing
Set fso11Del = Nothing
