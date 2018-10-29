'@**************************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-662 File started 8-Clear alert of Lock Confirmation
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
    '1 Global_Data, Login, E2E_markuslo
	'2 Loans, LoanTemplate, E2E_LoanOfficer
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Now login to encompass as loan officer  
	'2 click on pipeline and search your loan 
	'3 Select your loan and click on it 
	'4 Under alerts and messages tab 
	   'Click on "lock confirmed by integration secondary" alert and 
    '5 click ""clear alert"" button 
'@ ExpectedResult: 
	'1 Should be able to login as loan officer 
	'2 Loan should be seen
	'3 Loan should open 
	'4 Under alerts 2 alerts should be seen 
	'5 All lock alerts have been cleared message will pop up 	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-662","File started 8-Clear alert of Lock Confirmation", Null

Dim strLoanNumber, objAlertForm,boolAlertFound, objData

' Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_markuslo"

' Gets the Loan Number
strLoanNumber = BIZ_Loan_GetLoanNumber()

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OK("")

BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
GUI_Dialog_Encompass_YesX 60, ""

Set objAlertForm = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
boolAlertFound   = GUI_List_ClickRowbySubString(objAlertForm, Null, 0, "Lock confirmed by", False, False, False, "Double")

If (boolAlertFound = True) Then 
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=clearAlertBtn")
	If (GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass")) = True) Then 
		FRM_Logger_ReportPassEvent "Clear Alerts", "All lock alerts have been cleared message will pop up.", Null
		GUI_Dialog_Encompass_OK("")
	End If
Else 
	FRM_Logger_ReportPassEvent "Clear Alerts", "Lock confirmed alert is not displayed",Null
End If

Set objData      = Nothing
Set objAlertForm = Nothing