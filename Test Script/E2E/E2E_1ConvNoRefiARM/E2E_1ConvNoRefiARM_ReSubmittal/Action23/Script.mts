'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1 PTAC-1404 - CONVNOCASHREFIARM-Resubmittal 3- Disclose lock confirmation
'@ Test Automation JIRA Task: PTAC-1786 E2E_ConvNoRefiARM_ReSubmittal
'@ TestData: 
   '1. Global, Login and E2E_carollp
   '2. Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3. Global_Data, Website and E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click e-folder
   '2 Click e-disclosures button and click on order disclosures button
   '3 Click order edisclosures button in the disclosures audit window
   '4 Click Add additional docs button
   '5 Select lock confirmation and loan estimate click add
   '6 Unselect all and just select Lock confirmation and loan estimate then click send
   '7 Select for borrower signing option wetsign option and click send
   '8 click ok
   '9 Login In gmail with credentials
   '10 Sign-in to loan center with credentials
   '11 Click onto wet sign and click upload and attach a local document
'@ ExpectedResult: 
   '1 E-folder should open
   '2 Send E-disclosure window should open.Disclosure Audit window opens
   '3 select documents page should open
   '4 A list of additional documents will be shown
   '5 The selected documents has been added to the list based on current stacking order- message will appear
   '6 Send edisclosure page with email message will be shown
   '7 The disclosure package has been sent to the borrower window will open
   '8 Pop up window should close
   '9 Loan center should open
   '10 A new pop up window should open to ' upload document.
   '11 pop up should close and in loan center 'uploaded ' should be seen with a checkmark with a lock confirmation.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1404","Test Case Name : CONVNOCASHREFIARM-Resubmittal 3- Disclose lock confirmation", Null

Dim objData, strLoanNumber
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber

'====== Open on eFolder ======
BIZ_Nav_eFoler_Open()

'====== Send eDisclosure information ======
BIZ_Documents_SendeDisclosure "E2E_ConvNoRefiARM", "E2E_ConvNoRefiARM_LockConfirmation", "E2E_ConvNoRefiARM_WetSign"

GUI_Browser_CloseAllBrowsers g_DefaultBrowser

BIZ_LoanCenter_LogIn "E2E_CONVPURARM_Borrower"
BIZ_DisclosureTrackingWeb_LoanCenter_UploadDocuments strLoanNumber, "E2E_ConvNoRefiARM"
BIZ_WebCenter_LogOut()	

'Close the eFolder Window 
BIZ_Nav_eFoler_Close()
Set objData = Nothing @@ hightlight id_;_Browser("Ellie Mae, Inc. - Loan 2").Page("Ellie Mae, Inc. - Loan").WebFile("ctl15")_;_script infofile_;_ZIP::ssf7.xml_;_
