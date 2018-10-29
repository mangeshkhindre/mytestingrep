FRM_RT_SetupTest(null)

'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_qaauto"

'======== Pre-requisite check ===============
strOrgValue = DT_PreRequisiteCheck_LoanLevelPackageLevel("Once per loan")
arrchecks = DT_PreRequisiteCheck_Print_PrintPreview()
BIZ_LoanSetup_ComplianceCalendar_OurCompanyCalendar("E2E_DisclosureTracking")
BIZ_LoanSetup_DisclosureTrackingSettings("E2E_DisclosureTracking")

'===== Naviagte to Settings,"Data Templates" and Create Data Template========  
BIZ_Nav_Settings_Open "Loan Templates"
BIZ_Nav_HierarchyTree "Loan Templates", "Data Templates"
BIZ_DataTemplates_CreateNew "E2E_DT_NonResc_SingleBorr","E2E_DisclosureTracking2","E2E_DisclosureTracking"
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

'=========Intial LE Send - Manual Disclosure and Revised LE - Print ======
RunAction "SendInitialRevisedLE", oneIteration

'=========Intial CD Send - Print Preview and Revised CD - eDisclosure ======
RunAction "SendInitialRevisedCD", oneIteration

'===============Loan Exit ================
BIZ_Loan_Exit False

'==============Reset the pre-requisites ==============
DT_ResetPreRequisiteCheck arrchecks,strOrgValue

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
