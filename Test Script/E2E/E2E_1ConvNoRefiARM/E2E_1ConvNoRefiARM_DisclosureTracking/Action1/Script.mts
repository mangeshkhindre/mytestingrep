''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1312 CONVNOCASHREFIARM- Disclosure Tracking1- Validate dislosure Tracking
'@ Test Automation JIRA Task: PTAC-1804 E2E_1ConvNoRefiARM_DisclosureTracking
'@ TestData: 
   '1 Global_Data, Login, E2E_carollp
   '2 Loans, Milestone, E2E_ConvNoRefiARM_DisclosureTracking
'@ Pre-conditions: 
'@ Description: validate disclosure tracking dates, time and if fields are editable and finish milestones.  
'@ TestSteps:
   '1 Login to encompass with the provided credentials.
	  'Click on 'Accept File' button.
	  'Click 'ok' in the pop up.
	  'Click tools and click disclosure tracking.
   '2 In Disclosure History verify the following fields:
	  'Sent Date:
	  'Method: eFolder eDisclosures
	  'By: User-Id
	  'No of Disclosures: No of documents attached.
	  'LE Sent? : Yes
	  'CD Sent?: No
	  'Safe Harbor Sent?: No
	  'Provider List Sent?: Yes
	  'Borrower Pair: Borrower1 Auto1 and Co-Borrower1 Auto1
	  'Included in Timeline: Yes
	  'Disclosure Type: Initial
	  'Intent: No
	  'Broker Disclosed?: No
   '3 In Compliance Timeline verify the following fields:
	  'Application Date: Date when the application is created
	  'LE Due Date: Application date + 2 days
	  'eConsent: Date that econsent is accepted by all the available borrower pairs
	  'Earliest Closing: LE sent Date + 7days (Exclude holidays)
   '4 In LE Tracking verify the following:
	  'LE Sent: date LE sent
	  'LE Received: LE sent date + 3days (Exclude holidays)
	  'SSPL Sent: date SSPL sent
   '5 Double click on first line item under disclosure history.
   '6 Should have below details for Borrower Pair: Borrower1 Auto1 and Co-Borrower1 Auto1
	  'Received Method: eFolder eDisclosures
	  'Presumed Received Date: LE sent date + 3days (Exclude holidays)
	  'Actual Received: Blank
	  'eDisclosure Tracking Tab: Should have the Consent status Accepted
   '7 View Form should open the consent accepted by the Borrower Pair
   '8 Click on log tab and click on disclosure tracking milestone. 
	  'Select 'carollp' as loan processor.
	  'Check the checkbox for finish milestone. 
'@ ExpectedResult: 
   '01 Should be able to login.
   '02 Milestone alert has been cleared message should pop up. 
   '03 Pop up window should close.
   '04 Disclosure tracking tool will open.
   '05 Field values should be the same in disclosure history.
   '06 In compliance timeline appropriate dates should be populated.
   '07 All dates should be populated in LE tracking.
   '08 Disclosure details window should pop up.
   '09 All the appropriate values should be seen.
   '10 Disclosure today should open. Should be able to select 'carollp' as Loan processor.Milestone should be finished.
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1804","Script Name: E2E_1ConvNoRefiARM_DisclosureTracking", Null

Dim objData, objDataProcessing

'====== Login to the Encompass as admin ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1312","CONVNOCASHREFIARM- Disclosure Tracking1- Validate dislosure Tracking", Null
BIZ_Login_UserLogin "E2E_carollp"

Set objData			  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_DisclosureTracking")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'====== Gets the Loan Number ======
'====== Search the Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_ConvNoRefiARM","Disc. Tracking"
BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()
BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()

BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_ConvNoRefiARM"    
End If

'Exists Loan Details
BIZ_Loan_Exit True
'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 				 = Nothing
Set objDataProcessing 		 = Nothing

FRM_RT_TearDownTest(Null)