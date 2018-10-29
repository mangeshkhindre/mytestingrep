'@**************************************************************************************************
'@ TestStory:CTA-107_HMDA_SortingLogics_Borrower_CoBorrower
'@ TestCase: CTA-107_HMDA_SortingLogics_Borrower_CoBorrower
   
   
'@ TestData:NA
'@ Pre-conditions: NA
'@ Description:  Main Action containing 4 actions covering all the steps
'@ TestSteps:Updated at Action Level
   
'***************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: CTA-107 ","Script Name : HMDA_SortingLogics_Borrower_CoBorrower", Null


'====== Login to the Encompass as admin ======


RunAction "HMDA_E2E_SortingLogics_Borrower_001", oneIteration

RunAction "HMDA_E2E_181_Changes", oneIteration

RunAction "HMDA_E2E_CoApplicantDiabaled_Check_002", oneIteration
wait(3)
RunAction "HMDA_E2E_CheckSummary_003", oneIteration

RunAction "HMDA_E2E_Face2Face_004", oneIteration

wait(3)
'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)


