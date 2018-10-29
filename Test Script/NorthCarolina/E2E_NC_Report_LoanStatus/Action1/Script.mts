'@******************************************************************************************
'@ TestStory:PTAC-1834 North Carolina Compliance Report
'@ TestCase:
   '1 PTAC-1479 - validate the NC report along with the report data, with Application Denied loan status. 
   '2 PTAC-1480 - validate the NC report along with the report data, with Application withdrawn loan status. 
   '3 PTAC-1481 - bvalidate the NC report along with the report data, with File closed for incompleteness loan status. 
   '4 PTAC-1482 - validate the NC report along with the report data, with Loan purchased by your institution loan status. 
'@ Test Automation JIRA Task: PTAC-1838 NorthCarolina_ComplianceReport_ForLoanStatus
'@ TestData:
    '01 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1479
    '02 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1480
    '03 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1481
    '04 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-1482
	'05 Forms_BorrowerSummaryOrigination, SetProperty and PTAC-1479
	'06 Forms_1003page, 1003Page2 and PTAC-1479
	'07 Forms_ATRQMManagement, SetCreditInformation and PTAC-1479
	'08 Forms_ATRQMManagement, SetQualification and PTAC-1479
	'09 Forms_RegZ_CD, RegZ_CD and PTAC-1479
	'10 Forms_1003page, 1003Page1 and PTAC-1479
	'11 Forms_1003page, SetLoanOriginator and PTAC-1479
	'12 Forms_1098MortgageInterest,SetMortgageInterest and PTAC-1479
	'13 Forms_HMDAInformation, SetNMLSInfo and PTAC-1479
	'14 Forms_FNMAStreamlined, FNMAStreamlined and PTAC-1479	
	'15 Forms_ClosingDisclosurePage, CDPage4 and PTAC-1479 
	'16 Forms_2015Itemization, Set800Section and PTAC-1479 
	'17 Forms_2015Itemization, Set900Section and PTAC-1479 
	'18 Forms_2015Itemization, Set1000Section and PTAC-1479 
	'19 Forms_2015Itemization, Set1000Section and PTAC-1479 
	'20 Settings_Loansetup, AddLoanFolder and LoanFolderCreation_005
'@ Pre-conditions: NA
'@ Description:  NA
'@ TestSteps:
	'01 Login to encompass with credentials admin / password.
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
	'16 Verify the Borrower Summary Origination fields data w.r.t generated NC Report
	'17 Verify the ATR/QM Management fields data w.r.t generated NC Report
	'18 Verify the CD Page-4 fields data w.r.t generated NC Report
	'19 Verify the Ditech - Data Change: fields data w.r.t generated NC Report
	'20 Verify the 1003 Page-2 fields data w.r.t generated NC Report
	'21 Verify the 1003 Page-1 fields data w.r.t generated NC Report
	'22 Verify the CD Page -1 fields data w.r.t generated NC Report
	'23 Verify the 1003- Page-3 fields data w.r.t generated NC Report
	'24 Verify the 1098 Mortgage fields data w.r.t generated NC Report
	'25 Verify the HMDA Information fields data w.r.t generated NC Report
	'26 Verify the FNMA Streamlined 1003 fields data w.r.t generated NC Report
	'27 Verify the Loan Submission fields data w.r.t generated NC Report
	'28 Verify the 2015 Itemization fields data w.r.t generated NC Report
	'29 Verify the HUD-92900LTFHA Loan Transition fields data w.r.t generated NC Report
'@ ExpectedResult: 
	'03 Loan Created as per test data  in Selected folder
	'04 Loan Status Verified
	'13 North Carolina Compliance Report generated
	'16 Borrower Summary Origination:
		'356-AppraisedAmount-500,000
		'1177-InterestOnlyPeriod-6
		'Mornet.x67-LoanDocumentTypeDescription-(K) No Verification of Stated
		'Income, Employment, or Assets
		'1393 LoanStatus- Application Denied
	'17 ATR/QM Management:
		'745 or 3142-AppReceivedByFundingEntityDate-Current Date
		'745 or 3142-AppReceivedByOriginatingEntityDate-Current Date
		'VASUMM.X23 CreditScore:0
		'761-InterestRateLockDate:First Day of the coming month
		'1659 IsBalloonMortgage:No
		'3293 UndiscountedInterestRate:2.12
	'18  CD Page -4 :
		'1699-ARMFloor:4.125
		'663 IsCallProvision-does (unchecked)
		'674 LatePaymentPenaltyPercent-5
	'19 Ditech - Data Change:
		'688-ARMIndex:2.125
		'689-ARMMargin:4.125
		'697-ARMInitialAdjustmentCap:2
	'20  1003 Page-2:
		'736-BorrowerIncome-90,000.00
	'21 1003 Page-1:
		'2-LoanAmount: 425,000.00
		'3-LoanInterestRate:5.75
		'4 LoanTerm:360
		'15 PropertyZipCode-27006
		'12 PropertyCity-Bixby
		'13 PropertyCounty-Davie
		'14 PropertyState-NC
		'11 PropertyStreet1-Lane No. 1250
		'136 PurchasePrice-500,000.00
		'19 LoanPurpose- Cash out Refinance
		'299- IsRefinancedBySameLender NO
		'4000-BorrowerNameFirst:Alice
		'4002-BorrowerNameLast:Buckbrown
		'420 LienPriority- First
		'1172 MortgageType- Convnetional
		'1811 Occupancy-Primary
	'22 CD Page -1
		'748-CloseDate:21 days from Loan Date
	'23 1003- Page-3
		'3237-CompanyNMLSEntityID:4526
		'3238-MLONMLSEntityID:4526
		'1612 MortgageLoanOriginator Admin User
	'24 1098 Mortgage
		'2553-Dispursement Date:21 days from Loan Date
	'25 HMDA Information
		'HMDA.X11(Property type)-Manufactured Housing
	'26 FNMA Streamlined 1003
		'423 PaymentFrequency-ARM
	'27 Loan Submission
		'1205 PMILoanToValueLimit : 2.21
		'NEWHUD.X1301 USDAFeeAmount- 100
		'NEWHUD.X1708 USDAFeeAmountInEscrow-5,500.00
		'1050 VALoanFundingFee-250
		'338 -PMIUpfrontPremiumAmountInEscrow 5,500.00
	'28 2015 Itemization fields 
		'NEWHUD.X1301 USDAFeeAmount- 100
		'NEWHUD.X1708 USDAFeeAmountInEscrow-5,500.00
		'1050 VALoanFundingFee-250
		'338 -PMIUpfrontPremiumAmountInEscrow 5,500.00
	'29 HUD-92900LTFHA Loan Transition
		'1724 -PaymentAmount 2,036.46
'********************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1838 ","Script Name: NorthCarolina_ComplianceReport_ForLoanStatus ", Null

strPipelineView 	= 	"Super Administrator - Default View"
strRowID			=	"PTAC-1479"
strRowID2			=	"LoanFolderCreation_008"
strRowHeaderID2     =    "PTAC-1480"
strRowHeaderID3     =    "PTAC-1481"
strRowHeaderID4     =    "PTAC-1482"
strExcelFileName	=	 "NCLoanData.xlsx"
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

	'====== 'Loan Creation for loan Status Application Denied ======
	FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1479 ","Test Case Name: validate the NC report along with the report data, with Application Denied loan status.", Null
	BIZ_Loan_AddNewBlankLoan()
	BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
	NorthCarolina_LoanCreation(strRowID)
	BIZ_Loan_Save()
	NorthCarolina_VerifyLoanStatus(strRowID)
	strLoanNumber1=BIZ_Loan_GetLoanNumber()
	BIZ_Loan_Exit(True)
	
	''====== 'Loan Creation for loan Status Application withdrawn ======
	FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1480 ","Test Case Name: validate the NC report along with the report data, with Application withdrawn loan status.", Null
	'BIZ_Loan_AddNewBlankLoan()
	BIZ_Loan_SelectLoanByColFieldValueInPiplineView "Loan Number", strLoanNumber1
	BIZ_Pipeline_DuplicateLoan "","Duplicate", "","Yes" 
	BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowHeaderID2
	'NorthCarolina_LoanCreation(strRowID)
	BIZ_Loan_Save()
	NorthCarolina_VerifyLoanStatus(strRowHeaderID2)
	strLoanNumber2=BIZ_Loan_GetLoanNumber()
	BIZ_Loan_Exit(True)
	
	'====== 'Loan Creation for loan Status File closed for incompleteness ======
	FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1481","Test Case Name: validate the NC report along with the report data, with File closed for incompleteness loan status.", Null
	'BIZ_Loan_AddNewBlankLoan()
	BIZ_Loan_SelectLoanByColFieldValueInPiplineView "Loan Number", strLoanNumber1
	BIZ_Pipeline_DuplicateLoan "","Duplicate", "","Yes"
	BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowHeaderID3
	'NorthCarolina_LoanCreation(strRowID)
	BIZ_Loan_Save()
	NorthCarolina_VerifyLoanStatus(strRowHeaderID3)
	strLoanNumber3=BIZ_Loan_GetLoanNumber()
	BIZ_Loan_Exit(True)
	
	'====== 'Loan Creation for loan Status Loan purchased by your institution ======
	FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1482","Test Case Name: validate the NC report along with the report data, with Loan purchased by your institution loan status. ", Null
	'BIZ_Loan_AddNewBlankLoan()
	BIZ_Loan_SelectLoanByColFieldValueInPiplineView "Loan Number", strLoanNumber1
	BIZ_Pipeline_DuplicateLoan "","Duplicate", "","Yes"
	BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowHeaderID4
	'NorthCarolina_LoanCreation(strRowID)
	BIZ_Loan_Save()
	NorthCarolina_VerifyLoanStatus(strRowHeaderID4)
	strLoanNumber4=BIZ_Loan_GetLoanNumber()
	BIZ_Loan_Exit(True)


'====== 'Generate North Carolina Report ======
UTIL_Win_CloseExcel()
BIZ_Reports_GenerateNCReport "745", "745", strLoanFolder
strExcelFilePathWithName   = Pathfinder.Locate("Test Report\")&strExcelFileName
Wait g_LongWaitSmall + g_LongWaitMedium 'Explicit wait added due to sync
UTIL_Excel_Opened_File_Save strExcelFilePathWithName

'====== 'Loan Data Verify for loan Status Application Denied ======
FRM_Logger_ReportStepEvent "Test Case : PTAC-1479 ","Test Case Name: validate the NC report along with the report data, with Application Denied loan status.", Null
BIZ_Loan_OpenByLoanNumber  strLoanNumber1
GUI_Dialog_Encompass_OKX 4, ""
NorthCarolina_VerifyLoanData1 strLoanNumber1

'====== 'Loan Data Verify for loan Status Application withdrawn  ======
FRM_Logger_ReportStepEvent "Test Case : PTAC-1480 ","Test Case Name: validate the NC report along with the report data, with Application withdrawn loan status.", Null
BIZ_Loan_OpenByLoanNumber strLoanNumber2
GUI_Dialog_Encompass_OKX 4, ""
NorthCarolina_VerifyLoanData1 strLoanNumber2

'====== 'Loan Data Verify for loan Status File closed for incompleteness ======
FRM_Logger_ReportStepEvent "Test Case : PTAC-1481","Test Case Name: validate the NC report along with the report data, with File closed for incompleteness loan status.", Null
BIZ_Loan_OpenByLoanNumber strLoanNumber3
GUI_Dialog_Encompass_OKX 4, ""
NorthCarolina_VerifyLoanData1 strLoanNumber3

'====== 'Loan Data Verify for loan Status Loan purchased by your institution ======
FRM_Logger_ReportStepEvent "Test Case : PTAC-1482","Test Case Name: validate the NC report along with the report data, with Loan purchased by your institution loan status. ", Null
BIZ_Loan_OpenByLoanNumber strLoanNumber4
GUI_Dialog_Encompass_OKX 4, ""
NorthCarolina_VerifyLoanData1 strLoanNumber4

strExcelFilePath   = Pathfinder.Locate("Test Report\")&strExcelFileName
UTIL_Excel_Opened_File_Delete strExcelFilePath

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)



	
