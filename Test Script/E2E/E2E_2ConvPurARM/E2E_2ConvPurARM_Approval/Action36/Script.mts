﻿'@**************************************************************************************************
'@ TestStory: PTAC-871 - E2E_2CONVPURARAM
'@ TestCase: PTAC-865 Approval 2 - Fill Transmittal summary
'@ Test Automation JIRA Task: PTAC-1024 E2E_2CONVPURARM_Approval
'@ TestData: 
   'Forms_TransmittalSummary, SetProperty, E2E_CONVPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'Under forms click on Transmittal Summary.
	'Fill under Escrow(T&I):
	'Check the check box for Escrow(T&I).
	'For risk assessment select DU from dropdown.
	'Select exterior/ Interior for dropdown for property review.
	'Select uniform residential appraisal report from dropdown from property form type.
	'For Underwriter comments :Conditional approval upon receipt of conditions.
'@ ExpectedResult: 
	'1 Transmittal summary page should be open.
	'2 Should be able to select the dropdown and enter comments.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-865","Test Case Name: Approval 2 - Fill Transmittal summary", Null

BIZ_TransmittalSummary_SetProperty "E2E_CONVPURARM"
