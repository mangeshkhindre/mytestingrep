'@**************************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC- 2151 File started 5-Sent,sign e-consent
'@ Test Automation JIRA Task: PTAC-2408 - E2E_8VAPURARM_FileStarted
'@ TestData: 
	'1 Global_Data, WebSite and E2E_VAPURARM_Borrower
	'2 Global_Data, WebSite and E2E_VAPURARM_CoBorrower
	'3 Forms_BorrowerSummaryOrigination", SetBorrower and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 Click on e-folder
   '02 Click on e-consent	
   '03 Select the checkbox next to the borrower and co-borrower and click send 
   '04 Borrower should login to email account.In gmail signin with borrower details
   '05 In the email for e-consent click onto link -click here to visit the website 
   '06 Sign-in to loan center with the borrower credentials
   '07 Click on the loan from the grid. Note: The current loan should populate at the top of the grid. 
   '08 Click view in the electronic signature consent for loan documents
   '09 Click I Agree in the e-consent 
   '10 Click done button 
   '11 Repeat step  4 for co-borrower with the following credentials
	   'and continue until step 11 
	   '(For loan center step 6 for co-borrower use
	   'and continue until step 11     
'@ ExpectedResult:
   '01 E-folder should open 
   '02 Send consent window should open 
   '03 E-consent should be sent to borrower
   '04 Electronic signature consent for loan document email should be received 
   '05 Encompass login page should display.
   '06 It should navigate to Loan Center Home page (Check Loan Status page)
   '07 It navigates to Loan Details page with "My task" and "Loan Status" tabs
   '08 Agree to receive disclosures electronically should be shown 
   '09 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. 
	   'you will receive documents for this loan electronically.
   '10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
   '11 esign should be accepted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC- 2151","File started 5-Sent/sign e-consent", Null

'Open on eFolder and Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_VAPURARM", True, True

'eConsent with Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall
BIZ_LoanCenter_LogIn "E2E_VAPURARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_VAPURARM","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent with Co-Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall
BIZ_LoanCenter_LogIn "E2E_VAPURARM_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_VAPURARM","Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
