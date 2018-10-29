'@**************************************************************************************************
'@ TestStory: PTAC-1673 Company Org Setup
'@ TestCase: 
   '1 PTAC-1608 - Validate newly created milestone is added to default milestone and same is seen when the new loan is initiated
'@ Test Automation JIRA Task: PTAC-1793 Settings_CompanyOrganizationSetUp_NewlyCreatedMilestone
'@ TestData: Setttings_CompanyUserSetup, MileStone and PTAC-1608_Milestone
'@ Pre-conditions: 
   '1 User logged into Encompass as an admin
'@ Description:  
'@ TestSteps:
   '1 Go to the Encompass Settings --> Company/User Setup --> Milestones
   '2 Click on 'add Milestone(+)' icon and enter the data in 'Milestone Details'  popup window according to provided test data
   '3 Click on 'Save' button
   '4 Click on 'Milestone Templates' tab and check all  the templates are 'Inactive' expect 'Default' template.
   '5 If other templates are 'Active', select the template and click on 'Deactive' button
   '6 Select the default template(should be 'Active') -->  'Milestone'  tab and click on 'New(+)' icon
   '7 In 'Milestone Selection' popup window, check the checkbox for created milestone (Milestone121) and click on 'Add' button.
   '8 Click on 'Save' icon in 'Default Template' section
   '9 Close the Settings window and close the Encompass main window
   '10 Re login to Encompass with admin credentials
   '11 Click on 'Pipeline'  tab and click on 'New(+)' icon
   '12 In 'New Loan' popup window, select 'New Bank Loan'
   '13 Select 'Log' tab and check the milestone whichuser has added
   '14 Click on 'Close' icon and click 'No' button in encompass popup message
   '15 Go o Encompass Settings --> Company/User Setup --> Milestones   
   '16 In 'Milestones' tab, select the created milestone 'Milestone121' and click on 'Archive' button
   '17 In 'Archive Milestone' popup window, select the 'milestone121' and click on 'Continue' button
   '18 Close settings window and close Encompass main window
'@ ExpectedResult:
   '1 Newly created milestone  added successfully
   '2 Milestone added successfully in the template
   '3 Milestone added and positioned correctly as per the settings made
   '4 Milestone moved to Archived Milestones
'***************************************************************************************************



Dim strMilestone
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1793","Script Name - Settings_CompanyOrganizationSetUp_NewlyCreatedMilestone", Null

'====== Go to Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"

'====== Validate newly created milestone is added to default milestone and same is seen when the new loan is initiated ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1608","Validate newly created milestone is added to default milestone and same is seen when the new loan is initiated", Null
strMilestone = BIZ_CompanyUserSetup_CreateMileStone ("PTAC-1608_Milestone")
Settings_MilestoneTemplate_SetDefaultForNewLoan "Default Template",strMilestone
BIZ_Settings_ClickClose()

'==================================== nEWLY cREATED rOLE mERGED ========================================================

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1610","Validate newly created role is assigned and user associated with role is getting populated correctly when loan is moving from one milestone to another", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
strUserId = BIZ_OrganizationUsers_CreateUser("PTAC_1610_SetOrganizationData")
BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
strRole = Settings_CompanyUserSetup_Roles_CreateNew ("PTAC-1610_SetData")
Settings_CompanyOrganizationSetup_SelectPersona "PTAC-1610_SetData",strRole
BIZ_Settings_ClickClose()

BIZ_Login_UserLogout()

'====== Login to the Encompass as admin ======
'====== Verify Milestone ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline" 
BIZ_AlertsAndLog_VerifyItemExist "Log",strMilestone & " expected"


'====== Set Values in Borrower Summary Orgination ======
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1610_SetBorrowerInformation"
BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").swfLabel("swfname:=labelCurrentLA"),"60",strRole
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
BIZ_Loan_SelectMilestoneUser strUserId
BIZ_Loan_Exit False

'====== Go to Settings ======
'====== Verify Move Current Milestone to Archived milestone ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
Settings_CompanyUserSetup_ArchivedMilestoneValidation "PTAC-1608_Milestone",strMilestone
BIZ_Settings_ClickClose()

'====== Go to Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
Settings_CompanyOrganizationSetup_SelectRole "PTAC-1610_SetRoles"
BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
BIZ_CompanyUserSetup_Roles_DeleteRole "PTAC-1610_SetData",strRole
BIZ_Settings_ClickClose()


































'@ TestStory: PTAC-1673 Company Org Setup
'@ TestCase : 
   '1 PTAC-1610 - Validate newly created role is assigned and user associated with role is getting populated correctly when loan is moving from one milestone to another
'@ Test Automation JIRA Task: PTAC-1794 - Settings_CompanyOrganizationSetUp_NewlyCreatedRole
'@ TestData: 
   '1 CompanyUserSetup_Roles_Groups, Roles and PTAC-1610_SetData
   '2 CompanyUserSetup_Roles_Groups, Roles and PTAC-1610_SetRoles
   '3 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-1610_SetBorrowerInformation
'@ Pre-conditions: 
   '1 User logged into Encompass as an admin and created user with persona Closer linked to it 
'@ Description:  
'@ TestSteps:
   '01 Go to the Encompass Settings --> Company/User Setup --> Roles 
   '02 Click on 'New(+)' icon  in the Roles title section.
   '03 In 'Create/Edit Role' popup window enter data according to test data.
   '04 Go to 'All Users in These Personas', click on 'New(+)' icon 
   '05 In 'Select Persona' popup window, select 'Closer' persona and click on 'Select' button.
   '06 Go to 'User Groups', click on 'New(+)' icon 
   '07 In 'Select User Group' popup window, select 'All Users'  and click on 'Select' button and click on 'Save' button.    
   '08 Go to 'Role Mapping' section  -->  'Which Role Represent the Loan Officer'  label and select the persona 'Closer' from the dropdown menu and click on 'Save' button.
   '09 Click on 'Milestones' --> double click the 'Qualification' milestone --> Select Role as 'Sample Role' from  the dropdown and click on 'Save' button.
   '10 Close 'Settings' window and Encompass main window.
   '11 Re login to Encompass with admin credentials.
   '12 Click on 'Pipeline'  tab and click on 'New(+)' icon.
   '13 In 'New Loan' popup window, select 'New Bank Loan' --> Forms --> Borrower Summary Origination -->  enter the details according the test data and click on 'Save' button.
   '14 Select 'Log' tab select the milestone 'Qualification'.
   '15 Now validate that the new role (Sample Role) created earlier should be seen.
   '16 Now click on the magnifying glass as seen next to the role and validate that the user as mentioned in the pre-condition should be there.
   '17 In 'Select Loan Team Member' popup window, select the created user in pre-requisite and click 'OK' button.
   '18 Click on 'Close' icon and select 'No' button in the Encompass popup message.
   '19 Go to  Encompass Settings --> Company/User Setup --> Milestones --> Double click 'Qualification' milestone and select role as 'Loan Officer' from the dropdown menu and click on 'Save' button.
   '20 Close the Settings window and then close Encompass  main window.
'@ ExpectedResult:
   '1 New role created successfully
   '2 Sample Role is selected
   '3 Encompass application is closed
   '4 User able to logged in to Encompass with admin credentials
   '5 Test data is entered in 'Borrower Summary Origination' form
   '6 New role should be available. 
   '7 Created user is available in the 'Select Loan Team Member' popup window.
   '8 Loan Officer role is selected
'***************************************************************************************************

'FRM_RT_SetupTest(Null)
'
'FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-1794","Script Name: Settings_CompanyOrganizationSetUp_NewlyCreatedRole", Null
'Dim strUserId, strRole
''====== Login to the Encompass as admin ======
'BIZ_Login_UserLogin "admin_core2p"
'
''====== Go to Settings ======
''====== Validate newly created role is assigned and user associated with role is getting populated correctly when loan is moving from one milestone to another =====
'FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1610","Validate newly created role is assigned and user associated with role is getting populated correctly when loan is moving from one milestone to another", Null
'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'strUserId = BIZ_OrganizationUsers_CreateUser("PTAC_1610_SetOrganizationData")
'BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
'strRole = Settings_CompanyUserSetup_Roles_CreateNew ("PTAC-1610_SetData")
'Settings_CompanyOrganizationSetup_SelectPersona "PTAC-1610_SetData",strRole
'BIZ_Settings_ClickClose()
'BIZ_Login_UserLogout()
'
''====== Login to the Encompass as admin ======
'BIZ_Login_UserLogin "admin_core2p"
'
''====== Set Values in Borrower Summary Orgination ======
'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
'BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1610_SetBorrowerInformation"
'BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"
'GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").swfLabel("swfname:=labelCurrentLA"),"60",strRole
'GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
'BIZ_Loan_SelectMilestoneUser strUserId
'BIZ_Loan_Exit False
'
''====== Go to Settings ======
'BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'Settings_CompanyOrganizationSetup_SelectRole "PTAC-1610_SetRoles"
'BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
'BIZ_CompanyUserSetup_Roles_DeleteRole "PTAC-1610_SetData",strRole
'BIZ_Settings_ClickClose()
'
''====== Logout from the application ======
'BIZ_Login_UserLogout()
'FRM_RT_TearDownTest(Null)
























































