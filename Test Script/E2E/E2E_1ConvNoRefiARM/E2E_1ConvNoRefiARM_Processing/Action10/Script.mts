'@**************************************************************************************************
'@ TestStory: PTAC-1665 - E2E_1ConvNoRefiARM
'@ TestCase: PTAC-1318  - CONVNOCASHREFIARM- Processing 1- Order flood Certification
'@ Test Automation JIRA Task: PTAC-1780 E2E_1ConvNoRefiARM_Processing
'@ TestData:
   '1 Global_Data,Login,E2E_Carollp
   '2 Loans,LoanTemplate,E2E_ConvNoRefiARM
   '3 Loans,Milestone,E2E_ConvNoRefiARM_Processing
   '4 Services,FloodService,E2E_ConvNoRefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with "Loan Processer" persona.
   '2 Go to Borrower summary origination form. Enter Subject Property information as in test data.
   '3 Click on services and click order flood certification.
   '4 Select 'corelogic' flood services from list.(If it is not under my providers list, click All providers and select it from there.)
      'Provide the following credentials
       'Username: TEST-ELLMA
       'Password: Banks3125
       'product: Life of loan flood determination
      'and Click order    
'@ ExpectedResult: 
    '1 The persona should be able to login successfully 
	'2 Should be able to enter Subject property information
    '3 Flood certification provider list window will be shown.
    '4 Corelogic flood service window will open. Flood certificate will open in services tab view.     
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1318","TestCase Name - CONVNOCASHREFIARM- Processing 1- Order flood Certification", Null

Dim objData, objDataProcessing
Set objData           = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_ConvNoRefiARM_Processing")

'Login to Encompass
BIZ_Login_UserLogin "E2E_carollp" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_ConvNoRefiARM","Processing"
BIZ_Loan_AssignUser "NextUser", "Processing", FRM_DS_GetValue(objDataProcessing, "NextUser")

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn"), 60) Then 
   GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")
   GUI_Dialog_Encompass_OKX 10, ""
End If

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_ConvNoRefiARM"

Set objDataProcessing = Nothing
Set objData           = Nothing
