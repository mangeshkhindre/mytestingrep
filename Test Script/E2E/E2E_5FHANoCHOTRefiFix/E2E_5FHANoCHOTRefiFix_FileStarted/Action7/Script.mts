'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1518 FHANOCHOTREFIFIX File started 7 Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData:
	'1 Global_Data, WebSite and E2E_FHANoCHOTRefiFix_Borrower
	'2 Global_Data, WebSite and E2E_FHANoCHOTRefiFix_CoBorrower
	'3 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_FHANoCHOTRefiFix_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '01 Click on e-folder
    '02 Click on e-consent	
    '03 Select the checkbox next to the borrower and co-borrower and click send 
    '04 Borrower should login to email account.In gmail signin with
	   'userid : integrationborrower@gmail.com
 	   'password: Integration-1
    '05 In the e-consent email, click the hyperlink "Click here to visit the website".
       '(For Prolifics environment use the following link only if does not take you to the website.
	   'https://mortgage411.mortgage-application.net/myaccount/accountlogin.aspx?tgt=prod&uid=ecdfc692-923a-45e8-97d5-052a0888fe8a ) 
    '06 Sign-in to loan center with the following credentials
 	   'Email- integrationborrower@gmail.com
  	   'Password - Respa15
    '07 Click on the loan from the grid.Note: The current loan should populate at the top of the grid
    '08 Click view in the electronic signature consent for loan documents
    '09 Click I Agree in the e-consent
    '10 Click done button 
    '11 Repeat step  4 for co-borrower with the following credentials
	    'userid : integrationcoborrower@gmail.com
        'password: Coborrower1 
        'continue until step 10
        '(For loan center step 6 for co-borrower use
  	    'username: integrationcoborrower@gmail.com
	    'password : Respa15) and continue until step 10 
    '12 Login to Encompass as Loan officer.
        'Click on 'log' tab.
        'click on 'file started milestone'.
        'Select loan officer as 'clarklo'.    
'@ ExpectedResult: 
    '01 E-folder should open 
    '02 Send consent window should open 
    '03 E-consent should be sent to integrationborrower@gmail.com
    '04 Electronic signature consent for loan document email should be received 
    '05 Encompass login page should display 
    '06 It should navigate to Loan Center page (Check Loan Status page)
    '07 It navigates to Loan Details page with "My task" and "Loan Status" tabs
    '08 Agree to receive disclosures electronically should be shown 
    '09 In encompass loan center the Following message will be displayed-
        '" Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically""
    '10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic
        'signature consent for loan documents Same results as before
    '11 Same results as before.
    '12 Should be able to Login.Log tab should open.File started milestone worksheet should open.
        'Clarklo should be selected as laon officer
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1518","FHANOCHOTREFIFIX File started 7 Sent/sign e-consent", Null

Dim strLoanNumber

'Navigate to Pipeline
BIZ_Nav_SelectPipelineTab()

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

'Open on eFolder and Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_FHANoCHOTRefiFix", True, True

'eConsent with Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall			'Wait is used to handle sync
BIZ_LoanCenter_LogIn "E2E_FHANoCHOTRefiFix_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHANoCHOTRefiFix","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent with Co-Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall		'Wait is used to handle sync

BIZ_LoanCenter_LogIn "E2E_FHANoCHOTRefiFix_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHANoCHOTRefiFix","Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall		'Wait is used to handle sync

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
