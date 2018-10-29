'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1969 FHANOCHOTREFIFIX Conditional Approval 2 - Complete Transmittal Summary
'@ Test Automation JIRA Task: PTAC-2706 E2E_5FHANoCHOTRefiFix_ConditionalApproval
'@ TestData: Forms_TransmittalSummary, SetProperty and E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on forms and click transmittal summary.
   '2 Check the check box for Escrow(T&I).
      'Risk assessment select DU from dropdown.
      'For property review select exterior,Interior from dropdown.
      'property form type select uniform residential appraisal report from the dropdown.
      'Under underwriter comments
      'enter "Conditional approval upon receipt of conditions
'@ ExpectedResult: 
   '1 Transmittal summary should open.
   '2 Should be able to enter all values.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1969","FHANOCHOTREFIFIX Conditional Approval 2 - Complete Transmittal Summary", Null

'Sets the values in Transmittal Summary Screen
BIZ_TransmittalSummary_SetProperty "E2E_FHANoCHOTRefiFix"