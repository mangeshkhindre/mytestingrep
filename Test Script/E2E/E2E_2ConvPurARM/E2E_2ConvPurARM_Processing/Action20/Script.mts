'@**************************************************************************************************
'@ TestStory: PTAC-871 - CONVPURARM
'@ TestCase: PTAC-671 - Order Flood Certification
'@ Test Automation JIRA Task: PTAC-990 E2E_2CONVPURARM_Processing
'@ TestData:
	'1 Global_Data,Login, E2E_markuslp
	'2 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'3 Loans, Milestone, E2E_CONVPURARM_Processing
	'4 Services, FloodService, E2E_CONVPURARM
'@ Pre-conditions: N/A
'@ Description: N/A
'@ TestSteps:
	'1 login to Encompass.
	'2 click on services and click order flood certification.
	'3 Provide the following credentials
	  'Username: TEST-ELLMA
	  'Password: Banks3125
	  'product: Life of loan flood determination
	  'and click order.
	'4 click ok in the message pop up window.
'@ ExpectedResult: 
	'1 should be able to login
	'2 Flood certification provider list window will be shown.
	'3 Corelogic flood service window will open.
	'4 Order is submitted and upon completion the certification will be emailed- message will appear."
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-671","Test Case Name - PTAC-671 - Order Flood Certification", Null

Dim objDataProcessing,objData
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVPURARM_Processing")
Set objData 		  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_markuslp"

'Checks if User is logged'
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Login Page"
FRM_RT_SetLoanNo_RT_PropFile()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_CONVPURARM","Processing"

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_CONVPURARM"

Set objData 		  = Nothing
Set objDataProcessing = Nothing
