'@*********************************************************************************
'@TestStory : CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestCase: CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestData : Forms_HMDAInformation, SetNMLSInfo,CTA-107
			'Forms_HMDAInformation,2018Ethnicity,CTA-107
			'Forms_HMDAInformation,2018Sex,CTA-107
			'Forms_HMDAInformation,2018Race,CTA-107
			'Forms_HMDAInformation,GovtMonitoring,CTA-107
			'TestData,Action1,CTA107_1
			

'@ Pre- conditions:NA
'@Description:
'@TestSteps:
   '1. Login in Encompass
   '2. Click on pipeline
   '3. Create a new loan > click on HMDA information PAge.
   '4. Set the Reported Year to 2018
   '5. Set the Data for Ethnicity,Race and sex.
   '6. UnCheck the 2018DI checkbox 
  '@ Expected Result: DropDown panel should be populated for Ethnicity and Sex and checkbox for Race.
'======Login to the encompass as admin=====

BIZ_Login_UserLogin "admin_core2p"

FRM_logger_ReportInfoEvent "Start Test Case: CTA-107", "Verify Checkbox to Dropdown section in HMDA 2018", null
'=======Navigate to pipeline and create a new loan"======

BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Forms_ShowAll ()

'Set 2018 HMDA Reporting year
BIZ_HMDA_SetHMDAYear("CTA-107")
wait(6)
'Set the values in the co-borrwer panel for ethnicity,Race,sex
BIZ_HMDAInformation_2018Ethnicity("CTA-107")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107")
BIZ_HMDA_2018Sex("CTA-107")
wait(3)
BIZ_HMDA_GovtMonitoring("CTA-107")
'Validate Dropdown for Both
HMDA_VerifyDropDownInfo2018("CTA-107")     
wait(3)
'Set 2018DI true                                                                                                                             
GUI_WebCheckBox_set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"true"
wait(3)

'Verify Step 5

FRM_Logger_ReportStepEvent "Validation of HMDA 2017 Page","Validation for all Checkboex for etnicity ,Race and Sex for Borrower and CoBorrower", Null
CheckboxValidation_Action1 "CTA107_1"  

'**************End of Script ********************




