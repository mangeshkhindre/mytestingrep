'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1970 FHANOCHOTREFIFIX Conditional Approval 3 - Clear conditions.
'@ Test Automation JIRA Task: PTAC-2706 E2E_5FHANoCHOTRefiFix_ConditionalApproval
'@ TestData: eFolder_Tab, SetPreliminaryConditionStatus, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click e-folder.
	'2 Click preliminary conditions tab.
	'3 Select each condition.
	'4 Check fulfilled.
'@ ExpectedResult: 
	'1 E-folder should open.
	'2 Preliminary conditions will be shown.
	'3 Preliminary conditions details window will open
	'4 Status should be 'fulfilled' Under preliminary conditions tab
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1970","FHANOCHOTREFIFIX Conditional Approval 3 - Clear conditions", Null

'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

'====== Checks the Preliminary Condition Tab ======
Dim strConditionNameSelected
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
   FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

'====== Checks the FullFilled Checkbox for all the conditions ======
BIZ_PreliminaryConditions_SetAllConditionsStatus "E2E_FHANoCHOTRefiFix"
BIZ_PreliminaryConditions_VerifyAllConditionStatus "E2E_FHANoCHOTRefiFix"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()