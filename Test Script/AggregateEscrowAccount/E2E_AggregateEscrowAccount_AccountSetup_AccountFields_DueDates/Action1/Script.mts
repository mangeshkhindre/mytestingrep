'@**************************************************************************************************
'@ TestStory: PTAC- 2727 Re-Enforcement Aggregate Escrow Account
'@ TestCase: PTAC-2176 Aggregate Escrow Account - Validate Initial Escrow Account Setup Due Dates and Aggregate Escrow Account Fields
'@ Test Automation JIRA Task: PTAC-2728 E2E_AggregateEscrowAccount_ValidateInitialEscAccSetupDueDatesAndEscAccFields
'@ TestData: 'Forms_AggregateEscrowAccount, SetData, PTAC-2176_SetData
'@ Pre-conditions: 
'@ Description:
 '@ TestSteps:
	'1. Log into Encompass as Admin user
	'2. Click on 'Pipeline' tab and add a new blank loan
	'3. Click on 'Show All' checkbox in bottom left corner and enter 'Aggregate Escrow Account' screen
	'4. Enter data according to 'Test Data' column under 'Aggregate Escrow Screen' section
	'5. Click on 'Setup' button and enter data according to 'Test Data' column under 'Initial Escrow Account Setup' section
	'6. Validate Expected Results 'A'
	'7. Click on 'OK' and close 'Initial Escrow Account Setup' pop up
	'8. Validate Expected Results 'B'
	'9. Scroll down and validate Expected Results 'C'
'@ ExpectedResult:
	'A: 
	'HUD0313 (02/2013 for Taxes) = 6
	'HUD1013 (09/2013 for Taxes) = 6
	'HUD1114 (10/2013 for Haz Ins) = 12
	'
	'
	'B:
	'HUD23 (Starting Balance) = $150
	'HUD40 (Single Line Analysis) = $350
	'F558 (Aggregate Escrow Adjustment) = $-200
	'HUD 25 (Ending Balance) = $5,550
	'HUD26 (Total Monthly Payment) = $150
	'HUD24 (Escrowed Payment) = $150
	'
	'
	'C:
	'HUD0302, HUD1002, HUD1103, HUD0310, HUD1010, HUD1110  = $600 each
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2728", "Script Name - E2E_AggregateEscrowAccount_ValidateInitialEscAccSetupDueDatesAndEscAccFields", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2176", "Aggregate Escrow Account - Validate Initial Escrow Account Setup Due Dates and Aggregate Escrow Account Fields", Null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline" 

'====== Set Data in Aggregate Escrow Account Screen and Initial Escrow Account SetUp Screen ======
BIZ_AggregateEscrowAccount_SetData "PTAC-2176_SetData"
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "PTAC-2176_SetData"

'====== Validate Initial Escrow Account Setup Due Dates and Aggregate Escrow Account Fields ======
AggregateEscrowAccount_InitialEscrowAccountSetUp_ValidateDueDate "PTAC-2176_SetData"
AggregateEscrowAccount_ValidateAggregateEscrowAccountFields "PTAC-2176_SetData"

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
