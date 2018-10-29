'@**************************************************************************************************
 '@ TestStory: CTA-428 Lender Credit 
'@**************************************************************************************************
 
FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Main Test Case: CTA-428", "Script Name - CIBIZ_CTA-428_LnderCrdit__Convntinl_FHA", Null

RunAction "LC_Conventional_Refinance", oneIteration
RunAction "FHANoCashOutRefi", oneIteration

BIZ_Login_UserLogout()
