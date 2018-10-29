'@ TestStory: PTAC-3149  E2E_4FHAPURCASHFIX
'@ TestCase:  PTAC-3085  FHAPURCHASEFIX - Disclosure Tracking1- Validate dislosure Tracking
'@ Test Automation JIRA Task: PTAC-3152  E2E_4FHAPURCASHFIX_DisclosureTracking
'@ TestData: 
   'Global_Data, Login and E2E_markuslp
   'Loans, Milestone and E2E_FHAPURCASHFIX_DisclosureTracking 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to encompass with the provided credentials. Click on 'Accept File' button. Click 'ok' in the pop up.
   '2 Go to Borrower summary
   '3 In Encompass in disclosure tracking. click on the line item under disclosure history and check on "Intent to proceed" and click 'ok'.
   '4 click tools and click disclosure tracking.
      'Verify if all the compliance timeline dates(Application Date, LE Due,eConsent,Intend to Proceed,Earliest Fee, 
      'Earliest closing, Estimated Closing LE Sent and LE Received) fields data and LE Tracking dates are populated except the Safe Harbor Sent date.
   '5 Under disclosure history select a disclosure by double clicking on it.
      'Verify if the following fields are editable:
	   'Disclosure type dropdown,
	   'Intent to proceed checkbox,
	   'If not disclosed,
	   'received method dropdown,
	   'presumed received date lockbox and textbox,
	   'actual received date combo box,
	   'loan estimate disclosed by broker checkbox
   '6 Click on disclosure tracking and click finished milestone.
'@ ExpectedResult: 
   '1 Should be able to login. Milestone alert has been cleared message should pop up. 
   '2 loan data should be saved
   '3 Disclosure details window will open.
   '4 Should be able to login.Milestone alert has been cleared message should pop up. 
      'Pop up window should close. Disclosure tracking tool will open. All the dates are populated.
   '4 Disclosure details window will open.
      'All the fields are non-editable.(intent to proceed will be editable if it is a first time LE and non-editable if it is a revised LE.)
   '5 Milestone should be finished.
'********************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3152","Script Name:E2E_4FHAPURCASHFIX_DisclosureTracking", Null

Dim objData, objDataProcessing
'====== Login to the Encompass as admin ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3085","FHAPURCHASEFIX - Disclosure Tracking1- Validate dislosure Tracking", Null
BIZ_Login_UserLogin "E2E_Carollp"

Set objData           = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_DisclosureTracking") 

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'====== Search the Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_FHAPURCASHFIX","Disc. Tracking"
BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()
BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_DisclosureTracking")
BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objData, "NextUser")

'====== Saves the Loan Details  ======
BIZ_Loan_SaveLoanNumber()

If  BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished") Then
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_FHAPURCASHFIX"    
End If

'===== Exists the Loan Details =====
BIZ_Loan_Exit True

'===== Logs out of Encompass =====
BIZ_Login_UserLogout()

Set objData 				 = Nothing
Set objDataProcessing        = Nothing

FRM_RT_TearDownTest(Null)