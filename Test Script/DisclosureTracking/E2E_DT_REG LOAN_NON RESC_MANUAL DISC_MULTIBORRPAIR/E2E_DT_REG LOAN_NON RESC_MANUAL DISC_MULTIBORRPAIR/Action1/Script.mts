    FRM_RT_SetupTest(null)
    
    '======== Login to the Encompass as admin========     
    BIZ_Login_UserLogin "admin_qaauto"    
    
    '======== Pre-requisite check ===============
    strOrgValue = DT_PreRequisiteCheck_LoanLevelPackageLevel("Once per loan")
    arrchecks = DT_PreRequisiteCheck_Print_PrintPreview()
    
    '=========== Create New Loan ========
    RunAction "CreateNewLoan", oneIteration
    
    '=========Intial LE Send - Manual Disclosure and Revised LE - Manual Disclosure ======
    RunAction "SendInitialRevisedLE", oneIteration
    
    '=========Intial CD Send - Manual Disclosure and Revised CD - Manual Disclosure ======
    RunAction "SendInitialRevisedCD", oneIteration
    
    '===============Loan Exit ================
    BIZ_Loan_Exit True
    
    '==============Reset the pre-requisites ==============
    DT_ResetPreRequisiteCheck arrchecks,strOrgValue
    
    '===== To logout from Encompass =====
    BIZ_Login_UserLogout()
    
    FRM_RT_TearDownTest(Null)
