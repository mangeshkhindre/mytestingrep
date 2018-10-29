'@ TestCase:
   '1  NICE-2548 TC23 - NICE-2306 - Verify DDM Field Rule Condition Execution for Current Role option with Custom Role & Milestone
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
      '	<DDM.xslx>,<DDMFieldRule>,<NICE-2548>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2548_1>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2548_2>    
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2548>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2548>
    '	<CompanyUserSetup_Roles_Groups.xlsx>,<Roles>,<NICE-2548>
'@ Pre-Conditions: NA
'@ Description:
	'Verify execution of a scenario for custom Role and Milestone.
'@ Test steps:
	'Navigate to Settings > Company/User Setup > Roles and add a new custom role with Personas Loan Processor and Underwriter.
	'Navigate to Settings > Company/User Setup > Milestones and add a new custom milestone that is associated with the new role defined in the previous step.
	'Click on the Milestone Templates tab, select the Default Template, and on the Default Template Milestones tab add the new custom milestone to the list after the Processing milestone.
	'Navigate to Settings > DDM > Field Rules, add a new Field rule that populates the Borrower Middle Name (field 4001), add three scenarios with Conditions dropdown on the Details tab set to "Current Role", one for Qualification, one for Processing, and one for the new custom milestone. Set unique specific values for field 4001 on the Values tab and activate all scenarios.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, fill in some basic info on the Borrower Summary - Origination form leaving the borrower middle name blank and click the save icon.
	'Click on the Log tab, select the Qualification milestone, select users for the current and next milestones, click the Finished checkbox and click the save icon.
	'Click on the Log tab, select the Processing milestone, select a user for the next milestone, click the Finished checkbox and click the save icon.
	'Click on the Log tab, select the new custom milestone, select a user for the next milestone, click the Finished checkbox and click the save icon.
'@Expected Result:
	'New role successfully defined and saved.
	'New milestone successfully defined and saved.
	'Default Template successfully updated and saved.
	'Rule/scenarios successfully defined, saved and activated.
	'DDM DPT change successfully saved.
	'Borrower middle name is NOT populated with a new value by the rule.
	'Borrower middle name is populated by the Qualification scenario.
	'Borrower middle name is populated by the Processing scenario.
	'Borrower middle name is populated by the scenario for the new custom milestone/role.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2548","TC23 - NICE-2306 - Verify DDM Field Rule Condition Execution for Current Role option with Custom Role & Milestone", Null

'BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
BIZ_Milestone_CreateCustom "AutoCustom"
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"

Dim strRowID
strRowID="NICE2548"
Set objMainWin=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objData=FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", strRowID)
strRoleName=FRM_DS_GetValue(objData, "RoleName")

BIZ_Nav_HierarchyTree "Company/User Setup","Roles"

boolFound = BIZ_Roles_SelectExistingRole(strRoleName)
If boolFound Then
    GUI_SwfObject_Click objMainWin.SwfObject("swfname:=stdIconBtnDelete")
    If objMainWin.Dialog("text:=Encompass").Exist Then
        'GUI_Dialog_Encompass_Yes("Are you sure you want to delete selected role?")
        GUI_DialogObject_Encompass_Click objMainWin.Dialog("text:=Encompass"),2,"Are you sure you want to delete selected role?","Yes"
        BIZ_Roles_CreateNew strRowID
    End If
Else
    BIZ_Roles_CreateNew strRowID
End If 

BIZ_Milestone_ChangeRole "AutoCustom",strRoleName
Set objData=Nothing
Set objMainWin=Nothing
BIZ_Nav_Settings_MilestoneTab "Milestone Templates"
MilestoneTemplate_ActivateDefaultTemplate
DDM_SelectDefaultTemplate_MilestoneTab
BIZ_MilestoneTemplate_SetMilestonePosition "AutoCustom","3"

BIZ_Settings_ClickClose()

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

BIZ_DDM_CreateNewFieldRule "NICE-2548"
BIZ_DDM_AddScenarioToRule("NICE-2548_1")
BIZ_DDM_AddScenarioToRule("NICE-2548_2")

DDM_ActivateAllFieldScenarios "NICE-2548"

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"


'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2548")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2548")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

'==========Verify the rule has not been applied=====
FRM_Logger_ReportInfoEvent "Verify rule not enforced","Since scenario does not match Current Role option", Null
DDM_VerifyFieldRuleActiveCR "NICE-2548","Not Applied","4001"

BIZ_Nav_Loan_LogTab_SelectWorksheet "Qualification"	

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")		
'==============Assign Loan officer====================
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
'==============Assign Loan processor====================
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"

'===================Finish the Qualification milestone=================
If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="False" Then
	GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished"), "ON"
	If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="True" Then
		FRM_Logger_ReportInfoEvent "Finish Qualification milestone","Finished checkbox is checked on Qualification tab", Null
	Else
		FRM_Logger_ReportInfoEvent "Finish Qualification milestone","Finished checkbox could not be checked on Qualification tab", Null
	End If	
End If


BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"
'==========Verify that Scenario 1 has been enforced=====
DDM_VerifyFieldRuleActiveCR "NICE-2548","","4001"

BIZ_Loan_Exit False

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
'Deactivate scenario 1 since it is in the top in the order
'scenario 2 would be enforced if scenario 1 is deactivated since it is second in the order
BIZ_DDM_DeActivateSpecificFieldScenario "NICE-2548"
BIZ_Settings_ClickClose()

BIZ_Loan_OpenByLoanNumber(strLoanNumber)
'==========Checking for processing================
BIZ_Nav_Loan_LogTab_SelectWorksheet "Processing"	

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
'===================Finish the Processing milestone=================
If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="False" Then
	GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished"), "ON"
	If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="True" Then
		FRM_Logger_ReportInfoEvent "Finish Processing milestone","Finished checkbox is checked on Processing tab", Null
	Else
		FRM_Logger_ReportInfoEvent "Finish Processing milestone","Finished checkbox could not be checked on Processing tab", Null
	End If	
End If


BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"
'==========Verify that Scenario 2 has been enforced=====
DDM_VerifyFieldRuleActiveCR "NICE-2548_1","","4001"

BIZ_Loan_Exit False

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
'Deactivate scenario 2 
'scenario 3 would be enforced if scenario 2 is deactivated since it is third in the order
BIZ_DDM_DeActivateSpecificFieldScenario "NICE-2548_1"
BIZ_Settings_ClickClose()

BIZ_Loan_OpenByLoanNumber(strLoanNumber)
'==========Checking for AutoCustom milestone================
BIZ_Nav_Loan_LogTab_SelectWorksheet "AutoCustom"	

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
'===================Finish the AutoCustom milestone=================
If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="False" Then
	GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished"), "ON"
	If SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished").GetROProperty("checked")="True" Then
		FRM_Logger_ReportInfoEvent "Finish AutoCustom milestone","Finished checkbox is checked on AutoCustom tab", Null
	Else
		FRM_Logger_ReportInfoEvent "Finish AutoCustom milestone","Finished checkbox could not be checked on AutoCustom tab", Null
	End If	
End If

BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"
'==========Verify that Scenario 3 has been enforced=====
DDM_VerifyFieldRuleActiveCR "NICE-2548_2","","4001"


'========cleanup activities==========

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

DDM_DeactivateAllFieldScenarios("NICE-2548")

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout

