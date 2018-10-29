'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-663 File started 5-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'01 Global_Data, WebSite and E2E_CONVPURARM_Borrower
	'02 Global_Data, WebSite and E2E_CONVPURARM_CoBorrower
	'03 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on e-folder
	'2 Click on e-consent	
	'3 Select the checkbox next to the borrower and co-borrower and click send 
	'4 Borrower should login to email account.In gmail signin with
       'userid : integrationborrower@gmail.com
       'password:Integration-1
	'5 In the e-consent email, click the hyperlink "Click here to visit the website". 
	'6 Sign-in to loan center with the borrower credentials
        ' Email- integrationborrower@gmail.com
        'Password - Respa15
	'7 Click on the loan from the grid.Note: The current loan should populate at the top of the grid. 
	'8 Click view in the electronic signature consent for loan documents
	'9 Click I Agree in the e-consent 
	'10 Click done button 
	'11 Repeat step 4 for co-borrower with the following credentials
        'userid : integrationcoborrower@gmail.com
        'password: Coborrower1 
        'and continue until step 10
        '(For loan center step 6 for co-borrower use
            'username: integrationcoborrower@gmail.com
            'password : Respa15).
        'and continue until step 10
 '@ ExpectedResult: 
	'1 E-folder should open 
	'2 Send consent window should open 
	'3 E-consent should be sent to borrower
	'4 Electronic signature consent for loan document email should be received 
	'5 Encompass loan center website should open 
	'6 Check loan status page should open with a list 
	'7 Welcome page should be visible 
	'8 Agree to receive disclosures electronically should be shown 
	'9 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically.
	'10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-663","File started 5-Sent/sign e-consent", Null

Dim strLoanNumber

'Navigate to Pipeline
BIZ_Nav_SelectPipelineTab()

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

'Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_CONVPURARM", true, true

'eConsent for Borrower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement
BIZ_LoanCenter_LogIn "E2E_CONVPURARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_CONVPURARM","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent for Co-Borrower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement
BIZ_LoanCenter_LogIn "E2E_CONVPURARM_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_CONVPURARM","Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
