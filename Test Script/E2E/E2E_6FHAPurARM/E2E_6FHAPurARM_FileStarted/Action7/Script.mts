'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-1867 File started 5-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC- 2011 E2E_6FHAPURARM_Filestarted
'@ TestData: 
   '1 Global_Data, WebSite, E2E_FHAPURARM_Borrower
   '2 Global_Data, WebSite, E2E_FHAPURARM_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click on e-folder
	'02 Click on e-consent	
	'03 Select the checkbox next to the borrower and co-borrower and click send 
	'04 In gmail signin with borrower details
	'05 In the email for e-consent click onto link -click here to visit the website 
	'06 Sign-in to loan center with the borrower credentials
	'07 Click on the loan from the grid. Note: The current loan should populate at the top of the grid. 
	'08 Click view in the electronic signature consent for loan documents
	'09 Click I Agree in the e-consent 
	'10 Click done button 
	'11 Repeat step 4 for co-borrower with the following credentials and continue until step 11
	    'For loan center step 6 for co-borrower use and continue until step 11     
'@ ExpectedResult: 
	'1 E-folder should open 
	'2 Send consent window should open 
	'3 E-consent should be sent to borrower
	'4 Electronic signature consent for loan document email should be received 
	'5 Encompass login page should display.
	'6 It should navigate to Loan Center Home page (Check Loan Status page)
	'7 It navigates to Loan Details page with "My task" and "Loan Status" tabs
	'8 Agree to receive disclosures electronically should be shown 
	'9 In encompass loan center the Following message will be displayed. Thank you for reviewing the electronic consent agreement.
	   'you will receive documents for this loan electronically.
	'10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents.
	'11 esign should be accepted.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1867","File started 5-Sent/sign e-consent", Null

'Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_FHAPURARM", True, True

Wait g_TinyWaitSmall    'wait used to handle sync
BIZ_LoanCenter_LogIn "E2E_FHAPURARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHAPURARM","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent with Co-Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall 	'wait used to handle sync
BIZ_LoanCenter_LogIn "E2E_FHAPURARM_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHAPURARM","CoBorrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall 	'wait used to handle sync

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
