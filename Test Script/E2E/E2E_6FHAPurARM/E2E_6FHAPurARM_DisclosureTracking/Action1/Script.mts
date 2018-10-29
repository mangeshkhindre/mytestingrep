'@**************************************************************************************************
'@ TestStory : PTAC-2010 E2E_6FHAPURARAM
'@ TestCase  : PTAC-1908 Disclosure Tracking1- Validate dislosure Tracking
'@ Test Automation JIRA Task: PTAC-2173 E2E_6FHAPURARM_DisclosureTracking
'@ TestData: 
   'Global_Data, Login, E2E_Carollp
'@ Pre-conditions: N/A
'@ Description	 : N/A 
'@ TestSteps:
    '1 Login to encompass with the provided credentials.
	'2 Click on 'Accept File' button.
	'3 Click 'ok' in the pop up.
	'4 click tools and click disclosure tracking.
	'5 Verify if all the compliance timeline dates and LE Tracking dates are populated except the safeharbor sent date.
	'6 Under disclosure history select a disclosure by double clicking on it. 
	'7 Verify if the following fields are editable:
	   'Disclosure type dropdown,
	   'Intent to proceed checkbox,
	   'If not disclosed,
	   'received method dropdown,
	   'presumed received date lockbox and textbox,
	   'actual received date combo box,
	   'loan estimate disclosed by broker checkbox
	'8 Click on disclosure tracking and click finished milestone.
'@ ExpectedResult: 
    '1 Should be able to login.
	'2 Milestone alert has been cleared message should pop up. 
	'3 Pop up window should close.
	'4 Disclosure tracking tool will open.
	'5 All the dates are populated.
	'6 Disclosure details window will open. 
	'7 All the fields are non-editable.(intent to proceed will be editable if it is a first time LE and non-editable if it is a revised LE.)
	'8 Milestone should be finished.
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2715","Script Name: E2E_7FHACORefiARM_DisclosureTracking", Null

FRM_Logger_ReportstepEvent "Start Test Case PTAC-1908","Disclosure Tracking1- Validate dislosure Tracking", Null

Dim objData, objDataProcessing

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "E2E_Carollp"
FRM_RT_SetLoanNo_RT_PropFile()

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_DisclosureTracking")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OKX 10, ""
Set objData = Nothing

'====== Search the Loan in the Pipeline Tab =====
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_FHAPURARM","Disc. Tracking"

BIZ_Loan_AcceptFiles "Disclosure Tracking", FRM_DS_GetValue(objDataProcessing, "NextUser")

BIZ_DisclosureTrackingTool_VerifyLETrackingDatesDisplay()

BIZ_DisclosureTrackingTool_VerifyEditableFieldsInDisclosureDetails()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_DisclosureTracking")
BIZ_Loan_FinishMilestone_AssignUser "Disclosure Tracking", FRM_DS_GetValue(objData, "NextUser")

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Disc. Tracking finished") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS3Complete_FHAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 				 = Nothing
Set objDataProcessing 		 = Nothing

FRM_RT_TearDownTest(Null)