'@**************************************************************************************************
'@ TestStory: PTAC-1553 Business Rules
'@ TestCase: 
    '1 PTAC-1436  Treat seller-paid broker compensation as Third-Party
    '2 PTAC-1435  Treat seller-paid broker compensation as Borrower
    '3 PTAC-1434  Do not enforce compliance or display a warning
    '4 PTAC-1433  Display warning when all compensation fields are not compliant Set fields OFF
    '5 PTAC-1431  Display warning when all compensation fields are not compliant Set fields ON & 3rd Party Paid By
    '6 PTAC-1430  Display warning when all compensation fields are not compliant Set fields ON & Borrower Paid By
    '7 PTAC-1428  Enforce compliance to the LO Compensation paid-by rule Set fields ON & 3rd Party
    '8 PTAC-1429  Enforce compliance to the LO Compensation paid-by rule Set fields OFF
'@ Test Automation JIRA Task: PTAC-2667  BusinessRules_LOCompensationRule_LOCompensationRuleControl
'@ TestData: 
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensation_3rdParty
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensation_Borrower
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensation
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompensationDisplayWarning
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompDisplayWarn_FieldOn3rdParty
	'BusinessRule_LOCompensation, LOCompensationData and BR_LoCompDisplayWarn_FieldOn3rdBorrower
	'Forms_2015Itemization, Set800Section and  BR_LoCompensationPaidTo
	'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidBy
	'Forms_2015Itemization, Set800Section and BR_LoCompensation_Seller
	'Forms_2015Itemization, Set800Section and BR_LoCompensationPaidTo_DontEnforce
	'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn
	'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn_3rdParty1
	'Forms_2015Itemization, Set800Section and BR_LoCompPaidByFieldOn_3rdParty2
'@ Pre-conditions:
'@ Description: Create Edit and Delete task
'@ TestSteps:		
'@ ExpectedResult:	
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case:PTAC-2667", "BusinessRules_LOCompensationRule_LOCompensationRuleControl", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "BR_ExportAndImportRules_Admin"

'====== Create Loan Folder ======
BIZ_Settings_CreateNewLoanFolder "Automation"

Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If

BIZ_Nav_Settings_Close

'======  PTAC-1436  Treat seller-paid broker compensation as Third-Party ======
RunAction "BusinessRules_LOCompensationRule_AsThirdParty", oneIteration

'======  PTAC-1435  Treat seller-paid broker compensation as Borrower ======
RunAction "BusinessRules_LOCompensationRule_AsBorrower", oneIteration

'======  PTAC-1434  Do not enforce compliance or display a warning ======
RunAction "BusinessRules_LOCompensationRule_DoNotEnforceCompliance", oneIteration

'======  PTAC-1433  Display warning when all compensation fields are not compliant Set fields OFF ======
RunAction "BusinessRules_LOCompensationRule_DisplayWarningSetupOFF", oneIteration

'======  PTAC-1431  Display warning when all compensation fields are not compliant Set fields ON & 3rd Party Paid By ======
RunAction "BusinessRules_LOCompensationRule_DisplayWarningSetupON3rdParty", oneIteration

'======  PTAC-1430  Display warning when all compensation fields are not compliant Set fields ON & Borrower Paid By ======
RunAction "BusinessRules_LOCompensationRule_DisplayWarningSetupONByBorrower", oneIteration

'======  PTAC-1428  Enforce compliance to the LO Compensation paid-by rule Set fields ON & 3rd Party ======
RunAction "BussinessRules_LOCompensation_PaidByRuleSetupONBy3rdParty", oneIteration

'======  PTAC-1429  Enforce compliance to the LO Compensation paid-by rule Set fields OFF ======
RunAction "BusinessRules_LOCompensationRule_PaidByRuleSetupOFF", oneIteration

'======  PTAC-13664 Verify the 'LO Compensation rule' ======
RunAction "BusinessRules_VerifyLOCompensationRule", oneIteration

'====== Navigate to Business Rules->LO Compensation Rule ======
BIZ_Nav_HierarchyTree "Business Rules", "LO Compensation Rule"
	
'====== Sets the value in LO Compensation Rule ======
BR_LOCompensationRule "BR_LoCompensation"
GUI_Window_Close (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer"))

'====== Logout From Encompass ======
 BIZ_Login_UserLogout()

 FRM_RT_TearDownTest(Null) 

