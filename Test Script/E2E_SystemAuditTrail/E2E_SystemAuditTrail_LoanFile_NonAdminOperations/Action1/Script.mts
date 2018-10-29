'@**************************************************************************************************
'@ TestStory:PTAC-2082 System Audit Trails
'@ TestCase:
	'1 PTAC-2060 Verify 'Loan file' as the category with 'Created' action for 'System Audit Trail' with Non Admin user 
	'2 PTAC-2061 Verify 'Loan file' as the category with 'Modified' action for 'System Audit Trail' for Non Admin User 
	'3 PTAC-2063 Verify 'Loan file' as the category with 'Moved' action for 'System Audit Trail' for Non Admin User 
	'4 PTAC-2064 Verify 'Loan file' as the category with 'Restored' action for 'System Audit Trail' for Non Admin User  
	'5 PTAC-2065 Verify 'Loan file' as the category with 'Permanently Deleted' action for 'System Audit Trail' for Non Admin User 
	'6 PTAC-2066 Verify 'Loan file' as the category with 'Deleted' action for 'System Audit Trail' for Non Admin User 
'@ Test Automation JIRA Task: PTAC-2442  E2E_SystemAuditTrail_LoanFile_NonAdminOperations
'@ TestData: Add Test data file name, Sheet name and Row Id.
	'1 Forms_BorrowerSummaryOrigination, SetBorrower and  PTAC-2027
	'2 Forms_BorrowerSummaryOrigination, SetBorrower and PTAC-2032
	'3 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, PTAC-2060_LoanStatus
	'4 Settings_Loansetup, AddLoanFolder and strRowIDFolder
'@ Pre-conditions:
'@ Description: 
'@ TestSteps:	
	'1 Verify 'Loan file' as the category with 'Created' action for 'System Audit Trail' with Non Admin user 
	'2 Verify 'Loan file' as the category with 'Modified' action for 'System Audit Trail' for Non Admin User 
	'3 Verify 'Loan file' as the category with 'Moved' action for 'System Audit Trail' for Non Admin User 
	'4 Verify 'Loan file' as the category with 'Restored' action for 'System Audit Trail' for Non Admin User  
	'5 Verify 'Loan file' as the category with 'Permanently Deleted' action for 'System Audit Trail' for Non Admin User 
	'6 Verify 'Loan file' as the category with 'Deleted' action for 'System Audit Trail' for Non Admin User
'@ ExpectedResult:
	'1 Record Displayed Under 'Created' action for 'System Audit Trail' with Non Admin user 
	'2 Record Displayed Under 'Modified' action for 'System Audit Trail' for Non Admin User 
	'3 Record Displayed Under 'Moved' action for 'System Audit Trail' for Non Admin User 
	'4 Record Displayed Under 'Restored' action for 'System Audit Trail' for Non Admin User  
	'5 Record Displayed Under 'Permanently Deleted' action for 'System Audit Trail' for Non Admin User 
	'6 Record Displayed Under 'Deleted' action for 'System Audit Trail' for Non Admin User
'***************************************************************************************************

FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2442","Script Name: E2E_SystemAuditTrail_LoanFile_NonAdminOperations ", Null

strPipelineView 	= 	"Super Administrator - Default View"
strLoanOfficerView 	= 	"Loan Officer - Default View"
strRowID			=	"PTAC-2027"
strRowID2			=	"PTAC-2032"
strRowID3			=	"PTAC-2060_LoanStatus"
'strRowIDFolder		=	"LoanFolderCreation_005"
strRowIDFolder		= "LoanFolderCreation_AuditTrail"
strExcelFileName	=   "AuditTrailLoanData.xlsx"

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== 'Loan file' as the category with 'Deleted' action ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2066 ","Verify 'Loan file' as the category with 'Deleted' action for 'System Audit Trail' for Non Admin User ", Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder = BIZ_Settings_CreateLoanFolder(strRowIDFolder , "OFF" , "OFF")
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
BIZ_Settings_CompanySettings_ValidateLoanFolderCheckBox "All Users",strLoanFolder
BIZ_Settings_CompanySettings_ValidateLoanFolderCheckBox "All Users","(Trash)"


BIZ_Nav_HierarchyTree "Company/User Setup", "Personas"
Settings_Person_FolderMoveTo "Loan Officer","Move Loans",strLoanFolder
If GUI_Object_IsEnabled(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnSave")) Then
	BIZ_Settings_ClickSave
End If


BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
BIZ_OrganizationUsers_CreateUser "PTAC-2060_LoanStatus"
BIZ_Settings_ClickClose()
BIZ_Login_UserLogout()

'====== Pre-Requisite to verify non-admin user in user group ======
BIZ_Login_UserLogin strRowID3

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strDelLastName = BorrowerSummary_Borrower_LastName()
strDelLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number", strDelLoanNumber
BIZ_Loan_DeleteLoan()
	

'====== 'Loan file' as the category with 'Created' action ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2060 "," Verify 'Loan file' as the category with 'Created' action for 'System Audit Trail' with Non Admin user ", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strCreatLastName = BorrowerSummary_Borrower_LastName()
strCreatLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)
	

'====== 'Loan file' as the category with 'Modified' action ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2061","Verify 'Loan file' as the category with 'Modified' action for 'System Audit Trail' for Non Admin User ", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strModLastName = BorrowerSummary_Borrower_LastName()
strModLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)
BIZ_Loan_OpenByLoanNumber(strModLoanNumber)
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID2
BIZ_Loan_Save()
BIZ_Loan_Exit(True)


'====== 'Loan file' as the category with 'Moved' action ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2063","Verify 'Loan file' as the category with 'Moved' action for 'System Audit Trail' for Non Admin User", Null	
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strMoveLastName=BorrowerSummary_Borrower_LastName()
strMoveLoanNumber=BIZ_Loan_GetLoanNumber()

BIZ_Loan_Exit(True)
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number", strMoveLoanNumber
SystemAuditTrail_FolderSelectToMoveLoan strLoanFolder
	

'====== 'Loan file' as the category with 'Restored' action ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2064 ","Verify 'Loan file' as the category with 'Restored' action for 'System Audit Trail' for Non Admin User '", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strRestoreLastName = BorrowerSummary_Borrower_LastName()
strRestoreLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strRestoreLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strLoanOfficerView,"(Trash)"
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strRestoreLoanNumber
SystemAuditTrail_FolderSelectToMoveLoan strLoanFolder
	
''====== 'Loan file' as the category with 'Permanently Deleted' action ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2065 ","Verify 'Loan file' as the category with 'Permanently Deleted' action for 'System Audit Trail' for Non Admin User ", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strPDelLastName = BorrowerSummary_Borrower_LastName()
strPDelLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strPDelLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strLoanOfficerView,"(Trash)"
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strPDelLoanNumber
BIZ_Loan_DeleteLoan()
	
'====== 'Loan file' as the category with 'Export to Excel' ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-2038 ","Verify 'Loan file' as the category with 'Export to Excel' for 'System Audit Trail' ", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder strLoanOfficerView,"My Pipeline" 
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_Loan_Save()
strExportLastName   = BorrowerSummary_Borrower_LastName()
strExportLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit(True)

'====== Non Admin user logout,Login to the Encompass as admin ======
BIZ_Login_UserLogout
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "System Administration", "System Audit Trail"

'====== 'Loan file Audit Search For Delete Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Deleted", strDelLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strDelLastName,strDelLoanNumber,"LoanDeleted"

'====== 'Loan file Audit Search For Creat Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Created", strCreatLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strCreatLastName,strCreatLoanNumber,"LoanCreated"

'====== 'Loan file Audit Search For Modified Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Modified", strModLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strModLastName,strModLoanNumber,"LoanModified"

'====== 'Loan file Audit Search For Moved Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Moved", strMoveLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strMoveLastName,strMoveLoanNumber,"LoanMoved"

'====== 'Loan file Audit Search For Restored Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Restored", strRestoreLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strRestoreLastName,strRestoreLoanNumber,"LoanRestored"

'====== 'Loan file Audit Search For Permanently Deleted Action ======
SystemAuditTrail_SearchActionTakenBy "Loan File", "Permanently Deleted", strPDelLastName,strRowID3
SystemAuditTrail_Verify_SearchedLoanValues strPDelLastName,strPDelLoanNumber,"LoanPermanentDeleted"

'====== 'Loan file' as the category with 'Export to Excel' ======
UTIL_Win_CloseExcel()
SystemAuditTrail_SearchActionTakenBy "Loan File", "Created", strExportLastName,strRowID3
SystemAuditTrail_VerifyExportedExcelValues strExportLastName,strExcelFileName
strExcelFilePath   = Pathfinder.Locate("Test Report\")&strExcelFileName
UTIL_Excel_Opened_File_Delete strExcelFilePath
BIZ_Settings_ClickClose()

'====== 'Delete Loans From Pipleline' ======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, "My Pipeline"

BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strCreatLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strModLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strExportLoanNumber
BIZ_Loan_DeleteLoan()

'====== 'Delete Loans From Created Folder' ======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder strPipelineView, strLoanFolder
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strMoveLoanNumber
BIZ_Loan_DeleteLoan()
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number",strRestoreLoanNumber
BIZ_Loan_DeleteLoan()

intNumberOfLoans = CINT(BIZ_Pipeline_GetNumberOfLoansInPipeline)
'msgbox "intNumberOfLoans"&intNumberOfLoans
If intNumberOfLoans > 0 Then
	For i = 0 To intNumberOfLoans - 1
		GUI_List_ActOnRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),0,True,True,False,"Single"
		BIZ_Loan_DeleteLoan
	Next	
	
End If 


'====== 'Delete Loan Folder Created' ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Settings_DeleteLoanFolder(strLoanFolder)

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)





