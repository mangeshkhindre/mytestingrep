'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-2993 FHAPURCHASEFIX - File Started 1-Import TPO loan file in Encompass 
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData: 
   '01 Global_Data, Login, E2E_markuslo
   '02 Loans, LoanTemplate, E2E_LoanOfficer
   '03 Loans, LoanTemplate, E2E_FHAPURCASHFIX
   '04 Forms_BorrowerSummaryOrigination, SetHeadInfo, E2E_FHAPURCASHFIX
   '05 Forms_BorrowerSummaryOrigination, SetBorrower, E2E_FHAPURCASHFIX
   '06 Forms_BorrowerSummaryOrigination, SetProperty, E2E_FHAPURCASHFIX
   '07 Forms_BorrowerSummaryOrigination, SetCreditScores, E2E_FHAPURCASHFIX
   '08 Forms_BorrowerSummaryOrigination, SetTransactionDetails, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Login to Encompass.
	'2 Click pipeline tab. 
	'3 Click New Loan icon.
	'4 Select conventional 5/1 AR
 	'5 Click New blank loan button.
'@ ExpectedResult: 
	'1 Encompass should open and Home page should be visible. 
	'2 Should be able to open a new loan.
	'3 New loan pop up should open.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2993","FHAPURCHASEFIX - File Started 1-Import TPO loan file in Encompass", Null

Dim objData, objDataPipeLine, strFileName, strFNMaFolder, strEncompassFolder
Dim strItemList, strItemListContent, objWindow, objImportFannie, objImportFannieDlg, FolderName, objPipelineGrid, strFolderNames, intFolderName

Set objData         = FRM_DS_GetTestData("LoanFile", "ImportNExport", "E2E_FHAPURCASHFIX")
Set objDataPipeLine = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanOfficer")
strFileName         = FRM_DS_GetValue(objData, "FileName")
strFNMaFolder       = FRM_RT_DataDirPath()
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
BIZ_Login_UserLogin "E2E_markuslo"  'QA Environment

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

strItemList        = objImportFannie.SwfList("swfname:=fileListBox").GetROProperty("all items")
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
		If (GUI_Object_IsExistX(Swfwindow("swfname:=MainForm").Swfwindow("swfname:=UnlockLoanDialog"), 40)) Then 
			GUI_SwfButton_Click Swfwindow("swfname:=MainForm").Swfwindow("swfname:=UnlockLoanDialog").SwfButton("swfname:=btnUnlock")
		End if
		GUI_Dialog_Encompass_YesX 5,"This loan has Autosave data.*"
        GUI_Object_WaitTillExistX objPipelineGrid,30
     Else    
        FRM_Logger_ReportFailEvent "Verify 'Progress and Status Indicator' dialog box exist or Not","'Progress and Status Indicator' dialog box doesn't exist", Null 
     End If
Else
   FRM_Logger_ReportFailEvent "Verify "&strFileName&" file existence",strFileName & " file doesn't exist in the list", Null 
   ExitTest
End If

RowID = 1
GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,0,2,True,True,False,"Double"

'Loops until the editable loan is opened
While (SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes").Exist(5)) 
	   SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&No").Click
	   GUI_List_ClickOnCell SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),Null,RowID,2, True,True,False,"Double"
	   RowID = RowID + 1
Wend 

'Enter details in Borrower Summary Origination screen
BIZ_BorrowerSummaryOrigination_SetHeadInfo  "E2E_FHAPURCASHFIX"

'Appended the current timestamp to the Borrower Last Name 
CurrentTimeStamp = Second(Now) & Minute(Now) & Hour(Now) & Day(Now) & Month(Now)
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHAPURCASHFIX")
FRM_DS_ChangeExcelReadonlyToReadandWrite "Forms_BorrowerSummaryOrigination"
strBorrowerLastName =  FRM_DS_GetValue(objData, "LastName")
strLastNames = Split(strBorrowerLastName, "E2E")
FRM_DS_SetCellData "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHAPURCASHFIX", "LastName", strLastNames(0) & "E2E" & CurrentTimeStamp
FRM_DS_ChangeExcelReadandWriteToReadonly  "Forms_BorrowerSummaryOrigination"

BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURCASHFIX"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHAPURCASHFIX"
BIZ_BorrowerSummaryOrigination_SetCreditScores "E2E_FHAPURCASHFIX"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails  "E2E_FHAPURCASHFIX"
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_FHAPURCASHFIX"

Set objData            = Nothing
Set objDataPipeLine    = Nothing
Set objWindow          = Nothing
Set objImportFannie    = Nothing
Set objImportFannieDlg = Nothing
Set objPipelineGrid    = Nothing





