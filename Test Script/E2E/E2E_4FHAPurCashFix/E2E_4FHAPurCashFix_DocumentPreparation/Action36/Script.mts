'@**************************************************************************************************
 '@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
 '@ TestCase:  PTAC-3187 FHAPURCHASEFIX- Doc Preparation 5- Order and receive CD 
 '@ Test Automation JIRA Task: PTAC-3284 E2E_4FHAPURCASHFIX_DocumentPreparation
 '@ TestData: 
 	'1 eFolder_Tab, SendeDisclosures, E2E_FHAPURCASHFIX
	'2 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHAPURCASHFIX
	'3 eFolder_Tab, SelecteDisclosureDocs, E2E_FHAPURCASHFIX_CD
	'4 Global_Data, Website, E2E_FHAPURCASHFIX_Borrower
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
	'01 Click on e-folder.
	'02 Click on e-disclosure.
	'03 Click 'order disclosures' button.
	'04 Click "order edisclosures" button in the disclosures audit window.
	'05 Click Add additional docs button.
	'06 Select 'Closing Disclosure' and click add.
	'07 Unselect all documents and select only the 'Closing disclosure' and Click send in the select documents window.
	'08 Select for borrower signing option " esign " option.
	   'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'09 Click ok.
	'10 Click ok.
	'11 Login to gmail as borrower.click on to electronic loan document request.
	'12 Sign-in to loan center as borrower with the following credentials
	'13 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'14 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish.
 '@ ExpectedResult:
    '01 E-folder should open.
	'02 Send E-disclosure window should open.
	'03 Disclosure Audit window opens.
	'04 Select documents page should open.
	'05 A list of additional documents will be shown.
	'06 The selected documents has been added to the list based on current stacking order- message will appear.
	'07 Send edisclosure page with email message will be shown.
	'08 Window opens with the following message""Package includes one or more documents that require originators e-signature.
	'09 "An email message has been sent to originator" message will be shown in a new window.
	'10 Disclosure tracking tool is shown with(CD received date is shown).
	'11 Loan center page should open.
	'12 Loan detail page with e-sign will be shown.
	'13 Document should open.
	'14 In the loan center page it should show e-signed.
 '**************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3187","FHAPURCHASEFIX- Doc Preparation 5- Order and receive CD ", Null

Dim strLoanNumber
 BIZ_Loan_SaveLoanNumber()
 
'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHAPURCASHFIX", "E2E_FHAPURCASHFIX_CD","E2E_FHAPURCASHFIX","E2E_FHAPURCASHFIX"

BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURCASHFIX_Borrower", "E2E_FHAPURCASHFIX"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
