Set shell=CreateObject("WScript.Shell")
Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1   = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath        = objEnvProjectBasePath1("ProjectBasePath")

shell.CurrentDirectory=Local_ProjectBasePath + "Suite_BatFiles"
shell.Run "PassFailUpdateInHTMLCallJar.bat"
