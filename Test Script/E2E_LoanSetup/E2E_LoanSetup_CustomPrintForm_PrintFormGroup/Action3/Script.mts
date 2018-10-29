'@**************************************************************************************************
'@ TestStory: PTAC-1624 Re-Enforcement_LoanSetup
'@ TestCase:
   '1 PTAC-1840 - Print Form Groups - Verify the newly created Print Form Group Print Preview on loan file
'@ Test Automation JIRA Task: PTAC-1964 E2E_LoansetUp_PrintFormGroup
'@ TestData: 
   'Settings_Loansetup,Forms and Loansetup_PrintFormGroups_Public
   'Settings_Loansetup,Forms and PTAC-1840_PrintFormGroup
   'Forms_1003page, 1003Page1 and PTAC-1624_SetData
   'Forms_1003page, 1003Page2 and PTAC-1624_SetData
'@ Pre-conditions: 
   '1 Login as Admin user
   '2 Go to Setting window
   '3 Select Loan Setup : Print Form Group
'@ Description: 
'@ TestSteps:
   '1 Click on new icon.  A new entry should be created successfully. Click on Edit
   '2 Enter name and description.Add  Form 1003 Page 1 and Form 1003 Page 2 from Standard Forms. Click on save
   '3 Create a new Loan and enter information on Form 1003 Page 1 and Form 1003 Page 2.Click on print icon
   '4 Select the Form Group created in step 3 names as Form 1.Click on Add.Click on preview
'@ ExpectedResult: 
   '1 User should be navigated successfully
   '2 Print form Group Details window should open-up
   '3 Public Form Group should be created successfully
   '4 Print window should open-up
   '5 All the forms added in the Form 1 group "1003 page 1" "1003 page 2" should be added under selected Forms
   '6 All the form added in the Form 1 group should be displayed in the preview window one below the other
'***************************************************************************************************
	'====== Navigate to Encompass->Settings ======
	'====== Go to LoanSetup->Custom Print Forms ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup", "Custom Print Forms"
	
	'====== Custom Print Forms - Verify the Newly created Custom Print Form on Loan file ======
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1839","Custom Print Forms - Verify the Newly created Custom Print Form on Loan file", Null
	strFormName = BIZ_LoanSetup_CreateIcon("Loansetup_CPF_Folder_Public","CustomPrintForms")
	BIZ_LoanSetUp_CustomPrintForms_Edit "PTAC-1839_CustomPrintForms",strFormName
	
	'====== Validate and Rename New Custom Print Form ======
	strRenameFormname = BIZ_LoanSetUp_Forms_Rename (strFormName,"CustomPrintForms")
	
	'====== Navigate to Encompass->Settings ======
	'====== Go to LoanSetup->Custom Print Forms ======
	'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup", "Print Form Groups"
	
	'====== Print Form Groups - Verify the newly created Print Form Group Print Preview on loan file ======
	strPrintFormGroup = BIZ_LoanSetup_CreateIcon("Loansetup_PrintFormGroups_Public","PrintFormGroups")
	BIZ_LoanSetUp_PrintFormGroupEdit strPrintFormGroup,"PTAC-1840_PrintFormGroup"
	Settings_LoanSetUp_VerifyEditPrintFormGroup "PTAC-1840_PrintFormGroup",strPrintFormGroup
	BIZ_Settings_ClickClose()
	
	'====== Validate Print Form Group on Loan File ======
	BIZ_Nav_SelectPipelineTab()
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
	
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1839","Custom Print Forms - Verify the Newly created Custom Print Form on Loan file", Null
	BIZ_Forms_Open "1003 Page 1"
	GUI_WebEdit_Set  SwfWindow("swfname:=MainForm").Page("micclass:=page").WebEdit("html id:=TextBox3"), "test"
	Settings_LoanSetUp_CustomPrintForms_PreviewWindow "PTAC-1839_CustomPrintForms",strRenameFormname
	Settings_LoanSetUp_ValidatePreviewWindow "PTAC-1839_CustomPrintForms"
	
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1840","Print Form Groups - Verify the newly created Print Form Group Print Preview on loan file", Null
	BIZ_1003Page1_SetData "PTAC-1624_SetData"
	BIZ_1003Page2_SetMonthlyIncomeExpensesData "PTAC-1624_SetData"
	Settings_LoanSetUp_ValidatePrintAndPreviewWindow "PTAC-1840_PrintFormGroup","Form Groups",strPrintFormGroup,"Admin"
	BIZ_Loan_Exit False
	
	'====== Navigate to Encompass->Settings ======
	'====== Delete Print Form Group ======
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup", "Print Form Groups"
	BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",strPrintFormGroup,"Print Form Group" 
	
	'====== Navigate to Encompass->Settings ======
	'====== Go to LoanSetup->Custom Print Forms ======
	'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup", "Custom Print Forms"
	BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",strRenameFormname,"Custom Print Forms"
		
	
	'====== Pre-Requisite to Verify Non-Admin User and Print Form Group Checkbox in User Group ======
	BIZ_OrganizationUsers_CreateUser "PTAC-1624_LoanSetup"
	BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
	Settings_CompanySettings_ValidatePrintFormGroupCheckBox "Loan Officer","Personal Templates;Print Form Groups"
	BIZ_Settings_ClickClose()
	
	'====== Logout From Application ======
	BIZ_Login_UserLogout()	

