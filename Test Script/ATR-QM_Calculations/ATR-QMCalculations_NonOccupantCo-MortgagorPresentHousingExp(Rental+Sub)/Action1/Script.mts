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
   '1 PTAC-3364 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Primary)
   '2 PTAC-3363 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Second)
   '3 PTAC-3362 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Investment)
'@ ExpectedResult:
   '1 PTAC-3364 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Primary)
   '2 PTAC-3363 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Second)
   '3 PTAC-3362 Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Investment)
'***************************************************************************************************

'Set obj=SwfWindow("Encompass - Build 17.4.0.0").SwfComboBox("cboLoanType")
'value="All"
'If obj.GetROProperty("text") <> value Then 
'		item=split(obj.GetROProperty("all items"),VbLf)
'		For i = 0 To Ubound(item) Step 1
'			If instr(item(i),value)>0 Then
'				obj.Object.Focus   'Added for scrolling down to the object
'		        obj.Select item(i) 
'		        Exit For
'			End If
'		Next
'		
'		
'	End If
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3442","Script Name: ATR-QMCalculations_NonOccupantCo-MortgagorPresentHousingExp(Rental+Sub)", Null

'==== Login ====
BIZ_Login_UserLogin "admin_core2p"	'@ Fixed For 17206 Banker, Server: http://eq1veabe30047.dco.elmae/Encompass$BE11173697

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3364","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Primary)", Null
RunAction "NonOccupantCo-MortgagorPresentHousingExp(Rental+Sub)", oneIteration, "PTAC-3364", "PTAC-3364_Borrower2", "Primary"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3363","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Second)", Null
BIZ_Nav_SelectHomeTab()
RunAction "NonOccupantCo-MortgagorPresentHousingExp(Rental+Sub)", oneIteration, "PTAC-3363", "PTAC-3363_Borrower2", "Secondary"

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3362","Validate QM.X376 includes Non-Occupant Co-Mortgagor Present Housing Expense (Rental Income + Sub. Prop. = Investment)", Null
BIZ_Nav_SelectHomeTab()
RunAction "NonOccupantCo-MortgagorPresentHousingExp(Rental+Sub)", oneIteration, "PTAC-3362", "PTAC-3362_Borrower2", "Investment"

'===== Go To Home Tab & Logging Out Of Encompass =====
BIZ_Nav_SelectHomeTab()
BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)
