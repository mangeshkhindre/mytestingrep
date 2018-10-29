'@**************************************************************************************************
'@ TestStory: PTAC-1129   E2E_HappyPath
'@ TestCase: PTAC-1160 HP Doc Preparing 2-Complete Vesting & Closing Conditions  
'@ Test Automation JIRA Task: PTAC-1175
'@ TestData:
	'1 Forms_BorrowerInformationVesting,VerifyBIVesting,E2E_DocPreparing2
	'2 Forms_ClosingConditions,SetClosingConditions,E2E_DocPreparing2
	'3 Forms_ClosingConditions,AddClosingConditions,PTAC1175_DocPrep
'@ Pre-conditions: 
'@ Description:  Complete Vesting & Closing Conditions
'@ TestSteps:
	'1 Under the forms tab, click show all checkbox then Select "Borrower Information Vesting" form 
	'2 Click build final vesting button.
	'3 Click on ‘Closing Conditions’ form and complete the fields and Click "Add conditions" Icon.
	   'Select radio button "Add conditions from Condition sets" and then click Ok.
	'4 In the condition Sets window, select "Public \Conventional Conditions" from the Cond.Set dropdown.
	   'Select "Copy of Appraisal to Borrower" from the list and click Add
	   'Select "Zipcode" lookup and click Add
	   'Click on "Add" button.
'@ ExpectedResult: 
	'1 Borrower Information Vesting should open
	'2 The Final Vesting to read should populate as "Alice Buckbrown"
	'3 The entered data should be shown.Add Condition window opens.Conditions set window pop should open
	'4 The selected item should be displayed. The pop-up window should be closed and navigates to Closing conditions 	
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1160 ","HP Doc Preparing 2-Complete Vesting & Closing Conditions", Null

Dim arrStrCondition,objData,strConditions,objClosingConditonsTextArea
BIZ_Forms_ShowAll()

BIZ_Forms_Open "Borrower Summary - Origination"
Set objMainPage = SwfWindow("swfname:=MainForm").Page("index:=0")
strFirstName = GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=l_36"),"value")
strMiddleName = GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=TextBox10"),"value")
strLastName = GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=l_37"),"value")

strExpectedFinalVesting = strFirstName&" "&strMiddleName&" "&strLastName&", sole owner"

'Open Borrower Information Vesting form
BIZ_Forms_Open "Borrower Information - Vesting"

'Verify form opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=Borrower Info.*")_
,True,"Borrower Information - Vesting Form"

'Click on Build final vesting
BIZ_BorrowerInformationVesting_ClickBuildFinalVesting()

'Get populated borrower name from Final Vesting To Read Editor
strDisplayedName = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm")._
SwfWindow("swfname:=MainScreen").SwfEditor("swfname:=txtFinalVesting"), "text")

'verify Final Vesting to Read
FRM_VerifyTrue UCase(strExpectedFinalVesting)=strDisplayedName, "Final Vesting to Read",_
"Correct borrower name is populated in 'Final Vesting To Read': "& FRM_DS_GetValue(objData,"1867_FinalVestingToRead")

'open closing conditions form
BIZ_Forms_Open "Closing Conditions"

'Verify form opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=Closing Conditions")_
,True,"Closing Conditions Form"

'Set data in closing conditions
BIZ_ClosingConditions_SetClosingConditionsData "E2E_DocPreparing2"

'Add closing conditions from Condition Sets
BIZ_ClosingConditions_AddClosingConditions "PTAC1175_DocPrep"

'Verify closing conditions added
FRM_Logger_ReportInfoEvent "Closing Conditions", "Verify Closing Instructions,Conditions are added using Row Id '"&strRowID&"' in the VerifyClosingConditionsAdded datasheet", null
    
Set objData = FRM_DS_GetTestData("Forms_ClosingConditions", "AddClosingConditions","PTAC1175_DocPrep")
arrStrCondition = Split(FRM_DS_GetValue(objData,"Conditions"), ";")
  
Set objClosingConditonsTextArea = SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=MultilineTextBox1")

strDisplayedConditions=GUI_Object_GetPropertyValue(objClosingConditonsTextArea,"value")

If Instr(1,strDisplayedConditions,arrStrCondition(0),1)>0 And Instr(1,strDisplayedConditions,arrStrCondition(1),1)>0 Then
	FRM_Logger_ReportPassEvent "Closing Conditions", "Closing Conditions are successfully added", Null
	Else
	FRM_Logger_ReportFailEvent "Closing Conditions", "Closing Conditions are not added", Null
End If

Set objClosingConditonsTextArea = Nothing 
Set objData                     = Nothing
