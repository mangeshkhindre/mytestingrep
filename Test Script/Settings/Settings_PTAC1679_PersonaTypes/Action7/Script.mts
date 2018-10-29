FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona Creation and Validation",_
"Verify access rights under 'Loan', 'Forms','Settings' tab of Encompass Settings for Custom Personas (External and Internal )and re-enforcement validations",Null

'Navigate to Personas in Settings
BIZ_Nav_Settings_Personas

'Create new persona
FRM_Logger_ReportStepEvent "Creating Custom Persona","Creating External persona with Access to All Features On",Null
Personas_CreatePersona_Validation "TC-ExtPersonaAll",True
FRM_Logger_ReportStepEvent "Creating Custom Persona","Creating Internal persona with Access to No Features On",Null
Personas_CreatePersona_Validation "TC-IntPersonaNo",True

BIZ_Settings_Personas_SelectPersona "AutoInternalPersona"

'Loans tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Loan' tab of Encompass Settings for AutoInternal persona and re-enforcement validations",Null

	Dim objSettings,objPersonaLoanTab,arrBoolChecked(2),boolCheckedStatus
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPersonaLoanTab= objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=LoansPage")
		
	'Click on "Loan" tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Loan"
	
	GUI_Object_WaitTillVisibleX objPersonaLoanTab,60
	
	GUI_Object_ValidateText objPersonaLoanTab.SwfLabel("swfname:=lblMilestoneMgr"),"The persona does not have access to the Pipeline, Loan, Forms and Tools, ePass tabs.","Text should match"
	
	Set objData = Nothing
	Set objSettings=Nothing
	Set objPersonaLoanTab=Nothing
End If

'Forms Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "FormsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Forms' tab of Encompass Settings for AutoInternal persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	'Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_Closer")
	'click on Forms/Tools tab
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Forms/Tools"
	'GUI_Object_WaitTillVisibleX objSettings.SwfObject("swfname:=gvInputForms"),60
	GUI_Object_ValidateText objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfLabel("swfname:=lblNoAccess"),"The persona does not have access to the Pipeline, Loan, Forms and Tools, ePass tabs.","Text should match"
		 
	Set objSettings = Nothing
	
End If

'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "SettingsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then

	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Settings' tab of Encompass Settings for AutoInternal persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objSettingsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=SettingsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","AutoInternalPersona")
	
	'Click on "Settings" Tab for selected Persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Settings"
	GUI_Object_WaitTillVisibleX objSettingsPage,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"), False
	'Validation for "Company Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"),"No"),_
	"Personas->Loan Officer->'Settings' Tab","Default options are in unchecked state under 'Company Settings' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"All",False
	'Validation for "Other" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"None"),_
	"Personas->Loan Officer->'Settings' Tab","No options are in checked state under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),False
	'Validation for "Personal Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),"No"),_
	"Personas->Loan Officer->'Settings' Tab","Default options are in unchecked state under 'Personal Settings' section"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objSettingsPage = Nothing
End If

BIZ_Settings_Personas_SelectPersona "AutoExternalPersona"

'Loans tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Loan' tab of Encompass Settings for AutoExternal persona and re-enforcement validations",Null

'	Dim objSettings,objPersonaLoanTab,arrBoolChecked(5),boolCheckedStatus
	Dim arrBoolCheckedExt(5)
	
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPersonaLoanTab= objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=LoansPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOfficer")
	
	'Click on "Loan" tab for selected persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Loan"
	
	GUI_Object_WaitTillVisibleX objPersonaLoanTab,60
	
	'Verify Milestone/Workflow Management section
	arrBoolCheckedExt(0)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxAcceptFiles"),"checked")
	arrBoolCheckedExt(1)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxReturnToLastMilestone"),"checked")
	arrBoolCheckedExt(2)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxChangeDate"),"checked")
	arrBoolCheckedExt(3)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxFinishMilestone"),"checked")
	arrBoolCheckedExt(4)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxSetLoanAssociate"),"checked")
	arrBoolCheckedExt(5)=GUI_Object_GetPropertyValue(objPersonaLoanTab.SwfCheckBox("swfname:=chkBoxComments"),"checked")
	
	boolCheckedStatus = True
	For i=0 To Ubound(arrBoolCheckedExt) Step 1
		If arrBoolCheckedExt(i)=False Then
			boolCheckedStatus = False
		End If
	Next
	
	FRM_VerifyTrue boolCheckedStatus,"Personas->Loan Officer->'Loan' Tab","Default options in 'Milestone/Workflow Management' section are checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All",True
	'Itemization Fee Management section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlFeeItms;pnlExLeft.*"),"All"),_
	"Personas->Loan Officer->'Loan' Tab","All options are selected under 'Itemization Fee Management' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All",True
	'Print section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;LoansPrintPage;pnlLoanPrint;pnlExPrint.*"),"All"),_
	"Personas->Loan Officer->'Loan' Tab","All options are checked under 'Print' section"
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),FRM_DS_GetValue(objData,"Loan_Other"),True
	'Other section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ClosingPage;pnlExClosing;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_Other"),"Yes"),_
	"Personas->Loan Officer->'Loan' Tab","Default options are checked under 'Other' section"
	
	GUI_SwfTreeView_SetCheckBoxItemStates objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),FRM_DS_GetValue(objData,"Loan_ClosingDocs"),True
	'Closing Docs section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objPersonaLoanTab.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PersonaTreePageBase;pnlExDocs;pnlExRight.*"),_
	FRM_DS_GetValue(objData,"Loan_ClosingDocs"),"Yes"),_
	"Personas->Loan Officer->'Loan' Tab","Default options are checked under 'Closing Docs' section"
	
	Set objData = Nothing
	Set objPersonaLoanTab=Nothing
	Set objSettings=Nothing

	
End If

'Forms Tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "FormsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Forms' tab of Encompass Settings for AutoExternal persona and re-enforcement validations",Null
		
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOfficer")
	
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
	FRM_VerifyTrue boolInputFormsChecked,"Personas->Loan Officer->'Forms/Tools' Tab","Default options under 'Input Forms' section are checked"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),True
	'Validation for Tools section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;ToolsPage;pnlExTools;pnlBase;FormsToolsConfig;tabPageFormsTools;tabControl1.*"),_
	FRM_DS_GetValue(objData,"FormsTools_Tools"),"Yes"),_
	"Personas->Loan Officer->'Forms/Tools' Tab","Default options under 'Tools' section are checked"
	
	Set objData = Nothing
	Set objSettings = Nothing
	
	
End If

'settings tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "SettingsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then

	FRM_Logger_ReportStepEvent "Start Test Case: Custom Persona",_
"Verify access rights under 'Settings' tab of Encompass Settings for AutoExternal persona and re-enforcement validations",Null

	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objSettingsPage = objSettings.SwfWindow("swfname:=PersonaSettingsMainForm").SwfWindow("swfname:=SettingsPage")
	Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup","Verify_PersonaAccessRights","1679_LoanOfficer")
	
	'Click on "Settings" Tab for selected Persona
	GUI_SwfTab_Click objSettings.SwfTab("swfname:=tabControl1"), "Settings"
	GUI_Object_WaitTillVisibleX objSettingsPage,60
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"), True
	'Validation for "Company Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsCompanyPage;pnlExCompanySettings.*"),_
	FRM_DS_GetValue(objData,"Settings_CompanySettings"),"Yes"),_
	"Personas->Loan Officer->'Settings' Tab","Default options are in checked state under 'Company Settings' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"All",False
	'Validation for "Other" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckBoxes(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;GeneralGlobalPage;pnlExFormBuilde.*"),"None"),_
	"Personas->Loan Officer->'Settings' Tab","No options are in checked state under 'Other' section"
	
	
	GUI_SwfTreeView_SetCheckBoxItemStates objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),True
	'Validation for "Personal Settings" section
	FRM_VerifyTrue GUI_SwfTreeView_ValidateCheckboxesItemStates(objSettingsPage.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;SettingsPersonalPage;panelPersonalPage.*"),_
	FRM_DS_GetValue(objData,"Settings_PersonalSettings"),"Yes"),_
	"Personas->Loan Officer->'Settings' Tab","Default options are in checked state under 'Personal Settings' section"
	
	Set objData = Nothing
	Set objSettings = Nothing
	Set objSettingsPage = Nothing
End If

'=============================re-enforcement=============================

BIZ_Nav_Settings_OrganizationUsers()
Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
objSettings.SwfTreeView("swfname:=hierarchyTree").Select "Administration"
'Create user "autointernal" with AutoInternalPersona  if not already existing
BIZ_OrganizationUsers_CreateUser "ptac1679_AutoInternalPersona"
'Create user "autoexternal" with AutoExternalPersona  if not already existing
BIZ_OrganizationUsers_CreateUser "ptac1679_AutoExternalPersona"

BIZ_Nav_Settings_Close()

BIZ_Login_UserLogout()

'Login as "1679_AutoInternal" user
FRM_Logger_ReportStepEvent "Logging In As AutoInternal User",_
	"Verify 'Loan' tab and 'Forms' Tab and 'Settings' of Encompass Settings for AutoInternal persona and re-enforcement validations",Null
	
BIZ_Login_UserLogin "1679_AutoInternal"

'loan and forms tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then

	FRM_Logger_ReportStepEvent "Start Test Case: PTValidating Loan tab",_
	"Verify 'Loan' tab and 'Forms' Tab of Encompass Settings for AutoInternal persona and re-enforcement validations",Null
	
	intTabIndex = BIZ_Nav_WaitForTabControl("Pipeline")
  
  	If intTabIndex = -1 Then
     	FRM_Logger_ReportPassEvent "Persona Type - AutoInternal","As Persona Type is Internal and Access to All Features is No, Loan Tab is not present for user", null 
  		FRM_Logger_ReportPassEvent "Persona Type - AutoInternal","As Persona Type is Internal and Access to All Features is No, Forms Tab is not present for user", null 
   	ELSE
  		FRM_Logger_ReportFailEvent "Persona Type - AutoInternal","As Persona Type is Internal and Access to All Features is No, Loan Tab is still present for user", null 
  		FRM_Logger_ReportFailEvent "Persona Type - AutoInternal","As Persona Type is Internal and Access to All Features is No, Forms Tab is still present for user", null 
  	End If    
     
End If

'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "SettingsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Validating Settings option",_
	"Verify access rights under 'Settings' tab of Encompass Settings for AutoInternal persona and re-enforcement validations",Null
	
	'Navigate to Settings > Loan Setup
	BIZ_Settings_ExpandTreeView "Loan Setup"
	
	Set objSetupContainer=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTreeView("swfname:=treeView")
	
	'Validate options under Settings > Loan Setup
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Custom Print Forms"),"Settings -> Loan Setup",_
	"'Custom Print Forms' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Print Form Groups"),"Settings -> Loan Setup",_
	"'Print Form Groups' option is displayed"
	
	'Loan Templates
	BIZ_Settings_ExpandTreeView "Loan Templates"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Loan Programs"),"Settings -> Loan Templates",_
	"'Loan Programs' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Closing Costs"),"Settings -> Loan Templates",_
	"'Closing Costs' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Input Form Sets"),"Settings -> Loan Templates",_
	"'Input Form Sets' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Settlement Service Providers"),"Settings -> Loan Templates",_
	"'Settlement Service Providers' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Affiliated Business Arrangement Templates"),"Settings -> Loan Templates",_
	"'Affiliated Business Arrangement Templates' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Document Sets"),_
	"Settings -> Loan Templates","'Document Sets' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Task Sets"),"Settings -> Loan Templates",_
	"'Task Sets' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Data Templates"),"Settings -> Loan Templates",_
	"'Data Templates' option is displayed"
	
	FRM_VerifyTrue GUI_List_VerifyItemExists(objSetupContainer,"Loan Template Sets"),"Settings -> Loan Templates",_
	"'Loan Template Sets' option is displayed"
	
	Set objSetupContainer=Nothing
	
	BIZ_Nav_Settings_Close()
End If
BIZ_Login_UserLogout()


'Login as "1679_AutoExternal" user
FRM_Logger_ReportStepEvent "Logging In As AutoExternal User",_
	"Verify 'Loan' tab and 'Forms' Tab and 'Settings' of Encompass Settings for AutoExternal persona and re-enforcement validations",Null
	
BIZ_Login_UserLogin "1679_AutoExternal"

'loan  tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "LoanCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	
	'Dim objSettings,objPersonaLoanTab,boolCheckedStatus
	
	
	FRM_Logger_ReportStepEvent "Start Test Case: Validating Loan tab",_
	"Verify 'Loan' tab of Encompass Settings for AutoExternal persona and re-enforcement validations",Null
	Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	Set objPipelineTasks=objSettings.SwfTreeView("swfname path:=treeViewTabs;gcTreeView;PipelinePage;pnlExRight;pnlExBottom;PipelineConfiguration;tabPagePipeline.*")
	
	'Click on Pipeline tab for selected persona
	BIZ_Nav_SelectPipelineTab()
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	BIZ_Pipeline_SelectPipelineViewAndLoanFolder "","My Pipeline"
	
	'create new blank loan
	BIZ_Loan_AddNewBlankLoan()
	
	'Validation of "print" button under Loans tab
	GUI_Object_ValidateExists objMainView.SwfWindow("swfname:=LoanPage").SwfObject("swfname:=printBtn"),60,_
	"'Print' button is displayed under 'Loans' tab in a loan for user 'autoexternal'"
	
	Set objMainView = Nothing 
	 
     
End If

'forms tab
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "FormsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then

	FRM_Logger_ReportStepEvent "Start Test Case: Validating Forms Tab",_
	"Verify access rights under 'Forms/Tools' tab of Encompass Settings for autoexternal persona and re-enforcement validations",Null
	
	'Dim objMainView
	Set objMainView = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen")
	
	'Select Forms tab in a loan
	GUI_List_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
	BIZ_Forms_ShowAll()
	
	'Borrower Information Vesting validation
	FRM_VerifyTrue GUI_List_VerifyItemExists(objMainView.SwfList("swfname:=emFormMenuBox"),"Borrower Information - Vesting"),_
	"Verify Borrower Information - Vesting", "'Borrower Information - Vesting' form should be displayed under Forms tab for user 'autoexternal'"
	
	BIZ_Loan_Exit "False"
	
	Set objMainView=Nothing
End If


'settings
Set objData=FRM_DS_GetTestData("Setttings_CompanyUserSetup", "PersonaTypes", "SettingsCustom")
strExecutionFlag=FRM_DS_GetValue(objData, "ExecutionFlag")
If lcase(strExecutionFlag)= "yes" Then
	FRM_Logger_ReportStepEvent "Start Test Case: Validating Settings option",_
	"Verify access rights under 'Settings' tab of Encompass Settings for AutoExternal persona and re-enforcement validations",Null
	
	'Navigate to Settings > eFolder Setup > Document Training
	BIZ_Nav_HierarchyTree "eFolder Setup","Document Training"
	
	'Validate Document Training
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfLabel("text:=Document Training"),20,_
	"'Document Training' visible in Encompass Settings for user 'autoexternal'"
	
	'Navigate to Settings > Docs Setup
	BIZ_Settings_ExpandTreeView "Docs Setup"
	
	Set objTreeView=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfTreeView("swfname:=treeView")
	
	'Validate options under Settings -> Docs Setup
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"eDisclosure Plan Codes"),"Settings -> Docs Setup","'eDisclosure Plan Codes' option is displayed"
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"Closing Doc Plan Codes"),"Settings -> Docs Setup","'Closing Doc Plan Codes' option is displayed"
	FRM_VerifyTrue GUI_List_VerifyItemExists(objTreeView,"Closing Doc Stacking Templates"),"Settings -> Docs Setup",_
	"'Closing Doc Stacking Templates' option is displayed"
	
	Set objTreeView=Nothing
	
	BIZ_Nav_Settings_Close()
End If
BIZ_Login_UserLogout()

'==========================================================


'This function is used to Create a persona
    '@code
    '    Personas_CreatePersona_Validation(strRowID)
    '@endcode
    '@param strRowID - RowID of the datasheet containing Persona details
    '@param boolTPOFlagPresent - TPO flag passed as True if Set On 
    
    Function Personas_CreatePersona_Validation(strRowID,boolTPOFlagPresent)
	    FRM_Logger_ReportInfoEvent "Create a Persona", " Creating a Persona Type As "&strRowID, null
	    
		Dim objSettings,objPersonasList,objScrollBar,isExisted
	    Set objSettings = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
	    Set objPersonasList = objSettings.SwfListView("swfname:=lvPersona")	    
	    
	    Set objData = FRM_DS_GetTestData("Setttings_CompanyUserSetup", "Persona_CreatePersona", strRowID)
	    If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "PersonaName")) Then
	       strPersonaName = FRM_DS_GetValue(objData, "PersonaName")
	    End If
	    If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "AccessToAllFeatures")) Then
	       strAccessToAll = FRM_DS_GetValue(objData, "AccessToAllFeatures")
	       If strAccessToAll = "Yes" Then
	          boolIsAccessToAll = True 
	       Else
	          boolIsAccessToAll = False  
	       End If
	    End If
	    If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "PersonaType")) Then
	       strPersonaType = FRM_DS_GetValue(objData, "PersonaType")
	    End If
	    
        isExisted = False
        For i = 0 to objPersonasList.GetItemsCount -1
            If objPersonasList.GetItem(i)=strPersonaName Then
            	isExisted = True
            	Exit FOr
            End If       	
        Next
	    	    
	    'if the Persona doesn't exist,add the persona
	    If not isExisted Then
	    	GUI_SwfObject_Click objSettings.SwfObject("swfname:=stdIconBtnAdd")
	    	If objSettings.SwfWindow("swfname:=PersonaNameDlg").Exist(1)  Then
	    	    FRM_Logger_ReportPassEvent "Persona Creation Window ", "Persona Window Pop-Up Dialog Box appears", null
	        Else
		        FRM_Logger_ReportFailEvent "Persona Creation Window ", "Persona Window Pop-Up Dialog Box Doesnt appear", null
	        End If
	    	
		    GUI_SwfEdit_Set objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfEdit("swfname:=textBoxPersonaName"),strPersonaName
            If boolIsAccessToAll Then
        	    GUI_SwfRadioButton_Click objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfRadioButton("swfname:=rbtnAccessToAll")
        	End If
            FRM_Logger_ReportStepEvent "Validating The Label in Persona Dialog Box","Label should contain Start with",Null      
            GUI_Object_ValidateText objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfLabel("swfname:=label2"),"Start with:","Label Should Match"
            
            
            If boolTPOFlagPresent Then
                FRM_Logger_ReportStepEvent "Validating the Persona Type Section"," Persona Type Section should appear below Start With Section",Null 
                GUI_Object_ValidateText objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfLabel("swfname:=label4","Location:={X=9,Y=6}"),"Persona Type:","Persona Type Section should appear below Start with section"
                
                FRM_Logger_ReportStepEvent "Validating the Persona Type Checkboxes"," Internal Checkbox and Internal Text should appear",Null 
                GUI_Object_ValidateExists objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),2,"Internal Checkbox Should Exist"
                GUI_Object_ValidateText objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),"Internal","Internal Text Should Be Displayed"
            
                FRM_Logger_ReportStepEvent "Validating the Persona Type Checkboxes"," External Checkbox and External Text should appear",Null 
                GUI_Object_ValidateExists objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),2,"External Checkbox Should Exist"
                GUI_Object_ValidateText objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),"External","External Text Should Be Displayed"
                
                FRM_Logger_ReportStepEvent "Validating the Default Value of Persona Type Checkboxes","External Checkbox and Internal Checkbox should be unchecked by default",Null    
                GUI_Object_ValidateChecked objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),False,"External Checkbox should be unchecked by default"
                GUI_Object_ValidateChecked objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),False,"Internal Checkbox should be unchecked by default"             
                
                If strPersonaType = "Internal" Then
                    GUI_SwfCheckbox_Set objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),True
                ElseIf strPersonaType = "External" Then    
                    GUI_SwfCheckbox_Set objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),True
                ElseIf strPersonaType = "Both" Then    
                    GUI_SwfCheckbox_Set objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),True
                    GUI_SwfCheckbox_Set objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),True
                End If
                GUI_SwfButton_Click objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfButton("swfname:=btnOK")
                If objSettings.SwfWindow("swfname:=PersonaNameDlg").Dialog("text:=Encompass").Exist(1) Then
                    FRM_Logger_ReportStepEvent "Validate When No Persona Type is Selected and User Should Click on OK","Error Pop Up Message Should Be Displayed",Null 
                    BIZ_BR_LoanActionCompletion_ValidateContent objSettings.SwfWindow("swfname:=PersonaNameDlg").Dialog("text:=Encompass").Static("micClass:=Static","height:=15"),"Please select a persona type."
                    GUI_WinButton_Click SwfWindow("swfname:=PersonaNameDlg").Dialog("text:=Encompass").WinButton("text:=OK")
                    GUI_SwfButton_Click objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfButton("swfname:=button1")
                End If
            Else
                FRM_Logger_ReportStepEvent "Validating the Persona Type Section if TPOAdminAccess Flag is Set to False"," Persona Type Section Should Not appear below Start With Section",Null 
                GUI_Object_ValidateNotExists objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkExternal"),2,"External Checkbox Should Not Be Present"
                GUI_Object_ValidateNotExists objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfCheckBox("swfname:=chkInternal"),2,"Internal Checkbox Should Not Be Present"                    
                GUI_SwfButton_Click objSettings.SwfWindow("swfname:=PersonaNameDlg").SwfButton("swfname:=button1")
            End If
                 
	    End If
	    Set objSettings = Nothing
        Set objPersonasList = Nothing
        
	End Function
	
	
	
	'==================================================
	


