'@******************************************************************************************
'@ TestStory: PTAC-2398 E2E_8VAPURARM
'@ TestCase : PTAC-2160 Qualification 4- Order Automated underwriting Import conditions
'@ Test Automation JIRA Task: PTAC-2409 E2E_8VAPURARM_Qualification 
'@ TestData:
   'Forms_VA, VA_26-0286 and E2E_VAPURARM
   'Forms_VA, VA_26-1805 and E2E_VAPURARM
   'Forms_VA, VA_26-1820 and E2E_VAPURARM
   'Forms_VA, VA_26-6393 and E2E_VAPURARM
   'Forms_VA, VA_26-8261A and E2E_VAPURARM
   'Forms_VA, VAManagement_BasicInfo and E2E_VAPURARM
   'Forms_VA, VAManagement_Qualification and E2E_VAPURARM
   'Forms_VA, VAManagement_Tracking and E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    'Step1:
    '1 Go to VA 26-0286 Loan Summary screen and fill the data as per test data
    '2 Go to VA 26-1805 Reasonable Value screen and fill the data as per test data
    '3 Go to VA 26-1820 Loan Disbursement Value screen and fill the data as per test data
    '4 Go to VA 26-6393 Loan Analysis  Disbursement Value screen and fill the data as per test data
    '5 Go to VA 26-8261A Veteran Status screen and fill the data as per test data
    '6 Go to VA Management screen and fill the data as per test data
    '7 Go to VA Management->>Qualification: screen and fill the data as per test data
    '8 Go to VA Management->>Tracking:screen and fill the data as per test data
	'Step2:
	'01 Click on services and click Request Underwriting
	'02 Select Fanniemae DU on Epass and click 'submit' button 
	'03 Click on "update DU Settings" 
	'04 Fill in the username and password if not populated by default.click ok 
	'05 Click on "submit DU" 
	'06 Click edit credit reference info 
	'07 Select test credit agency(200) and click ok 
	'08 Click submit
	'09 Click continue '(Note: Please make sure that DU direct settings file is in the right path  For this)
	'10 Open remove UAC exe file 
	'11 click on "Open Encompass Data Folder" button 
	'12 Click on settings 
	'13 Click on e-pass 
	'14 Make sure that DUdirect settings file is here  If it is not you have to place it here 
'@ ExpectedResult: 
	'Step1 Expected Result:
	'1 Loan Data should be saved
	'Step2 Expected Result:
	'1 Underwriting window popup should open
	'2 Service view tab should open 
	'3 Update DU via elliemae network window should open 
	'4 DU window will close 
	'5 DU via Elliemae network window opens 
	'6 Edit credit reference information will open 
	'7 Goes back to DU via Elliemae network and acct number and password will populate 
	'8 Incomplete loan application window will open if there are any incomplete fields 
	'9 In services view tab DU finding underwriting will be generated with recommendation : approve/eligible 
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2160", "Qualification 4 - Order Automated underwriting/Import conditions", Null

Dim objParentObject, objData

BIZ_VALoanSummary_SetVA26_0286 "E2E_VAPURARM"
BIZ_VAReasonableValue_SetVA26_1805 "E2E_VAPURARM"
BIZ_VALoanDisbursement_SetVA26_1820 "E2E_VAPURARM"
BIZ_VALoanAnalysis_SetVA26_6393 "E2E_VAPURARM"
BIZ_VAVeteranStatus_SetVA26_8261A "E2E_VAPURARM"
BIZ_VAManagement_BasicInfo "E2E_VAPURARM"
BIZ_VAManagement_Qualification "E2E_VAPURARM"
BIZ_VAManagement_Tracking "E2E_VAPURARM"

Set objParentObject = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objData 		= FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "E2E_VAPURARM")

BIZ_Forms_Open "Borrower Summary - Origination"

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "ARMTypeName")) Then
   GUI_WebButton_Click objParentObject.WebButton("html id:=StandardButton3")
   GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfListView("swfname:=armListView"), 30
   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfListView("swfname:=armListView").Select FRM_DS_GetValue(objData, "ARMTypeName")
   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfButton("swfname:=okBtn").Click
   Wait g_TinyWaitSmall
End If

'Select Show in Alpha order
BIZ_Services_ShowInOrder
'Order Request Underwriting service with required test data
BIZ_Services_RequestUnderwriting "E2E_VAPURARM"

Set objParentObject = Nothing
Set objData 		= Nothing