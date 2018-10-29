'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2261 - File started 1-Assign Loan Officer to New Loan
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_Filestarted
'@ TestData: 
	'Global_Data, Login and E2E_Tracy
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass as Loan opener
   '2 Click pipeline tab
   '3 Click New Loan icon
   '4 Click on 'New blank loan' button
   '5 Go to File started log and select Loan officer as per test data
	  'Note: If Loan Opener & Loan officer is having same user privileges then ignore this step
'@ ExpectedResult: 
   '1 Encompass should open and Home page should be visible
   '2 Should be able to open a new loan
   '3 New loan pop up should open
   '4 New loan should open with Borrower summary origination page or 1003 page.
   '5 loan officer should be assigned
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2261","File started 1-Assign Loan Officer to New Loan",Null

'Login Encompass as Loan Opener
BIZ_Login_UserLogin "E2E_Carollo"

GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 25,_
"Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Loan Opener - Default View","My Pipeline"
BIZ_Loan_AddNewBlankLoan()

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),5)) Then 
    FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "New loan should open with Borrower summary origination page or 1003 page", Null
Else 
    FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "New loan is not opened", Null
End If

Dim objData
'Assign user tracy as loan officer
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_FileStarted")

BIZ_AlertsAndLog_ClickOnRecord "Log", "File Started"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxNextLA")
BIZ_Loan_SelectMilestoneUser FRM_DS_GetValue(objData, "NextUser")
		 
'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) 
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_VANoCORefiARM")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_VANoCORefiARM", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData  = Nothing
