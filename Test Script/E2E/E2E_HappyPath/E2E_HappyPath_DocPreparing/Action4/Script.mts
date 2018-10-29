'@**************************************************************************************************
'@ TestStory: PTAC-1129  E2E_HappyPath
'@ TestCase: PTAC-1162 HP Doc Preparing 3-Complete Closing Vendor Information 
'@ Test Automation JIRA Task: PTAC-1175
'@ TestData: 
	'1 Forms_ClosingVendorInformation,SetTitleInsuranceCompany,PTAC1175_DocPrep
	'2 Forms_ClosingVendorInformation,SetEscrowCompany,PTAC1175_DocPrep
	'3 Forms_ClosingVendorInformation,SetDocsPreparedBy,PTAC1175_DocPrep
'@ Pre-conditions: 
'@ Description: Complete Closing Vendor Information
'@ TestSteps:
    '1 Under the forms tab, click show all checkbox then Select "Closing Vendor Information" form
    '2 Complete the Vendor Information for the ‘Title Insurance Company’, ‘Escrow Company’, and ‘Docs Prepared By’
'@ ExpectedResult: 
	'1 Closing Vendor Information should open
	'2 The data should be saved
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1162 ","HP Doc Preparing 3-Complete Closing Vendor Information", Null

Dim objZipCodeSelector,objData
Set objZipCodeSelector  = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ZipcodeSelectorDialog")
Set objData				= FRM_DS_GetTestData("Forms_ClosingVendorInformation","SetDocsPreparedBy","PTAC1175_DocPrep")

'Open Closing Vendor Information form
BIZ_Forms_Open "Closing Vendor Information"

'Check if form is opened
FRM_VerifyTrue BIZ_Forms_GetFormTitle()="Closing Vendor Information", "Open Form", "Form 'Closing Vendor Information' is opened"

'Set test data in Title insurance company section
BIZ_ClosingVendorInformation_SetTitleInsuranceCompany "PTAC1175_DocPrep"

'Set test data in Escrow Company section
BIZ_ClosingVendorInformation_SetEscrowCompany "PTAC1175_DocPrep"

'Set test data in Docs Prepared By section
BIZ_ClosingVendorInformation_SetDocsPreparedBy "PTAC1175_DocPrep"

'Handle zip code window
If GUI_Object_IsExistX(objZipCodeSelector,10) Then
	GUI_List_ClickRow objZipCodeSelector.SwfObject("swfname:=gvCities"),Null,0,FRM_DS_GetValue(objData, "VENDX312_City"),True,False,False,"Single"
	GUI_SwfButton_Click objZipCodeSelector.SwfButton("swfname:=btnOK")
End If

Set objZipCodeSelector  = Nothing
Set objData				= Nothing
