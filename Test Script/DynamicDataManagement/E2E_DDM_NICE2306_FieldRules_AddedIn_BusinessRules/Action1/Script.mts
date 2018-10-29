'@**************************************************************************************************
'@ TestStory :NICE-2306 Fee and Field scenarios conditions added in business rules
'@ TestCase:
   '1  NICE-2434 TC01 - NICE-2306 - Verify DDM Field Rule Condition Execution for Advanced Condition option
   '2  NICE-2435 TC02 - NICE-2306 - Verify DDM Field Rule Condition Execution for Current Role option
   '3  NICE-2437 TC04 - NICE-2306 - Verify DDM Field Rule Condition Execution for Loan Program option   

'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    
'@ Pre-Conditions: NA

'@ Description:
	'Updated in action
'@Expected Result:
	'Updated in action
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: NICE-2306 ","Script Name : Fee and Field scenarios conditions added in business rules", Null

RunAction "DDM_NICE2434_FieldRuleAdvancedCondition_TC01", oneIteration
RunAction "DDM_NICE2437_FieldRuleLoanProgram_TC04", oneIteration
RunAction "DDM_NICE2435_FieldRuleCurrentRole_TC02", oneIteration

FRM_RT_TearDownTest(Null)
