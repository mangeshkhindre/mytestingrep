'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table
'@ TestCase : PTAC-1859 Verify loan term fields data when loan purpose is purchase with Data template integration
'@ Test Automation JIRA Task: PTAC-2009 LoanTermsTable_PurchaseCashOutRefinance_LECDValidate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower and 1873_LoanTerms_DataTemplate
   '2 Forms_BorrowerSummaryOrigination, SetTransactionDetails and 1873_LoanTerms_DataTemplate
'@ Pre-conditions: 
'@ Description: Verify loan term fields data when loan purpose is purchase with Data template integration
'@ TestSteps:
   '1 Login into the Encompass with Admin user.
   '2 Go to settings->Loan templates->Data template Create data template as per test data
   '3 close the settings and go to pipeline click new loan icon Go to loan menu bar and select append data template
   '4 Go to LE page 1 and verify the values
   '5 Go to CD page 1 and verify the values
'@ ExpectedResult:
   '1 User should be able to login successfully.
   '2 Loan data should be filled
   '3 Loan data should be filled automatically based on template
   '4 under loan terms section below fields data should be available and cross check with borrower Origination summary
      'Loan Amount --> Field ID: 1109 in borrower origination summary
      'Interest Rate --> Field ID: 3 in borrower origination summary 
      'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
   '5 under loan terms section below fields data should be available and cross check with borrower Origination summary
      'Loan Amount --> Field ID: 1109 in borrower origination summary 
      'Interest Rate --> Field ID: 3 in borrower origination summary 
      'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
   '6 under loan terms section below fields data should be available and cross check with borrower Origination summarY
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Iterest Rate --> Field ID: 3 in borrower origination summary
	  'Mnthly Principal & interest --> Field ID: 5 in borrower origination summary
   '7 under loan terms section below fields data should be available and cross check with borrower Origination summarY
	  'Loan Amount --> Field ID: 1109 in borrower origination summary
	  'Interest Rate --> Field ID: 3 in borrower origination summary
	  'Monthly Principal & interest --> Field ID: 5 in borrower origination summary
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1859","Script name: Verify loan term fields data when loan purpose is purchase with Data template integration", Null

'===== Go to Settings>>DataTemplates ======
Dim objPage,strLoanAmount,strInterestRate,strMonthlyPrinandInt, arrLoanTermsTable

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_Settings_DataTemplates()
BIZ_DataTemplates_Create Parameter("strDataTemplateName")
BIZ_DataTemplates_OpenDataTemplate  Parameter("strDataTemplateName")
BIZ_DataTemplatesDetails_SetBorrower "1873_LoanTerms_DataTemplate"
BIZ_DataTemplatesDetails_SetTransactionDetails "1873_LoanTerms_DataTemplate"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DataTemplateDialog").SwfButton("swfname:=saveBtn")
BIZ_Settings_ClickClose()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AppendDataTemplate  Parameter("strDataTemplateName")
Wait g_LongWaitMedium+10										'Due to sync issue we are explicitly apssing the wait time

'Get the Loan Term values from Borrower summary Origination Page
BIZ_Forms_Open "Borrower Summary - Origination"
Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

strLoanAmount 		 = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_1109","index:=0"), "value")
strInterestRate      = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_3"), "value")
strMonthlyPrinandInt = GUI_Object_GetPropertyValue(objPage.WebEdit("html id:=l_5"),"value")
arrLoanTermsTable    = Array(strLoanAmount,strInterestRate,strMonthlyPrinandInt)

Set objPage = Nothing

'Validate the loan terms in LE and CD page 1
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Loan Estimate Page 1",arrLoanTermsTable
LoanTermsTable_Purchase_LoanTerms_LoanAmount_Interest_MonthlyPrinciandInt_Validate "Closing Disclosure Page 1",arrLoanTermsTable



'Exit Loan
'BIZ_Loan_Exit False
'BIZ_Nav_SelectHomeTab()

'Open Settings>>Data Templates and delete created data template
'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'BIZ_Nav_Settings_DataTemplates()
'BIZ_LoanTemplates_DeleteFolderOrTemplate "Yes",Parameter("strDataTemplateName"),"Loan Template"
'BIZ_Settings_ClickClose()

'====== Navigate to Home Tab and logout Encompass ======
'BIZ_Nav_SelectHomeTab()
