'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: "Global_Data"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
'1.Login to Encompass.
'2.Click pipeline tab. 
'3.Click New Loan icon.
'4.Select conventional 5/1 AR
 '5.Click New blank loan button.
'@ ExpectedResult: 
'1.Encompass should open and Home page should be visible. 
'2.Should be able to open a new loan.
'********************************************************************************************
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p_integration"

'====== Go to Pipeline Page ======
BIZ_Nav_SelectPipelineTab()

'====== Create a new by applying template======
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "Core2p_Integration")  
BIZ_Loan_ApplyTemplateToNewLoan FRM_DS_GetValue(objData, "LoanTemplate")
LoanPageExists = GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),10)
if(LoanPageExists = true) then 
	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "Loan is created with the Template " &FRM_DS_GetValue(objData, "LoanTemplate"), null
End if
