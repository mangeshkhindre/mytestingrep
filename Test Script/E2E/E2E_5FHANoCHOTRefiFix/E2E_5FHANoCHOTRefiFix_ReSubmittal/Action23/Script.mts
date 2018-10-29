'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1996 FHANOCHOTREFIFIX Resubmittal 3- Disclose lock confirmation
'@ Test Automation JIRA Task: PTAC-2704 E2E_5FHANoCHOTRefiFix_ReSubmittal
'@ TestData: 
   '1 Global, Login, E2E_markuslp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
   '3 Loans, Milestone, E2E_FHANoCHOTRefiFix_Processing
   '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHANoCHOTRefiFix
   '5 eFolder_Tab, SelecteDisclosureDocs, E2E_FHANoCHOTRefiFix
   '6 eFolder_Tab, SendeDisclosures, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login to Encompass as Loan processor.
    '2 Click e-folder.
    '3 Click e-disclosure.Select 'FHA fixed rate open term' from the list and click on 'order disclosures' button.
       'Click 'skip plan data' button.Click 'yes' in the pop up window.
    '4 Click ""order edisclosures"" button in the disclosures audit window..
    '5 Click Add additional docs button.
    '6 Select lOCK confirmation'  and click add.
    '7 Unselect all and just select Lock confirmation and click send.
    '8 Select for borrower signing option wetsign option and click send.
    '9  click ok.
    '10 Login In gmail with
         'userid : integrationborrower@gmail.com
         'password:Integration-1.
        'click on to electronic loan document request.
        'Click on 'click here to go to website' in the email.
    '11 Sign-in to loan center with the following credentials
          'Email- integrationborrower@gmail.com
          'Password - Respa15
         'Select your loan from the list in loan status page.
    '12 Click on 'upload' button .
    '13 Click on 'browse' and attach a pdf document from your local' and click on 'upload'.
'@  ExpectedResult: 
   '1 Should be able to login.
   '2 E-folder should open.
   '3 Send E-disclosure window should open.Plan code conflict window should open.
      'A pop up window should open 'are you sure you want to apply plan code?'.Disclosure Audit window opens.
   '4 select documents page should open.
   '5 A list of additional documents will be shown.
   '6 The selected documents has been added to the list based on current stacking order- message will appear.
   '7 Send edisclosure page with email message will be shown.
   '8 The disclosure package has been sent to the borrower' window will open.
   '9 Pop up window should close.
   '10 Loan center should open
   '11 Check loan status page should open.Loan detail page should open.
   '12 A new pop up window should open to ' upload document.
   '13 pop up should close and in loan center 'uploaded ' should be seen with a checkmark with a lock confirmation.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1996","FHANOCHOTREFIFIX Resubmittal 3- Disclose lock confirmation", Null

Dim strLoanNumber, objDataResubmittal, objData

Set objDataResubmittal 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_ReSubmittal")
Set objData             = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

BIZ_RegZ_LE_SetInterestOnlyInformation "E2E_FHANoCHOTRefiFix"

' Open on eFolder 
BIZ_Nav_eFoler_Open()

' Send eDisclosure information 
BIZ_Documents_SendeDisclosure "E2E_FHANOCHOTREFIFIX", "E2E_FHANOCHOTREFIFIX_LockConfirmation", "E2E_FHANoCHOTRefiFix"

BIZ_Nav_eFoler_Close()

Set objDataResubmittal 	= Nothing
Set objData             = Nothing
