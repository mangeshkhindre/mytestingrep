'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2419 - FHACOREFIARM Qualification 4 - Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualificationn
'@ TestData: NA
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on services and click Request Underwriting
   '2 Select Fanniemae DU on Epass and click 'submit' button 
   '3 Click on "update DU Settings" 
   '4 Fill in the username and password if not populated by default.click ok 
   '5 Click on "submit DU" 
   '6 Click edit credit reference info 
   '7 Select test credit agency(200) and click ok 
   '8 Click submit
   '9 Click continue '(Note: Please make sure that DU direct settings file is in the right path  For this)
   '10 Open remove UAC exe file 
   '11 click on "Open Encompass Data Folder" button 
   '12 Click on settings 
   '13 Click on e-pass 
   '14 Make sure that DUdirect settings file is here  If it is not you have to place it here 
   '15 click import conditions button in the Du underwriting page 
   '16 Select a condition from the list and click import 
   '17 Go to e-folder and click preliminary conditions 
   '18 Click add 
   '19 Select add conditions from DU findings radio button and click ok 
'@ ExpectedResult: 
   '1 Underwriting window popup should open
   '2 Service view tab should open 
   '3 Update DU via elliemae network window should open 
   '4 DU window will close 
   '5 DU via Elliemae network window opens 
   '6 Edit credit reference information will open 
   '7 Goes back to DU via Elliemae network and acct number and password will populate 
   '8 Incomplete loan application window will open if there are any incomplete fields 
   '9 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible 
   '10 A list of conditions will be shown 
   '11 Condition will be imported 
   '12 E-folder will open 
   '13 Add condition pop up window will open 
   '14 Condition will be added 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2419", "FHACOREFIARM Qualification 4 - Order Automated underwriting/Import conditions", Null

'Select Show in Alpha order
BIZ_Services_ShowInOrder

'Order Request Underwriting service with required test data
BIZ_Services_RequestUnderwriting "E2E_FHACORefiARM"

Dim strDuRecommendation

strDuRecommendation  = "Approve/Eligible"

'Verify is DU Result is returned as Approve/Eligible
FRM_VerifyEqual BIZ_Services_GetDUResult("Recommendation"),strDuRecommendation , "DU Recommendation Status", "Recommendation should be Approve/Eligible"
