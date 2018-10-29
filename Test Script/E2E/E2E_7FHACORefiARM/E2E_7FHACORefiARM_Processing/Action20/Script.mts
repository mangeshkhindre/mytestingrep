'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase : PTAC-2422 FHACOREFIARM Processing 1- Order flood Certification
'@ Test Automation JIRA Task: PTAC-2716 E2E_7FHACORefiARM_Processing
'@ TestData:
	'1 Global_Data, Login, E2E_markuslp
	'2 Loans, LoanTemplate, E2E_LoanProcessorDefault
	'3 Loans, Milestone, E2E_FHACORefiARM_Processing
	'4 Services, FloodService, E2E_FHACORefiARM
'@ Pre-conditions: N/A
'@ Description: N/A
'@ TestSteps:
	'1 Login to Encompass with "Loan Processer" persona.
	'2 click on services and click order flood certification.
	'3 Select 'corelogic' flood services from list.(If it is not under my providers list, click All providers and select it from there.)
       'Provide the following credentials
	   'Username: TEST-ELLMA
	   'Password: Banks3125
	   'product: Life of loan flood determination
	   'and click order.
	'@ ExpectedResult: 
    '1 The persona should be able to login successfully 
	'2 Flood certification provider list window will be shown.
	'3 Corelogic flood service window will open.
	   'Flood certificate will open in services tab view.
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2422","Test Case Name -FHACOREFIARM Processing 1- Order flood Certification", Null

Dim objData
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault") 

BIZ_Login_UserLogin "E2E_Clarklp"

'Checks if User is logged'
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Login Page"
FRM_RT_SetLoanNo_RT_PropFile()
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")


'search for loans with MS3Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS3Complete_FHACORefiARM","Processing"

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_FHACORefiARM"

Set objData 		  = Nothing

If(Dialog("text:=CoreLogic Flood Services - Message").Static("text:=Duplicate of order .*").Exist(10)) Then 
	GUI_Dialog_Encompass_OKX 30, "Duplicate of order"
End If

