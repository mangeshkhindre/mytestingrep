'@**************************************************************************************************
'@ TestStory: PTAC- 2727 Re-Enforcement Aggregate Escrow Account
'@ TestCase: PTAC-2177 Aggregate Escrow Account -  Validate 'Escrow 1st Payment Date Basis' in Aggregate Escrow Account for Construction-Perm Loan
'@ Test Automation JIRA Task: PTAC-2729  E2E_AggregateEscrowAccount_ValidateEscrowFirstPaymentDateBasis
'@ TestData: 
	'Forms_AggregateEscrowAccount, SetData, PTAC-2177_SetData
	'Forms_RegZ_CD, RegZ_CD, PTAC-2177_SetData
	'Forms_RegZ_CD, SetConstruction, PTAC-2177_SetData
'@ Pre-conditions: 
'@ Description:
 '@ TestSteps:
	'1. Log into Encompass as Admin user
	'2. Click on 'Pipeline' tab and add a new blank loan
	'3. Click on REG-Z - CD Form and enter data according to 'Test Data' column.
	'4. Click on 'Show All' checkbox in bottom left corner and enter 'Aggregate Escrow Account' screen
	'5. Validate Expected Results 'A'
	'6. Select 'Escrow 1st Payment Date Basis' (HUD69 dropdown) option as '1st Amort Date' option. 
	'7. Validate Expected Results 'B'	
'@ ExpectedResult:
	'A:
	'HUD69 (Escrow 1st Payment Date Basis) = Enabled
	'HUD68 (Escrow 1st Payment Date)= 12/01/2012
	'
	'B:
	'HUD68 (Escrow 1st Payment Date) = 12/01/2013	
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2729", "Script Name - E2E_AggregateEscrowAccount_ValidateEscrowFirstPaymentDateBasis", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2177", "Aggregate Escrow Account - Validate 'Escrow 1st Payment Date Basis' in Aggregate Escrow Account for Construction-Perm Loan", Null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline" 
BIZ_RegZ_CD_SetData "PTAC-2177_SetData"
BIZ_RegZ_CD_SetConstructionMortgage "PTAC-2177_SetData"
BIZ_Forms_Open "Aggregate Escrow Account"
AggregateEscrowAccount_ValidateEscrowFirstPaymentDateBasis "PTAC-2177_SetData", "1st Payment Date"
BIZ_AggregateEscrowAccount_SetData "PTAC-2177_SetData"
AggregateEscrowAccount_ValidateEscrowFirstPaymentDateBasis "PTAC-2177_SetData", "1st Amort Date"

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
