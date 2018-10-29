'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3017 - Verify synced 'Persona Access to Loans' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_PersonaAccesstoLoans,PerosnaAccesstoLoans and SettingsSync_PersonaAccessLoans
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Persona Access to Loans
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Star Milestone Completion Rule
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 enter the data mentioned in Test Data column
   ' For "Loan Officer" persona, select "View Only" form the dropdown
   '6 Click on Save button
   '7 Select rule in Environment 1 and click sync to arrow button
   '8 Verify that the Rule data in Environment 2 should match with Environment1
   '9 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Persona Access to Loans module should open.
   '3 Persona Access to Loans Business Rule window should open.
   '4 Data should be entered.
   '5 Data should be entered.
   '6 Data should be saved and displayed in the grid.
   '7 Rule should be synced to Environment2.
   '8 Rule data in Environment 2 should match with Environment1
   '9 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3017","Verify synced 'Persona Access to Loans' data in Environment 2 should match with Environment 1", Null
'====== Select Persona Access to Loans Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Persona Access to Loans"
Wait g_ShortWaitMedium

'====== Create Persona Access to Loans in Environment 1 ======
'====== Validate Persona Access to Loans Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Persona Access to Loans", "Create Persona Access to Fields template in Environment 1", null
strPersonaAccessLoanName= Settings_Sync_BusinessRules_CreatePersonaAccesstoLoansRule("SettingsSync_PersonaAccessLoans",1)
FRM_Logger_ReportInfoEvent "Persona Access to Loans", "Data saved and Validate new created template '"&strPersonaAccessLoanName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidatePersonaAccesstoLoansRuleData "SettingsSync_PersonaAccessLoans",1,strPersonaAccessLoanName

'====== Click on Sync arrow button ======
'====== Validate Persona Access to Loans Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()

FRM_Logger_ReportInfoEvent "Persona Access to Loans ", "Validate Persona Access to Fields '"&strPersonaAccessLoanName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidatePersonaAccesstoLoansRuleData "SettingsSync_PersonaAccessLoans",0,strPersonaAccessLoanName

'====== Delete the Persona Access to Loans in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Persona Access to Loansdata in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strPersonaAccessLoanName,1
 
'====== Delete the Persona Access to Loans in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Persona Access to Loans data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strPersonaAccessLoanName,0
