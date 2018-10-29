'@ *************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM 
'@ TestCase : PTAC-2655 - FHACOREFIARM Submittal 1- Receive documents, receive conditions.
'@ Test Automation JIRA Task: PTAC-2717 E2E_7FHACORefiARM_Submittal
'@ TestData : 
	'1 Global, Login and E2E_Clarklp
	'2 Loans, LoanTemplate and E2E_LoanProcessorDefault
	'3 Loans, Milestone and E2E_FHACORefiARM_Submittal
'@ Pre-conditions: NA
'@ Description   : NA  
'@ TestSteps     :
   '1 Under log click submittal milestone.
   '2 Under documents select one document by double clicking on it.(Only for documents with document icon next to it.)
   '3 click browse and attach and select a pdf from local and attach.
   '4 Repeat steps 2 and 3 for the other 2 documents.
   '5 Click on e-folder.
   	  'Click on preliminary conditions.
   	  'Click on 'Add new condition' icon.
   	  'Click on radio button for 'add conditions from condition sets' and click 'ok'.
   	  'Select 'Appraisal' from the list and click add and then click 'add' button.
'@ ExpectedResult: 
   '1 Submittal worksheet will open for Clark santos-LP.
   '2 Document details window will open.
   '3 File should be attached(In document details window under files you should be able to see the file attachment.
   '4 E-folder will open.
      'Preliminary conditions details window will open.
      'Add condition window will open.
      'Condition sets window will open.
      'Appraisal should be added to preliminary conditions.
'@ *************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-2655","Test Case Name - PTAC-2655 - FHACOREFIARM Submittal 1- Receive documents, receive conditions", Null

Dim objData, objDataProcessing

Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslp
BIZ_Login_UserLogin "E2E_Clarklp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")

'Retrieve the Loan Number 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_FHACORefiARM","Submittal"
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"
Set objDataProcessing = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHACORefiARM_Submittal")
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_FHACORefiARM_Submittal"

BIZ_Nav_eFoler_Open

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If(InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
   FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_FHACORefiARM"

BIZ_Nav_eFoler_Close()

Set objDataProcessing = Nothing
Set objData           = Nothing
