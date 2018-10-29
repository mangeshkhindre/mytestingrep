'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2048 Resubmittal 3- Disclose lock confirmation
'@ Test Automation JIRA Task: PTAC-2125 E2E_6FHAPURARM_ReSubmittal
'@ TestData:
	'1 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'2 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURARM_LockConfirmation
    '3 eFolder_Tab, SendeDisclosures, E2E_FHAPURARM
    '4 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass as Loan processor.
	'2 Click e-folder.
	'3 Click e-disclosure.
      'Select 'FHA fixed rate open term' from the list and click on 'order disclosures' button.
      'Click 'skip plan data' button.
      'Click 'yes' in the pop up window.
	'4 Click ""order edisclosures"" button in the disclosures audit window..
	'5 Click Add additional docs button.
	'6 Select lOCK CONFIRMATION and click add.
	'7 Unselect all and just select Lock confirmation and click send.
	'8 Select for borrower signing option wetsign option and click send.
	'9 click ok.
	'10 Login In gmail with
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
	'3 Send E-disclosure window should open.Plan code conflict window should open.
        'A pop up window should open 'are you sure you want to apply plan code?'.Disclosure Audit window opens.
	'4 select documents page should open.
	'5 A list of additional documents will be shown.
	'6 The selected documents has been added to the list based on current stacking order- message will appear.
	'7 Send edisclosure page with email message will be shown.
	'8 The disclosure package has been sent to the borrower' window will open.
	'9 Loan center should open
	'10 Loan detail page with esigned will be shown
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2048","Resubmittal 3- Disclose lock confirmation", Null

Dim strLoanNumber, objData

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Loan_OpenByLoanNumber strLoanNumber

BIZ_AlertsAndLog_ClickOnRecord "Log","Resubmittal"
 
'====== Open on eFolder ======
BIZ_Nav_eFoler_Open()

'====== Send eDisclosure information ======
BIZ_Documents_SendeDisclosure "E2E_FHAPURARM", "E2E_FHAPURARM", "E2E_FHAPURARM"
Wait g_LongWaitMedium 'Due To Sync Issue We Are Explicitly Passing Wait Statement

BIZ_Nav_eFoler_Close()

Set objData =  Nothing
