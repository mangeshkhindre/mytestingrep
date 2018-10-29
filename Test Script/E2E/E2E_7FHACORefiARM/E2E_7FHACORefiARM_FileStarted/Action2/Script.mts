'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2292 FHACOREFIARM File started 1 Assign new loan to Loan officer
'@ Test Automation JIRA Task: PTAC-2713 E2E_7FHACORefiARM_FileStarted
'@ TestData: 
   '1 Global_Data, Login, E2E_markuslo
   '2 Loans, LoanTemplate, E2E_LoanOfficer
   '3 Loans, LoanTemplate, E2E_FHACORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass
   '2 Click pipeline tab 
   '3 Click New Loan icon
   '4 Click on 'New blank loan'   
'@ ExpectedResult: 
   '1 Encompass should open and Home page should be visible 
   '2 Should be able to open a new loan
   '3 New loan pop up should open
   '4 New loan should open with Borrower summary origination page or 1003 page
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2292","FHACOREFIARM File started 1 Assign new loan to Loan officer", Null

'====== Login to the Encompass as E2E_Clarklo ======
BIZ_Login_UserLogin "E2E_Clarklo" 

'====== Validate Existence of Pipeline Tab & Selecting Pipeline View And Loan Folder ======
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 25, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer") 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
Set objData = Nothing 

'====== Create a new Loan by applying template ======
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_FHACORefiARM") 
BIZ_Loan_AddNewBlankLoan()
GUI_Dialog_Encompass_YesX 3, ""

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes"),3)) Then 
	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If

If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0"),5)) Then 
	FRM_Logger_ReportPassEvent "Assign Loan Officer To Loan", "New loan should open with Borrower summary origination page or 1003 page", Null
Else 
	FRM_Logger_ReportFailEvent "Assign Loan Officer To Loan", "New loan is not open", Null
End If

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) & Day(Now) & Month(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHACORefiARM")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHACORefiARM", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

Set objData = Nothing 
