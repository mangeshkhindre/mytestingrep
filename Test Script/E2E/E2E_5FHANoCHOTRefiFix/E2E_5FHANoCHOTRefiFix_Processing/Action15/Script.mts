'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1827 FHANOCHOTREFIFIX Processing 6-Request conditions
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
	'1 eFolder_Tab, SetSendRequestData, E2E_FHANoCHOTRefiFix
	'2 Global_Data, Website, E2E_FHANoCHOTRefiFix_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '01 Click efolder and click request button
    '02 Click add new and select 1003 URLA and flood hazard notice and click send
    '03 Select for borrower signing option " esign" option
    '04 For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization 
         'and co-borrower authorization code. click send.Click ok.Click ok.
    '05 Login In gmail with
        'user id : integrationborrower@gmail.com
	    'password:Integration-1.
    '06 click on to electronic loan document request
    '07 Sign-in to loan center with the following credentials
	    'Email- integrationborrower@gmail.com
	    'Password - Respa15
    '08 Click on to e-sign and give authorization code as 1111 for borrower and click next
    '09 Click on document and click next. click 'adopt and sign'
    '10 Click on required -sign here in all places and Click finish
'@ ExpectedResult: 
    '1 Request window will open
    '2 Send request opens
    '3 An email message has been sent to originator" message will be shown in a new window
    '4 Loan detail page with e-sign will be shown
    '5 Loan center should open
    '6 Document should open
    '7 In the loan center page it should show e-signed
    '8 Click on document and click next. click 'adopt and sign'
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1827","FHANOCHOTREFIFIX Processing 6-Request conditions", Null

'Clicks on eFolder and Sends Document Request 
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_FHANoCHOTRefiFix", "E2E_FHANoCHOTRefiFix"

'Logs in to Loan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHANoCHOTRefiFix_Borrower", "E2E_FHANoCHOTRefiFix"

BIZ_Nav_eFoler_Close()
