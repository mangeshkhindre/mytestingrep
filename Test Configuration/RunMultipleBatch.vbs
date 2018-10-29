'************************************************************************************************************
' SCRIPT DESCRIPTION:

'1. Stop processes and Merge Library files
'2. Define Directories and Files variables
'3. Move existing reports and batch test cases files to the archive
'4. Delete old files from working directories
'5. Read TestCase.xls and create BatchTestCase spreadsheets files for the test cases marked "Y"
'6. Create blank merged reports from template 
'7. Execute test for each test case in each spreadsheet in Suite directory and merge result to the merged report
'8. Read merged report and retreive failed test cases names
'9. Create Failed Test cases spreadshits in the ReRunSuite directory
'10 Execute failed tests 
'11 Merge results to the merged report
'    
'************************************************************************************************************ 




CloseProcesses "UFT.exe"
CloseProcesses "QTPro.exe"
CloseProcesses "Encompass.exe"
CloseProcesses "excel.exe"
    
'Merge library
RunProgram FunctionLibraryPath + "Merge3Library.bat"
IncludeLibrary FunctionLibraryPath + "Util.qfl"	
IncludeLibrary FunctionLibraryPath + "Framework.qfl"	
IncludeLibrary FunctionLibraryPath + "Business.qfl"	

'Set Variables  
strReportFolder = FRM_Batch_ReportDirPath

strTimeStamp = UTIL_Date_FormatDateByPattern(now, "yymmdd")
strArchiveReportFolder = strReportFolder & "ArchiveReport_"& strTimeStamp & "\"
strSuteFolder = FRM_Batch_TestCaseDirPath & "Suite\"
strReRunSuiteFolder  = FRM_Batch_TestCaseDirPath & "Suite\ReRunSuite\"

strTestReportXlsxPattern = "Test_Summary_Report_.*\.xlsx"
strTestReportMhtPattern = "^Test_Summary_Report_.*\.mht"
strTxtPattern = ".*\.txt"
strTestReportHTMLPattern = "^TestReport_.*\.html"
strBatchLogPattern = "Batch_.*\.html" 
strGenReportPattern = ".*_\d\d\d\d\d\d\d\d-\d\d\d\d\d\d\.html"


'Set variables for Merged Report Template and Merged Report Name
strMergedTemplateReportFile = "TestReportTemplate_MultipleBatch.xlsx"
strMergedReportFile = FRM_Batch_ReportDirPath & "Merged_Test_Summary_Report_" & UTIL_Date_FormatDateByPattern(Now, "yyyymmdd-HHnnss") & ".xlsx"

'Reading the test cases sheet as argument
Set args = WScript.Arguments
If args.Count > 0 Then
	strTestCaseFileName = args(0)
Else 
	strTestCaseFileName = "TestCase.xlsx"
End If

'Copy existing report ".xlsx",".txt" and ".html" files to the new archive directory      
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strTestReportXlsxPattern
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strTestReportMhtPattern
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strTxtPattern
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strTestReportHTMLPattern 
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strBatchLogPattern 
UTIL_File_CopyFiles strReportFolder, strArchiveReportFolder, strGenReportPattern 

'Copy existing Sute and ReRunSute files to archive dir
UTIL_File_CopyFiles strSuteFolder, strArchiveReportFolder, "^BatchTestCase_.*\.xlsx"
UTIL_File_CopyFiles strReRunSuiteFolder, strArchiveReportFolder, "FailedTestCases_ToRun_.*\.xlsx" 

'Delete existing report files and folders from "Test Report" dir
UTIL_File_DeleteFiles strReportFolder, strTestReportXlsxPattern
UTIL_File_DeleteFiles strReportFolder, strTestReportMhtPattern
UTIL_File_DeleteFiles strReportFolder, strTxtPattern
UTIL_File_DeleteFiles strReportFolder, strTestReportHTMLPattern
UTIL_File_DeleteFolders strReportFolder, "^[0-9,_,-]"
UTIL_File_DeleteFiles strReportFolder, strBatchLogPattern
UTIL_File_DeleteFiles strReportFolder, strGenReportPattern

'Delete existing "^BatchTestCase_.xlsx" files from "Sute" dir
UTIL_File_DeleteFiles strSuteFolder, "^BatchTestCase_.*\.xlsx"

'Delete files from "ReRunSuite" directory
UTIL_File_DeleteFiles strReRunSuiteFolder, "FailedTestCases_ToRun_.*\.xlsx" 

       

'Create BatchTestCase spreadsheets 
FRM_Batch_CreateBatchTestCaseFiles(strTestCaseFileName) ' Updated passing sheet as argument

'msgbox "Done"
'WScript.Quit 

'Create blank merged reports from template
UTIL_File_Copy FRM_Batch_ReportDirPath & strMergedTemplateReportFile, strMergedReportFile, False

Set objFSO = CreateObject("Scripting.FileSystemObject")
'****Direction to "Suite" folder****        
Set objFolder = objFSO.GetFolder(strSuteFolder)
Set objFiles = objFolder.Files

For Each objFile In objFiles
    'If file name has BatchTestCase_ in it 
    If UTIL_String_IsMatch(objFile.Name, "^BatchTestCase_.*\.xlsx") Then 
       
        strSuiteName = Split(objFile.Name, ".")(0)
        strFilePath = objFile.Path
        CloseQTPIfProcessing
   
        If Not FRM_QTP_IsProcessRunning() and NOT UTIL_String_IsEmpty(trim(strSuiteName)) Then
            
            'Call "RunBatch.vbs" script
            UTIL_Win_Run "WScript " & Chr(34) & FRM_Batch_TestConfigurationDirPath & "RunBatch.vbs" & Chr(34) & " " & " Suite\" & strSuiteName&".xlsx"
            WScript.Sleep 30000
 
   
            'Merge last Test_Summary_Report results to merged test report 
            FRM_Batch_TestSummaryReport_MergeLatestReport strMergedReportFile, strSuiteName
                         
            'Renames "Test Report - PShort.html" file
            UTIL_File_Rename FRM_Batch_ReportDirPath, "Test Report - PShort.html", "Test Report - " & strSuiteName & "_" & UTIL_Date_FormatDateByPattern(now, "mmddyyyy-HHnnss")
 
      
        End If
    End If    
Next
'Wait if "UFT.exe" or "QTPro.exe" process is running'
CloseQTPIfProcessing
Set objFolder = Nothing
Set objFSO = Nothing        
Set objFiles = Nothing


'####################### Re-execute Failed test cases ##########################################

'Create spreadsheets with tests needed to be re-executed (read merged report after first run)
 WScript.Sleep 30000
 FRM_Batch_CreateReRunBatchTestCaseFiles strTestCaseFileName,strMergedReportFile

Set objFSO = CreateObject("Scripting.FileSystemObject")
'****Direction to "Suite" folder****        
Set objFolder = objFSO.GetFolder(FRM_Batch_TestCaseDirPath & "Suite\ReRunSuite\" )
Set objFiles = objFolder.Files

For Each objFile In objFiles
    'If file name has FailedTestCases_ToRun_ in it 
    If UTIL_String_IsMatch(objFile.Name, "^FailedTestCases_ToRun_.*\.xlsx") Then 
       
        strSuiteName = Split(objFile.Name, ".")(0)
        strFilePath = objFile.Path
       
        CloseQTPIfProcessing
   
        If Not FRM_QTP_IsProcessRunning() and NOT UTIL_String_IsEmpty(trim(strSuiteName)) Then

            'Call "RunBatch.vbs" script

            UTIL_Win_Run "WScript " & Chr(34) & FRM_Batch_TestConfigurationDirPath & "RunBatch.vbs" & Chr(34) & " Suite\ReRunSuite\" & strSuiteName&".xlsx"
            WScript.Sleep 30000  
        
            'Merge last Test_Summary_Report results to merged test report 
            FRM_Batch_TestSummaryReport_MergeLatestReport strMergedReportFile, strSuiteName
           
            'Renames "Test Report - PShort.html" file
            UTIL_File_Rename FRM_Batch_ReportDirPath, "Test Report - PShort.html", "Test Report - " & strSuiteName & "_" & UTIL_Date_FormatDateByPattern(now, "mmddyyyy-HHnnss")
 
      
        End If
    End If    
Next
'Wait if "UFT.exe" or "QTPro.exe" process is running and stop after some time'
CloseQTPIfProcessing

Set objFolder = Nothing
Set objFSO = Nothing        
Set objFiles = Nothing

'####################### End Re-Execution ########################################################
WScript.Echo "Script is finished processing"
CloseProcesses "wscript.exe"

'Renames last "Test Report - PShort.html" file'
'UTIL_File_Rename FRM_Batch_TestReportPath, "Test Report - PShort.html", "Test Report - "& strSuiteName & "_" & UTIL_Date_FormatDateByPattern(now, "mmddyyyy-HHnnss")






'*******************************************Local Functions*********************************************************************


Function CloseProcesses(strProcessName)
	
  Const strComputer = "." 
  Dim objWMIService, colProcessList
  Set objWMIService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")
  Set colProcessList = objWMIService.ExecQuery("SELECT * FROM Win32_Process WHERE Name = " & "'" & strProcessName & "'")
  For Each objProcess in colProcessList 
    objProcess.Terminate() 
  Next 	
  Set objWMIService = Nothing 
  Set colProcessList = Nothing
End Function


'@description Return the current project base path
'@return the current project base path

Function ProjectBasePath()

	strCurrentPath = left(wscript.scriptfullname, instrrev(wscript.scriptfullname, "\") - 1)
	strBasePath = Left(strCurrentPath, InStrRev(strCurrentPath, "\"))
	ProjectBasePath = strBasePath
	
End Function


Function FunctionLibraryPath()

	FunctionLibraryPath = ProjectBasePath + "Function Library\"
	
End Function

'@description Reference functions in another VBS file

Function IncludeLibrary(strFileName)

	Dim objFileContent	
	Set objFileContent = CreateObject("Scripting.FileSystemObject").OpenTextFile(strFileName,1,False) 
	ExecuteGlobal objFileContent.ReadAll
	Set objFileContent = Nothing
	
End Function
	
	
Function RunProgram(strProgPath)
	Set oShell = CreateObject ("Wscript.shell")
	RunProgram = oShell.run(chr(34)&strProgPath&chr(34), 3, true)
	Set oShell = Nothing
	
End Function 

Function CloseQTPIfProcessing()
        p = 0
        Do While FRM_QTP_IsProcessRunning() 
           WScript.Sleep 5000
	   p = p + 1
	   if p > 3  Then
		CloseProcesses "UFT.exe"
	   	CloseProcesses "QTPro.exe"
        CloseProcesses "Encompass.exe"
	   End If
        Loop
End Function





