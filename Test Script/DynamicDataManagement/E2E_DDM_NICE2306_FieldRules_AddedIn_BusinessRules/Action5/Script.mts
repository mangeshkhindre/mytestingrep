'@ TestCase:
   '1  TC02 - NICE-2435 - Verify DDM Field Rule Condition Execution for Current Role option
'@ Test Automation JIRA Task: NICE-2306 Automation - Fee and Field Rule E2E TC's
'@ TestData:
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2435>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2435_1>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2435_2>
    '	<DDM.xslx>,<DDMFieldRule>,<NICE-2435_3>
    '	<Forms_BorrowerSummaryOrigination.xlsx>,<SetHeadInfo>,<NICE-2435>
	'	<Forms_BorrowerSummaryOrigination.xlsx>,<SetBorrower>,<NICE-2435>
'@ Pre-Conditions: NA
'@ Description:
'	 Verify all defined options appear in role selection list and milestone dropdown.
	'Verify execution of a couple Current Role options successfully updates loan file.
	'Verify loan files that do not satisfy the condition are not updated by the rule.
'@ Test steps:
	'Navigate to Settings > DDM > Field Rules, add a new Field rule that populates the Borrower Middle Name (field 4001), set the Conditions dropdown on the Details tab to "Current Role" and observe the options available in the role selection list.
	'Observe the options available in the milestone dropdown.
	'On the Details tab click on the Role spyglass, select the Qualification milestone option and on the Value tab set a specific unique value for field 4001. Save the rule and activate the scenario.
	'On the Details tab add a 2nd scenario to the rule, click on the Role spyglass, select the Processing milestone option and on the Value tab set a specific unique value for field 4001. Save the rule and activate the scenario.
	'On DDM Data Population Timing settings page check the Loan Save checkbox and save the change.
	'From the Loan Pipeline view, create a new loan, fill in some basic info on the Borrower Summary - Origination form leaving the borrower middle name blank and click the save icon.
	'Click on the Log tab, select the Qualification milestone, select users for the current and next milestones and click the save icon.
	'Click on the Finished checkbox and the click on the save icon.
	'Click on the Log tab, select the Processing milestone, select a user for the next milestone and click the save icon.
	'Click on the Finished checkbox and the click on the save icon.
	'Edit the Field rule.
	'On the Details tab, select the Qualification scenario, choose Closer/Doc Signing in the Select Current Role popup and then change the milestone dropdown back to Qualification.
	'Save the rule, select the Processing scenario, choose Funder/Funding in the Select Current Role popup and then change the milestone dropdown back to Processing.
	'Save the rule.
	'Repeat steps 6 - 10 for a new loan.

'@Expected Result:
	'Role/milestone combinations listed on the Select Current Role popup match the list of Role/milestone combinations on the Settings > Company/User Setup > Milestones page that have Roles assigned (i.e. Milestones with no role should not appear in the options dropdown).
	'Milestones listed in the dropdown match the current and archived milestones on the Settings > Company/User Setup > Milestones page.
	'Rule is successfully saved and activated.
	'Rule is successfully saved and activated.
	'DDM DPT change successfully saved.
	'Borrower middle name is NOT populated with the new value by the rule.
	'Borrower middle name is NOT populated with the new value by the rule.
	'Finished checkbox becomes checked and the Borrower middle name is populated with the new value specified by the Qualification scenario.
	'Borrower middle name is NOT populated with the new value by the rule.
	'Finished checkbox becomes checked and the Borrower middle name is populated with the new value specified by the Processing scenario.
	'Rule successfully updated and saved.
	'Since the Roles defined in the rule no longer match the Milestone settings, the borrower middle name should NOT be updated for any of the steps.
'***************************************************************************************************
Public strCurrentAndArchivedM
FRM_Logger_ReportStepEvent "Start Test Case : NICE-2306","TC02 - NICE-2435 - Verify DDM Field Rule Condition Execution for Current Role option", Null

BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."


DDM_VerifyMilestoneAndCreateFieldRule("NICE-2435")


BIZ_DDM_AddScenarioToRule("NICE-2435_1")

DDM_ActivateAllFieldScenarios "NICE-2435"

'======Check the loan save checkbox=======
'BIZ_Nav_HierarchyTree "Dynamic Data Management", "Data Population Timing"
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Global DDM Settings"
BIZ_DDM_DeselectAllDPTCheckboxes

BIZ_Settings_ClickClose()

'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"


'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2435")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2435")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

'==========Verify the rule has not been applied=====
FRM_Logger_ReportInfoEvent "Verify rule not enforced","Since scenario does not match Current Role option", Null
DDM_VerifyRuleActive "NICE-2435","Not Applied","4001"

BIZ_Nav_Loan_LogTab_SelectWorksheet "Qualification"	

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")		
'==============Assign Loan officer====================
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
'==============Assign Loan processor====================
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
	
BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Verify rule not enforced","Since Finished checkbox is not checked on Qualification tab", Null
DDM_VerifyRuleActive "NICE-2435","Not Applied","4001"
BIZ_Nav_Loan_LogTab_SelectWorksheet "Qualification"	

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

DDM_VerifyRuleActive "NICE-2435","","4001"

strLoanNumber=BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit False



BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"
'Deactivate scenario 1 since it is in the top in the order
'scenario 2 would be enforced if scenario 2 is deactivated since it is second in the order
BIZ_DDM_DeActivateSpecificFieldScenario "NICE-2435"
BIZ_Settings_ClickClose()

BIZ_Loan_OpenByLoanNumber(strLoanNumber)
'==========Checking for processing================
BIZ_Nav_Loan_LogTab_SelectWorksheet "Processing"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
	
BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Verify rule not enforced","Since scenario does not match Current Role option", Null
DDM_VerifyRuleActive "NICE-2435_1","Not Applied","4001"


BIZ_Nav_Loan_LogTab_SelectWorksheet "Processing"	
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

DDM_VerifyRuleActive "NICE-2435_1","","4001"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

'====Activate scenario 1 again========
BIZ_DDM_ActivateSpecificFieldScenario "NICE-2435"
'====Edit scenario 1========
BIZ_DDM_EditScenario "NICE-2435_2"
'====Edit scenario 2========
BIZ_DDM_EditScenario "NICE-2435_3"

BIZ_Settings_ClickClose()

BIZ_Login_UserLogout
BIZ_Login_UserLogin "admin_core2p"



'=======Create a new blank loan==========
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline"


'=======Set borrower information==========
BIZ_BorrowerSummaryOrigination_SetHeadInfo("NICE-2435")
BIZ_BorrowerSummaryOrigination_SetBorrower("NICE-2435")

'======Save the loan=========
BIZ_Loan_Save()

'======Get Loan Number=======
strLoanNumber = BIZ_Loan_GetLoanNumber()

'==========Verify the rule has been applied=====

DDM_VerifyRuleActive "NICE-2435","Not Applied","4001"

BIZ_Nav_Loan_LogTab_SelectWorksheet "Qualification"	

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
		
'==============Assign Loan officer====================
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
	
BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"

DDM_VerifyRuleActive "NICE-2435","Not Applied","4001"
BIZ_Nav_Loan_LogTab_SelectWorksheet "Qualification"	

'===================Finish the milestone=================
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished"), "ON"

BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"

DDM_VerifyRuleActive "NICE-2435","Not Applied","4001"
'==========Checking for processing================
BIZ_Nav_Loan_LogTab_SelectWorksheet "Processing"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog").SwfObject("swfname:=gvUsers"),0,TRUE,FALSE,FALSE,"Double"
	
BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"

DDM_VerifyRuleActive "NICE-2435_1","Not Applied","4001"


BIZ_Nav_Loan_LogTab_SelectWorksheet "Processing"	

'===================Finish the milestone=================
GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfCheckbox("swfname:=checkBoxFinished"), "ON"

BIZ_Loan_Save()

BIZ_Forms_Open "Borrower Summary - Origination"

DDM_VerifyRuleActive "NICE-2435_1","Not Applied","4001"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Dynamic Data Management", "Field Rules"

DDM_DeactivateAllFieldScenarios "NICE-2435"

BIZ_Login_UserLogout
	
