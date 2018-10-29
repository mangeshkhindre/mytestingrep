Dim objConsolidateFile    'As MSXML2.DOMDocument30
Dim doc2    'As MSXML2.DOMDocument30
Dim doc2Node    'As MSXML2.IXMLDOMNode
Dim incrStatus2
incrStatus2=0


Dim sFlagsEnvironMentURL
sFlagsEnvironMentURL="No"

Dim sFlagsFindOutChild
sFlagsFindOutChild="No"

Dim sChildCount
sChildCount=0

dim outputArray
dim outputArray1
dim outputArray2
dim inputText
dim environMentMessage
dim outputArray3
dim outputArray4
Dim outputArray5
Dim mainActionInputText
Dim outputArray6
dim outputArray7
dim outputArray8
dim outputArray9

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1 = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath = objEnvProjectBasePath1("ProjectBasePath")


xmlPathDel=Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults"
suiteFiles=Local_ProjectBasePath + "Suite_BatFiles"
summaryReportPath=Local_ProjectBasePath + "Suite_BatFiles\SummaryReport"

	Set objFSO = CreateObject("Scripting.FileSystemObject") 
    If objFSO.FolderExists(xmlPathDel) Then 
    	Set objFolder = objfso.GetFolder(xmlPathDel)  
    	ProcessFolderAttributeChange objFolder,0
 	End If  
	Set objFSO = NOTHING
	Set objFolder = NOTHING
	
Function ProcessFolderAttributeChange(objFolder,intAttr)

 	For Each aFile In objFolder.Files
 		aFile.Attributes = intAttr
 	Next
    For Each SubFolder In objFolder.SubFolders
 		SubFolder.Attributes = intAttr
 		ProcessFolderAttributeChange SubFolder,intAttr
 	Next
End Function
	
sEmailBodyMsgHeading="AutomationStatus"

Dim fso11
Set fso11 = CreateObject("Scripting.FileSystemObject")
If fso11.FileExists(suiteFiles&"\onlyStatus.txt") Then
fso11.DeleteFile suiteFiles&"\onlyStatus.txt", True
End If

''FileCount = 3

strAutomationPath = xmlPathDel&"\"
strConsolidateXMLFile = "ConsolidatedReport.xml"
Set objConsolidateFile = CreateObject("MSXML2.DOMDocument.3.0")

Set fso = CreateObject("Scripting.FileSystemObject")

objConsolidateFile.Load strAutomationPath & strConsolidateXMLFile

Set objFSO = CreateObject("Scripting.FileSystemObject")

Set objFolder = objFSO.GetFolder(strAutomationPath)

Set colFiles = objFolder.Files

Set fileSystemObject = CreateObject("Scripting.FileSystemObject")
If fileSystemObject.FileExists(strAutomationPath & strConsolidateXMLFile) Then
    fileSystemObject.DeleteFile strAutomationPath & strConsolidateXMLFile
End if
Set xmlDoc = CreateObject("Microsoft.XMLDOM")  

               
Set oIntro = xmlDoc.createProcessingInstruction("xml-stylesheet", "type=""text/xsl"" href=""../ConsolidatedReport.xsl""")  
xmlDoc.insertBefore oIntro,xmlDoc.childNodes(0)


Set objRoot = xmlDoc.createElement("ReportViewer")  
xmlDoc.appendChild objRoot  
               
'Creating Nodes under Environment Details
Set objRecord = xmlDoc.createElement("EnvironmentDetails") 
objRoot.appendChild objRecord 
               
Set objProject = xmlDoc.createElement("Project")  
objRecord.appendChild objProject  
               
Set objUser = xmlDoc.createElement("User")  
objRecord.appendChild objUser  
               
Set objEnvironment = xmlDoc.createElement("Environment")  
objRecord.appendChild objEnvironment  

Set objStatus = xmlDoc.createElement("Status")  
objRecord.appendChild objStatus  

Set objDateTime = xmlDoc.createElement("DateTimeStamp")  
objRecord.appendChild objDateTime 

Set objDuration = xmlDoc.createElement("Duration")  'Added by Sharad Mali
objRecord.appendChild objDuration  
             
'Creating Nodes under Test Summary Report
Set objTestSummaryReportRecord = xmlDoc.createElement("TestSummaryReport") 
objRoot.appendChild objTestSummaryReportRecord 
               
Set objTotalTestCasesExeucted = xmlDoc.createElement("TotalTestCasesExeucted")  
objTestSummaryReportRecord.appendChild objTotalTestCasesExeucted  
               
Set objTotalTestCasesPassed = xmlDoc.createElement("TotalTestCasesPassed")  
objTestSummaryReportRecord.appendChild objTotalTestCasesPassed  
               
Set objTotalTestCasesFailed = xmlDoc.createElement("TotalTestCasesFailed")  
objTestSummaryReportRecord.appendChild objTotalTestCasesFailed 
                              
Set objConsolidateFile = CreateObject("MSXML2.DOMDocument.3.0")
objConsolidateFile.Load strAutomationPath & strConsolidateXMLFile
               
If fileSystemObject.FileExists(strAutomationPath & strConsolidateXMLFile) Then
               blnFileExist = True
End If 
intCnt = 0
intTotalTestCasesFalied = 0
intTotalTestCasesExecuted = 0
Dim MainStatus
Redim MainStatus(colFiles.Count-1)

For Each objFile In colFiles

               If Not(InStr(objFile.path, "ConsolidatedReport.xml") > 0) Then 
                              If IntCnt = 0 Then
                                             'Adding TestCaseName Tag
                                             Set objTestCaseRecord = xmlDoc.createElement("TestCaseName") 
                                             objTestCaseRecord.Text = Replace(objFile.Name,".xml","")
                                             objRoot.appendChild objTestCaseRecord 
                                             
                                             Set objIntro = xmlDoc.createProcessingInstruction("xml","version='1.0'")  
                                             xmlDoc.insertBefore objIntro,xmlDoc.childNodes(0)  
                                             xmlDoc.Save strAutomationPath & strConsolidateXMLFile
                                             
                                             Set objConsolidateFile = CreateObject("MSXML2.DOMDocument.3.0")
                                             objConsolidateFile.Load strAutomationPath & strConsolidateXMLFile
                                             intTotalTestCasesExecuted = intTotalTestCasesExecuted + 1
                              Else
                                             Set objConsolidateFile = CreateObject("MSXML2.DOMDocument.3.0")
                                             objConsolidateFile.Load strAutomationPath & strConsolidateXMLFile
                                                            
                                             'Adding TestCaseName Tag
                                             Set objTestCaseRecord = objConsolidateFile.createElement("TestCaseName") 
                                             objTestCaseRecord.Text = Replace(objFile.Name,".xml","")
                                             Set objRoot = objConsolidateFile.selectSingleNode(".//ReportViewer")
                                             objRoot.appendChild objTestCaseRecord 
                                                            
                                             objConsolidateFile.Save strAutomationPath & strConsolidateXMLFile
                                             intTotalTestCasesExecuted = intTotalTestCasesExecuted + 1
                              End If
                                             
                              Set objTestResultXMLFile = CreateObject("MSXML2.DOMDocument.3.0")
                              objTestResultXMLFile.load objFile.path
                              blnTestStepFail = False
                              blnTestCaseFail = False
                              intStepFailCnt = 0
                              For intTestStepTagCnt = 0  To objTestResultXMLFile.getElementsByTagName("TestStep").Length - 1 
                                                            
                                             Set objTestStepinResFile = objTestResultXMLFile.getElementsByTagName("TestStep")
                                             Set objConsolidateFileData =  objConsolidateFile.documentElement                                                            
                                             Set objTestCaseNameTag = objConsolidateFileData.getElementsByTagName("TestCaseName")
                                                            
                                             If objConsolidateFileData.GetElementsByTagName("TestCaseName")(intCnt).FirstChild.Data = Replace(objFile.Name,".xml","") Then
                                                            
                                                            Set strNode = objConsolidateFileData.GetElementsByTagName("TestCaseName")(intCnt)
                                                            Set objTestStepsInResultFile = objTestResultXMLFile.getElementsByTagName("TestStep")
                                                                           
                                                            ''Adding Test Step Tag under Test Case 
                                                            Set objTestCaseTag = objConsolidateFile.createElement(objTestStepinResFile(intTestStepTagCnt).NodeName)
                                                            objTestCaseTag.text = objTestStepsInResultFile(intTestStepTagCnt).baseName
                                                            strNode.appendChild objTestCaseTag
                                                                           
                                                            ''Adding Nodes Under Test Steps
                                                            Set ChildNodesUnderTestStep = objTestStepsInResultFile(intTestStepTagCnt).ChildNodes
                                                            For intChildNodesUnderTestStep = 0 To ChildNodesUnderTestStep.Length -1
                                                                           Set objChildNodes = objConsolidateFile.createElement(objTestStepsInResultFile(intTestStepTagCnt).ChildNodes(intChildNodesUnderTestStep).NodeName)
                                                                                          objChildNodes.text = objTestStepsInResultFile(intTestStepTagCnt).ChildNodes(intChildNodesUnderTestStep).nodeTypedValue
                                                                                          
                                                                                            
                                                                                         
                                                                                          If ( ( UCase(Trim(objChildNodes.text)) = UCase(Trim("Fail")) ) OR ( UCase(Trim(objChildNodes.text)) = UCase(Trim("Fatal")) ) ) Then
                                                                                                         blnTestStepFail = True
                                                                                                         intStepFailCnt = intStepFailCnt + 1
                                                                                          End If
																						  
																						  
																						  
																						  If sFlagsFindOutChild="No" And intChildNodesUnderTestStep=0 Then
																						    sChildCount=sChildCount+1
																							 If (InStr( UCase(Trim(objChildNodes.text)),UCase(Trim("Login to Encompass SmartClient")) ) > 0) Then
																							  sFlagsFindOutChild="Yes"
																							  End If
																							
																						End If
																						  
																						  
                                                                                            'If (InStr( UCase(Trim(objChildNodes.text)),UCase(Trim("Login to Encompass SmartClient")) ) > 0) And intChildNodesUnderTestStep=1 And sFlagsEnvironMentURL="No" Then
																							If sFlagsFindOutChild="Yes" And sFlagsEnvironMentURL="No" And intChildNodesUnderTestStep=1 And intTestStepTagCnt=sChildCount-1 Then
                                                                                                                                                                                        
                                                                                             ''sEnvironMentURL=objChildNodes.text
                                                                                            'inputText = "Logged in as admin. The server name gets populated by default. Server: http://eq1veabe30031.dco.elmae/encompass$BE11172418"
																								inputText=objChildNodes.text
																							'If InStr( UCase(Trim(inputText)),UCase(Trim("Server: http://")) ) > 0 Then
																							If (InStr( UCase(Trim(inputText)),UCase(Trim("Server: http://")) ) > 0) or (InStr( UCase(Trim(inputText)),UCase(Trim("Server: https://")) ) > 0) Then
																								''Get the "http://eq1veabe30031.dco.elmae/encompass$BE11172418"
																								outputArray = split(inputText,"Server: ")
																								''msgbox outputArray(UBound(outputArray))
																								outputArray5=outputArray(UBound(outputArray))
																								
																								''Get the "Build 17.1.0.0"
																								outputArray3 = Split(outputArray(LBound(outputArray)),"Logged in as admin")
																								'msgbox outputArray3(UBound(outputArray3))
																								outputArray4=Trim(outputArray3(UBound(outputArray3)))
																								outputArray4 = LEFT(outputArray4, (LEN(outputArray4)-1))
																								outputArray4 = Trim(Right(outputArray4, (LEN(outputArray4)-1)))
																									
																								
																								outputArray1 = split(outputArray(UBound(outputArray)),".")
																								''msgbox outputArray1(0)
																								
																								outputArray2 = split(outputArray1(0),"//")
																								''Get the "eq1veabe30048"
																								environMentMessage= outputArray2(UBound(outputArray2))
																								''MsgBox environMentMessage
																								sFlagsEnvironMentURL="Yes"
																							
																							End If
																					     End If
																						  
																						  
																						  
                                                                                          
                                                                                          If intTestStepTagCnt=0 And intChildNodesUnderTestStep=2 Then
                                                                                             
                                                                                             
                                                                                             objChildNodes.text="Info821"
                                                                                          End If
                                                                                            objTestCaseTag.appendChild objChildNodes
                                                                                           
                                                                                       
                                                                           Next
                                                                           Set objChildNodes = Nothing
                                                                           Set ChildNodesUnderTestStep = Nothing
                                                            End If 
                                                            
                                             Next
                                             intCnt = intCnt + 1
                                             objConsolidateFile.save strAutomationPath & "\ConsolidatedReport.xml"
                              End If
                              Set objTestCaseRecord = Nothing
                              Set objConsolidateFile = Nothing
                              Set objRoot = Nothing
                              Set objTestCaseRecord = Nothing
                              Set objTestStepinResFile = Nothing
                              Set objTestResultXMLFile = Nothing
                              Set objTestCaseNameTag = Nothing
                              Set objTestStepsInResultFile = Nothing
                              
                              If blnTestStepFail Then
                                             intTotalTestCasesFalied = intTotalTestCasesFalied + 1
                              End If
                              
                              
                              Dim sTextSt,objFSO11
							   If blnTestStepFail Then
                                            sTextSt="Fail"
                                            Else 
                                            sTextSt="Pass"
                                            End If
                                                    
                                                    Set objFSO11 =CreateObject("Scripting.FileSystemObject")
                                                    
                                                    Dim objTextStream
                                                    Set objTextStream = objFSO11.OpenTextFile(suiteFiles&"\onlyStatus.txt", 8,True)
                                                    'Display the contents of the text file
                                                    objTextStream.WriteLine sTextSt
                                                     MainStatus(incrStatus1)=sTextSt
                                                     incrStatus1=incrStatus1+1
                                                    'Close the file and clean up
                                                    objTextStream.Close
                                                    Set objTextStream = Nothing
                                                    Set objFSO11 = Nothing
												Next

Set objConsolidateFile = CreateObject("MSXML2.DOMDocument.3.0")
objConsolidateFile.Load strAutomationPath & strConsolidateXMLFile
Set objNetwork = CreateObject("Wscript.Network")
Set objTotalExeucted = objConsolidateFile.selectsinglenode ("//ReportViewer/TestSummaryReport/TotalTestCasesExeucted")
Set objTotalPassed = objConsolidateFile.selectsinglenode ("//ReportViewer/TestSummaryReport/TotalTestCasesPassed")
Set objTotalFailed = objConsolidateFile.selectsinglenode ("//ReportViewer/TestSummaryReport/TotalTestCasesFailed")
Set objUser = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/User")
Set objProject = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/Project")
Set objEnvironment = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/Environment")
Set objStatus = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/Status")
Set objDateTimeStamp = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/DateTimeStamp")
Set objDuration = objConsolidateFile.selectsinglenode ("//ReportViewer/EnvironmentDetails/Duration")	'Added by Sharad Mali

For each updateStatus in MainStatus
 
 Set objMainStatus1 = objConsolidateFile.selectsinglenode ("//ReportViewer/TestCaseName["&incrStatus2&"]/TestStep/Result")
 
 pfStatus=updateStatus
 objMainStatus1.text = pfStatus
  incrStatus2=incrStatus2+1
 Next

'Set the node text with the new value
objTotalExeucted.text = CInt(intTotalTestCasesExecuted)
objTotalPassed.text = CInt(intTotalTestCasesExecuted) - CInt(intTotalTestCasesFalied)
objTotalFailed.text = CInt(intTotalTestCasesFalied)
objUser.text = objNetwork.UserName
objProject.text = "EllieMae- Core Encompass Test Automation"




'-------------Start-Sharad Mali-------------------
Dim objApp, objWbs, objWorkbook, objSheet 
Set objApp = CreateObject("Excel.Application")
Set objWbs = objApp.WorkBooks
objApp.Visible = False

Set objShell = CreateObject("WScript.Shell")
Set objEnv = objShell.Environment("System")

Set objWorkbook = objWbs.Open(objEnv("SummaryExcelFilePath"))
Set objSheet = objWorkbook.Sheets("Report")
 
objDuration.text = objSheet.Cells(6, 2).Value
 
objWorkbook.Close False
objWbs.Close 
objApp.Quit 
 
Set objSheet = Nothing
Set objWorkbook = Nothing
Set objWbs = Nothing
Set objApp = Nothing
'-------------End-Sharad Mali-------------------



'objEnvironment.text = objNetwork.ComputerName
objEnvironment.text = environMentMessage

If(CInt(intTotalTestCasesFalied) > 0) Then 
                objStatus.text = "Fail"
Else
                objStatus.text = "Pass"
End If

Set objShellPie = CreateObject ("WScript.Shell")
Dim jarSynt,className,jarPath,pieCharHeader,passCount,failCount,imagePath,htmlPath
     cmdSyntax      ="cmd /c"
	 cdFilePath     = suiteFiles
	 filePath       = Replace(cdFilePath, "\", "\\")
 	 pieCharHeader	=sEmailBodyMsgHeading
	 passCount		=objTotalPassed.text
	 failCount		=objTotalFailed.text
     objShellPie.Run ""&cmdSyntax&" "&cdFilePath&"\EmailPieCharJar.bat"&" "&cdFilePath&" "&filePath&" "&pieCharHeader&" "&passCount&" "&failCount&""
	set objShellPie=nothing  


objDateTimeStamp.text = Now
'Save the xml document with the new settings.
objConsolidateFile.save strAutomationPath & "\ConsolidatedReport.xml"


Set objTotalExeucted = Nothing
Set objTotalPassed = Nothing
Set objTotalFailed = Nothing
Set objConsolidateFile = Nothing
Set objUser = Nothing
Set objProject = Nothing
Set objEnvironment = Nothing
Set objStatus = Nothing
Set objDateTimeStamp = Nothing
Set objMainStatus1 = Nothing
Set objDuration = Nothing	'Added by Sharad Mali