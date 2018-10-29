'@******************************************************************************************
'@ TestStory: 
		'1 ENC-30271 HOA Dues Field 233 - Add Calculation Logic for LE/CD
		'2 CBIZ-2158 Construction Only TIP (LE3.X16) calculated incorrectly when Est Interest On is A (Half Loan) (EBS)
		'3 CBIZ-2621 Add missing field triggers for CD3.X88: LE2.XSTJ
'@ TestCase: 
		'1 ENC-30057 TC1_ENC-28063_HOA Dues Field 233 - Add Calculation Logic for LE/CD
		'2 ENC-30104 TC2_ENC-28063_HOA Dues Field 233 - Add Calculation Logic for LE/CD
		'3 CBIZ-2957 TC1-To verify Construction Only TIP (LE3.X16) calculated correctly when Est Interest On is A (Half Loan) (EBS)
		'4 CBIZ-3098 TC2-To verify Construction Only TIP (LE3.X16) calculated correctly when Est Interest On is B (Full Loan) (EBS)
		'5 CBIZ-3099 TC3-To verify TIP (LE3.X16) calculated correctly for non construction loan		
		'6 CBIZ-2962 TC1-CBIZ-2621-Verify value in custom form with CD3.X88 is update if borrower fee updated -changing total closing costs (LE2.XSTJ) - check for all Purpose of Loan
'@ Test Automation JIRA Task: 
		'1 CTA-361 Script optimization for module 'Forms'   
'*********************************************************************************************************************
FRM_RT_SetupTest(null)

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'RunAction "Verify_CalcForLECD_HOADuesField233", oneIteration

RunAction "VerifyTIPcalculationForConstructionOnlyLoan", oneIteration

BIZ_Login_UserLogout

RunAction "Validate_CD3X88TotalClosingCosts_WhenBorrowerFeeUpdated", oneIteration

BIZ_Login_UserLogout()
FRM_RT_TeardownTest(null)




 @@ hightlight id_;_658038_;_script infofile_;_ZIP::ssf5.xml_;_
