'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix	
'@ TestCase : PTAC-1948 FHANOCHOTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE
'@ Test Automation JIRA Task: PTAC-2702 E2E_5FHANoCHOTRefiFix_Submittal 
'@ TestData: 
	'1 Loans, Milestone and E2E_FHANoCHOTRefiFix_Submittal
	'2 Forms_2015Itemization, SetBasicData and E2E_FHANoCHOTRefiFix
	'3 Forms_LoanEstimatePage, SetReasons and E2E_FHANoCHOTRefiFix
	'4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHANoCHOTRefiFix
	'5 eFolder_Tab, SendeDisclosures and E2E_FHANoCHOTRefiFix
	'6 Global_Data, Website and E2E_FHANoCHOTRefiFix
	'7 eFolder_Tab, SendeDisclosures and E2E_FHANoCHOTRefiFix
	'8 Loans, MilestoneDocument and E2E_FHANoCHOTRefiFix_Submittal
'@ Pre-conditions: 
'@ Description: 
'@ TestSteps:
	'1 Click on 'Forms' and click on '2015 Itemization'.Change Appraisal Fee to 600.
	'2 Go to LE page 1 and do the following:
	   'Check the checkbox for 'Revisions requested by consumer'.
	   'Click check box for changed circumstance.
	   'Select magnifying lens next to the changed circumstances and select ' change in loan amount'. 
	'3 Click e-folder.
	'4 Click e-disclosure.
	'5 Select a plan code- Generic FHA fixed rate open term and click 'order disclosures' button.
	'6 Click ""order edisclosures"" button in the disclosures audit window.
	'7 Select Loan Estimate and click send.
	   'Click 'ok' in the pop up message.
	'8 Check the checkboxes for borrower and co borrower. 
	   'Select for borrower signing option " esign" option. For borrower authentication method select Authorization code from 
       'the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	   'Click 'yes' in the pop up.
	'9 Click 'Next' button and sign in all places and click 'Finish' button.
	'10 Click ok.
	'11 Sign-in to loan center with the following credentials
       'Email- integrationborrower@gmail.com
       'Password - Respa15
	'12 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'13 Click on document and click next. click 'adopt and sign'.
	   'Click on required -sign here in all places and click finish.
	'14 Under log tab click on 'submittal'.
	   'Click magnifying lens next to underwriter. Select 'markusuw' and click ok.
'@ ExpectedResult:
   '1 2015 Itemization should open. Appraisal Fee should change
   '2 LE page should open and should be able to select all check boxes 
   '3 E-folder should open 
   '4 Send E-disclosure window should open
   '5 Disclosure Audit window opens 
   '6 An error message should open  'Select documents' page should open 
   '7 Send edisclosure page with email message will be shown 
   '8 Window opens with the following message " The package includes one or more documents that you must esign before you can retrieve the borrower signed documents"  Esign document will open 
   '9 The disclosure package has been sent to borrower window will open 
   '10 Disclosure tracking tool page opens  ( LE received date is shown) 
   '11 Loan detail page with e-sign will be shown 
   '12 Document should open 
   '13 In the loan center page it should show e-signed 
   '14 Submittal worksheet will open 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1948","FHANOCHOTREFIFIX Submittal 2 - Appraisal Fee increase and redisclosing LE", Null

Dim strLoanNumber,objDataProcessing
BIZ_2015Itemization_SetE2EBasicData "E2E_FHANOCHOTREFIFIX"
BIZ_LoanEstimatePage1_SetReason "E2E_FHANOCHOTREFIFIX"

'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHANOCHOTREFIFIX", "E2E_FHANOCHOTREFIFIX_LE", "E2E_FHANoCHOTRefiFix", "E2E_FHANoCHOTRefiFix"

'Login to Loan Center as Borrower and accept eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_Borrower", "E2E_FHANoCHOTRefiFix"

'Login to Loan Center as Co-Borrower and accept eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_CoBorrower", "E2E_FHANoCHOTRefiFix"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"

Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_Submittal")

BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_FHANoCHOTRefiFix_Submittal"
BIZ_Loan_FinishMilestone_AssignUser "Submittal", FRM_DS_GetValue(objDataProcessing, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Submitted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS5Complete_FHANoCHOTRefiFix"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objDataProcessing = Nothing
