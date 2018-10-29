'================ Rescindable Setting==========
If Parameter("strPurposeLoan") = "Primary" Then
	FRM_Logger_ReportStepEvent "Scenario #1: Verify CD Sent,Revised CD Sent, CD Received, Revised CD Received,Earliest Closing Date for Multiple Borrower Pairs; Rescindable Loan; Purpose of Loan: Cash-Out Refi", "Scenario #1: Validate CD Sent,Revised CD Sent, CD Received, Revised CD Received,Earliest Closing Date for Multiple Borrower Pairs; Rescindable Loan; Purpose of Loan: Cash-Out Refi", Null
	FRM_Logger_ReportStepEvent "Start create a New Rescendable Loan for Multiple Borrower Pairs; Purpose of Loan: Cash-Out Refi", "Started Creating a New Rescendable Loan for Multiple Borrower Pairs; Purpose of Loan: Cash-Out Refi", Null	
	'====== Navigate to pipeline and create a new loan ====== 
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
	
	'===== Append template to new loan ========   
	BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_MultiBorrPair"
	BIZ_Forms_Open "Borrower Summary - Origination"	
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_PRIMARY"
	
	'========== Go to Closing Disclosure Page 1 ==============
	BIZ_Forms_Open "Closing Disclosure Page 1"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date
	
	BIZ_Forms_Open "1003 Page 1"
    Set obj1003Page = SwfWindow("swfname:=MainForm").Page("index:=0")
    GUI_WebEdit_Set obj1003Page.WebEdit("html id:=l_16","index:=0"), "4"
	
	'============ Add Borrower Pair-2 details=============
	FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Second Borrower Pair", Null
	BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
	wait(2)
	BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR2"
	BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR2"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_PRIMARY"
	
	'============ Add Borrower Pair-3 details=============
	FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Third Borrower Pair", Null
	BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
	wait(2)
	BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR3"
	BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR3"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_PRIMARY"
Else
	FRM_Logger_ReportStepEvent "Scenario #2: Verify CD Sent,Revised CD Sent, CD Received, Revised CD Received,Earliest Closing Date for Multiple Borrower Pairs; Rescindable Loan; Purpose of Loan: Construction", "Validate CD Sent,Revised CD Sent, CD Received, Revised CD Received,Earliest Closing Date for Multiple Borrower Pairs; Rescindable Loan; Purpose of Loan: Construction", Null    
	FRM_Logger_ReportStepEvent "Start create a New Rescendable Loan for Multiple Borrower Pairs; Purpose of Loan: Construction", "Started Creating a New Rescendable Loan for Multiple Borrower Pairs;Purpose of Loan: Construction", Null	
    '====== Navigate to pipeline and create a new loan ====== 
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 
	
	'===== Append template to new loan ========   
	BIZ_Loan_AppendDataTemplate "E2E_DT_NonResc_MultiBorrPair"
	BIZ_Forms_Open "Borrower Summary - Origination"		
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_CONST"	
	GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox.*_Ctrl", "value:=PrimaryResidence"), "FALSE"
	
	'========== Go to Closing Disclosure Page 1 ==============
	BIZ_Forms_Open "Closing Disclosure Page 1"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

	BIZ_Forms_Open "1003 Page 1"
    Set obj1003Page = SwfWindow("swfname:=MainForm").Page("index:=0")
    GUI_WebEdit_Set obj1003Page.WebEdit("html id:=l_16","index:=0"), ""
	
	BIZ_Forms_Open "Construction Management"
    FRM_Logger_ReportInfoEvent "Secured by Curent Dwelling - CONST.X2 should be Checked ", "Secured by Curent Dwelling - CONST.X2 is Checked", Null
    GUI_WebCheckBox_Set SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=__cid_CheckBox14_Ctrl","index:=0"), "TRUE"
    
	'============ Add Borrower Pair-2 details=============
	FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Second Borrower Pair", Null
	BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
	wait(2)
	BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR2"
	BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR2"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_CONST"
	
	'============ Add Borrower Pair-3 details=============
	FRM_Logger_ReportInfoEvent "Add Borrower Pair ", "Adding Third Borrower Pair", Null
	BIZ_Nav_OpenMenuItem "Loan;Add Borrower Pair"
	wait(2)
	BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DT_NONRESC_PAIR3"
	BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_DT_NONRESC_PAIR3"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DT_RESC_CONST"	     
End If

'============ Save loan ============
BIZ_Loan_Save()
