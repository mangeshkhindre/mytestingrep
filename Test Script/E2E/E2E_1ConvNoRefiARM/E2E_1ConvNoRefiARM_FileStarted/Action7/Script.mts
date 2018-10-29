'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1262 CONVNOCASHREFIARM- File started 7-Sent/sign e-consent
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: 
	'1 Global_Data
	'2 Global_Data, WebSite, E2E_ConvNoRefiARM_CoBorrower
	'3 Global_Data, WebSite, E2E_ConvNoRefiARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click on e-folder.	
	'02 Click on e-consent.	
	'03 Select the checkbox next to the borrower and co-borrower and click send.	
	'04 Borrower should login to email account.
	   'In gmail signin with
	   'userid : integrationborrower@gmail.com
	   'password:Integration-1	
	'05 In the e-consent email, 
	   'click the hyperlink "Click here to visit the website".	
	'06 Sign-in to loan center with the following credentials
	   'Email- integrationborrower@gmail.com
	   'Password - Respa15	
	'07 Click on the loan from the grid.
	    'Note: The current loan should populate at the top of the grid. 	
	'08 Click view in the electronic signature consent for loan documents.	
	'09 Click I Agree in the e-consent.	
	'10 Click done button.	
	'11 Repeat step 4 for co-borrower with the following credentials
	     'userid : integrationcoborrower@gmail.com
	     'password: Coborrower1 
	    'and continue until step 10
	    '(For loan center step 6 for co-borrower use
	     'username: integrationcoborrower@gmail.com
	     'password : Respa15).
	    'and continue until step 10 
    '12 Login to Encompass as 'carollo'.click on log tab. Click on 'file started' and select the loan officer 
        'as 'carollo' by clicking the magnifying lens next to the loan officer tab.
    '13 Save the loan and exit.(If an alert pop up window opens click close in the pop up.)
'@ ExpectedResult: 
	'01 E-folder should open.
	'02 Send consent window should open.
	'03 E-consent should be sent to integrationborrower@gmail.com
	'04 Electronic signature consent for loan document email should be received.
	'05 Encompass login page should display
	'06 It should navigate to Loan Center Home page (Check Loan Status page)
	'07 It navigates to Loan Details page with "My task" and "Loan Status" tabs
	'08 Agree to receive disclosures electronically should be shown.
	'09 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. 
       'you will receive documents for this loan electronically""
	'10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents.
    '11 Carollo should be selected as laon officer.
    '12 Loan should be saved and should be able to exit Encompass.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1262","CONVNOCASHREFIARM- File started 7-Sent/sign e-consent", Null

Dim strLoanNumber

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_FileStarted")

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog"), 10)) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog").SwfButton("Swfname:=btnClose")
End If

'Navigate to Pipeline
BIZ_Nav_SelectPipelineTab()

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber

'Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_ConvNoRefiARM", True, True

GUI_Browser_CloseAllBrowsers g_DefaultBrowser
Wait g_TinyWaitSmall    'wait is used to handle sync

BIZ_LoanCenter_LogIn "E2E_ConvNoRefiARM_Borrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_ConvNoRefiARM", "Borrower"	
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
wait g_TinyWaitSmall	'wait is used to handle sync

BIZ_LoanCenter_LogIn "E2E_ConvNoRefiARM_CoBorrower"
BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_ConvNoRefiARM", "CoBorrower"	
BIZ_DisclosureTrackingWeb_Logout()
GUI_Browser_CloseAllBrowsers g_DefaultBrowser

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()	

Wait g_TinyWaitSmall    'wait is used to handle sync

BIZ_Loan_AssignUser "NextUser", "File Started", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_ConvNoRefiARM"
End If

'====== Saves the Loan Details ======
BIZ_Loan_Exit True

'====== Logout from Encompass ======
BIZ_Login_UserLogout()

