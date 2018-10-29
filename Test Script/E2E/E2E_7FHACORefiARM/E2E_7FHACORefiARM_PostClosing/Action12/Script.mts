'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2744 - FHACOREFIARM Post Closing 3 - Order Encompass Compliance services
'@ Test Automation JIRA Task: PTAC-2724 E2E_2FHACORefiARM_PostClosing
'@ TestData: 
   '1 Loans, Milestone and E2E_7FHACORefiARM_PostClosing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click tools tab and select TQL services
   '2 Click 'order' button next to 'compliance service orders'
   '3 Click on magnifying lens next to shipper and select 'Mary PCandShipper' as shipper. Click finish milestone
'@ ExpectedResult: 
   '1 TQL services will open
   '2 Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report
   '3 Milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2744","FHACOREFIARM Post Closing 3 - Order Encompass Compliance services", Null

Dim objData

BIZ_TQLServices_SubmitOrder "Compliance Service","" 

Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_PostClosing")
BIZ_Loan_FinishMilestone_AssignUser "Post Closing",  FRM_DS_GetValue(objData,"NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Post Closing finished")) Then 
	BIZ_Forms_Open "Borrower Summary - Origination" 
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS11Completed_FHACORefiARM"
End If

Set objData = Nothing

'Exists the Loan Details
BIZ_Loan_Exit True
'Logout From Encompass
BIZ_Login_UserLogout()