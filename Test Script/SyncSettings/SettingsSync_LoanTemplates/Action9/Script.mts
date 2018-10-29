'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
   '1 PTAC-3124 - The objective of test case is to verify synced 'Loan Template Sets' data in Environment 2 should match with Environment 1
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-3274 PTAC-3438 SettingsSync_LoanTemplates
'@ TestData:
   '1 Settings_LoanTemplates,LoanTemplateSet and  PTAC-3124_LoanTemplates_LoanTemplate Sets
'@ Pre-conditions:
   '1 Login as Admin user 
   '2 Go to Setting window
   '3 Select Business Rules
'@ Description:  
'@ TestSteps:
   '1 Login into Settings Sync Tool with Environment1 and Environment2 credentials.
   '2 Go to settings->Loan Templates-> Loan Template Set.
   '3 Click on New button in Environment1
   '4 Enter the data
   '  Enter Template name
   '5 Double-Click on the created template.
   '  Enter description"
   '6 Select the Document Set edit icon and select the template created in precondition
   '7 Select the Data Template edit icon and select the template created in precondition
   '8 Click on Save button
   '9 Select Template mentioned in Test data column and click Sync to arrow button.
   '10 Click on Yes button.
   '11 C lick on Ok button.
   '12 In Environment2, select the synced Settlement Service Provider and click on Edit icon
   '13 "Verify that below values are populated correctly:
   '  Name: Star Loan Template Set
   '  Description - Star Loan Template Set Description
   '  Document Set and Data Template is showing the selected template."
'@ ExpectedResult:
   '1 Settings Sync tool should be displayed with two environment details.
   '2 Loan Template Sets module should open.
   '  New Template should create in editable mode.
   '  Template name should be entered."
   '3 Loan Template Details window should open.
   '  Description should be entered."
   '4 Document Set template should be selected.
   '5 Data Template should be selected.
   '6 Template should be saved.
   '7 Settings Synchronization popup opens.
   '8 File System Setting pop-up opens
   '9 Template  should be synced to Environment2.
   '10 Loan Template  Details window  should be opened.
   '11 "Below values should be populated correctly:
   '  Name: Star Doc Set
   '  Description - Star Doc Set Description
   '  Document Set and Data Template should show the selected template."
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test case : PTAC-3124","verify synced 'Loan Template Sets' data in Environment 2 should match with Environment 1", Null

'Pre conditions create document set and input form set
'====== Select Document Sets Tab ======
 GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Document Sets"
strDocumentSet= SyncSettings_LoanTemplate_CreateDocumentSetsTemplate("PTAC-3121_LoanTemplates_DocumentSet",1)

'====== Select Input Form Sets Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"),"Input Form Sets"
strInputFormName= SyncSettings_LoanTemplate_CreateInputFormTemplate("PTAC-3122_LoanTemplates_InputFormSet",1)

'====== Select Loan template Sets Tab ======
 GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "Loan Template Sets"
 
   '====== Create Loan Template Sets in Environment 1 ======
'====== Validate Loan Template Sets Data in Environment 1 ======
strDataTemplateName= SyncSettings_LoanTemplate_CreateLoanTemplateSets("PTAC-3124_LoanTemplates_LoanTemplateSets",1,strDocumentSet,strInputFormName)
FRM_Logger_ReportInfoEvent "Loan Template Sets", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 2", Null
SyncSettings_LoanTemplate_VerifyLoanTemplateSetsTemplate "PTAC-3124_LoanTemplates_LoanTemplateSets",1,strDataTemplateName,strDocumentSet,strInputFormName

'====== Click on Sync arrow button ======
'====== Validate Synced TaskSet template for Environment2 ======
BIZ_SyncSettings_ClickArrow()
FRM_Logger_ReportInfoEvent "Loan Template Sets", "Data saved and Validate new created template '"&strDataTemplateName&"' data in environment 2", Null
SyncSettings_LoanTemplate_VerifyLoanTemplateSetsTemplate "PTAC-3124_LoanTemplates_LoanTemplateSets",0,strDataTemplateName,strDocumentSet,strInputFormName
'====== Delete the Template in environment 1 ======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 1", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,1

'====== Delete the Template in environment 2======
FRM_Logger_ReportInfoEvent "SyncSettings_LoanTemplate_DeleteTemplate", "Delete the Template in environment 2", Null
SyncSettings_LoanTemplate_DeleteTemplate strDataTemplateName,0

