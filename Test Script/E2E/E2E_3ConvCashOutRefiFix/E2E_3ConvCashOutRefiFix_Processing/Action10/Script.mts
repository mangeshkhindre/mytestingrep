'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase : PTAC-3136 CONVCASHOUTREFIFIX- Processing 1- Order flood Certification
'@ Test Automation JIRA Task: PTAC-3374 E2E_3CONVCASHOUTREFIFIX_Processing
'@ TestData:
   '1 Global_Data, Login, E2E_Carollp
   '2 Loans, LoanTemplate, E2E_CONVCASHOUTREFIFIX
   '3 Loans, Milestone, E2E_CONVCASHOUTREFIFIX_Processing
   '4 Services, FloodService, E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Login to Encompass with "Loan Processer" persona.
   '2 Click on services and click order flood certification.
   '3 Select 'corelogic' flood services from list.(If it is not under my providers list, click All providers and select it from there.)
      'Provide the following credentials
      'Username: TEST-ELLMA
      'Password: Banks3125
      'product: Life of loan flood determination
      'Click order
   '4 Click ok in the message pop up window.
'@ ExpectedResult: 
    '1 The persona should be able to login successfully 
    '2 Flood certification provider list window will be shown.
    '3 Corelogic flood service window will open.The pop-up window should be displayed with text "Order is submitted and upon completion the certification will be emailed"
    '4 The pop-up window should be closed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case :  PTAC-3136","CONVCASHOUTREFIFIX- Processing 1- Order flood Certification", Null

Dim objData, objDataProcessing
Set objData           = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_CONVCASHOUTREFIFIX_Processing")

'Login to Encompass
BIZ_Login_UserLogin "E2E_markuslp" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'Search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_CONVCASHOUTREFIFIX","Processing"
BIZ_Loan_AssignUser "NextUser", "Processing", FRM_DS_GetValue(objDataProcessing, "NextUser")

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn"), 60) Then 
   GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")
   GUI_Dialog_Encompass_OKX 10, ""
End If

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_CONVCASHOUTREFIFIX"

Set objDataProcessing = Nothing
Set objData           = Nothing
