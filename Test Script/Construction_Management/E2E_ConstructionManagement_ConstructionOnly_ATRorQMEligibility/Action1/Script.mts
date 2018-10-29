'@**************************************************************************************************
'@ TestStory: PTAC-1352 Construction Management
'@ TestCase:
   '1 PTAC-858 TC03- To verify the ATR/QM Management for Construction Perm when field value of 1176 is greater than 12	
   '2 PTAC-905 TC03- TC01- To verify the ATR/QM Management for Construction Perm when field value of 1176 is less than 12
   '3 PTAC-903 TC02- To verify the ATR/QM Management for Construction Perm when field value of 1176 is equal to 12
'@ Test Automation JIRA Task: PTAC-1399 ConstructionManagement_ConstructionPerm_ATRorQMEligibility
'@ TestData: 
   'Forms_BorrowerSummaryOrigination, SetBorrower, PTAC-1352_ConstructionPerm
   'Forms_BorrowerSummaryOrigination, SetTransactionDetails, PTAC-1352_ConstructionPerm
   'Forms_BorrowerSummaryOrigination, SetProperty, PTAC-1352_ConstructionPerm
   'Forms_BorrowerSummaryOrigination, SetConstructionMortPeriod, PTAC-1352_ConstructionPerm
'@ Pre-conditions: 
'@ Description: 
   'This test case verifies that When field 19 = Construction Perm and field 1176 is less than or equal to 12 and 1177 is blank and field 4 = field 325 and field 675 = NO then ignore the value in field 1176 and run existing logic for QM.X26; QM.X40 and QM.X62 (Meets ATR/QM Standards)
   'QM.X26 = General Ability to Repay indicator
   'QM.X40 = General Qualified Mortgage indicator
   'QM.X42 = Interest Only Flag indicator General Qualified Mortgager
   'QM.X62 = Agency/GSE Qualified Mortgage indicator
   'QM.X64 = Interest Only Flag Indicator Agency/GSE QM indicator
'@ TestSteps:
   '1 Navigate to Pipeline tab > Click on New Loan icon (right corner) 
   '2 Click on New Bank Loan button
   '3 Enter the data mentioned in Test Data column, save.
   '4 Go to Page 1003 Page 1>Construction Loan section,Enter the value in the Period (1176)= 10
   '5 a)Go to Construction Management>Permanent Loan Terms section,verify Perm - Interest Only'(1177) field b)Verify the field values for Term F(4) and Due In F(325)   
   '6 Go to RegZ-LE>Prepayment section, verify  drop down field value of 675
   '7 Go to ATR/QM Management form> ATR/QM Eligibility tab,  Verify QM.X41, QM.X42, QM.X43, QM.X44, QM.X45, QM.X46 And QM.X63 , QM.X64, QM.X65 , QM.X66, QM.X67 and QM.X68
'@ ExpectedResult:
   '1 New Loan pop up displayed
   '2 It navigates to Loan tab
   '3 The Loan is created.
   '4 The field value should be entered
   '5 a)The field value should be blank b)The same values should be displayed.
   '6 The 'Will Not' value should be selected in the drop down.
   '7 Below fields should be in Green marks QM.X41, QM.X42, QM.X43, QM.X44, QM.X45, QM.X46 And QM.X63 , QM.X64, QM.X65 , QM.X66, QM.X67 and QM.X68
'***************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-1399","Script Name - ConstructionManagement_ConstructionPerm_ATRQMEligibility", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'Set borrower details for loan program 
BIZ_ConstructionManagement_ConstructionLoanProgram_SetBorrowerDetails "PTAC-1352_ConstructionPerm"

FRM_Logger_ReportStepEvent "Start Test Case-PTAC-858","TC03- To verify the ATR/QM Management for Construction Perm when field value of 1176 is greater than 12", Null
BIZ_ConstructionManagement_SetConstructionPeriod "PTAC-1352_ConstructionPerm","GreaterThan12","1003 Page 1"
'Validate the CM,RegZ-LE,ATR/QM forms 
BIZ_ConstructionManangement_ConstructionPerm_CM_RegZLE_ATRorQM_FormValidations "PTAC-1352_ConstructionPerm", "GreaterThan12"

BIZ_ConstructionManagement_SetLoanInfo("1352_ConstructionOnly")
BIZ_Loan_save()
'Navigate to ATR/QM management form
BIZ_Forms_Open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"	
	
'====== Construction Only loan - Field 1176 > 12 months then QM.X107 = Construction Only validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-814", "TC #21 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X107 = Blank", Null
BIZ_ConstructionManagement_ATRQM_QMX107Validation "GreaterThan12","PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 > 12 months then QM.X106 = Yes validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-825", "TC #20 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X106 = Yes", Null
BIZ_ConstructionManagement_ATRQM_QMX106Validation "GreaterThan12"

'====== Construction Only loan - Field 1176 > 12 months then QM.X25 = N/A validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-819", "TC #15 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X25 = N/A", Null
BIZ_ConstructionManagement_ATRQM_QMX25Validation "PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 > 12 months then QM.X24 = Blank validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-820", "TC #14 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X24 = Blank", Null
BIZ_ConstructionManagement_ATRQM_QMX24Validation "PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 > 12 months then QM.X103 = Yes validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-826", "TC #19 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X106 = Yes", Null
BIZ_ConstructionManagement_ATRQM_QMX103Validation "GreaterThan12"

'====== Construction Only loan - Field 1176 > 12 months then QM.X23 = General ATR ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-830", "TC #13 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X23 = General ATR", Null
BIZ_ConstructionManagement_ATRQM_QMX23Validation "GreaterThan12","PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 > 12 months then QM.X44 and QM.X66 should be Red validation ======
FRM_Logger_ReportStepEvent "Start Test: PTAC-817", "TC #17 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X44 and QM.X66 should be Red", Null
BIZ_ConstructionManagement_ATRQM_QMX44andQMX66Validation()

'====== Construction Only loan - Field 1176 > 12 months then QM.X42 and QM.X64 should be Red validtion ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-818", "TC #16 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then QM.X42 and QM.X64 should be Red", Null
BIZ_ConstructionManagement_ATRQM_QMX42andQMX64Validation()

'====== Construction Only loan - Field 1176 > 12 months then Run Existing logic for QM.X26; QM.X40 and QM.X62 (Meets ATR/QM Standards) validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-931", "TC #18 - CBIZ-3700; Scenario #2 - Construction Only loan - Field 1176 > 12 months then Run Existing logic for QM.X26; QM.X40 and QM.X62 (Meets ATR/QM Standards)",Null
BIZ_ConstructionManagement_ATRQM_QMX44andQMX66Validation()
BIZ_ConstructionManagement_ATRQM_QMX42andQMX64Validation()


'======Run test for ConstPerm_LessThan12_ATRorQMEligibility validaation======
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-905","TC01- To verify the ATR/QM Management for Construction Perm when field value of 1176 is less than 12", Null
BIZ_ConstructionManagement_SetConstructionPeriod "PTAC-1352_ConstructionPerm","LessThan12","1003 Page 1"
BIZ_ConstructionManagement_SetLoanInfo("1352_ConstructionPerm")
BIZ_Loan_save()

BIZ_ConstructionManangement_ConstructionPerm_CM_RegZLE_ATRorQM_FormValidations "PTAC-1352_ConstructionPerm", "LessThan12"

BIZ_ConstructionManagement_SetLoanInfo("1352_ConstructionOnly")
BIZ_Loan_save()
'Navigate to ATR/QM management form
BIZ_Forms_Open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"	

'====== Construction Only loan - Field 1176 < 12 months then QM.X107 = Construction Only validation =====
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-815", "TC #11 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X107 = Blank", null
BIZ_ConstructionManagement_ATRQM_QMX107Validation "LessThan12","PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 < 12 months then QM.X106 = Yes validation =======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-822", "TC #10 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X106 = Yes", null
BIZ_ConstructionManagement_ATRQM_QMX106Validation "LessThan12"

'======  Construction Only loan - Field 1176 < 12 months then QM.X25 = N/A validation ======
FRM_Logger_ReportStepEvent "Start Test Case:PTAC-831", "TC #12 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X25 = N/A", null
BIZ_ConstructionManagement_ATRQM_QMX25Validation "PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 < 12 months then QM.X24 = Blank va;lidation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-823", "TC #8 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X24 = Blank", null
BIZ_ConstructionManagement_ATRQM_QMX24Validation "PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 < 12 months then QM.X103 = Yes validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-824", "TC #9 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X103 = Yes", null
BIZ_ConstructionManagement_ATRQM_QMX103Validation "LessThan12"

'====== Construction Only loan - Field 1176 < 12 months then QM.X23: Exempt validation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-821", "TC #7 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 < 12 months then QM.X23: Exempt", null
BIZ_ConstructionManagement_ATRQM_QMX23Validation "LessThan12","PTAC-1352_1308_ConstructionOnly"


'======Run test for ConstPerm_EqualTo12_ATRorQMEligibility validaation======
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-903","TC02- To verify the ATR/QM Management for Construction Perm when field value of 1176 is equal to 12", Null
BIZ_ConstructionManagement_SetConstructionPeriod "PTAC-1352_ConstructionPerm","EqualTo12","1003 Page 1"
BIZ_ConstructionManagement_SetLoanInfo("1352_ConstructionPerm")
BIZ_Loan_save()

BIZ_ConstructionManangement_ConstructionPerm_CM_RegZLE_ATRorQM_FormValidations "PTAC-1352_ConstructionPerm", "EqualTo12"

BIZ_ConstructionManagement_SetLoanInfo("1352_ConstructionOnly")
BIZ_Loan_save()
'Navigate to ATR/QM management form
BIZ_Forms_Open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"	


'====== Construction Only loan - Field 1176 = 12 months then QM.X107 = Construction Only validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-816", "TC #5 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X107 = Construction Only", null
BIZ_ConstructionManagement_ATRQM_QMX107Validation "EqualTo12","PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 = 12 months then QM.X106 = Yes validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-832", "TC #4 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X106 = Yes", null
BIZ_ConstructionManagement_ATRQM_QMX106Validation "EqualTo12"

'====== Construction Only loan - Field 1176 = 12 months then QM.X25 = N/A validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-827", "TC #6 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X25 = N/A", null
BIZ_ConstructionManagement_ATRQM_QMX25Validation "PTAC-1352_1308_ConstructionOnly"

'====== Construction Only loan - Field 1176 = 12 months then QM.X24 = Blank validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-828", "TC #2 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X24 = Blank", null
BIZ_ConstructionManagement_ATRQM_QMX24Validation "PTAC-1352_1308_ConstructionOnly"

'===== Construction Only loan - Field 1176 = 12 months then QM.X103 = Yes validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-829", "TC #3 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X103 = Yes", null
BIZ_ConstructionManagement_ATRQM_QMX103Validation "EqualTo12"

'====== Construction Only loan - Field 1176 = 12 months then QM.X23: Exempt validation ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-833", "TC #1 - CBIZ-3700; Scenario #1 - Construction Only loan - Field 1176 = 12 months then QM.X23: Exempt", null
BIZ_ConstructionManagement_ATRQM_QMX23Validation "EqualTo12","PTAC-1352_1308_ConstructionOnly"

BIZ_Loan_Exit(False)
'======To logout from Encompass ======
BIZ_Login_UserLogout()  
FRM_RT_TearDownTest(Null)
