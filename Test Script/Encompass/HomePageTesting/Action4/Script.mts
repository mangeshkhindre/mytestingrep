'Validate the navigation links on the home page

'Resource Center
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Go to the Resource Center", "html tag:=A")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=Resource Center: Log In").WebElement("class:=em-logo"), 10, "Resource Center"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")

'Compliance Center
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Go to the Compliance Center", "html tag:=A")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=Resource Center: Log In").WebElement("class:=em-logo"), 10, "Resource Center"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")

'WEbCenter Administration 

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=WebCenter Administration", "html tag:=A"),5) Then
	GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=WebCenter Administration", "html tag:=A")
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=LoginTitle","innertext:=Login","html tag:=TD"), 10, "Webcenter login"
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")
End If


'WebCenter free trial
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Create a Free Trial WebCenter","html tag:=A"),5) Then
	GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Create a Free Trial WebCenter","html tag:=A")
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=WebCenter Trial","html tag:=TD","index:=1"), 10, "Webcenter Trial"
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")
End If

'TPO WebCenter Administration
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=TPO WebCenter Administration","html tag:=A"),5) Then
	GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=TPO WebCenter Administration","html tag:=A")
	GUI_Object_ValidateExists Browser("title:=Ellie Mae - TPO Webcenter Admin").Page("title:=Ellie Mae - TPO Webcenter Admin").WebElement("class:=em-logo pull-left","innertext:=", "html tag:=A","index:=0"), 10, "TPO connect Administration"
	Browser("title:=Ellie Mae - TPO Webcenter Admin").Close
End If

'Manage Encompass CRM
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Manage Encompass CRM","html tag:=A")
GUI_Object_ValidateExists Browser("name:=Mortgage Returns - Login"), 20, "Mortgage returns page"
Browser("name:=Mortgage Returns - Login").Close

'Manage my Account
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Manage My Account.*","html tag:=A")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=ctl00_PageContent_titleTD", "index:=0"), 20, "My Account page"
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Invoices","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Invoices","html tag:=TD","index:=2"), 10, "Invoices"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Invoices","html tag:=A","index:=1")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Invoices","html tag:=TD","index:=2"), 10, "Invoices"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Licenses","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Licenses","html tag:=TD","index:=2"), 10, "Licenses"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Licenses","html tag:=A","index:=1")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Licenses","html tag:=TD","index:=2"), 10, "Licenses"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Transactions","html tag:=A")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Transactions","html tag:=TD","index:=1"), 10, "Transactions"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Ellie Mae Network","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Transactions","html tag:=TD","index:=1"), 10, "Transactions"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=EDM","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=EDM Transactions","html tag:=TD"), 10, "EDM"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Encompass Active Users","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Encompass Active Users","html tag:=TD"), 10, "Encompass Active Users"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Appraisal","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Appraisal Service Payment History","html tag:=TD"), 10, "Appraisal"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Title","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Title Service Payment History","html tag:=TD"), 10, "Title"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Closed Loan","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Closed Loan Confirmation Report","html tag:=TD"), 10, "Closed Loan"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=4506-T","html tag:=A","index:=0")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=4506-T Transactions","html tag:=TD"), 10, "4506-T"
GUI_Link_click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Welcome","html tag:=A")
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")

'Learn More - Commented since gives a security popup
'GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Learn more","html tag:=A","index:=1")
'GUI_Object_ValidateExists Browser("title:=Encompass CRM.*").Page("title:=.*").WebElement("innertext:=Encompass CRM", "html tag:=H1"), 10, "Encompass CRM page"
'Browser("title:=Encompass CRM.*").Close

'Manage Consumer connect 
If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Manage your Consumer Connect Portal","html tag:=A"),5) Then
	GUI_Link_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Link("text:=Manage your Consumer Connect Portal","html tag:=A")
	GUI_Object_ValidateExists Browser("title:=Ellie Mae").Page("title:=Ellie Mae").WebElement("innertext:=Welcome, Admin.*", "index:=0"), 10, "Consumer connect page"
	Browser("title:=Ellie Mae").Close

End If

BIZ_Login_UserLogout()



