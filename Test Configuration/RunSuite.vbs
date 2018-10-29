    '************************************************************************************************************
    ' Script: RunSuite
    ' PREREQUISITES:  
    ' 1. Manually create 2 directories:  
    ' 	a. A folder "Suite" needs to be created under "Test Case" directory. 
    '   b. A folder  "ReRunSuite" under the "Suite" folder.
    ' 2. Create Excel files with tests to run and place them inside "Suite" directory, each file should contain no more than 30 tests. 
    '    The files can have any meaningful names.
    ' 3. The QTP must not be run before start script.
	' SCRIPT DESCRIPTION:
    ' 1. Before running any tests the script copies all previous reports "Test_Summary_Report_xxx.xlsx" files to the new archive 
    '    directory with <name>+<timestamp>.
    ' 2. It deletes existing report files and folders from "Test Report" directory.
    ' 3. It deletes existing re-run files from "ReRunSuite" directory.    
    ' 4. The script works with test files in directory "Suite" one by one. It copies .xlsx file into directory "Test Case", 
    '    changes the name to "TestCase.xlsx" and calls the "Start UpLoadAndRun.vbs" script, which starts test execution.     
    ' 5. Upon completion of all the tests in each .xlsx  file the script will create a new file <"Test Report - <test suite name_">+<time 
    '    of execution> with test results in "Test Report" directory.
    ' 6. Once all test files in "Suite" directory have been used the script waits for the test process to finish.
    ' 7. It loops through the report files to get all failed test cases.
    ' 8. Creates a new set of test files with no more than 30 test cases in each .xlsx file in "ReRunSuite" directory and names them
    '    "FailedTestCases_ToRun_x.xlsx".
    ' 9. One by one it copies a file from "ReRunSuite" directory to "Test Case" and calls the "Start UpLoadAndRun.vbs" script. 
    ' 10.Upon completion of all the tests in each .xlsx  file the script will create a new file <"Test Report - <test suite name_">+<time 
    '    of execution> with test results in "Test Report" directory.
    ' 11.Insert statistics into "Test_Stats_Summary_Report.xlsx" do not including "FailedTestCases_ToRun_x.xlsx".
    '
    ' Author:
  	' 	Andrei Arefiev                			         
  	' Date:
  	'   08/26/2015        
    '************************************************************************************************************ 
        Dim objShell,strCurrentDir,fso,folder,files,strTestDir,ReportPath,strSuiteNm,strQTPVer
        '****Create the shell object****        
        Set objShell = CreateObject("WScript.shell")
        '****Direction to the current project****                
        strCurrentDir = Split(objShell.CurrentDirectory, "Test Configuration")(0)
        '****Create the filesystem object****
        Set fso = CreateObject("Scripting.FileSystemObject")
        '****Direction to "Suite" folder****        
        Set folder = fso.GetFolder(strCurrentDir & "Test Case\Suite")
        Set files = folder.Files
        '****Direction to "Test Case" folder****
        strTestDir = strCurrentDir & "Test Case"
        '****Direction to "Test Report" folder****
        strReportFolder = strCurrentDir & "Test Report\"
        '****Direction to "ReRunSuite" folder****
        strReRunSuiteDir = strCurrentDir & "Test Case\Suite\ReRunSuite\"
        '****Names and patterns for a files****
        strReportFolderArch = strCurrentDir & "ArchiveReport_"& SetTimeStamp & "\"
        strFNPattXlsx = "Test_Summary_Report_.*\.xlsx"
        strFNPattMht = "Test_Summary_Report_.*\.mht"
        strFNPattHtml = "Test Report -.*\.html"
        strFNPattTxt = ".*\.txt"
        strDirPattern = "[0-9,_,-]"
        strNewFile = strReRunSuiteDir & "FailedTestCases_ToRun" 
		strTestStatTemplate = strReportFolder + "TestStatsReportTemplate.xlsx"
		strTestStatFile = strReportFolder + "Test_Stats_Summary_Report.xlsx"
        '****Get QTP version on a computer****
        strQTPVer = CheckQTPVersion
 	'######################### Copy existing report ".xlsx",".txt" and ".html" files to the new archive directory #########################       
        CopyFiles strReportFolder,strReportFolderArch,strFNPattXlsx
        CopyFiles strReportFolder,strReportFolderArch,strFNPattTxt
        CopyFiles strReportFolder,strReportFolderArch,strFNPattHtml
    '######################### Delete existing report files and folders from "Test Report" dir ##################
    	DeleteReportFiles strReportFolder,strFNPattXlsx
    	DeleteReportFiles strReportFolder,strFNPattMht
    	DeleteReportFiles strReportFolder,strFNPattHtml
    	DeleteReportFiles strReportFolder,strFNPattTxt    	
		DeleteFolder strReportFolder,strDirPattern 
        '****Delete files from "ReRunSuite" directory****
		DeleteReportFiles strReRunSuiteDir, "FailedTestCases_ToRun_.*\.xlsx" 
    'Wscript.Quit
    '######################### Copies a file from "Suite" directory to "Test Case". Runs "Start UpLoadAndRun.vbs" script ###########
        For Each file In files
           '****Make sure "UFT.exe" or "QTPro.exe" process is running****
            Do While IsProcessRunning (strQTPVer) = -1
                WScript.Sleep 1000
            Loop
           '****Make sure "UFT.exe" or "QTPro.exe" process is not running****
            If IsProcessRunning (strQTPVer) = 0 Then
                '****Delete existing "TestCase.xlsx" file****
                DeleteFile strCurrentDir & "Test Case\TestCase.xlsx"
                '****Renames "Test Report - PShort.html" file****
            	RenameFile strCurrentDir,"Test Report","Test Report - PShort.html","Test Report - "_
            		 & strSuiteNm & "_" & SetTimeStamp
                '****Copies a file from "Suite" directory to "Test Case" dir****
                Set objFS = CreateObject("Scripting.FileSystemObject")
                objFS.CopyFile strCurrentDir & "Test Case\Suite\" & file.Name, strTestDir & "\" & file.Name, True
                '****Renames a file to "TestCase.xlsx"**** 
                RenameTestCaseFile strCurrentDir
                '****Runs "Start UpLoadAndRun.vbs" script**** 
                RunVBScript strCurrentDir                
            End If
                '****Get suite file name**** 
                strSuiteNm = Split(file.Name, ".")(0) 
        Next
        '****Make sure "UFT.exe" or "QTPro.exe" process is running****
       	Do While IsProcessRunning (strQTPVer) = -1
            WScript.Sleep 1000
       	Loop
        '****Renames last "Test Report - PShort.html" file****
       	RenameFile strCurrentDir,"Test Report","Test Report - PShort.html","Test Report - "_
       		 & strSuiteNm & "_" & SetTimeStamp
       		 
    '######################### Loop through the report files to get all failed test cases ##################
    '****Create an array to hold the names of failed test cases****
	Dim arrTestCasesNms(),newArr()
	'****Array to hold the names of analysed test summary reports****   
	Dim arrReportFilesNms()
	Dim numTFiles,reportFiles,numTotal,numTFail,numTWarn,numTPass
	intInd = 0
	numRpts = 0
	numFailedTCases = 0
	numTFail = numTWarn = numTPass = 0
	numTotal = 0

	Set objFolder = fso.GetFolder(strReportFolder)
	Set reportFiles = objFolder.Files

	'****Loop through the report files to get all failed test cases****
	For Each objFile In reportFiles
		If FindNmMatch(objFile.Name,strFNPattXlsx) Then 
			'WScript.Echo "Reading report " & objFile.Name		
			ReadSummaryReport objFile.Name
			'****Remember file name in arrReportFilesNms array****
			ReDim Preserve arrReportFilesNms(numRpts)
			arrReportFilesNms(numRpts) = objFile.Name
			'****Save number of processed reports for diagnostic purposes**** 
			numRpts = numRpts + 1
		End If
	Next
	numTotal = numTFail + numTWarn + numTPass 
	'WScript.Echo "Total number of performed test cases: "& numTotal

	'****Verify how many failed test cases is in array and divide into multiple, if > 30****
	VerifyArray fNamesArr
	'****Create new test files with no more than 30 test cases**** 
	If numTFiles <> 0 Then 
	    CreateTestFiles newArr,strNewFile
	End If 
	
	Set objFolder = Nothing 
	Set reportFiles = Nothing 
	
	'****Insert statistics into Test_Stats_Summary_Report.xlsx****
	InsertTestStat strTestStatFile
	
   '######################### Copies a file from "ReRunSuite" directory to "Test Case". Runs "Start UpLoadAndRun.vbs" script ###########	
   '****Direction to "ReRunSuite" folder****        
   Set ReRunFolder = fso.GetFolder(strCurrentDir & "Test Case\Suite\ReRunSuite")
   Set ReRunFiles = ReRunFolder.Files
        For Each ReRunFile In ReRunFiles
           '****Make sure "UFT.exe" or "QTPro.exe" process is running****
            Do While IsProcessRunning (strQTPVer) = -1
                WScript.Sleep 1000
            Loop
           '****Make sure "UFT.exe" or "QTPro.exe" process is not running****
            If IsProcessRunning (strQTPVer) = 0 Then
                '****Delete existing "TestCase.xlsx" file****
                DeleteFile strCurrentDir & "Test Case\TestCase.xlsx"
                '****Renames "Test Report - PShort.html" file****
            	RenameFile strCurrentDir,"Test Report","Test Report - PShort.html","Test Report - "_
            		 & strReSuiteNm & "_" & SetTimeStamp
               '****Copies a file from "Suite" directory to "Test Case" dir****
                fso.CopyFile strReRunSuiteDir & ReRunFile.Name,_  
                	 strTestDir & "\" & ReRunFile.Name, True
                '****Renames a file to "TestCase.xlsx"**** 
                RenameTestCaseFile strCurrentDir
                ''****Runs "Start UpLoadAndRun.vbs" script**** 
                RunVBScript strCurrentDir                
            End If
                '****Get ReRun suite file name**** 
                strReSuiteNm = Split(ReRunFile.Name, ".")(0)
        Next
        '****Make sure "UFT.exe" or "QTPro.exe" process is running****
       	Do While IsProcessRunning (strQTPVer) = -1
            WScript.Sleep 1000
       	Loop
        '****Renames last "Test Report - PShort.html" file****
       	RenameFile strCurrentDir,"Test Report","Test Report - PShort.html","Test Report - "_
       		 & strReSuiteNm & "_" & SetTimeStamp     		 
       WScript.Echo "Script is finished"


'=================================Start sub and functions for the script=====================================================

    '************************************************************************************************************
    ' Sub: RenameFile
    ' Description: Renames a file in "Test Case" directory. 
    ' Parameter: strCurrentDir - direction of a project. Test Report - PShort.html
    '************************************************************************************************************ 
    Sub RenameFile(strCurrentDir,strFolderNm,strOldFileNm,strNewFileNm)
    	Dim fso,fol,sName
        '****Create the filesystem object****
        Set fso = WScript.CreateObject("Scripting.FileSystemObject")
        '****Get current folder****
        Set fol = fso.GetFolder(strCurrentDir & strFolderNm)

        '****Go thru each files in the folder****
        For Each fil In fol.Files
            '****Checks name of a file****
            If fso.FileExists(strCurrentDir & strFolderNm & "\" & strOldFileNm) And fil.Name = strOldFileNm Then
                '****Replace name of the file
                sName = Replace(fil.Name, Split(fil.Name, ".")(0), strNewFileNm)
                '****Rename the file****
                fil.Name = sName
            End If
        Next
        'WScript.Echo "rename Completed!"
        Set fso = Nothing
     End Sub
     
    '************************************************************************************************************
    ' Function: SetTimeStamp
    ' Description: Creates the timestamp using the current time
    '************************************************************************************************************
    Function SetTimeStamp()
    	SetTimeStamp = DatePart("m", Now) & DatePart("d", Now) & Right(DatePart("yyyy",Now),2) &"-"& DatePart("h", Now) &_
     	DatePart("n", Now) & DatePart("s", Now)		 
    End Function

    '************************************************************************************************************
    ' Sub: RenameTestCaseFile
    ' Description: Renames a file in "Test Case" directory. 
    ' Parameter: strCurrentDir - direction of a project. 
    '************************************************************************************************************ 
    Sub RenameTestCaseFile(strCurrentDir)
    	Dim fso,fol,sName
        '****Create the filesystem object****
        Set fso = WScript.CreateObject("Scripting.FileSystemObject")
        '****Get current folder****
        Set fol = fso.GetFolder(strCurrentDir & "Test Case")

        '****Go thru each files in the folder****
        For Each fil In fol.Files
            '****Checks name of a file****
            If Not Split(fil.Name, ".")(0) = "TestCase" And Split(fil.Name, ".")(1) = "xlsx" Then 
                '****Replace name of the file
                sName = Replace(fil.Name, Split(fil.Name, ".")(0), "TestCase")
                '****Rename the file****
                fil.Name = sName
            End If
        Next
        'WScript.Echo "rename Completed!"
        Set fso = Nothing
    End Sub

    '************************************************************************************************************
    ' Sub: RunVBScript
    ' Description: Runs "Start UpLoadAndRun.vbs" script.
    ' Parameter: strCurrentDir - direction of a project. 
    '************************************************************************************************************ 
    Sub RunVBScript(strCurrentDir)
    	Dim WshShell,service
        Set WshShell = CreateObject("WScript.Shell")
        Set service = GetObject("winmgmts:")
        WshShell.Run chr(34) & strCurrentDir & "\Test Configuration\Start UpLoadAndRun.vbs" & Chr(34), 0
        WScript.Sleep 10000
        Set WshShell = Nothing 
    End Sub

    '************************************************************************************************************
    ' Sub: DeleteFile
    ' Description: Deletes a file.
    ' Parameter: strFileDir - path to the file. 
    '************************************************************************************************************ 
    Sub DeleteFile(strFileDir)
    	Dim fso
        Set fso = CreateObject("Scripting.FileSystemObject")
        If fso.FileExists(strFileDir) Then
            fso.DeleteFile strFileDir
            'wscript.echo "file deleted"
        End If
        Set fso = Nothing
    End Sub

    '************************************************************************************************************
    ' Function: IsProcessRunning "UFT.exe"
    ' Description: Checks if a process is running.If it is running returns True otherwise returns False.
    '************************************************************************************************************ 
    Function IsProcessRunning(strProcNm)
    	Dim WshShell,service,bIsRunning,i
        Set WshShell = CreateObject("WScript.Shell")
        Set service = GetObject("winmgmts:")
        i = 0
        DO UNTIL i = 3
        bIsRunning = False
        i = i + 1
        For Each Process In Service.InstancesOf("Win32_Process")
            If Process.Name = strProcNm Then
            	'****Confirm that the process is actually running****            
                bIsRunning = True
            End If
        Next
        WScript.Sleep 500
        LOOP
        IsProcessRunning = bIsRunning
        'wscript.echo IsProcessRunning
        Set WshShell = Nothing 
    End Function

    '************************************************************************************************************
    ' Sub: KillProc
    ' Description: Kills a process and waits until it is truly dead.
    ' Parameter: myProcess - the name of a process. 
    '************************************************************************************************************ 
    Sub KillProc(myProcess)
        Dim blnRunning, colProcesses, objProcess
        blnRunning = False
        
        Set colProcesses = GetObject(_
        	"winmgmts:{impersonationLevel=impersonate}")._
        	ExecQuery("Select * From Win32_Process", , 48)
        For Each objProcess In colProcesses
            '****Confirm that the process was actually running****
            blnRunning = True
            If LCase(myProcess) = LCase(objProcess.Name) Then
            	'****Get exact case for the actual process name****                        	
                myProcess = objProcess.Name
                '****Kill all instances of the process****            
                objProcess.Terminate()
            End If
        Next
        
        If blnRunning Then
           '****Wait and make sure the process is terminated****
            Do Until Not blnRunning
                Set colProcesses = GetObject(_
                	"winmgmts:{impersonationLevel=impersonate}")_
                	.ExecQuery("Select * From Win32_Process Where Name = '"_
                	& myProcess & "'")
                '****Wait for 100 MilliSeconds****            
                WScript.Sleep 100
                '****If no more processes are running, exit loop****                
                If colProcesses.Count = 0 Then 
                    blnRunning = False
                End If
            Loop
        	'****Display a message****
               'WScript.Echo myProcess & " was terminated"
           Else
               'WScript.Echo "Process """ & myProcess & """ not found"
    	End If
    End Sub

'**************************************************************************************
' Sub CopyFiles
' Description: Copy Test_Summary_Reports to a new folder outside of Reports dir
' Parameters: fpath1 - source path. 
' 			  fpath1 - destination path. 
' 			  repFNPattern - pattern for a file name. 
'**************************************************************************************
Sub CopyFiles(fpath1, fpath2, repFNPattern)
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	'****If a Folder do not exists,create a Folder to move the files to****
	If Not objFSO.FolderExists(fpath2)Then
		Set objFolderTo = objFSO.CreateFolder(fpath2)
	Else
		Set objFolderTo = objFSO.GetFolder(fpath2)
	End If
	Set objFolderFrom = objFSO.GetFolder(fpath1)
	'WScript.Echo "Copying old report files from " & objFolderFrom.Path & " to " & objFolderTo.Path
	Set reportFiles = objFolderFrom.Files
	'****Start looping through the files****
	For Each objFile In reportFiles
		If FindNmMatch(objFile.Name,repFNPattern) Then 
			objFSO.CopyFile fpath1 & objFile.Name, fpath2 
		End If
	Next
	Set objFSO = Nothing
End Sub

'**************************************************************************************
' Function FindNmMatch
' Description: Function returns True if match is found, otherwise returns False
' Parameters: str - a file name.
' 			  pattern - pattern of a name.  
'**************************************************************************************
Function FindNmMatch(str,pattern)
	Dim regEx, Match, Matches
	Set regEx = New RegExp
	regEx.Pattern = pattern
	regEx.IgnoreCase = True
	regEx.Global = True
	Set Matches = regEx.Execute(str)
	For Each Match In Matches
		'WScript.Echo "Found " & Match.Value
		FindNmMatch = "True"
		Exit Function
	Next
	FindNmMatch = "False"
End Function

'**************************************************************************************
' Sub: DeleteReportFiles
' Description: Delete all files that have a given pattern in their names
' Parameters: dirpath - a path to a file.
' 			  pattern - pattern for a file name.  
'**************************************************************************************
Sub DeleteReportFiles(dirpath, pattern)
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFolder = objFSO.GetFolder(dirpath)
	Set rptFiles = objFolder.Files
	'****Start looping through the files****
	For Each objFile In rptFiles
	'WScript.Echo FindNmMatch(objFile.Name,pattern)
		If FindNmMatch(objFile.Name,pattern)  Then
			objFSO.DeleteFile dirpath & objFile.Name 
		End If
	Next
	Set objFSO = Nothing 
End Sub

'**************************************************************************************
' Sub: DeleteFolder
' Description: Delete all folders under given dir with specified <pattern>.
' Parameters: dirpath - a path to direction.
' 			  pattern - pattern for a folder name.  
'**************************************************************************************
Sub DeleteFolder(dirpath, pattern)
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFolder = objFSO.GetFolder(dirpath)
	'****Start looping through the files****
	for Each subfolder In objFolder.SubFolders
		If FindNmMatch(subfolder.Name,pattern)  Then
			objFSO.DeleteFolder dirpath & subfolder.Name
		End If
	Next
	Set objFSO = Nothing 
End Sub

'**************************************************************************************
' Sub: ReadSummaryReport
' Description: Read "Test_Summary_Reports_xxx" files one by one 
'	and save the names of Failed test cases into array "fNamesArr".
' Parameter: fileNm - a file name.
'**************************************************************************************
Sub ReadSummaryReport(fileNm)	
	Set objExcel = CreateObject("Excel.Application")
	Set objWorkbook = objExcel.Workbooks.Open _
	(strReportFolder & fileNm)
	objExcel.DisplayAlerts=False
	'****Loop until you find a "Test Name" in first column, start from the first row**** 
	intRow = 1  
	Do Until objExcel.Cells(intRow,1).Value = "Test Name"
		intRow = intRow + 1
	Loop
	'****Loop until test name column is empty****
	Do While objExcel.Cells(intRow,1).Value <> ""
		If objExcel.Cells(intRow, 2).Value = "Failed" Then 
			numTFail = numTFail + 1
			ReDim Preserve arrTestCasesNms(intInd + 1) 
			arrTestCasesNms(intInd) = objExcel.Cells(intRow, 1).Value
			intInd = intInd + 1
		End If
		If objExcel.Cells(intRow, 2).Value = "Passed" Then
			numTPass = numTPass + 1
		End If 
		If objExcel.Cells(intRow, 2).Value = "Warning" Then
			numTWarn = numTWarn + 1
		End If 
		intRow = intRow + 1
	Loop
	
	objWorkbook.Close False
	objExcel.Quit
	Set objExcel = Nothing
	Set objWorkbook = Nothing
End Sub 

'**************************************************************************************
' Sub: VerifyArray
' Description: Verify how many failed test cases is in array,and create 2-dimentional array, if > 30. 
' Parameter: arrname - an array name.
'**************************************************************************************
Sub VerifyArray(arrname)
	numFiles = 0
	'WScript.Echo "Number of processed reports: " & numRpts
	'WScript.Echo "Number of failed test cases: " & numTFail
	'WScript.Echo "Number of passed test cases: " & numTPass
	'WScript.Echo "Number of warnings: " & numTWarn
	
	If numTFail = 0 Then 
		numTFiles = 0
		Exit Sub
	End If 
	'****Do integer division by 30 to find # of files to create****
	inum = UBound(arrTestCasesNms)\30  
	If UBound(arrTestCasesNms) Mod 30 > 0 Then
		numTFiles = inum + 1     
	Else 
		numTFiles = inum 
	End If
	'WScript.Echo "Need to create " & numTFiles  & " files"	
	'****Create 2-dimentional array with 30 test cases in each row****			
	ReDim  newArr(numTFiles,30) 
	'****Filling 2 Dimenional array****
	m = 0
	For i = 0 To UBound(newArr,1) '****Ubound of first dimension****
		For j = 0 To UBound(newArr,2) - 1 '****Ubound of Second dimension****
			If m > UBound(arrTestCasesNms) Then 
				Exit For
			End If 
			newArr(i,j) = arrTestCasesNms(m)
			m = m + 1
		Next
	Next
	'****Print array elements for debugging only****
	For i = 0 To UBound(newArr,1) '***Ubound of first dimension***
		For j = 0 To UBound(newArr,2) '***Ubound of Second dimension***
			If Len(newArr(i,j)) > 0 Then
				'WScript.Echo i &":"& j & " - " &newArr(i,j)
			End If 
		Next
	Next		
End Sub

'**************************************************************************************
' Sub: CreateTestFiles
' Description: Create a new xls file and write test cases to be executed.
' Parameters: arr - a test cases name.
' 			  fname - a file name.  
'**************************************************************************************
Sub CreateTestFiles(arr,fname)
	For i  = 0 To numTFiles - 1
		Set objExceln = CreateObject("Excel.Application")
		objExceln.Visible = False
		Set objWorkbookNew = objExceln.Workbooks.Add
		Set objWorksheet = objWorkbookNew.Worksheets(1)
		objWorksheet.Name = "TestCase"
		objWorkbookNew.Application.DisplayAlerts = False
		objExceln.Cells(1, 1).Value = "Test Name"
		objExceln.Cells(1, 2).Value = "Run"
		objExceln.Cells(1, 3).Value = "Operation"
		objExceln.Cells(1, 4).Value = "Desc"
		myrow = 2
		For j = 0 To UBound(newArr,2)-1
			If Len(newArr(i,j))> 0 Then 
				objExceln.Cells(myrow, 1).Value = newArr(i,j)
				objExceln.Cells(myrow, 2).Value = "Y"
			End If 
			myrow = myrow + 1
		Next
		objWorkbookNew.SaveAs(strNewFile & "_" & i + 1 & ".xlsx")
'		WScript.Echo "New test file " & strNewFile&"_"&i+1&".xlsx created = " & objWorkbookNew.SaveAs(strNewFile & "_" & i+1 & ".xlsx")
		objExceln.ActiveWorkbook.Close()
		objExceln.Quit
		Set objExceln = Nothing 
		Set objWorkbookNew = Nothing
		Set objWorksheet = Nothing
	Next
End Sub

'**************************************************************************************
' Function: CheckQTPVersion
' Description: Returns version name of QTP (UFT.exe or QTPro.exe). 
'**************************************************************************************
Function CheckQTPVersion
	Dim sFileName,oShell,objFSO
	sFileName = "UFT.exe"
	Set oShell = WScript.CreateObject("WScript.Shell")
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	'****This will find the file that will be actually run from command line when typed without qualified path****
	Set oExec = oShell.Exec("cmd /c for %G in (""" & sFileName & """) do @echo.%~$PATH:G")
	Do
		line = oExec.StdOut.ReadLine()
		If Not objFSO.FileExists(line)<> 0 Then
			sFileName = "QTPro.exe"
		End If
	Loop While Not oExec.Stdout.AtEndOfStream
	CheckQTPVersion = sFileName	
	Set oShell = Nothing
	Set objFSO = Nothing
End Function

'**************************************************************************************
' Sub: InsertTestStat
' Description: If "Test_Stats_Summary_Report.xlsx" doesn't exist, create a new xlsx file with statistics info, 
'  			   if exists only add a new row.
' Parameter: fname - name of the file.
'**************************************************************************************
Sub InsertTestStat(fname)
	Set filesys = CreateObject("Scripting.FileSystemObject") 
	Set objExcel = CreateObject("Excel.Application")
	objExcel.Visible = False
	r = 11
	If filesys.FileExists(fname) = "False" Then
		'WScript.Echo "can't find a stat file "
		InitialExcelReport strTestStatTemplate,strTestStatFile
	End If 
	Set objWb = objExcel.Workbooks.Open(fname)
	Set objWorksheet = objWb.Worksheets(1)
	'****Find last row****
	Do Until Len(objWorksheet.Cells(r, 1).Value) = 0
		r = r + 1
	Loop
	'WScript.Echo "writing stats to " & objWb.Name & ", row: " & r
	'****Write values and save the file**** 
	objWorksheet.Cells(r, 1).Value = Now
	Dim strNames
	For Each name In arrReportFilesNms
		'****Save all names of processed Status Reports to one string and write it to column 2****
		strNames = strNames & name & ", " 
	Next
	objWorksheet.Cells(r, 2).Value = strNames
	objWorksheet.Cells(r, 3).Value = numTotal
	objWorksheet.Cells(r, 4).Value = numTPass
	objWorksheet.Cells(r, 5).Value = numTFail
	objWorksheet.Cells(r, 6).Value = numTWarn
	objWorksheet.Application.DisplayAlerts = False
	objWb.SaveAs(fname)
	'WScript.Echo "Test Statistics file " & fname &" saved = " & objWb.SaveAs(fname)
	
	objExcel.ActiveWorkbook.Close()
	objExcel.Quit
	Set objExcel = Nothing 
	Set objWb = Nothing
	Set filesys = Nothing 
End Sub

'************************************************************************************************************
' Function: InitialExcelReport
' Description: Initial report in excel format
' Parameters: template - file template
'             report - name of the report
'************************************************************************************************************
Function InitialExcelReport(template,report)
	Dim fso
	'****Copy the report template****
	Set fso = CreateObject("Scripting.FileSystemObject")
	fso.CopyFile template,report
	fso.GetFile(report).Attributes = 0
	Set fso = Nothing	
End Function 
