'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2320 Qualification2-Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification 
'@ TestData:
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '1 In forms, select 2015 Itemization form
   '2 Enter the values as in test data
'@ ExpectedResult: 
   '1 2015 Itemization Form should open. Data Should be save
   '2 loan data should be save
   '3 Should be able to input values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2320","Qualification2- Fill 2015 Itemization", Null

BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

'daily interest charges for 10 days
BIZ_2015Itemization_Set900Section "E2E_VANoCORefiARM"

'Home owners insurance, property taxes
BIZ_2015Itemization_Set1000Section "E2E_VANoCORefiARM"

'Settlement fee, closing fee
BIZ_2015Itemization_Set1100Section "E2E_VANoCORefiARM"