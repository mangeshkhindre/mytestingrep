'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase: PTAC- 2352 - Submittal 1- Receive documents, receive conditions
'@ Test Automation JIRA Task: PTAC- 2919 E2E_9VANoCORefiARM_Submittal
'@ TestData: 
   '1 Global, Login and E2E_marksuw
   '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, MilestoneDocument and E2E_VANoCORefiARM_Submittal
   '4 eFolder_Tab,AddConditionsFromSet and E2E_VANoCORefiARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Under log click submittal milestone.
    '2 Under documents select one document by double clicking on it.
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
       'Add condition' window will open.
       'Condition sets' window will open.
       'Appraisal should be added to preliminary conditions.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2352","Submittal 1- Receive Documents, Receive Conditions", Null

Dim objData

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_Carollp"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_VANoCORefiARM","Submittal"
BIZ_AlertsAndLog_ClickOnRecord "Log","Submittal"
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_VANoCORefiARM_Submittal"

'Click on E-folder 
BIZ_Nav_eFoler_Open()
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"),"Preliminary Conditions"
BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_VANoCORefiARM"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()
Set objData = Nothing