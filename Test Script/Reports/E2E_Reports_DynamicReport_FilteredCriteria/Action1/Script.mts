'@**************************************************************************************************
'@ TestStory: PTAC-1350 Reports
'@ TestCase: 
    '1 PTAC-693 Verify if the user is able to generate the report for the filtered criteria.
'@ Test Automation JIRA Task: PTAC-3736 Reports_GenerateDynamicReport_FilteredCriteria
'@ TestData: 
	'1 Reports, ReportOperation, PTAC-693
'@ Pre-conditions:
	'1 Login as Admin user  
'@ Description: Creation of new folder and new report and perform different operations on it.
'@ TestSteps:
	'1 Login to Encompass with Admin user credentials.
    '2 In the Reports tab, create a new report "Auto Report-Loan Report"
    '3 Go to Fields tab, add few fields.
    '4 Go to Milestone tab, define the loans to include: 
    '5 Go to Folders tab, select "automation" folder.
    '6 Go to Filters tab and add filters, Save the report
    '7 Go to Pipeline and select loan folder "Automation"
    '8 Create two loans with:
     'a Borrower first name for both the loans starts with "emily"
     'b 1st loan amount is greater than 150000
     'c 2nd loan amount is not greater than 150000
    '9 Now, go to Reports tab, Generate report for "Auto Report-Loan Report", Open and verify the generated excel report.
'@ ExpectedResult:
	'1 Admin user is logged into Encompass
    '2 Newly created report is saved successfully.
    '3 two new loans are successfully created.
    '4 New report is generated successfully.
    '5 In the excel report, it should just include the 1st loan:  the loan which "Borrower First name" Start with "Emily" and the Loan Amt is 160000
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3736","Script Name: Reports_GenerateDynamicReport_FilteredCriteria", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-693","Verify if the user is able to generate the report for the filtered criteria.", Null

Dim objMain, objMainMenu, objReportList, objMainScreen, objReportOptionsDialog, objUsersList, objDataForLoanAmount, objDataForName

Set objMain					=	SwfWindow("swfname:=MainForm")
Set objMainMenu 			=	objMain.SwfToolbar("swfname:=mainMenu")
Set objReportList			=	objMain.SwfObject("swfname:=gvDirectory")
Set objMainScreen			=	objMain.SwfWindow("swfname:=MainScreen")
Set objReportOptionsDialog	=	objMain.SwfWindow("swfname:=ReportOption")
Set objUsersList			=	objReportOptionsDialog.SwfWindow("swfname:=ContactAssignment").SwfListView("swfname:=listView1")
strRowIDForLoan1			=	"PTAC-693_Loan1"
strRowIDForLoan2			=	"PTAC-693_Loan2"
Set objDataForLoanAmount	=	FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetTransactionDetails", strRowIDForLoan1)
Set objDataForName			=	FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", strRowIDForLoan1)

'====== Pre-condition ======
UTIL_Win_CloseExcel()
Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues

'====== Create Loan folder & two loans ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder	=	BIZ_Settings_CreateLoanFolder("PTAC-693" , "OFF" , "OFF")
Wait g_TinyWaitSmall + g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", strLoanFolder
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-693_Loan1"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-693_Loan1"
BIZ_Loan_Save()
strFirstLoan	=	BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit True
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", strLoanFolder
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-693_Loan2"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-693_Loan2"
BIZ_Loan_Save()
strSecondLoan	=	BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit True
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

boolFirstLoan	=	UTIL_String_IsNotEmpty (strFirstLoan)
boolSecondLoan	=	UTIL_String_IsNotEmpty (strSecondLoan)
boolval			=	boolFirstLoan AND boolSecondLoan
FRM_VerifyTrue boolval, "Verify Loans Created", "Two Loans Created with Loan numbers: '"&strFirstLoan&"' and '"&strSecondLoan&"' "

'====== Create Report & Add Fields ======
BIZ_Nav_SelectTabControl "Reports"

If GUI_Object_IsExistX (objReportList, 60) Then
	FRM_Logger_ReportPassEvent "Reports Tab","Reports Tab Opened",Null
Else
	FRM_Logger_ReportFailEvent "Reports Tab","Reports Tab not Opened",Null
End If

strReportName = BIZ_Reports_CreateNewReport ("PTAC-693", "Personal Reports")
GUI_Object_WaitTillVisibleX objReportList, 480		'@ To handle sync Related Issues
GUI_Object_WaitTillExistX objReportList, 60		'@ To handle sync Related Issues
GUI_List_ClickRow objReportList, None, "Name", strReportName, True, False, False, "Single"

BIZ_Reports_AddField "4000"
BIZ_Reports_ValidateField "4000"
BIZ_Reports_AddField "4002"
BIZ_Reports_ValidateField "4002"
BIZ_Reports_AddField "1109"
BIZ_Reports_ValidateField "1109"
BIZ_Reports_AddField "LoanFolder"
BIZ_Reports_ValidateField "LoanFolder"
BIZ_Reports_AddField "Log.MS.Stage"
BIZ_Reports_ValidateField "Log.MS.Stage"
GUI_Object_WaitTillExistX objMain.SwfObject("swfname:=btnSave"), 60	'@ To handle sync Related Issues
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

BIZ_Reports_MilestonesTab "Define the loans to include in the report by milestone criteria.", "Started;Processing"
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues
BIZ_Reports_FoldersTab "Select loan folders manually.", strLoanFolder
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

BIZ_Reports_AddFilter "4000", "Starts with", "Emily"
BIZ_Reports_AddFilter "1109", "Greater than", "150000"
GUI_Object_WaitTillExistX objMain.SwfObject("swfname:=btnSave"), 60	'@ To handle sync Related Issues
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
GUI_Object_WaitTillExistX objMainScreen.SwfButton("swfname:=btnGenerateReport"), 60	'@ To handle sync Related Issues
GUI_SwfButton_Click objMainScreen.SwfButton("swfname:=btnGenerateReport")

If GUI_Object_IsExistX (objMain.SwfWindow("swfname:=ProgressDialog","swfname path:=ProgressDialog"), 35) Then
	FRM_Logger_ReportPassEvent "Process Dialog", "Report Generated", Null
	Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
	strExcelFilePath = Pathfinder.Locate("Test Report\")&"GenerateReport"&UTIL_Math_RandomNo()&".xlsx"
	UTIL_Excel_Opened_File_Save strExcelFilePath
	Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
	intRow = UTIL_Excel_GetRowIndexByColumnValue(strExcelFilePath, "Table", "Borrower First Name", FRM_DS_GetValue(objDataForName, "FirstName"))
	
	If UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "C")	= FRM_DS_GetValue(objDataForLoanAmount, "LoanAmount") Then
	   FRM_VerifyEqual FRM_DS_GetValue(objDataForLoanAmount, "LoanAmount"), UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "C") ,_
	   "Loan Amount", "Loan Amount we entered and excel sheet value"

		FRM_VerifyEqual FRM_DS_GetValue(objDataForName, "FirstName"),UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "A") ,_
		"Borrower First Name", "Name we entered and excel sheet"   
	End If
	
	Wait g_ShortWaitMedium		'@ Explicit wait used to handle sync issues
	UTIL_Excel_Opened_File_Delete strExcelFilePath
End If

If GUI_Object_IsExistX (objReportOptionsDialog,3) Then
	GUI_SwfButton_Click objReportOptionsDialog.SwfButton("swfname:=btnCancel")
	GUI_Object_WaitTillExistX objMainMenu, 60	'@ To handle sync Related Issues
	GUI_SwfToolbar_ShowDropdown objMainMenu, "Reports"		
	GUI_SwfToolbar_Select objMainMenu, "Add Options when Reports Run"
	GUI_Object_WaitTillExistX objMainScreen.SwfButton("swfname:=btnGenerateReport"), 60	'@ To handle sync Related Issues
	GUI_SwfButton_Click objMainScreen.SwfButton("swfname:=btnGenerateReport")
	GUI_Object_WaitTillExistX objReportOptionsDialog, 35 '@ To handle sync Related Issues
	GUI_SwfButton_Click objReportOptionsDialog.SwfButton("swfname:=btnOk")
	GUI_Dialog_Encompass_YesX 3, "The Reporting Database has been modified but loan files are not populated yet.*"
Else
	GUI_Dialog_Encompass_YesX 2, "The Reporting Database has been modified but loan files are not populated yet.*"
	
	If GUI_Object_IsExistX (objMain.SwfWindow("swfname:=ProgressDialog","swfname path:=ProgressDialog"), 35) Then
		FRM_Logger_ReportPassEvent "Process Dialog", "Report Generated", Null
		Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
		strExcelFilePath = Pathfinder.Locate("Test Report\")&"GenerateReport"&UTIL_Math_RandomNo()&".xlsx"
		UTIL_Excel_Opened_File_Save strExcelFilePath
		Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
		intRow = UTIL_Excel_GetRowIndexByColumnValue(strExcelFilePath, "Table", "Borrower First Name", FRM_DS_GetValue(objDataForName, "FirstName"))
		
		If UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "C")	= FRM_DS_GetValue(objDataForLoanAmount, "LoanAmount") Then
		   FRM_VerifyEqual FRM_DS_GetValue(objDataForLoanAmount, "LoanAmount"), UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "C") ,_
		   "Loan Amount", "Loan Amount we entered and excel sheet value"
	
			FRM_VerifyEqual FRM_DS_GetValue(objDataForName, "FirstName"),UTIL_Excel_GetCellData (strExcelFilePath, "Table", intRow, "A") ,_
			"Borrower First Name", "Name we entered and excel sheet"   
		End If
		
		Wait g_ShortWaitMedium		'@ Explicit wait used to handle sync issues
		UTIL_Excel_Opened_File_Delete strExcelFilePath
	End If
End If

Wait g_ShortWaitMedium		'@ Explicit wait used to handle sync issues
UTIL_Win_CloseExcel()

'====== Delete the existing report ======
BIZ_Reports_DeleteReport strReportName, "Personal Reports"

'====== Delete Loans ======
BIZ_Pipeline_SelectLoanFolder strLoanFolder
BIZ_Loan_DeleteLoan()
BIZ_Loan_DeleteLoan()
wait g_ShortWaitTime ' Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
Wait g_TinyWaitLarge ' Due To Sync Issue We Are Explicitly Passing Wait Statement
BIZ_Settings_DeleteLoanFolder strLoanFolder
BIZ_Settings_ClickClose()

Set objMain					=	Nothing
Set objMainMenu 			=	Nothing
Set objReportList			=	Nothing
Set objMainScreen			=	Nothing
Set objReportOptionsDialog	=	Nothing
Set objUsersList			=	Nothing
Set objDataForLoanAmount	=	Nothing
Set objDataForName			=	Nothing

'====== Logout from the application ======
BIZ_Nav_SelectHomeTab()

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
