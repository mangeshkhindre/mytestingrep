'@**************************************************************************************************
'@ TestStory:  PTAC-1753 Create Loans From different Source
'@ TestCase: PTAC-1545 Creating a loan from borrower contacts
'@ Test Automation JIRA Task: PTAC-1832 CreateLoansFromDifferentSources_LoanCreation
'@ TestData: 
	'1 Forms_BorrowersummarOrigination,SetBorrower,PTAC-1832_ContactDetails
'@ Pre-conditions: 
'@ Description: Creating a loan from borrower contacts
'@ TestSteps:
   '1 Launch Encompass and Login as admin
   '2 Go to Contacts tab > Borrower Contacts
   '3 Click on the New Loan  icon
   '4 In the Contact Details, enter personal information in the Details tab and click save"
   '5 Click on 'Originate Loan' button
   '6 Click on Continue button, verify
   '7 Click on Save
   '8 Enter any Email address, and click OK button, verify the Loan number and Application Date
   '9 Search with Loan number in the pipeline and open the Loan then verify
'@ ExpectedResult:
   '1 Admin user should be logged in successfully
   '2 It should navigated successfully
   '3 New Contact details tab opens in the bottom panel.
   '4 The data should be saved
   '5 It opens the 'Originate Loan' pop up window and by default 'Loan Folder' displays the 'Prolifics'
   '6 It displays the details which entered in the 'Details' tab
   '7 An Email check window opens up 
   '8 It should create the 'loan number' in the header and 'Application Date' in 'Borrower Summary Origination' section successfully
   '9 It should display the filled details with Email ID successfully
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Test Case #3: Create a new loan from Borrwer Contacts","Validating create a new loan from Borrwer Contacts", Null

strRowId="PTAC_1832"
Set objData 	= FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower",strRowId )
strFirstName  = FRM_DS_GetValue(objData,"FirstName")
strLastName   = FRM_DS_GetValue(objData,"LastName")
strHomeMail = FRM_DS_GetValue(objData,"HomeMail")

Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=ContactMainForm").SwfWindow("swfname:=BorrowerListForm")
Set objOriginateLoanWin	= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LoanOriginationDlg")
Set objBorrower     	= SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

'======Navigate to Contacts Tab and Creating new Contact=====
FRM_Logger_ReportInfoEvent "Create new contact details","Creating new contact details",Null
BIZ_Nav_SelectContactsTab ()
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnBorrower","index:=0")
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnNew")
	
If UTIL_String_IsNotEmpty(strFirstName) Then
   GUI_SwfEditor_Type objSettings.SwfEdit("swfname:=txtBoxFirstName"), Cstr(strFirstName)
End If

If UTIL_String_IsNotEmpty(strLastName) Then
   GUI_SwfEditor_Type objSettings.SwfEdit("swfname:=txtBoxLastName"), Cstr(strLastName) 
End If

If UTIL_String_IsNotEmpty(strHomeMail) Then
   GUI_SwfEditor_Type objSettings.SwfEdit("swfname:=txtBoxPersonalEmail"), Cstr(strHomeMail) 
End If

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnSave")
wait 3

'================== Creating new loan =================
FRM_Logger_ReportInfoEvent "Originate a new loan","Creating new loan from Business Contacts",Null
GUI_SwfButton_Click objSettings.SwfButton("swfname:=btnOriginateLoan")

If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MatchedLoansForm").Exist(5) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MatchedLoansForm").SwfButton("swfname:=btnCreateNew")
End If

GUI_Object_WaitTillExistX objOriginateLoanWin,20
boolLoanFolder = GUI_SwfComboBox_VerifyItemExists(objOriginateLoanWin.SwfCombobox("swfname:=cmbBoxLoanFolder"), "Automation")
If boolLoanFolder Then
	GUI_SwfComboBox_Select objOriginateLoanWin.SwfCombobox("swfname:=cmbBoxLoanFolder"), "Automation"	
	GUI_SwfButton_Click objOriginateLoanWin.SwfButton("swfname:=btnContinue")
	
	If GUI_Object_IsExistX(SwfWindow("swfname:=Mainform").Dialog("text:=Encompass"),10) Then				
		GUI_DialogObject_Encompass_Yes SwfWindow("swfname:=Mainform").Dialog("text:=Encompass"), ""
	End If	
	
	BIZ_Forms_Open "Borrower Summary - Origination"
	
	'========Save Loan and Get Loan Number =======
	BIZ_Loan_Save()
	BIZ_Loan_SaveLoanNumber()
	strLoanNumber = BIZ_Loan_GetLoanNumber()
	
	'==========Exit Loan======
	BIZ_Loan_Exit False

	'============== Open existing loan and verify the details=====
	BIZ_Nav_SelectPipelineTab
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
	
	FRM_Logger_ReportInfoEvent "Verifying loan details after created loan from Borrower Contacts","Validating loan details after created loan from Borrwer Contacts",Null
	BIZ_Loan_OpenByLoanNumber strLoanNumber
	BIZ_Forms_Open "Borrower Summary - Origination"
	Set objBorrower = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
	GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_36"), strFirstName , "First Name"
	GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_37"), strLastName, "Last Name"
	GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_1240"), strHomeMail, "Home Email"	
Else	
	FRM_Logger_ReportFailEvent "Verify Loan folder in Originate loan Window","Required folder not dissplayed ",Null
End If

'==========Exit Loan======
BIZ_Loan_Exit False
	
Set objSettings			= Nothing
Set objOriginateLoanWin	= Nothing
Set objBorrower 		= Nothing
Set objData 			= Nothing
