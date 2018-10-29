'@**************************************************************************************************
'@ TestStory: NICE-9913 Add 18.3 New Fields to Reporting Database
'@ TestCase: 
 
   ' The objective of the test case is to verify Reporting Database Login and importing new fields

'@ Test Automation JIRA Task: NICE-10688  Automation Utility through UFT for testing the story point
'@ TestData: 
   '1 Global_Data, Login and AdminTools_Login
   '2 Test data kept within Test folder, the text file should be kept with the script folder (e.g. NBO_XCO.txt)
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Launch the Admin tool Path Open the Encompass path:C:\SmartClientCache\Apps\Ellie Mae\Encompass
   '2 Select "AdminTools" Icon and double click the application
   '3 Click on <Yes> button
   '4 Click on <Reporting Database> link
   '5 Enter user Id & Password in Environments and click on Login button
   '6 After navigating click on the quick entry button and import the fields through text file
'@ ExpectedResult:
   
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3580","Script Name: SmokeTestSuite_VerifyAdminTools", Null


'======= The objective of the test case is to verify Reporting Database Login =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3518","The objective of the test case is to verify Reporting Database Login", Null
BIZ_Login_OpenAdminTool()
BIZ_Login_SelectAdminTool "Reporting Database"
'====== Login to the Encompass ======
BIZ_AdminTools_Login "AdminTools_Login"


GUI_Dialog_Encompass_YesX 15,"One or more of the Reporting Database fields are out-of-date.*"

Set objDialog =Dialog("index:=0","visible:=True","text:=Reporting Database")

If objDialog.Exist(15) Then
	GUI_WinButton_Click objDialog.WinButton("text:=.*Yes")
End If

Set objDialogRebPipeline =Dialog("index:=0","visible:=True","regexpwndtitle:=Rebuild Pipeline","swfname:=ProgressDialog.*")

If objDialogRebPipeline.SwfLabel("swfname:=lblStatus1").WaitProperty("visible","false", 30)  Then
	
Else
 If objDialogRebPipeline.Exist(1) Then
 	objDialogRebPipeline.SwfButton("swfName:=btnCancel").Click
 End If
	
End If
'Reporting data Population has been cancelled


If GUI_Object_IsExistX(Dialog("text:=Encompass","is child window:=False","is owned window:=True"),30) Then
   GUI_Dialog_Encompass_OK "OK"
End If



If GUI_Object_IsExistX(Dialog("text:=Encompass","is child window:=False","is owned window:=True"),30) Then
   GUI_Dialog_Encompass_OK "OK"
End If

If GUI_Object_IsExistX(SwfWindow("swfname:= LoanXDBManager"),80) Then
   FRM_Logger_ReportPassEvent "Reporting Database Login","Logged in as Reporting Database", Null
Else
   FRM_Logger_ReportFailEvent "Reporting Database Login","Unable to Logged in as Reporting Database", Null
End If

'Click on the Quick add button for importing multiple fields
GUI_SwfObject_Click SwfWindow("swfname:= LoanXDBManager").SwfObject("swfname:=quickAddBtn")

GUI_SwfButton_Click SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= AddFields").SwfButton("swfname:=importBtn")


strFilename = Environment("TestDir")&"\" & "NBO_XCO.txt"
	wait(10)
	SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= AddFields").Dialog("text:=Open").Highlight 
	GUI_WinEdit_Type SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= AddFields").Dialog("text:=Open").WinEdit("nativeclass:=Edit","attached text:=File .*name:"), strFilename
	GUI_WinButton_Click SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= AddFields").Dialog("text:=Open").WinButton("text:=&Open")
	
	While(SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= InstanceSelectorDialog").Exist(1))
	
	GUI_SwfButton_Click SwfWindow("swfname:= LoanXDBManager").SwfWindow("swfname:= InstanceSelectorDialog").SwfButton("swfname:=okBtn")
	wait 2
	Wend

	GUI_SwfButton_Click SwfWindow("swfname:= LoanXDBManager").Swfbutton("swfname:=btnUpdate")
	
	Set RepDialog=SwfWindow("swfname:= LoanXDBManager").Dialog("regexpwndtitle:=Encompass","index:=0","visible:=True","ispopupwindow:=True")
	
	GUI_DialogObject_Encompass_Click RepDialog,15,"Are you sure you want to update the Reporting Database?","Yes"
	
	GUI_DialogObject_Encompass_Click RepDialog,15,"Should the newly added fields be made accessible to all personas?","Yes"
	
	If SwfWindow("swfname:= LoanXDBManager").SwfWindow("text:=.*").SwfLabel("swfname:=lblStatus").WaitProperty("visible","false",10) Then
		GUI_DialogObject_Encompass_Click RepDialog,15,"The Reporting Database has been updated","Yes"
		
	End If
	
	GUI_DialogObject_Encompass_Click RepDialog,15,"One or more of the Reporting Database fields are out-of-date.*","Yes"
	
	GUI_WinButton_Click RepDialog.WinButton("text:=.*Yes")
	
	Set RebuildPipelinDialog=SwfWindow("swfname:= LoanXDBManager").Dialog("index:=0","visible:=True","regexpwndtitle:=Rebuild Pipeline","swfname:=ProgressDialog.*")
	
	If RebuildPipelinDialog.SwfLabel("swfname:=lblStatus.*").WaitProperty("visible","false",10000) Then
	
Else
 If RebuildPipelinDialog.Exist(1) Then
 	RebuildPipelinDialog.SwfButton("swfName:=btnCancel").Click
 End If
		
	End if
	
	If SwfWindow("swfname:= LoanXDBManager").Dialog("index:=0","visible:=True","regexpwndtitle:=Rebuild Pipeline").SwfLabel("swfname:=lblStatus.*").WaitProperty("visible","false",10) Then
		
	Else
		GUI_DialogObject_Encompass_Click RepDialog,15,"The reporting data population process has been canceled.*","Ok"
	End If

GUI_DialogObject_Encompass_Click RepDialog,15,"Do you want to close Reporting Database Tool.*","Yes"

GUI_DialogObject_Encompass_Click RepDialog,15,"You have modified the field list without updating.*","Yes"

BIZ_AminTools_Close()


FRM_RT_TearDownTest(Null) 
