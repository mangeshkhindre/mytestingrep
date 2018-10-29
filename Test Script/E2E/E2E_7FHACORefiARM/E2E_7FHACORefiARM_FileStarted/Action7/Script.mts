'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2392 FHACOREFIARM File started 7-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   'Global_Data, WebSite, E2E_FHACORefiARM_Borrower
   'Global_Data, WebSite, E2E_FHACORefiARM_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 Login to Encompass as loan officer and go to your loan. Click on e-folder
   '02 Click on e-consent	
   '03 Select the checkbox next to the borrower and co-borrower and click send 
   '04 Borrower should login to email account.In gmail signin with
	   'userid : integrationborrower@gmail.com
  	   'password:Integration-1
   '05 In the e-consent email, click the hyperlink "Click here to visit the website
   '06 Sign-in to loan center with the following credentials
 	   'email : integrationborrower@gmail.com
  	   'password:Integration-1
   '07 Click on the loan from the grid.Note: The current loan should populate at the top of the grid
   '08 Click view in the electronic signature consent for loan documents.
   '09 Click I Agree in the e-consent 
   '10 Click done button 
   '11 Repeat step 4 for co-borrower with the following credentials
	   'userid :  integrationcoborrower@gmail.com password:and continue until step 10(For loan center step 6 for co-borrower use
	   'username: ellierockxco@gmail.com
	   'password : password).and continue until step 10 
   '12 Login to Encompass as Loan officer.Click on 'log' tab
   '13 click on 'file started milestone'.Select loan officer as 'clarklo'   
'@ ExpectedResult: 
   '1 Your loan should open. E-folder should open 
   '2 Send consent window should open 
   '3 E-consent should be sent to integrationborrower@gmail.com
   '4 Electronic signature consent for loan document email should be received 
   '5 Encompass loan center page should display
   '6 It should navigate to Loan Center page (Check Loan Status page)
   '7 It navigates to Loan Details page with "My task" and "Loan Status" tabs
   '8 Agree to receive disclosures electronically should be shown
   '9 In encompass loan center the Following message will be displayed-Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically.
   '10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
   '11 Same results as before.
   '12 Should be able to Login. Log tab should open. File started milestone worksheet should open. Clarklo should be selected as laon officer.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2392","FHACOREFIARM File started 7-Sent/sign e-consent", Null

Dim strLoanNumber

'Navigate to Pipeline
BIZ_Nav_SelectPipelineTab()

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

'Open on eFolder and Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_FHACORefiARM", True, True

'eConsent with Borrower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall   'Due to Sync issue we are explicitly passing wait statement
BIZ_LoanCenter_LogIn "E2E_FHACORefiARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHACORefiARM","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent with Co-Borrower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement
BIZ_LoanCenter_LogIn "E2E_FHACORefiARM_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHACORefiARM","Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
