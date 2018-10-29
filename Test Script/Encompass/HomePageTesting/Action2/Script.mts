'This Action tests the existence of splash screen, welcome message and the links on splash screen
'It also tests if the correct server is hit for different ips in host file

strHostFilePath = "c:\\windows\\System32\\drivers\\etc\\"
strHostFile = "hosts"
strIP = Parameter("strIP")
strEncompass = "encompass.elliemae.com"
strServerExpected = Parameter("strServerExpected")
strUrl = "http://encompass.elliemae.com/homepage/atest.asp"

'Open the hosts file in  write mode and write the IP address entry in it
Set objFSO = CreateObject("Scripting.FileSystemObject")
set objTextStream = objFSO.OpenTextFile(strHostFilePath & strHostFile, 2)
objTextStream.WriteLine strIP & "  " & strEncompass
objTextStream.Close

Set objFSO = Nothing
Set objTextStream = Nothing

'validate if the correct server is hit
GUI_Browser_CloseAll
GUI_Browser_OpenUrl strUrl
Set objPage = Browser("title:=" & strUrl).Page("url:=" & strUrl)
GUI_Object_WaitTillExist objPage
strServerActual = Mid(GUI_Object_GetPropertyValue(objPage.WebElement("innertext:=.*ENC.*"),"innertext"), 1, 12)
FRM_VerifyEqual strServerExpected, strServerActual, "Validate server name", "Validate server name"
GUI_Browser_CloseAllBrowsers("IE")

BIZ_Login_UserLogin("admin_core2p")

'Check for existence of splash screen and welcome message on it
boolHomePage = True
If Not GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Welcome to Encompass by Ellie Mae","index:=0"),5) Then
	BIZ_Nav_OpenMenuItem("Home;View Welcome Message")
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Welcome to Encompass by Ellie Mae","index:=0")) Then
		boolHomePage = False
	End IF
End If

If boolHomePage Then
	FRM_Logger_ReportPassEvent "Validate Welcome page", "Welcome message exists: Welcome to Encompass by Ellie Mae", Null
	If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").Image("file name:=btn_X18_learnMore.jpg","index:=0"), 10) Then
		'validate the Learn More link
		GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("file name:=btn_X18_learnMore.jpg","index:=0")
		GUI_Object_ValidateExists Browser("title:=Ellie Mae Experience 2018 Conference.*"), 20, "Validate Eliiemae experience page comes up"
		GUI_Browser_CloseAllBrowsers("IE")
	End If
	'Close Splashscreen
	GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("image type:=Image Link", "html tag:=IMG", "alt:=", "index:=45")
Else
	FRM_Logger_ReportFailEvent "Validate Welcome page", "Welcome message does not exist: Welcome to Encompass by Ellie Mae", Null
End If




