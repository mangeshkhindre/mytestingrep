'@ *************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3173 FHAPURCHASEFIX- Conditional Approval 2 - Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-3155 E2E_4FHAPURCASHFIX_ConditionalApproval
'@ TestData: Forms_TransmittalSummary, SetProperty, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description   :  
'@ TestSteps     :
  	'1 Click on forms and click transmittal summary.
  	'2 1 Check the check box for Escrow(T&I).
	  '2 Risk assessment select DU from dropdown.
	  '3 For property review select exterior/Interior from dropdown.
	  '4 property form type select uniform residential appraisal report from the dropdown.
	  '5 Under underwriter comments  enter "Conditional approval upon receipt of conditions
'@ ExpectedResult: 
	'1 Transmittal summary should open.
	'2 Should be able to enter all values.
'@ *************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3173","FHAPURCHASEFIX- Conditional Approval 2 - Complete Transmittal Summary", Null

'Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_FHAPURCASHFIX"