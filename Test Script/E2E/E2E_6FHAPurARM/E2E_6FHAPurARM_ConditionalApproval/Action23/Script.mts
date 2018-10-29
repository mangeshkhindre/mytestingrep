'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase:  PTAC-2044 Conditional Approval 3 - Clear Conditions
'@ Test Automation JIRA Task: PTAC-2123 E2E_6FHAPURARM_ConditionalApproval
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

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2044","Test Case Name - Conditional Approval 3 - Clear Conditions", Null

Dim intConditionNameSelected,intRowCount,intRowNumber,ConditionName
'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
intConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(intConditionNameSelected, "Preliminary Conditions") > 0) Then 
	FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

'====== Checks the FullFilled Checkbox for all the conditions ======
intRowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"))

For intRowNumber  = 0 To 0 Step 1
	ConditionName = GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), intRowNumber, 2)
	GUI_List_ClickRow SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvConditions"), Null, 2, ConditionName, True, True, False, "Double"
	GUI_SwfCheckbox_Set SwfWindow("swfname:=PreliminaryDetailsDialog").SwfCheckBox("swfname:=chkFulfilled"),"On"
	GUI_SwfButton_Click SwfWindow("swfname:=PreliminaryDetailsDialog").SwfButton("swfname:=btnClose")
Next

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()