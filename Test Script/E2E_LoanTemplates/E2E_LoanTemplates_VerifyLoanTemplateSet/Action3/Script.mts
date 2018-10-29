'@**************************************************************************************************
'@ TestStory: PTAC-1498 Re-Enforcement_LoanTemplates
'@ TestCase: 
    '1 PTAC-1389 - Verify the Loan template set Other loan as Manual Selection
'@ Test Automation JIRA Task: PTAC-1906 E2E_LoanTemplate_VerifyLoanTemplateSet
'@ TestData: 
	'01 Settings_LoanTemplates, SetLoanProgram and TC1_LoanTemplate_Setdata
	'02 Settings_LoanTemplates, SetLoanProgram and PTAC-1387_LoanTemplate_LoanPrograms
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
	'1 Go to Pipeline and click on new loan button.Click the template created above.Select Select Template
	'2 Verify the data in the loan for loan program template in borrower summary
	'3 Verify data in loan for milestone template under log
	'4 Verify default forms under forms  for Input form Template
	'5 verify data in loan for Data Template in borrower summary origination
	'6 Verify data in loan for Task Set Template
	'7 Verify data in loan for Closing cost temaplate
'@ ExpectedResult:
	'1 New loan will be open with selected template applied
	'2 Borrower Summary- Origination:
    '3 system should populate default milestones as below under log in loan file
    '4 Forms should under "Selected Input forms" be available
    '5 Borrower Summary- Origination
    '6 Default task set template should be populated in Qualification 
    '7 2015 Itemization form should populated with default fees    
'***************************************************************************************************

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings ======
'====== Loan Templates - verify the Loan template set- Other loans - Manual selection ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1389","Loan Templates - verify the Loan template set- Other loans - Manual selection", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== Creating All Templates ======
arrTemplates = LoanTemplates_CreatePreRequisiteTemplates("PTAC-1387_LoanTemplates_LoanPrograms")
'msgbox "arrTemplates(7) before "&arrTemplates(7)
BIZ_Nav_HierarchyTree "Loan Templates", "Loan Template Sets"
strLoanTemplateSet = BIZ_LoanTemplates_CreateLoanTemplateSetTemplate ("PTAC-1498_LoanTemplates_LoanTemplateSet_Create","Public Loan Templates")
BIZ_LoanPrograms_OpenTemplate strLoanTemplateSet

'====== Adding all the Created Templates in Loan Template Set ======

LoanTemplateDetails_SelectLoanTemplateSet "PTAC-1388_LoanTemplates_LoanTemplateSet_Edit", arrTemplates

'Creating second loan template set with closing cost2 template========
strLoanTemplateSet2 = BIZ_LoanTemplates_CreateLoanTemplateSetTemplate ("PTAC-1498_LoanTemplates_LoanTemplateSet_Create2","Public Loan Templates")
BIZ_LoanPrograms_OpenTemplate strLoanTemplateSet2
Dim arrTemplates2(1)
arrTemplates2(0) = "AutoClosingCostTemplate2"
arrTemplates2(1) = "AutoLoanProgramTemplate2"
LoanTemplateDetails_SelectLoanTemplateSet2 "PTAC-1388_LoanTemplates_LoanTemplateSet_Edit2", arrTemplates2

BIZ_LoanTemplate_DefaultTemplateSetting "NewLoan"
wait 2
BIZ_Login_UserLogout()  
BIZ_Login_UserLogin "admin_core2p"
'====== Navigating to PipeLine ======
'BIZ_Settings_ClickClose()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","My Pipeline"

'====== Select Template ======
BIZ_Loan_ApplyTemplateToNewLoan strLoanTemplateSet
'BIZ_Loan_ApplyTemplateToNewLoan strLoanTemplateSet,TRUE
FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet' Loan Template Set to loan", "Verification Of Templates as Apply Append Template Checkbox is checked while creating the Loan", null

'====== Verify Values in Loan Page ======
FRM_Logger_ReportStepEvent "Verify Loan Templates","Verify Loan Templates on Loan file", Null
	
LoanTemplates_VerifyTaskInLog "PTAC-1538_LoanTemplates_TaskSet_Edit",strPredefinedData1
Loan_VerifyFormsInFormsTab "PTAC-1388_LoanTemplates_InputFormSet_Edit"
LoanTemplate_VerifyMileStoneInLog "PTAC-1498_VerifyMilestoneInLog"
LoanTemplates_VerifyValuesIn2015Itemization "PTAC-1372_LoanTemplates_2015Itemization", "PTAC-1498_LoanTemplates_ClosingCost1"
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTemplates_DataTemplate_VerifyBorrowerSummaryOrigination "PTAC-1498_LoanTemplates_DataTemplate"
LoanTemplates_VerifyBorrowerSummaryOrigination "PTAC-1387_LoanTemplates_LoanPrograms", "Other"
BIZ_Forms_Open "1003 Page 1"
LoanTemplates_DataTemplate_Verify1003Page1 "PTAC-1498_LoanTemplates_DataTemplate","Set as Manual Selection"

BIZ_Forms_Open "Settlement Service Provider List"
LoanTemplates_VerifySettlementServiceTemplate "PTAC-1531_LoanTemplates_SettlementService_Edit"

BIZ_Forms_Open "Affiliated Business Arrangements"
BIZ_Verify_AffiliatedBusinessArrangements_AffiliateDetail "PTAC-1376_LoanTemplates_AffiliateTemplate_Edit"

BIZ_Loan_SwitchFormVersion "RESPA-TILA 2015 LE and CD"
'msgbox "arrTemplates(7)"&arrTemplates(7)
BIZ_Loan_AppendDocumentSet arrTemplates(7) '"AutoDocumentSetTemplate201816113336" 'arrTemplates(7)
Loan_AppendDocumentSet_AddFromDocumentSet "PTAC-1499_LoanTemplates_DocumentSet_Edit", "PTAC-1382_LoanTemplates_DocumentSet_Edit"
LoanTemplates_VerifyDocumentSetInLog "PTAC-1499_LoanTemplates_DocumentSet_Edit","PTAC-1382_LoanTemplates_DocumentSet_Edit"


'BIZ_Loan_Exit True

'====================New code
'====== Select Template ======

'FRM_Logger_ReportStepEvent "Applying Loan Template Set to existing loan", "Verification Of Closing COst and Loan Program Template as Apply Append Template Checkbox is checked while creating the Loan", null
'BIZ_LoanTemplates_ApplyandAppendTemplate("Apply Loan Template Set...")
'BIZ_Loan_ApplyLoanTemplateToLoan "AutoLoanTemplateSet2","yes"
'FRM_Logger_ReportStepEvent "Verify Values of Application Fee and Loan Origination Fee Added to loan file", "Application Fee should remain 20 and Loan Origination fee be '0.2' as Apply Append Template Checkbox is checked while creating the Loan", null
'LoanTemplates_VerifyValuesIn2015Itemization "PTAC-ClosingCost2", "PTAC-ClosingCost2"
'FRM_Logger_ReportStepEvent "Verify Values of Note Rate and Loan Purpose Added to loan file", "Note Rate should be 10 and Loan Purpose should Remain as Primary as Apply Append Template Checkbox is checked while creating the Loan", null
'BIZ_Forms_Open "Borrower Summary - Origination"
'LoanTemplates_VerifyBorrowerSummaryOriginationLoanProgram "PTAC-1387_LoanTemplates_LoanPrograms2"
FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet2' Loan Template Set to existing loan", "Verification Of Closing Cost and Loan Program Template as Apply Append Template Checkbox is checked while creating the Loan", null
BIZ_LoanTemplates_ApplyandAppendTemplate("Apply Loan Template Set...")
BIZ_Loan_ApplyLoanTemplateToLoan "AutoLoanTemplateSet","yes"
BIZ_LoanTemplates_ApplyandAppendTemplate("Apply Loan Template Set...")
BIZ_Loan_ApplyLoanTemplateToLoan "AutoLoanTemplateSet2","yes"

FRM_Logger_ReportStepEvent "Verify Values of Application Fee and Loan Origination Fee Added to loan file", "Application Fee should remain 20 and Loan Origination fee be '0.2' as Apply Append Template Checkbox is checked while creating the Loan", null
LoanTemplates_VerifyValuesIn2015Itemization "PTAC-ClosingCost2", "PTAC-ClosingCost2"
FRM_Logger_ReportStepEvent "Verify Values of Note Rate and Loan Purpose Added to loan file", "Note Rate should be 10 and Loan Purpose should Remain as Purchase as Apply Append Template Checkbox is checked while creating the Loan", null
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTemplates_VerifyBorrowerSummaryOriginationLoanProgram "PTAC-1387_LoanTemplates_LoanPrograms2"

FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet' Loan Template Set to existing loan", "Verification Of Closing Cost and Loan Program Template as Apply Append Template Checkbox is un-checked while creating the Loan", null
'FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet' Loan Template Set to existing loan", "Verification of Application Fee and Loan Origination fee as Apply Append Template Checkbox is unchecked while creating the Loan", null
BIZ_LoanTemplates_ApplyandAppendTemplate("Apply Loan Template Set...")
BIZ_Loan_ApplyLoanTemplateToLoan "AutoLoanTemplateSet","no"
FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet' Loan Template Set to existing loan", "Application Fee should be 20 and Loan Origination fee be '0.1' as Apply Append Template Checkbox is un-checked while creating the Loan", null
LoanTemplates_VerifyValuesIn2015Itemization "PTAC-1372_LoanTemplates_2015Itemization", "PTAC-1498_LoanTemplates_ClosingCost1"
FRM_Logger_ReportStepEvent "Verify Values of Note Rate and Loan Purpose Added to loan file", "Note Rate should be 5 and Loan Purpose should be as Purchase as Apply Append Template Checkbox is un-checked while creating the Loan", null
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTemplates_VerifyBorrowerSummaryOrigination "PTAC-1387_LoanTemplates_LoanPrograms", "Other"

FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet2' Loan Template Set to existing loan", "Verification Of Closing Cost and Loan Program Template as Apply Append Template Checkbox is un-checked while creating the Loan", null
'FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet2' Loan Template Set to existing loan", "Verification of Application Fee and Loan Origination fee as Apply Append Template Checkbox is unchecked while creating the Loan", null
BIZ_LoanTemplates_ApplyandAppendTemplate("Apply Loan Template Set...")
BIZ_Loan_ApplyLoanTemplateToLoan "AutoLoanTemplateSet2","no"

FRM_Logger_ReportStepEvent "Applying 'AutoLoanTemplateSet2' Loan Template Set to existing loan", "Application Fee should be blank and Loan Origination fee be '0.2' as Apply Append Template Checkbox is un-checked while creating the Loan", null
LoanTemplates_VerifyValuesIn2015Itemization "PTAC-ClosingCost3", "PTAC-ClosingCost3"
FRM_Logger_ReportStepEvent "Verify Values of Note Rate and Loan Purpose Added to loan file", "Note Rate should be 10 and Loan Purpose should be as blank as Apply Append Template Checkbox is un-checked while creating the Loan", null
BIZ_Forms_Open "Borrower Summary - Origination"
LoanTemplates_VerifyBorrowerSummaryOriginationLoanProgram "PTAC-1387_LoanTemplates_LoanPrograms3"


'====== Go to Settings ======
'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'Settings_LoanTemplates_DeleteTemplates arrTemplates
'BIZ_Nav_HierarchyTree "Loan Templates", "Loan Template Sets"
'BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",strLoanTemplateSet,"Template"





'=============================================================================================



