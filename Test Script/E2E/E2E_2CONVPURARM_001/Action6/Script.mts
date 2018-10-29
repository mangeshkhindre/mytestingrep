'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: 
'@ TestData: "Services"
'@ Pre-conditions: 
'@ Description:  Get Rate Lock and LO comp plan and Float.
'@ TestSteps:
' 1.Click lock icon in the header section.
' 2.Click' Get pricing' button.
' 3.In this product and pricing window click continue.
' 4.In the  Encompass rate sheet select a rate and click
'   float button at the end of this page.
' 5.click ok in the pricing data imported window.
' 6.In the lock request form click Submit request.
' 7.click exit loan.
' 8.In pipeline select the same loan by double clicking on it.
' 9.Exit Encompass.
'@ ExpectedResult:  
' 1.Lock request form opens.
' 2.Encompass product and pricing service window should open with user login information.
' 3.Encompass rate sheet should open.
' 4.pricing data has been imported- window should open.
' 5.should go back to lock request form.
' 6.window opens which shows 'exit loan' and 'keep loan open' buttons.
' 7.Should go back to pipeline.
' 8.In the header section lcock requested message should be seen next to the lock icon. 
'   Under the file started milestone price table- lock requested with the date should be seen.

'********************************************************************************************
Function BIZ_RateLock_LOCompPlan_Float()
	Set objData = FRM_DS_GetTestData("Services", "ProductNPricingService", "Core2p_Integration")
    Provider  = FRM_DS_GetValue(objData,"Provider")
    UserName  = FRM_DS_GetValue(objData,"UserName")
    Password  = FRM_DS_GetValue(objData,"Password")
    BorrowerCreditScore  = FRM_DS_GetValue(objData,"BorrowerCreditScore")
    CoBorrowerCreditScore  = FRM_DS_GetValue(objData,"CoBorrowerCreditScore")
    BIZ_Services_ProductAndPricing "Encompass Product and Pricing Service","e2elo","Password1"
    Set MainPage = SwfWindow("swfname:=MainForm").Page("index:=0")
    GUI_Object_WaitTillExistX MainPage.WebEdit("name:=Credit","index:=1"), 120
    GUI_WebEdit_Set MainPage.WebEdit("name:=Credit","index:=0"), BorrowerCreditScore
    GUI_WebEdit_Set MainPage.WebEdit("name:=Credit","index:=1"), CoBorrowerCreditScore
    MainPage.WebButton("name:=Next").Click
    MainPage.WebButton("name:=Next").Click
    GUI_Object_WaitTillExistX MainPage.Link("html tag:=A","index:=1","href:=#"), 120
    'Clicks on Rate Link
    MainPage.Link("html tag:=A","index:=1","href:=#").Click
    GUI_Object_WaitTillExistX MainPage.WebButton("name:=Float"), 120
    MainPage.WebButton("name:=Float").Click

    GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Message from webpage").Winbutton("text:=OK")
    SwfWindow("swfname:=DifferencesDialog").SwfButton("name:=button1").Click
    GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), 120  
    BIZ_Tools_Open "Lock Request Form"
  
    MainPage.WebButton("name:=Submit Request").Click
''SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox91"), "750"
End Function

