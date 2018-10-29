'@**************************************************************************************************
'@ TestStory :NICE-2306 Fee and Field scenarios conditions added in business rules
'@ TestCase:
'	1- TC16 - NICE-2460 - Verify DDM Fee Rule Condition Execution for Loan Purpose option
'	2- TC18 - NICE-2462 - Verify DDM Fee Rule Condition Execution for Loan Type option
  
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    
'@ Pre-Conditions: NA

'@ Description:
	'Updated in action
'@Expected Result:
	'Updated in action
'***************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: NICE-2306 ","Script Name : DDM_NICE2306_FeeRules_LoanPurposeType_BusinessRules", Null


RunAction "DDM_NICE2460_LoanPurpose_TC16", oneIteration


RunAction "DDM_NICE2462_LoanType_TC18", oneIteration

FRM_RT_TearDownTest(Null)

