'@**************************************************************************************************
'@ TestStory: PTAC-2456 UCD Adjustments
'@ TestCase: 
   '1 PTAC-2349 Addition of a new section on UCD Adjustments and Other Credits Calculation and their calcs
   '2 PTAC-2350 Addition of a new section on UCD Adjustments and Other Credits and calcs
'@ Test Automation JIRA Task: PTAC-2669 UCD_AdjustmentsAndOtherCredits_AdditionOfNewSectionAndCalculation
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetHeadInfo, PTAC-2669_AdditionOfNewSection
   '2 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-2669_AdditionOfNewSection
   '3 Forms_BorrowerSummaryOrigination, SetProperty, PTAC-2669_AdditionOfNewSection
   '4 Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-2669_AdditionOfNewSection
   '5 Forms_ClosingDisclosurePage, Page3_AdjustmentAndOtherCredits, PTAC-2669_AdditionOfNewSection
'@ Pre-conditions: Calculation logic for section L and Calculation logic for section K
'@ Description:
   'Three New Calculated Fields will be located under the Header "UCD Adjustments and Other Credits Calculation" and be placed in the following order with the following labels 
   'LABEL: "Total Due From Borrower at Closing (K05-K15)" [NEW FIELD = Section K Subtotal]
   'LABEL: "Total Paid Already by or on Behalf of Borrower at Closing (L04, L06-L17)" [NEW FIELD = Section L Subtotal]
   'LABEL: "UCD Total Adjustments and Other Credits" = [NEW FIELD Section K Subtotal minus NEW FIELD Section L Subtotal]
   'In the UCD Tab, add 2 NEW Calculation Tables at the bottom of the UCD Table (after L17) labeled "UCD Adjustments and Other Credits Calculation" and "Total Adjustments and Other Credits Calculation". The purpose of these 2 tables is store the Total UCD Calculation Results for values entered into the UCD Tab and another table to store the Total Adjustments and Other Credits Calculation if values are entered into both UCD/Non-UCD tabs. 
   'NEW TABLE 2 REQUIREMENTS - Total Adjustments and Other Credits Calculation
   'In the new section labeled "Total Adjustments and Other Credits Calculation" add 3 NEW LABELS located under the Header "Total Adjustments and Other Credits Calculation" and place labels in the following order: 
   'LABEL: "UCD Total Adjustments and Other Credits" =  [Same Field from UCD TAB - NEW FIELD Section K Subtotal minus NEW FIELD Section L Subtotal ] 
   'LABEL: "Non-UCD Total Adjustments and Other Credits" = [NEW FIELD ID FROM NON-UCD TAB]
   'LABEL: "TOTAL Adjustments and Other Credits" = [NEW FIELD = UCD Total Adjustments and Other Credits NF + Non-UCD Total Adjustments and Other Credits NF] 
   'LE2.X4/CD3.X109 = NEW FIELD "Total Adjustments and Other Credits" 
'@ TestSteps: 
   'Log in to Encompass with correct Username and password. 
   'Create a new loan and click on save.
   'Go to CD page3 and open adjustments and other credits popup.
   'Verify that  values at the bottom of the UCD Table (after L17) for Total Due from Borrower at Closing( K05-K15) field, 
   'Total Paid Already by or on behalf of Borrower at Closing( L04, L06-17) and UCD Total  adjustments and other credits
   'Go to CD page 3 and open adjustments and other credits popup.
   'Verify the  values at the bottom of the UCD Table (after UCD adjustments and other credits calculation field)  as section "Total Adjustments and Other Credit calculations
   'UCD Total  adjustments and other credits field
   'Non-UCD Total  adjustments and other credits field
   'Total  adjustments and other credits field.
'@ ExpectedResult:
   'A new loan is created
   'Total Due from Borrower at Closing( K05-K15) field = Sum of ( K05-K15)
   'Total Paid Already by or on behalf of Borrower at Closing( L04, L06-17)=L04+Sum(L06-L17)
   'UCD Total  adjustments and other credits=Total Due from Borrower at Closing( K05-K15) - Total Paid Already by or on behalf of Borrower at Closing( L04, L06-17)
   'Below calculations in  section "Total Adjustments and Other Credit calculations
   'UCD Total Adjustments and Other Credits" = [Section K Subtotal-Section L Subtotal]
   'Non-UCD Total Adjustments and Other Credits" = [subtotal of "Gift Funds" section in NON-UCD TAB]
   'TOTAL Adjustments and Other Credits" = [UCD Total Adjustments and Other Credits + Non-UCD Total Adjustments and Other Credits]
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2669", "Script Name - UCD_AdjustmentsAndOtherCredits_AdditionOfNewSectionAndCalculation", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Navigate to pipeline and create a new loan ======
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline" 

'====== Set Basic Data in Loan ======
'====== Save loan ======
BIZ_BorrowerSummaryOrigination_SetHeadInfo "PTAC-2669_AdditionOfNewSection"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-2669_AdditionOfNewSection"
BIZ_BorrowerSummaryOrigination_SetProperty "PTAC-2669_AdditionOfNewSection"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-2669_AdditionOfNewSection"
BIZ_Loan_Save()
strLoanNumber = BIZ_Loan_GetLoanNumber()

'====== Open Closing DisClosure Page ======
'====== Set Data in Sec-K and Sec-L in Closing Disclosure Page ======
'====== the values & calculation under total adjustment and other credits section ======
'====== Validating the values & calculation under total adjustment and other credits section ======
'====== Validating the values & calculation under UCDA adjustment and other credits section  ======
BIZ_Forms_Open "Closing Disclosure Page 3"
BIZ_ClosingDisclosurePage3_AdjustmentsAndOtherDetails_SetSectionK "PTAC-2669_AdditionOfNewSection"
BIZ_ClosingDisclosurePage3_AdjustmentsAndOtherDetails_SetSectionL "PTAC-2669_AdditionOfNewSection"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2349", "Addition of a new section on UCD Adjustments and Other Credits Calculation and their calcs", Null
ClosingDisclosurePage3_AdjustmentsAndOtherDetails_ValidateUCDAdjustments "PTAC-2669_AdditionOfNewSection"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2350", "Addition of a new section on UCD Adjustments and Other Credits and calcs", Null
ClosingDisclosurePage3_AdjustmentsAndOtherDetails_ValidateTotalAdjustments "PTAC-2669_AdditionOfNewSection"
BIZ_Loan_Exit true

'====== Delete Loan Number from Application ======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strLoanNumber
BIZ_Loan_DeleteLoan()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
