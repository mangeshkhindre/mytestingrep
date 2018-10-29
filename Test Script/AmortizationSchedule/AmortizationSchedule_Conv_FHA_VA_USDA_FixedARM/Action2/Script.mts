'@**********************************************************************************************************
'@ TestStory: PTAC-3319 Amortization Schedule
'@ TestCase:
		'PTAC-2873 Amortization Schedule - VA Loans; Construction Only; Fixed	
		'PTAC-2874 Amortization Schedule - VA Loans; Construction Only; ARM w/o IO
		'PTAC-2875 Amortization Schedule - VA Loans; Construction Only; ARM with IO				
'@ Test Automation JIRA Task:  PTAC-3453
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","3319_SetBorrower"
			'"Forms_BorrowerSummaryOrigination","SetProperty","3319_SetAppraisalValue"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_VaArm"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_InterestOnly"
				'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_VaFixed"
			'"Forms_BorrowerSummaryOrigination","SetMIPGuaranteeFeeCalculation","3319_VaLoans"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3452_VAFixed"
			'"Forms_RegZ-LE","SetARM","3319_VaArm"
			'"Forms_BorrowerSummaryOrigination","SetMIPGuaranteeFeeCalculation","3319_VaLoans"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3453_VAARM"
'@ Pre-conditions: 
'@ Description:  
	'@ TestSteps: 
		'1. Launch Encompass and login with Admin credentials.Create new loan.
		'2. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'3. VA Management form, Type of Veteran (VAVOB.X72):  Regular Military
		'4. Go to RegZ LE > Adjustable Rate Mortgage section, enter the data mentioned in test data, save
		'4. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'5. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'6. Go to Tools > Amortization Schedule, verify.
		'7. (PTAC-2875) Launch Encompass and login with Admin credentials.Create new loan.
		'8. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'9. VA Management form, Type of Veteran (VAVOB.X72):  Regular Military
		'10. Go to RegZ LE > Adjustable Rate Mortgage section, enter the data mentioned in test data, save
		'11. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'12. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'13. Go to Tools > Amortization Schedule, verify. 
	'@ ExpectedResult:
		'1. Should load the Encompass Home Page.
		'2. The new loan should be created and opened 
		'3. Data should be entered successfully
		'4.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display blank value for Mtg. Ins (F232)
		'5. Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
			'1)The 'Payment' column should be $189.84 in the Row 1
			'2)The 'Payment' column should be $151.88 in the Row 13
			'3)The 'Payment' column should be $136.00 in the Row 25
			'4)The 'Payment' column should be $91,261.00 in the Row 360
			'5)'MI' column should be $0 for row 1
			'6)The 'Principal' column should be $0 for row 1
			'7)The 'Principal' column should be $91,125.00 for row 360
		'6. (PTAC-2875)Should load the Encompass Home Page.
		'7. The new loan should be created and opened 
		'8. Data should be entered successfully
		'9.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display blank value for Mtg. Ins (F232)
		'10. Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
			'1)The 'Payment' column should be $189.84 in the Row 1
			'2)The 'Payment' column should be $151.88 in the Row 13
			'3)The 'Payment' column should be $136.00 in the Row 25
			'4)The 'Payment' column should be $91,261.00 in the Row 360
			'5)'MI' column should be $0 for row 1
			'6)The 'Principal' column should be $0 for row 1
			'7)The 'Principal' column should be $91,125.00 for row 360
'@**************************************************************************************************************************

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #3: Verify Amortization Schedule - VA Loans; Construction Only; Fixed/ARM","Validate Amortization Schedule for VA Loans; Construction Only; Fixed/ARM",Null
FRM_Logger_ReportStepEvent "Test Case #1: Verify Amortization Schedule - VA Loans; Construction Only; Fixed","Validate Amortization Schedule for VA Loans; Construction Only; Fixed",Null

'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new VA Loan; Construction Only and Amortization type as Fixed","Started creating new VA Loan; Construction Onlyand Amortization type as Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_VA_Fixed"
BIZ_VAManagement_BasicInfo "Amortization_VA_Loan"
'BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns = ""
BIZ_Amortization_Schedule "Amortization_VALoan","Amortization_VA_Fixed",strExpectedMtgIns,"No"

'===================================set test data in ARM section RegZ-LE form========
FRM_Logger_ReportStepEvent "Test Case #2: Verify Amortization Schedule - VA Loans; Construction Only; Amortization type as ARM with out Interest Only","Validate Amortization Schedule for VA Loans; Construction Only; Amortization type as ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to VA Loan; Construction Only and Amortization type as ARM with out Interest Only","Started converting existing loan to VA Loan; Construction Only and Amortization type as ARM with out Interest Only",Null
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_VA_ARM"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_VA_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns = ""
BIZ_Amortization_Schedule "Amortization_VALoan","Amortization_VA_ARM",strExpectedMtgIns,"No"

'===================================set test data in ARM section RegZ-LE form========
FRM_Logger_ReportStepEvent "Test Case #3: Verify Amortization Schedule - VA Loans; Construction Only; Amortization type as ARM with Interest Only","Validate Amortization Schedule for VA Loans; Construction Only; Amortization type as ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to VA Loan; Construction Only and Amortization type as ARM with Interest Only","Started converting existing loan to VA Loan; Construction Only and Amortization type as ARM with Interest Only",Null
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"
'BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns = ""
BIZ_Amortization_Schedule "Amortization_VALoan","Amortization_VA_ARM",strExpectedMtgIns,"No"

BIZ_Loan_Exit False
BIZ_Login_UserLogout
