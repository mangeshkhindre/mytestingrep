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
FRM_logger_ReportInfoEvent "Start Test Case: CTA-107", "Verify Face2Face changes.", null
'Add New Loan 
BIZ_Nav_SelectPipelineTab()
wait(3)
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
BIZ_Forms_ShowAll ()
'Set Date as 2018 in Reporting year
BIZ_HMDA_SetHMDAYear("CTA-107")   
'**************************************************************************************
'Set Info Not Provided Check for Borrower and CoBorrower 'Set the values in the co-borrwer panel for ethnicity,Race,sex
wait(3)
BIZ_HMDAInformation_2018Ethnicity("CTA-107_3")
wait(3)
BIZ_HMDAInformation_2018Race("CTA-107_3")
wait(3)
BIZ_HMDA_2018Sex("CTA-107_3")
wait(3)
'18.1 Changes added here 

'Validate checks for Face 2 Face for Borrower
'Set All donot wish to true
wait(3)
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_chkborrethnicitydonotwish_Ctrl"),"ON"
wait(3)
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox40_Ctrl"),"ON"
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox36_Ctrl"),"ON"
'Set FAce2FAce on
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox20_Ctrl"),"ON"
wait g_ShortWaitSmall
arrayFieldIdBorrowerFace2Face=Array("4144","4145","4146","4147","4148","4149","4150","4151","4153","4154","4158","4155","4156","4157")
FRM_Logger_ReportStepEvent "Validation of UnChecked and Disabled Borrower","Validation for UnChecked and Disabled When Face2Face(4143) is TRUE ", Null
ValidateUnchecked_Face2Face BIZ_HMDAPageObj.Webelement("html id:=panelBorrowerEthnicity"),"WebCheckBox",arrayFieldIdBorrowerFace2Face
wait(3)
'18.1 Change
FRM_Logger_ReportStepEvent "Validation of Info Not Provided disabled Borrower","Validation for Info Not Provided disabled When Face2Face(4143) is TRUE ", Null
arrayFieldIdBorrowerFace2Face181=Array("4243","4244","4245")
ValidateUnchecked_Face2Face BIZ_HMDAPageObj.Webelement("html id:=panelBorrowerEthnicity"),"WebCheckBox",arrayFieldIdBorrowerFace2Face181
'18.1 Change
wait(3)
'Validate checks for Face 2 Face for CoBorrower
'Set All donot wish to true

'GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_chkcoborrethnicitydonotwish_Ctrl"),"ON"
'GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox70_Ctrl"),"ON"
'GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox43_Ctrl"),"ON"
wait(3)
'Set FAce2FAce on
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox28_Ctrl"),"ON"
wait g_ShortWaitSmall
'Validate checks for Face 2 Face for CoBorrower
arrayFieldIdCoBorrowerFace2Face=Array("4159","4160","4161","4162","4163","4164","4165","4166","4167","4168","4170","4171","4172","4173")
FRM_Logger_ReportStepEvent "Validation of UnChecked and Disabled CoBorrower","Validation for UnChecked and Disabled When Face2Face(4131) is TRUE ", Null
ValidateUnchecked_Face2Face BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox",arrayFieldIdCoBorrowerFace2Face
wait(3)
'18.1 Change
arrayFieldIdCoBorrowerFace2Face=Array("4246","4247","4248")
FRM_Logger_ReportStepEvent "Validation of Info Not Provided disabled CoBorrower","Validation for Info Not Provided disabled When Face2Face(4131) is TRUE ", Null
ValidateUnchecked_Face2Face BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox",arrayFieldIdCoBorrowerFace2Face
'18.1 Change
wait(3)
'Uncheck Face2Face for Coborrower 
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox28_Ctrl"),"OFF"
wait(3)
''Verify Step 14
'FRM_Logger_ReportStepEvent "Validation of UnChecked and Disabled","Validation for UnChecked and Disabled When Face2Face(4131) is TRUE ", Null
''Main_ValidateFace2Face_Unchecked("CTA107_4")
'
'*********************************************************************************************
'Set the values in the co-borrwer panel for ethnicity,Race,sex
wait(3)
BIZ_HMDAInformation_2018Ethnicity("CTA-107_4")
BIZ_HMDAInformation_2018Race("CTA-107_4")
BIZ_HMDA_2018Sex("CTA-107_4")
wait(3)
'Check the 'no co-applicant checkbox 4188 Ethnicity
wait(3)
FRM_Logger_ReportInfoEvent "HMDA Information Page","Set HMDA 2018 Ethnicity No Coapplicant in HMDA Information Page",null
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox22_Ctrl"),"on"
'ValidateUnchecked_SpecificSection BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","Action4_CoBorrowerEthnicity")
ValidateUnchecked_Ethnicity BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","CTA107_4"
wait(3)

'Check the 'no co-applicant checkbox 3174 Race
FRM_Logger_ReportInfoEvent "HMDA Information Page","Set HMDA 2018 Race No Coapplicant in HMDA Information Page",null
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox21_Ctrl"),"on"
ValidateUnchecked_Race BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","CTA107_4"
wait(3)

'Check the 'no co-applicant checkbox 4189 Sex
FRM_Logger_ReportInfoEvent "HMDA Information Page","Set HMDA 2018 Sex No Coapplicant in HMDA Information Page",null
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox9_Ctrl"),"on"
ValidateUnchecked_Sex BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","CTA107_4"
wait(3)
'Validate Not Applicable for Co Borrower is enabled
FRM_Logger_ReportStepEvent "Validation of Not Applicable for Co Borrower is enabled for CoBorrower","Validation of Not Applicable for Co Borrower is enabled for CoBorrower ", Null
ValidateNotApplicable_Enabled ("CTA107_4")

BIZ_Loan_Save ()
BIZ_Loan_Exit(False) 'exit loan without saving

	
''Validate all Sections are unchecked for coBorrower
'FRM_Logger_ReportStepEvent "Validation of Sub-Categories","Validation for Sub-Categories When Face2Face(4131) is TRUE ", Null
'if (ValidateUnchecked_SpecificSection(BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","Action4_CoBorrowerEthnicity")) Then
'   FRM_Logger_ReportPassEvent "Check all the child elements are UnChecked", "Verify all the child elements are UnChecked when no co-applicant is checked", null
'Else 
' FRM_Logger_ReportFailEvent "Check all the child elements are UnChecked", "Verify all the child elements are UnChecked when no co-applicant is checked", null
'End if 
''Check the 'no co-applicant checkbox 3174 Race
'FRM_Logger_ReportInfoEvent "HMDA Information Page","Set HMDA 2018 Race No Coapplicant in HMDA Information Page",null
'GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox21_Ctrl"),"on"
'if (ValidateUnchecked_SpecificSection(BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),"WebCheckBox","Action4_CoBorrowerRace")) Then
'   FRM_Logger_ReportPassEvent "Check all the child elements are UnChecked", "Verify all the child elements are UnChecked when no co-applicant is checked", null
'Else 
' FRM_Logger_ReportFailEvent "Check all the child elements are UnChecked", "Verify all the child elements are UnChecked when no co-applicant is checked", null
'End if 
''Check the 'no co-applicant checkbox 4189 Sex
'FRM_Logger_ReportInfoEvent "HMDA Information Page","Set HMDA 2018 Sex No Coapplicant in HMDA Information Page",null
'GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox9_Ctrl"),"on"
'






