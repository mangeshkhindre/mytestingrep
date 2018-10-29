'@**************************************************************************************************
 '@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
 '@ TestCase : PTAC-1414 CONVNOCASHREFIARM - Doc Preparation 6 - Complete REGZ-CD   
 '@ Test Automation JIRA Task: PTAC-1836 E2E_1ConvNoRefiARM_DocumentPreparation
 '@ TestData: 
 	'1 Forms_RegZ_CD, SetLoanInformation and E2E_ConvNoRefiARM
 	'2 Forms_REGZ_CD, SelectPlanCode and E2E_ConvNoRefiARM
 	'3 Forms_RegZ_CD, RegZ_CD and E2E_ConvNoRefiARM
 	'4 Forms_RegZ_CD, OrderDocs and E2E_ConvNoRefiARM
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '01 In CD page -5 Under contact information for Lender click on Copy from 1003 button. Under forms tab click on REGZ-CD and click on Plan code
    '02 Select '5/1 Libor FNMA ARM(2/2/5) from the list and click select button
    '03 Click import plan data button on plan code conflict pop up window 
    '04 Click Yes button.
    '05 Fill following date fields: (All should be same as closing date)
		'Document date:
		'Closing date: 
		'Doc.signing date:  
	'06 Click Audit button.In the select report type window Select review radio button option and click ok
	'07 Click Order docs in the closing docs audit window
	'08 Select all documents from list and click send button
	'09 Enter from and to email id's
		'To: integrationtitle@gmail.com
		'and then click send button.Select category Title insurance and click Update
	'10 Click log tab and click on 'doc preparation' milestone
		'Under documents check the check boxes for all documents
		'Under task check the check box for ECS doc prep expected
 '@ ExpectedResult:
    '01 Should populate lender information from 1003 form.Select Plan code window will open
    '02 Plan code conflict window will open
    '03 A pop up window with the following message will pop up :Are you sure you want to overwrite loan data with plan code settings
    '04 Pop up will close.
    '05 All fields should be updated
    '06 Select report type window will open.Closing docs Audit window will open
    '07 Select docs pop up should open
    '08 A pop up window should open
    '09 Update contact info window will open.Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history
    '10 Doc preparation worksheet will open.Select loan closer window will open.window pop up will close
 '***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1414","CONVNOCASHREFIARM - Doc Preparation 6 - Complete REGZ-CD", Null

Dim objData
BIZ_Forms_ClosingDisclosurePage5_ClickCopyFrom1003Page "E2E_ConvNoRefiARM"
BIZ_Forms_Open "RegZ - CD"
BIZ_REGZ_CD_SelectPlanCode "E2E_ConvNoRefiARM"

GUI_Dialog_Encompass_YesX 30, ""

BIZ_RegZ_CD_SetLoanInformation "E2E_ConvNoRefiARM"
BIZ_RegZ_CD_SetData "E2E_ConvNoRefiARM"
BIZ_RegZ_CD_AuditOrderDocs "E2E_ConvNoRefiARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_DocPreparing")

BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_ConvNoRefiARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
