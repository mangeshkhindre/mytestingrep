'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX 
'@ TestCase:  PTAC-3209 CONVCASHOUTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-3375 E2E_3CONVCASHOUTREFIFIX_Submittal
'@ TestData: 
	'1 Loans, Milestone and E2E_CONVCASHOUTREFIFIX_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_CONVCASHOUTREFIFIX
	'3 Forms_LoanEstimatePage, SetReasons and E2E_CONVCASHOUTREFIFIX
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_CONVCASHOUTREFIFIX
	'5 eFolder_Tab, SendeDisclosures and E2E_CONVCASHOUTREFIFIX
	'6 Global_Data, Website and E2E_CONVCASHOUTREFIFIX
	'7 eFolder_Tab, SendeDisclosures and E2E_CONVCASHOUTREFIFIX
	'8 Loans, MilestoneDocument and E2E_CONVCASHOUTREFIFIX_Submittal
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 Click on Forms and click on 2015 Itemization.Change Appraisal Fee to 600
   '02 Go to LE page 1 and do the following:
       'Check the checkbox for 'Revisions requested by consumer'
       'Click check box for changed circumstance
       'Select magnifying lens next to the changed circumstances and select ' change in loan amount'
   '03 Click e-folder
   '04 Click e-disclosure
   '05 Select a plan code-  'All fixed rate conventional 1st lien loans' and click 'order disclosures' button.
   '06 Click ""order edisclosures"" button in the disclosures audit window
   '07 Select Loan Estimate and click send.Click 'ok' in the pop up message
   '08 Check the checkboxes for borrower and co borrower
       'Select for borrower signing option " esign" option. 
       'For borrower authentication method select Authorization code from the dropdown and 
       'give 1111 as borrower authorization and co-borrower authorization code. click send.
       'Click 'yes' in the pop up.
   '09 Click 'Next' button and sign in all places and click 'Finish' button
   '10 Click ok
   '11 Login to Gmail as borrower.click on to electronic loan document request
   '12 Sign-in to loan center with the following credentials
        'Email- integrationborrower@gmail.com
        'Password - Respa15 
   '13 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '14 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
   '15 Under log tab click on 'submittal'.Click magnifying lens next to underwriter. Select 'markusuw' and click ok
'@ ExpectedResult:
   '01 2015 Itemization should open.Appraisal Fee should change
   '02 LE page should open and should be able to select all check boxes
   '03 E-folder should open
   '04 Send E-disclosure window should open
   '05 Disclosure Audit window opens
   '06 'Select documents' page should open
   '07 Send edisclosure page with email message will be shown
   '08 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve 
       'the borrower signed documents".Esign document will open
   '09 The disclosure package has been sent to borrower window will open
   '10 Disclosure tracking tool page opens
   '11 Loan center page should open
   '12 Loan detail page with e-sign will be shown
   '13 Document should open
   '14 In the loan center page it should show e-signed.
   '15 Submittal worksheet will open.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3209","CONVCASHOUTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim strLoanNumber,objData

BIZ_2015Itemization_SetE2EBasicData "E2E_CONVCASHOUTREFIFIX"
BIZ_LoanEstimatePage1_SetReason "E2E_CONVCASHOUTREFIFIX"

'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_CONVCASHOUTREFIFIX", "E2E_CONVCASHOUTREFIFIX_LE", "E2E_CONVCASHOUTREFIFIX", "E2E_CONVCASHOUTREFIFIX"

GUI_Browser_CloseAllBrowsers g_DefaultBrowser

'Login to Locan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVCASHOUTREFIFIX_Borrower", "E2E_CONVCASHOUTREFIFIX"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Submittal")

BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_CONVCASHOUTREFIFIX_Submittal"

'Go to Qualification, AssignUser & check Finish check box ON
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objData, "NextUser")

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_CONVCASHOUTREFIFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData =  Nothing
