FRM_Logger_ReportStepEvent "Create a new Non Rescendable Loan for Single Borrower Pair", "Started Creating a New Non Rescendable Loans", Null

'====== Navigate to pipeline and create a new loan ======  
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'===== Append template to new loan ========   
BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_SingleBorr"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_DisclosureTracking"

'========== Go to Closing Disclosure Page 1 ==============
BIZ_Forms_Open "Closing Disclosure Page 1"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetDisclosureInformation "E2E_DisclosureTracking"
BIZ_RegZ_LE_SetLateChargeInformation "E2E_DisclosureTracking"

BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set900Section "E2E_DisclosureTracking"

'================Non Rescindable Setting==========
FRM_Logger_ReportStepEvent "Make Non-Rescindable Loan", "Making Non-Rescindable Loan", Null
BIZ_Forms_Open "Construction Management"
FRM_Logger_ReportInfoEvent "Secured by Curent Dwelling - CONST.X2 should be Checked ", "Secured by Curent Dwelling - CONST.X2 is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox14_Ctrl","index:=0"), "TRUE"

FRM_Logger_ReportInfoEvent "Non-Rescindable Transaction should be Checked ", "Non-Rescindable Transaction is Checked", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox15_Ctrl","index:=0"), "TRUE"

GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox58"), "12"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=TextBox15"), "01/10/2018"
'============ Save loan ============
BIZ_Loan_Save()
BIZ_Loan_SaveLoanNumber()
