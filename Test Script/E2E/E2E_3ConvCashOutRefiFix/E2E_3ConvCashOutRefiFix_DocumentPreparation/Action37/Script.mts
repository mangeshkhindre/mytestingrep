'@**************************************************************************************************
 '@ TestStory: PTAC-3770 E2E_3CONVCASHOUTREFFIX
 '@ TestCase:  PTAC-3482 CONVCASHOUTREFFIX Doc Preparation 6 - Complete REGZ-CD 
 '@ Test Automation JIRA Task: PTAC-3379 E2E_3CONVCASHOUTREFFIX_DocumentPreparation
 '@ TestData: 
 	'Forms_RegZ_CD, SetLoanInformation, E2E_CONVCASHOUTREFFIX
 	'Forms_REGZ_CD, SelectPlanCode, E2E_CONVCASHOUTREFFIX
 	'Forms_RegZ_CD, RegZ_CD, E2E_CONVCASHOUTREFFIX
 	'Forms_RegZ_CD, OrderDocs, E2E_CONVCASHOUTREFFIX
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '1 Under forms, click on CD page -5 Under contact information click on Copy from 1003 button. 
    '2 Under forms go to REGZ-CD and under adjustable rate mortgage remove the field value 0.00% from 'life cap' field.
    '3 Click on Plan code.
    '4 Select 'All fixed rate 1st lien loans'from the list and click select button.
    '5 Fill following date fields: (All should be same as closing date)
		'Document date:
		'Closing date: 
		'Doc.signing date: 
        'Disbursement date: First day of next month after closing month.         
	'6 Click Audit button.
        'Click 'close' in the compliance alert window.
        'In the select report type window Select 'review' radio button option and click 'ok'.
	'7 Click Order docs in the closing docs audit window
	'8 Select all documents from list and click send button
	'9 Enter from and to email id's
		'To: integrationtitle@gmail.com
		'and then click send button.Select category Title insurance and click Update
	'10 Click on log and on 'Doc preparation milestone'.Click magnifying lens and Select ' Closer user'.
        'In the select loan closer window check the check box for closer user and click 'ok'.
        'Check the checkboxes for all documents under documents section and one task under the task section.
        'check the finished checkbox.
 '@ ExpectedResult:
    '01 Name ,address and other values should be populated.
    '02 It should be removed.
    '03 select Plan code window will open
    '04 Under description 'All fixed rate conventional 1st lien loans' should be filled.
    '05 All fields should be updated
    '06 Compliance alerts window should open.Compliance alert window should close.Select report type window will open.
        'Closing docs Audit window will open.(There should not be any red flags in the audit window under data audit results. 
        'If there are red flags under compliance review results that is fine.) 
    '07 Select docs pop up should open
    '08 A pop up window should open
    '09 Update contact info window will open.Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history
    '10 Doc preparation worksheet will open.Select loan closer window will open.
        'window pop up will close All documents and tasks should be checked.Finished should be checked.
 '**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3482","CONVCASHOUTREFFIX Doc Preparation 6 - Complete REGZ-CD ", Null

Dim objData

BIZ_Forms_ClosingDisclosurePage5_ClickCopyFrom1003Page "E2E_CONVCASHOUTREFIFIX"

BIZ_Forms_Open "RegZ - CD"
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_247").Set ""
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_697").Set ""
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_696").Set ""
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_695").Set ""
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_694").Set ""

BIZ_REGZ_CD_SelectPlanCode "E2E_CONVCASHOUTREFIFIX"


GUI_Dialog_Encompass_YesX 30, ""
BIZ_RegZ_CD_SetLoanInformation "E2E_CONVCASHOUTREFIFIX"
BIZ_RegZ_CD_SetData "E2E_CONVCASHOUTREFIFIX"
BIZ_RegZ_CD_AuditOrderDocs "E2E_CONVCASHOUTREFIFIX"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_DocPreparing")
BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_CONVCASHOUTREFIFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True
'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
