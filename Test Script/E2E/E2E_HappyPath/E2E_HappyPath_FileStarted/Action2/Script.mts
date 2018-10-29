'@**************************************************************************************************
'@ TestStory: PTAC-1129 E2E_HAPPYPATH
'@ TestCase : PTAC-1080 HP File Started 1 - Create a new loan
'@ Test Automation JIRA Task: PTAC-1130 E2E_HappyPath_FileStarted
'@ TestData: 
	'1 Global_Data, Login, E2E_HappyPath_Admin
	'2 Loans, LoanTemplate, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass
	'2 Click pipeline tab 
	'3 Click New Loan icon
	'4 Click on 'New blank loan' button.
'@ ExpectedResult: 
	'1 Encompass should open and Home page should be visible
	'2 Should be able to open a new loan
	'3 New loan pop up should open
	'4 New loan should open with Borrower summary origination page.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1080","HP File Started 1 - Create a new loan", Null

Dim blnLoanPageExists,objData

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_HappyPath_Admin"  'QA Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
'BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'New line of code is added
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "My Pipeline" 
'Create a new by applying template
'BIZ_Loan_ApplyTemplateToNewLoanInFolder  FRM_DS_GetValue(objData, "LoanFolderPath"), FRM_DS_GetValue(objData, "LoanTemplate") 
'BIZ_Loan_AddNewBlankLoan()

GUI_Dialog_Encompass_YesX 2, ""

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"),2) = true) then 
	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

'blnLoanPageExists = GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),6)
'
'If (blnLoanPageExists = True) Then 
'	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "Loan is created with the Template " &FRM_DS_GetValue(objData, "LoanTemplate"), Null
'Else
'	FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "Loan is not created with the Template " &FRM_DS_GetValue(objData, "LoanTemplate"), Null
'End If

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_HappyPath")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_HappyPath", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData	= Nothing
