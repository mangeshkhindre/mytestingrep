

strRowID = "E2E_KBYO2_NBO"
FRM_Logger_ReportStepEvent "Start Piggyback test case","KBYO2 Borrower Vesting NBO for Piggyback loans",Null

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

'===== Enter data in Borrower Summary Origination =======
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetCoBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID

'========== Enter data in file Contacts ==========
BIZ_FileContacts_NonBorrowerOwner strRowID

'========== Go to Piggyback Loans ==========
BIZ_Tools_Open "Piggyback Loans"

GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=newlinkbutton")
GUI_Dialog_Encompass_YesX g_LongWaitSmall,""
'GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=makecurrentbutton")
'GUI_Dialog_Encompass_OKX g_LongWaitSmall,""
'GUI_Dialog_Encompass_OKX g_LongWaitSmall,""
wait 5
If GUI_Object_IsEnabled(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=makecurrentbutton")) Then
	GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=makecurrentbutton")
    GUI_Dialog_Encompass_OK ""
    GUI_Dialog_Encompass_OK ""
End If

'============ Go to File Contacts ===========
BIZ_Tools_Open "File Contacts"

Set objMainView = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewContacts")
boolCheck = GUI_List_ClickRow (objMainView,Null,"Category/Role","Non-Borrowing Owner",True,False,False,"Single")
If boolCheck Then
	FRM_Logger_ReportPassEvent "Validate NBO","NBO is showing correctly for linked loan",Null
Else 
	FRM_Logger_ReportFailEvent "Validate NBO","NBO is not showing correctly for linked loan",Null
End If

BIZ_Loan_Exit False
