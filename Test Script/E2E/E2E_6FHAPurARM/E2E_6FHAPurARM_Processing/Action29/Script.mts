'@**************************************************************************************************
'@ TestStory : PTAC-2010- FHAPURARM
'@ TestCase  : PTAC-1914 - Processing 6- Request Conditions
'@ Test Automation JIRA Task:  PTAC-2121 E2E_6FHAPURARM_Processing
'@ TestData: 
    '1 eFolder_Tab, SetSendRequestData, E2E_FHAPURARM
    '2 Global_Data, Website, E2E_FHAPURARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click efolder and click request button.
    '2 Click add new and select 1003 URLA and flood hazard notice and click send.
    '3 Select for borrower signing option " esign" option.
       'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code.
       'click send.
    '4 Click ok.
    '5 Click ok.
    '6 Login In gmail with
       'user id : integrationborrower@gmail.com
       'password:Integration-1.
       'click on to electronic loan document request.
    '7 Sign-in to loan center with the following credentials
       'Email- integrationborrower@gmail.com
       'Password - Respa15
    '8 Click on to e-sign and give authorization code as 1111 for borrower and click next.
    '9 Click on document and click next. click 'adopt and sign'. Click on required -sign here in all places and Click finish.
'@ ExpectedResult: 
    '1 Request window will open.
    '2 Send request opens.
    '3 An email message has been sent to originator" message will be shown in a new window.
    '4 Loan detail page with e-sign will be shown. Loan center should open.
    '5 Document should open.
    '6 In the loan center page it should show e-signed.
    '7 Click on document and click next. click 'adopt and sign'.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1914","Test Case Name: Processing 6- Request Conditions", Null

'Clicks on eFolder and Sends Request Documents
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendRequest "E2E_FHAPURARM", "E2E_FHAPURARM"

'Logs into Loan Center and Accept eSignature
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_FHAPURARM_Borrower", "E2E_FHAPURARM"

BIZ_Nav_eFoler_Close()
