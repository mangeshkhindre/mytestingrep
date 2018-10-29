'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2421 FHACOREFIARM Disclosure Tracking1- Validate dislosure Tracking
'@ Test Automation JIRA Task: PTAC-2715  E2E_7FHACORefiARM_DisclosureTracking
'@ TestData: 
   '1 Global_Data, Login and E2E_Clarklp
   '2 Loans, Milestone and E2E_FHAPURARM_DisclosureTracking 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 Login to encompass with the provided credentials.
   '02 Click on 'Accept File' button.
   '03 Click 'ok' in the pop up.
   '04 click tools and click disclosure tracking.
   '05 In Compliance Timeline verify the following fields:
	   'Application Date: Date when the application is created
	   'LE Due Date: Application date + 2 days
	   'eConsent: Date that econsent is accepted by all the available borrower pairs
	   'Earliest Closing: LE sent Date + 7days (Exclude holidays)
   '06 In LE Tracking verify the following:
       'LE Sent: date LE sent
       'LE Received: LE sent date + 3days (Exclude holidays)
       'SSPL Sent: date SSPL sent
   '07 Double click on first line item under disclosure history.
   '08 Should have below details for Borrower Pair: Borrower1 Auto1 and Co-Borrower1 Auto1
       'Received Method: eFolder eDisclosures
       'Presumed Received Date: LE sent date + 3days (Exclude holidays)
       'Actual Received: Blank
       'eDisclosure Tracking Tab: Should have the Consent status Accepted
       'View Form should open the consent accepted by the Borrower Pair
   '09 Click on log tab and click on disclosure tracking milestone. 
   '10 Select 'clarklp' as loan processor.
   '11 Check the checkbox for finish milestone.
'@ ExpectedResult: 
   '1 Should be able to login.
   '2 Milestone alert has been cleared message should pop up. 
   '3 Pop up window should close.
   '4 Disclosure tracking tool will open.
   '5 In compliance timeline appropriate dates should be populated.
   '6 All dates should be populated in LE tracking.
   '7 Disclosure details window should pop up.
   '8 All the appropriate values should be seen.
   '9 Disclosure today should open. Should be able to select 'clarklp' as Loan processor. Milestone should be finished.
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2715","Script Name - E2E_7FHACORefiARM_DisclosureTracking", Null

Dim objData, objDataProcessing

'====== Login to the Encompass as admin ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2421","FHACOREFIARM Disclosure Tracking1- Validate dislosure Tracking", Null
BIZ_Login_UserLogin "E2E_Clarklp"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_DisclosureTracking")

'====== Search Loan in the Pipeline Tab ======
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_FHACORefiARM","Disc. Tracking"
BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")
BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()
BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()
BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")

'====== Saves the Loan Details  ======
BIZ_Loan_SaveLoanNumber()

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_FHACORefiARM"    
End If

'===== Exit From Loan Details =====
BIZ_Loan_Exit True

'===== Logout From Encompass =====
BIZ_Login_UserLogout()

Set objData 				 = Nothing
Set objDataProcessing        = Nothing

FRM_RT_TearDownTest(Null)