'***************************************************************************************************
'@ TestStory	: PTAC-871  E2E_2CONVPURARAM
'@ TestCase		: PTAC-800 - Resubmittal 1 - Disclose Lock Confirmation
'@ Test Automation JIRA Task: PTAC-1020  E2E_2CONVPURARM_ReSubmittal
'@ TestData	: 
   '1 Global, Login, E2E_markuslp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3 Loans, Milestone, E2E_CONVPURARM_Processing
   '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_CONVPURARM
   '5 eFolder_Tab, SelecteDisclosureDocs, E2E_CONVPURARM_LockConfirmation
   '6 eFolder_Tab, SendeDisclosures, E2E_CONVPURARM
'@ Pre-conditions: N/A
'@ Description	 : N/A 
'@ TestSteps	 : 
   '1 Login as Markuslp and click accept file.
   '2 Click ok in the popup.
   '3 Click e-folder.
   '4 Click e-disclosure.click 'order disclosures' button.
   '5 Click ""order edisclosures"" button in the disclosures audit window.
   '6 Click Add additional docs button.
   '7 Select lOCK CONFIRMATION and click add.
   '8 Unselect all and just select Lock confirmation and click send.
   '9 Select for borrower signing option wetsign option and click send.
   '10 click ok.
   '11 click ok.
   '12 Login In gmail with 
	   'userid : integrationborrower@gmail.com
	   'password:Integration-1.
	   'click on to electronic loan document request.
   '13 Sign-in to loan center with the following credentials
	   'Email- integrationborrower@gmail.com
	   'Password - Respa15
	   'Select your loan from the list in loan status page.
   '14 Click on 'browse' and attach a pdf document from your local' and click on 'upload'.
'@ ExpectedResult: 
   '1 Milestone alert has been cleared window will open.
   '2 E-folder should open.
   '3 Send E-disclosure window should open.Disclosure Audit window opens.
   '4 select documents page should open.
   '5 A list of additional documents will be shown.
   '6 The selected documents has been added to the list based on current stacking order- message will appear.
   '7 Send edisclosure page with email message will be shown.
   '8 Loan center should open
   '9 Loan detail page with wetsign will be shown
   '10 A new pop up window should open to upload document.
   '11 pop up should close and in loan center 'uploaded ' should be seen with a checkmark with a lock confirmation.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-800","Test Case Name: Resubmittal 1 - Disclose Lock Confirmation", Null

Dim objData, objDataResubmittal

FRM_RT_SetLoanNo_RT_PropFile()

Set objDataResubmittal 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_ReSubmittal")

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_markuslp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Retrieve the Loan Number 
GUI_Dialog_Encompass_OKX 10, ""

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS6Complete_CONVPURARM","Resubmittal"
BIZ_Loan_AcceptFiles "Resubmittal",FRM_DS_GetValue(objDataResubmittal, "NextUser")

' Open on eFolder 
BIZ_Nav_eFoler_Open()

' Send eDisclosure information 
BIZ_Documents_SendeDisclosure "E2E_CONVPURARM", "E2E_CONVPURARM_LockConfirmation", "E2E_CONVPURARM_WetSign"
BIZ_Nav_eFoler_Close()

Set objDataResubmittal 	= Nothing
Set objData             = Nothing