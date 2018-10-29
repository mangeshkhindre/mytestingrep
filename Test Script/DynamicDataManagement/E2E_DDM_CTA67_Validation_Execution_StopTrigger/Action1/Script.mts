'@**************************************************************************************************
'@ TestStory :CTA-67 DDM - Validation, Execution and Stop Trigger for Field Rule
'@ TestStories Covered:
'   NICE-1802 DDM - QA Only - Data Population - Execute Fee Rule, Field Rule for 'Field Changes' conditions
'	NICE-1812 DDM - QA Only - Data Population - Stop Trigger validation of Fee Rule, Field Rule for condition 'After LE is Sent'
'	NICE-1817 DDM - QA Only - Data Population - Stop Trigger validation of Fee rule, Field rule when a Specific condition is met.  
'@ Test Automation JIRA Task: CTA-67 DDM - Validation, Execution and Stop Trigger for Field Rule
'@ TestData:
    
'@ Pre-Conditions: NA

'@ Description:
	'Updated in action
'@Expected Result:
	'Updated in action
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: CTA-67 ","Script Name : DDM_CTA67_Validation_Execution_StopTrigger", Null

RunAction "DDM_NICE1802_Create_Execute_FieldRule", oneIteration

FRM_RT_TearDownTest(Null)

