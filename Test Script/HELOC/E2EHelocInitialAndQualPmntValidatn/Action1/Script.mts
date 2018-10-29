'@*******************************************************+9*******************************************
'@ TestStory: CBIZ-17760 - Implement new HELOC Qualifying Payment Calcs 
'@ TestCase: CBIZ-17986 -Implement new HELOC Initial Payment Calcs
'@ Test Automation JIRA Task: CTA-425 - alidate HELOC Initial and Qualifying payment calculation depending on the Rate and other check boxes
'@ TestData:	BorrowerSummaryOrigination, SetBorrower, "E2E_HELOC_InitialPayment"
'				BorrowerSummaryOrigination, SetTransactionDetails, "E2E_HELOC_InitialPayment"
'				BorrowerSummaryOrigination, SetCoBorrower, "E2E_KBYO2_NBO"
'				Forms_ClosingDisclosurePage, SetClosingInformation, "E2E_HELOC_InitialPayment"
'				Forms_RegZ-LE, SetConstruction,"E2E_HELOC_InitialPayment"
'								SetHELOCDetails,Multiple Iterations.....
'				
'@ Pre-conditions: NA
'@ Description:  
	'@ Test Step
	'1. Login to Encompass
	'2. Go to Forms>>Borrower Summary Origination. Input data.
	'3. Go to Forms>>Closing Disclosure Page. Input data.
	'4. Go to Forms>>RegZ LE Page. Input data.
	'5. Validate Qualifying payment and Initial payment for the input data
	
'@Expected Results
	'5. Go to REGZ LE page.Enter different input combinations within Qualifying Payment Basis section.
	' 	Capture the Initial draw from RegZ LE Form.
	' 	Verify First qualifying Payment section with 1724 Field ID
	' 	Go to "Initial payment" section and generate different Input Combinations
	'	Verify the "Heloc Initial Payment" from Field ID: 5
'******************************************************************************************************************************************

FRM_RT_SetupTest(null)

'======== Login to the Encompass as Admin ========   
BIZ_Login_UserLogin "admin_default"


strRowID = "E2E_HELOC_InitialPayment"
FRM_Logger_ReportStepEvent "Start test case","Validation for E2E HELOC Payment",Null

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

'===== Enter data in Borrower Summary Origination =======
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_ClosingDisclosurePage1_SetClosingInformation strRowID

'======== Navigate to REG_Z LE Page for HELOC Qualifying payments========
BIZ_RegZ_LE_SetConstructionMortgage strRowID
BIZ_RegZ_LE_SetAdjustableRateMortgage strRowID

Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_1")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_2")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_3")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_4")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_5")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_6")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_7")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_8")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_9")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_10")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_11")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_12")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_13")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_14")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_15")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_16")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_17")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_18")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_19")
Call BIZ_ValidateHelocInitAndQual("E2E_HELOC_InitialPayment_IniDrawRate_20")



'======== Logout ========== 
BIZ_Login_UserLogout

FRM_RT_TeardownTest Null

