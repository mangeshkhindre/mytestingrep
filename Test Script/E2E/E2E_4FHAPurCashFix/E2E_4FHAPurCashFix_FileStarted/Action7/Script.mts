'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3009 FHAPURCHASEFIX - File Started 4-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData: 
   '1 Global_Data, WebSite and E2E_FHAPURCASHFIX_Borrower
   '2 Global_Data, WebSite and E2E_FHAPURCASHFIX_CoBorrower
   '3 Forms_BorrowerSummaryOrigination, SetBorrower and E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '01 Login to Encompass as loan officer and go to your loan.Click on e-folder
   '02 Click on e-consent	
   '03 Select the checkbox next to the borrower and co-borrower and click send 
   '04 Borrower should login to email account.In the email for e-consent click onto link -click here to visit the website 
         'email:integrationborrower@gmail.com 
         'password:Integration-1
   '05 In the e-consent email, click the hyperlink "Click here to visit the website".     
   '06 Sign-in to loan center with the following credentials
        'Email- integrationborrower@gmail.com    
        'Password - Respa15
   '07 Click on the loan from the grid.Note: The current loan should populate at the top of the grid. 
   '08 Click view in the electronic signature consent for loan documents
   '09 Click I Agree in the e-consent 
   '10 Click done button     
'@ ExpectedResult: 
   '01 Your loan should open.E-folder should open 
   '02 Send consent window should open 
   '03 E-consent should be sent to borrower
   '04 Electronic signature consent for loan document email should be received 
   '05 Encompass loan center website should open 
   '06 Check loan status page should open with a list 
   '07 Welcome page should be visible 
   '08 Agree to receive disclosures electronically should be shown 
   '09 In encompass loan center the Following message will be displayed- 
	   '"Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically".
   '10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3009","FHAPURCHASEFIX - File Started 4-Sent/sign e-consent", Null

Dim strLoanNumber

'Navigate to Pipeline
BIZ_Nav_SelectPipelineTab()

SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtBox","index:=1").Set ""
UTIL_Win_SendKey "{ENTER}"

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

'Open on eFolder and Send e Consent for Borrower   
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_FHAPURCASHFIX", True, False

'eConsent with Brower
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall  'Due to Sync issue we are explicitly passing wait statement
BIZ_LoanCenter_LogIn "E2E_FHAPURCASHFIX_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_FHAPURCASHFIX","Borrower"	
BIZ_DisclosureTrackingWeb_Logout()

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()

