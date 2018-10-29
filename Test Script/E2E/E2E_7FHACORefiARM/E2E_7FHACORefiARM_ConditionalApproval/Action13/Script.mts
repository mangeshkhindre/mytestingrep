'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2659 FHACOREFIARM Conditional Approval 2 - Complete Transmittal Summary 
'@ Test Automation JIRA Task: PTAC-2718 E2E_7FHACORefiARM_ConditionalApproval
'@ TestData:  Forms_TransmittalSummary, SetProperty, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on forms and click transmittal summary.
	'2 Check the check box for Escrow(T&I).
	   'Risk assessment select DU from dropdown.
	   'For property review select exterior/Interior from dropdown.
	   'property form type select uniform residential appraisal report from the dropdown.
	   'Under underwriter comments enter "Conditional approval upon receipt of conditions
'@ ExpectedResult: 
	'1 Transmittal summary should open.
	'2 Should be able to enter all values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2659","FHACOREFIARM Conditional Approval 2 - Complete Transmittal Summary ", Null

'Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_FHACORefiARM"