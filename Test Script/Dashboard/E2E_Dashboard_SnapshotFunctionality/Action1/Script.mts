'@**************************************************************************************************
'@ TestStory: PTAC-849 Dashboard
'@ TestCase:		
   '1 PTAC - 291 Performing operation in  Adv Search Filter AND/OR
   '2 PTAC - 292 Performing operation in  Adv Search Filter Parentheses
   '3 PTAC - 286 Dashboard SnapshotFolder AreaCheck
'@ Test Automation JIRA Task: PTAC-855 Dashboard_Snapshot_AdvanceSearchFilterOperations
'@ TestData: Dashboard, SnapShots and ManageSnapshot.
'@ Pre-conditions: User Should Login to Encompass Applicaiton With Admin Credentials
'@ Description: 	
   '1 Performing Advance Search Filter Operations On AND/OR
   '2 Performing Advance Search Filter Parentheses
   '3 Performing Area Checks
'@ TestSteps: 		
   '1 PTAC - 291 Performing operation in  Adv Search Filter AND/OR
   '2 PTAC - 292 Performing operation in  Adv Search Filter Parentheses
   '3 PTAC - 286 Dashboard_SnapshotFolder_AreaCheck
'@ ExpectedResult: 	
   '1 Performing Advance Search Filter Operations On AND/OR
   '2 Parentheses
   '3 Checking All radio buttons
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Script: PTAC-855","Script Name: Dashboard_Snapshot_AdvanceSearchFilterOperations", Null

'===== Login to the Encompass as Admin in defaulted server =====
BIZ_Login_UserLogin "admin_core2p"

'===== Select Dashboard Tab =====
BIZ_Nav_SelectDashboardTab()
BIZ_Dashboard_DefaultViewAccessibilityCheck()

'===== And/Or Filter and Parentheses Filter =====

RunAction "SnapshotFolder_ANDORParenthesisFilter", oneIteration

RunAction "Dashboard_Snapshot_Loantable_Coloumn_Checks", oneIteration

'===== Go To Home Tab =====
BIZ_Nav_SelectHomeTab()

'===== Logging Out Of Encompass =====
BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)

