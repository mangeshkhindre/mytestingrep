'@**************************************************************************************************
'@ TestStory: PTAC-1624 Re-Enforcement_LoanSetup
'@ TestCase: 
   '1 PTAC-1839 - Custom Print Forms - Verify the Newly created Custom Print Form on loan file
'@ Test Automation JIRA Task: PTAC-1882 E2E_LoanSetup_CustomPrintForms
'@ TestData: 
   '1 Settings_Loansetup, Forms and Loansetup_CPF_Folder_Public
   '2 Settings_Loansetup, Forms and PTAC-1839_CustomPrintForms
'@ Pre-conditions: 
   '1 Login as Admin user
   '2 Go to Setting window
   '3 Select Loan Setup: Custom Print Forms
'@ Description:  
'@ TestSteps:   
   '1 Click on new icon.A new entry should be created successfully. Click on Edit
   '2 Select category as Loan.Select Field Name as Subject Property City.Click on Insert.Click on Save.Click on close
   '3 Right click on the custom form created and Rename it to Custom Print Form 
   '4 Create New Loan, enter information on field i.e.the Subject Property City and save it
   '5 Click on print icon and select the form created in step 4 under custom tab .Click on add
   '6 Click on Preview
'@ ExpectedResult:
   '1 User should be navigated successfully
   '2 Insert Fields window should open-up
   '3 Custom Print Form should be created
   '4 Custom Print Form 1 should be created successfully
   '5 Loan should be created successfully and saved
   '6 Custom Print Form 1 should be added under Selected Forms 
   '7 Custom Form should open up successfully
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
	'strRenameFormname = BIZ_LoanSetUp_Forms_Rename (strFormName,"CustomPrintForms")
	'BIZ_Settings_ClickClose()
	
	'====== Validate the Display of Custom Print Form under Selected Forms ======
	'BIZ_Nav_SelectPipelineTab()
	'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
	'BIZ_Forms_Open "1003 Page 1"
	'GUI_WebEdit_Set  SwfWindow("swfname:=MainForm").Page("micclass:=page").WebEdit("html id:=TextBox3"), "test"
	'Settings_LoanSetUp_CustomPrintForms_PreviewWindow "PTAC-1839_CustomPrintForms",strRenameFormname
	'Settings_LoanSetUp_ValidatePreviewWindow "PTAC-1839_CustomPrintForms"
	'BIZ_Loan_Exit False
	
	'====== Navigate to Encompass->Settings ======
	'====== Go to LoanSetup->Custom Print Forms ======
	'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	'BIZ_Nav_HierarchyTree "Loan Setup", "Custom Print Forms"
	'BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",strRenameFormname,"Custom Print Forms"
	'BIZ_Settings_ClickClose()
