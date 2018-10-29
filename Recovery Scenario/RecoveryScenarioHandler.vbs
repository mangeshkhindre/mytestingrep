'======================================= Recovery Scenario functions ================================================
  ' Some functions after trigger RS
  ' Available Functions:
  ' 		*   FRM_RS_LogAndExit - Get the detail information, write to txt file and capture screenshots.
  ' 		*   PadNumber - Pads a number with zeroes on the left, based on the expected maximum length of the numbers in the list.
  ' 		*   FRM_RS_RestoreTestEnvironment - Restore Test Environment to locate Pipeline tab.
 '=============================================================================================================

Option Explicit
'*******************************************Custom Recovery Scenario function*********************************************************************
Function FRM_RS_LogAndExit(Object, Method, Arguments, Result)

	Dim objQTPApp, strLogFilePath
		
	'Locate the error information
	Set objQTPApp = GetObject("", "QuickTest.Application")
    If FRM_QTP_EnvVariableExist("BatchTestCasePath") Then 
    	strTestCasePath = Environment.Value("BatchTestCasePath")
    Else
    	strTestCasePath = Environment.Value("TestDir")
    End If
    On Error Resume Next
	strErrorDescription =  "ActionName=" + Environment.Value("ActionName") + ", "
    If Not (Object Is Nothing) Then    
        strErrorDescription = strErrorDescription + "TestObject => [" + Object.GetTOProperty("TestObjName") + "], "
    End If    
    strErrorDescription = strErrorDescription + "ErrorResult => [" + Replace(DescribeResult(Result), Chr(13)& Chr(10), "") + "],"+_
        "ErrorLine => [" & Setting("executionline") + 1 & "], "
    strErrorDescription = strErrorDescription + "Method => [" + CStr(Method) + "],"+_
        "Params => [" + join(Arguments, ",") + "],"  
    strErrorDescription = strErrorDescription + "TestCasePath=" + strTestCasePath + ", "    
    If Err.Number <> 0 Then
        strErrorDescription = strErrorDescription + " Err.Number=" + Err.Number + ", Err.Description=" + Err.Description
        Err.Clear
    End If    
    On Error Goto 0
    strErrorDescription = strErrorDescription + vbCrlf
    
	'Log to txt file    
    strLogFilePath = PathFinder( "Recovery Scenario\" ) + "\" + "log.txt"
    UTIL_File_AppendingText strLogFilePath, cstr(Time) + " " + strErrorDescription
	FRM_Logger_ReportFatalEvent "FRM_RS_LogAndExit", strErrorDescription, Null
	
'	Capture error pic 
	Dim strResPath,datestamp,strScreenshotFileName
	strResPath = Environment("ResultDir")
	strScreenshotFileName = Environment("ActionName")&"_"&UTIL_Date_FormatDateByPattern(Now, "yyyymmdd-HHnnss")&".png"
	strScreenshotFileName = strResPath + "\RS_" + ""&strScreenshotFileName
	Desktop.CaptureBitmap strScreenshotFileName,True
	
'	Restore test environment
	FRM_RS_RestoreTestEnvironment
	
End Function
 
 
Function FRM_RS_MoreThanOneMatch(Object, Method, Arguments, Result)

    Object.SetTOProperty "index", 0
    
End Function 


'*******************************************Restore Test Environment to locate Pipeline tab*********************************************************************
Function FRM_RS_RestoreTestEnvironment()
	
	'Close Encompass by process
	UTIL_Win_CloseProcesses "Encompass.exe"
	UTIL_Win_CloseProcesses "AdminTools.exe"
	'BIZ_Login_UserLogin( FRM_RT_GetPropValue(g_FRM_Prop_LoginDataRowID, True) )
End Function	
 
Function FRM_RS_ClickEncompassDialog(Object)
 
    If SwfWindow("swfname:=MainForm").Dialog("index:=0").Exist(1) Then
    
        Set objDialog = SwfWindow("swfname:=MainForm").Dialog("index:=0")
        If objDialog.Static("index:=0").Exist(1) Then
            strText = objDialog.Static("index:=0").GetROProperty("text")
            strLogFilePath = PathFinder( "Recovery Scenario\" ) + "\" + "log.txt"
        End If          
        If objDialog.WinButton("text:=.*No").Exist(1) Then
            strText = strText + ", Click 'No'"
        Elseif objDialog.WinButton("text:=.*OK").Exist(1) Then    
            strText = strText + ", Click 'OK'"
        End If     
        UTIL_File_AppendingText strLogFilePath, strText 
    End If
 
End Function 
 

Function FunctionLibraryDirPath(strTestCasePath)

    intIdx = InStrRev(strTestCasePath, "Test Script")
    FunctionLibraryDirPath = Left(strTestCasePath, intIdx-1) + "Function Library\"
    
End Function

Function IncludeLibrary(strFileName)

	Dim objFileContent	
	Set objFileContent = CreateObject("Scripting.FileSystemObject").OpenTextFile(strFileName,1,False) 
	ExecuteGlobal objFileContent.ReadAll
	Set objFileContent = Nothing
	
End Function 

 
