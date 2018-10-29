'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1486 FHANOCHOTREFIFIX File started 1 Assign new loan to Loan officer
'@ Test Automation JIRA Task: PTAC-2446 E2E_5FHANoCHOTRefiFix_Filestarted
'@ TestData: 
   '1 Global_Data, Login and E2E_FHANoCHOTRefiFix
   '2 Loans, LoanTemplate and E2E_LoanOfficer
   '3 Loans, LoanTemplate and E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass
   '2 Click pipeline tab 
   '3 Click New Loan icon
   '4 Click on 'New blank loan' button.
'@ ExpectedResult: 
   '1 Encompass should open and Home page should be visible
   '2 Pipeline view should open
   '3 New loan pop up should open
   '4 New loan should open with Borrower summary origination page.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1486","FHANOCHOTREFIFIX File started 1 Assign new loan to Loan officer", Null

'Login to the Encompass
BIZ_Login_UserLogin "E2E_Clarklo"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 25, "Encompass is open and Home page is visible"

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Create a new Loan by applying template
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_FHANoCHOTRefiFix") 
BIZ_Loan_AddNewBlankLoan()

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"),3)) Then 
	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),5)) Then 
	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "New loan is opened with Borrower summary origination  page or 1003 page", Null
Else
	FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "New Loan is not opened", Null
End If

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) & Day(Now) & Month(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHANoCHOTRefiFix")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHANoCHOTRefiFix", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData = Nothing
