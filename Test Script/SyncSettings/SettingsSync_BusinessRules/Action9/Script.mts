'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3019 - verify synced 'Loan Form Printing' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 SettingsSync_BusinessRules
'@ TestData:
   '1 BusinessRule_LoanFormPrinting,LoanFormPrinting and SettingsSync_LoanFormPrinting
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Select Settings-> Business Rules-> Loan Form Printing
   '3 Click on New icon in Environment1
   '4 Enter the data
   '  Rule Name: Input Form List
   '  select below channels: Brokered,Correspondent
   '  In section 3 select below data:
   '  Select Yes option button
   '  Doc Type is Alternative"
   '5 In section 4 and click Add button.
   '6 Enter the data
   ' Print Form Name: Select ""1003 Page 1"" from standard form
   ' Add Field ID:4000 in Required Fields tab"
   '7 Click OK button
   '8 Click on Save button
   '9 Select rule in Environment 1 and click sync to arrow button
   '10 Verify that the Rule data in Environment 2 should match with Environment1
   '11 Delete the created record in both environments
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Loan Form Printing module should open.
   '3 Print Suppression Business Rule window should open.
   '4 Data should be entered.
   '5 Print Form Suppression Rule window should open.
   '6 Data to be entered
   '7 Data should be saved and displayed in the grid.
   '8 Data should be saved and displayed in the grid.
   '9 Rule should be synced to Environment2.
   '10 Rule data in Environment 2 should match with Environment1
   '11 The record to be deleted
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test case : PTAC-3019","verify synced 'Loan Form Printing' data in Environment 2 should match with Environment 1", Null

'====== Select Loan Form Printing Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Loan Form Printing"
Wait g_ShortWaitMedium

'====== Create Loan Form Printing in Environment 1 ======
'====== Validate Loan Form Printing Data in Environment 1 ======
FRM_Logger_ReportInfoEvent "Loan Form Printing", "Create Loan Form Printing template in Environment 1", null
strLoanFormPrintingName= Settings_Sync_BusinessRules_CreateLoanFormPrintingRule("SettingsSync_LoanFormPrinting",1)
FRM_Logger_ReportInfoEvent "Loan Form Printing", "Data saved and Validate new created template '"&strLoanFormPrintingName&"' data in environment 1", Null
Settings_Sync_BusinessRules_ValidateLoanFormPrintingRuleData "SettingsSync_LoanFormPrinting",1,strLoanFormPrintingName

'====== Click on Sync arrow button ======
'====== Validate Loan Form Printing Data in Environment 2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Loan Form Printing ", "Validate Loan Form Printing '"&strLoanFormPrintingName&"' data in environment 2", Null
Settings_Sync_BusinessRules_ValidateLoanFormPrintingRuleData "SettingsSync_LoanFormPrinting",0,strLoanFormPrintingName

'====== Delete the Loan Form Printing in environment 1 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Loan Form Printing data in environment 1", Null
Settings_Sync_BusinessRules_DeleteRule strLoanFormPrintingName,1

'====== Delete the Loan Form Printing in environment 2 ======
FRM_Logger_ReportInfoEvent "Settings_Sync_BusinessRules_DeleteRule", "Delete the Loan Form Printing data in environment 2", Null
Settings_Sync_BusinessRules_DeleteRule strLoanFormPrintingName,0
