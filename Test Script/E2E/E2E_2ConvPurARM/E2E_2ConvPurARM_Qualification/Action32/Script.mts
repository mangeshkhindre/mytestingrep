'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-664 Qualification 3 - edisclosures
'@ Test Automation JIRA Task: PTAC-992 E2E_2CONVPURARM_Qualification
'@ TestData: 
	'1 Services, Underwriting,E2E_CONVPURARM
	'2 eFolder_Tab, SendeDisclosures, E2E_CONVPURARM
	'3 eFolder_Tab, SelectPackageTypeAndPlanCode, E2E_CONVPURARM
	'4 eFolder_Tab, SelecteDisclosureDocs, E2E_CONVPURARM
	'5 Global_Data, Website, E2E_CONVPURARM_Borrower
	'6 Global_Data, Website, E2E_CONVPURARM_CoBorrower
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'01 Click e-folder 
	'02 Click e-disclosure 
	'03 Select a plan code-  Generic 5/1 Treasury ARM and click 'order disclosures' button 
	'04 Click on the fields and clear any audits which are in red color (Ignore others which are black)  click refresh audit button 
	'05 Click ""order edisclosures"" button in the disclosures audit window  
	'06 Click Add additional docs button 
	'07 Select Loan Estimate and click add 
	'08 Check if all documents are selected and Click send in the select documents window 
	'09 Select for borrower signing option "" esign + wetsign"" option ' For borrower authentication method select 
       'Authorization code from the dropdown and give 1111 as borrower authorization and co-borrower authorization code. click send.
	'10 Click ok 
	'11 Click ok 
	'12 Login In gmail with click on to electronic loan document request 
	'13 Sign-in to loan center with the following credentials
	'14 Click on to e-sign and give authorisation code as 1111 for borrower and click next 
	'15 Click on document and click next. click 'adopt and sign'  click on required -sign here in all places and click finish 
	'16 In the loan center page under print sign and upload documents,Click upload add any 2pdf documents 
	'17 In Encompass in disclosure tracking  click on the line item under disclosure history and check on "Intent to proceed" and click 'ok' 
'@ ExpectedResult: 
	'01 E-folder should open 
	'02 Send E-disclosure window should open 
	'03 Disclosure Audit window opens 
	'04 After filling those fields in red(if any) 
	'05 Select documents page should open 
	'06 A list of additional documents will be shown 
	'07 The selected documents has been added to the list based on current stacking order- message will appear 
	'08 Send edisclosure page with email message will be shown 
	'09 Window opens with the following message""Package includes one or more documents that require originators e-signature 
	'10 "An email message has been sent to originator" message will be shown in a new window 
	'11 Disclosure tracking tool is shown with(LE recieved date is shown) 
	'12 Loan center should open 
	'13 Loan detail page with e-sign will be shown 
	'14 Document should open 
	'15 In the loan center page it should show e-signed 
	'16 Uploaded with a green tick mark will be shown in lan center page 
	'17 Disclosure details window will open 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-664","Qualification 3 - edisclosures", Null

Dim strLoanNumber
'Open the eFolder Screen and Send eDisclosure information
BIZ_DisclosureTrackingWeb_SaveE2ELoanNumberAndSendeDisclosure "E2E_CONVPURARM", "E2E_CONVPURARM", "E2E_CONVPURARM", "E2E_CONVPURARM"

'Logs into Loan Center and Accepts eSign Document 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVPURARM_Borrower", "E2E_CONVPURARM"

'Logs into Loan Center and Accepts eSign Document 
BIZ_DisclosureTrackingWeb_LoanCenter_LoginNToCenterAccepteSign "E2E_CONVPURARM_CoBorrower", "E2E_CONVPURARM"

BIZ_Nav_eFoler_Close()
