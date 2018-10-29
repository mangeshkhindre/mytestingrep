'@******************************************************************************************
'@ TestStory: E2E_2015Itemization
'@ TestCase: E2E_2015Itemization
'@ Test Automation JIRA Task: TA-4709
'@ TestData: "Forms_2015Itemization","Set800Section","E2E_2015Itemization_Section800"
'@ TestData: "Forms_2015Itemization","Set900Section","E2E_2015Itemization_Section900"
'@ TestData: "Forms_2015Itemization","Set1000Section","E2E_2015Itemization_Section1000"
'@ TestData: "Forms_2015Itemization","Set1100Section","E2E_2015Itemization_Section1100"
'@ TestData: "Forms_2015Itemization","Set1200Section","E2E_2015Itemization_Section1200"
'@ TestData: "Forms_2015Itemization","Set1300Section","E2E_2015Itemization_Section1300"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Create new disclosure tracking record.
	'2 Change some field values on 2015 Itemization
	'3 Verify 2015 Fees calculation and alert "Good Faith Fee Variance Violated"
'@ ExpectedResult: 1. All the fees should be calculated correctly.
'				   2. "Good Faith Fee Variance Violated" should be triggered.
'********************************************************************************************

'==============Go to Disclosure Tracking=========
BIZ_Tools_Open "Disclosure Tracking"

'============Create new LE record==========
BIZ_DisclosureTrackingTool_AddDisclosure TRUE,"LE",FALSE,FALSE

'====Go to 2015 Itemization=============
BIZ_Forms_Open "2015 Itemization"

FRM_Logger_ReportInfoEvent "TC3","Set Data on 2015 Itemization form",Null

'=========Set Data on 2015 Itemization form=======
BIZ_2015Itemization_Set800Section("E2E_2015Itemization_Section800")
BIZ_2015Itemization_Set900Section("E2E_2015Itemization_Section900")
BIZ_2015Itemization_Set1100Section("E2E_2015Itemization_Section1100")
BIZ_2015Itemization_Set1200Section("E2E_2015Itemization_Section1200")
BIZ_2015Itemization_Set1300Section("E2E_2015Itemization_Section1300")

'========Save Loan=============
BIZ_Loan_Save()

FRM_Logger_ReportStepEvent "TC3","Verify if all the fees are getting calculated correctly.",Null

'============Verify total fees for 900 Section=======
CalculateAndVerify900SectionFees()

'============Verify total fees for 1000 Section=======
CalculateAndVerify1000SectionFees()

'============Verify total fees for 1100 Section=======
CalculateAndVerify1100SectionFees "Set1100Section","E2E_2015Itemization_Section1100"

'============Verify total fees for 1200 Section=======
CalculateAndVerify1200SectionFees "Set1200Section","E2E_2015Itemization_Section1200"

'============Verify total fees for 1300 Section=======
CalculateAndVerify1300SectionFees "Set1300Section","E2E_2015Itemization_Section1300"

'============Verify total fees for 1400 Section=======
CalculateAndVerify1400SectionFees()

FRM_Logger_ReportStepEvent "TC3","Verify if Good Faith Fee Variance Violated alert is triggered.",Null

'============Verify if Good Faith Fee Variance Violated alrert is triggered============
BIZ_AlertsAndLog_VerifyItemExist "Alerts & Messages","Good Faith Fee Variance Violated"

GUI_SwfObject_SelectTab SwfWindow("swfname:=MainForm").SwfObject("swfname:=tabsLog"), "Alerts"

FRM_VerifyEqual GUI_List_TextExists(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvAlerts"), 0, "Good Faith Fee Variance Violated"), True, "Verify Alert", "Verify Alert Good Faith Fee Variance Violated"


