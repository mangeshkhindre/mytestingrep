'@******************************************************************************************
'@ TestStory: E2E_BusinessRule_Field Triggers
'@ TestCase: Field Triggers Rule Set "Loan Type" Condition
'@ Test Automation JIRA Task: TA-4911
'@ TestData: NA
'@ Pre-conditions: NA
'@ Description:  
'@ TestSteps:1. Login into Encompass
'			 2. Go to Settings->Business Rules->Field Triggers
'            3. Create a field trigger with different conditions.
'            4. Create a new loan.
'            5. Apply condition on which business rule is created.
'            6. Check if business rule is triggered.
'            7. Go to Settings->Business Rules->Field Triggers
'            8. Select the newly created business rule.
'            9. Export the rule.
'            10.Delete the rule.
'            11.Import the rule and check if it is imported successfully or not.
'            12.Delete the rule and logout of Encompass. 
'@ ExpectedResult: 1.For test step-3,Business rule should be created successfully.
'                  2.For test step-6,Business rule should be triggered successfully.
'                  3.For test step-9,Business rule should be exported successfully.
'                  4.For test step-10,Business rule should be deleted successfully.
'                  5.For test step-11,Business rule should be imported successfully.
'********************************************************************************************

strRowID = Parameter("RowID")
strConditionName = Parameter("ConditionName")

'FRM_Logger_ReportStepEvent "Import/Export Functionality","Import and export functionality for "&strConditionName,NULL

FRM_Logger_ReportStepEvent "Test step-2","Go to Settings->Business Rules->Field Triggers.",NULL

'====Go to Settings->Business Rules->Field Triggers==========
BIZ_Nav_HierarchyTree "Business Rules","Field Triggers"

'============Delete the rule======================
BIZ_BR_FieldTriggers_DeleteExisting strRowID

FRM_Logger_ReportStepEvent "Test step-3","Create new business rule "&strRowID,NULL

'===========Click on + icon===============
BIZ_BR_FieldTrigger_CreateNewFieldTrigger(strRowID)

'=================Save rule=================
BIZ_BR_FieldTrigger_SaveRule()

'=============Check if rule is present in the list===================
BIZ_BR_FieldTrigger_Select strRowID,"Single"

strFileLocation = FRM_RT_ReportDirPath & "BR_FieldTriggers_" & strRowID & "_" & UTIL_Date_Now_mmddyyyy_HHnnss

FRM_Logger_ReportStepEvent "Test step-4","Export the business rule "&strRowID,NULL

''=============Export the rule==================
'BIZ_BR_FieldTrigger_ExportBusinessRule strFileLocation
'
''=============Check if rule is present in the list===================
'BIZ_BR_FieldTrigger_Select strRowID,"Single"
'
'FRM_Logger_ReportStepEvent "Test step-4","Activate business rule "&strRowID,NULL

If GUI_Object_IsEnabled(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Swfbutton("Swfname:=activeBtn")) Then

   '===============Activate the rule===================
    BIZ_BR_FieldTrigger_Activate()
 
End If

Wait 10

'=============Close the settings==================
BIZ_Nav_Settings_Close()

FRM_Logger_ReportStepEvent "Test step-5","Create new loan.",NULL

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

FRM_Logger_ReportStepEvent "Test step-6","Input data in field which will trigger rule "&strRowID,NULL

'==Go to Borrower Summary - Origination================
BIZ_Forms_Open "Borrower Summary - Origination"

'===========Enter data in the form so as to trigger the rule===========
InputFieldToTriggerBR strRowID

'=============Wait for sometime==============
Wait 5

'=========Press Tab==============
UTIL_Win_SendKey "{TAB}"

FRM_Logger_ReportStepEvent "Test step-7","Validate if business rule "&strRowID&" is triggered.",NULL

'===============Validate the business rule condition====================
ValidateBusinessRuleCondition(strRowID)

'=============Exit out of loan=============
BIZ_Loan_Exit(False)

'==============Navigate to home page===============
BIZ_Nav_SelectHomeTab()

'====Go to Settings->Business Rules->Field Triggers==========
BIZ_Nav_HierarchyTree "Business Rules","Field Triggers"

'FRM_Logger_ReportStepEvent "Test step-8","Import the business rule "&strRowID,NULL

'==============Import business rule=====================
'BIZ_BR_FieldTrigger_ImportBusinessRule strFileLocation
'
'Wait 5
'
'Set objFieldDataEntryList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule")
'
'boolIsFound = GUI_List_ClickRow(objFieldDataEntryList, NULL, "Name", strRowID, True, False, False, "Single")
'
'FRM_Logger_ReportStepEvent "Test step-9","Verify business rule "&strRowID&" is imported successfully.If not then try again.",NULL
'
''===============Check if rule is imported successfully=================
'If boolIsFound Then
'	FRM_Logger_ReportPassEvent "Import Business Rule","Business Rule "&strRowID&" is imported successfully.",NULL
'Else
'	'==============Import business rule=====================
'	BIZ_BR_FieldTrigger_ImportBusinessRule strFileLocation
'	Wait 5
'End If
'
'FRM_Logger_ReportStepEvent "Test step-9","Verify business rule "&strRowID&" is imported successfully.",NULL
'
'boolIsFound = GUI_List_ClickRow(objFieldDataEntryList, NULL, "Name", strRowID, True, False, False, "Single")
'
''===============Check if rule is imported successfully=================
'If boolIsFound Then
'	FRM_Logger_ReportPassEvent "Import Business Rule","Business Rule "&strRowID&" is imported successfully.",NULL
'Else
'	'==============Import business rule=====================
'	FRM_Logger_ReportFailEvent "Import Business Rule","Business Rule "&strRowID&" is failed to import.",NULL
'End If
'
''=============Check if rule is present in the list===================
'BIZ_BR_FieldTrigger_Select strRowID,"Single"
'
If GUI_Object_IsEnabled(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Swfbutton("Swfname:=activeBtn")) Then

   '===============Activate the rule===================
    BIZ_BR_FieldTrigger_Activate()
 
End If

Wait 10

'=============Close the settings==================
BIZ_Nav_Settings_Close()

FRM_Logger_ReportStepEvent "Test step-10","Create new loan.",NULL

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

FRM_Logger_ReportStepEvent "Test step-11","Input data in field which will trigger rule "&strRowID,NULL

'==Go to Borrower Summary - Origination================
BIZ_Forms_Open "Borrower Summary - Origination"

'===========Enter data in the form so as to trigger the rule===========
InputFieldToTriggerBR(strRowID)

'=========Press Tab==============
UTIL_Win_SendKey "{TAB}"

FRM_Logger_ReportStepEvent "Test step-12","Validate if business rule"&strRowID&" is triggered.",NULL

'===============Validate the business rule condition====================
ValidateBusinessRuleCondition(strRowID)

'=============Exit out of loan=============
BIZ_Loan_Exit(False)

'==============Navigate to home page===============
BIZ_Nav_SelectHomeTab()

'====Go to Settings->Business Rules->Field Triggers==========
BIZ_Nav_HierarchyTree "Business Rules","Field Triggers"

'============Delete the rule======================
BIZ_BR_FieldTriggers_DeleteExisting strRowID

'=============Close the settings==================
BIZ_Nav_Settings_Close()

