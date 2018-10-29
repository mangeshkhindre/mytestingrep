'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2385 FHACOREFIARM File started 5 - Complete FHA management Form
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   '1 Global_Data, Login, E2E_Secondary
   '2 Tools_LockRequestForm, SetRateLockRequest, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Go to forms and click on FHA management	
   '2 For property type check the checkbox for 1 unit.Purpose of loan: 
   '3 check the check boxes cash-out refinance streamlined Refinance(w appraisal)
   '4 For FHA streamline type select 'credit qualifying 'from dropdown
   '5 For first time homebuyer select 'NO' from the dropdown
   '6 Under FHA information:
   '7 FHA Case # : 123456789
   '8 For SOA select '203B' from dropdown
   '9 For Chums ID(aus/Manual)enter 1232343
   '10 Closing date : 3 months from current date
   '11 Funded date: same as closing date
   '12 FHA lender Id: 9999999999
   '13 Click on prequalification tab
   '14 For UFMIP click on edit field value
   '15 A pop up opens. For MIP/FUNDING/ Guarantee ENTER 1.75% and click 'ok'
   '16 Go to forms and click on 'FNMA streamlined 1003'
   '17 Enter Lender case # as BTC-FHA1
   '18 Select Refinance type dropdown as Full documentation	
'@ ExpectedResult:
   '1 FHA management form should open
   '2 FNMA streamlined 1003'page should open.Should be able to enter values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2385","FHACOREFIARM File started 5 - Complete FHA management Form", Null

'Enters data in FNMA StreamLined Screen
BIZ_FHAManagement_BasicFHAInfonew "E2E_FHACORefiARM"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"),"Basic Info"
Wait g_TinyWaitLarge  'wait is used to handle sync

'Enter data in FNMA StreamLined Screen
BIZ_FHAManagement_BasicInfo "E2E_FHACORefiARM"

'Open FNMA Streamlined screen
BIZ_Forms_Open "FNMA Streamlined 1003"

'Enter data in FNMA StreamLined Screen
BIZ_FNMAStreamlined_SetData "E2E_FHACORefiARM"