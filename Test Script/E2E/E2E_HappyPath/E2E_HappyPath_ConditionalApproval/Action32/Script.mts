'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1142 - HP Conditional Approval 6-Clear  Conditions
'@ Test Automation JIRA Task: PTAC - 1144  E2E_HappyPath_ConditionalApproval
'@ TestData: NA
'@ Pre-conditions: Loan Number that finished the Submittal milestone is in E2E Property file
'@ Description: Order title and closing and finish milestone.
'@ TestSteps:
	'1 Click on eFolder > Preliminary Conditions
	   'Click on each condition and selected ‘Fulfilled’ checkbox
	   'Check conditions status as Fulfilled
'@ ExpectedResult: 
    'System should change the status of Preliminary conditions document status to "Fulfilled"
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1142","TestCase Name - HP Conditional Approval 6-Clear  Conditions", Null

Dim strConditionNameSelected, intRowCount, intRowNumber, strConditionName
'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), 60

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")
if(InStr(strConditionNameSelected, "Preliminary Conditions") > 0) then 
	FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", null
End if

'====== Checks the FullFilled Checkbox for all the conditions ======
intRowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"))
For intRowNumber = 0 To intRowCount -1  Step 1
	strConditionName = GUI_List_ClickOnCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 2, True, True, False, "Double")
	BIZ_PreliminaryConditions_FulfilledByConditionDescription(strConditionName)
Next

BIZ_PreliminaryConditions_VerifyAllConditionStatus "Fulfilled"
'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()
