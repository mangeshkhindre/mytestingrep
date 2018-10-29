'@**************************************************************************************************
'@ TestStory: PTAC-1129  HAPPYPATH_E2E
'@ TestCase: PTAC-1182 HP Shipping 2- Completing the Shipping Details 
'@ Test Automation JIRA Task: PTAC-1177 E2E_HappyPath_Shipping
'@ TestData: 
	'Tools_ShippingDetail,SetShippingDetail,E2E_HappyPath
	'Tools_ShippingDetail,SetShipTo,E2E_HappyPath
	'Tools_ShippingDetail,SetCustomerService,E2E_HappyPath
	'Tools_ShippingDetail,SetPostClosingTrailingDocs,E2E_HappyPath
	'Tools_ShippingDetail,SetPayment,E2E_HappyPath
	'Tools_ShippingDetail,SetInsurance,E2E_HappyPath
	'Tools_ShippingDetail,SetNoteDelivery,E2E_HappyPath
	'Tools_ShippingDetail,SetTaxesNotice,E2E_HappyPath
	'Tools_ShippingDetail,SetMersRegistration,E2E_HappyPath
	'Tools_ShippingDetail,SetPhysicalFileStorage,E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Navigate to Tools > Shipping Details
	'2 Fill required test data in different sections of Shipping Detail
'@ ExpectedResult: 
	'1 Shipping detail should open. 
	'2 Should be able to enter data in Shipping Detail.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1182","HP Shipping 2- Completing the Shipping Details", Null

BIZ_Tools_Open "Shipping Detail"

'Verify Shipping detail page opened
GUI_Object_ValidateVisible SwfWindow("swfname:=MainForm").SwfLabel("swfname:=titleLbl","text:=Shipping Detail")_
,True,"Shipping Detail"

'Fill header section of shipping detail
BIZ_ShippingDetail_SetShippingDetail "E2E_HappyPath"

'Set required test data in Shipping detail
BIZ_ShippingDetail_SetShipTo "E2E_HappyPath"

BIZ_ShippingDetail_SetCustomerService "E2E_HappyPath"

BIZ_ShippingDetail_SetPostClosingTrailingDocs "E2E_HappyPath"

BIZ_ShippingDetail_SetPayment "E2E_HappyPath"

BIZ_ShippingDetail_SetInsurance "E2E_HappyPath"

BIZ_ShippingDetail_SetNoteDelivery "E2E_HappyPath"

BIZ_ShippingDetail_SetTaxesNotice "E2E_HappyPath"

BIZ_ShippingDetail_SetMersRegistration "E2E_HappyPath"

BIZ_ShippingDetail_SetPhysicalFileStorage "E2E_HappyPath"

If GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ZipcodeSelectorDialog"),8) Then
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ZipcodeSelectorDialog").SwfButton("swfname:=btnOK")
End If
