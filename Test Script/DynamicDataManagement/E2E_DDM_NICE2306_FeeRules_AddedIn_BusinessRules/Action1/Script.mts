'@**************************************************************************************************
'@ TestStory :NICE-2306 Fee and Field scenarios conditions added in business rules
'@ TestCase:
   '1  NICE-2446 TC12 - TC12 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Advanced Condition option
   '2  NICE-2466 TC22 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Rate option
  
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    
'@ Pre-Conditions: NA

'@ Description:
	'Updated in action
'@Expected Result:
	'Updated in action
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: NICE-2306 ","Script Name : DDM_NICE2306_FeeRules_AddedIn_BusinessRules", Null

RunAction "DDM_NICE2446_FeeRuleAdvancedCondition_TC12", oneIteration
RunAction "DDM_NICE2466_FeeRuleRate_TC22", oneIteration

FRM_RT_TearDownTest(Null)

