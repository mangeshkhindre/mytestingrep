'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and Fees
'@ TestCase: 
   '1 PTAC-252 : Creating New Compensation Plan Record 
   '2 PTAC-253 : Editting Compensation Plan Record 
   '3 PTAC-254 : Duplicating Compensation Plan Record 
   '4 PTAC-256 : Deleting Compensation Plan Record 
'@ Test Automation JIRA Task: PTAC-1042 Settings_TablesandFees_CompensationPlan_Record
'@ TestData: Settings_TablesFees, CompensationPlan and  PTAC-1042  
'@ Pre-conditions:
   '1 Login as Admin user
   '2 Go to Setting window
   '3 Select Tables and Fees: LO Compensation
'@ Description: Compensation Plan Record creation,Editting,Duplicating,Deleting
'@ TestSteps:
	'1 Creating New Compensation Plan Record 
	'2 Editting Compensation Plan Record 
	'3 Duplicating Compensation Plan Record
	'4 Deleting Compensation Plan Record 
'@ ExpectedResult:
	'1 New Compensation Plan Record should be created 
	'2 Compensation Plan Record should be editted
	'3 Compensation Plan Record should be duplicated
	'4 Compensation Plan Record should be deleted
'***************************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

FRM_Logger_ReportStepEvent "Scenario #1: Verifying Create, Edit, Duplicate, Delete functionality of Compensation Plan Record","Validate Create, Edit, Duplicate, Delete functionality of Compensation Plan Record", Null
'====== Go to Settings/'Tables and Fees'/LO Compensation ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "LO Compensation"

''====== Create new LO Compensation Record  ======
FRM_Logger_ReportStepEvent "Test Case #1: Start Creation of New LO Compensation Record","Started Creation of New LO Compensation Record", Null
strCompenPlan=BIZ_TablesAndFees_CreateCompensationPlan("PTAC-1802")
BIZ_TablesAndFees_ValidateCompensationPlanDetails strCompenPlan,"PTAC-1802"

''====== Edit LO Compensation Record ======
FRM_Logger_ReportStepEvent "Test Case #2: Start Editing of LO Compensation Record","Started Editing of LO Compensation Record", Null
strEditCompenPlan=BIZ_TablesAndFees_EditCompensationPlan (strCompenPlan,"PTAC-1802_Edit")
BIZ_TablesAndFees_ValidateCompensationPlanDetails strEditCompenPlan,"PTAC-1802_Edit"

''====== Duplicate LO Compensation Record ======
FRM_Logger_ReportStepEvent "Test Case #3: Start Duplicating of LO Compensation Record","Started Duplicating of LO Compensation Record", Null
strDuplicateCompenPlan=BIZ_TablesAndFees_DuplicateCompensationPlan(strEditCompenPlan,"PTAC-1802_Duplicate")
BIZ_TablesAndFees_ValidateCompensationPlanDetails strDuplicateCompenPlan,"PTAC-1802_Duplicate"
FRM_Logger_ReportInfoEvent "Edit Compensation plan details","Validate Edit Compensation plan details after Duplicate ", null
BIZ_TablesAndFees_ValidateCompensationPlanDetails strEditCompenPlan,"PTAC-1802_Edit"

''====== Delete LO Compensation Record ======
FRM_Logger_ReportStepEvent "Test Case #4: Start Deletion of LO Compensation Record","Started Deletion of LO Compensation Record", Null
BIZ_TablesAndFees_DeleteCompensationPlan(strEditCompenPlan)
BIZ_TablesAndFees_DeleteCompensationPlan(strDuplicateCompenPlan)
BIZ_Settings_ClickClose()


'===== To logout from Encompass =====
BIZ_Login_UserLogout()

