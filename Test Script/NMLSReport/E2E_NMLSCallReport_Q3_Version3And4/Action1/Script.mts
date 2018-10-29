'@**************************************************************************************************
'@ TestStory:PTAC-3524 NMLS Call Report
'@ TestCase:
	'1 PTAC-2968 NMLS Call Report - Creation of Loans for verifying NMLS Report for quarter: July-Sep. 
	'2 PTAC-3405 NMLS Call Report - Validation of NMLS Report for created loans-Quarter:Jul-Sep,Version-4 
	'3 PTAC-3406 NMLS Call Report - Validation of NMLS Report for created loans-Quarter:Jul-Sep,Version-3 
'@ Test Automation JIRA Task: PTAC-3526,NMLSCallReport_VerifyApplicationData_Q3_Version3And4
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-2968_1
	'2 Forms_1003page, 1003Page1 and PTAC-2968_1 
	'3 Forms_HMDAInformation, SetNMLSInfo and PTAC-2968_1
	'4 Settings_TablesFees, MITable and PTAC-3449
'@ Pre-conditions:
'@ Description:
	' The created loans will be the pre-requisite test data required for verifying the test cases for two quarters.
	' Field IDs for the test data:
	' Dates (749 & 745)
	' Channel (2626)
	' Current Status (1393)
	' Loan Amount (1109)
	' MIP/FF (1045)
	' Initial Application Amount (NMLS.X11) - HMDA Information->NMLS Info
	' Net (Initial and Final) (NMLS.X12) - HMDA Information->NMLS Info
'@ TestSteps:
	'1 Login to Encompass with Valid credentials.
	'2 Go to Settings Create a loan folder and create the loans as per the attached excel sheet.
	'3 Click on Pipeline tab. Select  Pipeline menu -> Compliance Services -> Generate NMLS Call Report.
	'4 Select the details as per the test data and Click on the Generate button -> Click on Save -> In the 'Encompass' pop-up window, click on 'No' button.
'@ ExpectedResult:
	'1 User is logged into Encompass successfully.
	'2 14 loans are created as per the excel sheet data in the loan folder.
	'3 'NMLS Call Report' window is displayed.
	'4 NMLS Excel Spreadsheet is generated
	'5 Validate the following under 'Directly Received From Borrower':		
	   'AC020=553000/7
	   'AC030=83000/1
	   'AC040=81000/1
	   'AC050=79000/1
	   'AC060=77000/1
	   'AC062=75000/1
	   'AC064=73000/1
	   'Validate the following under 'Received From 3rd Party':
	   'AC020=546000/7
	   'AC030=82000/1
	   'AC040=80000/1
	   'AC050=78000/1
	   'AC060=76000/1
	   'AC062=74000/1
	   'AC064=72000/1
	'6 Validate the following under 'Directly Received From Borrower':
	   'AC020=848400/7
	   'AC030=117160/1
	   'AC040=119180/1
	   'AC050=121200/1
	   'AC060=123220/1
	   'AC062=125240/1
	   'AC064=127260/1
 	   'Validate the following under 'Received From 3rd Party':
	   'AC020=855470/7
	   'AC030=118170/1
	   'AC040=120190/1
	   'AC050=122210/1
	   'AC060=124230/1
	   'AC062=126250/1
	   'AC064=128270/1
'***************************************************************************************************

FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3526 ","Script Name: NMLSCallReport_VerifyApplicationData_Q3_Version3And4 ", Null

Dim strPipelineView, strRowID, strRowID2, strRowID4, strRowID5, strFileName , strNMLSVer3, strNMLSVer4, strLoanFolder
strPipelineView 	= 	"Super Administrator - Default View"
strRowID			=	"PTAC-3449"
strRowID2			=	"PTAC-2968_1"
strRowID4			=	"PTAC-2968_"
strRowID5			=	"LoanFolderCreation_007"
strFileName			=	"NMLSReport.xls "
strNMLSVer3			=	"Version 3.0 (NMLS Rev. 2014.1)"
strNMLSVer4			=	"Version 4.0 (NMLS Rev. 2015.1)"
intActLoanNumber    =   0
intReqLoanNumber    =  14                       
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Create Loan Folder ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder =BIZ_Settings_CreateLoanFolder(strRowID5 , "OFF" , "OFF")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, strLoanFolder

'====== 'Loan Creation for  ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2968" ," NMLS Call Report - Creation of Loans for verifying NMLS Report for quarter: July-Sep.", Null

intNumberOfLoans = CINT(BIZ_Pipeline_GetNumberOfLoansInPipeline)
If intNumberOfLoans <> intReqLoanNumber Then
	For i = 0 To intNumberOfLoans - 1
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),0,True,True,False,"Single"
		BIZ_Loan_DeleteLoan
	Next	
	For Iterator = 1 To intReqLoanNumber Step 1	
		BIZ_Loan_AddNewBlankLoan()
		NMLS_LoanCreation strRowID,strRowID4&Iterator
		BIZ_Loan_Save()
		BIZ_Loan_Exit(True)	
	Next
End If 

Wait g_ShortWaitMedium   'Explicit Wait Added Due to Sync
intActLoanNumber=GUI_List_GetNumberofRows(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gvLoans"))
FRM_VerifyEqual  intReqLoanNumber,intActLoanNumber, "Number of Loan Created ", "Number of Loan Created "
'====== Generate NMLS Call Report data for Version 3 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3406" ,"  NMLS Call Report - Validation of NMLS Report for created loans-Quarter:Jul-Sep,Version-3 ", Null
BIZ_Report_GenerateNMLSCallReport strRowID2,strLoanFolder,strNMLSVer3,strFileName 
NMLSCallReport_VerifyApplicationData "Q3Ver3",strFileName

'====== Generate NMLS Call Report data for Version 3 ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3405" ,"  NMLS Call Report - Validation of NMLS Report for created loans-Quarter:Jul-Sep,Version-4 ", Null
BIZ_Report_GenerateNMLSCallReport strRowID2,strLoanFolder,strNMLSVer4,strFileName 
NMLSCallReport_VerifyApplicationData "Q3Ver4",strFileName

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)



