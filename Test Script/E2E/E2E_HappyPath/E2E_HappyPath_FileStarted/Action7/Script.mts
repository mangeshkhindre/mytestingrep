'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1090 HP File started 5-Sent e-Consent/sign e-consent
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: Global_Data, WebSite, E2E_HappyPath
'@ Pre-conditions: New Loan Number is generated
'@ Description:  
'@ TestSteps:
	'01 Click on e-folder
	'02 Click on e-consent	
	'03 Select the checkbox next to the borrower and co-borrower and click send 
	'04 Borrower should login to email account.
        'In gmail signin with
        'userid : integrationborrower@gmail.com
        'password:Integration-1
	'05 In the e-consent email, click the hyperlink "Click here to visit the website".
        'Sign-in to loan center with the following credentials
        'Email- integrationborrower@gmail.com
        'Password - Respa15
	'06 Click on the loan from the grid.Note: The current loan should populate at the top of the grid. 
	'07 Click view in the electronic signature consent for loan documents
	'08 Click I Agree in the e-consent 
	'09 Click done button 
	'10 Repeat step  4 for co-borrower with the following credentials
	    'and continue until step 10 
	    '(For loan center step 6 for co-borrower use
	    'and continue until step 10     
'@ ExpectedResult: 
	'01 E-folder should open 
	'02 Send consent window should open 
	'03 E-consent should be sent to borrower
	'04 Electronic signature consent for loan document email should be received 
	'05 Encompass loan center website should open 
	'06 Check loan status page should open with a list 
	'07 Welcome page should be visible 
	'08 Agree to receive disclosures electronically should be shown 
	'09 In encompass loan center the Following message will be displayed- "" Thank you for reviewing the electronic consent agreement. you will receive documents for this loan electronically.
	'10 Will go back to loan center and consent accepted with a checkmark next to it can be seen under electronic signature consent for loan documents
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1090","HP File started 5-Sent e-Consent/sign e-consent", Null

BIZ_Nav_SelectLoanTab()

'Open on eFolder and Send e Consent for Borrower and Co-Borrower  
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeConsent "E2E_HappyPath", true, false

GUI_Object_WaitTillExistX SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnConsent"), 240

'Code to write the loan center
FRM_Logger_ReportInfoEvent "Log In Loan Center", "User Log In Loan Center", Null
Set objData = FRM_DS_GetTestData("Global_Data", "Website", "E2E_HappyPath_Borrower")
strURL = FRM_DS_GetValue(objData, "URL")

GUI_Browser_OpenUrl strURL,"IE"
wait  g_LongWaitLarge
Set objWebPage = Browser("name:=.*Loan Center.*", "application version:=internet explorer.*","openurl:=.*mortgage-application.*","CreationTime:=0").Page("title:=.*", "index:=0")
	
	If Window("regexpwndclass:=Alternate Modal Top Most").Dialog("regexpwndtitle:=Windows Security").Exist(3) Then
	
	FRM_Logger_ReportFailEvent "Login to Loan Center", "Security pop enabled , please login to your IE with EM credentials ", Null
	
	End If
	
	If objWebPage.WebEdit("name:=.*textboxEmail.*").Exist(100) Then
	   objWebPage.WebEdit("name:=.*textboxEmail.*").Set FRM_DS_GetValue(objData, "EmailAccount")
	   objWebPage.WebEdit("name:=.*textboxPassword.*").Set  FRM_DS_GetValue(objData, "Password")
	   objWebPage.Link("text:=.*Login.*","index:=0").WebElement("innertext:=.*Login.*","index:=0").Click 
	End If

BIZ_DisclosureTrackingWeb_AcceptEConsentWithBorrowerType "E2E_HappyPath", "Borrower"
BIZ_DisclosureTrackingWeb_Logout()

GUI_Browser_CloseLastOpened()

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
