'@******************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3083 FHAPURCHASEFIX - Qualification 4 - Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-3151 E2E_4FHAPURCASHFIX_Qualification
'@ TestData:  Services,Underwriting,E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on services and click Request Underwriting
	'2 Select Fanniemae DU on Epass and click 'submit' button 
	'3 Click on "update DU Settings" 
	'4 Fill in the username and password if not populated by default.
       'User ID: c00r9enq
       'Passowrd:Em@e46qc
       'Institution name: 210043
      'click ok 
	'5 Click on "submit DU" 
	'6 Click edit credit reference info 
	'7 Select test credit agency(200) and click ok 
	'8 Click submit
	'9 Click continue on Alert message of ( FHA Case and Sponsor ID is not exists.(Ignore this alert and click on continue)
           '(Note: Please make sure that DU direct settings file is in the right path  For this)
	       'Open remove UAC exe file 
           'click on "Open Encompass Data Folder" button 
           'Click on settings 
	       'Click on e-pass 
	       'Make sure that DUdirect settings file is here  If it is not you have to place it here) 
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
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3083", "FHAPURCHASEFIX - Qualification 4 - Order Automated underwriting/Import conditions", Null

'Select Show in Alpha order
BIZ_Services_ShowInOrder

'Order Request Underwriting service with required test data
BIZ_Services_RequestUnderwriting "E2E_FHAPURCASHFIX"

Dim strDuRecommendation

strDuRecommendation      = "Approve/Eligible"
'Verify is DU Result is returned as Approve/Eligible
FRM_VerifyEqual BIZ_Services_GetDUResult("Recommendation"),strDuRecommendation , "DU Recommendation Status", "Recommendation should be Approve/Eligible"