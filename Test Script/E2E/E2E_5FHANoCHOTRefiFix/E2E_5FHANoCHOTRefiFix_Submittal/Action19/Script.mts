'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix	
'@ TestCase : PTAC-1843 FHANOCHOTREFIFIX Submittal 1- Receive documents, receive conditions..
'@ Test Automation JIRA Task: PTAC-2702 E2E_5FHANoCHOTRefiFix_Submittal
'@ TestData: 
	'1 Global, Login, E2E_marksuw
    '2 Loans, LoanTemplate and E2E_LoanProcessorDefault
    '3 Loans, MilestoneDocument and E2E_FHANoCHOTRefiFix_Submittal
    '4 eFolder_Tab, AddConditionsFromSet and E2E_FHANoCHOTRefiFix
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

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1843","FHANOCHOTREFIFIX Submittal 1- Receive Documents, receive Conditions.", Null

Dim strLoanNumber, objData,strConditionNameSelected
Set objData = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_LoanProcessorDefault")

'Login to Encompass with user clarklp
BIZ_Login_UserLogin "E2E_carollp" 

'Validate Existence of Pipeline Tab
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData,"PipeLineView"), FRM_DS_GetValue(objData,"LoanFolder")
GUI_Dialog_Encompass_OKX 10, ""
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS4Complete_FHANoCHOTRefiFix","Submittal"

'Retrieve the Loan Number 
strLoanNumber = BIZ_Loan_GetLoanNumber()
BIZ_Document_AttachMandatoryDocuments "Submittal", "E2E_FHANoCHOTRefiFix_Submittal"
BIZ_Nav_eFoler_Open

'====== Checks the Preliminary Condition Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=eFolderDialog").SwfTab("swfname:=tabMain"), "Preliminary Conditions"
strConditionNameSelected =  SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gcConditions").GetROProperty("text")

If (InStr(strConditionNameSelected, "Preliminary Conditions") > 0) Then 
   FRM_Logger_ReportPassEvent "Click preliminary conditions tab", "Preliminary conditions is shown", Null
End If

BIZ_PreliminaryConditions_AddConditionsFromSet "E2E_FHANoCHOTRefiFix"

'====== Close the eFolder Window
BIZ_Nav_eFoler_Close()

Set objData = Nothing
