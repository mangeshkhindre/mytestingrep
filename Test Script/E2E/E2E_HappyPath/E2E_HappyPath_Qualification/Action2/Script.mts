'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E 
'@ TestCase:  PTAC-1122 HP Qualification 1- Complete RegZ LE Form
'@ Test Automation JIRA Task:  PTAC-1133
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
    '1 Forms_RegZ-LE,SetDisclosureInformation,E2E_HPQualification1
	'2 Forms_RegZ-LE,InterestOnly,E2E_DisclosureTracking_Step1
	'3 Forms_RegZ-LE,SetLateCharge,Core2p_Integration
	'4 Loans,LoanTemplate,E2E_HappyPath"
'@ Pre-conditions: 
'@ Description: Complete RegZ LE Form
'@ TestSteps:
	'1 In forms, select RegZ-LE form
	'2 Enter the field values as mentioned in test data
'@ ExpectedResult: 
	'1 Should be able to enter values in RegZ-LE form
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1122","HP Qualification 1- Complete RegZ LE Form", Null

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin"

'Open the selected Pipeline View and Loan Folder
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
Set objData = Nothing

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS1Complete_HappyPath","Qualification"

BIZ_Forms_ShowAll

'Input Disclosure information in RegZ-LE
BIZ_RegZ_LE_SetDisclosureInformation "E2E_HPQualification1"

'Input Interest only information section in RegZ-LE form
BIZ_RegZ_LE_SetInterestOnlyInformation "E2E_DisclosureTracking_Step1"

'Setting late charge section
BIZ_RegZ_LE_SetLateChargeInformation "E2E_Integration"

If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm")._
    Page("title:=.*","index:=0").WebEdit("html id:=l_674"),"value")) Then
	FRM_Logger_ReportPassEvent "Fill RegZ-LE", "Details are entered in RegZ-LE form", Null
Else
	FRM_Logger_ReportFailEvent "Fill RegZ-LE", "Details are entered in RegZ-LE form", Null
End If
