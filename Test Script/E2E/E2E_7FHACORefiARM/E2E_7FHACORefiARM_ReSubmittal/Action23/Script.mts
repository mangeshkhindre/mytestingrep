'***************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase	: PTAC-2673 FHACOREFIARM Resubmittal 3-Disclose Lock Confirmation
'@ Test Automation JIRA Task: PTAC-2719 E2E_7FHACORefiARM_ReSubmittal
'@ TestData: 
   'Global, Logi, E2E_markuslp
   'Loans, LoanTemplat, E2E_LoanProcessorDefault
   'Loans, Mileston, E2E_FHACORefiARM_Processing
   'eFolder_Tab, SelectPackageTypeAndPlanCodeE2E_FHACORefiARM
   'eFolder_TabSelecteDisclosureDocs, E2E_FHACORefiARM_LockConfirmation
   'eFolder_Tab, SendeDisclosure, E2E_FHACORefiARM
'@ Pre-conditions: N/A
'@ Description	 : N/A 
'@ TestSteps: 
    '1 Login to Encompass as Loan processor.
    '2 Click e-folder.
    '3 Click e-disclosure.click 'order disclosures' button.Select 'FHA 5/1 Treasury ARM' from the list and click on 'order disclosures' button.
    '4 Click 'skip plan data' button.
    '5 Click 'yes' in the pop up window.
    '6 Click ""order edisclosures"" button in the disclosures audit window.
    '7 Click Add additional docs button.
    '8 Select lOCK CONFIRMATION and click add.
    '9 Unselect all and just select Lock confirmation and click send.
    '10 Select for borrower signing option wetsign option and click send.
    '11 click ok.
    '12 Login In gmail with
         'userid : integrationborrower@gmail.com
         'password:Integration-1.
         'click on to electronic loan document request.
         'Click on 'click here to go to website' in the email.
    '13 Sign-in to loan center with the following credentials
         'Email- integrationborrower@gmail.com
         'Password - Respa15
         'Select your loan from the list in loan status page.
    '14 Click on 'upload' button.
    '15 Click on 'browse' and attach a pdf document from your local' and click on 'upload'.
'@ ExpectedResult: 
   '1 Should be able to login. 
   '2 E-folder should open.
   '3 Send E-disclosure window should open.Plan code conflict window should open.
      'A pop up window should open 'are you sure you want to apply plan code?'.
      'Disclosure Audit window opens.
   '4 select documents page should open.
   '5 A list of additional documents will be shown.
   '6 The selected documents has been added to the list based on current stacking order- message will appear.
   '7 Send edisclosure page with email message will be shown.
   '8 The disclosure package has been sent to the borrower' window will open.
   '9 Pop up window should close.
   '10 Loan center should open
   '11 1 Check loan status page should open.
      '2 Loan detail page should open.
   '12 A new pop up window should open to ' upload document.
   '13 pop up should close and in loan center 'uploaded ' should be seen with a checkmark with a lock confirmation.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2673","FHACOREFIARM Resubmittal 3-Disclose Lock Confirmation", Null

Dim objData, objDataResubmittal

Set objDataResubmittal 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_ReSubmittal")
Set objData             = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Clarklp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()

GUI_Dialog_Encompass_OKX 10, ""
BIZ_Loan_OpenByLoanNumber strLoanNumber

BIZ_AlertsAndLog_ClickOnRecord "Log","Resubmittal"
'BIZ_Loan_AcceptFiles "Resubmittal",FRM_DS_GetValue(objDataResubmittal, "NextUser")

' Open on eFolder 
BIZ_Nav_eFoler_Open()

' Send eDisclosure information 
BIZ_Documents_SendeDisclosure "E2E_FHACORefiARM", "E2E_FHACORefiARM_LockConfirmation", "E2E_FHACORefiARM_WetSign"
Wait g_LongWaitLarge + g_TinyWaitLarge + g_TinyWaitLarge + g_TinyWaitLarge

BIZ_Nav_eFoler_Close()

Set objDataResubmittal 	= Nothing
Set objData             = Nothing
