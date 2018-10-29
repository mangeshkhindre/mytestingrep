'@**************************************************************************************************
 '@ TestStory: PTAC-2445 E2E_5FHANOCHOTREFIFIX
 '@ TestCase : PTAC-2144 FHANOCHOTREFIFIX Doc Preparation 5- Order and receive CD
 '@ Test Automation JIRA Task: PTAC-2705 E2E_5FHANOCHOTREFIFIX_DocumentPreparation
 '@ TestData: 
 	'eFolder_Tab, SendeDisclosures, E2E_FHANOCHOTREFIFIX
	'eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_FHANOCHOTREFIFIX
	'eFolder_Tab, SelecteDisclosureDocs, E2E_FHANOCHOTREFIFIX_CD
	'Global_Data, Website, E2E_FHANOCHOTREFIFIX_Borrower
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
   '1 Click on e-folder
   '2 Click on e-disclosure
   '3 Select 'FHA Fixed rate open term' and Click on 'order disclosures' button.Click on 'skip import' in plan code conflict window.Click 'yes' in the message pop up
   '4 Click ""order edisclosures"" button in the disclosures audit window
   '5 Click Add additional docs button
   '6 Select 'Closing Disclosure' and click add
   '7 Unselect all documents and select only the 'Closing disclosure' and Click send in the select documents window
   '8 Select for borrower signing option " esign " option
   '9 For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.Click ok.'Click ok.
   '10 Login to gmail as borrower
   '11 click on to electronic loan document request
   '12 Sign-in to loan center as borrower with the following credentials
   '13 Click on to e-sign and give authorization code as 1111 for borrower and click next
   '14 Click on document and click next. click 'adopt and sign'
   '15 Click on required -sign here in all places and click finish
 '@ ExpectedResult:
   '1 E-folder should open
   '2 Send E-disclosure window should open
   '3 Plan code conflict window should open.A message pop up should open
   '4 Disclosure Audit window opens
   '5 Select documents page should open
   '6 A list of additional documents will be shown
   '7 The selected documents has been added to the list based on current stacking order- message will appear
   '8 Send edisclosure page with email message will be shown
   '9 Window opens with the following message""Package includes one or more documents that require originators e-signature
   '10 "An email message has been sent to originator" message will be shown in a new window
   '11 Disclosure tracking tool is shown with(CD received date is shown)
   '12 Loan center page should open
   '13 Loan detail page with e-sign will be shown
   '14 Document should open
   '15 In the loan center page it should show e-signed
 '**************************************************************************************************
 
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2144","FHANOCHOTREFIFIX Doc Preparation 5- Order and receive CD", Null

'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_FHANOCHOTREFIFIX", "E2E_FHANOCHOTREFIFIX_CD", "E2E_FHANoCHOTRefiFix", "E2E_FHANoCHOTRefiFix"

'Login to Loan Center and Accept eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_Borrower","E2E_FHANoCHOTRefiFix"

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
