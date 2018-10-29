'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3119 -  verify synced 'Settlement Service Providers' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3438 SettingsSync_LoanTemplates
'@ TestData:
   '1 Settings_LoanTemplates,SetLoanProgram and PTAC-3119_Sync_Data
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Loan Templates
'@ Description:  
'@ TestSteps:
   'Step1 actual steps
    '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   'Step2 actual steps
    '1 Go to settings->Loan Templates-> Settlement Service Provider
    '2 Click on New button in Environment1
    '3 Enter Template name
   'Step3 actual steps
    '1 Double-Click on the created template.
    '2 Enter description
    '3 Click on New icon present in Settlement Service Provider section and Enter data as per the Test Data column
    '4 Select Template mentioned in Test data column and click Sync to arrow button.
   'Step4 actual steps
    '1 Select Template mentioned in test data column and click Sync to arrow button.
   'Step5 actual steps
    '1 Click on Yes button.
   'Step6 actual steps
   	'1 Click on Ok button
   'Step7 actual steps
   '6 In Environment2, select the synced Template and click on Edit icon
   'Step8 actual steps
    '1 "Verify that below values are populated correctly:
	'	Name: SSP1
	'	Description - SSP Description
	'   Additional Info - Test1
	'	Service Category - ABCD
	'	Company Name - ABCD corp
	'	Phone - 9999999999
	'	In Fees section, 
	'	Fee Description - Fee1
	'	Amount - 100"
  'Step9 actual steps
    '1 Delete the created record in both environments
 '@ ExpectedResult:
   'Step1 Expected steps
    '1 Settings Sync tool should be displayed with two environment details.
   'Step2 Expected steps
    '1 Settlement Service Provider module should open.
    '2 New Settlement Service Provider template should create in editable mode.
    '3 Template name should be entered.
   'Step3 Expected steps
    '1 Closing Cost Template Details window opens
    '4 Template should be saved and displayed in the grid.
   'Step4 Expected steps
    '1 Settings Synchronization popup opens.
   'Step5 Expected steps
    '1 File System Setting pop-up opens
   'Step6 Expected steps
    '1 Template should be synced to Environment2.
   'Step7 Expected steps
    '1 Data Template Details window  should be opened.
   'Step8 Expected steps
    '1 "Below values should be populated correctly:
	'	Name: SSP1
	'	Description - SSP Description
	'	Additional Info - Test1
	'	Service Category - ABCD
	'	Company Name - ABCD corp
	'	Phone - 9999999999
	'	In Fees section, 
	'	Fee Description - Fee1
	'	Amount - 100"
   'Step8 Expected steps
    '1 Record to be deleted

'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3119","Verify synced 'Settlement Service Providers' data in Environment 2 should match with Environment 1", Null
strRuleName= SyncSettings_BusinessRules_CreateFieldTriggerRule("PTAC-3014_Sync_Data",1)
Settings_Sync_ValidateRule strRuleName, 1
BIZ_SyncSettings_ClickArrow()
Settings_Sync_ValidateRule strRuleName, 0

'====== Validate Synced MilestoneCompletionRule for Environment1 and environment 2 ======
SyncSettings_BusinessRules_VerifyFieldTriggerRuleData "PTAC-3014_Sync_Data",1,strRuleName
SyncSettings_BusinessRules_VerifyFieldTriggerRuleData "PTAC-3014_Sync_Data",0,strRuleName
SyncSettings_BusinessRules_DeleteRule strRuleName,1
SyncSettings_BusinessRules_DeleteRule strRuleName,0


