'@**************************************************************************************************
'@ TestStory: PTAC-1624 Re-Enforcement_LoanSetup
'@ TestCase:
   '1 PTAC-1841 - Print Form Groups - Verify the newly created Print Form Group on Non-Admin user loan file
'@ Test Automation JIRA Task: PTAC-1964 E2E_LoansetUp_PrintFormGroup
'@ TestData: 
   'Settings_Loansetup,Forms and Loansetup_PrintFormGroups_Personal
   'Settings_Loansetup,Forms and PTAC-1841_PrintFormGroup
   'Forms_1003page, 1003Page1 and PTAC-1624_SetData
   'Forms_1003page, 1003Page2 and PTAC-1624_SetData
'@ Pre-conditions: 
   '1 Login as Admin user
   '2 Go to Setting window
   '3 Select Loan Setup : Print Form Group
'@ Description: 
'@ TestSteps:
   '1 Select 'Personal Forms Groups' folder and click on new icon.  A new entry should be created successfully. Click on Edit
   '2 Enter name and description.Add  Form 1003 Page 1 and Form 1003 Page 2 from Standard Forms. Click on save
   '3 Create a new Loan and enter information on Form 1003 Page 1 and Form 1003 Page 2 .Click on print icon
   '4 Select the Form Group created in step 3 names as Form 1.Click on Add.Click on Print
'@ ExpectedResult: 
   '1 User should be navigated successfully
   '2 Print form Group Details window should open-up
   '3 Public Form Group should be created successfully
   '4 Print window should open-up
   '5 All the forms added in the Form 1 group "1003 page 1" "1003 page 2" should be added under selected Forms
   '6 All the form added in the Form 1 group should be printed one after the other successfully
'***************************************************************************************************
	
	'====== Pre-Requisite to verify non-admin user in user group ======
	'====== Print Form Groups - Verify the newly created Print Form Group Print Preview on loan file ======
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1841","Print Form Groups - Verify the newly created Print Form Group on Non-Admin user loan file", Null
	BIZ_Login_UserLogin "1624_LoanSetup"
	
	'====== Navigate to Encompass->Settings ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
			
	'====== Go to LoanSetup->Custom Print Forms ======
	BIZ_Nav_HierarchyTree "Loan Setup", "Print Form Groups"
	strPrintFormGroup = BIZ_LoanSetup_CreateIcon("Loansetup_PrintFormGroups_Personal","PrintFormGroups")
	BIZ_LoanSetUp_PrintFormGroupEdit strPrintFormGroup,"PTAC-1841_PrintFormGroup"
	Settings_LoanSetUp_VerifyEditPrintFormGroup "PTAC-1840_PrintFormGroup",strPrintFormGroup
	BIZ_Settings_ClickClose()
	
	'====== Validate Print Form Group on Loan File ======
	BIZ_Nav_SelectPipelineTab()
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "","My Pipeline"
	BIZ_1003Page1_SetData "PTAC-1624_SetData"
	BIZ_1003Page2_SetMonthlyIncomeExpensesData "PTAC-1624_SetData"
	Settings_LoanSetUp_ValidatePrintAndPreviewWindow "PTAC-1841_PrintFormGroup","Form Groups",strPrintFormGroup,"Non-Admin"
	BIZ_Loan_Exit False
	
	'====== Navigate to Encompass->Settings ======
	'====== Delete Print Form Group ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup", "Print Form Groups"
	BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",strPrintFormGroup,"Print Form Group" 
	BIZ_Settings_ClickClose()

