'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2322 Qualification 4 - Order Automated underwriting/Import conditions
'@ Test Automation JIRA Task: PTAC-2807 E2E_9VANoCORefiARM_Qualification 
'@ TestData:
   'Services, Underwriting, E2E_VANoCORefiARM
'@ Pre-conditions: Loan Number which finished Filestarted milestone
'@ Description:  
'@ TestSteps:
   '01 Go to VA 26-0286 Loan Summary screen and fill the data as per test data
   '02 Go to VA 26-1805 Reasonable Value screen and fill the data as per test data
   '03 Go to VA 26-1820 Loan Disbursement Value screen and fill the data as per test data
   '04 Go to VA 26-6393 Loan Analysis  Disbursement Value screen and fill the data as per test data
   '05 Go to VA 26-8261A Veteran Status screen and fill the data as per test data
   '06 Go to VA Management screen and fill the data as per test data
   '07 Go to VA Management->>Qualification: screen and fill the data as per test data
   '08 Go to VA Management->>Tracking:screen and fill the data as per test data	
   '09 Go to FHA Management-select Purpose loan as per test data. select SOA
   '10 Click on services and click Request Underwriting
   '11 Select Fanniemae DU on Epass and click 'submit' button. Click on "update DU Settings".
   '12 Fill in the username and password if not populated by default.
	   'User ID: c00r9enq
       'Passowrd:Em@e46qc
       'Institution name: 210043. click ok.
   '13 Click on "submit DU". Click edit credit reference info.
   '14 Select test credit agency(200) and click ok. Click submit
   '15 Click continue. (Note: Please make sure that DU direct settings file is in the right path. For this
   '16 Open remove UAC exe.file.
   '17 Click on "Open Encompass Data Folder" button.
   '18 Click on settings.
   '19 Click on e-pass.
   '20 Make sure that DUdirect settings file is here. If it is not you have to place it here.)	
'@ ExpectedResult: 
	'1 Loan Data should be saved
	'2 Underwriting window popup should open. Service view tab should open. Update DU via elliemae network window should open
	'3 DU window will close. DU via Elliemae network window opens
	'4 Edit credit reference information will open. Goes back to DU via Elliemae network and acct number and password will populate
	'5 Incomplete loan application window will open if there are any incomplete fields
	'6 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2322", "Qualification 4 - Order Automated underwriting/Import conditions", Null

Dim objFHAData,objFHAManagementPage

BIZ_VALoanSummary_SetVA26_0286 "E2E_VANoCORefiARM"
BIZ_VAReasonableValue_SetVA26_1805 "E2E_VANoCORefiARM"
BIZ_VALoanDisbursement_SetVA26_1820 "2802_VANoCORefiARM"
BIZ_VALoanAnalysis_SetVA26_6393 "E2E_VANoCORefiARM"
BIZ_VAVeteranStatus_SetVA26_8261A "E2E_VANoCORefiARM"
BIZ_VAManagement_BasicInfo "E2E_VANoCORefiARM"
BIZ_VAManagement_Qualification "E2E_VANoCORefiARM"
BIZ_VAManagement_Tracking "E2E_VANoCORefiARM"

Set objFHAData           = FRM_DS_GetTestData("Forms_FHAManagement", "BasicInfo", "E2E_VANoCORefiARM")
Set objFHAManagementPage = SwfWindow("swfname:=MainForm").Page("index:=0")
BIZ_Forms_Open "FHA Management"

'Select the check box Streamline Refinance with appraisal
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objFHAData, "PurposeOfLoan")) Then
   GUI_WebCheckbox_Set objFHAManagementPage.WebCheckBox("html id:=__cid_CheckBox2_Ctrl"), FRM_DS_GetValue(objFHAData, "PurposeOfLoan") 
End If

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objFHAData, "SOA")) Then          
   objFHAManagementPage.WebEdit("html id:=TextBox11").Click
   GUI_WinEdit_Type objFHAManagementPage.WinEdit("nativeclass:=Edit","index:=0"), FRM_DS_GetValue(objFHAData, "SOA")
End If

GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Prequalification"
Set objFHAManagementPage = SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0")
GUI_WebCheckBox_Set objFHAManagementPage.Webcheckbox("html id:=__cid_CheckBox3_Ctrl"), "ON"

'Select Show in Alpha order
BIZ_Services_ShowInOrder

'Order Request Underwriting service with required test data
BIZ_Services_RequestUnderwriting "E2E_VANoCORefiARM"

Set objFHAData      	 = Nothing
Set objFHAManagementPage = Nothing
