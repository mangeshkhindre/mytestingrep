'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2359 Conditional Approval 3 - Clear conditions.
'@ Test Automation JIRA Task: PTAC-2925 E2E_9VANoCORefiARM_ConditionalApproval
'@ TestData: None
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
	'4 Status should be 'fulfilled' Under preliminary conditions tab.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2359","Conditional Approval 3 - Clear conditions.", Null

'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()
GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), 60

Dim strConditionNameSelected, intRowCount, strConditionName, intRowNumber, blnConditionFullfilled
'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
	FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

'====== Checks the FullFilled Checkbox for all the conditions ======
intRowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"))

For intRowNumber     = 0 To intRowCount -1  Step 1
	strConditionName = GUI_List_ClickOnCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 2, True, True, False, "Double")
	BIZ_PreliminaryConditions_FulfilledByConditionDescription(strConditionName)
Next

blnConditionFullfilled = True

For intRowNumber     = 0 To intRowCount -1  Step 1
	strConditionName = GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 7)
	
	If (strConditionName <> "Fulfilled") Then
		blnConditionFullfilled = False
	End If
Next

If (blnConditionFullfilled = True) Then 
	FRM_Logger_ReportPassEvent "Check the fulfilled condition for each condtion", "Preliminary conditions are Fulfilled", Null
Else
	FRM_Logger_ReportPassEvent "Check the fulfilled condition for each condtion", "Preliminary conditions are not fulfilled", Null
End If

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()
