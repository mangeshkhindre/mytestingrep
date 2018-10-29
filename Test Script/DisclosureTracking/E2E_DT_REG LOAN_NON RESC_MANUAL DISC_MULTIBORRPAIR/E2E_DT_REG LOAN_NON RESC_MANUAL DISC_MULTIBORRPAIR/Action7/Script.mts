
FRM_Logger_ReportStepEvent "Create a New Non Rescendable Loan for Multiple Borrower Pairs", "Started Creating a New Non Rescendable Loan for Multiple Borrower Pairs", Null

'==== Naviagte to Settings, select "Loan Templates", "Data Templates"  and Create a Data Template "E2E_DT"========  
BIZ_Nav_Settings_Open "Loan Templates"
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"
BIZ_DataTemplates_CreateNew "E2E_DT_NonResc_MultiBorrPair","E2E_DT_NONRESC_PAIR1","E2E_DT_NONRESC_PAIR1"
'===== Close Settings Window ========  
BIZ_Nav_Settings_Close
'=======Create a Automation folder if not present====================
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'====== Navigate to pipeline and create a new loan ====== 

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'===== Append template to new loan ========   
BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_MultiBorrPair"
BIZ_Forms_Open "Borrower Summary - Origination"	
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_DT_NONRESC_PAIR1"
BIZ_RegZ_LE_SetDisclosureInformation "E2E_DT_NONRESC_PAIR1"

'================Non Rescindable Setting==========
FRM_Logger_ReportStepEvent "Make Non-Rescindable Loan", "Making Non-Rescindable Loan", Null
BIZ_Forms_Open "Construction Management"
FRM_Logger_ReportInfoEvent "Secured by Curent Dwelling - CONST.X2 should be Checked ", "Secured by Curent Dwelling - CONST.X2 is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox14_Ctrl","index:=0"), "TRUE"

FRM_Logger_ReportInfoEvent "Non-Rescindable Transaction should be Checked ", "Non-Rescindable Transaction is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox15_Ctrl","index:=0"), "TRUE"

'============ Add Borrower Pair-2 details=============
FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Second Borrower Pair", Null
BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
wait(2)
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR2"
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR2"

'============ Add Borrower Pair-3 details=============
FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Third Borrower Pair", Null
BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
wait(2)
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR3"
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR3"


'============ Save loan ============
BIZ_Loan_Save()
strLoanNo = SwfWindow("swfname:=MainForm").SwfLabel("swfname:=lblLoanNumber").GetROProperty("text")
BIZ_Settings_ChangeFilePermission "Settings_LoanNumber"
FRM_DS_SetCellData "Settings_LoanNumber", "LoanNumber", "TC1_Loannumber", "LoanNumberValue", strLoanNo
