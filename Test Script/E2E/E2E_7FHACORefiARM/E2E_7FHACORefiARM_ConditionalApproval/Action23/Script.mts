'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2660 FHACOREFIARM Conditional Approval 3 - Clear conditions.
'@ Test Automation JIRA Task: PTAC-2718 E2E_7FHACORefiARM_ConditionalApproval
'@ TestData: eFolder_Tab, SetPreliminaryConditionStatus, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click e-folder.
	'2 Click preliminary conditions tab.
	'3 Select each condition.
	'4 Check fulfilled.
'@ ExpectedResult: 
	'1.E-folder should open.
	'2.Preliminary conditions will be shown.
	'3 Preliminary conditions details window will open
    '4 Status should be 'fulfilled' Under preliminary conditions tab.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2660","PTAC-2660 - Clear Conditions", Null

Dim strConditionNameSelected, intRowCount, intRowNumber, strConditionName
'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), 60

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
	FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", null
End if

'====== Checks the FullFilled Checkbox for all the conditions ======
intRowCount  = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"))

For intRowNumber     = 0 To intRowCount -1  Step 1
	strConditionName = GUI_List_ClickOnCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 2, True, True, False, "Double")
	E2E_PreliminaryConditions_FulfilledByDescription strConditionName
Next

BIZ_PreliminaryConditions_VerifyAllConditionStatus "Fulfilled"
'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()