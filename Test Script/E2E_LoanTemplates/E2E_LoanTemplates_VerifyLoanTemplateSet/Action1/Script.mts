'@**************************************************************************************************
'@ TestStory: PTAC-1498 Re-Enforcement_LoanTemplates
'@ TestCase: 
    '1 PTAC-1387 - Loan Templates - Verify the Loan Template Set- Other Loans as Default
'@ Test Automation JIRA Task: PTAC-1876 E2E_LoanTemplates_VerifyLoanTemplateSetOtherLoansAsDefault
'@ TestData: 
	'01 Settings_LoanTemplates, SetLoanProgram and TC1_LoanTemplate_Setdata
	'02 Settings_LoanTemplates, SetLoanProgram and PTAC-1379_LoanTemplate_LoanPrograms
	'03 Settings_LoanTemplates, DataTemplate and PTAC-1498_LoanTemplates_DataTemplate
	'04 Settings_LoanTemplates, DataTemplate and PTAC-1368_LoanTemplates_DataTemplate
	'05 Settings_LoanTemplates, TaskSetTemplate and PTAC-1538_LoanTemplates_TaskSet_Create
    '06 Settings_LoanTemplates, TaskSetTemplate and PTAC-1538_LoanTemplates_TaskSet_Edit
	'07 Settings_LoanTemplates, InputFormSetTemplate and PTAC-1498_LoanTemplates_InputFormSet_Create
	'08 Settings_LoanTemplates, InputFormSetTemplate and PTAC-1388_LoanTemplates_InputFormSet_Edit
	'09 Settings_LoanTemplates, ClosingCost and PTAC-1372_LoanTemplates_ClosingCost
	'10 Settings_LoanTemplates, ClosingCost and PTAC-1372_LoanTemplates_2015Itemization
	'11 Forms_2015Itemization, Set800Section and PTAC-1372_LoanTemplates_2015Itemization
	'12 Forms_2015Itemization, Set900Section and PTAC-1372_LoanTemplates_2015Itemization
'@ Pre-conditions:
	'1 Login as Admin user
    '2 Loan Program Template shoukd be created
    '3 Milestone Template should be already created
    '4 Data Template should be already created
    '5 Task Set Template should be already created
    '6 Input Form Template should be already created
    '7 Closing Cost Template should be already Created
'@ Description: 
'@ TestSteps:
	'1 Go to settings->Loan Templates-> Loan Template set Templates.Click on New button.Enter Template name
	'2 Double-Click on the created template.Enter description
	'3 Click on Edit icon Select All Templates
	'4 Select the template from grid and click on set as default
	'5 Go to Pipeline and click on new loan button.Click Default template
	'6 Verify the data in Loan Page 
'@ ExpectedResult:
	'1 Template name Should be Created
	'2 Description should be entered
	'3 All Templates LoanProgram template(Other),Milestone template,Inputform Template,Datatemplate,taskset template,Closingcost template Should be selected
	'4 Template should be selected as default
	'5 New loan will be open with new template applied
	'6 Verify Values should be populated correctly
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1876","Script Name - E2E_LoanTemplate_VerifyLoanTemplateSet", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== RunAction To E2E_LoanTemplates_VerifyLoanTemplateSetAsManualSelection =======
RunAction "E2E_LoanTemplates_VerifyLoanTemplateSetAsManualSelection", oneIteration

'===== Logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)




	

