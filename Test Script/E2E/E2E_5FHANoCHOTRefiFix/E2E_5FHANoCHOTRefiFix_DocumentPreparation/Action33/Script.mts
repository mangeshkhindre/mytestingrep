'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANOCHOTREFIFIX
'@ TestCase : PTAC-2031 FHANOCHOTREFIFIX Doc Preparation 1- Clear Alerts
'@ Test Automation JIRA Task: PTAC-2705 E2E_5FHANOCHOTREFIFIX_DocumentPreparation
'@ TestData: 
   '1 Loans, Milestone, E2E_FHANOCHOTREFIFIX_DocPreparing
   '2 Loans, LoanTemplate, E2E_Closer
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login as  closer.Click on 'Accept file' button.Close the pop up window
   '2 (To clear the 'alert ability to repay')Go to forms and click ATR, QM management
   '3 Click ATR, QM eligibility tab.For qualified mortgage loan type click on lock select 'General QM' from the drop down
   '4 Under ATR, QM exemption eligibility 
	    'select checkbox - Transaction is exempt from Reg-Z ability to repay requirements based on.
		'select check box - creditor type and then from dropdown select 'Non- profit organization'
   '5 Under Alerts click on ' Lock confirmed by Integration secondary'.Click on 'Clear Alerts' button.Click on 'ok'
'@ ExpectedResult: 
   '1 Should be able to login. Milestone alert cleared message popup should open.Pop up should close
   '2 ATR, QM management page should open
   '3 Should be able to select 'General QM'
   '4 Alert should be cleared
   '5 Lock confirmed by Integration secondary page will open.All lock alerts have been cleared pop up will open.Pop up should close
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2031","FHANOCHOTREFIFIX Doc Preparation 1- Clear Alerts", Null

Dim objData
'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_jwcloser" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS8Complete_FHANOCHOTREFIFIX","Doc Preparation"

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_DocPreparing")

BIZ_ATRQMManagement_SetATRQMEligibility "E2E_FHANOCHOTREFIFIX"

'=== Verify if Ability to repay alert is cleared ====
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Ability-to-Repay Exemption Reason Not Determined"

Set objData = Nothing
