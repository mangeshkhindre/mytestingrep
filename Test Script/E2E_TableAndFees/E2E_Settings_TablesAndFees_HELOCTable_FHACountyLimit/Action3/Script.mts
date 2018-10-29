'@**************************************************************************************************
'@ TestStory:PTAC-899 Tables and fees
'@ TestCase:
	'1 PTAC-248 Verify the pop up displays as exceeds limit based on FHA county Limit for Unit count 1, Unit count2, unit count3 and Unit count4
	'2 PTAC-249 Verify the pop up displays as exceeds limit based on FHA county Limit and able to hold the amount in Loan amount field for unit count 1,2,3 and 4	
'@ Test Automation JIRA Task: PTAC-1040 Settings_TablesAndFees_FHACountyLimit_Exceeds_HoldAndNotHoldAmount
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination, SetHeadInfo and PTAC-248
	'2 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-248
	'3 Forms_BorrowerSummaryOrigination, SetSSNVerificationBorrower and PTAC-248 
	'4 Forms_BorrowerSummaryOrigination, SetProperty and PTAC-248
	'5 Forms_BorrowerSummaryOrigination, SetCreditInformation and PTAC-248
	'6 Forms_BorrowerSummaryOrigination, SetTransactionDetails and PTAC-248		
	'7 Forms_1003page, SetTitleDetails and PTAC-248 
	'8 Forms_1003page, 1003Page1 and PTAC-248
	'9 Settings_TablesFees, FHACountyLimits and FHACtyLmts1
	'10 Settings_TablesFees, FHACountyLimits and FHACtyLmts2
'@ Pre-conditions: 
   '1 Go to Settings window > Tables and Fees > FHA County Limits 
'@ Description:  NA
'@ TestSteps:
	'Units 1
	'Test Data :Purchase Amount :300000, County Loan Limit 200000  
	 '1 Check the checkbox of Don't allow loan amount higher than maximum county limit to be entered.
 	 '2 Close Settings window.
	 '3 Create a new loan,
	 '4 set zip as 45502 and set Loan Type as FHA.
	 '5 Go to Borrower Summary Page, Check the check box of "Enforce county Limit"
	 '6 Go to Borrower page 1 and  set number units as 1 in filed of No. of units
	 '7 Go to Borrower page 1 and  Enter purchase price/Loan amount as defined in settings page
  	 '8 Check for pop-up enables to user as "Loan amount exceeds county limit"
	'Units 2
	'Test Data :Purchase Amount :450000, County Loan Limit 300000 
	 '1 Check the checkbox of Don't allow loan amount higher than maximum county limit to be entered.
	 '2 Close Settings window.
	 '3 Create a new loan,
	 '4 set zip as 45502 and set Loan Type as FHA.
	 '5 Go to Borrower Summary Page, Check the check box of "Enforce county Limit"
	 '6 Go to Borrower page 1 and  set number units as 2 in filed of No. of units
	 '7 Go to Borrower page 1 and  Enter purchase price/Loan amount as defined in settings page
	 '8 Check for pop-up enables to user as "Loan amount exceeds county limit"
	'Units 3
	'Test Data :Purchase Amount :550000, County Loan Limit 400000 
	 '1 Check the checkbox of Don't allow loan amount higher than maximum county limit to be entered.
	 '2 Close Settings window.
	 '3 Create a new loan,
	 '4 set zip as 45502 and set Loan Type as FHA.
	 '5 Go to Borrower Summary Page, Check the check box of "Enforce county Limit"
	 '6 Go to Borrower page 1 and  set number units as 3 in filed of No. of units
	 '7 Go to Borrower page 1 and  Enter purchase price/Loan amount as defined in settings page
	 '8 Check for pop-up enables to user as "Loan amount exceeds county limit"
	'Units 4
	'Test Data :Purchase Amount :650000, County Loan Limit 500000 
	 '1 Check the checkbox of Don't allow loan amount higher than maximum county limit to be entered.
	 '2 Close Settings window.
	 '3 Create a new loan,
	 '4 set zip as 45502 and set Loan Type as FHA.
	 '5 Go to Borrower Summary Page, Check the check box of "Enforce county Limit"
	 '6 Go to Borrower page 1 and  set number units as 4 in filed of No. of units
	 '7 Go to Borrower page 1 and  Enter purchase price/Loan amount as defined in settings page
	 '8 Check for pop-up enables to user as "Loan amount exceeds county limit"
'@ ExpectedResult:
    'Units 1: System displays pop-up to user about loan amount exceeds county limit and loan amount field should hold / not hold the amount
    'Units 2: System displays pop-up to user about loan amount exceeds county limit and loan amount field should hold / not hold the amount 
    'Units 3: System displays pop-up to user about loan amount exceeds county limit and loan amount field should hold / not hold the amount
    'Units 4: System displays pop-up to user about loan amount exceeds county limit and loan amount field should hold / not hold the amount
   
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

strRowID="PTAC-248"
strRowID2="FHACtyLmts1"
strRowIDUnit2="PTAC-248_Unit2"
strRowIDUnit3="PTAC-248_Unit3"
strRowIDUnit4="PTAC-248_Unit4"
'=========================Start Test Case #2 ===================
FRM_Logger_ReportStepEvent "Scenario #2: FHA County Limit Exceeds Hold and Not Hold Amount","Validate FHA County Limit Exceeds Hold and Not Hold Amount", Null 
FRM_Logger_ReportStepEvent "Test Case #1: Verify the pop up displays as exceeds limit based on FHA county Limit and able to not hold the amount in amount field for unit count 1,2,3 and 4" ,"Validate the pop up displays as exceeds limit based on FHA county Limit and able to not hold the amount in amount field for unit count 1,2,3 and 4", Null

'====== 'Go to Tables and Fees->FHA County Limits and 'Create and Verify FHACountyLoanLimits ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "FHA County Limits"
BIZ_Settings_TablesandFees_CreateFHACountyLoanLimits("FHACtyLmts1")
BIZ_Settings_TablesandFees_VerifyFHACountyLoanLimits("FHACtyLmts1")
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'====== 'Create Loan & Validate County Limit For Unit One  ======
FRM_Logger_ReportStepEvent "Start create a new FHA loan" ,"Started creating a new FHA loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"  							
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_1003Page1_SetTitleDetails strRowID
BIZ_1003Page1_SetData(strRowID)

'====== 'Validate County Limit For Unit One  ======
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowID,strRowID2,"Limit for Unit 1"

'====== 'Validate County Limit For Unit Two  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 2" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit2
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit2,strRowID2,"Limit for Unit 2"

'====== 'Validate County Limit For Unit Three  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 3" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit3
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit3,strRowID2,"Limit for Unit 3"

'====== 'Validate County Limit For Unit Three  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 4" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit4
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit4,strRowID2,"Limit for Unit 4"

'====== 'Loan Form Close' ======
BIZ_Loan_Exit False

'=========================Start Test Case #2 ===================
FRM_Logger_ReportStepEvent "Test Case #2: Verify the pop up displays as exceeds limit based on FHA county Limit and able to hold the amount in amount field for unit count 1,2,3 and 4" ,"Validate the pop up displays as exceeds limit based on FHA county Limit and able to hold the amount in amount field for unit count 1,2,3 and 4", Null
strRowID="PTAC-249"
strRowID2="FHACtyLmts2"
strRowIDUnit2="PTAC-249_Unit2"
strRowIDUnit3="PTAC-249_Unit3"
strRowIDUnit4="PTAC-249_Unit4"

'====== Navigate to Encompass->Settings ->Tables and Fees->FHA County Limits and Create and Verify FHACountyLoanLimits ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "FHA County Limits"
BIZ_Settings_TablesandFees_CreateFHACountyLoanLimits("FHACtyLmts2")
BIZ_Settings_TablesandFees_VerifyFHACountyLoanLimits("FHACtyLmts2")
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'====== 'Create Loan & Validate County Limit For Unit One  ======
FRM_Logger_ReportStepEvent "Start create a new FHA loan" ,"Started creating a new FHA loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"  							
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_1003Page1_SetTitleDetails strRowID
BIZ_1003Page1_SetData(strRowID)

'====== 'Validate County Limit For Unit One  ======
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowID,strRowID2,"Limit for Unit 1"

'====== 'Validate County Limit For Unit Two  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 2" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit2
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit2,strRowID2,"Limit for Unit 2"

'====== 'Validate County Limit For Unit Three  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 3" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit3
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit3,strRowID2,"Limit for Unit 3"

'====== 'Validate County Limit For Unit Three  ======
FRM_Logger_ReportInfoEvent "Modify Existing Loan","Set Tansaction Detail, County, No.Of Units for Unit 4" , null
BIZ_Settings_TableAndFees_1003Page1_Units_SetData strRowIDUnit4
BIZ_Settings_TablesandFees_VerifyCountyLimit strRowIDUnit4,strRowID2,"Limit for Unit 4"

'====== 'Loan Form Close' ======
BIZ_Loan_Exit False

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
