'@**************************************************************************************************
'@ TestCase: E2E_Origination_Processing
'@ Includes steps from the following old test scripts
'@		- E2E_Step1_20655_Origination_BorrowerContact
'@ 		- E2E_Step2_20656_Origination_OrderingCredit
'@		- E2E_Step3_20659_Processing_ImportLiabilities
'@		- E2E_Step4_20666_Processing_OrderFraud
'@		- E2E_Step7_20673_Origination_CopyFromBorrower
'@	    - E2E_Step8_20674_Origination_CopyFromPresent
'@      - E2E_Step14_20710_Processing_OrderFlood
'@      - E2E_Step17_20714_Poduct&Pricing
'@ Object Repository: "Encompass360.tsr","EncompassSetting.tsr", "EncompassLoan.tsr"
'@ Pre-conditions: 
'@ Description:  
	'@ Test Step
		'- 1) Long as an Admin, set up pre-conditions of subsequent steps
		'-   a) Add user ID "cindy_processor" with "Loan Processor" persona
		'-      Add user ID "cindy_openor" with "Loan Opener" persona
		'-      Add user ID "cindy_officer" with "Loan Officer" persona
		'-   b) Add a default milestone template "E2E_MilestoneTemplate" for new loans if not already exists, 
		'-      Add "Qualification", "Processing", Submittal milestones to the template
		'-   c) Enable fraud service and start flood server for loan processor "cindy_processor"
		'-
		'- 2) Login as a Loan Officer "cindy_officer"
		'-   a) Go to Contacts tab, "Borrower Contacts" tab. 
		'-      Add a borrower contract if not already exists and click on the 'Originate Loan' button to originate a loan. 
		'-      If an 'Existing Loans' menu pops up, click on the 'Create New' button. If a co-borrower or Loan Template is 
		'-      to be used, then select on via the appropriate buttons. Select Loan Folder destination for the new loan,
        '-      then click the 'Continue' button
		'-      After the loan opens to the Borrower Summary - Origination form, 
		'-      Verify data from the Borrower Contact populated into the appropriate fields.  
		'-      Verify field 1393 should state 'Active' and the current date should be populated into field 745	
		'-   b) After a loan is originated via the Pipeline tab or Borrower Contacts, go to the Borrower Summary - Origination Form
		'-      Enter data in the Borrower Information Section on the Borrower Summary - Origination, click on the Copy from Borrower button. 
		'-      Borrower Contacts, go to the Borrower Summary - Origination Form
		'-   d) Click on the Copy from Present button, 
		'-      Verify the information should copied over from the Present Address to the following fields: 11, 12, 14, 15
	    '-      Verify information copied over correctly to Co-Borrower			
		'-   e) Originated via the Pipeline tab or Borrower Contacts, 
		'- 	     Go to the Borrower Summary - Origination Form and fill out necessary fields. 
		'-       Go to the Credit Information Section on the Borrower Summary - Origination form and
		'-	     click on the Order Credit button.  Enter the appropriate credentials & click the Finish button. 
		'-       go to the Credit Information Section on the Borrower Summary - Origination & click on the Order Credit button
		'-       Verify credit scores for the applicants should populate into fields once the credit report is 
		'-       imported into the loan file: 67, 1450, 1414, 60, 1452, 1415
		'-       Verify if user can get to Product and Pricing site without errors
		'-   f) In Milestones, finish the Qualification Milestone & assign the file to loan Processor "cindy_processor"
		'-
		'- 3) Login as a Loan Processor "cindy_processor", open the loan created in the previous step. 	
		'-   a) On the Borrower Summary - Processing, click on the 'Import Liabilities' button
		'-      Verify import liabilities from the credit report to page 2 of the 1003
		'-   b) Go to the Borrower Information Section on the Borrower Summary - Processing form & click on the Order Fraud button
		'-      Verify the user should be able to order Fraud successfully without any errors.
		'-   c) Go to the Subject Property Information section on the Borrower Summary - Processing & click on the Order Flood button
		'-      select the Order Type & Flood Product and click on the Order button
		'-      Verify the user should be able to order Flood Cert without errors.
		'-
'**************************************************************************************************

	FRM_RT_SetupTest(null)
	
	'======== Login to the Encompass as loan officer========     
	BIZ_Login_UserLogin "admin_qaauto"

	'======== Create a new User  persona for loan officer, loan processor and loan opener ========
	BIZ_OrganizationUsers_CreateUser "cindy_opener"
	BIZ_OrganizationUsers_CreateUser "cindy_processor"
	BIZ_OrganizationUsers_CreateUser "cindy_officer"
'
'	'=========Set milestone template==============
	BIZ_MilestoneTemplate_Delete "E2E_MilestoneTemplate"
	BIZ_MilestoneTemplate_SetDefaultForNewLoan  "E2E_MilestoneTemplate"
	BIZ_MilestoneTemplate_AddMilestone "Submittal"
	BIZ_MilestoneTemplate_SetMilestonePosition "Submittal", 3

	'========Set Persona Permission for the new user ==========
	BIZ_Nav_Settings_Personas_LoanTab	
	BIZ_Persona_Loan_FinishMilestones "Loan Officer", Array("Qualification","Processing","Submittal")
	Personas_Loan_CheckItemizationFeeItems
	BIZ_Persona_Loan_FinishMilestones "Loan Processor", Array("Processing","Submittal")
	BIZ_Persona_Loan_AssignLoanTeamMembers "Loan Officer", Array("Loan Officer","Loan Opener","Loan Processor")
	BIZ_Persona_Loan_AssignLoanTeamMembers "Loan Processor",Array("Underwriter","Loan Processor")

	'=========Make sure Loan processor have access to Order Fraud=============
	BIZ_Services_EnableFraudForUser "Test", "123", "cindy_processor"
	
	'=========Make sure Loan processor have access to Order Flood=============	
	BIZ_Services_StartFloodForUser "cindy_processor"
	AutoMersMinNumber
	BIZ_Nav_Settings_Close

	'=======-launch encompass as a Loan Officer=======
	BIZ_Login_UserLogin "cindy_officer"

	'Story 20655
	BIZ_Contacts_BorrowerContact_AddAndOriginateLoan("Shared_BorrowerInfo")
	BIZ_BorrowerSummaryOrigination_VerifyBorrower("Shared_BorrowerInfo")
	BIZ_Loan_Exit(False)
	
	'Story 20673
	BIZ_Pipeline_SelectLoanFolder "My Pipeline"
	BIZ_Loan_AddNewBlankLoan
	BIZ_BorrowerSummaryOrigination_SetBorrower "Shared_AutoTest"
	GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Copy From Borrower") 'Copy From Borrower
	BIZ_BorrowerSummaryOrigination_VerifyCoBorrower "Shared_AutoTest"
	
	'Story 20674
	'======go to the Subject Property Information Section on the Borrower Summary - Origination & click on the Copy from Present button=========
	GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Copy from Present")
	'========Make sure the information should copy over   from the Present Address to the following fields: 11, 12, 14, 15=========
	Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetBorrower", "Shared_AutoTest")
	GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_11"), objData.Item("PresentAddress"), "PresentAddress" '"5 JADE MEADOW DRIVE"
	GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_12"), objData.Item("PresentCity"), "PresentCity" '"Springfield"
	GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_14"), objData.Item("PresentState"), "PresentState" '"NJ"
	GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_15"), objData.Item("PresentZip"), "PresentZip" '"07081"	
	
	BIZ_Loan_Exit(False)
	
	'=========Originated  loan via the Pipeline tab and input related fielteds=============
	BIZ_Pipeline_SelectLoanFolder "My Pipeline"
	BIZ_Loan_AddNewBlankLoan	
	'ShowAllForms
	
	'========input data in the following fields:===============
	'		2626, 749, 4008, 4000, 4002, 65, 1402, 66, 52, 1240, 3537, 
	'		3538, 3539, 3540, 3541, FR0104, FR0106, FR0107, FR0108, 11, 12, 14, 15, 1041, 1821, 356, 19, 
	'		1172, 420, 1811, 608, 136, 1771, 1335, 1109, 763, 3, 1014, 4, 325
	'==========================================================
	BIZ_BorrowerSummaryOrigination_SetBorrower("Shared_BorrowerInfo")
	BIZ_BorrowerSummaryOrigination_SetCoBorrower("Shared_CoBorrowerInfo")
	BIZ_BorrowerSummaryOrigination_SetProperty("Shared_PropertyInfo")
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails("Shared_ConvPurchase")
	BIZ_BorrowerSummaryOrigination_TotalMonthlyPayment("Shared_Payment1")
	BIZ_BorrowerSummaryOrigination_SetBorrowerIncome("E2E_OP_Income5000")

	BorrowerSummaryOrigination_SetCreditInfo
	'Story 20656
	'=========Order credit========
	BIZ_Services_OrderCredit "CoreLogic Credco (Digital Certificate)","4228773","welcome1"
	'=========Make sure the credit scores for the applicants should populate into fields======================
	'=========once the credit report is imported into the loan file: 67, 1450, 1414, 60, 1452, 1415===========
	BIZ_BorrowerSummaryOrigination_VerifyCreditScores("E2E_OP_TESTCO")
		
	'======== In Milestones, finish the Qualification Milestone & assign the file to a Processor=============
	'user depends on Milestone setting. Different environments have different role assigned to milestone. 
	BIZ_Loan_FinishQualificationMilestone_AssignProcessor "cindy_opener", "cindy_processor" 
    'BIZ_Loan_FinishQualificationMilestone_AssignProcessor "cindy_processor", "underwriter"  
	'==============Get the current loan number==============
	BIZ_Loan_SaveLoanNumber()
	
	'Story 20714
	ST_20714_Services_ProductPricing()

	'========log into encompass as the Processor, open the same loan==========
	BIZ_Loan_Exit(True)	
	
	BIZ_Login_UserLogin "cindy_processor"
	BIZ_Pipeline_SelectLoanFolder "My Pipeline"
	BIZ_Loan_OpenByLoanNumber FRM_RT_GetPropValueRequired(g_FRM_Prop_LoanNo)

	'Story 20659
	'=======on the Borrower Summary - Processing, click on the 'Import Liabilities' button=====
	BIZ_Forms_Open "Borrower Summary - Processing"
		
	BIZ_Liabilities_Import()	
	BIZ_Liabilities_Verify("E2E_OP_TESTCO1")
	BIZ_Liabilities_Verify("E2E_OP_TESTCO2")
	BIZ_Liabilities_Verify("E2E_OP_TESTCO3")
	BIZ_Liabilities_Verify("E2E_OP_TESTCO4")

	'Story 20666	
	BIZ_Services_OrderFraud()
	
	'Click on the Order Flood button select the Order Type & Flood Product and click on the Order button
     Verify_Flood_Order
	
	'===== Exit Loan =======
	BIZ_Loan_Exit(False)
	
	'====== Logout Encompass360 ======
	BIZ_Login_UserLogout

	FRM_RT_TeardownTest(null)


'=======================================================================================
Function BorrowerSummaryOrigination_SetCreditInfo()
    strDate  = UTIL_Date_FormatDateByPattern(now, "mm/dd/yyyy")
	If SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboBorrowers").Exist(20) Then
	   iNumberOfBorrowerSets = SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboBorrowers").GetItemsCount
	End If
	SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=.*CheckBox48.*","index:=0").Set "ON"	
	SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=.*TextBox32.*","index:=0").Set strDate
	SwfWindow("swfname:=MainForm").Page("title:=.*").WebList("html id:=DropdownBox8","index:=0").Select "Face to Face"
	'If cInt(iNumberOfBorrowerSets) > 1  Then
	   SwfWindow("swfname:=MainForm").Page("title:=.*").WebCheckBox("html id:=.*CheckBox49.*","index:=0").Set "ON"
	   SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=.*TextBox31.*","index:=0").Set strDate	
	   SwfWindow("swfname:=MainForm").Page("title:=.*").WebList("html id:=DropdownBox9","index:=0").Select "Face to Face"
	'End If
	SwfWindow("swfname:=MainForm").Page("title:=.*").WebEdit("html id:=MultilineTextBox1","index:=0").Set "Automated Test text"	
End Function

Function ST_20714_Services_ProductPricing()
	FRM_Logger_ReportInfoEvent "Product and Pricing", "Check if user able to get to Product & Pricing page without errors", null
	BIZ_Forms_Open "Borrower Summary - Origination"
	Set objBSO = SwfWindow("swfname:=MainForm").Page("title:=.*")
    objBSO.WebEdit("html id:=l_1264","index:=0").Set "Test Lender"
	objBSO.WebCheckBox("html id:=.*CheckBox9.*","index:=0").Set "ON"	
	objBSO.WebEdit("html id:=l_1401","index:=0").Set "FHA"
	'===================click on the MERS MIN button next to field 1051 to populate the MERS MIN ==============
	If objBSO.WebEdit("html id:=l_1051","index:=0").GetROProperty("value")  = "" Then
		objBSO.WebButton("name:=MERS MIN","index:=0").Click
	End If
	
	'order Product & Pricing service
	Set objData = FRM_DS_GetGlobalTestData("Login", "epps_dev")
	strUserName = objData.Item("UserName")
	strUserPwd = objData.Item("UserPassword")
	Set objData = Nothing
	BIZ_Services_ProductAndPricing "Encompass Product and Pricing Service", strUserName, strUserPwd
	
	'=========Make sure the user should be able to get Product & Pricing without errors.========

    Set objTab = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfTab("swfname:=tabControl","index:=0") 	
    If SwfWindow("swfname:=MainForm").Page("title:=Encompass Product and Pricing Service").Exist(60) Then
		If objTab.GetSelection  = "Services View" Then 
			FRM_Logger_ReportPassEvent "20714_Services_ProductPricing", "The user got to Product & Pricing page without errors", null 
		Else
			FRM_Logger_ReportFailEvent "20714_Services_ProductPricing", "Services View Tab ws not selected", null
		End If
	Else		
		FRM_Logger_ReportFailEvent "20714_Services_ProductPricing", "The user did not get to Product & Pricing page", null
    End If

	BIZ_Nav_SelectLoanTab
	
End Function

Function AutoMersMinNumber()
	BIZ_Nav_HierarchyTree "Loan Setup", "Auto MERS MIN Numbering"
	If NOT SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfCheckBox("swfname:=autoChk").GetROProperty("checked") Then
		GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfCheckBox("swfname:=autoChk"),true
		GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnSave")
	End If
End Function

Function Personas_Loan_CheckItemizationFeeItems
	BIZ_Settings_Personas_Loan_CheckItemizationFeeItems Array("Fee Amounts;Borrower amount only")
	BIZ_Settings_Personas_Loan_CheckItemizationFeeItems Array("Fee Amounts;Seller amount, Seller Credit, Seller Obligated")
	BIZ_Settings_Personas_Loan_CheckItemizationFeeItems Array("Fee Amounts;Broker, Lender, Other amounts")		
End Function

Function Verify_Flood_Order()
	FRM_Logger_ReportInfoEvent "Order Flood", "Order Flood from Subject Property section", null	
	SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Order Flood","index:=0").Click
	If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").Exist(20) then
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfComboBox("swfname:=cboRequestType").Select "New"
	   GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfCheckBox("swfname:=chkBasic", "index:=0"),true
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfButton("swfname:=btnOrder").Click
	End if
	
	If SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfWindow("swfname:=DocumentViewer").Exist(60) Then
	   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfWindow("swfname:=DocumentViewer").SwfButton("swfname:=closeBtn","index:=0").Click
	   FRM_Logger_ReportPassEvent "Verify Order Flood", "Ordered Flood by clicking Order Button. The user was able to order Flood Cert without errors", null
    Else	
 	   FRM_Logger_ReportFailEvent "Verify Order Flood", "Ordered Flood by clicking Order Button. The user was NOT able to order Flood Cert without errors", null
	End If
	SwfWindow("swfname:=MainForm").SwfWindow("swfname:=LPSOrderDialog").SwfButton("swfname:=cancelBtn").Click       
	
End Function
