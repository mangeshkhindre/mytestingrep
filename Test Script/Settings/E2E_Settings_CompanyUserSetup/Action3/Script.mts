'@**************************************************************************************************
'@ TestStory: E2E_CompanyUserSetup_Functionalities
'@ TestCase:
   '1 MileStone TemplateActions:= Create,edit,delete,duplicate check of milestone template
   
'@ Test Automation JIRA Task: PTAC-1889 Settings_CompanyUserSetup_MileStoneTemplate
'@ TestData: Setttings_CompanyUserSetup, MileStone and MileStoneData
'@ Pre-conditions: 
   '1 User logged in to Encompass as an Admin and is navigated to Milestones page under Settings
'@ Description:  
'@ TestSteps:
   '1 Verify create milestone template
   '2 Verify duplicate milestone template
   '3 Verify edit milestone template
   '4 Verify delete milestone template
'@ ExpectedResult:
   '1 New milestone template gets created with given name and appears at the top of the Templates list
   '2 Milestone template gets created with same name prefixed by Copy of at the top of the Templates list
   '3 Milestone template gets edited successfully
   '4 Selected milestone template should be deleted
'***************************************************************************************************


Wait g_TinyWaitMedium
FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyUserSetup_Functionalities","Script Name - E2E_Settings_CompanyUserSetup_MilesttoneTemplate", Null

'====== Go to Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_Settings_MilestoneTab "Milestone Templates"

'====== Verifiy Create Milestone Template ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1005","Verify Create Milestone Template", Null
CompanyUserSetup_DefaultTemplateCreation()
strTemplateName = CompanyUserSetup_MilestoneTemplateCreation("MileStoneData")

'====== Verify Duplicate Milestone Template ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1028","Verify Duplicate Milestone Template", Null
BIZ_CompanyUserSetup_MilestoneTemplateDuplication strTemplateName

'====== Verify Edit Milestone Template ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1027","Verify Edit Milestone Template", Null
strMilestoneTemplate = CompanyUserSetup_EditMilestoneTemplate("MileStoneData",strTemplateName)

'====== Verify Delete Milestone Template ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1029","Verify Delete Milestone Template", Null
BIZ_MilestoneTemplate_Delete strMileStoneTemplate
CompanyUserSetUp_MilestoneTemplate_DeleteValidation strMileStoneTemplate
BIZ_Settings_ClickClose()
wait g_TinyWaitMedium
