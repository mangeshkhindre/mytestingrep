'@**********************************************************************************************************
'@ TestStory: PTAC-1490 Compliance Alerts 
'@ TestCase: 
		'PTAC-1197 TC01_Verifying the "Send Initial Disclosures" 
		'PTAC-1202 TC02_Verify the "E-consent not yet Received" Alert in Alert & Messages tab
		'PTAC-1210 TC03_Verify the "Closing date violation alert" 
		'PTAC-1211 TC04_Verify the "Good faith Fee variance alert" 
		'PTAC-1212 TC05_Verify the "Redisclose Loan estimate(Rate lock)"	
		'PTAC-1213 TC06_Verify the "Redisclose Loan Estimate(Changed Circumstance)"	
		'PTAC-1214 TC07_Verify the "Redisclose Closing disclosure(APR,Product,Prepay)"
		'PTAC-1216 TC08-Verify the "Redisclose Closing Disclosure(Changed circumstance)"
		'PTAC-1813 Validate the implementation of the compliance alert "Ability-To-Repay Loan Type Not Determined" into a loan file. 
 		'PTAC-1814 Validate the implementation of the compliance alert "Qualified Mortgage Type Not Determined" into a loan file. 
 		'PTAC-1819 Validate the implementation of the Compliance alert "QM Safe Harbor Eligibility Not Determined" into a loan file 
 		'PTAC-1824 Validate the implementation of the Compliance alert "Residual Income Assessment Recommended" into a loan file. 
 		'PTAC-1830 Validate the implementation of the compliance alert 'General QM DTI Exceeded' into a loan file. 		
		'PTAC-1217 TC09_Verify the "Loan estimate Expires alert"
		'PTAC-1831 Validate the implementation of the compliance alert 'General QM Loan Feature Violation' into a loan file. 
  		'PTAC-1844 Validate the implementation of the Compliance alert "Ability-to-Repay Exemption Reason Not Determined" into a loan file. 
 		'PTAC-1845 Validate the implementation of the "custom alert" into a loan file.
		'PTAC-1846 Validation of Redisclose Closing Disclosure (Rate lock)
		'PTAC-1919 Validate the implementation of the Compliance alert "Send Initial Disclosures" 
		'PTAC-2381 TC03_Verify the "Closing date violation alert"
		'PTAC-2382 TC09_Verify the "Loan estimate Expires alert"
		'PTAC-2383 Verify the "Redisclose Loan estimate(Rate lock)" 
		'PTAC-2384 TC07_Verify the "Redisclose Closing disclosure(APR,Product,Prepay)"		
'@ Test Automation JIRA Task:  CTA-351 Script optimization for Alerts/Compliance Alerts/Custom Alerts/Disable Alerts
'@ TestData: 
	    '"Settings_LoanSetup,Alerts,Alerts_SendInitialDisc
		'"Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1490_Settings_Alerts_noDOB
		'"Forms_BorrowerSummaryOrigination,SetProperty,Settings_Alerts_Propinfo
		'"Forms_BorrowerSummaryOrigination,SetTransactionDetails,Settings_Alerts_Trasactiondetails
		'"Forms_1003Page,1003Page2,Settings_Alerts_BaseIncome
		'"Settings_LoanSetup,Alerts,Settings_Alerts
		'"Forms_BorrowerSummaryOrigination,SetBorrower,PTAC-1490_Settings_Alerts
		'"Settings_LoanSetup,Alerts,Alerts_RemoveField
	    '"Settings_LoanSetup,Alerts,2145_eConsentAlertEnable
		'"Settings_LoanSetup,Alerts,Alerts_eConsent
		'"Settings_LoanSetup,Alerts,Alerts_eConsent_01
		'"Tools_DisclosureTracking, SetComplianceTimeline,OtherAlerts_data
	    '"Settings_LoanSetup,Alerts,Alerts_ClosingDate
		'"Forms_BorrowerSummaryOrigination,SetTransactionDetails,PTAC-1490_ClosingDateAlerts
	    '"Settings_LoanSetup,Alerts,Alerts_GoodFaithFeeVariance
		'"Forms_2015Itemization, Set800Section,PTAC-1490_Alerts 
		'"Forms_2015Itemization, Set800Section,TAC-1490_Alerts_01
	    '"Settings_LoanSetup,Alerts,2145_RediscloseLERateLock
		'"Forms_ATRQMManagement, SetQualification,PTAC-1490    			
		'"Settings_LoanSetup","Alerts","2145_AbilityToRepay"
		'"Forms_BorrowerSummaryOrigination","SetBorrower","PTAC-1490_Settings_Alerts"
		'"Forms_BorrowerSummaryOrigination","SetProperty","2145_Alerts_SetProperty"
		'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_SetTrasactionDetails"
		'"Forms_1003Page","1003Page2","2145_BaseIncomeBorrower"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_NoAbilityToRepay"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay"
		'"Settings_LoanSetup","Alerts","2145_QMType"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankQualifiedMortgage"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_FHAQualifiedMortgage"
		'"Settings_LoanSetup","Alerts","2145_QMSafeHarbor"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_BlankSafeHarbor"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_SafeHarbor"
		'"Settings_LoanSetup","Alerts","2145_ResidualIncome"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_AbilityToRepay_QM"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_NoSafeHarbor"
		'"Settings_LoanSetup","Alerts","2145_GeneralQMDTI"
		'"Forms_1003page","SetLiabilities","2145_SetLiability"
		'"Forms_ATRQMManagement","SetATRQMEligibility","2145_GeneralQM"	
'@ Pre-conditions: Corresponding compliance alerts should be enabled
'@ Description:  
'@ TestSteps: 
	'Script covers the above 5 scenarios. Detailed steps are mentioned at action level
'@ ExpectedResult:
	'Expected results mentioned at action level
'**************************************************************************************************************

FRM_RT_SetupTest(Null)

FRM_Logger_ReportStepEvent "Start Test Script PTAC-1502","Script Name:Settings_PTAC1490_ComplianceAlerts_01", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "Alerts_RemoveField")
strExecutionFalg = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFalg)="Y" Then
'====== PTAC-1197 Verifying the "Send Initial Disclosures" ======
	RunAction "ComplianceAlerts_SendDisclosuresAlert", oneIteration	
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_eConsentAlertEnable")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1202 Verify the "E-consent not yet Received" Alert in Alert & Messages tab ======
	RunAction "ComplianceAlerts_EconsentNotReceived", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "Alerts_ClosingDate")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1210 Verify the "Closing date violation alert"  ======
	RunAction "ComplianceAlerts_ClosingDateViolation", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "Alerts_GoodFaithFeeVariance")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1211 Verify the "Good faith Fee variance alert"  ======
	RunAction "ComplianceAlerts_GoodFaithFee", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_RediscloseLERateLock")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1212 Verify the "Redisclose Loan estimate(Rate lock)" ======
	RunAction "ComplianceAlerts_RediscloseLE(RateLock)", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_RediscloseLECC")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then	
'====== PTAC-1213 Verify the "Redisclose Loan Estimate(Changed Circumstance)" ======
	RunAction "ComplianceAlerts_RediscloseLE(ChangedCircumstance)", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_RediscloseCD")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1214 Verify the "Redisclose Closing disclosure(APR,Product,Prepay) ======
	RunAction "ComplianceAlerts_RediscloseCD", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_RediscloseCDCC")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")		
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1216 TC08-Verify the "Redisclose Closing Disclosure(Changed circumstance) ======
	RunAction "ComplianceAlerts_RediscloseCD(ChangedCircumstance)", oneIteration
End If	

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_LEExpires")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1217 Verify the "Loan estimate Expires alert ======
	RunAction "ComplianceAlerts_LEexpires", oneIteration
End If	

'====== PTAC-1221 Verify "Disable alerts" ======
'RunAction "ComplianceAlerts_DisableAlerts", oneIteration

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_ARExemption")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1813 compliance alert "Ability-To-Repay Loan Type Not Determined" into a loan file. ======
	RunAction "Alerts_AbilityToRepayLoan", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_QMType")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1814 compliance alert "Qualified Mortgage Type Not Determined" into a loan file. ======
	RunAction "Alerts_QMTypeNotDetermined", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_QMSafeHarbor")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1819 Compliance alert "QM Safe Harbor Eligibility Not Determined" into a loan file ======
	RunAction "Alerts_QMSafeHarborNotDetermined", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_ResidualIncome")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1824 Compliance alert "Residual Income Assessment Recommended" into a loan file. ======
	RunAction "Alerts_ResidualIncome", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_GeneralQMDTI")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1830 compliance alert 'General QM DTI Exceeded' into a loan file. ======
	RunAction "Alerts_GeneralQMDTI", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_QMLoanFeatureViolation")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1831 compliance alert 'General QM Loan Feature Violation' ======
	RunAction "Alerts_GeneralQMLoanFeature", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "2145_ARExemption")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1844 Compliance alert "Ability-to-Repay Exemption Reason Not Determined" ======
	RunAction "Alerts_AbilityToRepayExemption", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "CreateNewAlert", "2145_RegressionAlert")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1845 custom alert ======
	RunAction "Alerts_CustomAlert", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "Alerts_RedisloseCDRateLock")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1846 Redisclose Closing Disclosure (Rate lock) alert ======
	RunAction "Alerts_RediscloseCDRateLock", oneIteration
End If

Set objData = FRM_DS_GetTestData("Settings_LoanSetup", "Alerts", "Alerts_SendInitialDisc")
strExecutionFlag = FRM_DS_GetValue(objData, "ExecutionFlag")
If Trim(strExecutionFlag)="Y" Then
'====== PTAC-1919 Compliance alert "Send Initial Disclosures"  ======
	RunAction "Alerts_SendInitialDisclosures", oneIteration
End If	

Set objData = Nothing

BIZ_Login_UserLogout()

FRM_RT_TeardownTest(Null)
