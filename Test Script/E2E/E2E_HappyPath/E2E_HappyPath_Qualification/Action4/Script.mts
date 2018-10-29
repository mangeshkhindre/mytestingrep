'@********************************************************************************************************
'@ TestStory: TAC-1129  HAPPYPATH_E2E 
'@ TestCase: PTAC-1092 HP Qualification 3-Complete LE Disclosure & E-sign
'@ Test Automation JIRA Task:  PTAC-1133
'@ TestData: 
    '1 eFolder_Tab,SelectPackageTypeAndPlanCode,CFUN81_PackageType
	'2 eFolder_Tab,SelecteDisclosureDocs,E2E_DisclosureTracking
	'3 eFolder_Tab,SendeDisclosures,E2E_HPQual3
	'4 WebCenter_Application,Basic,E2E_HPQualification3
	'5 Global_Data,Website,Core2p_Integration
'@ Pre-conditions: 
'@ Description:  Complete LE Disclosure & E-sign
'@ TestSteps:
	'1  Navigate to eFolder > eDisclosures.
	'2  Select a plan code-  Generic All fixed Rate-Convention First lien Loans and then click on "Order e-Disclosure" button
	'3  Click on the fields and clear any audits which are in red color.(Ignore others which are black). click refresh audit button
	'4  Click ""order edisclosures"" button in the disclosures audit window. Click Print button. Click Ok button
	'5  Click Add Additional Docs. Select Loan Estimate and click add
	'6  Unselect all the documents and select only "Loan Estimate". Click Send
	'7  Select for borrower signing option "" esign" option. For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization
	'8  Login to Gmail as borrower.click on to electronic loan document request
	'9  Sign-in to loan center with the following credentials.Email- integrationborrower@gmail.com.Password - Respa15
	'10 Click on to e-sign and give authorization code as 1111 for borrower and click next
	'11 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish
	'12 Come back to the Encompass and open the Disclosure tracking tool
	'13 In Encompass in disclosure tracking. click on the line item under disclosure history and check on ""Intent to proceed"" and click 'ok'
'@ ExpectedResult: 
	'1  Send edisclosure page with email message will be shown
	'2  Loan detail page with e-sign will be shown
	'3  In the loan center page it should show e-signed
	'4  Disclosure tracking tool is shown with (LE received date is shown)
'***********************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1092", "HP Qualification 3-Complete LE Disclosure & E-sign", Null

'Variable declaration
Dim strExpected

'Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "CFUN81_PackageType", "E2E_DisclosureTracking", "E2E_HPQual3", "E2E_HPQual3"

'Login to Loan Center as Borrower and Perform Sign
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_HappyPath_Borrower", "E2E_HPQual3"

'Close existing IE process
UTIL_Win_CloseProcesses "iexplore.exe"

'Close eFolder
BIZ_Nav_eFoler_Close()

'Open Tools >> Disclosure Tracking
BIZ_Tools_Open "Disclosure Tracking"

'Validate if LE received date is populated
strExpected = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname path:=txtDate;dpLEReceived;.*"),"text")
FRM_VerifyTrue UTIL_String_IsNotEmpty(strExpected), "LE Received Date", "LE Received Date is populated"

'Click on recent disclosure record
BIZ_DisclosureTrackingTool_ClickRecord "Method", "eFolder eDisclosures", "Double"

'Set "Intent to Proceed" checkbox after disclosure record is opened
BIZ_DisclosureTrackingTool_SetIntentToProceed "ON"

'Close the disclosure record window
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")