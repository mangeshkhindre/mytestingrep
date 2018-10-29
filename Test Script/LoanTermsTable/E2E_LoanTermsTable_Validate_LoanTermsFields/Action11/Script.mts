'@**************************************************************************************************
'@ TestStory: PTAC-1873
'@ TestCase:
        '1 PTAC-1960 Verify loan term fields data when loan purpose is No-cashout refinance with Data template integration
        '2 PTAC-1997 Verify loan term fields data when loan purpose is Construction-Perm
        '3 PTAC-2002 Verify loan term fields data when loan purpose is Other
'@ Test Automation JIRA Task: 
   '1 PTAC-2772 LoanTermTables_VerifyLoanTermFieldsData_LoanPurposeNoCashOutRefDataTemp
   '2 PTAC-2700 LoanTermTables_VerifyLoanTermFieldsData_LoanPurposeConstructionPerm   
'@ TestData: 
   '01 Forms_BorrowerSummaryOrigination, SetBorrower & SetTransactionDetails, PTAC-1960
   '02 Forms_LoanEstimatePage, LoanTermsTable, PTAC-1960
   '03 Forms_BorrowerSummaryOrigination, SetBorrower & SetTransactionDetails, PTAC-1997
   '04 Forms_LoanEstimatePage, LoanTermsTable, PTAC-1997   
   '05 Forms_BorrowerSummaryOrigination, SetBorrower & SetTransactionDetails, PTAC-2002
   '06 Forms_LoanEstimatePage, LoanTermsTable, PTAC-2002 
'@ Pre-conditions: NA 
'@ Description:  
'@ TestSteps:
   '1 Create Loan with basic data, With Loan Purpose as Construction Perm
   '2 Enter Loan Amount In LE Page1
   '3 Verify The Same Loan Amount Should be in CD Page 1
   '4 Go to LE page 1 and verify the value of the F(LE1.X2)F(LE1.X3)"
   '5 Go to 1003 page1 Change data in 1176 field then check Loan estimate Page1
   '6 Go to Borrower origination summary & 1003 page1 Change data as per test data "Go to LE page 1 and verify the value of the F(LE1.X2)F(LE1.X3)"   
'@ ExpectedResult:
   '1 Should be Able to create loan with basic details, With Loan Purpose as No Cash-Out Refinance, Loan data should be filled
   '2 Values In LE Page1 should be validated with borrower summary origination page
      'under loan terms section below fields data should be available and cross check with borrower Origination summary
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Interest Rate --> Field ID: 3 in borrower origination summary
	  'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
   '3 Values in CD Page 1 should be validated with borrower summary origination page
   	  'under loan terms section below fields data should be available and cross check with borrower Origination summary
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Interest Rate --> Field ID: 3 in borrower origination summary
	  'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1960", "Verify loan term fields data when loan purpose is No-cashout refinance with Data template integration", Null
strRowID	=	"PTAC-1960"
Dim objEncompassMain
Set objEncompassMain	=	SwfWindow("swfname:=MainForm").Page("name:=")
Set objData 			= 	FRM_DS_GetTestData("Forms_LoanEstimatePage", "LoanTermsTable", strRowID)
'====== Go to Settings/Loan Templates/Data Templates ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"
strNewDataTemplate = FRM_DS_GetValue(objData, "strNewDataTemplate")
BIZ_DataTemplates_DeleteExistingAndCreateNew strNewDataTemplate
BIZ_DataTemplates_OpenDataTemplate strNewDataTemplate
'===== Enters the details in the Borrower section =====
BIZ_DataTemplatesDetails_SetBorrower strRowID
'===== Enters the details in the Transaction section =====
BIZ_DataTemplatesDetails_SetTransactionDetails strRowID
BIZ_DataTemplatesDetailsForms_Open "Loan Estimate Page 1"
LoanTermTables_VerifyLoanAmountSection_BulletsVerify strRowID
LoanTermTables_SetLoanTermsCustomize_LoanAmountToYes strRowID
LoanTermTables_LoanAmountValEnterInLEPage1_ValidateInCDPage1 strRowID
BIZ_DataTemplatesDetails_Save
BIZ_Nav_Settings_Close()
'====== Go to PipeLine, Add New Loan =====
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_Nav_OpenMenuItem "Loan;Append Data Template"
BIZ_DataTemplates_Select strNewDataTemplate
'===== Retrieving Values From Borrower Summary Page =====
BIZ_Forms_Open "Borrower Summary - Origination"
dblLoanAmountInBorrowerSummary		=	GUI_Object_GetPropertyValue(objEncompassMain.WebEdit("html id:=l_1109"),"value")
dblNoteRateInBorrowerSummary		=	GUI_Object_GetPropertyValue(objEncompassMain.WebEdit("html id:=l_3"),"value")
dblMonthlyPaymentInBorrowerSummary	=	GUI_Object_GetPropertyValue(objEncompassMain.WebEdit("html id:=l_5"),"value")

arrLoanTermsTable = Array(dblLoanAmountInBorrowerSummary,dblNoteRateInBorrowerSummary,dblMonthlyPaymentInBorrowerSummary)
'===== Validation Part ===== 
'LoanTermTables_LoanAmountNoteRateAndMonthlyPayment_Validate "LEPage1", dblLoanAmountInBorrowerSummary, dblNoteRateInBorrowerSummary, dblMonthlyPaymentInBorrowerSummary
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Loan Estimate Page 1",arrLoanTermsTable
'LoanTermTables_LoanAmountNoteRateAndMonthlyPayment_Validate "CDPage1", dblLoanAmountInBorrowerSummary, dblNoteRateInBorrowerSummary, dblMonthlyPaymentInBorrowerSummary
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Closing Disclosure Page 1",arrLoanTermsTable

Set objEncompassMain	= Nothing
Set objData 			= Nothing
'BIZ_Loan_Exit False
