'@**************************************************************************************************
 '@ TestStory: PTAC-2010 E2E_6FHAPURARM
 '@ TestCase : PTAC-2119 Doc Preparation 6 - Complete REGZ-CD
 '@ Test Automation JIRA Task: PTAC-2126 E2E_6FHAPURARM_DocumentPrepartion
 '@ TestData: 
 	'1 Forms_REGZ_CD, SelectPlanCode, E2E_FHAPURARM
 	'2 Forms_RegZ_CD, SetLoanInformation, E2E_FHAPURARM
	'3 Forms_RegZ_CD, OrderDocs, E2E_FHAPURARM	
	'4 Forms_RegZ_CD, RegZ_CD, E2E_FHAPURARM
    '5 Forms_FHAManagement, BasicInfo, E2E_FHA_BasicFHAInfo
 '@ Pre-conditions: 
 '@ Description: 
 '@ TestSteps:
    '1 In CD page -5 Under contact information for Lender click on 'Copy from 1003' button. Under forms tab click on REGZ-CD and click on Plan code.
    '2 Select Citibank N.A from the list and click select button.
    '3 Click 'import plan data' button on 'plan code conflict pop up' window. 
    '4 Click 'Yes' button.
    '5 Fill following date fields: (All should be same as closing date)
	   'Document date:
	   'Closing date: 
	   'Doc.signing date:   
	   'Disbursement date: next day after closing date. 
	'6 Click 'Audit' button.
	   'In the select report type window Select 'review' radio button option and click 'ok'.
	'7 Click "Order docs' in the closing docs audit window.
	'8 Select all documents from list and click send button.
	'9 Enter from and to email id's.
	   'To: integrationtitle@gmail.com
	   'and then click send button.
	'10 Click 'log' tab and click on 'doc preparation' milestone. 
	'11 Under documents check the check boxes for all documents. Under task check the check box for ECS doc prep expected.
	'12 Click on 'magnifying lens' next to closer and select 'closer user'.
	'13 Check the check box for user ID 'closer' and click 'ok'.
	'14 Check the check box for finished
'@ ExpectedResult:
    '1 Should populate lender information from 1003 form.
	   'Select Plan code window will open.
	'2 Plan code conflict window will open.
	'3 A pop up window with the following message will pop up :"Are you sure you want to overwrite loan data with plan code settings?". 
	'4 All fields should be updated.
	'5 Select report type window will open.
	'6 Closing docs Audit window will open.(There should not be any red flags in the audit window under data audit results. If there are red flags under compliance review results that is fine.)
	'7 Select docs pop up should open.
	'8 A pop up window should open.
	'9 Closing docs ordered will be added to disclosure tracking tool and can be seen under disclosure history.
	'10 Doc preparation worksheet will open.
	'11 It should be checked.
	'12 Select loan closer window will open.
	'13 Window pop up should close.
	'14 Should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2119","Doc Preparation 6 - Complete REGZ-CD", Null

BIZ_Forms_Open "RegZ - CD"
Wait g_ShortWaitMedium

BIZ_REGZ_CD_SelectPlanCode "E2E_FHAPURARM"

GUI_Dialog_Encompass_YesX 30, ""

BIZ_Forms_Open "FHA Management"
Wait g_ShortWaitMedium
	
Dim objMIPPMIGuaranteeFeeCalPage,objFHAManagementPage,objData
    
Set objMIPPMIGuaranteeFeeCalPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog")
Set objData 					 = FRM_DS_GetTestData("Forms_FHAManagement", "BasicInfo", "E2E_FHA_BasicFHAInfo")
Set objFHAManagementPage 		 = SwfWindow("swfname:=MainForm").Page("index:=0")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "FHACase")) Then
   GUI_WebEdit_Set objFHAManagementPage.WebEdit("html id:=TextBox11"),FRM_DS_GetValue(objData, "FHACase") 
End If

BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetLoanInformation "E2E_FHAPURARM"
BIZ_RegZ_CD_SetData "E2E_FHAPURARM"
BIZ_RegZ_CD_AuditOrderDocs "E2E_FHAPURARM"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_DocPreparing")

BIZ_Loan_FinishMilestone_AssignUser "Doc Preparation",FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Doc Preparation") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS9Complete_FHAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 					 = Nothing
Set objMIPPMIGuaranteeFeeCalPage = Nothing
Set objFHAManagementPage 		 = Nothing
