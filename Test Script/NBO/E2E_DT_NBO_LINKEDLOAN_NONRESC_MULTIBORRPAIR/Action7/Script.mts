FRM_Logger_ReportStepEvent "Create a New Non Rescendable Linked Loan for Multiple Borrower Pairs", "Started Creating a New Non Rescendable Linked Loan for Multiple Borrower Pairs", Null
'====== Navigate to pipeline and create a new loan ======  
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'===== Append template to new loan ========   
BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_MultiBorrPair"
BIZ_Forms_Open "Borrower Summary - Origination"	
BIZ_BorrowerSummaryOrigination_SetBorrowerIncome "E2E_DT_NONRESC_PAIR1"
BIZ_RegZ_LE_SetDisclosureInformation "E2E_DT_NONRESC_PAIR1"

'========== Go to Closing Disclosure Page 1 ==============
BIZ_Forms_Open "Closing Disclosure Page 1"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

'================Non Rescindable Link Loan Setting==========
FRM_Logger_ReportStepEvent "Make Non-Rescindable Loan", "Making Non-Rescindable Loan", Null
BIZ_Forms_Open "Construction Management"

FRM_Logger_ReportInfoEvent "Purpose of Loan - Construction (OR) Construction Perm", "Select Purpose of Loan as Construction Perm", Null
GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox21_Ctrl","index:=0"), "TRUE"

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

'========== add NBOs to borrower pair=====
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")
BIZ_AddNBO_BorrowerPair "E2E_DT_NBO1",strBorrPair3
BIZ_AddNBO_BorrowerPair "E2E_DT_NBO2",strBorrPair3

'================Create a  New Perm Linked Loan ======
FRM_Logger_ReportStepEvent "Create Link Loan", "Started Creating Link Loan", Null
BIZ_Forms_Open "Construction Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "Linked Loans"
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*").WebButton("name:=New Perm","html id:=newlinkbutton","index:=0")
GUI_Dialog_Encompass_YesX 5,"Do you want to synchronize data between two loans?" 

If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) Then
   GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=cancelBtn")	
End If

'============ Save loan ============  
BIZ_Loan_Save()

'======Click on Sync Data in Toolbar======
If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),7) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
   	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data" 
End If

'======Select template and Sync Data between two loans======
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) = True Then
    Set objSyncTemp=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
	GUI_List_ClickRow objSyncTemp,Null,"Name","Const-to-Perm Sync",True,False,False,"Single" 'template name Const-to-Perm Sync
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
	GUI_Dialog_Encompass_YesX 5,"Are you sure you want to synchronize data between two loans?" 
	GUI_Dialog_Encompass_OKX 10,"Both loans have been synchronized."
End If
