'@*********************************************************************************
'@TestStory : CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestCase: CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestData : Forms_HMDAInformation, SetNMLSInfo,CTA-107
			'Forms_HMDAInformation,2018Ethnicity,CTA-107
			'Forms_HMDAInformation,2018Sex,CTA-107
			'Forms_HMDAInformation,2018Race,CTA-107
			'Forms_HMDAInformation,GovtMonitoring,CTA-107
			'TestData,Action3,CTA107_3
			

'@ Pre- conditions:NA
'@Description:
'@TestSteps:
   '1. Login in Encompass
   '2. Click on pipeline
   '3. Create a new loan > click on HMDA information PAge.
   '4. Set the Reported Year to 2018
   '5. Set the Data for Ethnicity,Race and sex.
   '6. Verify ReportingCodes for Race and Ethnicity for Borrowee and CoBorrower
   '7. Verify the following fields are disabled:1) Not applicable(4215)2) not applicable(1538)3) Not applicable(4200)
  '@ Expected Result: DropDown panel should be populated for Ethnicity and Sex and checkbox for Race.
'********************************************************************************************************************  


FRM_logger_ReportInfoEvent "Start Test Case: CTA-107", "Check Reporting Codes and Summary.", null
'Add New Loan 
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Forms_ShowAll ()
'Set Date as 2018 in Reporting year
wait(3)
BIZ_HMDA_SetHMDAYear("CTA-107")   
wait(3)
'**************************************************************************************
'Set the Required TestData for Ethnicity
BIZ_HMDAInformation_2018Ethnicity("CTA-107_3")
wait(3)
'Validate Reported Ethnicity codes against expected data 
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Co-borrower Ethnicity Reported Codes", Null
validateReportedEthnicityCoBorrower "CTA107_3"
wait(3)
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Borrower Ethnicity Reported Codes", Null
validateReportedEthnicityBorrower "CTA107_3"
wait(3)
'Set Race Test data
'****************************************************************************************************
BIZ_HMDAInformation_2018Race("CTA-107_3")
wait(3)
'Validate Reported Race Codes against expected data
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Co-borrower Race Reported Codes", Null
ValidateReportedRaceCoBorrower("CTA107_3")
wait(3)
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Borrower Race Reported Codes", Null
ValidateReportedRaceBorrower("CTA107_3")
wait(3)
'Set Sex Test data
BIZ_HMDA_2018Sex("CTA-107_3")
wait(3)
'Validate Not Applicable Are Disbaled or not
FRM_Logger_ReportStepEvent "Validation of Not Applicable Disabled","Validation for Not Applicable Disabled", Null
ValidateNotApplicableDisable()
'Navigate to 1003 page 3

BIZ_Forms_Open "1003 Page 3"
FRM_Logger_ReportStepEvent "Validation of 1000 Page 3","Validation for 1000 Page 3", Null
wait(3)
ValidateAllchecks("CTA107_3")
wait(3)
 
'Navigate to FNMA Streamlined 1003

BIZ_Forms_Open "FNMA Streamlined 1003"
FRM_Logger_ReportStepEvent "Validation of FNMA Streamlined 1003","Validation for FNMA Streamlined 1003", Null
ValidateAllchecks("CTA107_3")
wait(3)

'Navigate to ULDD/PDD

BIZ_Forms_Open "ULDD/PDD"
wait(3)
FRM_Logger_ReportStepEvent "Validation of ULDD/PDD","Validation for ULDD/PDD", Null
wait(3)
ValidateUDD_PDD()

wait(3)
'18.1 Changes added here 

BIZ_Forms_open "HMDA Information"
wait(3)
'Set Info Not Provided Check for Borrower and CoBorrower 'Set the values in the co-borrwer panel for ethnicity,Race,sex
BIZ_HMDAInformation_2018Ethnicity("CTA-107_5")
BIZ_HMDAInformation_2018Race("CTA-107_5")
BIZ_HMDA_2018Sex("CTA-107_5")

wait(3)
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Co-Borrower Ethnicity Reported Codes for Info Not Provided", Null
validateReportedEthnicityCoBorrower("CTA107_4")
wait(3)
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Borrower Ethnicity Reported Codes for Info Not Provided", Null
validateReportedEthnicityBorrower("CTA107_4")
wait(3)
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Co-Borrower Race Reported Codes for Info Not Provided", Null
ValidateReportedRaceCoBorrower("CTA107_4")
wait(3)
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Borrower Race Reported Codes for Info Not Provided", Null
ValidateReportedRaceBorrower("CTA107_4")

'Set Info Not Provided Check for Borrower and CoBorrower 'Set the values in the co-borrwer panel for ethnicity,Race,sex
wait(3)
BIZ_HMDAInformation_2018Ethnicity("CTA-107_3")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107_3")
wait(3)
BIZ_HMDA_2018Sex("CTA-107_3")
'18.1 Changes added here 

BIZ_Loan_Save ()
'Exit the Loan 
BIZ_Loan_Exit(False) 'exit loan without saving
