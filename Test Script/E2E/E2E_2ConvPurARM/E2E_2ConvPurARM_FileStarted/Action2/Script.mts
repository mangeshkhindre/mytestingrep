'@******************************************************************************************
'@ TestStory: PTAC-871 E2E_2CONVPURARM
'@ TestCase : PTAC-312 File started 1-Assign Loan Officer to New Loan
'@ Test Automation JIRA Task: PTAC-989 E2E_2CONVPURARM_Filestarted
'@ TestData: 
	'1 Global_Data, Login, E2E_markuslo
	'2 Loans, LoanTemplate, E2E_LoanOfficer
	'3 Loans, LoanTemplate, E2E_CONVPURARM
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
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-312","File started 1-Assign Loan Officer to New Loan", Null

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_markuslo" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 25, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
Set objData = Nothing 

'Create a new Loan======
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_CONVPURARM") 
BIZ_Loan_AddNewBlankLoan()
GUI_Dialog_Encompass_YesX 3, ""

If(GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"),3)) Then 
	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

If(GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),5)) Then 
	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "New loan screen is opened with Borrower summary origination page or 1003 page.", null
Else
	FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "New loan screen is not opened", null
End If

''Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) & Day(Now) & Month(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_CONVPURARM")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_CONVPURARM", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData = Nothing 
