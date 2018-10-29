'@**************************************************************************************************
'@ TestStory:  PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase :  PTAC-2932 CONVCASHOUTREFIFIX File Started 1 - Import a TPO loan file in Encompass
'@ Test Automation JIRA Task: PTAC-3371 E2E_3CONVCASHOUTREFIFIX_FileStarted
'@ TestData: 
    '1 Global_Data, Login, E2E_Carollo
    '2 Loans, LoanTemplate, E2E_LoanOfficer
    '3 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_CONVCASHOUTREFFIX
    '4 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_CONVCASHOUTREFFIX
    '5 Forms_BorrowerSummaryOrigination, SetProperty, E2E_CONVCASHOUTREFFIX"
    '6 Forms_BorrowerSummaryOrigination, SetCreditScores, E2E_CONVCASHOUTREFFIX
    '7 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_CONVCASHOUTREFFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login to Encompass as Loan Opener.
	'2 Click on pipeline tab.
	'3 Pre-requisite
	   'open windows explore and enter URL/site address as per test data
	   'select FNM file as per test data
		'1 Right click on the file- “Andy America.fnm”  and select the copy option.
		'2 Go to  Path  C:\ ->> smartclientcache ->> Apps ->> Ellie Mae->>Encompass in the system  and paste the FNM file.
	'4 Click on pipeline header level and click on 'import'.
	'5 Select Radio button Fannie Mae 3.x and click 'continue' button.
 	'6 Select from the folder where you want to import from your local system. Select the Andy_Amy America_conv_COrefi.fnm(File is in attachments).
       'Select from Import to Loan folder- My pipeline and click on 'Import button'.
	'7 Click 'ok' in the pop up window.
	'8 Click on the loan.
	'9 In borrower summary page enter the following fields as per test data.
'@ ExpectedResult: 
	'1 Homepage should open. 
	'2 Pipeline tab should open.
	'3 Provided path should open and address bar should have url/site address in search bar
	   'system is able to select 1.After step-2  Andy_Amy America_conv_COrefi.fnm file  should be in Encompass folder.
	'4 Import window should open.
	'5 Import from Fannie Mae window should open.
	'6 1 out of 1 files were imported message pop up should open.
	'7 Pipeline tab should open with loan in top of grid with Borrower name 'America,Andy'.
	'8 Loan should open with borrower summary origination page.
	'9 Should be able to enter all fields.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2932","CONVCASHOUTREFIFIX File Started 1 - Import a TPO loan file in Encompass", Null

Dim objData, objDataPipeLine, strFileName, strFNMaFolder, strEncompassFolder
Dim strItemListContent, objWindow, objImportFannie,objImportFannieDlg,objPipelineGrid,strFolderNames,intFolderName

Set objData         = FRM_DS_GetTestData("LoanFile", "ImportNExport", "E2E_CONVCASHOUTREFFIX")
Set objDataPipeLine = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer")
strFileName         = FRM_DS_GetValue(objData, "FileName")
strFNMaFolder       = FRM_RT_DataDirPath()
'FRM_DS_GetValue(objData, "FNMaFolderPath")
strEncompassFolder  = FRM_DS_GetValue(objData, "EncompassFolderPath")

If (UTIL_File_FileExists(strFNMaFolder&strFileName)) Then
    FRM_Logger_ReportPassEvent "Check existance of FNMA file in corp site", strFileName & " FNMA file is present", Null
Else
    FRM_Logger_ReportFailEvent "Check existance of FNMA file in corp site ", strFileName & " FNMA file is not present", Null
End If

UTIL_File_Copy strFNMaFolder&strFileName, strEncompassFolder, ""

If (UTIL_File_FileExists(strEncompassFolder&strFileName)) Then
    FRM_Logger_ReportPassEvent "Check existance of FNMA file in local drive after copy from corp site", "FNMA file is present", Null
Else
    FRM_Logger_ReportFailEvent "Check existance of FNMA file in local drive after copy from corp site", "FNMA file is not present", Null
End If

Set objWindow           = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ImportMain")
Set objImportFannie     = objWindow.SwfWindow("swfname:=ImportFannie")
Set objImportFannieDlg  = objImportFannie.SwfWindow("swfname:=ImportProgress").Dialog("text:=Encompass")
Set objPipelineGrid     = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=gvLoans")
strFolderNames          = Split(strEncompassFolder, "\")

'Login to the Encompass as admin
BIZ_Login_UserLogin "E2E_Carollo"  'QA Environment

'------Navigate to Pipeline-------
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objDataPipeLine,"PipeLineView"), FRM_DS_GetValue(objDataPipeLine,"LoanFolder")
BIZ_Nav_OpenMenuItem "Pipeline;Import..."

If (GUI_Object_IsExistX(objWindow,40)) Then 
    FRM_Logger_ReportPassEvent "In Pipeline menu bar select the import option", "Import window is opened", Null
End If

GUI_SwfRadioButton_Click objWindow.SwfRadioButton("swfname:=rbFannieMae")
GUI_SwfButton_Click objWindow.SwfButton("swfname:=btnContinue")

If (GUI_Object_IsExistX(objWindow.SwfWindow("swfname:=ImportFannie").SwfList("swfname:=dirListBox"),40))Then
    FRM_Logger_ReportPassEvent "Select the radio button Fannie Mae 3x and Select Do not assign a Loan Officer and Click the Continue button","Import Fannie window is opened", Null 
End If

For intFolderName = 0 To UBound(strFolderNames)-1 Step 1
    If (intFolderName = 0) Then
        GUI_SwfList_Activate objImportFannie.SwfList("swfname:=dirListBox"), strFolderNames(intFolderName)& "\"
    Else
        GUI_SwfList_Activate objImportFannie.SwfList("swfname:=dirListBox"), strFolderNames(intFolderName)
    End If
Next

strItemListContent = objImportFannie.SwfList("swfname:=fileListBox").GetContent()

If (InStr(strItemListContent, strFileName) >0) Then 
    GUI_SwfList_Select objImportFannie.SwfList("swfname:=fileListBox"), strFileName
    GUI_SwfButton_Click objImportFannie.SwfButton("swfname:=importBtn")
    
    If (GUI_Object_IsExistX(objImportFannieDlg, 50)) Then
        FRM_Logger_ReportPassEvent "Select the Encompass folder and select the '"&strFileName&"' and Click on the Import button.", "Files Imported window is displayed", Null
        GUI_Dialog_Encompass_OK "were imported"
        Wait g_TinyWaitLarge         ' Due To Sync Issue We Are Explicitly Passing Wait Statement
        SelectLoanByColumnValueAndLoanNumber "Borrower Name",FRM_DS_GetValue(objData,"BorrowerName")
        'If loan locked message shows up Unlock the loan
		If (GUI_Object_IsExistX(Swfwindow("swfname:=MainForm").Swfwindow("swfname:=UnlockLoanDialog"), 40)) then 
			GUI_SwfButton_Click Swfwindow("swfname:=MainForm").Swfwindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock")
		End if
		GUI_Dialog_Encompass_YesX 5,"This loan has Autosave data.*"
        GUI_Object_WaitTillExistX objPipelineGrid,30
    Else    
        FRM_Logger_ReportFailEvent "Verify 'Progress and Status Indicator' dialog box exist or Not","'Progress and Status Indicator' dialog box doesn't exist", Null 
    End If
Else
   FRM_Logger_ReportFailEvent "Verify 'Andy America.fnm' folder existence","'Andy America.fnm' folder doesn't exist", Null 
End If

'Opens the Editable Loan
GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,0,2,True,True,False,"Double"
If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Static("text:=You only have read.*"), 75))Then
	GUI_Dialog_Encompass_NoX 5,"You only have read.*"
	GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,1,2,True,True,False,"Double"
	If (GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Static("text:=You only have read.*"), 75))Then
		GUI_Dialog_Encompass_NoX 5,"You only have read.*"
		GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,2,2,True,True,False,"Double"
	End If
End If

BIZ_BorrowerSummaryOrigination_SetHeadInfo  "E2E_CONVCASHOUTREFFIX"

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) 
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_CONVCASHOUTREFFIX")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_CONVCASHOUTREFFIX", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"


BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CONVCASHOUTREFFIX"
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_CONVCASHOUTREFFIX"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_CONVCASHOUTREFFIX"
BIZ_BorrowerSummaryOrigination_SetCreditScores "E2E_CONVCASHOUTREFFIX"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails  "E2E_CONVCASHOUTREFFIX"


Set objData            = Nothing
Set objDataPipeLine    = Nothing
Set objWindow          = Nothing
Set objImportFannie    = Nothing
Set objImportFannieDlg = Nothing
Set objPipelineGrid    = Nothing
