'@**************************************************************************************************
 '@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
 '@ TestCase : PTAC-2371 Doc Preparation 6 - Complete REGZ-CD
 '@ Test Automation JIRA Task: PTAC-2930 E2E_9VANoCORefiARM_DocumentPreparation
 '@ TestData: 
 	'1 Forms_REGZ_CD, SelectPlanCode, E2E_VANoCORefiARM
 	'2 Forms_RegZ_CD, SetLoanInformation, E2E_VANoCORefiARM
	'3 Forms_RegZ_CD, OrderDocs, E2E_VANoCORefiARM
    '4 Forms_RegZ_CD, RegZ_CD and E2E_VANoCORefiARM
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '01 In CD page -5 Under contact information for Lender click on 'Copy from 1003' button. Under forms tab click on REGZ-CD and click on Plan code.
    '02 Select Citibank N.A from the list and click select button.
    '03 Click 'import plan data' button on 'plan code conflict pop up' window. 
    '04 Click 'Yes' button.
    '05 Fill following date fields: (All should be same as closing date)
        'Document date:
        'Closing date: 
        'Doc.signing date:   
        'Disbursement date: next day after closing date. 
	'06 Click 'Audit' button.
	'07 In the select report type window Select 'review' radio button option and click 'ok'.
	'08 Click "Order docs' in the closing docs audit window.
	'09 Select all documents from list and click send button.
	    'Enter from and to email id's.To: integrationtitle@gmail.com and then click send button.
	'10 Click 'log' tab and click on 'doc preparation' milestone.
	    'Under documents check the check boxes for all documents.
	    'Under task check the check box for ECS doc prep expected.
'@ ExpectedResult:
    '01 Should populate lender information from 1003 form.
        'Select Plan code window will open.
	'02 Loan Data should be updated.
	'03 All fields should be updated.
	'04 Select report type window will open.
	    'Closing docs Audit window will open.(There should not be any red flags in the audit window under data audit results. If there are red flags under compliance review results that is fine.)
	'05 Select docs pop up should open.
	'06 A pop up window should open.
	'07 Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history.
	'08 Doc preparation worksheet will open.
	'09 It should be checked.
	'10 Select loan closer window will open.
	'11 Window pop up should close.
	'12 Should be finished.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-2371","Test Case Name - Doc Preparation 6 - Complete REGZ-CD", Null

Dim objData
BIZ_Forms_Open "RegZ - CD"
BIZ_REGZ_CD_SelectPlanCode "E2E_VANoCORefiARM"

GUI_Dialog_Encompass_YesX 30, ""

BIZ_RegZ_CD_SetLoanInformation "E2E_VANoCORefiARM"
BIZ_RegZ_CD_SetData "E2E_VANoCORefiARM"
BIZ_RegZ_CD_AuditOrderDocs "E2E_VANoCORefiARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_DocPreparing")
BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_VANoCORefiARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
