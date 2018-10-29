'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: PTAC-1181 HP Shipping 1- Accept File by Shipper 
'@ Test Automation JIRA Task:  PTAC-1177 E2E_HappyPath_Shipping
'@ TestData: Global_Data,Login,E2E_HappyPath_Admin
	'Loans,LoanTemplate,E2E_HappyPath
	'Loans,Milestone,E2E_HappyPath_Shipping
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass as admin.
	'2 Open existing loan in the Loan folder identified by Loan Number from property file
	'3 Click on Log > click on Shipping". Accept file button and click ok. 
'@ ExpectedResult: 
	'1 System should give alert message as  'Milestone alert has been cleared'
	'2 The pop up window should be closed
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1181","HP Shipping 1- Accept File by Shipper", Null

'Variable declaration
Dim strLoanNumber, objData,objUserInfo
Set objData		 = FRM_DS_GetTestData("Loans", "LoanTemplate", "E2E_HappyPath")
Set objUserInfo = FRM_DS_GetTestData("Loans", "Milestone", "E2E_HappyPath_Shipping")

'Login to Encompass
BIZ_Login_UserLogin "E2E_HappyPath_Admin"

'Set Loan number in RuntimeProp from E2EScriptProp
FRM_RT_SetLoanNo_RT_PropFile()

'Validate Encompass home page
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl.*", "index:=0"), 5, "Encompass is open and Home page is visible"

'Navigate to selected pipeline view and Loan folder
 
BIZ_Pipeline_SelectPipelineViewAndLoanFolder FRM_DS_GetValue(objData, "PipeLineView"), FRM_DS_GetValue(objData, "LoanFolder")

Wait 1
BIZ_Loan_OpenLoanByBorrNameAndNextExpectedMilestone "MS11Complete_HappyPath","Shipping"

BIZ_AlertsAndLog_ClickOnRecord "Log", "Shipping"
	
If UTIL_String_IsEmpty(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfEdit("swfname:=boxCurrentLA"),"text")) Then
    GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=pictureBoxCurrentLA")
	BIZ_Loan_SelectMilestoneUser(FRM_DS_GetValue(objUserInfo, "CurrentUser"))
End If
	
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=acceptBtn")
GUI_Dialog_Encompass_OKX 10, "The milestone alert has been cleared"



Set objData 	= Nothing
Set objUserInfo = Nothing
