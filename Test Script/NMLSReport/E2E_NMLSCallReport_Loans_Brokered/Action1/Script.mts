'@**************************************************************************************************
'@ TestStory:PTAC-3524 NMLS Call Report
'@ TestCase:
	'1 PTAC-3240 NMLS Call Report - Creation of Loans for verifying NMLS Report for two quarters-Banked Retail,Wholesale 
	'2 PTAC-3271 NMLS Call Report - Validation of NMLS Report for created loans-Banked Retail,Wholesale  
'@ Test Automation JIRA Task: PTAC-3582,NMLSCallReport_VerifyApplicationData_Loans_Brokered
'@ TestData: 
	'Forms_BorrowerSummaryOrigination, SetHeadInfo and  strRowID 
	'Forms_1003page, 1003Page1 and "PTAC-3240_"
	'Settings_TablesFees, MITable and "PTAC-3449"
	'Forms_HMDAInformation, SetNMLSInfo and "PTAC-3240_"
	'Forms_2015Itemization, Set800Section and "PTAC-3240_"
	'Forms_ATRQMManagement, SetATRQMEligibility and "PTAC-3240_"
	'Settings_Loansetup, AddLoanFolder and "LoanFolderCreation_005"
'@ Pre-conditions:
'@ Description:
	'The created loans will be the pre-requisite test data required for verifying the test cases for two quarters. 
	'Field IDs for the test data: 
	' Dates (749 & 745) 
	' Channel (2626) 
	' Current Status (1393) 
	' Loan Amount (1109) 
	' MIP/FF (1045) 
	' Initial Application Amount (NMLS.X11) - HMDA Information->NMLS Info 
	' Net (Initial and Final) (NMLS.X12) - HMDA Information->NMLS Info 
	' Loan type (1172) 
	' Property Type (HMDA.X11) 
	' Loan Purpose (384) 
	' Lien Status (Field HMDA.X14) 
	' NMLS Loan Type (NMLS.X1) - HMDA Information->NMLS Info 
	' Reverse Mortgage Type (NMLS.X10) - HMDA Information->NMLS Info 
	' Loan Origination Fees (388) 
	' Ability-to-repay Loan Type (QM.X23) 
	' Repurchased Date (3312)- HMDA Information->NMLS Info 
	' Repurchased Cost (3313)- HMDA Information->NMLS Info 
	' Loan Production checkbox (3338)- HMDA Information->NMLS Info 
	' NMLS ID (3238) 	
'@ TestSteps:
	'PTAC-3240
	'1 Login to Encompass with Valid credentials.
	'2 Go to Settings Create a loan folder and create the loans as per the attached excel sheet.
	'PTAC-3271
	'1 Click on Pipeline tab. Select  Pipeline menu -> Compliance Services -> Generate NMLS Call Report.
	'2 Select the details as per the test data and Click on the Generate button -> Click on Save -> In the 'Encompass' pop-up window, click on 'No' button.
'@ ExpectedResult:
	'PTAC-3240
	'1 User is logged into Encompass successfully.
	'2 13 loans are created as per the excel sheet data in the loan folder.
	'PTAC-3271
	'NMLS Call Report' window is displayed.
	'NMLS Excel Spreadsheet is generated
	'Validate the following under 'Closed Retail Application':
	'AC110:105040.
	'Count:1
	'Validate the following under 'Closed wholesale application:'
	'AC120:105040.
	'Count:1
	'Validate the following under 'Closed Retail Application':
	'AC210:105040.
	'Count:1
	'Validate the following under 'Closed Wholesale Application':
	'AC220:105040.
	'Count:1
	'Validate the following under 'Closed Wholesale Application':
	'AC300 : 105040.
	'Count : 1
	'Validate the following under 'Closed Retail Application':
	'AC310 : 105040.
	'Count : 1
	'Validate the following under 'Closed Retail Application:'
	'AC400 : 105040.
	'Count : 1
	'Validate the following under 'Closed Retail Application:'
	'AC500 : 105040.
	'Count : 1
	'"Validate the following under 'Closed Wholesale Application:'
	'AC520 : 105040.
	'Count : 1"
	'Validate the following under 'Closed Retail Application:'
	'AC610 : 0
	'Validate the following under 'Closed  Wholesale Application:'
	'AC610 : 0
	'Validate the following under 'Closed Retail Application:'
	'AC710 : 105040.
	'Count : 1
	'Validate the following under 'Closed Wholesale Application:'
	'AC720 : 105040.
	'Count : 1
	'Validate the following under 'Closed Retail Application:'
	'AC810 : 105040.
	'Count : 1
	'Validate the following under 'Closed Wholesale Application:'
	'AC810 : 105040.
	'Count : 1
	'Validate the following under 'Closed Retail Application:'
	'AC630 : 0
	'Validate the following under 'Closed wholesale Application:'
	'AC630 : 0
	'Validate the following under 'Closed Retail Application:'
	'AC930 : 105040.
	'Count : 1
	'Validate the following under 'Closed Wholesale Application:'
	'AC930 : 105040.
	'Count : 1		
'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3582 ","Script Name: NMLSCallReport_VerifyApplicationData_Loans_Brokered ", Null
strPipelineView 	= 	"Super Administrator - Default View"
strRowID			=	"PTAC-3449"
strRowID2			=	"PTAC-3240_"
strRowID5			=	"LoanFolderCreation_005"
strFileName			=	"NMLSReport.xls "
strNMLSVer4			=	"Version 4.0 (NMLS Rev. 2015.1)"
strRowID3			=	"PTAC-3240_1"
strFannieTab		=   "Fannie Mae"
strRowID6           =   "PTAC-3271"
intActLoanNumber    =   0
intReqLoanNumber    =  23
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Create Loan Folder ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder =BIZ_Settings_CreateLoanFolder(strRowID5 , "OFF" , "OFF")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, strLoanFolder

'====== 'Creation of Loans for verifying NMLS Report for two quarters-Banked Retail,Wholesale  ======
'As per test case We need to create 23 loans, so taken loop from 1 to 23 for loan creation 
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3240" ,"  NMLS Call Report - Creation of Loans for verifying NMLS Report for two quarters-Banked Retail,Wholesale ", Null

intNumberOfLoans = CINT(BIZ_Pipeline_GetNumberOfLoansInPipeline)
If intNumberOfLoans <> intReqLoanNumber Then
	For i = 0 To intNumberOfLoans - 1
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),0,True,True,False,"Single"
		BIZ_Loan_DeleteLoan
	Next	
	For Iterator = 1 To intReqLoanNumber Step 1	
		BIZ_Loan_AddNewBlankLoan()
		NMLS_LoanCreationRetialAndWholeSale strRowID,strFannieTab,strRowID2&Iterator
		BIZ_Loan_Save()
		BIZ_Loan_Exit(True)	
	Next
End If 

Wait g_ShortWaitMedium   'Explicit Wait Added Due to Sync
intActLoanNumber=GUI_List_GetNumberofRows(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gvLoans"))
FRM_VerifyEqual  intReqLoanNumber,intActLoanNumber, "Number of Loan Created ", "Number of Loan Created "
'====== 'Validation of NMLS Report for created loans-Banked Retail,Wholesale  ======
UTIL_Win_CloseExcel()
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3271" ,"  NMLS Call Report - Validation of NMLS Report for created loans-Banked Retail,Wholesale ", Null
BIZ_Report_GenerateNMLSCallReport strRowID3,strLoanFolder,strNMLSVer4,strFileName 
NMLSCallReport_VerifyRetailWholeSaleApplicationData strRowID6,strFileName

'====== 'Delete Excel File ======
strExcelFilePath   = Pathfinder.Locate("Test Report\")&strFileName
UTIL_Excel_Opened_File_Delete strExcelFilePath

'====== 'Logout Application ======
 BIZ_Login_UserLogout
 FRM_RT_TearDownTest(Null)


