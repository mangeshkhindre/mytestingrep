'@**************************************************************************************************
'@ TestStory: PTAC-3770 E2E_3CONVCASHOUTREFFIX
'@ TestCase : PTAC-3326 CONVCASHOUTREFFIX Doc Preparation 1 - Clear Alerts 
'@ Test Automation JIRA Task: PTAC-3379 E2E_3CONVCASHOUTREFFIX_DocumentPreparation
'@ TestData: 
    '1 Loans, LoanTemplate, E2E_Closer
    '2 Loans ,Milestone, E2E_CONVCASHOUTREFFIX_Funding
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login as closer.Click on 'Accept file' button.Close the pop up window.
    '2 Go to forms and click ATR/QM management
    '3 Click ATR/QM eligibility tab.For qualified mortgage loan type (CLICK ON LOCK) and then select 'General QM' from the drop down.
    '4 Under ATR/QM exemption eligibility 
       'select checkbox - Transaction is exempt from Reg-Z ability to repay requirements based on.
       'select check box- creditor type and then from dropdown select 'Non- profit organization'.
    '5 Under Alerts click on ' Lock confirmed by Carol'.Click on 'Clear Alerts' button.Click on 'ok'.
'@ ExpectedResult: 
    '1 Should be able to login. Milestone alert cleared message popup should open
    '2 ATR/QM management page should open
    '3 Should be able to select 'General QM'
    '4 Alert should be cleared
    '5 Lock confirmed by Carol page will open.All lock alerts have been cleared pop up will open.Pop up should close
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3326","CONVCASHOUTREFFIX Doc Preparation 1 - Clear Alerts ", Null

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_jwcloser" 

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Closer")

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS8Complete_CONVCASHOUTREFIFIX","Doc Preparation"

BIZ_ATRQMManagement_SetATRQMEligibility "E2E_CONVCASHOUTREFIFIX"

'=== Verify if Ability to repay alert is cleared ====
BIZ_AlertsAndLog_VerifyItemNotExist "Alerts & Messages", "Ability-to-Repay Exemption Reason Not Determined"

Set objData     = Nothing

GUI_Dialog_Encompass_Click 2, "This package includes one or more.*", "OK"

GUI_Dialog_Encompass_Click 60,"This package includes one or more.*", "OK"

GUI_Dialog_Encompass_Click 60, "", "OK"
