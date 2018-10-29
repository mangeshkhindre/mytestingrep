'@**************************************************************************************************
'@ TestStory: PTAC-3409 ATR/QM Calculations
'@ TestCase: 
   '1 PTAC-3364 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Primary)
   '2 PTAC-3363 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Second)
   '3 PTAC-3362 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Investment)
'@ Test Automation JIRA Task: PTAC-3442 ATR-QMCalculations_NonOccupantCo-MortgagorPresentHousingExp(Rental+Sub)
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
'@ Pre-conditions: Login as admin. Build 17.2.0.6 . Server: http://eq1veabe30047.dco.elmae/Encompass$BE11173697
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
   '6 QM.X376 (Total Debt Ratio) should ve validated
'***************************************************************************************************
Dim objLinkedLoan, objMain, objMainPage, objData, objBorrower1Data, objBorrower2Data, objVOMPage, objATR2Data

strRowID				=	Parameter("strRowID")
StrRowIDForBorrower2	=	Parameter("StrRowIDForBorrower2")
strPropertyType			=	Parameter("strPropertyType")

Set objLinkedLoan		=	SwfWindow("swfname:=MainForm").SwfWindow("regexpwndtitle:=Encompass","swfname:=LinkedLoanDialog","text:=Encompass")
Set objMain				=	SwfWindow("swfname:=MainForm")
Set objMainPage			=	SwfWindow("swfname:=MainForm").Page("micclass:=Page")
Set objVOMPage			=	SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")
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
BIZ_1003Page2_SetMonthlyIncomeExpensesData strRowID
BIZ_1003Page2_SetLiabilities strRowID

'==== Open VOM Page ====
BIZ_Forms_Open "1003 Page 3"
GUI_Object_WaitTillExistX objMainPage.WebButton("html id:=Button1"), 60	'@ To Handle Sync Related Issues
GUI_WebButton_Click objMainPage.WebButton("html id:=Button1")

If GUI_Object_IsExistX(objVOMPage, 60) Then
	FRM_Logger_ReportPassEvent "Quick Entry VOM",  "VOM Pop Up window displays", Null
	BIZ_VOM_SelectLiabilityBasedOnType "Mortgage"
Else
	FRM_Logger_ReportFailEvent "Quick Entry VOM",  "VOM Pop Up window not displayed", Null
End If

BIZ_Common_SetVOMData objVOMPage.Page("micclass:=Page"), strRowID
GUI_SwfButton_Click objVOMPage.SwfButton("swfname:=btnClose")

'==== Create Second Borrower Validate Added Borrower ====
strSecondBorrower	=	BIZ_ATRQMManagement_CreateBorrower (strRowID)

'==== Select Second Borrower ====
GUI_Object_WaitTillExistX objMain.SwfComboBox("swfname:=cboBorrowers"), 60	'@ To Handle Sync Related Issues
GUI_SwfComboBox_Select objMain.SwfComboBox("swfname:=cboBorrowers"), strSecondBorrower
GUI_Object_ValidateText objMain.SwfComboBox("swfname:=cboBorrowers"), strSecondBorrower, "Selected '"&strSecondBorrower&"' From Dropdown"
BIZ_1003Page2_SetMonthlyIncomeExpensesData StrRowIDForBorrower2
BIZ_1003Page2_SetLiabilities StrRowIDForBorrower2

'==== Open VOM Page ====
BIZ_Forms_Open "1003 Page 3"
GUI_Object_WaitTillExistX objMainPage.WebButton("html id:=Button1"), 60	'@ To Handle Sync Related Issues
GUI_WebButton_Click objMainPage.WebButton("html id:=Button1")

If GUI_Object_IsExistX(objVOMPage, 60) Then
	FRM_Logger_ReportPassEvent "Quick Entry VOM",  "VOM Pop Up window displays", Null
	BIZ_VOM_SelectLiabilityBasedOnType "Mortgage"
Else
	FRM_Logger_ReportFailEvent "Quick Entry VOM",  "VOM Pop Up window not displayed", Null
End If

BIZ_Common_SetVOMData objVOMPage.Page("micclass:=Page"), StrRowIDForBorrower2
GUI_SwfButton_Click objVOMPage.SwfButton("swfname:=btnClose")

'==== Select First Borrower ====
GUI_Object_WaitTillExistX objMain.SwfComboBox("swfname:=cboBorrowers"), 60	'@ To Handle Sync Related Issues
GUI_SwfComboBox_Select objMain.SwfComboBox("swfname:=cboBorrowers"), strFirstBorrower
GUI_Object_ValidateText objMain.SwfComboBox("swfname:=cboBorrowers"), strFirstBorrower, "Selected '"&strFirstBorrower&"' From Dropdown"

'==== Validate Total Debt Ratio ====
BIZ_Forms_Open "ATR/QM Management"
GUI_Object_WaitTillExistX objMain.SwfTab("swfname:=tabControlForm"), 60	'@ To Handle Sync Related Issues
GUI_SwfTab_Click objMain.SwfTab("swfname:=tabControlForm"), "Qualification"	
GUI_Object_ValidateValue objMainPage.WebEdit("html id:=TextBox11"), FRM_DS_GetValue(objData,"QM.X376_TotalDebtRatio"), "QM.X376 (Total Debt Ratio)"

'==== Goto Tools,Prequalification set cash flow and validate ====
If LCase(strPropertyType) 	= "investment" Then
	Set objATR2Data			= 	FRM_DS_GetTestData("Forms_ATRQMManagement", "SetBorrowerInfo", StrRowIDForBorrower2)
	
	BIZ_Tools_Prequalification_SetCashFlow StrRowIDForBorrower2
	BIZ_Forms_Open "ATR/QM Management"
	GUI_Object_WaitTillExistX objMain.SwfTab("swfname:=tabControlForm"), 60	'@ To Handle Sync Related Issues
	GUI_SwfTab_Click objMain.SwfTab("swfname:=tabControlForm"), "Qualification"	
	Wait g_ShortWaitMedium
	GUI_Object_ValidateValue objMainPage.WebEdit("html id:=TextBox11"), FRM_DS_GetValue(objATR2Data,"QM.X376_TotalDebtRatio"), "QM.X376 (Total Debt Ratio)"
	BIZ_Loan_Save()
	BIZ_Loan_Exit true
Else
	BIZ_Loan_Save()
	BIZ_Loan_Exit true
End If

Set objLinkedLoan		=	Nothing
Set objMain				=	Nothing
Set objMainPage			=	Nothing
Set objVOMPage			=	Nothing
Set objData 			= 	Nothing
Set objATR2Data			= 	Nothing
Set objBorrower1Data 	= 	Nothing
Set objBorrower2Data	= 	Nothing
