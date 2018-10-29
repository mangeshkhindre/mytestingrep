'@**********************************************************************************************************
'@ TestStory: PTAC-3319 Amortization Schedule
'@ TestCase: 
		'PTAC-1547 Amortization Schedule - Conventional Loans; Purchase; Fixed
		'PTAC-2894 Amortization Schedule - Conventional Loans; Refi; Fixed	
		 'PTAC-1548 Amortization Schedule - Conventional Loans; Purchase; ARM w/o I/O
		'PTAC-1550 Amortization Schedule - Conventional Loans; Purchase; ARM with I/O
		'PTAC-2906 Amortization Schedule - Conventional Loans; Refi; ARM w/o I/O
		'PTAC-2907 Amortization Schedule - Conventional Loans; Refi; ARM with I/O		
'@ Test Automation JIRA Task:  PTAC-3320
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Forms_BorrowerSummaryOrigination", "SetBorrower","3319_SetBorrower"
			'"Forms_BorrowerSummaryOrigination", "SetProperty","3319_SetAppraisalValue"
			'"Forms_BorrowerSummaryOrigination", "SetTransactionDetails","3319_ConvFixedPurchase"
			'"Forms_BorrowerSummaryOrigination", "SetTransactionDetails","3319_ConvFixedRefi"
			'"Forms_RegZ-LE", "SetARM","3319_ARM"
			'"Forms_1003page", "SetLiabilities","3319_SetLiabilities"
			'"Forms_BorrowerSummaryOrigination", "SetMIPGuaranteeFeeCalculation","3319_ConvFixed"
			'"Forms_BorrowerSummaryOrigination", "VerifyMIPGuaranteeFeeCalc","3319_VerifyMipConv"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3320_Verify"
'@ Pre-conditions: 
'@ Description:  
	'@ TestSteps: 
		'1. Launch Encompass and login with Admin credentials.Create new loan.
		'2. Go to Borrower Summary - Origination form, enter the test data , save
		'3. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column.
		'4. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'5. Go to Tools > Amortization Schedule, verify.
		'7. (PTAC-2894)Launch Encompass and login with Admin credentials.Create new loan.
		'8. Go to Borrower Summary - Origination form, enter the test data, save
		'9. Go to 1003 Page2 > Liabilities. Enter test data.
		'10.In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column.
		'11.click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'12.Go to Tools > Amortization Schedule, verify.
	'@ ExpectedResult:
		'1.Should load the Encompass Home Page.
		'2.The new loan should be created and opened 
		'3.Validate the following for the fields listed below in MIP/PMI/Guarantee Fee Calculation pop-up window:
		'- field 1107 = 1.5% = $1,350
		'- field 1199 = 0.5%
		'- field 1198 = 120
		'- field 1201 = 0.25%
		'- field 1200 = 240 
		'- field 1205 = 78%
		'4.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display as '$38.06' for Mtg Ins (F232)
		'5.Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
			'1)'MI' Column should state $38.06  in the row 1
			'2)'Balance' column of $77,933.32 in the row 99 
			'3)The 'Payment' column should be $528.45 in the Row 1
			'4)The 'Payment' column drops down to $490.39 in row 100 
			'5)The 'Payment' column drops down to $487.55 for row 360
		'6.(PTAC-2894) Should load the Encompass Home Page.
		'7.The new loan should be created and opened 
		'8.Validate the following for the fields listed below in MIP/PMI/Guarantee Fee Calculation pop-up window:
		'- field 1107 = 1.5% = $1,350
		'- field 1199 = 0.5%
		'- field 1198 = 120
		'- field 1201 = 0.25%
		'- field 1200 = 240 
		'- field 1205 = 78%
		'9.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display as '$38.06' for Mtg Ins (F232)
		'10.Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
			'1)'MI' Column should state $38.06  in the row 1
			'2)'Balance' column of $77,933.32 in the row 99 
			'3)The 'Payment' column should be $528.45 in the Row 1
			'4)The 'Payment' column drops down to $490.39 in row 100 
			'5)The 'Payment' column drops down to $487.55 for row 360
			'6.(PTAC-2894) Should load the Encompass Home Page.
'**************************************************************************************************************
'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

FRM_Logger_ReportStepEvent "Scenario #1: Verify Amortization Schedule - Conventional Loans; Purchase/Refi; Fixed/ARM","Validate Amortization Schedule for Conventional Loans; Purchase/Refi; Fixed/ARM",Null
FRM_Logger_ReportStepEvent "Test Case #1: Verify Amortization Schedule - Conventional Loans; Purchase; Fixed","Validate Amortization Schedule for Conventional Loans; Purchase; Fixed",Null
'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new Conventional Loans; Purchase; Fixed","Started creating new Conventional Loans; Purchase; Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_Conv_FixedPurchase"
'BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_Fixed",strExpectedMtgIns,"Yes"

'===========================================Start Test Case#2 ==============================
FRM_Logger_ReportStepEvent "Test Case #2: Verify Amortization Schedule - Conventional Loans; Purchase; ARM with out Interest Only","Validate Amortization Schedule for Conventional Loans; Purchase; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to Conventional Loans; Purchase; ARM with out Interest Only","Started converting existing loan to Conventional Loans; Purchase; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_Conv_ARMPurchase"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_ARM",strExpectedMtgIns,"Yes"

'==================================================== Start Test Case#3 ==================================
FRM_Logger_ReportStepEvent "Test Case #3: Verify Amortization Schedule - Conventional Loans; Purchase; ARM with Interest Only","Validate Amortization Schedule for Conventional Loans; Purchase; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to Conventional Loans; Purchase; ARM with Interest Only","Started converting existing loan to Conventional Loans; Purchase; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_ARMIO",strExpectedMtgIns,"Yes"
'BIZ_Loan_Save()
BIZ_Loan_Exit False


'==========================================================Start Test Case#4 =========================
FRM_Logger_ReportStepEvent "Test Case #4: Verify Amortization Schedule - Conventional Loans; Cash Out Refi; Fixed","Validate Amortization Schedule for Conventional Loans; Cash Out Refi; Fixed",Null
'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new Conventional Loans; Cash Out Refi; Fixed","Started creating new Conventional Loans; Cash Out Refi; Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_Conv_FixedRefi"

BIZ_Forms_Open "1003 Page 2"
BIZ_1003Page2_SetLiabilities "3319_SetLiabilities"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns ="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_Fixed",strExpectedMtgIns,"Yes"

'===========================================Start Test Case#5 ==============================
FRM_Logger_ReportStepEvent "Test Case #5: Verify Amortization Schedule - Conventional Loans; Cash Out Refi; ARM with out Interest Only","Validate Amortization Schedule for Conventional Loans; Cash Out Refi; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to Conventional Loans; Cash Out Refi; ARM with out Interest Only","Started converting existing loan to Conventional Loans; Cash Out Refi; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_Conv_ARMRefi"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_ARM",strExpectedMtgIns,"Yes"

'==================================================== Start Test Case#6 ==================================
FRM_Logger_ReportStepEvent "Test Case #6: Verify Amortization Schedule - Conventional Loans; Cash Out Refi; ARM with Interest Only","Validate Amortization Schedule for Conventional Loans; Cash Out Refi; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to Conventional Loans; Cash Out Refi; ARM with Interest Only","Started converting existing loan to Conventional Loans; Cash Out Refi; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="38.06"
BIZ_Amortization_Schedule "Amortization_ConvLoan","Amortization_Conv_ARMIO",strExpectedMtgIns,"Yes"

'=================Log out Application===================
'BIZ_Loan_Save()
BIZ_Loan_Exit False
BIZ_Login_UserLogout
