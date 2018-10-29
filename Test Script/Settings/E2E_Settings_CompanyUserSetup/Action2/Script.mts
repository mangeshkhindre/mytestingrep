'@**************************************************************************************************
'@ TestStory: E2E_CompanyUserSetup_Functionalities
'@ TestCase:
   '1 Milestone:- Create,Edit,Movement from Current Milestone to Archived milestoneand vice versa,
'@ TestData: Setttings_CompanyUserSetup, MileStone and MileStoneData
'@ Pre-conditions: 
   '1 User logged in to Encompass as an Admin and is navigated to Milestones page under Settings
'@ Description:  
'@ TestSteps:
   '1 Verify create Milestone
   '2 Verify editing the milestone
   '3 Verif moving the Current Milestone to Archived milestone
   '4 Verify moving the Archived milestone to Current Milestone
'@ ExpectedResult:
   '1 The newly create Milestone appears with given name in the Current Milestones list
   '2 Selected milestone gets edited successfully
   '3 Selected milestone gets moved from Current Milestones to Archived Milestones
   '4 Selected milestone gets moved from Archived Milestones to Current Milestones
'***************************************************************************************************
Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyUserSetup_Functionalities","Script Name - E2E_Settings_CompanyUserSetup_Milesttone", Null

'====== Go to Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== Verify create Milestone ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1001","Verify create Milestone", Null
strMilestone = CompanyUserSetup_CreateMileStone("MileStoneData")

'====== Verify Edit Milestone ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1002","Verify Edit Milestone", Null
Wait g_TinyWaitLarge 				' Due To Sync Issue We Are Explicitly Passing Wait Statement
CompanyUserSetup_EditMilestone "MileStoneData",strMilestone

'====== Verify move Current Milestone to Archived milestone and move Archived milestone to Current Milestone ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1003,PTAC-1004","Verify move Current Milestone to Archived milestone and move Archived milestone to Current Milestone", Null
Wait g_TinyWaitLarge				' Due To Sync Issue We Are Explicitly Passing Wait Statement
CompanyUserSetup_ArchivedMilestone "MileStoneData",strMilestone
BIZ_Settings_ClickClose()
wait g_TinyWaitMedium

