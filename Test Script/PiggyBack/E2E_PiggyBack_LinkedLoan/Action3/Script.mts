'@**************************************************************************************************
'@ TestStory: PTAC-3157 Piggyback
'@ TestCase: PTAC-2357 Piggyback - Display the Link icon in the top loan summary section
'@ Test Automation JIRA Task: PTAC-3158 Piggyback_LinkLoan
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-2357_ModInfoForLoan2
'@ Pre-conditions: 
'@ Description:
   ' Display the Link icon in the top loan summary section
   ' When user clicks the Link icon, 2 options are displayed: Go to Linked Loan
   ' Clicking "Go to Linked Loan" will take the user to the loan that the current loan is linked to
   ' Prompt user to save the current loan before switching to linked loan Sync Data
   ' Clicking "Sync Data" will sync the data between the two loans as defined in the Piggyback Loan Synchronization in Settings
'@ TestSteps:
   '1 Go to Encompass Settings -> Loan Setup -> Piggyback Synchronization, Add the fields as per the test data, Close Settings.
   '2 Go to Pipleline, open the 1st loan created in the previous test case (PTAC-2406)
   '3 Click on the Link icon, Clicked the Go to Linked Loan option
   '4 In the 2nd loan, Add or change some values in the loan, Save and Close loan
   '5 Open the 2nd loan that was just modified Click on the Link icon, Close the loan.
   '6 Open the 2nd loan that was just modified Click on the Sync Data option
   '7 Open the loan that was just modified Change some data Click on the Link icon.
'@ ExpectedResult:
   '1 After step 2, Test data fields should be available in the list After Step 3, Settings window should be closed.
   '2 Verify the Link icon is displayed to the left of the 1st Lien/2nd Lien indicator in the loan summary section
   '3 Verify the two choices:Go to Linked Loan Sync Data
   '4 Verify the linked loan i.e 2nd loan is opened
   '5 After step 2, verify linked loan i.e. 1st loan is opened After step 3, 1st loan is closed.
   '6 Verify data in both loans has been updated
   '7 Click Yes Verify loan data saved
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Test Case#2: Verify Piggyback Loan data sync between the two loans as defined in the Piggyback Loan Synchronization in Settings", "Validate Piggyback Loan data sync between the two loans as defined in the Piggyback Loan Synchronization in Settings", Null

strRowID					=	"PTAC-2357_ModInfoForLoan2"
Dim objMain, objEncompassSettings, objPiggyBackSyncList, objEncompassDialog, objParentObject, objData, strRowID, strFirstLoan, strSecondLoan
Set objMain					=	SwfWindow("swfname:=MainForm")
Set objEncompassSettings	=	objMain.SwfWindow("swfname:=SetUpContainer")
Set objPiggyBackSyncList	=	objEncompassSettings.SwfObject("swfname:=listView")
Set objEncompassDialog		=	objMain.Dialog("text:=Encompass")
Set objParentObject			=	SwfWindow("swfname:=MainForm").Page("micclass:=Page") 
Set objData		 			= 	FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", strRowID)

FieldID1					=	"4000"
FieldID2					=	"4002"
FieldID3					=	"65"
FieldID4					=	"1402"
FieldID5					=	"1240"

strFirstLoan				=	Parameter("strFirstLoan")
strSecondLoan				=	Parameter("strSecondLoan")

'@	Step 1
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Piggyback Loan Synchronization"

FRM_Logger_ReportInfoEvent "Add Synchronization Fields in the Piggyback Loan Synchronization in Settings", "Adding Synchronization Fields in the Piggyback Loan Synchronization in Settings", Null
If Not(GUI_List_TextExists (objPiggyBackSyncList, "Field ID", FieldID1)) Then
	BIZ_Settings_Loansetup_PiggybackLoanSync_CreateSyncField FieldID1
End If
If Not(GUI_List_TextExists (objPiggyBackSyncList, "Field ID", FieldID2)) Then
	BIZ_Settings_Loansetup_PiggybackLoanSync_CreateSyncField FieldID2
End If
If Not(GUI_List_TextExists (objPiggyBackSyncList, "Field ID", FieldID3)) Then
	BIZ_Settings_Loansetup_PiggybackLoanSync_CreateSyncField FieldID3
End If
If Not(GUI_List_TextExists (objPiggyBackSyncList, "Field ID", FieldID4)) Then
	BIZ_Settings_Loansetup_PiggybackLoanSync_CreateSyncField FieldID4
End If
If Not(GUI_List_TextExists (objPiggyBackSyncList, "Field ID", FieldID5)) Then
	BIZ_Settings_Loansetup_PiggybackLoanSync_CreateSyncField FieldID5
End If

BIZ_Nav_Settings_Close()

'@step 2
BIZ_Nav_SelectPipelineTab()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_OpenByLoanNumber strSecondLoan

If GUI_Object_IsExistX(objMain.SwfObject("swfname:=elmLinkedLoan"),90) Then
	FRM_Logger_ReportPassEvent "Verify the Link Icon", "Link Icon should be displayed to the left of the 1st Lien/2nd Lien indicator in the loan summary section", Null
Else
	FRM_Logger_ReportFailEvent "Verify the Link Icon", "Link Icon is not displayed to the left of the 1st Lien/2nd Lien indicator in the loan summary section", Null
End If

'======== Go to Linked Loan======
BIZ_GoTo_LinkedLoan()

GUI_Object_IsExistX objMain.SwfLabel("swfname:=lblLoanNumber"), 90
GUI_Object_ValidateText objMain.SwfLabel("swfname:=lblLoanNumber"), strFirstLoan, "Linked Loan # '"&strFirstLoan&"' is opened"

'@ step 5
FRM_Logger_ReportInfoEvent "Modify basic information in Loan", "Modified basic information in Loan", Null
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-2357_ModInfoForLoan2"
BIZ_Loan_Exit True

'@ step 6
BIZ_Loan_OpenByLoanNumber strFirstLoan
Wait g_TinyWaitSmall + g_TinyWaitSmall + g_TinyWaitSmall

'======== Go to Linked Loan======
BIZ_GoTo_LinkedLoan()
GUI_Object_IsExistX objMain.SwfLabel("swfname:=lblLoanNumber"), 90
GUI_Object_ValidateText objMain.SwfLabel("swfname:=lblLoanNumber"), strSecondLoan, "Linked Loan # '"&strSecondLoan&"' is opened"
BIZ_Loan_Exit False

BIZ_Loan_OpenByLoanNumber strFirstLoan
Wait g_TinyWaitSmall + g_TinyWaitSmall + g_TinyWaitSmall	'@ Handling Sync Related Issues

BIZ_SyncData_LinkedLoan
wait 5
BIZ_GoTo_LinkedLoan()

FRM_Logger_ReportInfoEvent "Verifying sync data in both loans", "Validating sync data in both loans", Null
BIZ_Forms_Open "Borrower Summary - Origination"
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_36"), Trim(FRM_DS_GetValue(objData, "FirstName")),"First Name in sync for both the loans"
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_37"), Trim(FRM_DS_GetValue(objData, "LastName")),"Last Name in sync for both the loans"
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_65"), Trim(FRM_DS_GetValue(objData, "SSN")),"SSN"
GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1402"), Trim(FRM_DS_GetValue(objData, "DOB")),"Date Of Birth"

BIZ_Loan_Exit True

Set objMain					=	Nothing
Set objEncompassSettings	=	Nothing
Set objPiggyBackSyncList	=	Nothing
Set objEncompassDialog		=	Nothing
Set objParentObject			=	Nothing
Set objData		 			= 	Nothing
