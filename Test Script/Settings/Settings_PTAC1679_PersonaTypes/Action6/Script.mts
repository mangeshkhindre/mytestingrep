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
'Select Loan Opener persona in Encompass settings
BIZ_Settings_Personas_SelectPersona "Loan Opener"

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-595",_
	"Verify access rights under 'Pipeline' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Dim objSettings,boolDefaultView
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPipelineTasks=objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PipelinePage;pnlExRight;pnlExBottom;PipelineConfiguration;tabPagePipeline;tabControl1.*")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOpener")
	
	'click on pipeline tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Pipeline"
	
	Wait g_TinyWaitMedium
	
	GUI_TreeView_ClickCheckBox objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),"Access to Pipeline/Loan Tab",True
	'verify Access to Pipeline/Loan Tab checkbox
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),_
	"Access to Pipeline/Loan Tab"),"Personas->Loan Opener->'Pipeline' Tab","'Access to Pipeline/Loan Tab' is checked"
	
	'verfiy Pipeline Views section
	boolDefaultView=GUI_List_ClickRow(objSettings.SwfObject("swfname:=gvPipelineViews"),Null,"Name","Default View",True,False,false,"Single")
	
	Wait g_TinyWaitMedium
	
	FRM_VerifyTrue boolDefaultView,"Personas->Loan Opener->'Pipeline' Tab","'Default View' is visible in Pipeline Views section"
	
	'verify Not Accessible columns
	GUI_Object_ValidateVisible objSettings.SwfObject("swfname:=gvColumns"),True,"'Not Accessible Columns' section"
	
	'validate existense of "Field Description" and "Field ID"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field Description"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field ID"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPipelineTasks,FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),True
	'verify Pipeline Tasks
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPipelineTasks,_
	FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),"Yes"),_
	"Personas->Loan Opener->'Pipeline' Tab","Default options are checked in 'Pipeline Tasks' section"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPipelineTasks=Nothing	 

	
End If

'Loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-596",_
	"Verify access rights under 'Loan' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
'	Dim arrBoolChecked(3),boolCheckedStatus, objSettings, objPersonaLoanTab
	Dim arrBoolChecked(3)
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPersonaLoanTab= objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=LoansPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOpener")
	
	'Click on Loan tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Loan"
	
	GUI_Object_WaitTillVisibleX objPersonaLoanTab,120
	
	'verify Milestone/Workflow management
	arrBoolChecked(0)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxChangeDate"),"checked")
	arrBoolChecked(1)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxFinishMilestone"),"checked")
	arrBoolChecked(2)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxSetLoanAssociate"),"checked")
	arrBoolChecked(3)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxComments"),"checked")
	
	Wait g_TinyWaitMedium
	
	boolCheckedStatus=True
	For i=0 To Ubound(arrBoolChecked) Step 1
		If arrBoolChecked(i)=False Then
			boolCheckedStatus = False
		End If
	Next
	
	'validate default checked option for Milestone/Workflow management
	FRM_VerifyTrue boolCheckedStatus,"Personas->Loan Opener->'Loan' Tab","Default options in 'Milestone/Workflow Management' section are checked"
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All",False
	'verify Itemization Fee Management section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"None"),_
	"Personas->Loan Opener->'Loan' Tab","No options are selected under 'Itemization Fee Management' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),_
	FRM_DS_GetValue(objData,"Loan_Print"),True
	'verify "Print" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),_
	FRM_DS_GetValue(objData,"Loan_Print"),"Yes"),_
	"Personas->Loan Opener->'Loan' Tab","Default options are checked under 'Print' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),True
	'verfiy checked options for "Other" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),"Yes"),_
	"Personas->Loan Opener->'Loan' Tab","Default options are checked under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_ClosingDocs"),True
	'verify checked options for "Closing Docs" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_ClosingDocs"),"Yes"),_
	"Personas->Loan Opener->'Loan' Tab","Default options are checked under 'Closing Docs' section"
	
	Wait g_TinyWaitMedium
	
	Set objData = Nothing
	Set objPersonaLoanTab=Nothing
	Set objSettings = Nothing	 
End If

'Forms Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-613",_
	"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
'	Dim objSettings,boolInputFormsChecked
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOpener")
	
	'click on Forms/Tools tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Forms/Tools"
	
	GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=gvInputForms"),120
	
	Dim arrItemsTobeChecked 'item names for which corresponding checkbox state has to be checked
	arrItemsTobeChecked = Array("1003 Page 1","1003 Page 2","1003 Page 3","1003 Page 4",_
	"1098 Mortgage Interest", "2010 GFE", "2010 HUD-1 Page 1","2010 HUD-1 Page 2","2010 HUD-1 Page 3",_
	"Additional Disclosures Information","Additional Requests Information",_
	"Affiliated Business Arrangements","Affiliated Business Disclosure",_
	"Aggregate Escrow Account","ATR/QM Management",_
	"Bi-weekly Loan Payment Summary","Borrower Summary - Origination",_
	"Closing Disclosure Page 1",_
	"Closing Disclosure Page 2","Closing Disclosure Page 3","Closing Disclosure Page 4",_
	"Closing Disclosure Page 5","Closing Vendor Information",_
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
	
	'Validation for Input Forms section 
	FRM_VerifyTrue boolInputFormsChecked,"Personas->Loan Opener->'Forms/Tools' Tab","Default options under 'Input Forms' section are checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates2 objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),True
	'Validation for Tools section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),"Yes"),_
	"Personas->Loan Opener->'Forms/Tools' Tab","Default options under 'Tools' section are checked"
	
	Wait g_TinyWaitMedium
	
	Set objData = Nothing
	Set objSettings=Nothing 
End If

'efolder Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-616",_
	"Verify access rights under 'eFolder' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objeFolder = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=eFolderPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOpener")
	
	'Click on eFolder tab for Loan Officer persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "eFolder"
	GUI_Object_WaitTillVisibleX objeFolder,120
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab",True
	'Validation for "Access to Document Tab" checkbox
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab"),_
	"Personas->Loan Opener->'eFolder' Tab","'Access to Document Tab' is checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),FRM_DS_GetValue(objData,"eFolder_General"),True
	'Validation for "General" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_General"),"Yes"),_
	"Personas->Loan Opener->'eFolder' Tab","Default options under 'General' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_UnprotectedDocuments"),True
	'Validation for "Unprotected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_UnprotectedDocuments"),"Yes"),_
	"Personas->Loan Opener->'eFolder' Tab","Default options under 'Unprotected Documents' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),_
	FRM_DS_GetValue(objData,"eFolder_Conditions"),True
	'Validation for "Conditions" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),_
	FRM_DS_GetValue(objData,"eFolder_Conditions"),"Yes"),_
	"Personas->Loan Opener->'eFolder' Tab","Default options under 'Conditions' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All",True
	'Validation for "Unassigned files" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All"),_
	"Personas->Loan Opener->'eFolder' Tab","Default options under 'Unassigned Files' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_ProtectedDocuments"),True
	'Validation for "Protected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),_
	FRM_DS_GetValue(objData,"eFolder_ProtectedDocuments"),"Yes"),_
	"Personas->Loan Opener->'eFolder' Tab","Default options under 'Protected Documents' section are in checked state"
	
	Wait g_TinyWaitMedium
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objeFolder = Nothing 

End If

'trades tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-787",_
	"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
'	Dim boolMatched, boolContactsMatched,strContactsChecked,objSettings, objContactsPage
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objContactsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=ContactsPage")
	
	'Click on "Trades/Contacts/Dashboard/Reports" Tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Trades/Contacts/Dashboard/Reports"
	GUI_Object_WaitTillVisibleX objContactsPage,120
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),_
	"Access to Trades Tab", False
	'Validation for "Trades" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),"None"),_
	"Personas->Loan Opener->'Trades/Contacts/Dashboard/Reports' Tab","'Access to Trades Tab' is in unchecked state"
	
	'Validation for "Contacts" section
	boolContactsMatched=GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*"),"0;13;14;15;16;17;27")
	
	Wait g_TinyWaitMedium
	
	'existing .checked function return null value instead of boolean value, using alternative approach to validate below checkboxes
	strContactsChecked=objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*").GetCheckMarks
	If (Instr(1,strContactsChecked,"20;21",0))>0 Then
		 boolMatched =True
	Else 
		boolMatched = False
	End If
	
	FRM_VerifyTrue (boolContactsMatched and boolMatched), "Personas->Loan Opener->'Trades/Contacts/Dashboard/Reports' Tab",_
	"Default options are in checked state under 'Contacts' section"
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),_
	"All",False
	'Validatin for "Dashboard" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),"None"),_
	"Personas->Loan Opener->'Trades/Contacts/Dashboard/Reports' Tab","No options are in checked state under 'Dashboard' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"All",False
	'Validatin for "Reports" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"None"),_
	"Personas->Loan Opener->'Trades/Contacts/Dashboard/Reports' Tab","No options are in checked state under 'Reports' section"
	
	Set objSettings = Nothing
	Set objContactsPage = Nothing 
End If

'settings tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-790",_
	"Verify access rights under 'Settings' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objSettingsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=SettingsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOpener")
	
	'Click on "Settings" Tab for selected Persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Settings"
	GUI_Object_WaitTillVisibleX objSettingsPage,120
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"), True
	'Validation for "Company Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"),"Yes"),_
	"Personas->Loan Opener->'Settings' Tab","Default options are in checked state under 'Company Settings' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"All",False
	'Validation for "Other" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"None"),_
	"Personas->Loan Opener->'Settings' Tab","No options are in checked state under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),True
	'Validation for "Personal Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),"Yes"),_
	"Personas->Loan Opener->'Settings' Tab","Default options are in checked state under 'Personal Settings' section"
	
	Wait g_TinyWaitMedium
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objSettingsPage = Nothing 
End If

'=============================re-enforcement=============================



BIZ_Nav_Settings_OrganizationUsers()
If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Encompass").Exist(10) Then
    GUI_WinButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").Dialog("text:=Encompass").WinButton("text:=&Yes")
End If
Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
objSettings.SwfTreeView("swfname:=hierarchyTree").Select "Administration"
'Create user "loan opener" with Loan Opener persona if not already existing
BIZ_OrganizationUsers_CreateUser "ptac1679_LoanOpener"

BIZ_Login_UserLogout()

'Login as "loan opener" user
BIZ_Login_UserLogin "1679_LoanOpener"

'pipeline tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-595",_
	"Verify access rights under 'Pipeline' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	BIZ_Nav_SelectPipelineTab()
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "","My Pipeline"
	
	'Click on first loan available in pipeline view
	GUI_List_ClickOnCellData objMainView.SwfObject("swfname:=gvLoans"),0,2,True,True,False,"Single"
	
	'Verify delete option not present
	boolExist = GUI_Object_IsExistX(objMainView.SwfObject("swfname:=btnDelete"),5)
	
	FRM_VerifyFalse boolExist,"Delete loan option","Delete loan option is not displayed in Pipeline View for user 'loanopener'"
	
	Set objMainView = Nothing
End If

'loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-596",_
	"Verify access rights under 'Loan' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'create new blank loan
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "","My Pipeline"
	BIZ_Loan_AddNewBlankLoan()
	
	'Validation of "print" button under Loans tab
	GUI_Object_ValidateExists objMainView.SwfWindow("swfname:=LoanPage").SwfObject("swfname:=printBtn"),60,_
	"'Print' button is displayed under 'Loans' tab in a loan for user 'loanopener'"
	
	Set objMainView = Nothing
End If

'forms
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-613",_
	"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'Select Forms tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
	BIZ_Forms_ShowAll()
	
	'Borrower Information Vesting validation
	FRM_VerifyFalse GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emFormMenuBox"),"Borrower Information - Vesting"),_
	"Verify Borrower Information - Vesting", "'Borrower Information - Vesting' form should not be displayed under Forms tab for user 'loanopener'"
	
	Set objMainView=Nothing
End If

'efolder
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-616",_
	"Verify access rights under 'eFolder' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	BIZ_Forms_Open "Borrower Summary - Origination"
	
	'Set borrower, property and TransactionDetails info 
	BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
	BIZ_BorrowerSummaryOrigination_SetProperty "Settings_Alerts_Propinfo"
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Settings_Alerts_Trasactiondetails"
	BIZ_Loan_Save()
	
	'Order credit report through Equifax mortgage solutions
	'BIZ_Services_OrderCredit "Equifax Mortgage Solutions","999EL31714","00vGdxXrjdFfg"
	
	BIZ_Nav_SelectLoanTab()
	
	BIZ_Nav_eFoler_Open()
	
	'click on Credit Report document entry
	GUI_List_ClickRow SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"),Null,"Name","Credit Report",_
	True,False,False,"Single"
	
	'Validate edit document option
	GUI_Object_ValidateVisible SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=btnEdit"),True,_
	"'Edit Document' option is visible under eFolder for user 'loanopener"
	
	BIZ_Nav_eFoler_Close()	
		
	
End If

'BIZ_Nav_SelectLoanTab()
'BIZ_Loan_Exit "False"

'trades
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-787",_
	"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	Dim boolContactCreated
	
	'delete contact, if existing, before creating new contact
	BIZ_Contacts_BusinessContact_Delete "CompanyName","1679_ContactsTabReEnforcement"
	
	'Add new business contact
	BIZ_Contacts_BusinessContact_Add "1679_BusinessContact"
	
	'Validate business contact creation
	boolContactCreated =GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvContactList"),Null,_
	"Work Email","contacttest@gmail.com",True,False,False,"Single")
	
	FRM_VerifyTrue boolContactCreated,"Create Business Contact","New Business Contact is created and saved for user 'loanopener'"	
		
End If

'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
		FRM_Logger_ReportStepEvent "Start Test Case: PTAC-790",_
	"Verify access rights under 'Settings' tab of Encompass Settings for Loan Opener persona and re-enforcement validations",Null
	
	'Navigate to Settings > eFolder Setup > Document Training
	BIZ_Nav_HierarchyTree "eFolder Setup","Document Training"
	
	'Validate Document Training
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfLabel("text:=Document Training"),20,_
	"'Document Training' visible in Encompass Settings for user 'loanopener"
	
	BIZ_Nav_Settings_Close
	
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

