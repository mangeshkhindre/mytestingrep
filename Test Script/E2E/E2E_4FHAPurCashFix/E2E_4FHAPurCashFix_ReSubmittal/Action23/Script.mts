'***************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase	: PTAC-3178 FHAPURCHASEFIX- Resubmittal 3- Disclose lock confirmation
'@ Test Automation JIRA Task: PTAC-3156  E2E_4FHAPURCASHFIX_ReSubmittal
'@ TestData: 
   '1 Global, Login and E2E_markuslp
   '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, Milestone and E2E_FHAPURCASHFIX_Processing
   '4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURCASHFIX
   '5 eFolder_Tab, SelecteDisclosureDocs and E2E_FHAPURCASHFIX_LockConfirmation
   '6 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
'@ Pre-conditions: N/A
'@ Description	 : N/A 
'@ TestSteps : 
   '01 Login to Encompass as Loan processor.
   '02 Click e-folder.
   '03 Click e-disclosures button. Select 'FHA FixedRate open Term
   '04 Click "order edisclosures" button in the disclosures audit window..
   '05  Click Add additional docs button.
   '06  Select lOCK CONFIRMATION and click add.
   '07  Unselect all and just select Lock confirmation and click send.
   '08  Select for borrower signing option wetsign option and click send.
   '09 click ok.
   '10 Login In gmail with the following credentials
        'userid : integrationborrower@gmail.com
        'password:Integration-1.
        'click on to electronic loan document request.
        'Click on 'click here to go to website' in the email.
   '11 Sign-in to loan center with the following credentials
        'Email- integrationborrower@gmail.com
        'Password - Respa15
'@ ExpectedResult: 
   '1 Should be able to login.	
   '2 E-folder should open.
   '3 Send E-disclosure window should open.Disclosure Audit window opens.Plan code conflict window should open.
       'A pop up window should open 'are you sure you want to apply plan code?'.
   '4 select documents page should open.
   '5 A list of additional documents will be shown.
   '6 The selected documents has been added to the list based on current stacking order- message will appear.
   '7 Send edisclosure page with email message will be shown.
   '8 'The disclosure package has been sent to the borrower' window will open.
   '9 Pop up window should close.
   '8 Loan center should open
   '9 Loan detail page with wetsign will be shown
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3178","FHAPURCHASEFIX- Resubmittal 3- Disclose lock confirmation", Null

Dim objData, strLoanNumber

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber

' Open on eFolder 
BIZ_Nav_eFoler_Open()

' Send eDisclosure information 
BIZ_Documents_SendeDisclosure "E2E_FHAPURCASHFIX", "E2E_FHAPURCASHFIX_LockConfirmation", "E2E_FHAPURCASHFIX_WetSign"

BIZ_Nav_eFoler_Close()

Set objData  = Nothing