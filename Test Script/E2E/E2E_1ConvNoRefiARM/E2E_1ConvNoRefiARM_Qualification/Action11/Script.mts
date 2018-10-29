'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1270 CONVNOCASHREFIARM - Qualification 4 Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-1664 E2E_1ConvNoRefiARM_Qualification
'@ TestData:Services, Underwriting, E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on services and click Request Underwriting
   '2 Select Fanniemae DU on Epass and click 'submit' button.
   '3 Click on "update DU Settings".
   '4 Fill in the username and password if not populated by default.
	  'User ID: c00r9enq
	  'Passowrd:Em@e46qc
	  'Institution name: 210043
	 'click ok.
   '5 Click on "submit DU".
   '6 Click edit credit reference info.
   '7 Select test credit agency(200) and click ok.
   '8 Click submit
   '9 Click continue.
      '(Note: Please make sure that DU direct settings file is in the right path. For this
      'Open remove UAC exe.file.
      'Click on "Open Encompass Data Folder" button.
      'Click on settings.
      'Click on e-pass.
      'Make sure that DUdirect settings file is here. If it is not you have to place it here.)
   '10 Click 'import conditions' button in the DU underwriting page.
   '11 Select a condition from the list and click import.
   '12 Go to e-folder and click preliminary conditions.
   '13 Click add.
   '14 Select add conditions from DU findings radio button and click "Ok"
'@ ExpectedResult: 
   '01 Underwriting window popup should open
   '02 Service view tab should open.
   '03 Update DU via elliemae network window should open.
   '04 DU window will close.
   '05 DU via Elliemae network window opens.
   '06 Edit credit reference information will open.
   '07 Goes back to DU via Elliemae network and acct number and password will populate.
   '08 Incomplete loan application window will open if there are any incomplete fields.
   '09 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible.
   '10 A list of conditions will be shown.
   '11 Condition will be imported.
   '12 E-folder will open.
   '13 Add condition pop up window should open.
   '14 Condition should be added.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1270", "CONVNOCASHREFIARM - Qualification 4 Order Automated underwriting/Import conditions", Null

BIZ_Service_UnderwritingImportConditions "E2E_ConvNoRefiARM"

'Navigate to eFolder
BIZ_Nav_SelectLoanTab
BIZ_PreliminaryConditions_AddDUFindings()
