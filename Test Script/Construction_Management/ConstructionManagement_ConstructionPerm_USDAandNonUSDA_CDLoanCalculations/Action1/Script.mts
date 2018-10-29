'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:  
   'PTAC-611 Test Case:TC #1 (CBIZ-1477) - Construction-to-Perm Loans - CD Loan Calculations Table logic (Non-USDA)
   'PTAC-612 TC #2 (CBIZ-1477) - Construction-to-Perm Loans - CD Loan Calculations Table logic (USDA)  
'@ Test Automation JIRA Task: PTAC-1646 ConstructionManagement_ConstructioPerm_CDLoan_USDAandNonUSDA
'@ TestData: 
   '01 ConstructionManagement,SetLoanInfo,1352_ConstrPerm_NonUSDA
   '02 Forms_ClosingDisclosurePage,SetClosingInformation,1352_ConstrPerm_NonUSDA
   '03 Forms_AggregateEscrowAccount,SetData,1352_ConstrPerm_NonUSDA
   '04 Forms_BorrowerSummaryOrigination,SetBorrower,1352_ConstrPerm_NonUSDA
   '05 Forms_RegZ-LE,SetConstruction,1352_ConstrPerm_NonUSDA
   '06 Forms_RegZ_CD,SetConstruction,1352_ConstrPerm_NonUSDA
   '07 Forms_2015Itemization,Set800Section,1352_ConstrPerm_NonUSDA
   '08 Forms_2015Itemization,Set1000Section,1352_ConstrPerm_NonUSDA
   '09 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_834
   '10 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_835
   '11 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_1115
   '12 Forms_2015Itemization,SetFeeDetails, 1352_ConstrPerm_NonUSDA_1116
'@ Pre-conditions: Construction-to-Perm Loans - CD Loan Calculations Table logic (Non-USDA)
'@ Description: ConstructionManagement ConstructioPerm CDLoan USDAandNonUSDA verification
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case:PTAC-1646","ConstructionManagement_ConstructioPerm_CDLoan_USDAandNonUSDA", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== RunAction to verify loan calculations section in CD page 5 for Non USDA loan type ======
RunAction "ConstrMgmt_CnstrPerm_NonUSDA_LoanCalc_CD5_Verify_001",OneIteration

'====== RunAction to verify loan calculations section in CD page 5 for USDA loan type ======
RunAction "ConstrMgmt_CnstrPerm_USDA_LoanCalc_CD5_Verify_002",OneIteration

BIZ_Login_UserLogout()

FRM_RT_TearDownTest(Null)
