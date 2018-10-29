'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase:  PTAC-2356 Conditional Approval 2 - Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-2925 E2E_9VANoCORefiARM_ConditionalApproval
'@ TestData: Forms_TransmittalSummary, SetProperty and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on forms and click transmittal summary.
	'2 Check the check box for Escrow(T&I).
	'3 Risk assessment select DU from dropdown.
	'4 For property review select exterior/Interior from dropdown.
	'5 property form type select uniform residential appraisal report from the dropdown.
	'6 Under underwriter comments enter "Conditional approval upon receipt of conditions
'@ ExpectedResult: 
	'1 Transmittal summary should open.
	'2 Should be able to enter all values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2356","Conditional Approval 2 - Complete Transmittal Summary", Null

'@ Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_VANoCORefiARM"