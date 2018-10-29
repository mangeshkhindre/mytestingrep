'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3135 CONVCASHOUTREFIFIX Disclosure Tracking1- Validate disclosure Tracking
'@ Test Automation JIRA Task: PTAC-3373 E2E_3CONVCASHOUTREFIFIX_DisclosureTracking
'@ TestData: 
   '1 Global_Data, Login and E2E_carollp
   '2 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_DisclosureTracking
'@ Pre-conditions: 
'@ Description: validate disclosure tracking dates, time and if fields are editable and finish milestones.  
'@ TestSteps:
   'Step1:
   '1 Login to encompass with the provided credentials. 
   '2 Click on 'Accept File' button. Click 'ok' in the pop up.
   '3 click tools and click disclosure tracking.
   'Step2:
   '1 In Compliance Timeline verify the following fields:
	  'Application Date: Date when the application is created
	  'LE Due Date: Application date + 2 days
	  'eConsent: Date that econsent is accepted by all the available borrower pairs
	  'Earliest Closing: LE sent Date + 7days (Exclude holidays)
   '2 In LE Tracking verify the following:
	  'LE Sent: date LE sent
	  'LE Received: LE sent date + 3days (Exclude holidays)
	  'SSPL Sent: date SSPL sent	
   '3 Double click on first line item under disclosure history.
   '4 Should have below details for Borrower Pair: Borrower1 Auto1 and Co-Borrower1 Auto1
	  'Received Method: eFolder eDisclosures
	  'Presumed Received Date: LE sent date + 3days (Exclude holidays)
	  'Actual Received: Blank
	  'eDisclosure Tracking Tab: Should have the Consent status Accepted
	  'View Form should open the consent accepted by the Borrower Pair
   'Step3:
   '1 Click on log tab and click on disclosure tracking milestone. 
   '2 Select 'carollp' as loan processor.
   '3 Check the checkbox for finish milestone.
'@ ExpectedResult: 
   'Step1:
   '1 Should be able to login.
   '2 Milestone alert has been cleared message should pop up. 
   '3 Pop up window should close.
   '4 Disclosure tracking tool will open.
   'Step2:
   '1 In compliance timeline appropriate dates should be populated.
   '2 All dates should be populated in LE tracking.  
   '3 Disclosure details window should pop up.   '  
   '4 All the appropriate values should be seen.
   'Step3:
   '1 Disclosure today should open.
   '2 Should be able to select 'carollp' as Loan processor.
   '3 Milestone should be finished.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-3373","Script Name: E2E_3CONVCASHOUTREFIFIX_DisclosureTracking", Null

Dim objData, objDataProcessing

'====== Login to the Encompass as admin ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3135","CONVCASHOUTREFIFIX Disclosure Tracking1- Validate disclosure Tracking", Null
BIZ_Login_UserLogin "E2E_markuslp"

Set objData           = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_DisclosureTracking")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'====== Gets the Loan Number ======
'====== Search the Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_CONVCASHOUTREFIFIX","Disc. Tracking"
BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()
BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_DisclosureTracking")
BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objData, "NextUser")

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_CONVCASHOUTREFIFIX"    
End If

'Exists Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 		  = Nothing
Set objDataProcessing = Nothing

FRM_RT_TearDownTest(Null)
