'@******************************************************************************************
'@ TestStory: 
'@ TestCase: Custom Milestones_End to End testcases
'@ Test Automation JIRA Task: TA-4611
'@ TestData: Add Test data file name, Sheet name and Row Id.
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:		
'@ ExpectedResult: 
'******************************************************************************************** @@ hightlight id_;_266806_;_script infofile_;_ZIP::ssf2.xml_;_
 @@ hightlight id_;_65782_;_script infofile_;_ZIP::ssf3.xml_;_
FRM_RT_SetupTest(null)
		
'==========================Login to Encompass==================================	
BIZ_Login_UserLogin "sven_admin"

RunAction "TC1_TC2_E2E_CustomMilestones_CreateArchiveMilestone", oneIteration

RunAction "TC3_E2E_CustomMilestones_CreateMilestoneTemplate", oneIteration

RunAction "TC5_TC6_E2E_CustomMilestones_ApplyMilestoneTemplate", oneIteration

RunAction "TC7_E2E_CustomMilestones_AutoLoanNumbering", oneIteration

RunAction "TC8_E2E_CustomMilestones_MilestoneRoles", oneIteration

RunAction "TC9_E2E_CustomMilestones_MilestoneDates", oneIteration


'=======================Logout of Application========================
BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)


