'@ *************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARM
'@ TestCase:  PTAC-805 - Conditional Approval 3- Clear conditions.
'@ Test Automation JIRA Task: PTAC-1023 E2E_2CONVPURARM_ConditionalApproval
'@ TestData		 : None
'@ Pre-conditions: N/A
'@ Description   : N/A
'@ TestSteps     :
	'1 Click e-folder.
	'2 Click preliminary conditions tab.
	'3 Select each condition.
	'4 Check fulfilled.
'@ ExpectedResult: 
	'1 E-folder should open.
	'2 Preliminary conditions will be shown.
	'3 Preliminary conditions details window will open
'@ ***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-805","Test Case Name : Conditional Approval 3- Clear conditions", Null

Dim strConditionNameSelected, intRowCount, intRowNumber, strConditionName

'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()
GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), 60

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
	FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

'====== Checks the FullFilled Checkbox for all the conditions ======
intRowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"))

For intRowNumber = 0 To intRowCount -1  Step 1
	strConditionName = GUI_List_ClickOnCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 2, True, True, False, "Double")
	BIZ_PreliminaryConditions_FulfilledByDescription(strConditionName)
Next

BIZ_PreliminaryConditions_VerifyAllConditionStatus "Fulfilled"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()
