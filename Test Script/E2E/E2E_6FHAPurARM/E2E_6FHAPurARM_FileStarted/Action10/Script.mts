'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-1870 File started 8-Clear alert
'@ Test Automation JIRA Task: PTAC-2011 E2E_6FHAPURARM_Filestarted
'@ TestData:
   'Global_Data,Login,E2E_carollo
   '"Loans, LoanTemplate, E2E_LoanOfficer"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Now login to encompass as loan officer  
	'2 click on pipeline and search your loan 
	'3 Select your loan and click on it 
	'4 Under alerts and messages tab Click on "lock confirmed by integration secondary" alert  
	'5 click "clear alert" button 	
'@ ExpectedResult: 
	'1 Should be able to login as loan officer 
	'2 Loan should be seen
	'3 Loan should open 
	'4 Under alerts 2 alerts should be seen 
	'5 All lock alerts have been cleared message will pop up 	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case - PTAC-1870","File started 8- clear alert", Null
Dim strLoanNumber, objAlertForm, objData, boolAlertFound

' Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_carollo"

' Gets the Loan Number
strLoanNumber = BIZ_Loan_GetLoanNumber()

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OK("")

BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
GUI_Dialog_Encompass_Yes("")

Set objAlertForm = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
boolAlertFound = GUI_List_ClickRowbySubString(objAlertForm, Null, 0, "Lock confirmed by", False, False, False, "Double")
If boolAlertFound Then 
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=clearAlertBtn")
	
	If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass"), 60) Then 
	   FRM_Logger_ReportPassEvent "Clear Alerts", "All lock alerts have been cleared message will pop up.", Null
	   GUI_Dialog_Encompass_OK("")
	Else
	   FRM_Logger_ReportFailEvent "Clear Alerts", "All lock alerts have not been cleared", Null
	End If
Else 
	FRM_Logger_ReportFailEvent "Clear Alerts", "Lock confirmed alert is not displayed",Null
End If

'====== Verify if Filestarted Milestone is completed ======
If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("FileStarted")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS1Complete_FHAPURARM"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objAlertForm = Nothing
Set objData		 = NOthing