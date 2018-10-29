'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3082 FHAPURCHASEFIX - Qualification 3 - edisclosures
'@ Test Automation JIRA Task: PTAC-3151 E2E_4FHAPURCASHFIX_Qualification
'@ TestData: 
	'1 Services, Underwriting and E2E_FHAPURCASHFIX
	'2 eFolder_Tab, SendeDisclosures and E2E_FHAPURCASHFIX
	'3 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_FHAPURCASHFIX
	'4 eFolder_Tab, SelecteDisclosureDocs and E2E_FHAPURCASHFIX
	'5 Global_Data, Website and E2E_FHAPURCASHFIX_Borrower
	'6 Global_Data, Website and E2E_FHAPURCASHFIX_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click e-folder 
	'2 Click e-disclosure 
	'3 Select a plan code-  FHA Fixed rate open Term and click 'order disclosures' button
	'4 Click on the fields and clear any audits which are in red color (Ignore others which are black)  click refresh audit button 
	'5 Click "order edisclosures" button in the disclosures audit window  
	'6 Click Add additional docs button 
	'7 Select Loan Estimate and click add 
	'8 Un-Check if all documents are selected and Click send only loan estimate 
	'9 Select for borrower signing option " esign + wetsign" option ' For borrower authentication method select Authorization code from the dropdown and 
	   'give 1111 as borrower authorization and co-borrower authorization code. click send.
	'10 Click ok 
	'11 Click ok 
	'12 Sign-in to loan center with the URL as per test data and the following credentials
		'Email- integrationborrower@gmail.com
		'Password - Respa15
	'13 Click on to e-sign and give authorisation code as 1111 for borrower and click next 
	'14 Click on document and click next. click 'adopt and sign'  click on required -sign here in all places and click finish 
'@ ExpectedResult: 
	'1 E-folder should open 
	'2 Send E-disclosure window should open 
	'3 Disclosure Audit window opens 
	'4 Window should refresh.
	'5 Select documents page should open 
	'6 A list of additional documents will be shown 
	'7 The selected documents has been added to the list based on current stacking order- message will appear 
	'8 Send edisclosure page with email message will be shown 
	'9 Window opens with the following message""Package includes one or more documents that require originators e-signature 
	'10 "An email message has been sent to originator" message will be shown in a new window 
	'11 Disclosure tracking tool is shown with(LE recieved date is shown) 
	'12 Loan detail page with e-sign will be shown for borrower.
	'13 Document should open 
	'14 In the loan center page it should show e-signed 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3082","FHAPURCHASEFIX - Qualification 3 - edisclosures", Null

'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHAPURCASHFIX", "E2E_FHAPURCASHFIX","E2E_FHAPURCASHFIX","E2E_FHAPURCASHFIX"

'Login to Loan Center as Borrower and accept eSign Document 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURCASHFIX_Borrower", "E2E_FHAPURCASHFIX"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

