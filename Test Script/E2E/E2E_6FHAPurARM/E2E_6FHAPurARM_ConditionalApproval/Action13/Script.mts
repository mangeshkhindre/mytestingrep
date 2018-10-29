'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase:  PTAC-2043 Conditional Approval 2 - Complete Transmittal Summary 
'@ Test Automation JIRA Task: PTAC-2123 E2E_6FHAPURARM_ConditionalApproval
'@ TestData: 
'	Forms_TransmittalSummary, SetProperty, E2E_FHAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click on forms and click transmittal summary.
	'2 Check the check box for Escrow(T&I).
	  'Risk assessment select DU from dropdown.
	  'For property review select exterior/Interior from dropdown.
	  'property form type select uniform residential appraisal report from the dropdown.
	  'Under underwriter comments enter "Conditional approval upon receipt of conditions"
'@ ExpectedResult: 
	'1 Transmittal summary should open.
	'2 Should be able to enter all values.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2043","Test Case Name - Conditional Approval 2 - Complete Transmittal Summary ", Null

'====== Opens the Forms > Transmittal Summary ======
BIZ_Forms_Open "Transmittal Summary"

GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=Transmittal Summary"), 5, "Transmittal summary is open"

'====== Sets the values in Transmittal Summary Screen ======
BIZ_TransmittalSummary_SetProperty "E2E_FHAPURARM"