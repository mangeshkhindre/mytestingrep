'====== Go to Settings/Loan Templates/Data Templates ======

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"

'======= Data Templates - Appending Data Template with No-version in loan =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1368","Data Templates - Appending Data Template with 'No-version' in loan", Null
strNewDataTemplate = BIZ_LoanTemplates_CreateDataTemplate ("PTAC-1498_LoanTemplates_DataTemplate","Public Data Templates")

BIZ_Settings_ClickClose()

'======= Verify Data in Borrower Summary Origination =======
BIZ_Nav_SelectPipelineTab()
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1532","Script Name - E2E_LoanTemplates_AppendingDataTemplates", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_LoanTemplates_ApplyandAppendTemplate "Append Data Template"
BIZ_LoanTemplates_SelectTemplate strNewDataTemplate,"Data Templates"
LoanTemplates_DataTemplate_VerifyBorrowerSummaryOrigination "PTAC-1498_LoanTemplates_DataTemplate"

'======= Verify Data in 1003 Page 1 =======
BIZ_Forms_Open "1003 Page 1"
'LoanTemplates_DataTemplate_Verify1003Page1 "PTAC-1498_LoanTemplates_DataTemplate","Set as Manual Selection"
LoanTemplates_DataTemplate_Verify1003Page1 "PTAC-1498_LoanTemplates_DataTemplate","Set As Default"
