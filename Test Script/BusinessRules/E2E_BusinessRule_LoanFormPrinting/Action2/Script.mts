'@**************************************************************************************************
'@ TestStory: CBIZ-286 - Script optimization for Business Rules
'@ TestCase:
   '1 Verifying the Loan Form Printing Rule Set "Loan Purpose" Condition
   '2 Verifying the Loan Form Printing Rule Set "Advanced Conditions" Condition
   '3 Verifying the Loan Form Printing Rule Set "Doc Type" Condition
   '4 Verifying the Loan Form Printing Rule Set "Loan Program" Condition
   '5 Verifying the Loan Form Printing Rule Set "Loan Type" Condition
   '6 Verifying the Loan Form Printing Rule Set "Loan Status" Condition
   '7 Verifying the Loan Form Printing Rule Set "Property State" Condition
   '8 Verifying the Loan Form Printing Rule Set "Rate" Condition
   '9 Verifying the Loan Form Printing Rule Set "Current Role" Condition
   '10 Verifying the Loan Form Printing Rule Set "Doc Type" Condition
   '11 Verifying the Loan Form Printing Rule Set "No Condition" Condition
'@ Test Automation JIRA Task: 
'@ TestData: 
	'1 Global_Data, Login and BR_Admin_RuleCreation
	'2 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC1_LoanFormPrintingRule
	'3 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC2_LoanFormPrintingRule
	'4 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC3_LoanFormPrintingRule
	'5 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC4_LoanFormPrintingRule
	'6 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC5_LoanFormPrintingRule
	'7 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC6_LoanFormPrintingRule
	'8 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC7_LoanFormPrintingRule
	'9 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC8_LoanFormPrintingRule
	'10 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC9_LoanFormPrintingRule
	'11 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC10_LoanFormPrintingRule
	'12 BusinessRule_PrintAutoSelection and PrintingRuleDetails, TC11_LoanFormPrintingRule
'@ Pre-conditions:
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass with Admin user
	'2 Navigate to through Encompass Settings -> Business Rules -> Loan Form Priniting
	'3 Click New button to create new business rule, 
		'a Enter business rule name : Rulename
		'b Select Channels <All channels>
		'c Is there a condition for this rule as "Yes" and Select condition from dropdwon list and select "[4002].StartsWith("s")"
		'd Click on Add button 
		'e Click Find button
		'f Add a standard print form "1003 Page 1"
		'g Click Add button under Required Fields tab
		'h Add field [4001] and Click on OK button
	'4 Click on Save button
	'5 Select the rule and Click on Activate button
	'6 Login to Encompass with new user(Non admin user )
	'7 Go to Pipeline and select the 'created Loan Folder' 
	'8 Click on + New loan, again click on 'New Bank Loan' button 
	'9 select 1003 page1, enter the value in the 4002 (Last Name) as 's'
	'10 Click on Print(icon) button, Select the "1003 Page 1" and add to Selected Forms.
	'11 Click on Preview button, a pop up window appears, click on 'Yes' button and verify
	'12 Click on Compete Fields button and input the field [4001],  Click on OK button, Verify
'@ ExpectedResult:
	'1 Admin user to be logged in successfully
	'2 Loan Form printing screen should be displayed
	'3 Print Suppression Business Rule screen displayed
	'4 The rule to be saved.
	'5 The rule to be activated.
	'6 User to be logged in to encompass.
	'7 'Created loan folder' to be displayed in the 'Loan Folder' dropdown.
	'8 New loan window opens.
	'9 The value to be entered in the Last name field.
	'10 The 1003 Page 1 form to be displayed in the 'Selected forms'
	'11 The "Print Business Rules" window displays and the require field[4001] should be displayed.
	'12 The 1003 Page 1 field displayed from 'Unprintable Forms' to 'Printable Forms'
'***************************************************************************************************
'====== Declaring the Variables ======
Dim strRuleName, objRuleData
TestCase = Parameter("TestScenario")

'====== Creating Test Data Object ======
Set objRuleData = FRM_DS_GetTestData("BusinessRule_LoanFormPrinting", "LoanFormPrinting", "TC"&TestCase&"_LoanFormPrintingRule")
strExecutionFlag = FRM_DS_GetValue(objRuleData,"ExecutionFlag") 

If strExecutionFlag = "Y" Then
	If FRM_DS_GetValue(objRuleData, "Condition") = "" Then
		FRM_Logger_ReportStepEvent "Test Scenario: "& TestCase, "Check condition: No Condition", Null
	Else
		FRM_Logger_ReportStepEvent "Test Scenario: "& TestCase, "Check condition: " & FRM_DS_GetValue(objRuleData, "Condition"), Null
	End If
		
	'====== Start creation of Loan Form Priting Rule ======
	FRM_Logger_ReportInfoEvent "Start creation of printing rule", "Creating new printing rule", Null
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Business Rules", "Loan Form Printing"
	strRuleName = BIZ_BR_LoanFormPrinting_CreateRule("TC"&TestCase&"_LoanFormPrintingRule")
	Wait 10
	GUI_Object_WaitTillEnabledX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"),60
	intRowIdx = GUI_List_GetRowIndex(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=listViewRule"), 0, strRuleName)
	FRM_VerifyTrue intRowIdx >= 0, "Loan Form Printing Rule creation","Rule has been created & Saved. Rule Name: '" & strRuleName & "'"
	
'	'====== Exporting New Loan Form Printing Rule with 'Advanced Conditions' Condition ======
'	strFileLocation = BIZ_BR_Export_LoanFormPrintingRule (strRuleName)
'	Wait g_ShortWaitMedium 'Due To Sync Issue We Are Explicitly Passing Wait Statement
'	
'	'====== Deleting the Created Rule ======
'	FRM_Logger_ReportInfoEvent "Start Deleting Created Rule", "Deleting the Created Rule", Null
'	BIZ_BR_Common_DeleteRule strRuleName
'	
'	'====== Importing New Loan Form Printing Rule with 'Advanced Conditions' Condition ======
'	BIZ_BR_Import_LoanFormPrintingRule strFileLocation
'	Wait g_ShortWaitMedium 'Due To Sync Issue We Are Explicitly Passing Wait Statement
'	
	'========= Activate the rule ============
	BIZ_BR_Common_ActivateRule strRuleName
	BIZ_Login_UserLogout()
	
	'====== Login & Navigating Add New Bank Loan screen with Non admin ====== 
	'====== Verifying the Loan Form With created Printing Rules ======
	FRM_Logger_ReportInfoEvent "Start validation of created Printing Rule", "Validating created printing rule", Null
	BIZ_Login_UserLogin "BR_emilylo_172Banker"
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "", "Automation"
	BIZ_Loan_AddNewBlankLoan()
	BIZ_BR_VerifyLoanFormWithPrintingRules "TC"&TestCase&"_LoanFormPrintingRule"
	BIZ_Login_UserLogout()
	
	'====== Deleting the Created Rule ======
	FRM_Logger_ReportInfoEvent "Start Deleting Created Rule", "Deleting the Created Rule", Null
	BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Business Rules", "Loan Form Printing"
	BIZ_BR_Common_DeleteRule strRuleName
	BIZ_Settings_ClickClose

End If
