'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1393 - CONVNOCASHREFIARM - Conditional Approval 2 - Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-1783 - E2E_1ConvNoRefiARM_ConditionalApproval
'@ TestData: 
   '1 Forms_TransmittalSummary, SetProperty, E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms and click transmittal summary
   '2 Check the check box for Escrow(T&I)
   '3 Risk assessment select DU from dropdown
   '4 For property review select exterior,Interior from dropdown
   '5 property form type select uniform residential appraisal report from the dropdown
   '6 Under underwriter comments
   '7 Enter Conditional approval upon receipt of conditions
'@ ExpectedResult: 
   '1 Transmittal summary should open
   '2 Should be able to enter all values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1393","Test Case Name: CONVNOCASHREFIARM - Conditional Approval 2 - Complete Transmittal Summary", Null

'Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_ConvNoRefiARM"