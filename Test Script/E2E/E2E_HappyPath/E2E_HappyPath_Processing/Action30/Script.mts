'@**************************************************************************************************
'@ TestStory: PTAC - 1129 HAPPYPATH_E2E
'@ TestCase: PTAC-1127 - HP Processing - 4 Order title & Closing
'@ Test Automation JIRA Task: PTAC-1134 Order flood Certification
'@ TestData: 
   '1 Global_Data, Website, E2E_HappyPath_TitleCenter
   '2 Services, TitleService, E2E_HappyPath
   '3 Services, TitleNClosing, E2E_HappyPath
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click services and click order title and click continue.
   '2 Select "EllieMae" title service and click next.
      '(Note: Pls check email Id: bnemuri@elliemae.com for Title company and then select)
   '3 Fill phone number and select check box -request fee quote and comment- yes.
	  'Select title tab
      'checkbox-order title
      'Select need by date: <Today's date>
      'under product select 
      'Commitment w/Full closing
      'under closing and escrow checkbox -order closing/escrow 
      'select closing/escrow services and click submit order
      'click ok.
   '4 Now go to tile center link in test data column and login with the credentials provided.
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
      'and click send.
      'click title and recording fee button. Enter the following data:(under paid by borrower)
      'settlement fee : 1092
      'closing fee: 200
      'owners title insurance : 400
      'lenders title insurance : 500
      'recording fee: 165
      'and click send fees button.
      'click on send messages or documents button.
      'from dropdown next to attach pdf select title report click browse and select any pdf document from local and attach. click send.
	  'under services tab click on TITLE icon.
      'click on import under order update.
      'click on import.
      'click ok.
      'In e-folder you can see the attachment for the title with received status.
      'In e-folder there will be three title orders. select the ones that are in expected status and click browse and attach and attach a pdf from local.
   '5 Check the status of in the Title Center

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

FRM_Logger_ReportStepEvent "Start Test Case PTAC-1127","TestCase Name - HP Processing - 4 Order title & Closing", Null

BIZ_Nav_SelectLoanTab()
BIZ_Services_SetOrderTitleAndClosing "E2E_HappyPath"
GUI_Dialog_Encompass_OKX 120, ""

GUI_Browser_CloseAllBrowsers g_DefaultBrowser

BIZ_Services_LoginTitleCenter "E2E_HappyPath_TitleCenter"

BIZ_Services_ProcessTitleCenterDetailsAndSendDocument "E2E_HappyPath"
GUI_Dialog_Encompass_OKX 5, ""

BIZ_Services_ImportTitleDocument ""

'====== Clicks on eFolder ======
BIZ_Nav_eFoler_Open()

strStatusColIndex = GUI_List_GetColumnIndex(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"),"Status")
CountOfReceivedDocuments = 0
RowCount = GUI_List_GetNumberofRows(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"))

For intRowNumber = 0 To RowCount-1 Step 1
	intDocumentNumber =  GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"), intRowNumber,2)
    strDocumentStatus = GUI_List_GetCellData(SwfWindow("swfname:=eFolderDialog").SwfObject("swfname:=gvDocuments"), intRowNumber, strStatusColIndex)
	
    If(InStr(intDocumentNumber,"Title Report") > 0 and InStr(strDocumentStatus, "Received") > 0) Then 
 		FRM_Logger_ReportPassEvent "In e-folder you can see the attachment for the title with received status.", "all three title orders must have received status", null
 		CountOfReceivedDocuments = CountOfReceivedDocuments + 1
 		Exit For
    End If
	
Next
 
BIZ_Nav_eFoler_Close()

Set UserList 		  = Nothing
Set ScrollBoar  	  = Nothing
Set OrderBranchDialog = Nothing
Set objData 		  = Nothing
