'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase: PTAC-612 - TC #2 (CBIZ-1477) - Construction-to-Perm Loans - CD Loan Calculations Table logic (USDA)  
'@ Test Automation JIRA Task:  PTAC-1646 ConstructionManagement_ConstructioPerm_CDLoan_USDAandNonUSDA
'@ TestData:
   '01 ConstructionManagement,SetLoanInfo,1352_ConstrPerm_NonUSDA
   '02 Forms_ClosingDisclosurePage,SetClosingInformation,1352_ConstrPerm_NonUSDA
   '03 Forms_AggregateEscrowAccount,SetData,1352_ConstrPerm_NonUSDA
   '04 Forms_BorrowerSummaryOrigination,SetBorrower,1352_ConstrPerm_NonUSDA
   '05 Forms_RegZ-LE,SetConstruction,1352_ConstrPerm_NonUSDA
   '06 Forms_RegZ_CD,SetConstruction,1352_ConstrPerm_NonUSDA
   '07 Forms_2015Itemization,Set800Section,1352_ConstrPerm_NonUSDA
   '08 Forms_2015Itemization,Set1000Section,1352_ConstrPerm_NonUSDA
   '09 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_834
   '10 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_835
   '11 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_1115
   '12 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_1116
'@ Pre-conditions: Construction-to-Perm Loans - CD Loan Calculations Table logic (Non-USDA)
'@ Description: 
'@ TestSteps:
   '1 Log into Encompass as Admin/password
   '2 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '3 Click on New Bank Loan button
   '4 Enter the data mentioned in Test Data column, save
   '5 Navigate to CD Page 5 Form and verify the Loan calculations section
'@ ExpectedResult:
   '1 Admin should be able to login successfully
   '2 New Loan pop up displayed
   '3 It navigates to Loan tab
   '4 The Loan is created.
   '5 It should display the Loan Calculations section as below,	
	'Total of Payments (CD5.X1) = $184,613.05
	'Finance Charge (1206) = $82,886.60
	'Amount Finance (948) = $100000
	'APR (799) = 4.611%
	'TIP (LE3.X16) = 73.879
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-612","Test Case:TC #2 (CBIZ-1477) - Construction-to-Perm Loans - CD Loan Calculations Table logic (USDA)", Null

'Navigate to Pipeline>>Construction Management
BIZ_Nav_Pipeline_Forms_FormType "My Pipeline","Construction Management"

'Set data in CM page 
BIZ_ConstructionManagement_SetLoanInfoDetails "1352_ConstrPerm_USDA"

'Set data in Closing Disclosure page 1
BIZ_ClosingDisclosurePage1_SetClosingInformation "1352_ConstrPerm_USDA"
 
'Set data in Aggregate Escrow Account Page
BIZ_Forms_AggregateEscrowAccount_SetData "1352_ConstrPerm_USDA"

'Set data in BSO form
BIZ_BorrowerSummaryOrigination_SetBorrower "1352_ConstrPerm_USDA"

'Set data in RegZ-LE Page
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "1352_ConstrPerm_USDA"

'Set data in RegZ-CD page
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetConstructionMortgage "1352_ConstrPerm_USDA"
BIZ_Common_RegZ_CD_SetMiandPiDetails "1352_ConstrPerm_USDA"
BIZ_RegZ_CD_SetData "1352_ConstrPerm_NonUSDA"

'Set data in 2015 itemization form
BIZ_Forms_Open "2015 Itemization"

'Set Data in 800 section of 2015 ItemizationPage
BIZ_2015Itemization_Set800Section "1352_ConstrPerm_USDA"

'Set fee details data in 834 section of 2015 ItemizationPage
BIZ_2015Itemization_SetFeeDetails "834","1352_ConstrPerm_USDA_834"
BIZ_2015Itemization_FeeDetails_ClickCheckbox "834",Array("Seller Obligated")

'Set fee details data in 835 section of 2015 ItemizationPage
BIZ_2015Itemization_SetFeeDetails "835","1352_ConstrPerm_USDA_835"
BIZ_2015Itemization_FeeDetails_ClickCheckbox "835",Array("Seller Obligated")

'Set fee details data in 1115 section of 2015 ItemizationPage
BIZ_2015Itemization_SetFeeDetails "1115","1352_ConstrPerm_USDA_1115"
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1115",Array("Seller Obligated")

'Set fee details data in 1116 section of 2015 ItemizationPage
BIZ_2015Itemization_SetFeeDetails "1116","1352_ConstrPerm_USDA_1116"
BIZ_2015Itemization_FeeDetails_ClickCheckbox "1116",Array("Seller Obligated")

'Set Data in 1000 section of 2015 ItemizationPage
BIZ_2015Itemization_Set1000Section "1352_ConstrPerm_USDA"

'Open MIPI popup window in RegZCD form
CM_ConstrPerm_CDloan_MIPIWin_Open()

'Verify Loan Calculations in Closing disclosure page 5 
BIZ_Forms_Open "Closing Disclosure Page 5"
BIZ_ClosingDisclosurePage5_VerifyLoanCalculations "1352_ConstrPerm_USDA"

'Save the Loan
BIZ_Loan_Save()

'Exit the Loan
BIZ_Loan_Exit True
