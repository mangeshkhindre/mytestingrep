'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase : PTAC-1195 CONVNOCASHREFIARM - File started 1 - Assign new loan to Loan officer
'@ Test Automation JIRA Task: PTAC-1666 E2E_1ConvNoRefiARM_FileStarted
'@ TestData: 
   '1 Global_Data, Login and E2E_carollo
   '2 Loans, LoanTemplate and E2E_LoanOfficer
   '3 Loans, LoanTemplate and E2E_ConvNoRefiARM  
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass.
   '2 Click pipeline tab. 
   '3 Click New Loan icon.
   '4 Click New blank loan button.
'@ ExpectedResult: 
   '1 Encompass should open and Home page should be visible. 
   '2 Should be able to open a new loan.
   '3 New loan pop up should open.
   '4 New loan should open with Borrower summary origination page or 1003 page.
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1195","CONVNOCASHREFIARM - File started 1 Assign new loan to Loan officer", Null

Dim objData, LoanPageExists

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_carollo"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_ConvNoRefiARM")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

BIZ_Loan_AddNewBlankLoan()
GUI_Dialog_Encompass_YesX 3, ""

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"),3) Then 
   GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

LoanPageExists = GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),5)

If LoanPageExists Then 
   FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "New loan is open with Borrower summary origination page or 1003 page", Null
Else
   FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "New Loan is not opened", Null
End If

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_ConvNoRefiARM")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_ConvNoRefiARM", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"


Set objData =  Nothing
