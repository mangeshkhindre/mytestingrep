'@**************************************************************************************************
'@ TestStory: PTAC-1129 HAPPYPATH_E2E
'@ TestCase:  PTAC-1125 - HP Processing 2- Order Fraud Service
'@ Test Automation JIRA Task:  PTAC-1134 Order flood Certification
'@ TestData: 
	'1 Services, FraudService, E2E_HappyPath
	'2 Forms_ClosingVendorInformation, SetEscrowCompany, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '1 Note: This step is only for Xoriant Automation QA Environment
	   'Under the Forms, show all check box, select "Closing Vendor Information"
	   'In the Closing Vendor Information page, under Escrow company fill the officer last name and click on Save
	'2 Click on services and click order fraud certification
	'3 Select Dataverify drive from the provider list and click submit
	'4 Click order
	'Note: Login credentials will auto-populate, if not use the provided credentials
'@ ExpectedResult: 
    '1 The Closing Vendor Information should open
	   'The information should be saved
	'2 Fraud service provider window should open
	'3 Dataverify window login window should open
	'4 Service window should open with Fraud certification 
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1125","TestCase Name - HP Processing 2- Order Fraud Service", Null

Dim strOfficerName

BIZ_Forms_Open "Closing Vendor Information"
strOfficerName = GUI_Object_GetPropertyValue(Swfwindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_611"),"value")
strOfficerNameDetails	   = Split(strOfficerName ," ")

If (UBound(strOfficerNameDetails) = 0) Then 
	BIZ_ClosingVendorInformation_SetEscrowCompany "E2E_HappyPath"
End If

'Saves the Loan Details
BIZ_Loan_SaveLoanNumber()

BIZ_Service_ProcessFraudGraud "E2E_HappyPath"
