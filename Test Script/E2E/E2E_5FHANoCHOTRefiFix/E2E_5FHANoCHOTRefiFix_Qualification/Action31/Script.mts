'@******************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1817 FHANOCHOTREFIFIX - Qualification 4 - Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-2447 E2E_5FHANoCHOTRefiFix_Qualification
'@ TestData: Services, Underwriting and E2E_5FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 1 Click on services and click Request Underwriting
	 '2 Select Fanniemae DU on Epass and click 'submit' button 
	 '3 Click on "update DU Settings" 
	 '4 Fill in the username and password if not populated by default.click ok 
	 '5 Click on "submit DU" 
	 '6 Click edit credit reference info 
	 '7 Select test credit agency(200) and click ok 
	 '8 Click submit
	 '9 Click continue ( FHA Case and Sponsor ID is not exists.(Ignore this alert and click on continue)
       '(Note: Please make sure that DU direct settings file is in the right path  For this)
	   'Open remove UAC exe file 
	   'click on "Open Encompass Data Folder" button 
	   'Click on settings 
	   'Click on e-pass 
	   'Make sure that DUdirect settings file is here  If it is not you have to place it here 
   '2 1 Click 'import conditions' button in the DU underwriting page.
     '2 Select a condition from the list and click import.
     '3 Go to e-folder and click preliminary conditions.
     '4 Click add.
     '5 Select add conditions from DU findings radio button and click "Ok"
'@ ExpectedResult: 
	'1 1 Underwriting window popup should open
	  '2 Service view tab should open 
	  '3 Update DU via elliemae network window should open 
	  '4 DU window will close 
	  '5 DU via Elliemae network window opens 
	  '6 Edit credit reference information will open 
	  '7 Goes back to DU via Elliemae network and acct number and password will populate 
	  '8 Incomplete loan application window will open if there are any incomplete fields 
	  '9 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible 
    '2 1 A list of conditions will be shown.
      '2 Condition will be imported.
      '3 E-folder will open.
      '4 Add condition pop up window should open.
      '5 Condition should be added.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1817", "FHANOCHOTREFIFIX - Qualification 4 - Order Automated underwriting/Import conditions", Null

'Opens the FHA Management and Enter Basic FHA information
BIZ_FHAManagement_BasicFHAInfonew "E2E_FHANoCHOTRefiFix"

GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Prequalification"
    	
Set objFHAManagementPage = SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0")
GUI_WebCheckBox_Set objFHAManagementPage.Webcheckbox("html id:=__cid_CheckBox3_Ctrl"), "ON"
BIZ_Services_RequestUnderwriting "E2E_FHANOCHOTREFIFIX"

Dim strDuRecommendation

strDuRecommendation = "Approve/Eligible"

'Verify is DU Result is returned as Approve/Eligible
FRM_VerifyEqual BIZ_Services_GetDUResult("Recommendation"),strDuRecommendation , "DU Recommendation Status", "Recommendation should be Approve/Eligible"
