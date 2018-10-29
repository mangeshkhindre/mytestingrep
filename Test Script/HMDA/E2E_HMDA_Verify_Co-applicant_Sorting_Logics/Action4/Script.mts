'@*********************************************************************************
'@TestStory : CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestCase: CTA-107 Verify No co-applicant, Not applicable, Sorting logics for Borower and No co-borrower
'@TestData : Forms_HMDAInformation, SetNMLSInfo,CTA-107
			'Forms_HMDAInformation,2018Ethnicity,CTA-107
			'Forms_HMDAInformation,2018Sex,CTA-107
			'Forms_HMDAInformation,2018Race,CTA-107
			'Forms_HMDAInformation,GovtMonitoring,CTA-107
'@ Pre- conditions:
'@Description:
'@TestSteps:
   '1. Login in Encompass with admin user
   '2. Click on pipeline tab for loan creation 
   '3. Create a new loan  and navigate to HMDA information PAge.
   '4. Verify all the fields in the 'Co-borrower' panel is disabled when 'no co-borrower' is checked.
'@ Expected Result: All the fields in the 'Co-borrower' panel should be disabled when 'no co-borrower' is checked.
'********************************************************************************************************************  

'FRM_RT_SetupTest(Null)
FRM_logger_ReportInfoEvent "Start Test Case: CTA-107", "Verify Co-borrower fields are disabled when no co-applicant is chekced.", null
wait(3)
'=============COMMENTED in 181 FOR DATA DEPENDENCy=====================
'BIZ_Nav_SelectPipelineTab()
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"
'BIZ_Forms_ShowAll ()
'
'BIZ_HMDA_SetHMDAYear("CTA-107")   
'=============COMMENTED in 181 FOR DATA DEPENDENCy=====================

FRM_logger_ReportInfoEvent "No co-applicant(3840):True", "Set No co-applicant True.", null
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox8_Ctrl"),"on"
'check co-borrower panel is disabled
arrayCtrlList=Array("WebCheckBox","WebEdit")
wait(3)
FRM_Logger_ReportStepEvent "Validation of CoBorrower Panel","Validation for Co-borrower panel is disabled", Null
if (GUI_Object_IsContainerReadOnly (BIZ_HMDAPageObj.Webelement("html id:=panelCoBorrowerEthnicity"),arrayCtrlList)) Then
   FRM_Logger_ReportPassEvent "Check all the child elements are disabled", "Verify all the child elements are disabled when no co-applicant(3840) is checked", null
Else 
 FRM_Logger_ReportFailEvent "Check all the child elements are disabled", "Verify all the child elements are disabled when no co-applicant(3840) is checked", null
End if
wait(3)
'Verify all the no co-applicant fields in the co-borrower panel when no co-applicant is checked(3840)
Set Hmda_EthinicityObj=BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox22_Ctrl")
Set HMDA_RaceObj=BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox21_Ctrl")
Set HMDA_SexObj=BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox9_Ctrl")
wait(3)
GUI_Object_ValidateChecked Hmda_EthinicityObj,"1","Verify the Ethnicity checkbox is checked when no-coapplicant checkbox is checked"
GUI_Object_ValidateChecked HMDA_RaceObj,"1","Verify the Race checkbox is checked when no-coapplicant checkbox is checked"
GUI_Object_ValidateChecked HMDA_SexObj,"1","Verify the Sex checkbox is checked when no-coapplicant checkbox is checked"
'uncheck the no co-applicant field(3840)
FRM_logger_ReportInfoEvent "No co-applicant(3840):False", "Set No co-applicant False.", null
wait(3)
GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox8_Ctrl"),"off"
wait(3)
'verify all the no co-applicant fields are unchecked in the co-borrower panel 
  if(NOT GUI_Object_GetPropertyValue(Hmda_EthinicityObj,"checked")) Then
   FRM_Logger_ReportPassEvent "Check Ethnicity No coapplicant(field id:4188) is unchecked", "Verify Ethnicity No coapplicant(field id:4188) is unchecked after no co-applicant(3840) is unchecked", null
   Else
   FRM_Logger_ReportFailEvent "Check Ethnicity No coapplicant(field id:4188) is checked", "Verify Ethnicity No coapplicant(field id:4188) is checked after no co-applicant(3840) is unchecked", null
  End if 
 wait(3)
  if(NOT GUI_Object_GetPropertyValue(HMDA_RaceObj,"checked")) Then
   FRM_Logger_ReportPassEvent "Check Race No coapplicant(field id:3174) is unchecked", "Verify Race No coapplicant(field id:3174) is unchecked after no co-applicant(3840) is unchecked", null
  Else
    FRM_Logger_ReportPassEvent "Check Race No coapplicant(field id:3174) is checked", "Verify Race No coapplicant(field id:3174) is checked after no co-applicant(3840) is unchecked", null   
  End if 
 wait(3)
  if(NOT GUI_Object_GetPropertyValue(HMDA_SexObj,"checked")) Then
   FRM_Logger_ReportPassEvent "Check Sex No coapplicant(field id:4189) is unchecked", "Verify Sex No coapplicant(field id:4189) is unchecked after no co-applicant(3840) is unchecked", null
   else
   FRM_Logger_ReportFailEvent "Check Sex No coapplicant(field id:4189) is unchecked", "Verify Sex No coapplicant(field id:4189) is checked after no co-applicant(3840) is unchecked", null   
  End if 
 wait(3)
 'Set the values in the co-borrwer panel for ethnicity,Race,sex
 wait(3)
 BIZ_HMDAInformation_2018Ethnicity("CTA-107")
 wait(3)
 BIZ_HMDAInformation_2018Race("CTA-107")
 wait(3)
 BIZ_HMDA_2018Sex("CTA-107")
 wait(3)
 
 'Check the 'no co-applicant checkbox
 GUI_WebCheckbox_Set BIZ_HMDAPageObj.WebCheckBox("html id:=__cid_CheckBox8_Ctrl"),"on"
 
 'Verify all the no co-applicant check boxes are checked
 wait(3)
GUI_Object_ValidateChecked Hmda_EthinicityObj,1,"Verify the Ethnicity checkbox is checked when no-coapplicant checkbox is checked"
GUI_Object_ValidateChecked HMDA_RaceObj,1,"Verify the Race checkbox is checked when no-coapplicant checkbox is checked"
GUI_Object_ValidateChecked HMDA_SexObj,1,"Verify the Sex checkbox is checked when no-coapplicant checkbox is checked"
set arrayCtrlList=nothing
BIZ_Loan_Save()
BIZ_Loan_Exit(False) 'exit loan without saving

