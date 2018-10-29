'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3257 CONVCASHOUTREFIFIX Conditional Approval 3 - Clear conditions.
'@ Test Automation JIRA Task:PTAC-3376 E2E_3CONVCASHOUTREFIFIX_ConditionalApproval
'@ TestData:  eFolder_Tab, SetPreliminaryConditionStatus, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click e-folder
   '2 Click preliminary conditions tab
   '3 Select each condition
   '4 Check fulfilled
'@ ExpectedResult: 
   '1 E-folder should open
   '2 Preliminary conditions will be shown
   '3 Preliminary conditions details window will open
   '4 Status should be fulfilled Under preliminary conditions tab
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3257","CONVCASHOUTREFIFIX Conditional Approval 3 - Clear conditions.", Null

'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
ConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(ConditionNameSelected, "Preliminary Conditions") > 0) Then 
    FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

'====== Checks the FullFilled Checkbox for all the conditions ======
BIZ_PreliminaryConditions_SetAllConditionsStatus "E2E_CONVCASHOUTREFIFIX"

BIZ_PreliminaryConditions_VerifyAllConditionStatus "E2E_CONVCASHOUTREFIFIX"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()