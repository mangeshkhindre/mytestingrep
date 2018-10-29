'======================================= AOM Automation Process ================================================
' This script is for automation process, only 2 places need to update according to your test situation:
'		* Test Setting & Running - Test configuration, and Which cases to run
'=============================================================================================================

'**************************************** Create text file for log RS infomation *********************************************

Dim objShellDeleteXML


RunProgram FunctionLibraryDirPath + "Merge3Library.bat"

IncludeLibrary FunctionLibraryDirPath + "Util.qfl"	

IncludeLibrary FunctionLibraryDirPath + "Framework.qfl"	

IncludeLibrary FunctionLibraryDirPath + "Business.qfl"

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1 = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath = objEnvProjectBasePath1("ProjectBasePath")

' Set objShellDeleteXML = Wscript.CreateObject("WScript.Shell")
' DeleteXMLPath = Local_ProjectBasePath + "\Suite_BatFiles\DeleteXMLFiles.vbs"
' objShellDeleteXML.Run DeleteXMLPath
' Set objShellDeleteXML = Nothing

FRM_Batch_SetupTest null
'Save the report file path
strBatchReportPath = FRM_RT_GetPropValue(g_FRM_Prop_ReportFile, True)
'******************************************* Test Setting & Running *********************************************
Set args = WScript.Arguments
If args.Count > 0 Then
	strTestCaseFileName = args(0)	
Else 
	strTestCaseFileName = "TestCase.xlsx"
End If

Set objQTPApp = FRM_QTP_Init( FRM_Batch_ProjectBase )
'Add server name to environment value if passed from Jenkins job
If args.Count > 1 Then	
	strServerName = args(1)	
	objQTPApp.Test.Environment.value("ServerName")=strServerName	
End If
'	Add Test Script To QTP

arrTestCasesToRun = FRM_Batch_ArrayOfTestCasesToRun(strTestCaseFileName)
strScript = FRM_Batch_GenerateLoadAndRunScript(arrTestCasesToRun)
If UTIL_String_IsEmpty(strScript) Then
    Msgbox "GenerateLoadAndRunScript - Empty string generated."
    WScript.Quit
End If

''FRM_Logger_ReportInfoEvent "GenerateLoadAndRunScript", strScript, Null
objQTPApp.Test.Actions("Action1").SetScript strScript


' Add any additional local library file 
FRM_QTP_AddLocalLibraries objQTPApp,FRM_Batch_TestScriptDirPath , arrTestCasesToRun

' 	set run settings for the test
objQTPApp.Test.Settings.Run.IterationMode = "oneIteration" 
objQTPApp.Test.Settings.Run.OnError = "NextStep" ' Instruct QuickTest to perform next step when error occurs

'	Set test result path
strReportTime = UTIL_Date_Now_mmddyyyy_HHnnss
Set objQTPOptions = CreateObject("QuickTest.RunResultsOptions") 
objQTPOptions.ResultsLocation = FRM_Batch_ReportDirPath + strReportTime
''FRM_Logger_ReportInfoEvent "QTP Results Location", FRM_Batch_ReportDirPath + strReportTime, Null

'	Qtp run
objQTPApp.Test.Run objQTPOptions, true
strLastRunResultPath = objQTPApp.Test.LastRunResults.Path

'****************************************** Transfor XML Report to HTML Style ************************************
'Restores the report file path so the following messages will be logged properly
FRM_RT_SetPropValue g_FRM_Prop_ReportFile, strBatchReportPath

Dim  strQTPProductPath, sResultXML, sPShortXSL, sPDetailsXSL, sPShortHTML, sPDetailsHTML

'QTP  XML file in< Res*\Report >
sResultXML = strLastRunResultPath + "\Report\Results.xml"

'QTP Report  XSL PDetails/PShort
strQTPProductPath = objQTPApp.Test.Environment.Value("ProductDir")
sPShortXSL = strQTPProductPath+"\dat\PShort.xsl"
sPDetailsXSL = strQTPProductPath+"\dat\PDetails.xsl"

'Generate HTML report path ++ It's also the attachments parameter for mail sending ++
sPShortHTMLFileName = "TestReport_PShort_" & strReportTime & ".html"
sPShortHTML = FRM_Batch_ReportDirPath() + sPShortHTMLFileName

'Call "ApplyXSL" to output HTML format report
''FRM_Logger_ReportInfoEvent "Apply stylesheet to result", "sResultXML=" & sResultXML & ",sPShortXSL=" & sPShortXSL & ",sPShortHTML=" & sPShortHTML, Null

UTIL_Xml_ApplyXSL sResultXML, sPShortXSL, sPShortHTML
''FRM_Logger_ReportInfoEvent "Apply stylesheet to result", "Transfer QTP XML report to HTML style display successfully.", Null

'Copy the generated HTML report to LastRunResultPath
strDestReportFile = strLastRunResultPath + "\" + sPShortHTMLFileName
UTIL_File_Copy sPShortHTML, strDestReportFile, True
''FRM_Logger_ReportInfoEvent "Copy report", "sPShortHTML="&sPShortHTML&" to "&strDestReportFile, Null

objQTPApp.Quit	
Set objQTPOptions = Nothing
Set objQTPApp = Nothing


'****************************************** Save log file ************************************
UTIL_File_Copy FRM_Batch_RecoveryLogFile, strLastRunResultPath + "\log.txt", False
	
'	********************************** Initial and write detail result in Excel ************************************
strSummaryFilePath = FRM_Batch_ReportDirPath & "Test_Summary_Report_" & strReportTime & ".xlsx"	

'	********************************** Added by Sharad Mali ********************************************************
Set objShell = CreateObject("WScript.Shell")
Set objEnv = objShell.Environment("SYSTEM") 
objEnv("SummaryExcelFilePath") = strSummaryFilePath
'	********************************** *****************************************************************************


'	Initial report
FRM_Batch_InitialExcelReport FRM_Batch_ReportDirPath(), strSummaryFilePath

'	Write Detailed Report
FRM_Batch_WriteDetailReport strSummaryFilePath, sResultXML

	''******************* <Ratnesh 8th June 17: Delete temporary file storing batch test cases> **********************
Set oFS = CreateObject("Scripting.FileSystemObject")
strBatchTestCasesFile = CreateObject("Wscript.Shell").SpecialFolders("Desktop") & "\batchTestCases.txt"
If oFS.FileExists(strBatchTestCasesFile) Then
	oFS.DeleteFile strBatchTestCasesFile
End If

'''************************************************************************************************************

																											  

''FRM_Logger_ReportInfoEvent "End of Run Batch Test", "Test End Time: " & Now, Null
If args.Count = 0 Then
  WScript.Echo "Script is finished"
End If
'*******************************************Get current path*********************************************************************

'@description Return the current project base path
'@return the current project base path

Function ProjectBasePath()
	Set objShellProjectBasePath = CreateObject("WScript.Shell")
	Set objEnvProjectBasePath = objShellProjectBasePath.Environment("USER")

	strCurrentPath = left(wscript.scriptfullname, instrrev(wscript.scriptfullname, "\") - 1)
	strBasePath = Left(strCurrentPath, InStrRev(strCurrentPath, "\"))
	objEnvProjectBasePath("ProjectBasePath")=strBasePath
	
	ProjectBasePath = strBasePath
		
End Function


Function FunctionLibraryDirPath()

	FunctionLibraryDirPath = ProjectBasePath + "Function Library\"
	
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

