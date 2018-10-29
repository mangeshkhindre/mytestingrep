'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase:  PTAC-1520 FHANOCHOTREFIFIX - Qualification 3 - edisclosures	
'@ Test Automation JIRA Task: PTAC-2447 E2E_5FHANoCHOTRefiFix_Qualification
'@ TestData: 
   '1 Services, Underwriting and E2E_FHANoCHOTRefiFix
   '2 eFolder_Tab, SendeDisclosures and E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click e-folder 
	'02 Click e-disclosure 
	'03 Select a plan code-  Generic 5/1 Treasury ARM and click 'order disclosures' button .
       'Click 'import plan data' button in the plan code conflict window pop up.
       'Click yes in the message pop up window.
	'04 Click on the fields and clear any audits which are in red color (Ignore others which are black)  click refresh audit button 
	'05 Click ""order edisclosures"" button in the disclosures audit window  
	'06 Click Add additional docs button 
	'07 Select Loan Estimate and click add 
	'08 Check if all documents are selected and Click send in the select documents window 
	'09 Select for borrower signing option "" esign + wetsign"" option ' For borrower authentication method select Authorization code 
       'from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
       ' Click 'yes' in the pop up.
	'10 Click 'Next' button and sign in all places and click 'Finish' button. 
	'11 Click ok 
	'12 Login In gmail with click on to electronic loan document request 
	'13 Open loan center and Sign-in to loan center with the following credentials
        'Email- integrationborrower@gmail.com
        'Password - Respa15
	'14 Click on to e-sign and give authorization code as 1111 for borrower and click next. 
	'15 Click on document and click next. click 'adopt and sign'  click on required -sign here in all places and click finish 
	'16 In the loan center page under print sign and upload documents,Click upload add any 2pdf documents 
	'17 In Encompass in disclosure tracking  click on the line item under disclosure history and check on "Intent to proceed" and click 'ok' 
'@ ExpectedResult: 
	'01 E-folder should open 
	'02 Send E-disclosure window should open 
	'03 Plan code conflict pop up opens.Encompass pop up opens with the following message"Are you sure you want to overwrite the plan data?".
        'Disclosure Audit window opens 
	'04 Window should refresh. 
	'05 Select documents page should open 
	'06 A list of additional documents will be shown 
	'07 The selected documents has been added to the list based on current stacking order- message will appear 
	'08 Send edisclosure page with email message will be shown 
	'09 Window opens with the following message""Package includes one or more documents that require originators e-signature 
	'10 "An email message has been sent to originator" message will be shown in a new window 
	'11 Disclosure tracking tool is shown with(LE recieved date is shown) 
	'12 Loan center should open 
	'13 Loan detail page with e-sign will be shown 
	'14 Document should open 
	'15 In the loan center page it should show e-signed 
	'16 Uploaded with a green tick mark will be shown in lan center page 
	'17 Disclosure details window will open 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1520","FHANOCHOTREFIFIX - Qualification 3 - edisclosures", Null
'====== Open the eFolder Screen and Send eDisclosure information======
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHANOCHOTREFIFIX", "E2E_FHANOCHOTREFIFIX", "E2E_FHANoCHOTRefiFix", "E2E_FHANoCHOTRefiFix"

'Login to Loan Center as Borrower and Accept eSign document 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_Borrower", "E2E_FHANoCHOTRefiFix"

'Login to Loan Center as CoBorrower and Accept eSign document 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_CoBorrower", "E2E_FHANoCHOTRefiFix"

'====== Close the eFolder Window ======
BIZ_Nav_eFoler_Close()
