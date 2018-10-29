'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2265 File started 6-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_FileStarted
'@ TestData: 
   '01 Global_Data, WebSite and E2E_VANoCORefiARM_Borrower
   '02 Global_Data, WebSite and E2E_VANoCORefiARM_CoBorrower
   '03 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on e-folder.Click on e-consent.Select the checkbox next to the borrower and co-borrower and click send
   '2 Borrower should login to email account.In gmail sign-in with
 	  'userid : integrationborrower@gmail.com
  	  'password:Integration-1
   '3 In the e-consent email, click the hyperlink "Click here to visit the website"
   '4 Sign-in to loan center with the following credentials
  	  'Email- integrationborrower@gmail.com
  	  'Password - Respa15
   '5 Click on the loan from the grid.Note: The current loan should populate at the top of the grid
   '6 Click view in the electronic signature consent for loan documents
   '7 Click I Agree in the e-consent. Click done button
   '8 Repeat step 4 for co-borrower with the following credentials
	  'userid : integrationcoborrower@gmail.com
  	  'password: Coborrower1 and continue until step 10
	  '(For loan center step 6 for co-borrower use
	  'username: integrationcoborrower@gmail.com
	  'password : Respa15) and continue until step 10
'@ ExpectedResult: 
   '1 E-folder should open.Send consent window should open. E-consent should be sent to integrationborrower@gmail.com
   '2 Electronic signature consent for loan document email should be received.Encompass login page should display
   '3 It should navigate to Loan Center Home page (Check Loan Status page).Agree to receive disclosures electronically should be shown
   '4 In encompass loan center the Following message will be displayed- 
      '"Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically"
   '5 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
   '6 esign should be accepted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2265","File started 6-Sent/sign e-consent",Null

'Open on eFolder and Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_VANoCORefiARM", True, True
GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnConsent"), 240

'eConsent with Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall			'Wait is used to handle sync
BIZ_LoanCenter_LogIn "E2E_VANoCORefiARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_VANoCORefiARM","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'eConsent with Co-Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall		'Wait is used to handle sync
BIZ_LoanCenter_LogIn "E2E_FHANoCHOTRefiFix_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_VANoCORefiARM","Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
