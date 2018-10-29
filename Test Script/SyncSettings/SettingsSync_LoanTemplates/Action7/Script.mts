﻿'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3122 -  Verify synced 'Input Form Sets' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3438 PTAC-3438 SettingsSync_LoanTemplates
'@ TestData:
   '1 Settings_LoanTemplates,DataTemplate and PTAC-3122_LoanTemplates_InputFormSets
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Loan Templates
'@ Description:  
'@ TestSteps:
   'Step1 actual steps
    '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   'Step2 actual steps
    '1 Go to settings->Loan Templates-> Input Form Sets
    '2 Click on New button present in Environment1.
    '3 Enter Template name
   'Step3 actual steps
    '1 Double-Click on the created template.
    '2 Enter description
   'Step4 actual steps
    '1 	Select many forms from Predefined Input forms and click on Add button.
    'Step5 actual steps
     '1Click on Save icon
    'Step6 actual steps
     '1 Click on Yes button.
    'Step7 actual steps
   	'1 Click on Ok button
   'Step8 actual steps
    '1 Select Template mentioned in Test data column and click Sync to arrow button.
   'Step6 actual steps
   	'1 Click on Yes button.
   'Step7 actual steps
   '6 Click on Ok button.
   'Step8 actual step
   	'1 In Environment2, select the synced Settlement Service Provider and click on Edit icon
   'Step9 actual steps
    '1 In Environment2, select the synced Settlement Service Provider and click on Edit icon
   'Step10 actual step
     '1 "Verify that below values are populated correctly in Selected Input Forms section:
	 ' 1003 Page1
	 ' 1003 Page2
   'Step11 actual steps
    '1 Delete the created record in both environments
 '@ ExpectedResult:
   'Step1 Expected steps
    '1 Settings Sync tool should be displayed with two environment details.
   'Step2 Expected steps
    '1 Template module should open.
    '2 New Template should create in editable mode.
    '3 Template name should be entered.
   'Step3 Expected steps
    '1. Description should be entered.
   'Step4 Expected steps
    '1 Forms should get added in Selected Input Forms section.
   'Step5 Expected steps
    '1 Input Form Set should be saved and displayed in the grid.
   'Step6 Expected steps
    '1 File System Setting pop-up opens
   'Step7 Expected steps
    '1 Template should be synced to Environment2.
   'Step8 Expcted Steps
    '1 Settings Synchronization popup opens.
   'Step9 Expected steps
    '1 Input Form Set Template  Details window  should be opened.
   'Step10 Expected Steps
    '1 "Below values should be populated correctly in Selected Input Forms section:
	' 1003 Page1
	' 1003 Page2"
   'Step11 Expected steps
    '1 Record to be deleted
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3122","Verify synced 'Input Form Sets' data in Environment 2 should match with Environment 1", Null

'====== Select Input Form Sets Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Input Form Sets"
 
 '====== Create InputFormTemplate in Environment 1 ======
'====== Validate InputFormTemplate Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "InputFormSet", "Create InputFormSet template in Environment 1", null
strDataTemplateName= SyncSettings_LoanTemplate_CreateInputFormTemplate("PTAC-3122_LoanTemplates_InputFormSet",1)
FRM_Logger_ReportInfoEvent "InputFormSet", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 1", Null
SyncSettings_LoanTemplate_VerifyInPutformFormSetsTemplate "PTAC-3122_LoanTemplates_InputFormSet",1,strDataTemplateName

'====== Click on Sync arrow button ======
'====== Validate Synced InputFormSet template for Environment2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "InputFormSet", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 2", Null
SyncSettings_LoanTemplate_VerifyInPutformFormSetsTemplate "PTAC-3122_LoanTemplates_InputFormSet",0,strDataTemplateName

'====== Delete the Template in environment 1 ======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 1", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,1

'====== Delete the Template in environment 2======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 2", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,0
