'@**************************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: PTAC-1127
'@ TestData: "eFolder_Tab"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Click services and click order title and click continue.
	   'Select "EllieMae" title service and click next.
	   '(Note: Pls check email Id: bnemuri@elliemae.com for Title company and then select)
	   'Fill phone number and select check box -request fee quote and comment- yes.
	   'Select title tab
	   'checkbox-order title
	   'Select need by date: <Today's date>
	   'under product select 
	   'Commitment w/Full closing
	   'under closing and escrow checkbox -order closing/escrow 
	   'select closing/escrow services and click submit order
	   'click ok.
	'2 Now go to tile center link in test data column and login with the credentials provided.
	   'select your loan based on your order date and product type and click review request.
	   'Fee request - In comments enter" Fee quote is given" and click accept.
	   'closing title- click review.
	   'click prelim information button on top.
	   'Under title information enter the following values:
	   'book:3298
	   'page:38
	   'parcel:3847
	   'lot:32
	   'block:234
	   'section:3214
	   'original principal:200,000
	   'current principal:148,000
	   'title report date: today's date
	   'click send.
	   'click title and recording fee button. Enter the following data:(under paid by borrower)
	   'settlement fee : 1092
	   'closing fee: 200
	   'owners title insurance : 400
	   'lenders title insurance : 500
	   'recording fee: 165
	   'click send fees button.
	   'click on send messages or documents button.
	   'from dropdown next to attach pdf select title report click browse and select any pdf document from local and attach. click send.
	   'under services tab click on TITLE icon.
	   'click on import under order update.
	   'click on import.
	   'click ok.
	   'In e-folder you can see the attachment for the title with received status.
	   'In e-folder there will be three title orders. select the ones that are in expected status and click browse and attach and attach a pdf from local.
	'3 Check the status of in the Title Center

'@ ExpectedResult: 
	'1 preferred title welcome window opened.
	   'order tile and closing window will open.
	   'tile and closing order details window will open.
	   'your order has been sent to mike jones message will pop up
	'2 should be able to login.
	   'order details will open.(status will change from review request to view details.
	   'prelim information window will open.
	   'your prelim information has been sent message will appear.
	   'Title recording fees window will open.
	   'your title and recording fees have been sent message will be seen.
	   'send messages or documents window will be shown.
	   'your documents have been delivered message will appear.
	   'Title order status window will open.
	   'order update window will open.
	   'The selected data and documents have been imported successfully message will pop up.
	   'all three title orders must have received status.
	'3 It should display as "Delivered" in the Current Order page of Title & Closing Center
'***************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case PTAC-1127","TestCase Name - HP Processing - 4 Order title & Closing", Null

Dim UserList,ScrollBoar,objData,OrderBranchDialog,StatusColIndex,RowCount,DocumentNumber,DocumentStatus
'Open Title and Closing Screen under Services
BIZ_Services_Open "Title & Closing"

Set UserList   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TitleProviderDialog").SwfObject("swfname:=myLst")
Set ScrollBoar = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TitleProviderDialog").SwfScrollBar("swfname:=vPanelScrollBar")

GUI_List_ClickRow UserList, ScrollBoar, 0, "EllieMae", True, False, False, "Single"
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TitleProviderDialog").swfButton("swfname:=orderBtn").Click

Set objData = FRM_DS_GetTestData("Services", "TitleNClosing", "E2E_HappyPath")
Set OrderBranchDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderBranchDialog")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "Phone")) Then 
	GUI_SwfEdit_Set OrderBranchDialog.SwfEdit("swfname:=fromPhoneTxt"), FRM_DS_GetValue(objData, "Phone")
End if

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "feeQuoteCheck")) Then 
	GUI_SwfCheckbox_Set OrderBranchDialog.SwfCheckBox("swfname:=feeQuoteChk"),FRM_DS_GetValue(objData, "feeQuoteCheck")
End if

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "FeeQuoteComments")) Then 
	GUI_SwfEditor_Type OrderBranchDialog.SwfEditor("swfname:=feeQuoteCommentsTxt"), FRM_DS_GetValue(objData, "FeeQuoteComments")
End if

GUI_SwfTab_Click OrderBranchDialog.SwfTab("swfname:=orderInfoTab"), "Title"

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "TitleCheck")) Then 
	GUI_SwfCheckbox_Set OrderBranchDialog.SwfCheckBox("swfname:=titleChk"), FRM_DS_GetValue(objData, "TitleCheck")	
End if

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "TitleComments")) Then 
	GUI_SwfEditor_Type OrderBranchDialog.SwfEditor("swfname:=titleCommentTxt"), FRM_DS_GetValue(objData, "TitleComments")
End if

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "TitleProductList")) Then 
	GUI_SwfList_Select OrderBranchDialog.SwfList("swfname:=titleProductLst"), FRM_DS_GetValue(objData, "TitleProductList")
End if

GUI_SwfTab_Click OrderBranchDialog.SwfTab("swfname:=orderInfoTab"), "Closing / Escrow"

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "ClosingCheck")) Then 
	GUI_SwfCheckbox_Set OrderBranchDialog.SwfCheckBox("swfname:=closingChk"), FRM_DS_GetValue(objData, "ClosingCheck")
End if

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "ClosingProductList")) Then 
	GUI_SwfList_Select OrderBranchDialog.SwfList("swfname:=closingProductLst"), FRM_DS_GetValue(objData, "ClosingProductList")
End if

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderBranchDialog").SwfButton("swfname:=sendBtn")

wait 2

GUI_Dialog_Encompass_OKX 480, ""

BIZ_Services_LoginTitleCenter "E2E_HappyPath_TitleCenter"

BIZ_Services_TitleCenterProcessAndSendDocument 200000,150000,1092,200,400,500,165,"Title Document"

BIZ_Services_ImportTitleDocument ""

'====Clicks on eFolder====
BIZ_Nav_eFoler_Open()

StatusColIndex = GUI_List_GetColumnIndex(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"),"Status")
CountOfReceivedDocuments = 0
RowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"))
For RowNumber = 0 To RowCount-1 Step 1
	DocumentNumber =  GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"), RowNumber,2)
    DocumentStatus = GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"), RowNumber, StatusColIndex)
    if(InStr(DocumentNumber,"Title Report") > 0 and InStr(DocumentStatus, "Received") > 0) then 
 		FRM_Logger_ReportPassEvent "In e-folder you can see the attachment for the title with received status.", "all three title orders must have received status", null
 		CountOfReceivedDocuments = CountOfReceivedDocuments + 1
 		Exit For
    End if
Next
 
BIZ_Nav_eFoler_Close()
