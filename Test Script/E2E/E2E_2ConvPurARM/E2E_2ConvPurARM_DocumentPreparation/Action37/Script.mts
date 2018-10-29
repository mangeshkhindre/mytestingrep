'@**************************************************************************************************
 '@ TestStory:  PTAC-871- E2E_2CONVPURARM
 '@ TestCase: PTAC-1008 - Doc Preparation 6- Complete REGZ-CD
 '@ Test Automation JIRA Task: PTAC-1021 E2E_2CONVPURARM_DocumentPreparation
 '@ TestData: 
 	'1 Forms_REGZ_CD, SelectPlanCode, E2E_CONVPURARM
 	'2 Forms_RegZ_CD, SetLoanInformation, E2E_CONVPURARM
	'3 Forms_RegZ_CD, OrderDocs, E2E_CONVPURARM	
	'4 Forms_RegZ_CD, RegZ_CD, E2E_CONVPURARM
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
	   'Click 'Audit' button.
	'06 In the select report type window Select 'review' radio button option and click 'ok'.
	'07 Click "Order docs' in the closing docs audit window.
	'08 Select all documents from list and click send button.
	'09 Enter from and to email id's. To: integrationtitle@gmail.com and then click send button.
	'10 Click 'log' tab and click on 'doc preparation' milestone.
	'11 Under documents check the check boxes for all documents.
	'12 Under task check the check box for ECS doc prep expected.
	'13 Click on 'magnifying lens' next to closer and select 'closer user'.
	'14 Check the check box for user ID 'closer' and click 'ok'.Check the check box for finished.
'@ ExpectedResult:
    '1 Should populate lender information from 1003 form.
	'2 Select Plan code window will open.
	'3 Plan code conflict window will open.
	'4 A pop up window with the following message will pop up :"Are you sure you want to overwrite loan data with plan code settings?". 
	'5 All fields should be updated.
	'6 Select report type window will open.
	'7 Closing docs Audit window will open.(There should not be any red flags in the audit window under data audit results. If there are red flags under compliance review results that is fine.)
	'8 Select docs pop up should open.
	'9 A pop up window should open.
	'10 Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history.
	'11 Doc preparation worksheet will open.
	'12 It should be checked.
	'13 Select loan closer window will open.
	'14 Window pop up should close.Should be finished.
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1008","Test Case Name: Doc Preparation 6- Complete REGZ-CD", Null

Dim objData
BIZ_Forms_ClosingDisclosurePage5_ClickCopyFrom1003Page "E2E_CONVPURARM"

BIZ_Forms_Open "RegZ - CD"
BIZ_REGZ_CD_SelectPlanCode "E2E_CONVPURARM"

GUI_Dialog_Encompass_YesX 30, ""

BIZ_RegZ_CD_SetLoanInformation "E2E_CONVPURARM"
BIZ_RegZ_CD_SetData "E2E_CONVPURARM"

SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox49_Ctrl").Set "On"
BIZ_RegZ_CD_AuditOrderDocs "E2E_CONVPURARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_DocPreparing")

BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_CONVPURARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
