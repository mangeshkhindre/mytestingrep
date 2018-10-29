'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1107 - HP Processing 1- Accept File and Order flood Certification
'@ Test Automation JIRA Task: PTAC-1134 Order flood Certification
'@ TestData:
	'1 Global_Data, Login, E2E_HappyPath_Admin
	'2 Loans, LoanTemplate, E2E_HappyPath
	'3 Loans, Milestone, E2E_HappyPath_Processing
	'4 Services, FloodService, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Click on maginify class of Loan Processor and assign user click 'accept file'
	'2 Click on services and click order flood certification.
	'3 (i) Select 'corelogic' flood services from list.(If it is not under my providers list, click All providers and select it from there.)
	   'Provide the following credentials
 	   'Username: TEST-ELLMA
 	   'Password: Banks3125
 	   'product: Life of loan flood determination
	   '(ii) Click order
'@ ExpectedResult: 
    '1  Milestone alert cleared message should be displayed
	'2  Flood certification provider list window will be shown.
	'3  (i) Corelogic flood service window will open.
	    '(ii)The Services window should open with flood report
''**************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1107","TestCase Name - HP Processing 1- Accept File and Order flood Certification", Null

Dim strLoanNumber, objData, objDataProcessing
Set objData 		  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath") 
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Processing")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin" 'Integration Environment

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

'search for loans with MS2Completed as borrowers middle name
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS2Complete_HappyPath","Processing"

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

GUI_Dialog_Encompass_YesX 2, ""

BIZ_Loan_AcceptFiles "Processing", FRM_DS_GetValue(objDataProcessing, "NextUser")

'Complete Flood Order Core Login Services'
BIZ_Services_ProcessFloodOrderCoreLogicFloodServices "E2E_HappyPath"

Set objDataProcessing 		= Nothing
Set objData 				= Nothing
