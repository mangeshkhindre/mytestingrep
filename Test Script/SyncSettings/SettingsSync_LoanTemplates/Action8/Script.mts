'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3123 - verify synced 'Task Sets' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3438 SettingsSync_BusinessRules
'@ TestData:
   '1 Settings_LoanTemplates,DataTemplate and PTAC-3123_LoanTemplates_TaskSets
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Loan Templates
'@ Description:  
'@ TestSteps:
   'Step1 actual steps
    '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   'Step2 actual steps
    '1 Go to settings->Loan Templates-> Task set
    '2 Click on New button present in Environment1.
    '3 Enter Template name
   'Step3 actual steps
    '1 Double-Click on the created template.
    '2 Enter description
   'Step4 actual steps
    '1 	"Select Qualification from drop down.
	'	Select the task ""Log Appraisal"" and click on Add arrow.
	'	Select Processing from drop down and select document ""Submit MI Application"" and click on Add arrow.
	'	Click Save button. "
   'Step5 actual steps
     '1 Select Template mentioned in Test data column and click Sync to arrow button.
   'Step6 actual steps
   	'1 Click on Yes button.
   'Step7 actual steps
   '1 Click on Ok button.
   'Step8 actual step
   	'1 In Environment2, select the synced Settlement Service Provider and click on Edit icon
   'Step9 actual step
    '1 In Environment2, select the synced Settlement Service Provider and click on Edit icon
   'Step10 actual step
     '1 "Verify that below values are populated correctly in Selected Input Forms section:
	 ' Name: Star Task Set
	 ' Description - Star Task Set Description
	 ' In Tracked Documents section, document ""Submit MI Application"" is present for Processing and document ""Log Appraisal"" is present for Qualification.
   'Step11 actual steps
    '1 Delete the created record in both environments
 '@ ExpectedResult:
   'Step1 Expected steps
    '1 Settings Sync tool should be displayed with two environment details.
   'Step2 Expected steps
    '1 Task set module should open.
    '2 New Template should create in editable mode.
    '3 Template name should be entered.
   'Step3 Expected steps
    '1. Description should be entered.
   'Step4 Expected steps
    '1 Task set template should be created successfully.
   'Step5 Expected steps
    '1 Settings Synchronization popup opens.
   'Step6 Expected steps
    '1 File System Setting pop-up opens
   'Step7 Expected steps
    '1 Template should be synced to Environment2.
   'Step8 Expcted Steps
    '1 Settings Synchronization popup opens.
   'Step9 Expected steps
    '1 Task Set Template  Details window  should be opened.
   'Step10 Expected Steps
    '1 "Below values should be populated correctly:
	' Name: Star Doc Set
	' Description - Star Doc Set Description
	' In Tracked Documents section, document ""Submit MI Application"" is present for Processing and document ""Log Appraisal"" is present for Qualification.
   'Step11 Expected steps
    '1 Record to be deleted
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3123","Verify synced 'Task Sets' data in Environment 2 should match with Environment 1", Null

'====== Select Input Task Sets Tab ======
 GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Task Sets"
 
  '====== Create TaskSet in Environment 1 ======
'====== Validate TaskSet Data in Environment 1 ======
strDataTemplateName= SyncSettings_LoanTemplate_CreateTaskSetTemplate("PTAC-3123_LoanTemplates_TaskSet",1)
FRM_Logger_ReportInfoEvent "TaskSet", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 1", Null
SyncSettings_LoanTemplate_VerifyTaskSetsTemplate "PTAC-3123_LoanTemplates_TaskSet",1,strDataTemplateName

'====== Click on Sync arrow button ======
'====== Validate Synced TaskSet template for Environment2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "TaskSet", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 2", Null
SyncSettings_LoanTemplate_VerifyTaskSetsTemplate "PTAC-3123_LoanTemplates_TaskSet",0,strDataTemplateName
'====== Delete the Template in environment 1 ======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 1", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,1

'====== Delete the Template in environment 2======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 2", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,0

