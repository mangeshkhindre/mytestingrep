'====== Go to Settings/Loan Templates/Closing Costs ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates", "Closing Costs"

'====== Closing Cost Templates - 2015 Itemization - Apply Closing Cost Template for all field values ======
FRM_Logger_ReportStepEvent "Start Test Case: ","Loan Templates - Closing Costs Templates - Appending Closing Costs Template on Loan file", Null
BIZ_Nav_HierarchyTree "Loan Templates", "Closing Costs"
strClosingCostTemplate = BIZ_LoanTemplates_CreateClosingCost("PTAC-1372_LoanTemplates_ClosingCost","2015 Itemization","PTAC-1372_LoanTemplates_2015Itemization")
BIZ_Settings_Clickclose()
LoanTemplates_ApplyClosingCostTemplate strClosingCostTemplate,"ON"
'======= Verify Values in 2015Itemization Page =======
LoanTemplates_VerifyValuesIn2015Itemization "PTAC-1372_LoanTemplates_2015Itemization", "PTAC-1498_LoanTemplates_ClosingCost1"

