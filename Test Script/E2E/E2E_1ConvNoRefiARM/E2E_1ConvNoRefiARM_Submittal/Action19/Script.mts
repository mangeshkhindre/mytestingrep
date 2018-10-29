'@**************************************************************************************************
'@ TestStory: PTAC-1665 E2E_1ConvNoRefiARM
'@ TestCase: 
   '1. PTAC-1363 - CONVNOCASHREFIARM - Submittal 1- Receive documents, receive conditions.
'@ Test Automation JIRA Task: PTAC-1781 E2E_1ConvNoRefiARM_Submittal
'@ TestData: 
   '1 Global,Login,E2E_marksuw
   '2 Loans,LoanTemplate and E2E_LoanProcessorDefault
   '3 Loans, MilestoneDocument and E2E_ConvNoRefiARM_Submittal
   '4 eFolder_Tab,AddConditionsFromSet and E2E_ConvNoRefiARM
'@ Pre-conditions: Loan number which finished processing milestone is in E2E Property file
'@ Description:  
'@ TestSteps:
   '1 Under log click submittal milestone
   '2 Under documents select one document by double clicking on it
   '3 Click browse and attach and select a pdf from local and attach
   '4 Repeat steps 2 and 3 for the other 2 documents
   '5 Click on e-folder
   '6 Click on preliminary conditions
   '7 Click on Add new condition icon
   '8 Click on radio button for add conditions from condition sets and click ok
   '9 Select Appraisal from the list and click add and then click add button
'@ ExpectedResult: 
   '1 Submittal worksheet will open for Carol Tomatis-LP
   '2 Document details window will open
   '3 File should be attached(In document details window under files you should be able to see the file attachment
   '4 E-folder will open
   '5 Preliminary conditions details window will open
   '6 Add condition window will open
   '7 Condition sets window will open
   '8 Appraisal should be added to preliminary conditions
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1363","Test Case Name : CONVNOCASHREFIARM - Submittal 1- Receive documents, receive conditions.", Null

Dim objTemplate, strConditionNameSelected
Set objTemplate  = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user markuslo
BIZ_Login_UserLogin "E2E_carollp"

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

BIZ_Pipeline_SelectPipelineViewAndLoanFolder  FRM_DS_GetValue(objTemplate,"PipeLineView"), FRM_DS_GetValue(objTemplate,"LoanFolder")

GUI_Dialog_Encompass_OKX 20, ""
'Retrieve the Loan Number 

BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_ConvNoRefiARM","Submittal"
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_ConvNoRefiARM_Submittal"
BIZ_Nav_eFoler_Open

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
    FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_ConvNoRefiARM"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()

Set objTemplate  = Nothing