'@**************************************************************************************************
'@ TestStory:PTAC-3688 Compliance Section-32 HOEPA
'@ TestCase: 
	'1 PTAC-3355 Section 32 Points and Fees, Conventional MI - Rule #1 (Refundable, Not Paid to Broker) 
	'2 PTAC-3359 Section 32 Points and Fees, Conventional MI - Rule #3 (Not Refundable, Not Paid to Broker) 	
	'3 PTAC-3358 Section 32 Points and Fees, Conventional MI - Rule #2 (Refundable, Paid to Broker) 
	'4 PTAC-3360 Section 32 Points and Fees, Conventional MI - Rule #4 (Not Refundable, Paid to Broker)	
'@ Test Automation JIRA Task: 
	'
	
	'PTAC-3689 Section32PointAndFees_ConventionalMI_PaidToBroker 
	'PTAC-3702 Section32PointAndFees_ConventionalMI_NotPaidToBroker
'@ Pre-conditions:
'***************************************************************************************************
FRM_RT_SetupTest(null)
FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3702 ","Script Name: Section32PointAndFees_ConventionalMI_NotPaidToBroker ", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", "Automation"

'====== Section 32 Points and Fees, Conventional MI - Rule #1 (Refundable, Not Paid to Broker) ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3355 "," Section 32 Points and Fees, Conventional MI - Rule #1 (Refundable, Not Paid to Broker) ", Null
RunAction "Section32PointAndFees_ConventionalMI_NotPaid", oneIteration, "PTAC-3355", "PTAC-3355_2", "ON"

'======  Section 32 Points and Fees, Conventional MI - Rule #3 (Not Refundable, Not Paid to Broker)  ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-3359 "," PTAC-3359 Section 32 Points and Fees, Conventional MI - Rule #3 (Not Refundable, Not Paid to Broker) ", Null
RunAction "Section32PointAndFees_ConventionalMI_NotPaid", oneIteration, "PTAC-3359", "PTAC-3359_2", "OFF"


'====== Section 32 Points and Fees, Conventional MI - Rule #2 (Refundable, Paid to Broker)  ======
RunAction "Section32PointAndFees_ConventionalMI_Paid", oneIteration

'====== 'Logout Application ======
BIZ_Login_UserLogout
FRM_RT_TearDownTest(Null)

