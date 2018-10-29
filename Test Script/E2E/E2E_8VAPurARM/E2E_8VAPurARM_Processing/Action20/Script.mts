'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase: PTAC-2163 - Processing 1- Order Flood Certification
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData:
   '1 Global_Data,Login,E2E_carollp
   '2 Loans,LoanTemplate,E2E_LoanProcessorDefault
'@ Pre-conditions: 
'@ Description:  
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
   '1 The persona should be able to login successfully 
   '2 Flood certification provider list window will be shown.
   '3 Corelogic flood service window will open.
   '4 The pop-up window should be displayed with text "Order is submitted and upon completion the certification will be emailed.
'@**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2163","TestCase Name - Processing 1- Order Flood Certification", Null

Dim objDataProcessing,objData
Set objDataProcessing 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Processing")
Set objData 			= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_carollp"

'Checks if User is logged'
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Login Page"
FRM_RT_SetLoanNo_RT_PropFile()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OKX 30, ""

'Gets the Loan Number and Search the Loan in the Pipeline Tab
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_VAPURARM","Processing"
BIZ_Nav_SelectLoanTab()


'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_VAPURARM"

Set objData 		  = Nothing
Set objDataProcessing = Nothing
