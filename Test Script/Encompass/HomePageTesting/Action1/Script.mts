'Automation task: Automate HomePage testing testcases
'Author: Ketan doshi
'Creation Date: 3/9/2018

FRM_RT_SetupTest(Null)

Set fso = CreateObject("Scripting.FileSystemObject")
Set objFile = fso.GetFile("c:\\windows\\System32\\drivers\\etc\\hosts")
objFile.Copy "c:\\windows\\System32\\drivers\\etc\\hosts_HomePage_Orig", True

Set objFile = Nothing

For intHostCount = 1 To 10 
	strRowID = "Host_IP" & Cstr(intHostCount)
	Set objData            = FRM_DS_GetTestData("Encompass_HomePageContent", "ValidateServer", strRowID)	
	If objData.Item("Execute") = "Y" Then
		RunAction "SplashScreenTest", oneIteration, objData.Item("IP"), objData.Item("Server")
		RunAction "WidgetsTest", oneIteration
		RunAction "LinksTest", oneIteration
	End If
Next

Set objFile = fso.GetFile("c:\\windows\\System32\\drivers\\etc\\hosts")
objFile.Delete(True)
Set objFile = fso.GetFile("c:\\windows\\System32\\drivers\\etc\\hosts_HomePage_Orig")
objFile.Move("c:\\windows\\System32\\drivers\\etc\\hosts")

Set objData = Nothing
Set objFile = Nothing
Set fso = Nothing

FRM_RT_TeardownTest(Null)



