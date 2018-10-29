'@**************************************************************************************************
'@ TestStory: PTAC-1129 - HAPPYPATH_E2E
'@ TestCase: PTAC-1155 HP Approval 2-Complete Closing Disclosure, Esign Process & Validate CD date
'@ Test Automation JIRA Task: PTAC-1234
'@ TestData: 
	'1 Forms_FHAManagement,BasicInfo,E2E_Approval2_FHA
	'2 eFolder_Tab,SelectPackageTypeAndPlanCode,CFUN81_PackageType
	'3 eFolder_Tab,SelecteDisclosureDocs,E2E_CD_DisclosureTracking
	'4 eFolder_Tab,SendeDisclosures,E2E_HPQual3
	'5 WebCenter_Application,Basic,E2E_HPQualification3
	'6 Global_Data,Website,E2E_HappyPath_Borrower				
'@ Pre-conditions: 
'@ Description: Send E-disclosures full package with CD.Include e-sign wet sign and informational doc.
'@ TestSteps:
	'1  Under the forms, select FHA Management.Under FHA information tab,Enter closing date: <2 month from the current date> and click on Save
	    'Note: This step is not available in Happy Path doc but it is require otherwise it will throw error msg later
	'2  Click on efolder. Click on eDisclosure
	'3  Select a plan code-  Generic All fixed Rate-Convention First lien Loans and then click on "Order e-Disclosure" button.Click "Yes" in the pop-up window 
	'4  Click on the fields and clear any audits which are in red color.(Note: Ignore others which are black).click refresh audit button.	
	'5  Click "order edisclosures" button in the disclosures audit window. Click Ok in the Pop-Up
	'6  Click Add additional docs button. Select "Closing Disclosure" and click add.
	'7  Unselect all the documents and select only "Closing Disclosure". Click Send.
	'8  Select for borrower signing option "" esign" option.For borrower authentication method select Authorization code from the dropdown and give 1111 as borrower authorization.Click send.
	'9  Login to Gmail as borrower.click on to electronic loan document request.
	'10 Sign-in to loan center with the following credentials. Email- integrationborrower@gmail.com. Password - Respa15
	'11 Click on to e-sign and give authorization code as 1111 for borrower and click next.
	'12 Click on document and click next. click 'adopt and sign'.Click on required -sign here in all places and click finish.
	'13 Come back to the Encompass and open the Disclosure tracking tool
	'14 Under the CD Tracking, Verify CD Received date is populated.
'@ ExpectedResult: 
	'1  The FHA Management should open. The data should be saved
	'2  eFolder should open. 
	'3  Send E-disclosure window should open.
	'4  Pop-up will open with following message "Borrower pair has already received all of the available disclosures, would you like to send them again" 
	'5  The Encompass should open with "The custom letter Interest Rate Lock Agreement (MultiState). doc is no longer available"
	    'The Pop-window get closed and select Documents window should open
	'6  The pop should be open and click "Yes" button.
	    'Send edisclosure page with email message will be shown.
	'7  The pop-up message should be display with "The disclosure package has been sent to the borrower" message
	'8  "An email message has been sent to originator" message will be shown in a new window.
	'9  Loan center page should open.
	'10 Loan detail page with e-sign will be shown.
	'11 Document should open.
	'12 In the loan center page it should show e-signed.
	'13 Disclosure tracking tool is shown with
        '(LE received date is shown).
        'Note: Need to validate the date
	'14 The CD Received date should be populated
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-1155","HP Approval 2-Complete Closing Disclosure, Esign Process & Validate CD date", Null

'Variable declaration
Dim strLoanNumber, strExpected

'Set Show all checkbox under forms tab
BIZ_Forms_ShowAll

'Open FHA Management form
BIZ_Forms_Open "FHA Management"

'Set closing date to less than two months from current date
BIZ_FHAManagement_BasicInfo "E2E_Approval2_FHA"

'Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "CFUN81_PackageType", "E2E_CD_DisclosureTracking", "E2E_HPQual3", "E2E_HPQual3"

'Login to loan center with borrower credentials
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_HappyPath_Borrower", "E2E_HPQual3"

'Close eFolder
BIZ_Nav_eFoler_Close()

'Open Tools >> Disclosure Tracking
BIZ_Tools_Open "Disclosure Tracking"

'Validate if CD received date is populated
strExpected = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname path:=txtDate;dpCDReceived;.*"),"text")
FRM_VerifyTrue UTIL_String_IsNotEmpty(strExpected), "CD Received Date", "CD Received Date is populated"
