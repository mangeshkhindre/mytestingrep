'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC-2328 - Processing 1- Order Flood Certification
'@ Test Automation JIRA Task: PTAC-2897 - E2E_9VANoCORefiARM_Processing
'@ TestData:
   '1 Global_Data, Logi and E2E_carollp
   '2 Loans, LoanTemplat and E2E_LoanProcessorDefault
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with "Loan Processer" persona
   '2 click on services and click order flood certification.
   '3 Select 'corelogic' flood services from list. Provide the following credentials
	  'Username: TEST-ELLMA
	  'Password: Banks3125
	  'product: Life of loan flood determination
	  'and click order.
   '4 click ok in the message pop up window.
'@ ExpectedResult: 
   '1 The persona should be able to login successfully 
   '2 Flood certification provider list window will be shown.
   '3 Corelogic flood service window will open.
   '4 The pop-up window should be displayed with text Order is submitted and upon completion the certification will be emailed- message will appear."
   '5 The pop-up window should be closed
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2328","Processing 1- Order Flood Certification", Null

Dim objDataProcessing,objData
Set objDataProcessing 	= FRM_DS_GetTestData("Loans", "Milestone", "E2E_VANoCORefiARM_Processing")
Set objData 			= FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_carollp"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
GUI_Dialog_Encompass_OKX 20, ""

'Search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_VANoCORefiARM","Processing"
BIZ_Loan_AssignUser "NextUser", "Processing", FRM_DS_GetValue(objDataProcessing, "NextUser")

If  GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn"), 60) Then 
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")
	GUI_Dialog_Encompass_OKX 10, ""
End If

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_VANoCORefiARM"

Set objData 		  = Nothing
Set objDataProcessing = Nothing