'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1117 HP File started 7-Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: Services, Underwriting, E2E_HappyPath
'@ Pre-conditions: Loan Number should be present
'@ Description:  
'@ TestSteps:
	'01 Click on services and click Request Underwriting
	'02 Select Fanniemae DU on Epass and click 'submit' button.
	'03 Click on "update DU Settings".
	'04 Fill in the username and password if not populated by default.<Take the data from Test data column). click ok.
	'05 Click on "submit DU".
	'06 Click edit credit reference info.
	'07 Select test credit agency(200) and click ok.
	'08 Click submit
	'09 Click continue (Note: Please make sure that DU direct settings file is in the right path. For this
	    'Open remove UAC exe.file
	    'Click on "Open Encompass Data Folder" button.
	    'Click on settings.
	    'Click on e-pass.
	    'Make sure that DUdirect settings file is here. If it is not you have to place it here.)
	'10 Click 'import conditions' button in the DU underwriting page.
	'11 Select a condition from the list and click import.
	'12 Go to e-folder and click preliminary conditions.
	'13 Click add.
	'14 Select add conditions from DU findings radio button and click "Ok"
'@ ExpectedResult: 
    '01 Underwriting window popup should open
	'02 Service view tab should open.
	'03 Update DU via elliemae network window should open.
	'04 DU window will close.
	'05 DU via Elliemae network window opens.
	'06 Edit credit reference information will open.
	'07 Goes back to DU via Elliemae network and acct number and password will populate.
	'08 Incomplete loan application window will open if there are any incomplete fields.
	'09 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible.
	'10 A list of conditions will be shown.
	'11 Condition will be imported.
	'12 E-folder will open.
	'13 Add condition pop up window should open.
	'14 Condition should be added.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case :PTAC-1117","HP File started 7-Order Automated underwriting,Import conditions", Null

'Order Request Underwriting service with required test data
BIZ_Services_RequestUnderwriting "E2E_HappyPath"

Dim objConditionDialog, strDuRecommendation, objWshShell, objImportButtons

strDuRecommendation      = "Approve/Eligible"
Set objConditionDialog   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ImportConditionsDialog")
Set objWshShell          = CreateObject("WScript.Shell")

'Verify is DU Result is returned as Approve/Eligible
FRM_VerifyEqual BIZ_Services_GetDUResult("Recommendation"),strDuRecommendation , "DU Recommendation Status", "Recommendation should be Approve/Eligible"
Wait g_TinyWaitMedium

Set objImportButtons = SwfWindow("swfname:=MainForm").Page("title:=Ellie Mae - DO Direct").Frame("name:=FanImport").WebButton("name:=Import Conditions")
GUI_Object_WaitTillExistX objImportButtons, 240
'Import conditions from DU after the DU result 
GUI_WebButton_Click objImportButtons

If (GUI_Object_IsExistX(objConditionDialog, 90)) Then 
	FRM_Logger_ReportInfoEvent "Click 'import conditions' button in the DU underwriting page.", "A list of conditions will be shown", Null
	GUI_List_Select objConditionDialog.SwfListView("swfname:=lvConditions"), "Misc"
	objWshShell.SendKeys "+{DOWN}"
	GUI_SwfButton_Click objConditionDialog.SwfButton("swfname:=btnImport")
End If

'Navigate to eFolder
BIZ_Nav_SelectLoanTab

BIZ_PreliminaryConditions_AddDUFindings()

Set objConditionDialog    = Nothing
Set objWshShell           = Nothing
Set objImportButtons      = Nothing
