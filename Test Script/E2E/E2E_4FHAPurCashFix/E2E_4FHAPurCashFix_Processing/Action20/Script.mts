'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3161 FHAPURCHASEFIX - Processing 1- Order Flood Certification
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData:
	'1 Global_Data, Login, E2E_markuslp
	'2 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'3 Loans, Milestone, E2E_FHAPURCASHFIX_Processing
	'4 Services, FloodService, E2E_FHAPURCASHFIX
'@ Pre-conditions: N/A
'@ Description: N/A
'@ TestSteps:
	'1 login to Encompass.
	'2 click on services and click order flood certification.
	'3 Select 'corelogic' flood services from list. Provide the following credentials
	   'Username: TEST-ELLMA
	   'Password: Banks3125
	   'product: Life of loan flood determination
	   'and click order.
    '4 click ok in the message pop up window.
'@ ExpectedResult: 
	'1 should be able to login
	'2 Flood certification provider list window will be shown.
	'3 Corelogic flood service window will open.
	'4 The pop-up window should be displayed with text "Order is submitted and upon completion the certification will be emailed"
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3161","FHAPURCHASEFIX - Processing 1- Order Flood Certification", Null

Dim objDataProcessing,objData
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_Processing")
Set objData 		  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_Carollp"

'Checks if User is logged'
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Login Page"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_FHAPURCASHFIX","Processing"

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_FHAPURCASHFIX"

Set objData 		  = Nothing
Set objDataProcessing = Nothing
