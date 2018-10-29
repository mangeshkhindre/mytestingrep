'@**************************************************************************************************
'@ TestStory: PTAC-2010 E2E_6FHAPURARM
'@ TestCase	: PTAC-1878 Qualification 2 - Fill 2015 Itemization and FHA Management
'@ Test Automation JIRA Task:  PTAC-2120 E2E_6FHAPURARM_Qualification
'@ TestData: 
   '1 Forms_2015Itemization, Set900Section, E2E_FHAPURARM
   '2 Forms_2015Itemization, Set1000Section, E2E_FHAPURARM
   '3 Forms_2015Itemization, Set1100Section, E2E_FHAPURARM
   '4 RegZ_LE_SetDisclosureInformation
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 In forms select 2015 Itemization form
   '2 Enter the values as in test data
   '3 Go to FHA Management screen and fill the data as per test data
'@ ExpectedResult: 
   '1 Form should open
   '2 should be able to input values
   '3 Loan data should be saved.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-1878", "Qualification 2 - Fill 2015 Itemization and FHA Management", Null
Dim objParentObject, objData,objPage
'Open 2015 Itemization form
BIZ_Forms_ShowAll
BIZ_Forms_Open "2015 Itemization"

'Fill required details in sections 900, 1000, 1100 in Itemization form
BIZ_2015Itemization_Set800Section "E2E_FHAPURARM"
BIZ_2015Itemization_Set900Section "E2E_FHAPURARM"
BIZ_2015Itemization_Set1000Section "E2E_FHAPURARM"
BIZ_2015Itemization_Set1100Section "E2E_FHAPURARM"

'Set the Disclosure
BIZ_RegZ_LE_SetDisclosureInformation "E2E_FHAPURARM"

Set objParentObject = SwfWindow("swfname:=MainForm").Page("index:=0")
Set objData = FRM_DS_GetTestData("Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "E2E_FHAPURARM")

BIZ_Forms_Open "Borrower Summary - Origination"

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "ARMTypeName")) Then
   GUI_WebButton_Click objParentObject.WebButton("html id:=StandardButton3")
   GUI_Object_WaitTillExistX SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfListView("swfname:=armListView"), 30
   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfListView("swfname:=armListView").Select FRM_DS_GetValue(objData, "ARMTypeName")
   SwfWindow("swfname:=MainForm").SwfWindow("swfname:=ARMTypeDetails").SwfButton("swfname:=okBtn").Click
   Wait g_TinyWaitSmall
End If

'Enter Basic FHA information
BIZ_FHAManagement_BasicFHAInfonew "E2E_FHA_BasicFHAInfo"

Set objData = FRM_DS_GetTestData("Forms_FNMAStreamlined", "FNMAStreamlined", "E2E_FHAPURARM")	
BIZ_Forms_Open "FNMA Streamlined 1003"
	
Set objPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "LendrCase")) Then 	
   GUI_WebEdit_Set objPage.WebEdit("html id:=l_305","index:=0"), FRM_DS_GetValue(objData, "LendrCase") 	
End If

Set objParentObject = Nothing
Set objData 		= Nothing
Set objPage			= Nothing