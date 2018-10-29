'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase: 
   '1 PTAC-1080  HP File Started 1  Create a new loan
   '2 PTAC-1083  HP File Started 2  Fill Borrower Summary
   '3 PTAC-1085  HP File Started 3  Credit Order Report
   '4 PTAC-1087  HP File Started 4  Complete 1003 Form
   '5 PTAC-1090  HP File Started 5  Sent Sign eConsent
   '6 PTAC-1096  HP File Started 6  e Disclosures
   '7 PTAC-1117  HP File Started 7  Request conditions in eFolder
   '8 PTAC-1101  HP File Started 8  Assign Loan Officer
'@ Test Automation JIRA Task: PTAC - 1130  E2E_HappyPath_FileStarted
'@ TestData: Global_Data, Forms_RegZ-L, Forms_1003Page, Forms_VOD, Forms_BorrowerSummaryOrigin
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Create a new loan
   '2 Fill Borrower Summary Details
   '3 Generate Credit Order Report
   '4 Complete 1003 Form Details
   '5 Sent Sign eConsent for the Loan
   '6 e Disclosures
   '7 Request conditions in eFolder
   '8 Assign Loan Officer
'@ ExpectedResult: Loan should be created and assigned to Loan Officer
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC - 1130","Script Name :E2E_HappyPath_FileStarted", Null

'====== PTAC-1080 HP File Started 1  Create a new loan ======
RunAction "FileStarted_CreateANewLoan_001", oneIteration

'====== PTAC-1083  HP File Started 2 Complete Borrower summary Origination ======
RunAction "FileStarted_FillBorrowerSummary_002", oneIteration

'====== PTAC-1085 HP File started 3 Order Credit Report ======
RunAction "FileStarted_CreditOrderReport_003", oneIteration

'====== PTAC-1087 HP File started 4 Complete 1003 Form ======
RunAction "FileStarted_Complete1003Form_004", oneIteration

'====== PTAC-1090  HP File started 5 Sent e-Consent/sign e-consent ======
RunAction "FileStarted_RequesteConsent_005", oneIteration

'====== PTAC - 1096 HP File started 6 Product and Pricing ======
RunAction "FileStarted_ProductAndPricing_006", oneIteration

'====== PTAC-1117  HP File started 7 Order Automated underwriting/Import conditions ======
RunAction "FileStarted_RequestConditionsIneFolder_007", oneIteration

'====== PTAC-1101  HP File started 8 Assign Loan officer by Loan Opener & Accept file ======
RunAction "FileStarted_AssignLoanOfficer_008", oneIteration

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_HappyPath"
End If
'====== Saves the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)

'BIZ_DisclosureTrackingWeb_Login "E2E_DisclosureTracking"
'BIZ_DisclosureTrackingWeb_BorrowerAcceptEConsent BIZ_Loan_GetLoanNumber,"E2E_DisclosureTracking", 1
'BIZ_DisclosureTrackingWeb_BorrowerAcceptEConsent BIZ_Loan_GetLoanNumber,"E2E_DisclosureTracking", 2
'If lcase(strNBOFlag)="yes" Then
'    BIZ_DisclosureTrackingWeb_BorrowerAcceptEConsent BIZ_Loan_GetLoanNumber,"E2E_DisclosureTracking", 3
'End If
'BIZ_DisclosureTrackingWeb_Logout
'
'
'BIZ_DisclosureTrackingWeb_Login


