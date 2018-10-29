'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase : PTAC-2040 Submittal 1- Receive documents, receive conditions
'@ Test Automation JIRA Task: PTAC-2122 E2E_6FHAPURARM_Submittal
'@ TestData: 
	'1 Global, Login and E2E_marksuw
	'2 Loans, LoanTemplat eand E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Under log click submittal milestone.
	'2 Under documents select one document by double clicking on it.(Only for documents with document icon next to it.)
	'3 click browse and attach and select a pdf from local and attach.
	'4 Repeat steps 2 and 3 for the other 2 documents.
    '5 1 Click on e-folder.
	  '2 Click on preliminary conditions.
	  '3 Click on 'Add new condition' icon.
	  '4 Click on radio button for 'add conditions from condition sets' and click 'ok'.
	  '5 Select 'Appraisal' from the list and click add and then click 'add' button.	
'@ ExpectedResult: 
	'1 Submittal worksheet will open for Clark santos-LP.
	'2 Document details window will open.
	'3 File should be attached(In document details window under files you should be able to see the file attachment.
	'4 1 E-folder will open.
	  '2 Preliminary conditions details window will open.
	  '3 Add condition' window will open.
	  '4 Condition sets' window will open.
	  '5 Appraisal should be added to preliminary conditions.

'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2040","Submittal 1- Receive documents, receive conditions", Null

Dim objData, objDataProcessing

FRM_RT_SetLoanNo_RT_PropFile()
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_Underwriter")

'Login to Encompass with user Clarklp
BIZ_Login_UserLogin "E2E_Carollp"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
GUI_Dialog_Encompass_OK("")

'Gets the Loan Number and Search the Loan in the Pipeline Tab
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_FHAPURARM","Submittal"
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Submittal")
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_FHAPURARM_Submittal"

'Click on E-folder 
BIZ_Nav_eFoler_Open()
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"),"Preliminary Conditions"
BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_FHAPURARM_PreliminaryCondition"

BIZ_Nav_eFoler_Close()

Set objDataProcessing = Nothing
Set objData			  = Nothing
