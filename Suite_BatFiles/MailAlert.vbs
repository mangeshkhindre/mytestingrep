set shell=createobject("wscript.shell")
sAutomationPath=shell.Environment("USER").Item("Automation_Path")

Set objShellProjectBasePath1 = CreateObject("WScript.Shell")
Set objEnvProjectBasePath1   = objShellProjectBasePath1.Environment("USER")
Local_ProjectBasePath        = objEnvProjectBasePath1("ProjectBasePath")

Set wshShell = CreateObject( "WScript.Shell" )
Set wshSystemEnv = wshShell.Environment( "USER" )

sComponent=wshSystemEnv("ELL_ENVIRONMENT_01")
sBuild=wshSystemEnv("ELL_BUILD_01")
'Msgbox "sBuild: "  &sBuild

sEnvironment=wshSystemEnv("ELL_COMP_01")
'Msgbox "Env:"&sEnvironment
If Hour(now) >= 12 Then
    ampm="PM"
Else
   ampm="AM"
End If

strDate = Day(Date())& MonthName(month(date()))&Year(Date())&"_" & Hour(now)&"_"&Minute(Now)&ampm
destinationPath=Local_ProjectBasePath + "Suite_BatFiles\BatchXMLResults\Index.zip"

Set FS = CreateObject("Scripting.FileSystemObject")


Set argsEmailList = WScript.Arguments

If argsEmailList.Count > 0 Then
	EmailTo = argsEmailList(0)
	SlaveInfo = argsEmailList(1)
Else	
	Msgbox "Email List is Empty."
End if

EmailSubject =  "<"& sComponent &">" & "<"& sBuild &">" & "<"& sEnvironment &">" & "<" &SlaveInfo & ">"

'Const EmailTo = EmailToList
Const EmailFrom = "qastatus123@gmail.com"
EmailFromName = "EllieMae_Automation_Build"

'Const EmailTo = "Sreedhar.Musini@elliemae.com,Bhanu.Vutukuri@elliemae.com,Santhosh.Mucharla@elliemae.com,Prasad.Challagundla@elliemae.com,Surinder.Singh@elliemae.com,Suresh.Sakamuri@prolifics.com"
'Toni.Zhao@elliemae.com,Keying.Xi@elliemae.com"
'Const EmailTo = "Praveena.reddy@elliemae.com,Bhanu.Vutukuri@elliemae.com,Santhosh.Mucharla@elliemae.com,Prasad.Challagundla@elliemae.com,Surinder.Singh@elliemae.com,Toni.Zhao@elliemae.com,Keying.Xi@elliemae.com,Sreedhar.Musini@elliemae.com,Suresh.Sakamuri@prolifics.com"
'Toni.Zhao@elliemae.com,Keying.Xi@elliemae.com
'Const SMTPSSL = True
'Const SMTPPort = 25/587
Const SMTPServer = "smtp.gmail.com"
Const SMTPLogon = "qastatus123"
Const SMTPPassword = "Pass1234$"
Const SMTPSSL = True
Const SMTPPort = 465


Const cdoSendUsingPickup = 1 	'Send message using local SMTP service pickup directory.
Const cdoSendUsingPort = 2 	'Send the message using SMTP over TCP/IP networking.

Const cdoAnonymous = 0 	' No authentication
Const cdoBasic = 1 	' BASIC clear text authentication
Const cdoNTLM = 2 	' NTLM, Microsoft proprietary authentication

' First, create the message
Set objMessage = CreateObject("CDO.Message")
objMessage.Subject = EmailSubject
objMessage.From = """" & EmailFromName & """ <" & EmailFrom & ">"
objMessage.To = EmailTo


objMessage.AddAttachment destinationPath
Set objFSO = CreateObject("Scripting.FileSystemObject") 
objFSO.DeleteFile(destinationPath)

objMessage.CreateMHTMLBody "file:///" &Local_ProjectBasePath &"Suite_BatFiles/SummaryReport/emailSummaryConsolidatedReport.html"

' Second, configure the server
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpserver") = SMTPServer

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = cdoBasic

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendusername") = SMTPLogon

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendpassword") = SMTPPassword

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = SMTPPort

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = SMTPSSL

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60

objMessage.Configuration.Fields.Update

' Now send the message!

objMessage.Send