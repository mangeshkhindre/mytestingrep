'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase:  PTAC-2972 CONVCASHOUTREFIFIX File started 5 - Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVCASHOUTREFIFIX
	'2 Global_Data,WebSite,E2E_CONVCASHOUTREFIFIX_CoBorrower
	'3 Global_Data,WebSite,E2E_CONVCASHOUTREFIFIX_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass as loan officer and go to your loan.Click on e-folder.
	'2 Click on e-consent.	
	'3 Select the checkbox next to the borrower and co-borrower and click send.	
	'4 Borrower should login to email account.
	   'In gmail signin with
	   'email:integrationborrower@gmail.com  
	   'password:Respa15	
	'5 In the e-consent email,click the hyperlink "Click here to visit the website".	
	'6 Sign-in to loan center with the following credentials
  	   'Email- integrationcoborrower@gmail.com    
	   'Password - Respa15	
	'7 Click on the loan from the grid.
	   'Note: The current loan should populate at the top of the grid. 	
	'8 Click view in the electronic signature consent for loan documents.	
	'9 Click I Agree in the e-consent.	
	'10 Click done button.	
	'11 Repeat step 4 for co-borrower with the following credentials
	    'email:  and continue until step 10
        'For loan center step 6 for co-borrower use and
        'email:integrationcoborrower@gmail.com  
	    'password:Respa15 
	    'continue until step 10
	'12 Login to Encompass as 'carollo'.
	   'click on log tab. Click on 'file started' and select the loan officer as 'carollo' by clicking the magnifying lens next to the loan officer tab.
	'13 Save the loan and exit.(If an alert pop up window opens click close in the pop up.)
'@ ExpectedResult: 
	'1 Your loan should open.E-folder should open.
	'2 Send consent window should open.
	'3 E-consent should be sent to integrationborrower@gmail.com and integrationcoborrower@gmail.com
	'4 It should navigate to Loan Center Home page (Check Loan Status page)
	'5 It navigates to Loan Details page with "My task" and "Loan Status" tabs
	'6 Agree to receive disclosures electronically should be shown.
	'9 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically.
	'10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents.
	'11 Carollo should be selected as loan officer.
	'12 Loan should be saved and should be able to exit Encompass.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2972","CONVCASHOUTREFIFIX File started 5 - Sent/sign e-consent", Null

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog"), 10)) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog").SwfButton("Swfname:=btnClose")
End If

'Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_CONVCASHOUTREFIFIX", True, True
GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnConsent"), 240

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()	
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall    'wait is used to handle sync

BIZ_LoanCenter_LogIn "E2E_CONVCASHOUTREFIFIX_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_CONVCASHOUTREFFIX","Borrower"	
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall	'wait is used to handle sync

BIZ_LoanCenter_LogIn "E2E_CONVCASHOUTREFIFIX_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_CONVCASHOUTREFFIX","Borrower"	
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall	'wait is used to handle sync

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_CONVCASHOUTREFIFIX"
End If

'====== Saves the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()
