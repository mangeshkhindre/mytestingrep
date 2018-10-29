'@******************************************************************************************
'@ TestStory: E2E_BusinessRule_Field Triggers
'@ TestCase: Persona Access to Loans Rule without Conditon
'@ TestCase: Persona Access to Loans Rule Set "Loan Purpose" Condition
'@ TestCase: Persona Access to Loans Rule Set "Advanced Conditions" Condition
'@ TestCase: Persona Access to Loans Rule Set "Doc Type" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Program" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Type" Condition
'@ TestCase: Persona Access to Loans Rule Set "Loan Status" Condition
'@ TestCase: Persona Access to Loans Rule Set "Property State" Condition
'@ TestCase: Persona Access to Loans Rule Set "Rate" Condition
'@ TestCase: Persona Access to Loans Rule Set "Current Role" Condition
'@ Test Automation JIRA Task:TA-4850
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_1"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_2"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_3"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_4"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_5"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_6"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_7"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_8"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_9"
'@ TestData: "BusinessRule_PersonaAccesstoLoans","PerosnaAccesstoLoans","E2E_BR_PersAcsToLoans_10"
'@ Pre-conditions: NA
'@ Description:  
'@ TestSteps:1. Login into Encompass
'			 2. Go to Settings->Business Rules->Persona Access to Loans
'            3. Create a new loan access rule with  with different conditions.
'			 4. Login with newly created user.
'            4. Create a new loan.
'            5. Apply condition on which business rule is created.
'            6. Check if loan has proper access rights which are set while creating rule.
'            7. Go to Settings->Business Rules->Persona Access to Loans
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

Set objData = FRM_DS_GetTestData("BusinessRule_PersonaAccesstoLoans", "PerosnaAccesstoLoans", strRowID)
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")

If strExecutionFlag = "Y" Then
	
FRM_Logger_ReportStepEvent "Import/Export Functionality","Import/Export functionality for "&strConditionName,NULL

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

FRM_Logger_ReportStepEvent "Test step-2","Go to Settings->Business Rules->Persona Access to Loans.",NULL

'====Go to Settings->Business Rules->Persona Access to Loans==========
BIZ_Nav_HierarchyTree "Business Rules","Persona Access to Loans"

'============Delete the rule======================
BIZ_BR_PersonaAccesstoLoan_DeleteExisting strRowID

FRM_Logger_ReportStepEvent "Test step-3","Create new business rule "&strRowID,NULL

'===========Click on + icon===============
BIZ_BR_PerosnaAccessToLoan_CreateNewAccessRule(strRowID)

'=============Check if rule is present in the list===================
BIZ_BR_PersonaAccestoLoan_Select strRowID,"Single"

FRM_Logger_ReportStepEvent "Test step-4","Activate business rule "&strRowID,NULL

'===============Activate the rule===================
BIZ_BR_PerosnaAccessToLoans_Activate()

'=============Close the settings==================
BIZ_Nav_Settings_Close()

'==============Logout of Encompass====================
BIZ_Login_UserLogout()

'=========Login with newly created user=================
BIZ_Login_UserLogin "e2ebrpal"

FRM_Logger_ReportStepEvent "Test step-5","Create new loan.",NULL

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

FRM_Logger_ReportStepEvent "Test step-6","Input data in field which will trigger rule "&strRowID,NULL

'==Go to Borrower Summary - Origination================
BIZ_Forms_Open "Borrower Summary - Origination"

'===========Enter data in the form so as to trigger the rule===========
InputFieldToTriggerBusinessRule(strRowID)

'==========Save loan========
BIZ_Loan_Save()

'===========Take Loan Number=============
BIZ_Loan_SaveLoanNumber()

strLoanNumber = BIZ_Loan_GetLoanNumber()

'=============exit loan==============
BIZ_Loan_Exit(False)

'=============Open Loan==============
BIZ_Loan_OpenLoanByColFieldValue "Loan Number",strLoanNumber

FRM_Logger_ReportStepEvent "Test step-7","Validate if business rule "&strRowID&" is triggered.",NULL

'===============Validate the business rule condition====================
ValidateBusinessRuleCondition()

'==========Save loan========
BIZ_Loan_Save()

strLastName = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_37"),"value")

If strLastName <> "" Then
	FRM_Logger_ReportPassEvent "Editing of Loan","Loan is edited successfully.",NULL
Else
	FRM_Logger_ReportFaileEvent "Editing of Loan","Loan is not getting edited.",NULL
End If

'=============exit loan==============
BIZ_Loan_Exit(False)

'==============Navigate to home page===============
BIZ_Nav_SelectHomeTab()

'==============Logout of Encompass====================
BIZ_Login_UserLogout()

''=========Login with newly created user=================
'BIZ_Login_UserLogin "sven_admin"
'
''====Go to Settings->Business Rules->Persona Access to Loans==========
'BIZ_Nav_HierarchyTree "Business Rules","Persona Access to Loans"
'
''================Select the rule===============
'BIZ_BR_PersonaAccestoLoan_Select strRowID,"Single"
'
'strFileLocation = FRM_RT_ReportDirPath & "BR_PersonaAccessToLoans_" & strRowID & "_" & UTIL_Date_Now_mmddyyyy_HHnnss
'
'FRM_Logger_ReportStepEvent "Test step-8","Export the business rule "&strRowID,NULL
'
''=============Export the rule==================
'BIZ_BR_PersonaAccessToLoanRule_ExportBusinessRule strFileLocation
'
'FRM_Logger_ReportStepEvent "Test step-9","Delete the business rule "&strRowID,NULL
'
''============Delete the rule======================
'BIZ_BR_PersonaAccesstoLoan_DeleteExisting strRowID
'
'FRM_Logger_ReportStepEvent "Test step-10","Import the business rule "&strRowID,NULL
'
''==============Import business rule=====================
'BIZ_BR_PersonaAccessToLoanRule_ImportBusinessRule strFileLocation
'
'Wait 5
'
'Set objAccessToLoanRuleEntryList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule")
'
'boolIsFound = GUI_List_ClickRow(objAccessToLoanRuleEntryList, NULL, "Name", strRowID, True, False, False, "Single")
'
'FRM_Logger_ReportStepEvent "Test step-11","Verify business rule "&strRowID&" is imported successfully.If not then try again.",NULL
'
''===============Check if rule is imported successfully=================
'If boolIsFound Then
'	FRM_Logger_ReportPassEvent "Import Business Rule","Business Rule is imported successfully.",NULL
'Else
'	'==============Import business rule=====================
'    BIZ_BR_PersonaAccessToLoanRule_ImportBusinessRule strFileLocation
'End If
'
'boolIsFound = GUI_List_ClickRow(objAccessToLoanRuleEntryList, NULL, "Name", strRowID, True, False, False, "Single")
'
'FRM_Logger_ReportStepEvent "Test step-11","Verify business rule "&strRowID&" is imported successfully.",NULL
'
''===============Check if rule is imported successfully=================
'If boolIsFound Then
'	FRM_Logger_ReportPassEvent "Import Business Rule","Business Rule is imported successfully.",NULL
'Else
'	FRM_Logger_ReportFailEvent "Import Business Rule","Business Rule is failed to import.",NULL
'End If
'
''=============Check if rule is present in the list===================
'BIZ_BR_PersonaAccestoLoan_Select strRowID,"Single"
'
''===============Activate the rule===================
'BIZ_BR_PerosnaAccessToLoans_Activate()
'
''=============Close the settings==================
'BIZ_Nav_Settings_Close()
'
''==============Logout of Encompass====================
'BIZ_Login_UserLogout()
'
''=========Login with newly created user=================
'BIZ_Login_UserLogin "e2ebrpal"
'
'FRM_Logger_ReportStepEvent "Test step-12","Create new loan.",NULL
'
''=====================Select Pipeline View and Create a new blank loan====================
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'
'FRM_Logger_ReportStepEvent "Test step-13","Input data in field which will trigger rule "&strRowID,NULL
'
''==Go to Borrower Summary - Origination================
'BIZ_Forms_Open "Borrower Summary - Origination"
'
''===========Enter data in the form so as to trigger the rule===========
'InputFieldToTriggerBusinessRule(strRowID)
'
''==========Save loan========
'BIZ_Loan_Save()
'
''===========Take Loan Number=============
'BIZ_Loan_SaveLoanNumber()
'
'strLoanNumber = BIZ_Loan_GetLoanNumber()
'
''=============exit loan==============
'BIZ_Loan_Exit(False)
'
''=============Open Loan==============
'BIZ_Loan_OpenLoanByColFieldValue "Loan Number",strLoanNumber
'
'FRM_Logger_ReportStepEvent "Test step-14","Validate if business rule"&strRowID&" is triggered.",NULL
'
''===============Validate the business rule condition====================
'ValidateBusinessRuleCondition()
'
''==========Save loan========
'BIZ_Loan_Save()
'
'strLastName = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_37"),"value")
'
'If strLastName <> "" Then
'	FRM_Logger_ReportPassEvent "Editing of Loan","Loan is edited successfully.",NULL
'Else
'	FRM_Logger_ReportFaileEvent "Editing of Loan","Loan is not getting edited.",NULL
'End If
'
''=============exit loan==============
'BIZ_Loan_Exit(False)
'
''==============Navigate to home page===============
'BIZ_Nav_SelectHomeTab()
'
''==============Logout of Encompass====================
'BIZ_Login_UserLogout()
'
'=========Login with newly created user=================
BIZ_Login_UserLogin "sven_admin"

'====Go to Settings->Business Rules->Persona Access to Loans==========
BIZ_Nav_HierarchyTree "Business Rules","Persona Access to Loans"

'============Delete the rule======================
BIZ_BR_PersonaAccesstoLoan_DeleteExisting strRowID

'=============Close the settings==================
BIZ_Nav_Settings_Close()

'==============Logout of Encompass====================
BIZ_Login_UserLogout()

End if















