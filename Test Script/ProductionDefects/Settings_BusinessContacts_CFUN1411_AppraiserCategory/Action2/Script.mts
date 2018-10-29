'@******************************************************************************************
'@ TestStory: CFUN-1411 business contacts Custom field - have the field value copy as entered
'@ TestCase: CFUN-2607 - TC01 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@			CFUN-2609 - TC02 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@			CFUN-2610 - TC03 - CFUN-1411 - To verify that data entered for Appraiser category field should reflect as it is in field# 974
'@ Test Automation JIRA Task: TA-4851
'@ TestData: 
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 go to Contact Setup->Business Custom Fields
	'2 Click on tab Custom Category Fields
	'3 Select Appraiser as the Category
	'4 Enter text field, field type and loan field ID
	'5 Delete business contact with first name CFUN1411First
	'6 Add a new business contact
	'7 Go to the tab Custom Category Fields
	'8 Validate that a business custom category field with the label as text field specified earlier is present
	'9 Enter a value for business custom category
	'10 Add a new blank loan
	'11 Go to Tools->File Contacts
	'12 Select Appraiser
	'13 Open the previously created business contact
	'14 Verify the agent name
	'15 Verify that the contact license # is same as the business custom category value
	'16 go to Forms->Transmittal Summary
	'17 Verify that the Appraisal License # (field 974) is having the value as the business custom category
	'18 Exit the Loan
'@ ExpectedResult:
'********************************************************************************************
FRM_Logger_ReportStepEvent Parameter("TC"), "To verify that data entered for Appraiser category is reflected in field 974", Null
strTextField = Parameter("strTextField")
strBusinessCustomCategory = Parameter("strBusinessCustomCategory")

Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

'go to Contact Setup->Business Custom Fields
BIZ_Nav_HierarchyTree "Contact Setup", "Business Custom Fields"
'Click on tab Custom Category Fields
GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabCustomFields"), "Custom Category Fields"
'Select Appraiser as the Category
GUI_SwfComboBox_Select objSettings.SwfComboBox("swfname:=cboCategoryName"), "Appraiser"
'Enter text field, field type and loan field ID
GUI_SwfEdit_Set objSettings.SwfEdit("swfname:=txtFieldDescription1"), strTextField
GUI_SwfComboBox_Select objSettings.SwfComboBox("swfname:=cboFieldType1"), "STRING"
GUI_SwfEdit_Set objSettings.SwfEdit("swfname:=txtLoanFieldId1"), "974"
GUI_SwfButton_Click objSettings.SwfButton("swfname:=btnClose")
GUI_Dialog_Encompass_Yes ""

'Delete business contact with first name CFUN1411First
BIZ_Contacts_BusinessContact_Delete "ContactFirstName", "CFUN1411First"
If SwfWindow("swfname:=MainForm").SwfObject("swfname:=groupContainer2").Exist Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=collapsibleSplitter1")
End If
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=collapsibleSplitter1")
'Add a new business contact
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnNew")
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtBoxFirstName"), "CFUN1411First"
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtBoxLastName"), "CFUN1411Last"
GUI_SwfComboBox_Select SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cmbBoxCategoryID"), "Appraiser"
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnSave")
'Go to the tab Custom Category Fields
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl1"), "Custom Category Fields"
'Validate that a business custom category field with the label as text field specified earlier is present
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfLabel("text:="& strTextField), 3, "Business Custom Category field"
'Enter a value for business custom category
SwfWindow("swfname:=MainForm").WinEdit("nativeclass:=Edit", "Location:=0").Type strBusinessCustomCategory
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnSave")
'Add a new blank loan
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
'Go to Tools->File Contacts
BIZ_Tools_Open "File Contacts"
'Select Appraiser
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewContacts"), SwfWindow("swfname:=MainForm").SwfObject("swfname:=gridViewContacts").SwfScrollBar("swfname:=vPanelScrollBar"), "Category/Role", "Appraiser", True, False, False, "Single"
'Open the previously created business contact
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").Image("html id:=Rolodex2")
GUI_SwfButton_click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RxBusinessContact").SwfButton("swfname:=btnClear")
GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RxBusinessContact").SwfObject("swfname:=gvContactList"), Null, "First Name", "CFUN1411First", True, True, False, "Double"
'Verify the agent name
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_618"), "CFUN1411First CFUN1411Last", "Agent Name"
'Verify that the contact license # is same as the business custom category value
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_974"), strBusinessCustomCategory, "Contact License #" 
'go to Forms->Transmittal Summary
BIZ_Forms_Open "Transmittal Summary"
'Verify that the Appraisal License # (field 974) is having the value as the business custom category
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_974"), strBusinessCustomCategory, "Appraiser License #" 
'Exit the loan
BIZ_Loan_Exit False









