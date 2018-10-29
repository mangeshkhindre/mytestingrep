'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2362 Resubmittal 3- Disclose lock confirmation
'@ Test Automation JIRA Task: PTAC-2961 E2E_9VANoCORefiARM_ReSubmittal
'@ TestData: 
   '1 Global, Login and E2E_markuslp
   '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, Milestone and E2E_VAPURARM_Processing
   '4 eFolder_Tab, SelectPackageTypeAndPlanCode and E2E_VAPURARM
   '5 eFolder_Tab, SelecteDisclosureDocs and E2E_VAPURARM
   '6 eFolder_Tab, SendeDisclosures and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass as Loan processor.
   '2 Click e-folder.
   '3 Click e-disclosures button. Select 'VA fixed rate open term' from the list and click on 'order disclosures' button.
	  'Click 'skip plan data' button. Click 'yes' in the pop up window.
   '4 Click "order edisclosures" button in the disclosures audit window..
   '5 Click Add additional docs button.
   '6 Select lOCK CONFIRMATION and click add.
   '7 Unselect all and just select Lock confirmation and click send.
   '8 Select for borrower signing option wetsign option and click send.
   '9 click ok.
   '10 Login In gmail with
	   'userid : integrationborrower@gmail.com
	   'password:Integration-1.
	   'click on to electronic loan document request. Click on 'click here to go to website' in the email.
   '11 Sign-in to loan center with the following credentials
	   'Email- integrationborrower@gmail.com
	   'Password - Respa15   
'@ ExpectedResult: 
   '1 Should be able to login.
   '2 E-folder should open.
   '3 Send E-disclosure window should open.Disclosure Audit window opens.Plan code conflict window should open.
	  'A pop up window should open 'are you sure you want to apply plan code?'. Disclosure Audit window opens.
   '4 select documents page should open.
   '5 A list of additional documents will be shown.
   '6 The selected documents has been added to the list based on current stacking order- message will appear.
   '7 Send edisclosure page with email message will be shown.
   '8 The disclosure package has been sent to the borrower' window will open.
   '9 Pop up window should close. Loan center should open
   '10 Loan detail page with esigned will be shown
'@**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2362","Resubmittal 3- Disclose lock confirmation", Null

Dim strLoanNumber, objDataResubmittal, objData

Set objDataResubmittal = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_ReSubmittal")
Set objData 		   = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_OpenByLoanNumber strLoanNumber
' Open on eFolder 
BIZ_Nav_eFoler_Open()
' Send eDisclosure information 
BIZ_Documents_SendeDisclosure "E2E_VANoCORefiARM", "E2E_VANoCORefiARM", "E2E_VANoCORefiARM_WetSign"
BIZ_Nav_eFoler_Close()

Set objDataResubmittal = Nothing
Set objData 		   = Nothing
