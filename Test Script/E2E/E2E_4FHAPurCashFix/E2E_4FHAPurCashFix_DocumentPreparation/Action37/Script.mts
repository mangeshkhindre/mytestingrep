'@**************************************************************************************************
 '@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
 '@ TestCase : PTAC-3188 FHAPURCHASEFIX- Doc Preparation 6- Complete REGZ-CD 
 '@ Test Automation JIRA Task: PTAC-3284 E2E_4FHAPURCASHFIX_DocumentPreparation
 '@ TestData: 
 	'1 Forms_REGZ_CD, SelectPlanCode, E2E_FHAPURCASHFIX
 	'2 Forms_RegZ_CD, SetLoanInformation, E2E_FHAPURCASHFIX
	'3 Forms_RegZ_CD, OrderDocs, E2E_FHAPURCASHFIX	
	'4 Forms_RegZ_CD, RegZ_CD, E2E_FHAPURCASHFIX
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '01 In CD page -5 Under contact information for Lender click on 'Copy from 1003' button. Under forms tab click on REGZ-CD and click on Plan code.Enter Lender Phone Number
    '02 Select plan code as per test data 
    '03 Closing Conditions forms fill the data
    '04 Go to Regz-CD form
    '05 CD-page1
    '06 go to FHA management fill the data
    '07 Go to Borrower info-vesting form enter data  in Final vesting to Read
    '08 Click 'Audit' button.In the select report type window Select 'review' radio button option and click 'ok'.
    '09 Click "Order docs' in the closing docs audit window.
    '10 Select all documents from list and click send button.
    '11 Enter from and to email id's.
       'To: integrationtitle@gmail.com
       'and then click send button.
    '12 Click 'log' tab and click on 'doc preparation' milestone.
    '13 Under documents check the check boxes for all documents.Under task check the check box for ECS doc prep expected.
    '14 Click on 'magnifying lens' next to closer and select 'closer user'.
    '15 Check the check box for user ID 'closer' and click 'ok'.
    '16 Check the check box for finished.    
'@ ExpectedResult:
    '01 Should populate lender information from 1003 form.Select Plan code window will open.
	'02 plan code description auto populated
	'03 data should be saved.
	'04 Select report type window will open.Closing docs Audit window will open.
        '(There should not be any red flags in the audit window under data audit results. 
        'If there are red flags under compliance review results that is fine.)
	'05 Select docs pop up should open.
	    'A pop up window should open.
	'06 Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history.
	'07 Doc preparation worksheet will open.
	'08 It should be checked.
	'09 Select loan closer window will open.
	'10 Window pop up should close.
	'11 Should be finished.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3188","FHAPURCHASEFIX- Doc Preparation 6- Complete REGZ-CD", Null

Dim objData, strApplicationDate


BIZ_Forms_ClosingDisclosurePage5_ClickCopyFrom1003Page "E2E_FHAPURCASHFIX"

BIZ_ClosingDisclosurePage1_SetClosingInformation "E2E_FHAPURCASHFIX"

BIZ_REGZ_CD_SelectPlanCode "E2E_FHAPURCASHFIX"

strApplicationDate = SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_745").GetROProperty("value")
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_L770").Set DateAdd("d", 1, strApplicationDate)
BIZ_Forms_Open "Closing Conditions"
BIZ_ClosingDisclosurePage3_SetClosingConditons "E2E_FHAPURCASHFIX"

BIZ_FHAManagement_BasicFHAInfonew "E2E_FHAPURCASHFIX"
BIZ_RegZ_CD_SetData "E2E_FHAPURCASHFIX"
BIZ_RegZ_CD_SetLoanInformation "E2E_FHAPURCASHFIX"

'Set Lifecap as blank
SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_247").Set ""

BIZ_RegZ_CD_AuditOrderDocs "E2E_FHAPURCASHFIX"



Wait g_ShortWaitSmall		'wait is used to handle to sync
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_DocPreparing")
BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_FHAPURCASHFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing


