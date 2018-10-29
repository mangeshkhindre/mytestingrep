'@**************************************************************************************************
'@ TestStory: PTAC-1633 Re-Enforcement Tables & Fees
'@ TestCase: PTAC-1802 Verify the LO Compensations details for LO Persona 
'@ Test Automation JIRA Task: PTAC-2342 Settings_TablesFees_VerifyLOCompensations_LOPersona
'@ TestData: 
   '1 Settings_TablesFees, CompensationPlan, PTAC-1802
   '2 Setttings_CompanyUserSetup, OrganizationUsers_CreateUser, PTAC-1802_LoanOfficer
   '3 Forms_BorrowerSummaryOrigination, SetHeadInfo & SetProperty & SetTransactionDetails, PTAC-1802
'@ Pre-conditions:
   '1 Login to Encompass 
   '2 Create a new loan with the borrower summary 
'@ Description:  
'@ TestSteps:
   '1 Create LO Compensation Record
   '2 Create new user
   '3 Select the plan created, Click ok button to save the record
   '4 "Go to Qualification Milestone Assign the loan to the Loan officer (Testing) for which Lo comp plan is selected,Select finished checkbox."
   '5 Go to Tools->LO Compensation
   '6 Verify the section Loan officer Plan details
'@ ExpectedResult:
   '1 LO Compensation Record should be created
   '2 user should be created and the created LO Compensation Record should be assigned
   '3 Loan officer should be assigned to the loan and Milestone should be finished.
   '4 "Loan officer Plan details section should display Loan officer Name,Plan name,%Amount based on,Rounding
      'All the values should matched with the LO Comp created in Settings."
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Scenario #2: Verify the LO Compensations details for LO Persona","Validate the LO Compensations details for LO Persona", Null

Dim objEncompassMain, objEncompassSettings, objLoanTeamMember, objLOCompensation, strRowID, objData, objCompData
Set objEncompassMain 		= 	SwfWindow("swfname:=MainForm")
Set objEncompassSettings 	= 	objEncompassMain.SwfWindow("swfname:=SetUpContainer")
Set objLoanTeamMember 		= 	SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ProcessorSelectionDialog")
Set objLOCompensation		=	SwfWindow("swfname:=MainForm").Page("name:=")
strRowID					=	"PTAC-1802"
Set objData 				= 	FRM_DS_GetTestData("Tools_LOCompensation", "LOCompensation", strRowID)
Set objCompData				=	FRM_DS_GetTestData("Settings_TablesFees", "CompensationPlan", strRowID)

'====== Go to Settings/Tables and Fees/LO Compensation =====
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees","LO Compensation"

'====== LO Compensation Plan Random Name Generation =====
strLOCompPlanName = FRM_DS_GetValue(objCompData,"Name")
GUI_SwfObject_Click objEncompassSettings.SwfObject("swfname:=stdIconBtnNew")
BIZ_TablesAndFees_FillCompensationDetails "CompensationPlan_LOPersona","Both", strLOCompPlanName,"Verify LO Compensation For LO Tab"
BIZ_TablesAndFees_ValidateLOCompPlanCreatedAndSetActiveStatus strLOCompPlanName, "ON"
BIZ_Settings_ClickClose()

'====== Go to Company/User Setup/Organization/Users =====
BIZ_Nav_HierarchyTree "Company/User Setup", "Organization/Users"
strCreatedUser = BIZ_OrganizationUsers_CreateUser ("PTAC-1802_LoanOfficer")
strUserName = lcase(strCreatedUser)
BIZ_TablesAndFees_ValidateCreatedUsersAndAssigningCompensationPlan strUserName, strLOCompPlanName
BIZ_Settings_ClickClose()

'====== Go to PipeLine and Create a new loan =====
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID

BIZ_AlertsAndLog_ClickOnRecord "Log","Qualification"
BIZ_TablesAndFees_AssigningLoanOfficerAndValidatingDataInLOCompFromTools strUserName, strLOCompPlanName, strRowID
BIZ_Loan_Exit False

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

'@ Releasing Objects
Set objEncompassMain 		= 	Nothing
Set objEncompassSettings 	= 	Nothing
Set objLoanTeamMember 		= 	Nothing
Set objLOCompensation		=	Nothing
Set objCompData				=	Nothing
Set objData					=	Nothing

