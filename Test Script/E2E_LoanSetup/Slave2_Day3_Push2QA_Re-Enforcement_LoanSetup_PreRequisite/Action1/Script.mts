FRM_RT_SetupTest(Null)
BIZ_Login_UserLogin "admin_core2p"
BIZ_OrganizationUsers_CreateUser("LoanOfficer2")
BIZ_OrganizationUsers_CreateUser("E2E_LoanSetup")
BIZ_OrganizationUsers_CreateUser("cindy_opener")
BIZ_OrganizationUsers_CreateUser("cindy_processor")
BIZ_OrganizationUsers_CreateUser("SecondaryMarket_LoanOfficer")

BIZ_Nav_Settings_Close
'====== Go to Settings/Tables and Fees/LO Compensation =====
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Templates","Loan Template Sets"
bln = GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory"), Null, "Name", "AutoLoanTemplateSet", True, False, False, "Single")
If Not bln Then
	strTemplate = BIZ_LoanTemplates_AddNewTemplate
	GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory"), Null, "Name", strTemplate, True, False, False, "Single"
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=btnRename")
	
	GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfEdit("micclass:=SwfEdit","focused:=True"), "AutoLoanTemplateSet"	
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory")
	
	'Validate the template renamed
	GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory"), 300 
	wait 5	' Due To Sync Issue We Are Explicitly Passing Wait Statement
	GUI_List_ClickRow SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory"), Null, "Name", "AutoLoanTemplateSet", True, False, False, "Single"
	
End If
GUI_swfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=btnSetAsDefault")
GUI_swfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=btnClose")
BIZ_Login_UserLogout

