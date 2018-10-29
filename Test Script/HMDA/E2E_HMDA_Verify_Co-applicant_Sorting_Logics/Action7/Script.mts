'@*********************************************************************************
'@TestStory : 
'@TestCase:
'@TestData : 
'@ Pre- conditions:
'@Description:
'@TestSteps:
   '1. Login in Encompass with admin user
   '2. Click on pipeline tab for loan creation 
   '3. Create a new loan  and navigate to HMDA information PAge.
   '4. Verify all the fields in the 'Co-borrower' panel is disabled when 'no co-borrower' is checked.
'@ Expected Result: All the fields in the 'Co-borrower' panel should be disabled when 'no co-borrower' is checked.
'********************************************************************************************************************  
'FRM_RT_SetupTest null
'Set 2018 HMDA Reporting year
BIZ_HMDA_SetHMDAYear("CTA-107")

wait(3)

'Set the values in the co-borrwer panel for ethnicity,Race,sex
BIZ_HMDAInformation_2018Ethnicity("CTA-107_5")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107_5")
wait(3)
BIZ_HMDA_2018Sex("CTA-107_5")
wait(3)
'Verify Selection Of Ethnicyt,Race ans Sex in Unchecked
FRM_Logger_ReportStepEvent "Validation of HMDA 2017 Page","Validation for all Checkbox for ethnicity ,Race and Sex for Borrower and CoBorrower for Info Not Provided", Null
CheckboxValidation_181changes "CTA107_1" 
wait(3)
'Verify Not Applicable are Enabled Of Ethnicity,Race ans Sex Columns
FRM_Logger_ReportStepEvent "Validation of HMDA 2017 Page","Validation for Not Applicable is Enabled", Null
ValidateNotApplicableEnable()
wait(3)
'Set 2018DI false
GUI_WebCheckBox_set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"false"
'Verify Information Not Provided afetr 2018 DI(4142) Uncheck
HMDA_VerifyInfoNotProvided()
'Set 2018DI true
GUI_WebCheckBox_set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"true" 'STEP8
wait(3)
'Set the values in the co-borrwer panel for ethnicity,Race,sex STEP9

BIZ_HMDAInformation_2018Ethnicity("CTA-107_6")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107_6")
wait(3)
BIZ_HMDA_2018Sex("CTA-107_6")
wait(3)
'========================================================
'Changed as Testcase was updated
'Verify Info Not Provided in Unchecked
'CheckboxValidation_181changes "CTA107_2"
'Changed as Testcase was updated
'========================================================

'Verify Reported Codes 
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Co-borrower Ethnicity Reported Codes", Null
validateReportedEthnicityCoBorrower "CTA107_4"
wait(3)
FRM_Logger_ReportStepEvent "Validation of Ethnicity Reported Codes","Validation for Borrower Ethnicity Reported Codes", Null
validateReportedEthnicityBorrower "CTA107_4"
wait(3)
'Verify Reported Race Codes  
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Co-borrower Race Reported Codes", Null
ValidateReportedRaceCoBorrower("CTA107_4")
wait(3)
FRM_Logger_ReportStepEvent "Validation of Race Reported Codes","Validation for Borrower Race Reported Codes", Null
ValidateReportedRaceBorrower("CTA107_4")
wait(3)

'Set 2018DI false
GUI_WebCheckBox_set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"false"

'Verify Do Not Wish All check
GUI_Object_ValidateChecked BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox1000_Ctrl"),"1","I do not wish to furnish this information is Checked Field 188"
GUI_Object_ValidateChecked BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox6_Ctrl"),"1","I do not wish to furnish this information is Checked Field 189"
'Set 2018DI true
GUI_WebCheckBox_set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"true"
'Uncheck the I do not Wish checkBoxes
BIZ_HMDAInformation_2018Ethnicity("CTA-107_7")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107_7")
BIZ_HMDA_2018Sex("CTA-107_7")

'Set the values in the co-borrwer panel for ethnicity,Race,sex
BIZ_HMDAInformation_2018Ethnicity("CTA-107")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107")
wait(3)
BIZ_HMDA_2018Sex("CTA-107")
wait(3)



