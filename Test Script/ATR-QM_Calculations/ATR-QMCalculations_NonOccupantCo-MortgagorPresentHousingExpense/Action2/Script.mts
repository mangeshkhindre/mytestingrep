'@**************************************************************************************************
'@ TestStory: PTAC-3409 ATR/QM Calculations
'@ TestCase:
   '1 PTAC-3361 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Primary)
   '2 PTAC-3279 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Second Home)
   '3 PTAC-3280 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Sub. Prop. = Investment)
'@ Test Automation JIRA Task: PTAC-3410 ATR-QMCalculations_NonOccupantCo-MortgagorPresentHousingExpense
'@ TestData: 
   '1 "Forms_BorrowerSummaryOrigination", "SetBorrower", strRowID
   '2 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", strRowID
   '3 "Forms_BorrowerSummaryOrigination", "SetBorrowerIncome", strRowID
   '4 "Forms_BorrowerSummaryOrigination", "TotalMonthlyPayment", strRowID
   '5 "Forms_BorrowerSummaryOrigination", "SetSSNVerification", strRowID
   '6 "Forms_1003page", "1003Page1", strRowID
   '7 "Forms_1003page", "1003Page2", strRowID
   '8 "Forms_VOL", "SetVOLData", strRowID
   '9 "Forms_1003page", "SetLiabilities", strRowID
   '10 "Forms_ATRQMManagement", "SetBorrowerInfo", strRowID
'@ Pre-conditions: 
'@ Description: 
   '1 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense when Subject Property = Investment 
   '2 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense when Subject Property = Second Home
   '3 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense when Subject Property = Investment
'@ TestSteps:
   '1 Log into Encompass and create New Blank Loan with 'Test Data' for Borrower 1
   '2 At the top, click on 'Manage Borrowers' button and click the Add button to create a new Borrower Pair row
   '3 Complete the First Name & Last Name for the new borrower
   '4 At the top, select John Co-Mortgagor (Borrower 2) from the drop down to open their Input Data Forms and enter data according to 'Test Data' column
   '5 Select Alice Homeowner (Borrower 1) from the drop down to open their Input Data Forms
   '6 Validate the 'Expected Results'
'@ ExpectedResult:
   '1 New loan is created and data inputted for Borrower 1
   '2 New Borrower Pair row is created
   '3 Borrower 2 is added
   '4 Data is inputted for Borrower 2
   '5 Input Forms are opened for Borrower 1
   '6 QM.X376 (Total Debt Ratio) = 46.171
'***************************************************************************************************
Dim objLinkedLoan, objMain, objMainPage, objData, objBorrower1Data, objBorrower2Data

strRowID				=	Parameter("strRowID")
StrRowIDForBorrower2	=	Parameter("StrRowIDForBorrower2")

Set objLinkedLoan		=	SwfWindow("swfname:=MainForm").SwfWindow("regexpwndtitle:=Encompass","swfname:=LinkedLoanDialog","text:=Encompass")
Set objMain				=	SwfWindow("swfname:=MainForm")
Set objMainPage			=	SwfWindow("swfname:=MainForm").Page("micclass:=Page")
Set objData 			= 	FRM_DS_GetTestData("Forms_ATRQMManagement", "SetBorrowerInfo", strRowID)
Set objBorrower1Data 	= 	FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", strRowID)
Set objBorrower2Data	= 	FRM_DS_GetTestData("Forms_ATRQMManagement", "SetBorrowerInfo", strRowID)

'==== Create First Loan With Basic Information ====
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome strRowID
BIZ_BorrowerSummaryOrigination_TotalMonthlyPayment strRowID
BIZ_1003Page1_SetData strRowID
BIZ_1003Page2_SetMonthlyIncomeExpensesData strRowID
BIZ_VOL_SetVOLData strRowID
strFirstBorrower	=	FRM_DS_GetValue(objBorrower1Data, "FirstName")&" "&FRM_DS_GetValue(objBorrower1Data, "LastName")

'==== Create Second Borrower & Validate Added Borrower ====
strSecondBorrower	=	BIZ_ATRQMManagement_CreateBorrower (strRowID)

'==== Input Data For Second Borrower ====
GUI_Object_WaitTillExistX objMain.SwfComboBox("swfname:=cboBorrowers"), 60	'@ To Handle Sync Related Issues
GUI_SwfComboBox_Select objMain.SwfComboBox("swfname:=cboBorrowers"), strSecondBorrower
BIZ_1003Page2_SetMonthlyIncomeExpensesData StrRowIDForBorrower2
BIZ_1003Page2_SetLiabilities StrRowIDForBorrower2

'==== Select Second Borrower ====
GUI_Object_WaitTillExistX objMain.SwfComboBox("swfname:=cboBorrowers"), 60	'@ To Handle Sync Related Issues
GUI_SwfComboBox_Select objMain.SwfComboBox("swfname:=cboBorrowers"), strFirstBorrower
GUI_Object_ValidateText objMain.SwfComboBox("swfname:=cboBorrowers"), strFirstBorrower, "Selected '"&strFirstBorrower&"' From Dropdown"

'==== Validate Total Debt Ratio ====
BIZ_Forms_Open "ATR/QM Management"
GUI_Object_WaitTillExistX objMain.SwfTab("swfname:=tabControlForm"), 60	'@ To Handle Sync Related Issues
GUI_SwfTab_Click objMain.SwfTab("swfname:=tabControlForm"), "Qualification"	
Wait g_ShortWaitMedium	'@ To Handle Sync Related Issues
GUI_Object_ValidateValue objMainPage.WebEdit("html id:=TextBox11"), FRM_DS_GetValue(objData,"QM.X376_TotalDebtRatio"), "QM.X376 (Total Debt Ratio)"
BIZ_Loan_Save()
BIZ_Loan_Exit False
