'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase:
   '1 PTAC-259 Verify Itemization Fee management new record creation	
   '2 PTAC-260 Verify Itemization Fee management deletion of Record  
'@ Test Automation JIRA Task: PTAC-1045,Settings_TablesandFees_ItemizationFeeMgmt_Record"
'@ TestData: Settings_TablesFees, ItemizationFee and "PTAC-259"
'@ Pre-conditions: 
'@ Description: Verify Create, Delete functonality of Itemization Fee management Record 
'@ TestSteps:
   '1 Verify creation of Itemization Fee management record 
   '2 Verify deletion of Itemization Fee management record 
'@ ExpectedResult:
   '1 A new Itemization Fee management record to be available in record
   '2 Created Itemization Fee management record not available in grid after deletion
'===================================================================================================


'@**************************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase: PTAC-262 Verify import Compliance Default fees
'@ Test Automation JIRA Task: PTAC-1047 Settings_TablesAndFees_ImportComplianceFee_Default
'@ TestData: 
	'GlobalTestData, Login and admin_core2p
'@ Pre-conditions:
	'1 Create one Fee as per test data
	'2 Verify 2010 Fee avilable in grid	
'@ Description: 
'@ TestSteps:
	'1. Go to Fee List Tab.
	'2. Click "Import Compliance Default Fees...".
	'3. Click Yes.
	'4. Check for alert message to load of default fees
'@ ExpectedResult:
	'1.Fee Data should be imported in Fee list
	'2.All default fees should be populate in grid( It should be like default values- 2010 Fee should not be available)
'***************************************************************************************************

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

strRowID ="ItemizationFeeRecordCreate"
strRowID1="ItemizationFeeRecordImport"

FRM_Logger_ReportStepEvent "Test Scenario #1 Verifying functionaloity Create and Delete of Itemaization Fee Management Record"," Validate functionaloity Create and Delete of Itemaization Fee Management Record", Null
'====== Navigate to Encompass->Settings - >Navigate to Tables and Fees->Itemization Fee Management ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "Itemization Fee Management"	

'====== Verify Creation and  Delete functionlity of Itemization Fee Management record ======
FRM_Logger_ReportInfoEvent "Test Case #1 Verifying functionaloity Creation of Itemaization Fee Management Record","Validate functionaloity Creation of Itemaization Fee Management Record", Null
strFeeDataName = BIZ_Settings_TablesandFees_ItemizationFeeRecord_Creation (strRowID)
BIZ_Settings_TablesandFees_Validate_ItemizationCreateOrDelete strFeeDataName,True

FRM_Logger_ReportInfoEvent "Test Case #2 Verifying functionaloity Deletion of Itemaization Fee Management Record","Validate functionaloity Deletion of Itemaization Fee Management Record", Null
BIZ_Settings_TablesandFees_ItemizationFeeRecord_Delete strFeeDataName
BIZ_Settings_TablesandFees_Validate_ItemizationCreateOrDelete strFeeDataName,False
BIZ_Settings_ClickSave

'====== Verify import Compliance Default fees =====
FRM_Logger_ReportStepEvent "Test Scenario #2 Verifying functionaloity Import of Itemaization Fee Management Record"," Validate functionaloity Import of Itemaization Fee Management Record", Null
strDialogText =	"The current list will be cleared. Are you sure you want to import default list?"
BIZ_Settings_TablesAndFees_Verify_ImportComplianceFee strRowID1,strDialogText
BIZ_Settings_ClickClose()

''===== To logout from Encompass =====
BIZ_Login_UserLogout
