'@**************************************************************************************************
'@ Test Automation JIRA Task:
'@ TestData: 
   '1 Global_Data
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
'1.	Click on RemoveCache
'2.	Click on applaucher..exe
'3.	Provide the CID  ( CID from global sheet, late we externalize from the jenkins)
'4.	Launch the Encompass. 

'@ ExpectedResult:
'  Encompass should launch successfully
'***************************************************************************************************


'========================================================
	
	FRM_RT_SetupTest(null)
    FRM_Logger_ReportInfoEvent "Start process", "Akamai process automation", null
    
    strRowID = "Akamai_QA"
    strRowID1 = "Akamai_Prod"
    
 	 '====== Logout Encompass360 ======
    BIZ_Login_UserLogout
    
    '======== Login to the Encompass ========     
     FRM_Logger_ReportInfoEvent "Remove UAC and Launch Application", "Launching Encompass" , null
     BIZ_RemoveUAC 
    
    Set fso = CreateObject("Scripting.FileSystemObject")
	Set objFile = fso.GetFile("C:\\Windows\\System32\\drivers\\etc\\hosts")
	objFile.Copy "C:\\Windows\\System32\\drivers\\etc\\hosts_Orig", True

	strTestPath = Environment.Value("TestDir")
	Set objFile = fso.GetFile(strTestPath & "\\hosts")
	objFile.Copy "C:\\Windows\\System32\\drivers\\etc\\hosts", True
	
	Set objData = FRM_DS_GetGlobalTestData("Login", strRowID)
	strClientId = objData.Item("ClientId")
	strServer = objData.Item("SCServer")
	SystemUtil.Run("C:\SmartClientCache\Apps\Ellie Mae\Encompass\AppLauncher.exe")
	
	 If SwfWindow("swfname:=AuthenticationForm").Exist(10) Then
			SwfWindow("swfname:=AuthenticationForm").Activate
			SwfWindow("swfname:=AuthenticationForm").SwfCheckBox("swfname:=chkBoxAutoSignOn").Set "ON"
			GUI_SwfLabel_DblClick SwfWindow("swfname:=AuthenticationForm").SwfLabel("swfname:=label1"),48,8
			SwfWindow("swfname:=AuthenticationForm").SwfEdit("swfname:=txtBoxServerURL").Set strServer
			SwfWindow("swfname:=AuthenticationForm").WinEdit("regexpwndclass:=Edit","index:=0").Set strClientId
			SwfWindow("swfname:=AuthenticationForm").SwfButton("swfname:=btnLogin").Click
	End If
    wait 45
    SwfWindow("swfname:=LoginScreen").Activate
    SwfWindow("swfname:=LoginScreen").SwfButton("swfname:=cancelBtn").Click
   
    Set objFolder = fso.GetFolder("C:\\SmartClientCache\\Apps\UAC\\Ellie Mae")
    Set objSubFolder = objFolder.SubFolders
    For Each f1 in objSubFolder
      subFolderPath = f1.name 
    Next
    Set objTextStream = fso.OpenTextFile("C:\\SmartClientCache\\Apps\UAC\\Ellie Mae\\" &subFolderPath & "\\Encompass360\\OfflineReady_AppLauncher",1)
    strVersion = objTextStream.ReadAll
    objTextStream.Close
    
    FRM_Logger_ReportInfoEvent "Encompass version","Encompass old version is: " & strVersion, Null
    
    '============= Change host file to production ========================
    Set objFile = fso.OpenTextFile ("C:\\Windows\\System32\\drivers\\etc\\hosts",2)
    objFile.Write ""
    objFile.Close
    
    BIZ_Login_UserAppLauncherLogin strRowID1
    
    Set objFolder = fso.GetFolder("C:\\SmartClientCache\\Apps\UAC\\Ellie Mae")
    Set objSubFolder = objFolder.SubFolders
    For Each f1 in objSubFolder
      subFolderPath = f1.name 
    Next
    Set objTextStream = fso.OpenTextFile("C:\\SmartClientCache\\Apps\UAC\\Ellie Mae\\" &subFolderPath & "\\Encompass360\\OfflineReady_AppLauncher",1)
    strVersion = objTextStream.ReadAll
    objTextStream.Close
    
    FRM_Logger_ReportInfoEvent "Encompass version","Current Encompass version is: " & strVersion, Null
    
    Set fso = Nothing
    Set objFile = Nothing
    Set objFolder = Nothing
    Set objSubFolder = Nothing
    Set objTextStream = Nothing
    '================ 
    FRM_RT_TeardownTest(null)
    
'=====================End================================
 @@ hightlight id_;_1508540_;_script infofile_;_ZIP::ssf1.xml_;_
 @@ hightlight id_;_460390_;_script infofile_;_ZIP::ssf2.xml_;_
