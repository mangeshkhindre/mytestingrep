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
'Select Closer persona in Encompass settings
BIZ_Settings_Personas_SelectPersona "Closer"

Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")

If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1327",_
"Verify access rights under 'Pipeline' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Dim boolDefaultView
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPipelineTasks=objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PipelinePage;pnlExRight;pnlExBottom;PipelineConfiguration;tabPagePipeline.*")
	
	
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	
	'Click on Pipeline tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Pipeline"
	
	
	GUI_TreeView_ClickCheckBox objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),"Access to Pipeline/Loan Tab",True
	
	'Validation for "Access to Pipeline/Loan Tab" 
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objSettings.SwfTreeView("swfname path:=treeViewTabs;PipelineLoanTabPage;pnlExPipelineLoanTab.*"),_
	"Access to Pipeline/Loan Tab"),"Personas->Closer->'Pipeline' Tab","'Access to Pipeline/Loan Tab' is checked"
	
	'Validation for "Pipeline Views" section
	boolDefaultView=GUI_List_ClickRow(objSettings.SwfObject("swfname:=gvPipelineViews"),Null,"Name","Default View",True,False,false,"Single")
	
	FRM_VerifyTrue boolDefaultView,"Personas->Closer->'Pipeline' Tab","'Default View' is visible in Pipeline Views section"
	
	'Validation for "Not Accessible Columns"
	GUI_Object_ValidateVisible objSettings.SwfObject("swfname:=gvColumns"),True,"'Not Accessible Columns' section"
	
	'validate existense of "Field Description" and "Field ID"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field Description"
	GUI_List_ValidateColumnName objSettings.SwfObject("swfname:=gvColumns"),"Field ID"
	
	'Removed the "Move Items" option from the list
	'newdataitem=Replace(FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),"Move Loans","")
	newdataitem=FRM_DS_GetValue(objData,"Pipeline_PipelineTasks")
	'Handled the "Move Items" new folder movement window with additional logic
	GUI_SwfTreeView_SetCheckBoxItemStates objPipelineTasks,newdataitem,True
	
	strActualSearchText="Move Loans"
	Set objTreeView=objPipelineTasks
	objTreeView.Select strActualSearchText
	'objTreeView.SetItemState strActualSearchText, micChecked
	    
	   	wait g_ShortWaitSmall
	     If objSettings.SwfWindow("swfname:=MoveLoanFolderDlg").SwfButton("swfname:=btnOK").Exist(1) Then
	            
	    		objSettings.SwfWindow("swfname:=MoveLoanFolderDlg").SwfTreeView("swfname:=tvMoveFrom").SetItemState "My Pipeline", micChecked
	        	objSettings.SwfWindow("swfname:=MoveLoanFolderDlg").SwfTreeView("swfname:=tvMoveTo").SetItemState "My Pipeline", micChecked
	       	 	objSettings.SwfWindow("swfname:=MoveLoanFolderDlg").SwfButton("swfname:=btnOK").Click
	       End If
	      
	    
	'Validation for "Pipeline Tasks" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPipelineTasks, FRM_DS_GetValue(objData,"Pipeline_PipelineTasks"),"Yes"),_
	"Personas->Closer->'Pipeline' Tab","Default options are checked in 'Pipeline Tasks' section"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPipelineTasks=Nothing

	
End If

'Loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1328",_
"Verify access rights under 'Loan' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Dim objSettings,objPersonaLoanTab,arrBoolChecked(2),boolCheckedStatus
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPersonaLoanTab= objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=LoansPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	
	'Click on "Loan" tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Loan"
	
	GUI_Object_WaitTillVisibleX objPersonaLoanTab,60
	
	'Verify Milestone/Workflow Management section
	arrBoolChecked(0)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxFinishMilestone"),"checked")
	arrBoolChecked(1)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxSetLoanAssociate"),"checked")
	arrBoolChecked(2)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxComments"),"checked")
	
	boolCheckedStatus=True
	For i=0 To Ubound(arrBoolChecked) Step 1
		If arrBoolChecked(i) = False Then
			boolCheckedStatus = False
		End If
	Next
	
	FRM_VerifyTrue boolCheckedStatus,"Personas->Closer->'Loan' Tab","Default options in 'Milestone/Workflow Management' section are checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All",True
	'Itemization Fee Management section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All"),_
	"Personas->Closer->'Loan' Tab","All options are selected under 'Itemization Fee Management' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All",True
	'Print section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All"),_
	"Personas->Closer->'Loan' Tab","All options are checked under 'Print' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),FRM_DS_GetValue(objData,"Loan_Other"),True
	'Other section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),"Yes"),_
	"Personas->Closer->'Loan' Tab","Default options are checked under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),"All",True
	'Closing Docs section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),"All"),_
	"Personas->Closer->'Loan' Tab","All options are checked under 'Closing Docs' section"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPersonaLoanTab=Nothing
End If

'Forms Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1329",_
"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	
	'click on Forms/Tools tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Forms/Tools"
	
	GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=gvInputForms"),60
	
	Dim arrItemsTobeChecked 'item names for which corresponding checkbox state has to be checked
	arrItemsTobeChecked = Array("1003 Page 1","1003 Page 2","1003 Page 3","1003 Page 4",_
	"1098 Mortgage Interest", "2010 GFE", "2010 HUD-1 Page 1","2010 HUD-1 Page 2","2010 HUD-1 Page 3",_
	"Additional Disclosures Information","Additional Requests Information",_
	"Affiliated Business Arrangements","Affiliated Business Disclosure",_
	"Aggregate Escrow Account","ATR/QM Management",_
	"Bi-weekly Loan Payment Summary","Borrower Information - Vesting",_
	"Closing Conditions","Closing Disclosure Page 1",_
	"Closing Disclosure Page 2","Closing Disclosure Page 3","Closing Disclosure Page 4",_
	"Closing Disclosure Page 5","Closing RegZ","Closing Vendor Information",_
	"Construction Management","Custom Fields",_
	"Energy Efficient Mortgage Calculation","FACT Act Disclosure",_
	"FHA 203(k)","FHA Management",_
	"FHA Maximum Mortgage and Cash Needed Worksheet","FL Broker Contract Disclosure",_
	"FL Lender Disclosure","FNMA Streamlined 1003",_
	"Freddie Mac Additional Data","GFE - Itemization",_
	"HMDA Information", "Home Counseling Providers",_
	"HUD 1003 Addendum","HUD-1 Page 1",_
	"HUD-1 Page 2","HUD-56001 Property Improvement",_
	"HUD-928005b Conditional Commitment","HUD-92900LT FHA Loan Transmittal",_
	"Loan Estimate Page 1","Loan Estimate Page 2",_
	"Loan Estimate Page 3","Loan Submission",_
	"MLDS - CA GFE","NY Application Log",_
	"NY Preapplication Disclosure","Privacy Policy",_
	"Property Information","RegZ - CD","RegZ - LE",_
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
	
	FRM_VerifyTrue boolInputFormsChecked,"Personas->Closer->'Forms/Tools' Tab","Default options under 'Input Forms' section are checked"
	
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates2 objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),True
	'Validation for Tools section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),"Yes"),_
	"Personas->Closer->'Forms/Tools' Tab","Default options under 'Tools' section are checked"
	
	Set objData = Nothing
	Set objSettings = Nothing
	
End If

'efolder Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then

	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1330",_
"Verify access rights under 'eFolder' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objeFolder = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=eFolderPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	
	'Click on eFolder tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "eFolder"
	GUI_Object_WaitTillVisibleX objeFolder,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab",True
	'Validation for "Access to Document Tab" checkbox
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxItemState(objeFolder.SwfTreeView("swfname path:=treeViewTabs;AccessToDocumentTabPage;pnlTop.*"),"Access to Document Tab"),_
	"Personas->Closer->'eFolder' Tab","'Access to Document Tab' is checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),"All",True
	'Validation for "General" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;OtherPage;pnlGeneral;pnlLeft;pnlMiddle.*"),"All"),_
	"Personas->Closer->'eFolder' Tab","All options under 'General' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),"All",True
	'Validation for "Unprotected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnprotectedDocsPage;pnlUnprotectedDocs;pnlLeft;pnlMiddle.*"),"All"),_
	"Personas->Closer->'eFolder' Tab","All options under 'Unprotected Documents' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),FRM_DS_GetValue(objData,"eFolder_Conditions"),True
	'Validation for "Conditions" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;FeaturesPage;pnlConditions;pnlBottom.*"),_
	FRM_DS_GetValue(objData,"eFolder_Conditions"),"Yes"),"Personas->Closer->'eFolder' Tab",_
	"Default options under 'Conditions' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All",True
	'Validation for "Unassigned files" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;UnassignedFilesPage;pnlUnassignedFiles;pnlRight;pnlMiddle.*"),"All"),_
	"Personas->Closer->'eFolder' Tab","All options under 'Unassigned Files' section are in checked state"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),"All",True
	'Validation for "Protected Documents" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objeFolder.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ProtectedDocsPage;pnlProtectedDoc;pnlRight;pnlMiddle.*"),"All"),_
	"Personas->Closer->'eFolder' Tab","All options under 'Protected Documents' section are in checked state"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objeFolder = Nothing

End If

'trades tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1331",_
"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objContactsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=ContactsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	
	'Click on "Trades/Contacts/Dashboard/Reports" Tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Trades/Contacts/Dashboard/Reports"
	GUI_Object_WaitTillVisibleX objContactsPage,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),_
	"Access to Trades Tab", False
	'Validation for "Trades" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExTrades;pnlExLeft.*"),"None"),_
	"Personas -> 'Trades/Contacts/Dashboard/Reports' Tab","'Access to Trades Tab' is in unchecked state"
	
	'Validatin for "Contacts" section
	Dim strContactsChecked, boolMatch,boolMatched
	
	boolMatch= GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*"),_
	"0;1;2;3;4;5;6;7;8;9;11;12;13;14;15;16;17;18;19;22;27")
	
	strContactsChecked=objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;panelContactPage;pnlExLeft.*").GetCheckMarks
	If (Instr(1,strContactsChecked,"20;21",0))>0 Then
		 boolMatched =True
	Else 
		boolMatched = False
	End If
	
	FRM_VerifyTrue (boolMatched and boolMatch), "Personas->Closer->'Trades/Contacts/Dashboard/Reports' Tab","Default options are in checked state under 'Contacts' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),_
	FRM_DS_GetValue(objData,"Trades_Dashboard"),True
	'Validatin for "Dashboard" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlDashboard;pnlExDashboard.*"),_
	FRM_DS_GetValue(objData,"Trades_Dashboard"),"Yes"),_
	"Personas->Closer->'Trades/Contacts/Dashboard/Reports' Tab","Default options are in checked state under 'Dashboard' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"All",False
	'Validatin for "Reports" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objContactsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ContactsMgrPage;pnlExReports;pnlExRight.*"),"None"),_
	"Personas->Closer->'Trades/Contacts/Dashboard/Reports' Tab","No options are in checked state under 'Reports' section"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objContactsPage = Nothing
	
End If

'settings tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1333",_
"Verify access rights under 'Settings' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
Set objSettingsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=SettingsPage")
Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")

'Click on "Settings" Tab for selected Persona
GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Settings"
GUI_Object_WaitTillVisibleX objSettingsPage,60


GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
FRM_DS_GetValue(objData,"Settings_CompanySettings"), True
'Validation for "Company Settings" section
FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
FRM_DS_GetValue(objData,"Settings_CompanySettings"),"Yes"),_
"Personas->Closer->'Settings' Tab","Default options are in checked state under 'Company Settings' section"

GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"All",False
'Validation for "Other" section
FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"None"),_
"Personas->Closer->'Settings' Tab","No options are in checked state under 'Other' section"


GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
FRM_DS_GetValue(objData,"Settings_PersonalSettings"),True
'Validation for "Personal Settings" section
FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
FRM_DS_GetValue(objData,"Settings_PersonalSettings"),"Yes"),_
"Personas->Closer->'Settings' Tab","Default options are in checked state under 'Personal Settings' section"

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
'Create user "closer1" with Closer persona if not already existing
BIZ_OrganizationUsers_CreateUser "ptac1679_Closer"

BIZ_Nav_Settings_Close()

BIZ_Login_UserLogout()

'Login as "closer1" user
BIZ_Login_UserLogin "1679_Closer"

'pipeline tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Pipeline")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1327",_
"Verify access rights under 'Pipeline' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Dim boolItemExist
	
	'select pipeline tab
	BIZ_Nav_SelectPipelineTab()
	
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfObject("swfname:=flowLayoutPanel1"),30
	
	'verify "New loan" icon should not be displayed
	boolItemExist = GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfObject("swfname:=btnNew"),3)
	
	FRM_VerifyFalse boolItemExist,"New loan icon","'New Loan' Icon should not be displayed for user 'closer1'"
	
End If

'loan tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Loan")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1328",_
"Verify access rights under 'Loan' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'select loan folder and create new blank loan
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Closer - Default View","My Pipeline"
	
	'open first loan in Pipeline View
	GUI_List_ClickOnCellData objMainView.SwfObject("swfname:=gvLoans"),0,2,True,True,False,"Double"
	
	'handle for read only locked loan
	GUI_Dialog_Encompass_YesX 5,""
	
	'handle for status of the loan is Application withdrawn
	GUI_Dialog_Encompass_OKX 5,""
	
	'Validation of "print" button under Loans tab
	GUI_Object_ValidateExists objMainView.SwfWindow("swfname:=LoanPage").SwfObject("swfname:=printBtn"),60,_
	"'Print' button is displayed under 'Loans' tab in a loan for user 'closer1'"
	
	Set objMainView = Nothing
	
End If

'forms
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Forms")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1329",_
"Verify access rights under 'Forms/Tools' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'Select Forms tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
	BIZ_Forms_ShowAll()
	
	'Borrower Information-Vesting form validation
	FRM_VerifyTrue GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emFormMenuBox"),"Borrower Information - Vesting"),_
	"Verify Borrower Information - Vesting", "'Borrower Information - Vesting' form should be displayed under Forms tab for user 'closer1'"
	
	'Select Tools tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Tools"
	
	'Verify Funding Worksheet tool exists
	FRM_VerifyTrue GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emToolMenuBox"),"Funding Worksheet"),_
	"Verify Funding Worksheet","'Funding Worksheet' should be displayed under Tools tab for user 'closer1'"
	
	Set objMainView=Nothing
	
End If

'efolder
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "efolder")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1330",_
"Verify access rights under 'eFolder' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	BIZ_Nav_SelectLoanTab()
	
	BIZ_Nav_eFoler_Open()
	GUI_Object_WaitTillVisibleX SwfWindow("swfname:=eFolderDialog"),10
	
	'Validate edit document option disabled
	GUI_Object_ValidateDisabled SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=btnEdit"),_
	"'Edit Document' option under eFolder for user 'closer1'"
	
	BIZ_Nav_eFoler_Close()
	
	
End If

'BIZ_Nav_SelectLoanTab()
'BIZ_Loan_Exit "False"

'trades
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Trades")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1331",_
"Verify access rights under 'Trades/Contacts/Dashboard/Reports' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Dim objMainView, boolReportsExist
	
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'verify reports tab not displayed
	boolReportsExist=GUI_List_VerifyItemExists(objMainView.SwfTab("swfname:=tabControl"),"Reports")
	
	FRM_VerifyFalse boolReportsExist,"Reports Tab", "'Reports' Tab should not be displayed for user 'closer1'"
	
	Set objMainView=Nothing

End If

'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "Settings")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1333",_
"Verify access rights under 'Settings' tab of Encompass Settings for Closer persona and re-enforcement validations",Null

	Dim objTreeView
	
	'Navigate to Settings > Docs Setup
	BIZ_Settings_ExpandTreeView "Docs Setup"
	
	Set objTreeView=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTreeView("swfname:=treeView")
	
	'Validate options under Settings -> Docs Setup
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"eDisclosure Plan Codes"),"Settings -> Docs Setup","'eDisclosure Plan Codes' option is displayed"
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"Closing Doc Plan Codes"),"Settings -> Docs Setup","'Closing Doc Plan Codes' option is displayed"
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"Closing Doc Stacking Templates"),"Settings -> Docs Setup",_
	"'Closing Doc Stacking Templates' option is displayed"
	
	Set objTreeView=Nothing
	
	BIZ_Nav_Settings_Close
	
	
End If
'BIZ_Nav_SelectLoanTab()
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

