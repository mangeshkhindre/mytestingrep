'**********************************************************************************************************
'@ TestStory: PTAC-1679 Persona
'@ TestCase:  PTAC-909  Verify access rights under "Home" tab of Encompass Settings for Loan Officer persona
'@ Test Automation JIRA Task: PTAC-1884
'@ Pre-conditions: 
'@ Test Data:
'@ Description:  
	'@ Test Steps
		'1. Login to Encompass as Admin. Click on "Company/User Setup" option and expand
		'2. Click on "Persona" and select "Loan Officer" under the Persona tab
		'3. Click on "Home" tab.
		'4. Verify the access rights for Must Have, Show by Default and Accessible coloumn
	'@ Expected Result
		'1. The default access rights details as follows Must Have column: None selected
		'2. Show by Default: Toolbox -> Admin Whiteboard
		'	Industry News -> CBS Market/Watch Market Rates
		'	Help and Assistance -> Encompass Tip of the Day
		'	Toolbox->Loan Files in the Loan Mailbox
		'	Toolbox->Loan with Alerts
		'	Industry News ->Today's Market News
		'3. Accessible column:All the options should be checked except (Performance -->Logged in Users)	   		
'**********************************************************************************************************
'Pipeline Tab
'Select Underwriter persona in Encompass settings
BIZ_Settings_Personas_SelectPersona "Underwriter"

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	 FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1315",_
"Verify access rights under 'Pipeline' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

	Dim boolDefaultView
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPipelineTasks=objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PipelinePage;pnlExRight;pnlExBottom;PipelineConfiguration;tabPagePipeline.*")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'Click on Pipeline tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Pipeline"
	
	
	GUI_TreeView_ClickCheckBox objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),"Access to Pipeline/Loan Tab",True
	'Validation for "Access to Pipeline/Loan Tab" 
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),_
	"Access to Pipeline/Loan Tab"),"Personas->Underwriter->'Pipeline' Tab","'Access to Pipeline/Loan Tab' is checked"
	
	'Validation for "Pipeline Views" section
	boolDefaultView=GUI_List_ClickRow(objSettings.SwfObject("swfname:=gvPipelineViews"),Null,"Name","Default View",True,False,false,"Single")
	
	FRM_VerifyTrue boolDefaultView,"Personas->Underwriter->'Pipeline' Tab","'Default View' is visible in Pipeline Views section"
	
	'Validation for "Not Accessible Columns"
	GUI_Object_ValidateVisible objSettings.SwfObject("swfname:=gvColumns"),True,"'Not Accessible Columns' section"
	
	'validate existense of "Field Description" and "Field ID"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field Description"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field ID"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPipelineTasks,FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),True
	'Validation for "Pipeline Tasks" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPipelineTasks, FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),"Yes"),_
	"Personas->Underwriter->'Pipeline' Tab","Default options are checked in 'Pipeline Tasks' section"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPipelineTasks=Nothing

	
End If

'Loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1316",_
"Verify access rights under 'Loan' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

	Dim arrBoolChecked(5),boolCheckedStatus, objSettings,objPersonaLoanTab
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPersonaLoanTab= objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=LoansPage")
	
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'Click on "Loan" tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Loan"
	
	GUI_Object_WaitTillVisibleX objPersonaLoanTab,60
	
	'Verify Milestone/Workflow Management section
	arrBoolChecked(0)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxAcceptFiles"),"checked")
	arrBoolChecked(1)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxReturnToLastMilestone"),"checked")
	arrBoolChecked(2)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxChangeDate"),"checked")
	arrBoolChecked(3)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxFinishMilestone"),"checked")
	arrBoolChecked(4)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxSetLoanAssociate"),"checked")
	arrBoolChecked(5)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxComments"),"checked")
	
	boolCheckedStatus = True
	For i=0 To Ubound(arrBoolChecked) Step 1
		If arrBoolChecked(i)=False Then
			boolCheckedStatus = False
		End If
	Next
	
	FRM_VerifyTrue boolCheckedStatus,"Personas->Underwriter->'Loan' Tab","Default options in 'Milestone/Workflow Management' section are checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All",True
	'Itemization Fee Management section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All"),_
	"Personas->Underwriter->'Loan' Tab","All options are selected under 'Itemization Fee Management' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All",True
	'Print section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All"),_
	"Personas->Underwriter->'Loan' Tab","All options are checked under 'Print' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),True
	'Other section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),"Yes"),_
	"Personas->Underwriter->'Loan' Tab","Default options are checked under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),"All",False
	'Closing Docs section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),"None"),_
	"Personas->Underwriter->'Loan' Tab","Default options are checked under 'Closing Docs' section"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPersonaLoanTab=Nothing

End If

'Forms Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1317",_
	"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

'	Dim boolInputFormsChecked,objSettings
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'click on Forms/Tools tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Forms/Tools"
	
	GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=gvInputForms"),60
	
	Dim arrItemsTobeChecked 'item names for which corresponding checkbox state has to be checked
	arrItemsTobeChecked = Array("1003 Page 1","1003 Page 2","1003 Page 3","1003 Page 4",_
	"1098 Mortgage Interest", "2010 GFE", "2010 HUD-1 Page 1","2010 HUD-1 Page 2","2010 HUD-1 Page 3",_
	"Additional Disclosures Information","Additional Requests Information",_
	"Affiliated Business Arrangements","Affiliated Business Disclosure",_
	"Aggregate Escrow Account","ATR/QM Management",_
	"Bi-weekly Loan Payment Summary","Borrower Summary - Origination",_
	"Borrower Summary - Processing","Closing Disclosure Page 1",_
	"Closing Disclosure Page 2","Closing Disclosure Page 3","Closing Disclosure Page 4",_
	"Closing Disclosure Page 5","Closing RegZ","Closing Vendor Information",_
	"Construction Management","Custom Fields",_
	"Energy Efficient Mortgage Calculation","FACT Act Disclosure",_
	"FHA 203(k)","FHA Management",_
	"FHA Maximum Mortgage and Cash Needed Worksheet","FL Broker Contract Disclosure",_
	"FL Lender Disclosure","FNMA Streamlined 1003",_
	"Freddie Mac Additional Data","GFE - Itemization",_
	"HMDA Information", "Home Counseling Providers",_
	"HUD 1003 Addendum","HUD-56001 Property Improvement",_
	"HUD-928005b Conditional Commitment","HUD-92900LT FHA Loan Transmittal",_
	"Loan Estimate Page 1","Loan Estimate Page 2",_
	"Loan Estimate Page 3","Loan Submission",_
	"MLDS - CA GFE","NY Application Log",_
	"NY Preapplication Disclosure","Privacy Policy",_
	"RegZ - CD","RegZ - LE",_
	"REGZ - TIL","Request for Copy of Tax Return",_
	"Request for Copy of Tax Return (Classic)","Request for Transcript of Tax",_
	"Request for Transcript of Tax (Classic)","RESPA Servicing Disclosure",_
	"Section 32 HOEPA", "Section 35 HPML",_
	"Self-Employed Income 1084","Settlement Service Provider List",_
	"Statement of Denial","State-Specific Disclosure Information",_
	"Transmittal Summary","TX Broker Disclosure",_
	"ULDD/PDD","USDA Management",_
	"VA 26-0286 Loan Summary","VA 26-1805 Reasonable Value",_
	"VA 26-1820 Loan Disbursement","VA 26-6393 Loan Analysis",_
	"VA 26-8261A Veteran Status","VA 26-8923 Rate Reduction WS",_
	"VA Cert of Eligibility","VA Management","VOD",_
	"VOE","VOL","VOM","VOR")
	
	
	'set Input Forms
	For i = 0 To Ubound(arrItemsTobeChecked) Step 1
		GUI_List_LocateAndSetCheckBox objSettings.SwfObject("swfname:=gvInputForms"),arrItemsTobeChecked(i),"Name",0,True
	Next
	'Input Forms section verification
	boolInputFormsChecked=GUI_List_ValidateCheckboxCheckedByName(objSettings.SwfObject("swfname:=gvInputForms"),"Name",arrItemsTobeChecked,"Accessible")
	
	FRM_VerifyTrue boolInputFormsChecked,"Personas->Underwriter->'Forms/Tools' Tab","Default options under 'Input Forms' section are checked"
	
	GUI_SwfTreeView_SetCheckBoxItemStates2 objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),True
	'Validation for Tools section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),"Yes"),_
	"Personas->Underwriter->'Forms/Tools' Tab","Default options under 'Tools' section are checked"
	
	Set objData = Nothing
	Set objSettings = Nothing
	
End If

'efolder Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1320",_
"Verify access rights under 'eFolder' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objeFolder = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=eFolderPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'Click on eFolder tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "eFolder"
	GUI_Object_WaitTillVisibleX objeFolder,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab",True
	'Validation for "Access to Document Tab" checkbox
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab"),_
	"Personas->Underwriter->'eFolder' Tab","'Access to Document Tab' is checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_General"),True
	'Validation for "General" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_General"),"Yes"),_
	"Personas->Underwriter->'eFolder' Tab","Default options under 'General' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),"All",True
	'Validation for "Unprotected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),"All"),_
	"Personas->Underwriter->'eFolder' Tab","All options under 'Unprotected Documents' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),_
	FRM_DS_GetValue(objData,"eFolder_Conditions"),True
	'Validation for "Conditions" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),_
	FRM_DS_GetValue(objData,"eFolder_Conditions"),"Yes"),"Personas->Underwriter->'eFolder' Tab",_
	"Default options under 'Conditions' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All",True
	'Validation for "Unassigned files" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All"),_
	"Personas->Underwriter->'eFolder' Tab","All options under 'Unassigned Files' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),"All",True
	'Validation for "Protected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),"All"),_
	"Personas->Underwriter->'eFolder' Tab","All options under 'Unassigned Files' section are in checked state"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objeFolder = Nothing
	
End If

'trades tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1321",_
	"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objContactsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=ContactsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'Click on "Trades/Contacts/Dashboard/Reports" Tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Trades/Contacts/Dashboard/Reports"
	GUI_Object_WaitTillVisibleX objContactsPage,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),_
	"Access to Trades Tab", False
	'Validation for "Trades" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),"None"),_
	"Personas->Underwriter->'Trades/Contacts/Dashboard/Reports' Tab","'Access to Trades Tab' is in unchecked state"
	
	'Validatin for "Contacts" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*"),"13;14;15;16;17;27"),_
	"Personas->Underwriter->'Trades/Contacts/Dashboard/Reports' Tab","Default options are in checked state under 'Contacts' section"
	
	strChecked=objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*").GetCheckMarks
	If Instr(strChecked,"20;21")>0 Then
		 boolMatched =True
	Else 
		boolMatched = False
	End If
	
	FRM_VerifyTrue boolMatched, "Personas->Underwriter->'Trades/Contacts/Dashboard/Reports' Tab","Default options are in checked state under 'Contacts' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),_
	FRM_DS_GetValue(objData,"Trades_Dashboard"),True
	'Validatin for "Dashboard" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),_
	FRM_DS_GetValue(objData,"Trades_Dashboard"),"Yes"),_
	"Personas->Underwriter->'Trades/Contacts/Dashboard/Reports' Tab","Default options are in checked state under 'Dashboard' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"All",False
	'Validatin for "Reports" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"None"),_
	"Personas->Underwriter->'Trades/Contacts/Dashboard/Reports' Tab","No options are in checked state under 'Reports' section"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objContactsPage = Nothing
	
End If

'settings tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1322",_
	"Verify access rights under 'Settings' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objSettingsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=SettingsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Underwriter")
	
	'Click on "Settings" Tab for selected Persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Settings"
	GUI_Object_WaitTillVisibleX objSettingsPage,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"), True
	'Validation for "Company Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"),"Yes"),_
	"Personas->Underwriter->'Settings' Tab","Default options are in checked state under 'Company Settings' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"All",False
	'Validation for "Other" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"None"),_
	"Personas->Underwriter->'Settings' Tab","No options are in checked state under 'Other' section"
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),True
	'Validation for "Personal Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),"Yes"),_
	"Personas->Underwriter->'Settings' Tab","Default options are in checked state under 'Personal Settings' section"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objSettingsPage = Nothing
	
End If

'=============================re-enforcement=============================


BIZ_Nav_Settings_OrganizationUsers()
If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Encompass").Exist(15) Then
    GUI_WinButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If
Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
objSettings.SwfTreeView("swfname:=hierarchyTree").Select "Administration"
'Create user "underwriter1" with Underwriter persona if not already existing
BIZ_OrganizationUsers_CreateUser "ptac1679_Underwriter"

BIZ_Login_UserLogout()

'Login as "underwriter1" user
BIZ_Login_UserLogin "1679_Underwriter"

'pipeline tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1315",_
	"Verify access rights under 'Pipeline' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

	Dim boolItemExist
	
	'navigate to pipeline tab
	BIZ_Nav_SelectPipelineTab()
	
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfObject("swfname:=flowLayoutPanel1"),30
	
	'Verify new loan option not present 
	boolNewLoanOption=GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnNew"),5)
	
	FRM_VerifyFalse boolNewLoanOption, "New Loan Icon","'New Loan' Icon should not be displayed for user 'underwriter1'"
		
End If

'loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1316",_
	"Verify access rights under 'Loan' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null

	'create new blank loan
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Underwriter - Default View","My Pipeline"
	
	'click on first loan in pipeline view
	GUI_List_ClickOnCellData SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans"),1,3,True, True,False,"Double"
	
	'handle read only mode dialog while opening loan
	GUI_Dialog_Encompass_YesX 5,""
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"),20
	
	'open eFolder
	BIZ_Nav_eFoler_Open()
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=eFolderDialog"),15
	
	'Verify eConsent
	FRM_VerifyFalse GUI_Object_IsExistX(SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnConsent"),2),"'eConsent' button",_
	"'eConsent' button doesn't exist under eFolder"
	
	'Verify Request
	FRM_VerifyFalse GUI_Object_IsExistX(SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnRequest"),2),"'Request' button",_
	"'Request' button doesn't exist under eFolder"
	
	'eDisclosures
	FRM_VerifyFalse GUI_Object_IsExistX(SwfWindow("swfname:=eFolderDialog").SwfButton("swfname:=btnDisclosures"),2),"'eDisclosures' button",_
	"'eDisclosures' button doesn't exist under eFolder"
	
	BIZ_Nav_eFoler_Close()
	
End If

'forms
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1317",_
	"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'Select Forms tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
	BIZ_Forms_ShowAll()
	
	'Borrower Information - Vesting form validation
	FRM_VerifyFalse GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emFormMenuBox"),"Borrower Information - Vesting"),_
	"Verify Borrower Information - Vesting", "'Borrower Information - Vesting' form should not be displayed under Forms tab for user 'underwriter1'"
	
	'Select Tools tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Tools"
	
	'Validation for Cash to Close tool
	FRM_VerifyTrue GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emToolMenuBox"),"Cash-to-Close"),_
	"Verify Cash-to-Close","'Cash-to-Close' tool should be displayed under Tools tab for user 'underwriter1'"
	
	Set objMainView=Nothing
	
End If

'efolder
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1320",_
	"Verify access rights under 'eFolder' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	BIZ_Nav_SelectLoanTab()
	
	'open eFolder
	BIZ_Nav_eFoler_Open()
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=eFolderDialog"),25
	
	'Validate edit document option
	GUI_Object_ValidateVisible SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=btnEdit"),True,_
	"'Edit Document' option is visible under eFolder for user 'underwriter1'"
	
	BIZ_Nav_eFoler_Close()	
	
End If

 
'trades
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1321",_
	"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	Dim objMainView,boolDashboardExists
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'verify existence of Dashboard
	boolDashboardExists=GUI_List_VerifyItemExists(objMainView.SwfTab("swfname:=tabControl"),"Dashboard")
	
	FRM_VerifyTrue boolDashboardExists,"Dashboard Tab", "'Dashboard' Tab is visible for user 'underwriter1'"
	
	'Click Dashboard tab
	GUI_List_Select objMainView.SwfTab("swfname:=tabControl"),"Dashboard"
	
	'handle no default view selected pop up
	GUI_Dialog_Encompass_OKX 10,""
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DashboardViewTemplateFormDialog").SwfButton("swfname:=btnCancelSelect")
	
	'verfiy save button disabled
	GUI_Object_ValidateDisabled objMainView.SwfObject("swfname:=siBtnSaveView"),_
	"'Save' button under Dashboard Tab for user 'underwriter1'"
	
	'verify refresh button disabled
	GUI_Object_ValidateDisabled objMainView.SwfObject("swfname:=siBtnRefreshView"),_
	"'Refresh' button under Dashboard Tab for user 'underwriter1'"
	
	'select loan tab
	'BIZ_Nav_SelectLoanTab()
	
	Set objMainView=Nothing	
	
End If

'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1322",_
	"Verify access rights under 'Settings' tab of Encompass Settings for Underwriter persona and re-enforcement validations",Null
	
	Dim objSetupContainer
	
	'Navigate to Settings > eFolder Setup
	BIZ_Settings_ExpandTreeView "eFolder Setup"
	
	Set objSetupContainer=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTreeView("swfname:=treeView")
	
	'Validate options under Settings -> eFolder Setup
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Conditions"),"Settings -> eFolder Setup","'Conditions' option is displayed for user 'underwriter1'"
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Condition Sets"),"Settings -> eFolder Setup","'Condition Sets' option is displayed for user 'underwriter1'"
	
	BIZ_Nav_Settings_Close
	
	'BIZ_Nav_SelectLoanTab()
	
	Set objSetupContainer=Nothing	
End If

BIZ_Login_UserLogout()


'This function is used for setting multiple checkbox items in SwfTreeView object
'@code
'	GUI_SwfTreeView_SetCheckBoxItemStates(objMainView,strItemsList,boolChecked)
'@endcode
'@param 
Function GUI_SwfTreeView_SetCheckBoxItemStates2(objMainView,strItemsList,boolChecked)
	
	Dim arrInput	'item names to set checkbox state 
	Dim intItemIndex, strCount, intChecked
	
	Select Case strItemsList
		'For setting all checkbox items in SwfTreeView
		Case "All"
			strCount = objMainView.GetItemsCount()
			If boolChecked Then
				intChecked = 1
			Else
				intChecked = 0
			End If
			For intItemIndex = 0 To strCount-1 Step 1
				objMainView.SetItemState intItemIndex,intChecked
			Next
			
		'For setting selected checkbox items identified by names
		Case Else
			arrInput = Split(strItemsList,vbLf)
	
			For i = 0 To Ubound(arrInput) Step 1
			GUI_TreeView_ClickCheckBox2 objMainView,arrInput(i),boolChecked
			Next
		End Select
		
End Function

Function GUI_TreeView_ClickCheckBox2(objTreeView, strSearchText, boolToBeChecked)

    Dim itemIndex, isExisted, arrCheckedIndexs, checkedIndex, isChecked, objWshShell,arrSearchText,strActualSearchText
    
    isExisted = False
	arrSearchText = Split(strSearchText,";")
	strActualSearchText=arrSearchText(UBound(arrSearchText))
    
	For i = 0 To objTreeView.GetItemsCount - 1
        strActualWord = objTreeView.GetItem(i)
        If strActualWord = strActualSearchText Then
            itemIndex = i
            isExisted = True
            Exit For
        End If
    Next
    
    If isExisted Then
        arrCheckedIndexs = Split(objTreeView.GetROProperty("checked"), ";")
        For Each checkedIndex In arrCheckedIndexs
            If CInt(checkedIndex) = itemIndex Then
                isChecked = True
                Exit For
            Else
                isChecked = False
            End If
        Next
    End If
    
    If boolToBeChecked <> isChecked Then
        Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
		objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*").Select "TPO Information"
        
       ' GUI_TreeView_SetItemState objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"), strActualSearchText, micChecked
       
            itemIndex = itemIndex - 1
            For i = 0 To itemIndex Step 1
                Set objWshShell = CreateObject("WScript.Shell")
                objWshShell.SendKeys "{DOWN}"
                Set objWshShell = Nothing
            Next
            
       
        
        'objTreeView.Select strSearchText
		'Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
		
		Set objWshShell = CreateObject("WScript.Shell")
        objWshShell.SendKeys " "
        Set objWshShell = Nothing 
        
    End If
End Function

