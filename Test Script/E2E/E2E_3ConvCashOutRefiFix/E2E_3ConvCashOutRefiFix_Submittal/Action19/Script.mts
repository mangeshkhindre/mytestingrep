'@**************************************************************************************************
'@ TestStory: PTAC-3370 E2E_3CONVCASHOUTREFIFIX
'@ TestCase:  PTAC-3208 CONVCASHOUTREFIFIX Submittal 1- Receive documents, receive conditions.
'@ Test Automation JIRA Task: PTAC-3375 E2E_3CONVCASHOUTREFIFIX_Submittal
'@ TestData: 
    '1 Global, Login and E2E_marksuw
    '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '3 Loans, MilestoneDocument and E2E_CONVCASHOUTREFIFIX_Submittal 
    '4 eFolder_Tab, AddConditionsFromSet and E2E_CONVCASHOUTREFIFIX
'@ Pre-conditions: Loan number which finished processing milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
    '1 Login to Encompass as Loan Processor.
    '2 Under log click submittal milestone
    '3 Under documents select one document by double clicking on it(Only for documents with document icon next to it.)
    '4 Click browse and attach and select a pdf from local and attach
    '5 Repeat steps 2 and 3 for the other 2 documents
    '6 1 Click on e-folder
      '2 Click on preliminary conditions
      '3 Click on Add new condition icon
      '4 Click on radio button for add conditions from condition sets and click ok
      '5 Select Appraisal from the list and click add and then click add button
'@ ExpectedResult: 
    '1 Should be able to login to Encompass.
    '2 Submittal worksheet will open for Carollp
    '3 Document details window will open
    '4 File should be attached(In document details window under files you should be able to see the file attachment
    '4 E-folder will open
    '5 1 Preliminary conditions details window will open
      '2 Add condition window will open
      '3 Condition sets window will open
      '4 Appraisal should be added to preliminary conditions
      '5 Error message window pop up will open
      '6 Window will disappear
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3208","CONVCASHOUTREFIFIX Submittal 1- Receive documents, receive conditions.", Null

Dim objTemplate, strConditionNameSelected

Set objTemplate  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_markuslp"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder  FRM_DS_GetValue(objTemplate,"PipeLineView"), FRM_DS_GetValue(objTemplate,"LoanFolder")

'Retrieve the Loan Number 
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_CONVCASHOUTREFIFIX","Submittal"
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_CONVCASHOUTREFIFIX_Submittal"
BIZ_Nav_eFoler_Open

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
    FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_CONVCASHOUTREFIFIX"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()

Set objTemplate  = Nothing
