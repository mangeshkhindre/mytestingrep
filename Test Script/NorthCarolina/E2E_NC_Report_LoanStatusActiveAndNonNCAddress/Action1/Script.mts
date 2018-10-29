'@**************************************************************************************************
'@ TestStory:PTAC-1834 North Carolina Compliance Report
'@ TestCase:
    '1 PTAC-1474 - Validate that the NC report shouldn't populate for the loan with status = "Active Loan"
    '2 PTAC-1475 - Validate that the NC report shouldn't populate for the loan with the Property Address not equal to North Carolina
'@ Test Automation JIRA Task: PTAC-2127 NorthCarolina_ComplianceReport_LoanStatusActiveAndNonNCAddress
'@ TestData:
    'Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1474
	'Forms_BorrowerSummaryOrigination, SetProperty and PTAC-1479
	'Forms_1003Page, 1003Page2 and PTAC-1479
	'Forms_ATRQMManagement, SetCreditInformation and PTAC-1479
	'Forms_ATRQMManagement, SetQualification and PTAC-1479
	'Forms_RegZ_CD, RegZ_CD and PTAC-1479
	'Forms_1003Page, 1003Page1 and PTAC-1479
	'Forms_1003Page, SetLoanOriginator and PTAC-1479
	'Forms_1098MortgageInterest,SetMortgageInterest and PTAC-1479
	'Forms_HMDAInformation, SetNMLSInfo and PTAC-1479
	'Forms_FNMAStreamlined, FNMAStreamlined and PTAC-1479	
	'Forms_ClosingDisclosurePage, CDPage4 and PTAC-1479 
	'Forms_2015Itemization, Set800Section and PTAC-1479 
	'Forms_2015Itemization, Set900Section and PTAC-1479 
	'Forms_2015Itemization, Set1000Section and PTAC-1479 
	'Forms_2015Itemization, Set1000Section and PTAC-1479  
    'Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1475
	'Forms_BorrowerSummaryOrigination, SetProperty and PTAC-1475
	'Forms_1003Page, 1003Page2 and PTAC-1475
	'Forms_ATRQMManagement, SetCreditInformation and PTAC-1475
	'Forms_ATRQMManagement, SetQualification and PTAC-1475
	'Forms_RegZ_CD, RegZ_CD and PTAC-1475
	'Forms_1003Page, 1003Page1 and PTAC-1475
	'Forms_1003Page, SetLoanOriginator and PTAC-1475
	'Forms_1098MortgageInterest,SetMortgageInterest and PTAC-1475
	'Forms_HMDAInformation, SetNMLSInfo and PTAC-1475
	'Forms_FNMAStreamlined, FNMAStreamlined and PTAC-1475	
	'Forms_ClosingDisclosurePage, CDPage4 and PTAC-1475	
	'Forms_2015Itemization, Set800Section and PTAC-1475 
	'Forms_2015Itemization, Set900Section and PTAC-1475 
	'Forms_2015Itemization, Set1000Section and PTAC-1475 
	'Forms_2015Itemization, Set1000Section and PTAC-1475  	
	'Settings_Loansetup, AddLoanFolder and LoanFolderCreation_005
'@ Pre-conditions: NA
'@ Description:  NA
'@ TestSteps:
	'01 Login to Encompass with credentials admin / password.
	'02 In the pipeline tab, Click on 'New Loan' icon.
	'03 Select the loan folder as per test data and create Loan.
	'04 Check the current status field value in Borrower Origination summary
	'05 Close the Loan form.
	'06 Click on Pipeline in the menu-bar.
	'07 Select 'Compliance Services' in drop-down list.
	'08 Click on the 'Generate North Carolina Compliance Report'.
	'09 Enter the details as per the test data in the 'Report Options'.
	'10 Click on the button 'Clear All'.
	'11 Select the Loan Folder as per the test data.
	'12 Click on 'Generate' button in the 'North Carolina Compliance Report'.
	'13 Click on 'Yes' button in the 'Encompass' pop-up window. 
	'14 In the 'Save NMLS Call Report' window, click on 'Save' button.
	'15 Click on 'Yes' button in the 'Encompass' pop-up window.
	
'@ ExpectedResult:
  	'Would you like to proceed to generate the Main Loan File report? " with two buttons:-Yes, -No
    'After Yes button, Encompass should throw alert message as "There are no loan files that match selected criteria for this report".
	
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2127 ","Script Name: NorthCarolina_ComplianceReport_LoanStatusActiveAndNonNCAddress", Null
Dim strPipelineView, strRowID, strRowIDStatus, strRowIDNonNCAdd, strRowID2, strPopupMsg, strLoanFolder,  strLoanNumber1, strLoanNumber2
strPipelineView 	= 	"Super Administrator - Default View"
strRowID			=	"PTAC-1479"
strRowIDStatus		=	"PTAC-1474"
strRowIDNonNCAdd	=	"PTAC-1475"
strRowID2			=	"LoanFolderCreation_011"
strPopupMsg			=	"There are no loan files that match the selected criteria for this report."

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Create Loan Folder ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder =BIZ_Settings_CreateLoanFolder(strRowID2 , "OFF" , "OFF")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, strLoanFolder

intNumberOfLoans = CINT(BIZ_Pipeline_GetNumberOfLoansInPipeline)
For i = 0 To intNumberOfLoans - 1
	GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),0,True,True,False,"Single"
	BIZ_Loan_DeleteLoan
Next

'====== 'Loan Creation for loan Status Active Loan ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1474 ","Test Case Name: Validate that the NC report shouldn't populate for the loan with status = Active Loan", Null
BIZ_Loan_AddNewBlankLoan()
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowIDStatus
NorthCarolina_LoanCreation(strRowID)
BIZ_Loan_Save()
NorthCarolina_VerifyLoanStatus(strRowIDStatus)
strLoanNumber1 = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)

'====== 'Generate North Carolina Report ======
BIZ_Reports_GenerateNCReport "745", "745", strLoanFolder
NorthCarolinaReport_VerifyErrorMessage(strPopupMsg)

'====== Delete Loan Number from Application ======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, strLoanFolder
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strLoanNumber1
BIZ_Loan_DeleteLoan()

'====== 'Loan Property Address not equal to North Carolina ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1475 ","validate that the NC report shouldn't populate for the loan with the Property Address not equal to North Carolina", Null
BIZ_Loan_AddNewBlankLoan()
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowIDNonNCAdd
NorthCarolina_LoanCreation(strRowIDNonNCAdd)
BIZ_Loan_Save()
NorthCarolina_VerifyLoanStatus(strRowIDNonNCAdd)
strLoanNumber2 = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)

'====== 'Generate North Carolina Report ======
BIZ_Reports_GenerateNCReport "745", "745", strLoanFolder
NorthCarolinaReport_VerifyErrorMessage(strPopupMsg)

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)
