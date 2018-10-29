'@***************************************************************************************************************
'@ TestStory: PTAC-2145 ReEnforcement_Compliance Alerts 
'@ TestCase: 
		'PTAC-1846 Validation of Redisclose Closing Disclosure (Rate lock)
'@ Test Automation JIRA Task:  2215
'@ TestData:'"Settings_LoanSetup","Alerts","Alerts_RedisloseCDRateLock"
			'"Forms_BorrowerSummaryOrigination","SetTransactionDetails","2145_LockDate"
'@ Pre-conditions:  Redisclose Closing Disclosure (Rate lock) should be enabled
'@ Description:  
'@ TestSteps: 
		'1. Login to the Encompass with Admin user
		'2. Navigate to Pipeline tab and click on create New loan
		'3. Enter details on borrower summary origination page on new form, save
		'4. Go to tools-Disclosure tracking, under Disclosure History section, click on 'Add a Disclosure Record' button, select 'Disclosure' checkbox and 'LE' radio button, Click on OK button.
		'	Select the Current Date in the pop up, verify the LE
		'5. Under Disclosure History section, click on 'Add a Disclosure Record' button, select 'Disclosure' checkbox and 'CD' radio button, Click on OK button.
		'	Select the Current Date in the pop up, verify the CD
		'6. Go to 761 field and add any date more that system date in the field. Verify that Redisclose CD (Rate lock)is fired.
'@ ExpectedResult:
		'1.	User should be able to login successfully.
		'2.	"User should be able to Go to Pipeline tab.
		'	On the ""New Loan"" window, user should be able to select ""New Blank loan"" option"
		'3. LE is sent with Yes
		'4. CD is sent with Yes
		'5. Alert, "Redisclose CD (Rate Lock)" is fired.
'*****************************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1846","Validation of Redisclose Closing Disclosure (Rate Lock)",Null

BIZ_LoanSetup_Alerts_EditAlert "Alerts_RedisloseCDRateLock"
'====== Navigate to Pipeline and and select Pipeline view and Loan Folder =======
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View","Automation"
BIZ_Loan_AddNewBlankLoan()
'Set test data in Borrower Summary origination
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-1490_Settings_Alerts"
BIZ_BorrowerSummaryOrigination_SetProperty "2145_Alerts_SetProperty"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_Alerts_GeneralQM"

BIZ_Tools_Open "Disclosure Tracking"

'Add manual disclosure tracking entry for LE
BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False

'verify LE Sent
Dim boolLESent
boolLESent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"LE Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolLESent,"LE Sent","Loan Estimate is sent"

'send Closing Disclosure
BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False

'verify CD
boolCDSent=GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"CD Sent?","Yes",True,False,False,"Single")
FRM_VerifyTrue boolCDSent,"CD Sent","Closing Disclosure is sent"

BIZ_Forms_Open "Borrower Summary - Origination"

'set date to more than system date in field 761
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "2145_LockDate"
BIZ_Loan_Save()
'verify alert triggered
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Redisclose Closing Disclosure (Rate Lock)"



