'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ Test Automation JIRA Task: PTAC-1740 ConstructionManagement_ConstrOnly_NewPerm
'@ TestCase:
   '1 PTAC-1187 TC #4 - CBIZ-2857; Scenario #1 - Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.
   '2 PTAC-1118 Test Case- TC #4 - CBIZ-2857; Button Functions - 'New Perm' button; Construction loan > left side (Current Input) & Perm loan > right side"	
   '3 PTAC-1120 TC #10 - CBIZ-2857; Button Functions - 'Linked to Perm' button; Construction loan > left side (Current Input) & Perm loan > right side.   
'@ TestData: 
	'1 Forms_BorrowerSummaryOrigination,SetProperty,1352_ConstrBtn_NewPermBtn
	'2 Forms_BorrowerSummaryOrigination,SeTransactionDetails,1352_ConstrBtn_NewPermBtn
	'3 ConstructionManagement,SetLoanInfo,1352_ConstrBtn_NewPermBtn
	'4 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_CashOutRefinance"
    '5 Forms_BorrowerSummaryOrigination,SeTransactionDetails,"PTAC-1352_CashOutRefinance"
    '6 Forms_BorrowerSummaryOrigination,SetProperty,"PTAC-1352_ConstructionOnly"
    '7 Forms_BorrowerSummaryOrigination,SeTransactionDetails,"PTAC-1352_ConstructionOnly"
    '8 ConstructionManagement,SetLoanInfo,PTAC-1352_ConstructionOnly"
'@ Pre-conditions:
'@ Description: Create Construction Loans and Link the loans and validate the synchronization of loans under different events Yes or No    
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1740","Script Name - ConstructionManagement_ConstrOnly_NewPerm", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'Logic written for schecking the sync template " Const-to-Perm Sync"
BIZ_Nav_HierarchyTree "Loan Setup","Sync Templates"

BIZ_SyncTemplate_CreateNew "1352_ConstrBtn_NewPermBtn"

BIZ_Nav_Settings_Close


'====== Run Action to validate the synced data when New perm button clicked ======
RunAction "ConstrMgmt_ConstrOnly_NewPermButton_Validate_001",OneIteration

'====== Run Action to validate the synced data when New perm button clicked for Yes and No events ======
RunAction "ConstrMgmt_ConstrOnly_NewPermButton_Validate_002",OneIteration

'====== Run Action to validate the synced data when Link to Perm button clicked ======
Runaction "ConstrMgmt_ConstrOnly_LinktoPermButton_Validate_003",OneIteration

'===== To logout from Encompass =====
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
