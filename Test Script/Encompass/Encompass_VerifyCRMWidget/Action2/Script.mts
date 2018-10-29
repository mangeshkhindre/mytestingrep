'@**************************************************************************************************
'@ TestStory: PTAC-2999 Encompass_CRM
'@ TestCase: PTAC-2801 Verify CRM Widget in Encompass
'@ Test Automation JIRA Task: PTAC-3002 Encompass_VerifyCRMWidget
'@ TestData: N/A
'@ Pre-conditions: 
'@ Description: Verify CRM Widget in Encompass
'@ TestSteps:
   '1 As Admin or any Persona User , Login to Encompass > Homepage.
   '2 Verify CRM Widget for the attributes.
   '3 Click Manage Encompass CRM.
   '4 Click Learn More link or Encompass CRM Logo.
   '5 Verify Description of the Widget.
'@ ExpectedResult:
   '1 CRM Widget should be displayed in the right bottom of the Homepage.
   '2 CRM widget should have the below attributes
      'Encompass CRM logo
      'Manage Encompass CRM link
      'Description of the Widget
      'Not a customer yet?
      'Learn more link that points to CRM marketing page
   '3  This should open up Encompass CRM login page. (https://mrweb2.mortgagereturns.com/Prod4/Login.aspx) now changed to (as on 08/01/2017): https://mrweb2.mortgagereturns.com/Prod4/Login.aspx?ssoToken=
   '4 This should open up the CRM marketing page(http://elliemae.com/encompass/sales-marketing/encompass-crm)
   '5 "Create or update your contacts and send marketing campaigns and emails" should be displayed. 
'@**************************************************************************************************

'====== Declared Objects ======
Dim objMainView, objData, objMortgagepage, strManageEncompassLink, strEncompassDescription,  arrEncompassDescription1
Dim arrEncompassDescription, strEncompassLink,arrEncompasssLink, intLoop, intstrURL, intstrURL1

'changed objMainView for 18.1
'Set objMainView     = SwfWindow("swfname:=MainForm").ActiveX("progid:=GNETMX.GNetMXCtrl.1").Page("title:=.*")
Set objMainView     = SwfWindow("swfname:=MainForm").Page("title:=.*")
'Set objMortgagepage = SwfWindow("swfname:=MainForm").ActiveX("progid:=GNETMX.GNetMXCtrl.1")
'Modified: at present application is opening new Browser window
'Set objMortgagepage = Browser("title:=Mortgage Returns - Login")
Set objMortgagepage = Browser("title:=Mortgage Returns - Login.*")

'====== Welcome popup message is closed ======
'If GUI_Object_WaitTillExistX(objMainView.WebTable("class:=Welcome","name:=close").Image("Class Name:=Image","file name:=close\.png"),100) Then
If GUI_Object_WaitTillExistX(objMainView.WebTable("class:=Welcome","name:=close").Image("Class Name:=Image","file name:=close.png"),60) Then
	'objMainView.WebTable("class:=Welcome","name:=close").Image("Class Name:=Image","file name:=close\.png").Click 
	objMainView.WebTable("class:=Welcome","name:=close").Image("Class Name:=Image","file name:=close.png").Click 
End if

'====== Validate whether 'Encompass CRM' Widget is displayed on the home page ====== 
GUI_Object_WaitTillExistX objMainView.WebElement("title:=Encompass CRM - Link to Encompass CRM."),60
strEncompassWidget = GUI_Object_GetPropertyValue(objMainView.WebElement("title:=Encompass CRM - Link to Encompass CRM."),"innertext")
FRM_VerifyEqual Datatable.value("EncompassWidget"),strEncompassWidget , "Validate Encompass CRM Widget", "Encompass CRM Widget is displayed"

'====== Validate whether 'Encompass CRM' image is displayed on the home page ======
GUI_Object_ValidateExists  objMainView.Image("index:=13"),30,"Encompass CRM logo is displayed"

'====== Validate whether 'Manage Encompass CRM' Link is displayed on home page ======
GUI_Object_WaitTillExistX objMainView.WebElement("innertext:=Manage Encompass CRM","html tag:=B"),60
strManageEncompassLink = GUI_Object_GetPropertyValue(objMainView.WebElement("innertext:=Manage Encompass CRM","html tag:=B"), "innertext")
FRM_VerifyEqual Datatable.Value("EncompassLink"),strManageEncompassLink , "Validate Manage Encompass CRM Link", "Manage Encompass CRM link is displayed"

GUI_Object_WaitTillExistX objMainView.WebElement("innertext:=Manage Encompass CRM.*Create or update.*","index:=2"),60
strEncompassDescription = GUI_Object_GetPropertyValue(objMainView.WebElement("innertext:=Manage Encompass CRM.*Create or update.*","index:=2"), "innertext")
arrEncompassDescription = Split(strEncompassDescription,"CRM")
FRM_VerifyEqual Datatable.Value("EncompassContent1"),Trim(Split(arrEncompassDescription(1),"Not")(0)) , "Create or Update text", _
"'Create or update your contacts and send marketing campaigns and emails' is displayed"

GUI_Object_WaitTillExistX objMainView.WebElement("innertext:=Not.*","html tag:=B"),60
strEncompassLink = GUI_Object_GetPropertyValue(objMainView.WebElement("innertext:=Not.*","html tag:=B"), "outertext")
arrEncompasssLink = Split(strEncompassLink,"?")

'====== Validate whether 'Not a Customer yet?' text is displayed on home page ======
For intLoop = 0 To Ubound(arrEncompasssLink)-1 Step 1
	if FRM_VerifyEqual (Datatable.Value("EncompassContent2"),arrEncompasssLink(intLoop) , "Validate Not a Customer yet", "Not a Customer yet? is displayed") Then
		Exit for
	End if 
Next

'====== Validate whether 'Learn More' is displayed on home page ======
GUI_Object_WaitTillExistX objMainView.WebElement("innertext:=Learn more","html tag:=B","index:=1"),60
strLearnMore = GUI_Object_GetPropertyValue(objMainView.WebElement("innertext:=Learn more","html tag:=B","index:=1"),"outertext")
FRM_VerifyEqual Datatable.Value("EncompassLink1"),strLearnMore , "Validate Learn More", "Learn More link is displayed"

'====== Clicks on Manage Encompass CRM Link ======
'====== Validate Mortgage Returns Login page is displayed or not ======
GUI_WebElement_Click objMainView.WebElement("innertext:=Manage Encompass CRM","html tag:=B")

GUI_Object_WaitTillExistX objMortgagepage.Page("title:=Mortgage Returns - Login"),60
Wait g_ShortWaitMedium				' Explicit wait used to handle sync issues
strCRMURL = GUI_Object_GetPropertyValue(objMortgagepage.Page("title:=Mortgage Returns - Login"),"url")
FRM_VerifyEqual Datatable.Value("EncompassManageLink"),strCRMURL , "Mortgage Login Page", "Mortgage Login page is displayed ("&strCRMURL&")"

'====== it navigates back to home page ======
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnHome")
GUI_Object_WaitTillExistX objMainView.WebElement("innertext:=Learn more","html tag:=B","index:=1"),60
Wait g_ShortWaitMedium				' Explicit wait used to handle sync issues
'GUI_Browser_CloseAll @Savik: Putting this at the end of the script

'====== Clicks on Learn More Link ======
GUI_Link_Click objMainView.link("innertext:=Learn more","index:=1")
If Browser("Name:=Encompass CRM.*").Exist(60) Then
	strLearnURL = GUI_Object_GetPropertyValue(Browser("Name:=Encompass CRM.*"),"openurl")
Else
	strLearnURL = GUI_Object_GetPropertyValue(objMortgagepage.Page("title:=Encompass CRM.*","name:="),"url")
End If

FRM_VerifyEqual Datatable.Value("EncompasslearnLink"),strLearnURL , "Learn More Page", "Learn More page is displayed ("&strLearnURL&")"

GUI_Browser_CloseAll


Set objMainView     = Nothing
Set objMortgagepage = Nothing


