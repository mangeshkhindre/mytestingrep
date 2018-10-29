''Option Explicit
Dim myFile,myHTMLFile,strCurrentDirectory,fileNameMHT,objFS,objShell,objFolder,colFiles,objRE,bMatch,objFSOMHT

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1 = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath = objEnvProjectBasePath1("ProjectBasePath")

strCurrentDirectory=Local_ProjectBasePath + "Test Report"
Set objFS = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")
''strCurrentDirectory = objShell.CurrentDirectory
''MsgBox strCurrentDirectory

Set objFolder = objFS.GetFolder(strCurrentDirectory)
Set colFiles = objFolder.Files

Set objRE = New RegExp
objRE.Global = True
objRE.IgnoreCase = False
''objRE.Pattern = "(\d{8})-(\d{6})"
'Test_Summary_Report_01312017_031541
'Test_Summary_Report_02012017_210352
'objRE.Pattern = "Test_Summary_Report_"&"(\d{8})-(\d{6})"&".mht"
''"^[\w-\.]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,3}$"
'"welcome.user@tutorialspoint.co.us"'
''"(Test_Summary_Report)+(_\d{2,})(_\d{2,})(.mht)"
objRE.Pattern = "(Test_Summary_Report)+(_\d{2,})(_\d{2,})(.mht)"
'objRE.Pattern = ".*.mhtml"
For Each objFile In colFiles
bMatch = objRE.Test(objFile.Name)
''MsgBox objFile.Name
''If InStr(1, objFile.Name, ".mht") > 0 Then
If InStr(1,objFile.Name,".mht",1)>0 Then

If bMatch Then
''WScript.Echo objFile.Name
fileNameMHT=objFile.Name
'MsgBox fileNameMHT
Exit for
End If
End If
Next


myFile=strCurrentDirectory&"\"&fileNameMHT
''MsgBox myFile
myHTMLFile = Replace(myFile, ".mht", ".html")

''MsgBox myHTMLFile
' This subroutine opens a Word document,
' then saves it as HTML, and closes Word.
' If the HTML file exists, it is overwritten.
' If Word was already active, the subroutine
' will leave the other document(s) alone and
' close only its "own" document.
'
' Written by Rob van der Woude
' http://www.robvanderwoude.com
    ' Standard housekeeping
    Dim objDoc, objFile, objFSO, objWord, strFile, strHTML

    Const wdFormatDocument                    =  0
    Const wdFormatDocument97                  =  0
    Const wdFormatDocumentDefault             = 16
    Const wdFormatDOSText                     =  4
    Const wdFormatDOSTextLineBreaks           =  5
    Const wdFormatEncodedText                 =  7
    Const wdFormatFilteredHTML                = 10
    Const wdFormatFlatXML                     = 19
    Const wdFormatFlatXMLMacroEnabled         = 20
    Const wdFormatFlatXMLTemplate             = 21
    Const wdFormatFlatXMLTemplateMacroEnabled = 22
    Const wdFormatHTML                        =  8
    Const wdFormatPDF                         = 17
    Const wdFormatRTF                         =  6
    Const wdFormatTemplate                    =  1
    Const wdFormatTemplate97                  =  1
    Const wdFormatText                        =  2
    Const wdFormatTextLineBreaks              =  3
    Const wdFormatUnicodeText                 =  7
    Const wdFormatWebArchive                  =  9
    Const wdFormatXML                         = 11
    Const wdFormatXMLDocument                 = 12
    Const wdFormatXMLDocumentMacroEnabled     = 13
    Const wdFormatXMLTemplate                 = 14
    Const wdFormatXMLTemplateMacroEnabled     = 15
    Const wdFormatXPS                         = 18
    Const wdFormatOfficeDocumentTemplate      = 23
    Const wdFormatMediaWiki                   = 24

    ' Create a File System object
    Set objFSO = CreateObject( "Scripting.FileSystemObject" )

    ' Create a Word object
    Set objWord = CreateObject( "Word.Application" )

    With objWord
        ' True: make Word visible; False: invisible
        .Visible = True

        ' Check if the Word document exists
        If objFSO.FileExists( myFile ) Then
            Set objFile = objFSO.GetFile( myFile )
            strFile = objFile.Path
        Else
            WScript.Echo "FILE OPEN ERROR: The file does not exist" & vbCrLf
            ' Close Word
            .Quit
            'Exit Sub
        End If
        ' Build the fully qualified HTML file name
        strHTML = objFSO.BuildPath( objFile.ParentFolder, _
                  objFSO.GetBaseName( objFile ) & ".html" )

        ' Open the Word document
        .Documents.Open strFile

        ' Make the opened file the active document
        Set objDoc = .ActiveDocument

        ' Save as HTML
        objDoc.SaveAs strHTML, wdFormatFilteredHTML

        ' Close the active document
        objDoc.Close

        ' Close Word
        .Quit
    End With

	Set objFSOMHT = CreateObject("Scripting.FileSystemObject")
objFSOMHT.CopyFile myHTMLFile, strCurrentDirectory&"\"&"Index.html"
Set objFSOMHT = Nothing
