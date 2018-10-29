'@**************************************************************************************************
'@ TestStory: PTAC-1753 Create Loans From different Source
'@ TestCase: PTAC-1546 Create a Loan by duplication
'@ Test Automation JIRA Task: PTAC-1832 CreateLoansFromDifferentSources_LoanCreation
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1832_ContactDetails
'@ Pre-conditions: 
'@ Description: Create a Loan by duplicatio
'@ TestSteps:
   '1 Launch Encompass and Login as admin
   '2 Go to Pipeline tab
   '3 Choose any loan, and right click, select 'Duplicate Loan' 
   '4 Click on OK button, verify
   '5 Click on Yes option, verify
'@ ExpectedResult:
   '1 Admin user should be logged in successfully
   '2 It should navigate to Pipeline tab
   '3 Duplicate Loan window displayed with options and by default 'Duplicate the selected Loan' option to be selected
   '4 It displays the popup message as 'The loan has successfully duplicated. Would you like to open the loan now?' with Yes/No options
   '5 It should be navigated to the loan tab with the new loan 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Test Case #4: Create a new loan from Borrwer Contacts","Validating create a new loan from Borrwer Contacts", Null

Dim objLoanGrid,objDuplicateWin,intRowNumber,boolLoanVal,boolPipelinePage,intColumnIndex
Set objLoanGrid 	= SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans")
Set objDuplicateWin = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DuplicateLoanDialog")
Set objData			= FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "PTAC_1832_BorrDetails")
	
'============== Open existing loan ======
strLoanNumber =	Parameter("strLoanNumber")
BIZ_Loan_OpenByLoanNumber strLoanNumber
wait 3
'===========Exit Loan======
BIZ_Loan_Exit False

'========Select Loan and Click on Duplicate Button
GUI_Object_WaitTillExistX objLoanGrid,20
intRowCount = GUI_List_GetRowCount(objLoanGrid,"Loan Number",Cstr(strLoanNumber))
intColumnIndex = GUI_List_GetColumnIndex(objLoanGrid,"Loan Number")
intRowNumber = intRowCount + 1
GUI_List_ClickOnCellData  objLoanGrid,intRowNumber,intColumnIndex,False,False,False,"Single"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen","index:=0").SwfObject("swfname:=btnDuplicate","index:=0")

'=============Verifying Duplicating Loan window =======
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DuplicateLoanDialog"),7) Then
	GUI_Object_ValidateText objDuplicateWin,"Duplicate Loan","Duplicate Loan window displayed"
	GUI_Object_ValidateChecked objDuplicateWin.SwfRadioButton("swfname:=radDuplicate"),"True","Default 'Duplicate the selected Loan' option is selected"
	GUI_SwfButton_Click objDuplicateWin.SwfButton("swfname:=btnOK")
End If
	
'=====Valdating duplicating loan popup message and click on Yes button
GUI_Object_WaitTillExist SwfWindow("swfname:=MainForm").Dialog("text:=Encompass")
GUI_Dialog_Encompass_Yes "The loan has been successfully duplicated. Would you like to open the loan now?"

'====verify the loan details=====
FRM_Logger_ReportInfoEvent "Verifying loan details after created loan from Borrower Contacts","Validating loan details after created loan from Borrwer Contacts",Null
BIZ_Forms_Open "Borrower Summary - Origination"
Set objBorrower = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_36"), FRM_DS_GetValue(objData,"FirstName") , "First Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_37"), FRM_DS_GetValue(objData,"LastName"), "Last Name"
GUI_Object_ValidateValue objBorrower.WebEdit("html id:=l_1240"), FRM_DS_GetValue(objData,"HomeMail"), "Home Email"	
	
Set objLoanGrid 	= Nothing
Set objDuplicateWin = Nothing
Set objData = Nothing	

'=========Exist form loan =========
BIZ_Loan_Exit True

