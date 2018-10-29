'@**********************************************************************************************************
'@ TestStory: PTAC-3319 Amortization Schedule
'@ TestCase: 
		'PTAC-1552 Amortization Schedule - FHA Loans; Purchase; Fixed
		'PTAC-2908 Amortization Schedule - FHA Loans; Refi; Fixed	
		'PTAC-2871 Amortization Schedule - FHA Loans; Purchase; ARM w/o IO
		'PTAC-2872 Amortization Schedule - FHA Loans; Purchase; ARM with IO
		'PTAC-2909 Amortization Schedule - FHA Loans; Refi; ARM w/o IO
		'PTAC-2910 Amortization Schedule - FHA Loans; Refi; ARM with IO		
'@ Test Automation JIRA Task:  PTAC-3441
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","3319_SetBorrower"
			'"Forms_BorrowerSummaryOrigination","SetProperty","3319_SetAppraisalValue"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_FHAFixedPurchase"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_FHAFixedRefi"
			'"Forms_1003","SetLiabilities","3319_SetLiabilities"
			'"Forms_BorrowerSummaryOrigination","SetMIPGuaranteeFeeCalculation","3319_FHA"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3441_FHAFixed"
'@ Pre-conditions: 
'@ Description:  
	'@ TestSteps: 
		'1. Launch Encompass and login with Admin credentials.Create new loan.
		'2. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'3. HUD-92900LT FHA Loan Transmittal Form:Case # Assigned Date (3042):  1/9/2017
		'4. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'5. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'6. Go to Tools > Amortization Schedule, verify.
		'7. (PTAC-2908) Launch Encompass and login with Admin credentials.Create new loan.
		'8. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'9. HUD-92900LT FHA Loan Transmittal Form:Case # Assigned Date (3042):  1/9/2017
		'10. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'11. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'12. Go to Tools > Amortization Schedule, verify. 
	'@ ExpectedResult:
		'1. Should load the Encompass Home Page.
		'2. The new loan should be created and opened 
		'3. Data should be entered successfully
		'4.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display "59.60" for Mtg. Ins (F232)
		'5. Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,			
			'1)The 'Payment' column should be $551.19 for row 1 
			'2)The 'Payment' column should be $550.28 for row 13 
			'3)The 'Payment' column should be $549.33 for row 25 
			'4)The 'Payment' column should be $548.33 for row 37 
			'5)The 'Payment' column should be $547.28 for row 49 
			'6)The 'Payment' column should be $546.17 for row 61 
			'7)The 'Payment' column should be $545.01 for row 73 
			'8)The 'Payment' column should be $543.79 for row 85 
			'9)The 'Payment' column should be $542.50 for row 97 
			'10)The 'Payment' column should be $541.15 for row 109 
			'11)The 'Payment' column should be $539.73 for row 121 
			'12)The 'Payment' column is $491.59 for row 133 
			'13)The 'Payment' column is $495.05 for row 360
			'14)'FHA Payment' column is $483.14 for row 1 
			'15)'FHA Payment' column is $482.72 for row 360
			'16)'FHA Balance' column should be $71,020.84 in row 132
			'17)'MI' Column should be $59.60 for row 1 
			'18)'MI' Column should be $58.69 for row 13 
			'19)'MI' Column should be $57.74 for row 25 
			'20)'MI' Column should be $56.74 for row 37 
			'21)'MI' Column should be $55.69 for row 49
			'22)'MI' Column should be $54.58 for row 61 
			'23)'MI' Column should be $53.42 for row 73 
			'24)'MI' Column should be $52.20 for row 85 
			'25)'MI' Column should be $50.91 for row 97 
			'26)'MI' Column should be $49.56 for row 109 
			'27)'MI' Column should be $48.14 for row 121 
		'6.(PTAC-2908) Should load the Encompass Home Page.
		'7. The new loan should be created and opened 
		'8. Data should be entered successfully
		'9.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display "59.60" for Mtg. Ins (F232)
		'10. Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
			'validations in step 5
'@**************************************************************************************************************************
'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #2: Verify Amortization Schedule - FHA Loans; Purchase/Refi; Fixed/ARM","Validate Amortization Schedule for FHA Loans; Purchase/Refi; Fixed/ARM",Null
FRM_Logger_ReportStepEvent "Test Case #1: Verify Amortization Schedule - FHA Loans; Purchase; Fixed","Validate Amortization Schedule for FHA Loans; Purchase; Fixed",Null

'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new FHA Loans; Purchase; Fixed","Started creating new FHA Loans; Purchase; Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_FHA_FixedPurchase"
'set Case# Assigned Date 3042
BIZ_Forms_Open "HUD-92900LT FHA Loan Transmittal"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox2"),Date()
'BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.60"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_Fixed",strExpectedMtgIns,"No"

'===========================================Start Test Case#2 ==============================
FRM_Logger_ReportStepEvent "Test Case #2: Verify Amortization Schedule - FHA Loans; Purchase; ARM with out Interest Only","Validate Amortization Schedule for FHA Loans; Purchase; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to FHA Loans; Purchase; ARM with out Interest Only","Started converting existing loan to FHA Loans; Purchase; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_FHA_ARMPurchase"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.60"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_ARM",strExpectedMtgIns,"No"

'==================================================== Start Test Case#3 ==================================
FRM_Logger_ReportStepEvent "Test Case #3: Verify Amortization Schedule - FHA Loans; Purchase; ARM with Interest Only","Validate Amortization Schedule for FHA Loans; Purchase; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to FHA Loans; Purchase; ARM with Interest Only","Started converting existing loan to FHA Loans; Purchase; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.59"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_ARMIO",strExpectedMtgIns,"No"
'BIZ_Loan_Save()
BIZ_Loan_Exit False


'==========================================================Start Test Case#4 =========================
FRM_Logger_ReportStepEvent "Test Case #4: Verify Amortization Schedule - FHA Loans; Cash Out Refi; Fixed","Validate Amortization Schedule for FHA Loans; Cash Out Refi; Fixed",Null
'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new FHA Loans; Cash Out Refi; Fixed","Started creating new FHA Loans; Cash Out Refi; Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_FHA_FixedRefi"
'set Case# Assigned Date 3042
BIZ_Forms_Open "HUD-92900LT FHA Loan Transmittal"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox2"),Date()

BIZ_Forms_Open "1003 Page 2"
BIZ_1003Page2_SetLiabilities "3319_SetLiabilities"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns ="59.60"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_Fixed",strExpectedMtgIns,"No"

'===========================================Start Test Case#5 ==============================
FRM_Logger_ReportStepEvent "Test Case #5: Verify Amortization Schedule - FHA Loans; Cash Out Refi; ARM with out Interest Only","Validate Amortization Schedule for FHA Loans; Cash Out Refi; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to FHA Loans; Cash Out Refi; ARM with out Interest Only","Started converting existing loan to FHA Loans; Cash Out Refi; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_FHA_ARMRefi"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.60"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_ARM",strExpectedMtgIns,"No"

'==================================================== Start Test Case#6 ==================================
FRM_Logger_ReportStepEvent "Test Case #6: Verify Amortization Schedule - FHA Loans; Cash Out Refi; ARM with Interest Only","Validate Amortization Schedule for FHA Loans; Cash Out Refi; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to FHA Loans; Cash Out Refi; ARM with Interest Only","Started converting existing loan to FHA Loans; Cash Out Refi; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.59"
BIZ_Amortization_Schedule "Amortization_FHALoan","Amortization_FHA_ARMIO",strExpectedMtgIns,"No"

'=================Log out Application===================
'BIZ_Loan_Save()
BIZ_Loan_Exit False
BIZ_Login_UserLogout
