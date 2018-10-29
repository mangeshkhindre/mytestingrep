'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2268 File started 9- clear alert
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_FileStarted
'@ TestData: Global_Data, Login and E2E_Tracy	
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Now login to encompass as loan officer. Click on pipeline and search your loan
   '2 Select your loan and click on it. Under alerts and messages tab.click on"" lock confirmed by integration secondary"" alert and 5.Click ""clear alert"" button
   '3 To Clear the next alert
'@ ExpectedResult: 
   '1 Should be able to login as loan officer. Loan should be seen. loan should open
   '2 Under alerts 2 alerts should be seen. All lock alerts have been cleared message will pop up
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2268","File started 9- clear alert",Null

Dim strLoanNumber, objAlertForm, boolAlertFound

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_Carollo"

'Gets the Loan Number
strLoanNumber = BIZ_Loan_GetLoanNumber()

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Loan Officer - Default View","My Pipeline"
GUI_Dialog_Encompass_OK("")
BIZ_Loan_SearchLoanByColumnValue "Loan Number",strLoanNumber
GUI_Dialog_Encompass_YesX 60, ""

Set objAlertForm = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts")
boolAlertFound = GUI_List_ClickRowbySubString(objAlertForm, Null, 0, "Lock confirmed by", False, False, False, "Double")

If boolAlertFound Then 
   GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=clearAlertBtn")
   
   If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass")) Then 
	  FRM_Logger_ReportPassEvent "Clear Alerts", "All lock alerts have been cleared message will pop up.", Null
	  GUI_Dialog_Encompass_OK("")
   Else
   	  FRM_Logger_ReportFailEvent "Clear Alerts", "All lock alerts are not cleared", Null
   End If
Else 
   FRM_Logger_ReportPassEvent "Clear Alerts", "Lock confirmed alert is not displayed",Null
End If

Set objAlertForm = Nothing