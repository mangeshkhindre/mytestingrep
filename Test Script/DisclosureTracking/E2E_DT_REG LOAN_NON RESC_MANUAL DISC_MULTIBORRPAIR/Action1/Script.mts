FRM_RT_SetupTest(null)

'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_qaauto"    

'======== Pre-requisite check ===============
BIZ_LoanSetup_ComplianceCalendar_OurCompanyCalendar("E2E_DisclosureTracking")
BIZ_LoanSetup_DisclosureTrackingSettings("E2E_DisclosureTracking")

'==== Naviagte to Settings, select "Loan Templates", "Data Templates"  and Create a Data Template "E2E_DT"========  
BIZ_Nav_Settings_Open "Loan Templates"
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"
BIZ_DataTemplates_CreateNew "E2E_DT_NonResc_MultiBorrPair","E2E_DT_NONRESC_PAIR1","E2E_DT_NONRESC_PAIR1"
'===== Close Settings Window ========  
BIZ_Nav_Settings_Close

'======Setting of Loan Level Changed Circumstances======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Disclosure Tracking Settings"
BIZ_Settings_ChangedCircumstance False

'=======Create a Automation folder if not present====================
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"
    
'=========== Create New Loan ========
RunAction "CreateNewLoan", oneIteration

'=========Intial LE Send - Manual Disclosure and Revised LE - Manual Disclosure ======
RunAction "SendInitialRevisedLE", oneIteration

'=========Intial CD Send - Manual Disclosure and Revised CD - Manual Disclosure ======
RunAction "SendInitialRevisedCD", oneIteration

'===============Loan Exit ================
BIZ_Loan_Exit False

'===== To logout from Encompass =====
BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
