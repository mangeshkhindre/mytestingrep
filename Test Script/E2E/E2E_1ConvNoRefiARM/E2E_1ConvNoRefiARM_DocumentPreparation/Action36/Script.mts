'@**************************************************************************************************
 '@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
 '@ TestCase : PTAC-1412 CONVNOCASHREFIARM - Doc Preparation 5 - Order and receive CD     
 '@ Test Automation JIRA Task: PTAC-1836 E2E_1ConvNoRefiARM_DocumentPreparation
 '@ TestData: 
 	'1 eFolder_Tab, SendeDisclosures and E2E_ConvNoRefiARM
	'2 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_ConvNoRefiARM
	'3 eFolder_Tab, SelecteDisclosureDocs and E2E_ConvNoRefiARM_CD
	'4 Global_Data, Website and E2E_ConvNoRefiARM_Borrower
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '01 Go to closing disclosure page-1.Under closing information enter closing date
    '02 Click on e-folder
    '03 Click on e-disclosure
    '04 Select 5/1 Libor ARM(WSJ) and Click on order disclosures button
    '05 Click order edisclosures button in the disclosures audit window 
    '06 Click Add additional docs button
    '07 Select 'Closing Disclosure' and click add
    '08 Unselect all documents and select only the 'Closing disclosure' and Click send in the select documents window
    '09 Select for borrower signing option " esign " option.
        'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send
    '10 Login to gmail as borrower.Click on to electronic loan document request
    '11 Sign-in to loan center as borrower with the following credentials
    '12 Click on to e-sign and give authorization code as 1111 for borrower and click next
    '13 Click on document and click next. click adopt and sign.Click on required -sign here in all places and click finish
 '@ ExpectedResult:
    '01 CD page -1 should open and should be able to enter closing date
    '02 E-folder should open
    '03 Send E-disclosure window should open
    '04 Disclosure Audit window opens
    '05 Select documents page should open
    '06 A list of additional documents will be shown
    '07 The selected documents has been added to the list based on current stacking order- message will appear
    '08 Send edisclosure page with email message will be shown
    '09 Window opens with the following message""Package includes one or more documents that require originators e-signature
    '10 "An email message has been sent to originator" message will be shown in a new window
    '11 Disclosure tracking tool is shown with(CD received date is shown)
    '12 Loan center page should open
    '13 Loan detail page with e-sign will be shown
    '14 Document should open
    '15 In the loan center page it should show e-signed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1412","CONVNOCASHREFIARM - Doc Preparation 4 - Order and receive CD", Null

Dim strLoanNumber
''Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM_CD", "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM"

'Login to Loan Center and Accept eSign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_ConvNoRefiARM_Borrower", "E2E_ConvNoRefiARM"

BIZ_Nav_eFoler_Close()
