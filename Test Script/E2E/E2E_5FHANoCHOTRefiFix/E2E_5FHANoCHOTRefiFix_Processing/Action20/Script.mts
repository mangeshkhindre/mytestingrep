'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1821 FHANOCHOTREFIFIX Processing 1- Order Flood Certification
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData:
   '1 Global_Data, Login, E2E_Carollp
   '2 Loans, LoanTemplate, E2E_LoanProcessorDefault
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with "Loan Processer" persona
   '2 Click on services and click order flood certification
   '3 Select 'corelogic' flood services from list.(If it is not under my providers list, click All providers and select it from there.)
      'Provide the following credentials
 	  'Username: TEST-ELLMA
 	  'Password: Banks3125	
 	  'product: Basic flood certification and .Click order
   '4 Click ok in the message pop up window
'@ ExpectedResult: 
   '1 The persona should be able to login successfully 
   '2 Flood certification provider list window will be shown
   '3 Corelogic flood service window will open.
   '4 Flood certificate will open in services tab view.
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1821","FHANOCHOTREFIFIX Processing 1- Order Flood Certification", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_Carollp"

'Checks if User is logged'
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Login Page"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_FHANoCHOTRefiFix","Processing"
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_FHANoCHOTRefiFix"

Set objData = Nothing