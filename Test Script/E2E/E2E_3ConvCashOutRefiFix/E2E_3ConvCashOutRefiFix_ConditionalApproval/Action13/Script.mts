'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3256 CONVCASHOUTREFIFIX Conditional Approval 2 - Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-3376 E2E_3CONVCASHOUTREFIFIX_ConditionalApproval
'@ TestData: Forms_TransmittalSummary, SetProperty, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms and click transmittal summary
   '2 Check the check box for Escrow(T&I)
   '3 Risk assessment select DU from dropdown
   '4 For property review select exterior,Interior from dropdown
   '5 property form type select uniform residential appraisal report from the dropdown
   '6 Under underwriter comments Enter Conditional approval upon receipt of conditions
'@ ExpectedResult: 
   '1 Transmittal summary should open
   '2 Should be able to enter all values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3256","CONVCASHOUTREFIFIX Conditional Approval 2 - Complete Transmittal Summary", Null

'Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_CONVCASHOUTREFIFIX"