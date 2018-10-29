'@******************************************************************************************
'@ TestStory: PTAC-871 - CONVPURARAM
'@ TestCase: PTAC-889 Approval 3 - Order Encompass compliance services
'@ Test Automation JIRA Task: PTAC-889
'@ TestData: 
	'Loans/Milestone/E2E_FHAPURARM_Approval
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1.Click tools tab and select TQL services.
	'2.Click 'order' button next to 'compliance service orders'.
	'3.Click on Loan Processor and select jwcloser.
	'4. Click ignore in the error window
	'5. Check the box next to finished
'@ ExpectedResult: 
	'1. TQL services will open
	'2. Order should be generated with status completed and result should be warning or pass. you can click on the document and it will open the report.
	'3. Application error window will open.
	'4. Window should close.
	'5. Milestone should be finished.
'********************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case PTAC-889","Approval 3 - Order Encompass compliance services", Null

Dim strComplianceStatus, objData

Set objData 			= FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURARM_Approval")
strComplianceStatus = "- Warning"
'====== Go to Tools->TQL Services ======
BIZ_Tools_Open "TQL Services"

TopContainerText = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").SwfObject("swfname:=topContainer"), "text")
if(InStr(TopContainerText, "TQL Services") > 0) then 
	FRM_Logger_ReportPassEvent "Order Valuation", "TQL services page will open", null
End if

'==== Verify if TQL Services is opened ====
GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfObject("swfname:=topContainer","text:=TQL Services"), 15, "TQL Services"

'=== Click on "Order" for compliance service
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname path:=.*;complianceControl;CompliancePlinthContainer;.*")

GUI_Object_WaitTillVisibleX SwfWindow("swfname:=MainForm").SwfObject("swfname:=gcWorksheet","text:=Compliance Service"), 120

'=== Validate the Compliance status ====
GUI_Object_ValidateText SwfWindow("swfname:=MainForm").SwfLabel("swfname:=lblReportStatus"),strComplianceStatus,"Compliance status" 

BIZ_Loan_FinishMilestone_AssignUser "Approval", FRM_DS_GetValue(objData, "NextUser")

BIZ_Loan_Exit "True"

BIZ_Login_UserLogout

Set objData = Nothing
