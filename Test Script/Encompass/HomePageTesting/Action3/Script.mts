'Validate the existence of the widgets on the Home screen and the context menu

'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp1250"), 10, "Appointments"
'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp2220"), 10, "Company custom links"
'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp2160"), 10, "Tips of the day"
'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp1130"), 10, "Campaigns with tasks due"
'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp1240"), 10, "Top loan sources"
'GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp2200"), 10, "Logged in users"

'Admin whiteboard

GUI_Object_ValidateExists 	SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("html id:=WebPartTitle_wp2010"), 10, "Admin whiteboard"
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp2010VerbsPopup")
GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_2010"), 5, "Preferences"		
GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_2010"), 5, "Color"		
GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpDuplicate_2010"), 5, "Duplicate"		
GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_2010"), 5, "Remove"	

'Customization Reporting

GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Customization Reporting", "html tag:=DIV"), 10, "Customization Reporting"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Custom Form", "html tag:=A"), 10, "Custom Form"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Advanced Code", "html tag:=A"), 10, "Advanced Code"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Plugin", "html tag:=A"), 10, "Plugin"
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=SDK", "html tag:=A"), 10, "SDK"
GUI_WebElement_Click SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Plugin", "html tag:=A")
GUI_WebElement_Click SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=SDK", "html tag:=A")
GUI_WebElement_Click SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Advanced Code", "html tag:=A")

'Ellie Mae Messages

GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").WebElement("innertext:=Ellie Mae Messages", "html tag:=A"), 10, "Ellie Mae Messages"
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("image type:=Image Link", "html tag:=IMG", "alt:=", "index:=43")
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Page("title:=.*").Image("image type:=Image Link", "html tag:=IMG", "alt:=Experience18 - Dare to dream bigger"), 10, "Experience 18"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfObject("swfname:=btnHome")

'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp1250VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_1250"), 5, "Preferences"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_1250"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpDuplicate_1250"), 5, "Duplicate"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_1250"), 5, "Remove"		
'
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp2220VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_2220"), 5, "Preferences"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_2220"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_2220"), 5, "Remove"		
'
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp2160VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_2160"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_2160"), 5, "Remove"		
'
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp1130VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_1130"), 5, "Preferences"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_1130"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_1130"), 5, "Remove"		
'
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp1240VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_1240"), 5, "Preferences"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_1240"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpDuplicate_1240"), 5, "Duplicate"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_1240"), 5, "Remove"		
'
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*").Image("html id:=WebPart_wp2200VerbsPopup")
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpPreferences_2200"), 5, "Preferences"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpColor_2200"), 5, "Color"		
'GUI_Object_ValidateExists Page("title:=.*").WebElement("html id:=wpRemove_2200"), 5, "Remove"		


