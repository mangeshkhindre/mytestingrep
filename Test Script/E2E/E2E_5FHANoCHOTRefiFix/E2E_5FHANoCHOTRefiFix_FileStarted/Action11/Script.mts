'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1699 FHANOCHOTREFIFIX File started 5 - Complete FHA management Form
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData: 
	'1 Forms_FHAManagement, BasicInfo, E2E_5FHANoCHOTRefiFix
	'2 Forms_FNMAStreamlined, FNMAStreamlined, E2E_5FHANoCHOTRefiFix	
'@ Pre-conditions:  
'@ Description:  
'@ TestSteps:
   '1 Go to forms and click on FHA management
   '2 For property type check the checkbox for 1 unit.For FHA streamline type select  'credit qualifying 'from dropdown
       'For first time homebuyer select 'NO' from the dropdown
       'Under FHA information:
	    'FHA Case # : 123456789
        'For SOA select '203B' from dropdown
        'For Chums ID(aus/Manual)enter 1232343
        'Closing date : 3 months from current date
        'Funded date: same as closing date
        'FHA lender Id: 9999999999
       'Click on prequalification tab
       'For UFMIP click on edit field value
	   'A pop up opens. For MIP/FUNDING/ Guarantee ENTER 1.75% and click 'ok'
    '3 Go to forms and click on 'FNMA streamlined 1003'
       	   'Go to forms and click on 'FNMA streamlined 1003'
'@ ExpectedResult:
   '1 FHA management form should open
   '2 Should be to enter all values
   '3 FNMA streamlined 1003 page should open
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1699","FHANOCHOTREFIFIX File started 5 Complete FHA management Form", Null

'Opens the FNMA Streamlined screen and Enters data in FNMA StreamLined Screen
BIZ_FHAManagement_BasicFHAInfonew "E2E_FHANoCHOTRefiFix"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Basic Info"
Wait g_TinyWaitLarge 		'wait is used to handle sync

'Enters data in FNMA StreamLined Screen
BIZ_FHAManagement_BasicInfo "E2E_FHANoCHOTRefiFix"

GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Prequalification"
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("url:=.*","index:=0").Webcheckbox("html id:=__cid_CheckBox3_Ctrl"), "ON"

'Opens the FNMA Streamlined screen
BIZ_Forms_Open "FNMA Streamlined 1003"

'Enters data in FNMA StreamLined Screen
BIZ_FNMAStreamlined_SetData "E2E_FHANoCHOTRefiFix"
