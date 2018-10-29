'@**************************************************************************************************
 '@ TestStory: PTAC-2398 E2E_8VAPURARM
 '@ TestCase : PTAC-2249 Doc Preparation 6 - Complete REGZ-CD
 '@ Test Automation JIRA Task: PTAC-2402 E2E_8VAPURARM_DocumentPreparation
 '@ TestData: 
 	'Forms_REGZ_CD, SelectPlanCode, E2E_VAPURARM
 	'Forms_RegZ_CD, SetLoanInformation, E2E_VAPURARM
	'Forms_RegZ_CD, OrderDocs, E2E_VAPURARM	
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '1 In CD page -5 Under contact information for Lender click on 'Copy from 1003' button. Under forms tab click on REGZ-CD and click on Plan code.
    '2 Select VA 5/1 treasury ARM and then Select Citibank N.A from the 'Apply Investor Info' list and click select button.
    '3 Fill following date fields: (All should be same as closing date)
      'Document date:
      'Closing date: 
      'Doc.signing date:   
      'Disbursement date: next day after closing date. 
	'4 Click 'Audit' button
	'5 In the select report type window Select 'review' radio button option and click 'ok'.
	'6 Click "Order docs' in the closing docs audit window.
	'7 Select all documents from list and click send button.
	'8 Enter from and to email id's To: integrationtitle@gmail.com and then click send button.
	'9 Click 'log' tab and click on 'doc preparation' milestone.
	'10 Under documents check the check boxes for all documents.
	'11 Under task check the check box for ECS doc prep expected.
    '12 Click on 'magnifying lens' next to closer and select 'closer user'.
    '13 Check the check box for user ID 'closer' and click 'ok'.
    '14 Check the check box for finished.
'@ ExpectedResult:
    '1 Should populate lender information from 1003 form.Select Plan code window will open.
	'2 Loan Data should be updated. 
	'3 All fields should be updated.
	'4 Select report type window will open.Closing docs Audit window will open.
       '(There should not be any red flags in the audit window under data audit results. If there are red flags under compliance review results that is fine.)
	'5  Select docs pop up should open.
	'6  A pop up window should open.
	'7  Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history.
	'8  Doc preparation worksheet will open.
	'9  It should be checked.
	'10 Select loan closer window will open.
	'11 Window pop up should close.
	'12 Should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2249","Doc Preparation 6 - Complete REGZ-CD", Null
Dim objData

BIZ_Forms_Open "RegZ - CD"
BIZ_REGZ_CD_SelectPlanCode "E2E_VAPURARM"

GUI_Dialog_Encompass_YesX 30, ""
BIZ_RegZ_CD_SetLoanInformation "E2E_VAPURARM"
BIZ_RegZ_CD_SetData "E2E_VAPURARM"
BIZ_RegZ_CD_AuditOrderDocs "E2E_VAPURARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_DocPreparing")
BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
