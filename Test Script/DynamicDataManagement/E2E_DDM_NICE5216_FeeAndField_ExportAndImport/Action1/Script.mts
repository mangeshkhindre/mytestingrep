
'@**************************************************************************************************
'@ TestStory :CTA-426 DDM - NICE5216 - DDM Enhancements for fee and field rule
'@ TestStories Covered:
	'NICE-7088 - DDM: Expose API to Import Field Rules
	'NICE-7093 - DDM: UI Only - Import a New Field Rule
'@ Test Automation JIRA Task: CTA-426 DDM Enhancements for fee and field rule
'@ TestData:
'		<Settings_LoanSetup.xlsx>,<CustomFields>,<NICE-5216>
'		<CompanyUserSetup_Roles_Groups.xlsx>,<Roles>,<NICE2548>
'		<DDM.xlsx>,<DataTable>,<NICE-5216>
'		<DDM.xlsx>,<DDMFieldRule>,<NICE-5216>
'		<DDM.xlsx>,<FeeRule>,<NICE-5216>
'@ Pre-Conditions: 
'         1."Shipper" role should exist
'         2."Rebuild Field Search Data" option should be present under "System Administration" in Settings
''@ Description:
'	     1. Create,export and import field rule and check for validate dependencies
'		 2. Create,export and import fee rule and check for validate dependencies
'@ Test steps:
'	     01. Create a new custom field 'CX.AUTO5216'
'	     02. Create a new milestone 'AutoCustom'
'	     03. Create a new role 'Auto123'
'	     04. Change role to 'Auto123' for milestone 'AutoCustom'
'	     05. Create new data table DTAuto5216
'	     06. Create new field rule AutoNICE5216 with dependencies on 'CX.AUTO5216','AutoCustom','Auto123' and 'DTAuto5216'
'	     07. Export field rule AutoNICE5216
'	     08. Delete field rule AutoNICE5216
'	     09. Create new fee rule AutoNICE5216 with dependencies on 'CX.AUTO5216','AutoCustom','Auto123' and 'DTAuto5216'
'	     10. Export fee rule AutoNICE5216
'	     11. Delete fee rule AutoNICE5216
'	     12. Delete data table DTAuto5216
'	     13. Rename milestone 'AutoCustom' to 'AutoCustom#'
'	     14. Delete role 'Auto123'
'	     15. Delete custom field 'CX.AUTO5216'
'	     16. Verify failed dependencies on importing field rule AutoNICE5216
'	     17. Verify failed dependencies on importing fee rule AutoNICE5216
' 		 18. Re create custom field 'CX.AUTO5216'
'	     19. Rename milestone 'AutoCustom#' to 'AutoCustom'
'	     20. Re create role 'Auto123'
' 		 21. Change role to 'Auto123' for milestone 'AutoCustom'
'	     22. Recreate data table DTAuto5216
'	     23. Verify that field rule AutoNICE5216 gets imported successfully
' 		 24. Verify that fee rule AutoNICE5216 gets imported successfully
'@Expected Result:
'	 Fee/Field rule should not get imported in case of failed dependencies.
'	 Fee/Field rule should get imported in case of passed dependencies.
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Story: CTA-426","Script Name :  NICE5216 - Import/Exprt Field rule", Null

'====== Login to the EncompBIZ_Nav_HierarchyTree "Company/User Setup","Roles"ass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
FRM_Logger_ReportStepEvent "Step 1","Create a new custom field 'CX.AUTO5216'",Null
'===========Create a new custom field CX.AUTO5216
BIZ_Settings_CreateCustomField "NICE-5216"
BIZ_Nav_HierarchyTree "System Administration","Rebuild Field Search Data"
Set objMainWin=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
GUI_SwfButton_Click objMainWin.SwfButton("swfname:=rebuildBtn")
GUI_Dialog_Encompass_Click "2","Rebuild search data","OK"

FRM_Logger_ReportStepEvent "Step 2","Create a new custom milestone 'AutoCustom'",Null
'========Create a new cutom milestone
BIZ_Nav_Settings_MilestoneTab("Milestones")
Set objSettingWindow = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objMilestoneList = objSettingWindow.SwfObject("swfname:=gvMilestones")
Set objScrollBar = objSettingWindow.SwfScrollBar("swfname:=vPanelScrollBar")
'========if cutom milestone AutoCustom# exists then rename it
boolMilestoneFlag = GUI_List_ClickRow(objMilestoneList, objScrollBar, 0, "AutoCustom#", True, False, False, "Single")
If boolMilestoneFlag  Then
	BIZ_Milestone_Rename "AutoCustom#","AutoCustom"
Else	
	BIZ_Milestone_CreateCustom "AutoCustom"
End If
Set objScrollBar = Nothing
Set objMilestoneList = Nothing
Set objSettingWindow = Nothing

'===Change role of AutoCustom milestone to Shipper so that we dont get error message on deleting role Auto123 later in the script
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"
Set objData=FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", "NICE2548")
strRoleName=FRM_DS_GetValue(objData, "RoleName")
BIZ_Nav_HierarchyTree "Company/User Setup","Roles"

FRM_Logger_ReportStepEvent "Step 3","Create a new role 'Auto123' if not already exists",Null
'=====Delete role Auto123 if already exists
boolFound = BIZ_Roles_SelectExistingRole(strRoleName)
If boolFound Then
    GUI_SwfObject_Click objMainWin.SwfObject("swfname:=stdIconBtnDelete")
    If objMainWin.Dialog("text:=Encompass").Exist Then       
        GUI_DialogObject_Encompass_Click objMainWin.Dialog("text:=Encompass"),2,"Are you sure you want to delete selected role?","Yes"
        BIZ_Roles_CreateNew "NICE2548"
    End If
Else
    BIZ_Roles_CreateNew "NICE2548"
End If 
FRM_Logger_ReportStepEvent "Step 4","Change role to Auto123 for milestone AutoCustom",Null
BIZ_Milestone_ChangeRole "AutoCustom",strRoleName
Set objData=Nothing

FRM_Logger_ReportStepEvent "Step 5","Create new data table DTAuto5216",Null
BIZ_DDM_CreateNewDataTable "NICE-5216"

FRM_Logger_ReportStepEvent "Step 6","Create new field rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_CreateNewFieldRule "NICE-5216"

FRM_Logger_ReportStepEvent "Step 7","Export field rule AutoNICE5216",Null
BIZ_DDM_ExportFeeFieldRule "NICE-5216","Field"

FRM_Logger_ReportStepEvent "Step 8","Delete field rule AutoNICE5216",Null
BIZ_DDM_DeleteFieldRule "AutoNICE5216"

FRM_Logger_ReportStepEvent "Step 9","Create new fee rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_CreateRule "NICE-5216"

FRM_Logger_ReportStepEvent "Step 10","Export fee rule AutoNICE5216",Null
BIZ_DDM_ExportFeeFieldRule "NICE-5216","Fee"

FRM_Logger_ReportStepEvent "Step 11","Delete field rule AutoNICE5216",Null
BIZ_DDM_FeeRule_DeleteRule "AutoNICE5216"

FRM_Logger_ReportStepEvent "Step 12","Delete data table DTAuto5216",Null
Set objData = FRM_DS_GetTestData("DDM", "DataTable", "NICE-5216")
strDataTableName=FRM_DS_GetValue(objData, "DataTableName")
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Tables"
BIZ_DDM_DeleteDataTable(strDataTableName)

'===Change role of AutoCustom milestone to Shipper so that we dont get error message on deleting role Auto123 later in the script
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"

FRM_Logger_ReportStepEvent "Step 13","Rename milestone 'AutoCustom' to 'AutoCustom#'",Null
BIZ_Milestone_Rename "AutoCustom","AutoCustom#"

BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
FRM_Logger_ReportStepEvent "Step 14","Delete role 'Auto123'",Null
BIZ_Delete_Role "Auto123"

FRM_Logger_ReportStepEvent "Step 15","Delete custom field 'CX.AUTO5216'",Null
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Custom Fields"
BIZ_Settings_DeleteCustomField "NICE-5216"

FRM_Logger_ReportStepEvent "Step 16","Import field rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-5216","Field",False

FRM_Logger_ReportStepEvent "Step 17","Import fee rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-5216","Fee",False

FRM_Logger_ReportStepEvent "Step 18","Re create custom field 'CX.AUTO5216'",Null
BIZ_Settings_CreateCustomField "NICE-5216"
BIZ_Nav_HierarchyTree "System Administration","Rebuild Field Search Data"
Set objMainWin=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
GUI_SwfButton_Click objMainWin.SwfButton("swfname:=rebuildBtn")
GUI_Dialog_Encompass_Click "2","Rebuild search data","OK"

FRM_Logger_ReportStepEvent "Step 19","Rename milestone 'AutoCustom#' to 'AutoCustom'",Null
BIZ_Milestone_Rename "AutoCustom#","AutoCustom"

FRM_Logger_ReportStepEvent "Step 20","Re create new role 'Auto123' if not already exists",Null
BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
BIZ_Roles_CreateNew "NICE2548"

FRM_Logger_ReportStepEvent "Step 21","Change role to Auto123 for milestone AutoCustom",Null
BIZ_Milestone_ChangeRole "AutoCustom",strRoleName

FRM_Logger_ReportStepEvent "Step 22","ReCreate data table DTAuto5216",Null
BIZ_DDM_CreateNewDataTable "NICE-5216"

FRM_Logger_ReportStepEvent "Step 23","Import field rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-5216","Field",True

FRM_Logger_ReportStepEvent "Step 24","Import fee rule AutoNICE5216",Null
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_ImportFeeFieldRule "NICE-5216","Fee",True

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout

FRM_RT_TearDownTest(Null)
