'@**************************************************************************************************
'@ TestStory :NICE-2359 DDM - Fee Line 801e changes.
'@ TestCase:
   '1 NICE-3270 - TC01_NICE-2359_Verify rule execution for Fee Line 801e fields when 801f is not populated.
   '2 NICE-2422 - Validate the NC report along with the report data, with Preapproval request approved but not accepted loan status
'@ Test Automation JIRA Task: CTA-66 DDM - DDM_Validation_Execution_And_Stop_Trigger_For_Fee_Rule
'@ TestData:DDM,
		   'Forms-BorrowerSummaryOrigination

'@ Description:
'@ TestSteps:Updated at Action level
'@ Test Steps: Updated at Action level
'@ ExpectedResult:Updated at Action level
'***************************************************************************************************

FRM_RT_SetupTest(Null)
FRM_Logger_ReportInfoEvent "Start Test Case: NICE-2359","Script Name :DDM-FeeRule_changes _FeeLine_801e", Null
''====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== Run Action ======
RunAction "TC01_NICE-2359_Verify rule execution for Fee Line 801e fields when 801f is not populated", oneIteration


'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)
