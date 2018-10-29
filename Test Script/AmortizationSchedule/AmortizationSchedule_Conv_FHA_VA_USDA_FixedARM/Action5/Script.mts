'@**********************************************************************************************************
'@ TestStory: PTAC-3319 Amortization Schedule
'@ TestCase: 
		'PTAC-2876 Amortization Schedule - USDA Loans; Purchase; Fixed - Guarantee Fee Financed
		'PTAC-2891 Amortization Schedule - USDA Loans; Purchase; Fixed - Guarantee Fee NOT Financed	
		'PTAC-2889 USDA Loans; Purchase; ARM w/o IO - Guarantee Fee Financed
		'PTAC-2890 USDA Loans; Purchase; ARM with IO - Guarantee Fee Financed
		'PTAC-2892 USDA Loans; Purchase; ARM w/o IO - Guarantee Fee NOT Financed
		'PTAC-2893 USDA Loans; Purchase; ARM with IO - Guarantee Fee NOT Financed
'@ Test Automation JIRA Task:  PTAC-3451
'@ TestData: "Global_Data","Login","admin_core2p"
			'"Forms_BorrowerSummaryOrigination","SetBorrower","3319_SetBorrower"
			'"Forms_BorrowerSummaryOrigination","SetProperty","3319_SetAppraisalValue"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","3319_UsdaFixedPurchase"
			'"Forms_BorrowerSummaryOrigination","SetMIPGuaranteeFeeCalculation","3319_Usda"
			'"Forms_BorrowerSummaryOrigination","SetMIPGuaranteeFeeCalculation","3319_UsdaWithoutGuaranteeFee"
			'"Forms_BorrowerSummaryOrigination","VerifyMIPGuaranteeFeeCalc","3319_VerifyMipUsda"
			'"Forms_BorrowerSummaryOrigination","VerifyMIPGuaranteeFeeCalc","3319_UsdaNoGuaranteeFee"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3450_UsdaFixed"
			'"Tools_AmortizationSchedule","VerifyAmortizationScheduleCalc","3450_UsdaFixedNoGuaranteeFee"
'@ Pre-conditions: 
'@ Description:  
	'@ TestSteps: 
		'1. Launch Encompass and login with Admin credentials.Create new loan.
		'2. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'3. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'4. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'5. Go to Tools > Amortization Schedule, verify.
		'6. (PTAC-2891) Launch Encompass and login with Admin credentials.Create new loan.
		'7. Go to Borrower Summary - Origination form, enter the test data without Interest Only, save
		'8. In Borrower Summary - Origination > Transaction details section, click on the Edit icon next to F912 and 
		'	Click on the Edit icon next to field 232, enter the data mentioned in test data column,
		'9. click OK button in the MI pop up window, verify the Mtg Ins(F232) in the Quick Entry - Total Monthly Payment window
		'10. Go to Tools > Amortization Schedule, verify.
	'@ ExpectedResult:
		'1. Should load the Encompass Home Page.
		'2. The new loan should be created and opened 
		'3. Validate the following for the fields listed below in MIP/PMI/Guarantee Fee Calculation pop-up window:
		'- Guarantee Fee Amount = $1,836.72
		'- Total Loan Amount = $91,836.00
		'- Cancel At (Field 1205) = should be grayed out
		'4.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display as '$60.81' for Other (F234)
		'5. Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
		' In the row 1, the below values should be displayed,
		'- Ave. Annual UPB:  $91,220.56
		'- Annual Fee:  $729.76
		'- Monthly Amount:  $60.81
		'- Monthly Payment:  $553.81
		' In the row 349, the below values should be displayed.
		'- Ave. Annual UPB:  $3,139.65
		'- Annual Fee:  $25.12
		'- Monthly Amount:  $2.09
		'- Monthly Payment:  $495.09
		'6.(PTAC-2891) Should load the Encompass Home Page.
		'7. The new loan should be created and opened 
		'8. Validate the following for the fields listed below in MIP/PMI/Guarantee Fee Calculation pop-up window:
		'- Guarantee Fee Amount = $1,800.00
		'- Total Loan Amount = $90,000.00
		'- Cancel At (Field 1205) = should be grayed out
		'9.The MIP/PMI/Gurantee Fee calculation window should be closed.
		' should display as '$59.60' for Other (F234)
		'10.Amortization Schedule tool should have default option as 'Complete Schedule' and should display with below details,
		' In the row 1, the below values should be displayed,		
		'- Ave. Annual UPB:  $89,396.90
		'- Annual Fee:  $715.18
		'- Monthly Amount:  $59.60
		'- Monthly Payment:  $542.74
		'' In the row 349, the below values should be displayed.
		'- Ave. Annual UPB:  $3,079.88
		'- Annual Fee:  $24.64
		'- Monthly Amount:  $2.05
		'- Monthly Payment:  $485.19
'@**********************************************************************************************************

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #4: Verify Amortization Schedule - USDA Loans; Purchase; Fixed - Guarantee Fee Financed/Guarantee Fee NOT Financed","Validate Amortization Schedule for USDA Loans;  Purchase; Fixed - Guarantee Fee Financed/Guarantee Fee NOT Financed",Null
FRM_Logger_ReportStepEvent "Test Case #1: Verify Amortization Schedule - USDA Loans; Construction Only; Fixed","Validate Amortization Schedule for USDA Loans; Construction Only; Fixed",Null

'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new USDA Loans; Purchase; Fixed - Guarantee Fee Financed","Started creating new USDA Loans; Purchase; Fixed - Guarantee Fee Financed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_USDA_FixedPurchase"
'BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="60.81"
BIZ_Amortization_Schedule_USDA "Amortization_USDALoan","Amortization_USDA_Fixed",strExpectedMtgIns	

'===========================================Start Test Case#2 ==============================
FRM_Logger_ReportStepEvent "Test Case #2: Verify Amortization Schedule - USDA Loans; Purchase - Guarantee Fee Financed; ARM with out Interest Only","Validate Amortization Schedule for USDA Loans; Purchase - Guarantee Fee Financed; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to USDA Loans; Purchase; ARM with out Interest Only","Started converting existing loan to USDA Loans; Purchase; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_USDA_ARMPurchase"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="60.81"
BIZ_Amortization_Schedule_USDA "Amortization_USDALoan","Amortization_USDA_ARM",strExpectedMtgIns

'==================================================== Start Test Case#3 ==================================
FRM_Logger_ReportStepEvent "Test Case #3: Verify Amortization Schedule - USDA Loans; Purchase - Guarantee Fee Financed; ARM with Interest Only","Validate Amortization Schedule for USDA Loans; Purchase - Guarantee Fee Financed; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to USDA Loans; Purchase; ARM with Interest Only","Started converting existing loan to USDA Loans; Purchase; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="60.80"
BIZ_Amortization_Schedule_USDA "Amortization_USDALoan","Amortization_USDA_ARMIO",strExpectedMtgIns
'BIZ_Loan_Save()
BIZ_Loan_Exit False


'==========================================================Start Test Case#4 =========================
FRM_Logger_ReportStepEvent "Test Case #4: Verify Amortization Schedule - USDA Loans; Purchase; Fixed - Guarantee Fee Not Financed","Validate Amortization Schedule for USDA Loans; Purchase; Fixed - Guarantee Fee Not Financed",Null
'====== 'Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new USDA Loans; Purchase; Fixed - Guarantee Fee Not Financed","Started creating new USDA Loans; Purchase; Fixed - Guarantee Fee Not Financed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_USDA_FixedPurchase"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns ="59.60"
BIZ_Amortization_Schedule_USDA "Amortization_USDANoGuaranteeFee","Amortization_USDA_FixedNoGuaranteeFee",strExpectedMtgIns

'===========================================Start Test Case#5 ==============================
FRM_Logger_ReportStepEvent "Test Case #5: Verify Amortization Schedule - USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with out Interest Only","Validate Amortization Schedule for USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with out Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with out Interest Only","Started converting existing loan to USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with out Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_USDA_ARMPurchase"

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"
BIZ_Loan_Save()

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.60"
BIZ_Amortization_Schedule_USDA "Amortization_USDANoGuaranteeFee","Amortization_USDA_NoGuarantee_ARM",strExpectedMtgIns

'==================================================== Start Test Case#6 ==================================
FRM_Logger_ReportStepEvent "Test Case #6: Verify Amortization Schedule - USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with Interest Only","Validate Amortization Schedule for USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with Interest Only",Null
FRM_Logger_ReportInfoEvent "Star convert existing loan to USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with Interest Only","Started converting existing loan to USDA Loans; Purchase - Guarantee Fee NOT Financed; ARM with Interest Only",Null

BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_ARM_InterestOnly"

'===========Validate cell data in Amortization Schedule Tool ===========
strExpectedMtgIns="59.59"
BIZ_Amortization_Schedule_USDA "Amortization_USDANoGuaranteeFee","Amortization_USDA_NoGuarantee_ARMIO",strExpectedMtgIns

'=================Log out Application===================
'BIZ_Loan_Save()
BIZ_Loan_Exit False
BIZ_Login_UserLogout
