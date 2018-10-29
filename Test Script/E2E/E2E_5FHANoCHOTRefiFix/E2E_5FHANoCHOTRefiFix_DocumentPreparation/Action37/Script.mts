'@**************************************************************************************************
 '@ TestStory: PTAC-2445 E2E_5FHANOCHOTREFIFIX
 '@ TestCase : PTAC-2181 FHANOCHOTREFIFIX Doc Preparation 6- Complete REGZ-CD
 '@ Test Automation JIRA Task: PTAC-2705 E2E_5FHANOCHOTREFIFIX_DocumentPreparation
 '@ TestData: 
   '1 Forms_REGZ_CD, SelectPlanCode, E2E_FHANOCHOTREFIFIX
   '2 Forms_RegZ_CD, SetLoanInformation, E2E_FHANOCHOTREFIFIX
   '3 Forms_RegZ_CD, OrderDocs, E2E_FHANOCHOTREFIFIX	
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
   '1 Under forms tab click on REGZ-CD and click on Plan code.
   '2 Select 'FHA Fixed rate open term' from the list and click select button.
   '3 Click 'skip plan data' button on 'plan code conflict pop up' window. 
   '4 Click 'Yes' button.
   '5 Fill following date fields: (All should be same as closing date)
	  'Document date:
	  'Closing date: 
	  'Doc.signing date:  
      'Disbursement date: First day of next month after closing month. 
   '6 Click 'Audit' button.In the select report type window Select 'review' radio button option and click 'ok'.
   '7 Click "Order docs' in the closing docs audit window.
   '9 Select all documents from list and click send button.
		'Enter from and to email id's.
		'To: integrationtitle@gmail.com
		'and then click send button.Select category 'Title insurance' and click 'Update'
   '10 Click on log and on 'Doc preparation milestone'.Click magnifying lens and Select ' Closer user'
   '11 In the select loan closer window check the check box for closer user and click 'ok'
   '12 Check the checkboxes for all documents under documents section and one task under the task section
   '13 check the finished checkbox
'@ ExpectedResult:
    '1 Select Plan code window will open
	'2 Plan code conflict window will open
	'3 A pop up window with the following message will pop up :"Are you sure you want to overwrite loan data with plan code settings?"
	'4 All fields should be updated
	'5 Select report type window will open
	'6 Closing docs Audit window will open.(There should not be any red flags in the audit window under data audit results. If there are red flags under compliance review results that is fine.)
	'7 Select docs pop up should open
	'8 A pop up window should open
	'9 Update contact info window should open.Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history
	'10 Doc preparation worksheet will open
	'11 Select loan closer window will open
	'12 Window pop up should close
	'13 All documents and tasks should be checked.Finished should be checked
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2181","FHANOCHOTREFIFIX Doc Preparation 6- Complete REGZ-CD", Null
BIZ_Forms_ClosingDisclosurePage5_ClickCopyFrom1003Page "E2E_FHANOCHOTREFIFIX"

BIZ_Forms_Open "RegZ - CD"

BIZ_REGZ_CD_SelectPlanCode "E2E_FHANOCHOTREFIFIX"

GUI_Dialog_Encompass_YesX 30, ""

BIZ_RegZ_CD_SetLoanInformation "E2E_FHANOCHOTREFIFIX"

BIZ_RegZ_CD_SetData "E2E_FHANOCHOTREFIFIX"

BIZ_RegZ_CD_AuditOrderDocs "E2E_FHANOCHOTREFIFIX"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_DocPreparing")

BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation") Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_FHANOCHOTREFIFIX"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData = Nothing
