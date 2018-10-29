'@ TestCase:
   '1  NICE-2548 TC23 - TC24 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Current Role option with Custom Role & Milestone
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    '	<DDM.xslx>,<FeeRule>,<NICE-2549>
    '	<DDM.xslx>,<FeeRule>,<NICE-2549_1>
    '	<DDM.xslx>,<FeeRule>,<NICE-2549_2>    
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2549>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2549>
    '	<CompanyUserSetup_Roles_Groups.xlsx>,<Roles>,<NICE-2548>
'@ Pre-Conditions: NA
'@ Description:
	'Verify execution of a scenario for custom Role and Milestone.
'@ Test steps:
	'Navigate to Settings > Company/User Setup > Roles and add a new custom role with Personas Loan Processor and Underwriter.
	'Navigate to Settings > Company/User Setup > Milestones and add a new custom milestone that is associated with the new role defined in the previous step.
	'Click on the Milestone Templates tab, select the Default Template, and on the Default Template Milestones tab add the new custom milestone to the list after the Processing milestone.
	'Add a DDM Fee Rule that populates a Fee Line # that has no duplicate, add three scenarios with Conditions dropdown on the Details tab set to "Current Role", one for Qualification, one for Processing, and one for the new custom milestone. For each scenario set unique specific values for the Description, Borrower and Seller fields. Save the rule and activate all scenarios.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, fill in some basic info on the Borrower Summary - Origination form and click the save icon.
	'Click on the Log tab, select the Qualification milestone, select users for the current and next milestones, click the Finished checkbox and click the save icon.
	'Click on the Log tab, select the Processing milestone, select a user for the next milestone, click the Finished checkbox and click the save icon.
	'Click on the Log tab, select the new custom milestone, select a user for the next milestone, click the Finished checkbox and click the save icon.
'@Expected Result:
	'New role successfully defined and saved.
	'New milestone successfully defined and saved.
	'Default Template successfully updated and saved.
	'Rule/scenarios successfully defined, saved and activated.
	'DDM DPT change successfully saved.
	'Fee Line # fields are NOT populated by the rule.
	'Fee Line # fields are populated by the Qualification scenario.
	'Fee Line # fields are populated by the Processing scenario.
	'Fee Line # fields are populated by the scenario for the new custom milestone/role.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : NICE-2549","TC24 - NICE-2306 - Verify DDM Fee Rule Condition Execution for Current Role option with Custom Role & Milestone", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"

Dim strRowID
strRowID="NICE2548"
'BIZ_Nav_HierarchyTree "Company/User Setup","Roles"
'BIZ_Roles_CreateNew strRowID
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
BIZ_Milestone_CreateCustom "AutoCustom"
Set objData=FRM_DS_GetTestData("CompanyUserSetup_Roles_Groups", "Roles", strRowID)
BIZ_Milestone_ChangeRole "AutoCustom",FRM_DS_GetValue(objData, "RoleName")
Set objData=nothing

BIZ_Nav_Settings_MilestoneTab "Milestone Templates"
MilestoneTemplate_ActivateDefaultTemplate
DDM_SelectDefaultTemplate_MilestoneTab
BIZ_MilestoneTemplate_SetMilestonePosition "AutoCustom","3"

BIZ_Settings_ClickClose()

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_FeeRule_CreateRule "NICE-2549"

BIZ_DDM_AddFeeScenarioToRule("NICE-2549_1")
BIZ_DDM_AddFeeScenarioToRule("NICE-2549_2")

BIZ_DDM_ActivateAllFeeRuleScenarios "NICE-2549"
'======Check the loan save checkbox=======
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"

'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2549")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2549")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Forms_Open "2015 Itemization"
Set objBorrowerPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
objBorrowerPage.WebButton("html id:=btnPop808").highlight
'==========Verify the rule has not been applied=====
FRM_Logger_ReportInfoEvent "Verify rule not enforced","Since scenario does not match Current Role option", Null
DDM_VerifyFeeRuleActiveCR "NICE-2549","Not Applied","4001"


BIZ_Forms_Open "Borrower Summary - Origination"

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

BIZ_Forms_Open "2015 Itemization"
objBorrowerPage.WebButton("html id:=btnPop808").highlight
'==========Verify that Scenario 1 has been enforced=====
DDM_VerifyFeeRuleActiveCR "NICE-2549","","4001"

BIZ_Loan_Exit False
Set objSetupContainer= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objRulesEditPage= objSetupContainer.SwfWindow("swfname:=FeeScenarioRules")
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_OpenExistingRule ("Auto123")
'Deactivate scenario 1 since it is in the top in the order
'scenario 2 would be enforced if scenario 1 is deactivated since it is second in the order
BIZ_DDM_FeeRule_DeactivateScenario ("Fee Scenario 1") 
GUI_SwfButton_Click objRulesEditPage.SwfButton("swfname:=btnClose")
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

BIZ_Forms_Open "2015 Itemization"
objBorrowerPage.WebButton("html id:=btnPop808").highlight
'==========Verify that Scenario 2 has been enforced=====
DDM_VerifyFeeRuleActiveCR "NICE-2549_1","","4001"
BIZ_Loan_Exit False

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"
BIZ_DDM_FeeRule_OpenExistingRule ("Auto123")
'Deactivate scenario 2
'scenario 3 would be enforced if scenario 1 is deactivated since it is third in the order
BIZ_DDM_FeeRule_DeactivateScenario ("Fee Scenario 2") 
GUI_SwfButton_Click objRulesEditPage.SwfButton("swfname:=btnClose")
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

BIZ_Forms_Open "2015 Itemization"
objBorrowerPage.WebButton("html id:=btnPop808").highlight
'==========Verify that Scenario 3 has been enforced=====
DDM_VerifyFeeRuleActiveCR "NICE-2549_2","","4001"

'========cleanup activities==========

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Milestones"
BIZ_Milestone_ChangeRole "AutoCustom","Shipper"

BIZ_Nav_HierarchyTree "Dynamic Data Management", "Fee Rules"

BIZ_DDM_DeactivateAllFeeRuleScenarios("NICE-2549")

BIZ_Settings_ClickClose()

Set objBorrowerPage = nothing

BIZ_Login_UserLogout


