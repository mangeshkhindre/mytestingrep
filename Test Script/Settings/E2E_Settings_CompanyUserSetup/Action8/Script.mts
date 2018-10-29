



'@**************************************************************************************************
'@ TestStory: PTAC-1245 CompanyUserSetup
'@ TestCase:
   '1 PTAC-995 - Verification of creating the User Group
   '2 PTAC-996 - Verificaiton of editing the User Group
   '3 PTAC-997 - Verification of duplicating the User Group
   '4 PTAC-998 - Verification of deleting an User Group
   '5 PTAC-999 - Verification of adding users to the User Group
 '@ Test Automation JIRA Task: PTAC-1892 Settings_CompanyUserSetup_UserGroup
'@ TestData: CompanyUserSetup_Roles_Groups,Groups and UserGroup
'@ Pre-conditions: 
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Company/User Setup:User Groups
'@ Description:  
'@ TestSteps:
  'Step1 PTAC-995 Test Steps
   '1 In the Encompass main menu -> click on Setting window -> Company User Setup -> User Groups.
   '2 Click on 'New' icon or right click in the 'Create a Group' grid and select 'New' option
   '3 In the 'Group Name' pop-up window, enter name
   '4 Click 'Ok' button
  'Step1 PTAC-996 Test Steps
   '1 Select existing  User Group
   '2 Click the 'Borrower Contacts' tab
   '3 Click the 'Add' icon in 'Access to other users Borrower Contacts' section
   '4 Expand or double click 'Administration' folder and select user from hierarchy
   '5 Click the 'Add to Group - this level/user only' icon at the upper-right of the window.
   '6 Click 'Ok' button in the 'User Group Configuration' window
   '7 Click on 'Save' button.
  'Step1 PTAC-997 Test Steps
   '1 Select existing User Group
   '2 Click 'Duplicate' icon or right click in the grid and select 'Duplicate' option.
  'Step1 PTAC-998 Test Steps
   '1 Select existing User Group and click 'Delete' icon or right click in the grid and select 'Delete' option
   '2 In the confirmation dialog box with message 'Are you sure you want to delete group?', click on 'No' button.
  'Step2 PTAC-998 Test Steps
   '1 Select existing User Group and click 'Delete' icon or right click in the grid and select 'Delete' option.
   '2 In the confirmation dialog box with message 'Are you sure you want to delete group?', click on 'Yes' button.
  'Step1 PTAC-999 Test Steps
   '1 Select existing User Group
   '2 Click on the 'Members' tab
   '3 Click the 'Configure Group' icon (add icon)
   '4 Expand or double click 'Administration' folder and select user from hierarchy
   '5 Click the 'Add to Group - this level/user only' icon
   '6 Click 'Ok' button in the 'User Group Configuration' window
   '7 Click 'Save' button.
 '@ ExpectedResult:
  'PTAC-995 Expected Steps
   '1 A new 'User Group' gets created with given name and appears at the bottom of the 'Create a Group' pane.
  'PTAC-996 Expected Steps
   ' Selected borrower gets added in the 'Access to other users Borrower Contacts' list with following fields
   ' a. Name
   ' b. Access Right
  'PTAC-997 Expected Steps
   '1 Another User Group gets created with same name prefixed by "Copy of".
   '2 Original User Group exists and appears in the grid.
  'PTAC-998 Expected Steps
   '1 The selected User group still appears in the list.
   '2 The selected User group gets deleted.
  'PTAC-999 Expected Steps
   '1 Selected user gets added in the 'Current Members' list.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: E2E_CompanyUserSetup_Functionalities","Script Name - E2E_Settings_CompanyUserSetup_UserGroup", Null

'====== Go to Settings/Company/User Setup/;User Setup ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"

'====== Verification of creating the User Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-995","Verification of creating the User Group", Null
strNewGroup= CompanyUserSetup_CreateAndValidateUserGroups()

'====== Verificaiton of editing the User Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-996","Verificaiton of editing a User Group", Null
strActualMember1=BIZ_CompanyUserSetup_UserGroups_EditGroup("UserGroup",strNewGroup)

'====== Verification of duplicating the User Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-997","Verification of duplicating the User Group", Null
strDuplicateGroup=BIZ_CompanyUserSetup_UserGroups_DuplicateGroup(strNewGroup)

'====== Verification of deleting an User Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-998","Verification of deleting a User Group", Null
BIZ_CompanyUserSetup_UserGroups_DeleteGroup strDuplicateGroup

'====== Verification of adding users to the User Group ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-999","Verification of adding users to the User Group", Null
BIZ_CompanyUserSetup_UserGroups_UserMemebrGroup "UserGroup",strNewGroup,strActualMember1

'Delete created user groups
BIZ_CompanyUserSetup_UserGroups_DeleteGroup strNewGroup

'Close the settings window
BIZ_Settings_ClickClose()


