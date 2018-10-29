'@**************************************************************************************************
'@ TestCase: E2E_eFolder_DocumentTab
'@ Includes the following old test scripts
'@		- E2E_Step23_20742_eFolder_DocTab_RequestButton
'@ 		- E2E_Step24_20747_eFolder_DocTab_eDisclosureButton
'@		- E2E_Step25_20748_eFolder_DocTab_DocManagerButton
'@ Object Repository: "Encompass360.tsr","EncompassSetting.tsr", "EncompassLoan.tsr"
'@ Pre-conditions: 
	'@ Step
		'- 1) Login to the Encompass as admin
		'- 2) Go to Settings and create "Loan Officer" user
		'- 3) Set the access right for persona
		'- 4) Set  the access right to tools->Disclosure Tracking  for "Loan Officer"
		'- 5) Set general eFolder access right for "Loan Officer"
		'- 6) Set the access right to EDocument for loan officer user 
'@ Description:  
	'@ Test Step
		'1) As a Loan Officer after a loan is originated via the Pipeline tab or Borrower Contacts, go to the Borrower Summary - Origination Form
		'2) Input data in the following fields:  2626, 749, 4008, 4000, 4002, 65, 1402, 66, 52, 1240, 3537, 3538, 3539, 3540, 3541, FR0104, FR0106, FR0107, FR0108, 11, 12, 14, 15, 1041, 1821, 356, 1264, 1401, 1481, 1051, 19, 1172, 420, 1811, 608, 136, 1771, 1335, 1109, 763, 3, 1014, 4, 325
		'3) Then click on the Edit icon next to field 912
		'4) Then click on the Edit Icons next to the following fields & enter the appropriate date in each of the fields:  229, 230, 1405, 232, 233, 234
		'5) On the Forms tab click on the REGZ - LE & enter the First Payment Date in field 682.
		'6) Click on the Prepayment Penalty button, enter data, & click on the Close button
		'7) In the Late Charge section, click on the Get Late Fee button. Info should automatically populate
		'8) On the Forms tab click on the 2015 Itemization
		'9) Enter the appropriate fees in sections 800-1300.
		'10) Click on the Tools tab & click on the Disclosure Tracking Tool
		'11) Click on the Add (+) icon 
		'12) Check the Disclosure checkbox, click on LE, check Settlement Provider List, & Safe Harbor
		'13) Click on eFolder
		'14) Click on the Request button
		'15) Click on the Add (+) icon
		'16) Select document & click on the Add button
		'17) Click on the Send button
		'18) When the Send Request menu pops-up, make sure the Borrower & Co-Borrowers email address has been populated
		'19) Click on the Send button
		'20) Click Ok
		'21) Click on the eFolder button
	'@ Expected Result
		'- The Document should be added to the Documents tab in eFolder without errors
'**************************************************************************************************

'@**************************************************************************************************
'@ TestCase: E2E_eFolder_PreCondTab
'@ Includes the following old test scripts
'@		- E2E_20752_eFolder_PreCondTab
'@ Object Repository: "Encompass360.tsr","EncompassSetting.tsr", "EncompassLoan.tsr"
'@ Pre-conditions: 
'@ Description:  
	'@ Test Step
		'- As a Loan Officer after a loan is originated via the Pipeline tab or Borrower Contacts, go to the Borrower Summary - Origination Form
		'- log into Encompass as Loan Officer		
		'- click on eFolder
		'- click on the Preliminary Conditions tab
		'- click on the Add (+) icon
		'- click on Add A New Condition 
		'- click Ok		
	'@ Expected Result
		'- The previously added conditions should appear in the Preliminary Conditions tab in eFolder without errors.		
'@ Revision History:
	'11/24/2015	Sven.Gao&Xin	Draft Script.
	'12/02/2015 Sven.Gao&Xin	Draft Script.
	'12/22/2015 Sven.Gao	Update Script.
	'*************************************************************************************************

FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'======== Go to Settings and create "Loan Officer" user ========
BIZ_OrganizationUsers_CreateUser "doctab_officer"

'======== Set the access right to tools->Disclosure Tracking  for "Loan Officer" ========
BIZ_Nav_Settings_Personas
BIZ_Personas_FormsTools_AccessRight "Loan Officer", Array("Disclosure Tracking")

'======Set Conditions eFolder access right for persona======
BIZ_Personas_eFolder_Conditions_AccessRight "Loan Officer", Array("Preliminary Conditions Tab")

'======== Set general eFolder access right for "Loan Officer" ========
BIZ_Personas_eFolder_General_AccessRight "Loan Officer", Array("Create/Duplicate Documents","Request Borrower Documents","Request Ellie Mae Network Services")

'======== Set the access right to Loan->other for "Loan Officer" ========
BIZ_Personas_Loan_Other_AccessRight "Loan Officer", Array("Change RESPA-TILA Form Version")

'======== Set the access right to EDocument for loan officer user "docTab_officer"=========
BIZ_Nav_Settings_EDocumentManagement
BIZ_EDocManagement_AccessRight Array("doctab_officer")

'====== Logout Encompass360 ======
BIZ_Login_UserLogout

'======== Loan Officer user log in =======
BIZ_Login_UserLogin "doctab_officer"

'==========Open a new loan======	
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","Automation"

'======== Go to he Borrower Summary - Origination Form and input data for some fields ========
BIZ_BorrowerSummaryOrigination_SetBorrower("Shared_BorrowerInfo")
BIZ_BorrowerSummaryOrigination_SetCoBorrower("Shared_CoBorrowerInfo")
BIZ_BorrowerSummaryOrigination_SetProperty("Shared_PropertyInfo")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("26600_TransactionDetail")

'=============Click Edit icon for field 912 and enter values =========================
BIZ_BorrowerSummaryOrigination_TotalMonthlyPayment("Shared_Payment1")

'========== Go to REGZ - LE & enter value for  "First Payment Date"(682), Click "Prepayment Penalty","Get Late Fee" ==============
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetDisclosureInformation("Shared_DisclosureInfo1")
BIZ_RegZ_LE_SetPrepaymentPenalty("Shared_Prepayment1")
BIZ_RegZ_LE_GetLateFee

GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox7"), "of the payment"

'======== Go to the 2015 Itemization  and enter the appropriate fees in sections 800-1300. ===========
BIZ_Forms_Open "2015 Itemization" 
BIZ_2015Itemization_SetE2EBasicData("Shared_BasicData1")

'========== Go to Closing Disclosure Page 1 ==============
BIZ_Forms_Open "Closing Disclosure Page 1"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebEdit("html id:=I_748"), Date

'======== Input some required fields for sending eDsiclousre ===========
BIZ_USDAMangement_SelectInterestBasisDays("Shared_InterestBasisDays")

'============ Loan Save ==========
BIZ_Loan_Save
     
'======== Go to Tools tab & click on the Disclosure Tracking Tool,Add disclousre for  LE, check Settlement Provider List, & Safe Harbor=====
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTrackingTool_AddDisclosure True, "LE", True, True

'======== Go to eFolder and send Request ========
BIZ_Nav_eFoler_Open()
BIZ_Documents_SendRequest("Shared_SendRequest1")

'======== Verify the send requested documents listed in the Documents tab ======
BIZ_Documents_VerifyDocumentExist("E2E_DocumentTab_SendRequest")

'======== Verify the send requested documents listed in the Document Manager window ======
BIZ_Documents_DocumentManager_VerifyDocumentExist("E2E_DocumentTab_SendRequest")

'======== Send eDisclosure ======
BIZ_Documents_SendeDisclosure "Shared_AllFixedRateConv", "E2E_DocumentTab_SendeDisclosure", "E2E_DocumentTab_SendeDisclosure"

'======== Verify the send eDisclosure documents listed in the Documents tab ======
BIZ_Documents_VerifyDocumentExist("E2E_DocumentTab_SendeDisclosure")

'=====Add condition in condition tab=====
BIZ_Documents_AddCondition "Preliminary Conditions", "1008"

'========Verify the result=============
BIZ_Documents_VerifyConditionExist "Preliminary Conditions", "Shared_Condition1"	

'======== Close eFolder Window ======
BIZ_Nav_eFoler_Close()

'===== Exit Loan =======
BIZ_Loan_Exit True

'====== Logout Encompass360 ======
BIZ_Login_UserLogout

FRM_RT_TeardownTest(null)
