'@******************************************************************************************
'@ TestStory:  PTAC-871 - CONVPURARM
'@ TestCase: PTAC-701 - Request Conditions
'@ Test Automation JIRA Task: PTAC-990 -[Technical Task 3] E2E_2CONVPURARM_Processing
'@ TestData: 
	'"eFolder_Tab/SetSendRequestData/E2E_CONVPURARM
	'"Global_Data/Website/E2E_CONVPURARM_Borrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1.Click efolder and click request button.
	'2.Click add new and select 1003 URLA and flood hazard notice and click send.
	'3.Select for borrower signing option " esign" option.
	'For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'Click ok.
	'Click ok.
	'Login In gmail with
	'user id : integrationborrower@gmail.com
	' password:Integration-1.
	'click on to electronic loan document request.
	'Sign-in to loan center with the following credentials
	' Email- integrationborrower@gmail.com
	' Password - Respa15
	'   Click on to e-sign and give authorization code as 1111 for borrower and click next.
	' Click on document and click next. click 'adopt and sign'.
	'Click on required -sign here in all places and Click finish.
'@ ExpectedResult: 
	'Request window will open.
	'Send request opens.
	'An email message has been sent to originator" message will be shown in a new window.
	'.Loan detail page with e-sign will be shown.
	'Loan center should open.
	''Document should open.
	'In the loan center page it should show e-signed.
	'Click on document and click next. click 'adopt and sign'.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-701","Test Case Name - PTAC-701 - Request Conditions", Null

'Clicks on eFolder
BIZ_Nav_eFoler_Open()
GUI_Object_ValidateExists SwfWindow("swfname:=eFolderDialog"), 5, "E-folder is opened"

BIZ_Documents_SendRequest "E2E_CONVPURARM"
BIZ_Nav_eFoler_Close()
GUI_Browser_CloseAllBrowsers g_DefaultBrowser

BIZ_LoanCenter_LogIn "E2E_CONVPURARM_Borrower"
strLoanNumber = BIZ_Loan_GetLoanNumber()
DisclosureTrackingWeb_LoanCenter_AcceptAndeSign strLoanNumber, "E2E_CONVPURARM"
BIZ_WebCenter_LogOut()	

