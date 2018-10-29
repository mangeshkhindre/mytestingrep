'@**************************************************************************************************
'@ TestStory: PTAC-2398 - E2E_8VAPURARM
'@ TestCase: PTAC-2171 - Processing 8- Order Title
'@ Test Automation JIRA Task: PTAC-2411 - E2E_8VAPURARM_Processing
'@ TestData: 
	'1 Services, TitleNClosing, E2E_VAPURARM
	'2 Global_Data, Website, E2E_VAPURARM_TitleCenter
	'3 Services, TitleService, E2E_VAPURARM
	'4 eFolder_Tab, AttachDocuments, E2E_VAPURARM
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 Test step
    '1 click services and click order title.
	'2 click continue.
	'3 select integration testing title service and click next.( For our Prolifics environment select 'Ellie Mae').
	'4 Fill phone number and select check box-request fee quote and comment- yes.
	   'select title tab checkbox-order title
	   'under product select alta.jr.title policy
	   'under closing and escrow checkbox -order closing/escrow 
	   'select closing/escrow services and click submit order.
	'5 click ok.
   'Step2 Test step
    '1 now go to tile center link in test data column and login with the credentials provided.
	'2 select your loan based on your order date and product type and click review request.
	  'Fee request - In comments enter" Fee quote is given" and click accept.
      'closing title- click review.
	  'click prelim information button on top.
    '3 Under title information enter the following values:
	  'book:3298
      'page:38
	  'parcel:3847
  	  'lot:32
	  'block:234
	  'section:3214
	  'original principal:200,000
	  'current principal:150,000
      'title report date: today's date
      'and click send.
	'4 click title and recording fee button. Enter the following data:(under paid by borrower)
      'settlement fee : 1092
	  'closing fee: 200
	  'owners title insurance : 400
	  'lenders title insurance : 500
	  'recording fee: 165
	  'and click send fees button.
	'5 click on send messages or documents button.
	'6 from dropdown next to attach pdf select title report click browse and select any pdf document from local and attach. click send.
	'7 under services tab click on TITLE icon.
	'8 click on import under order update.
	'9 click on import.
	'10 click ok.
	'11 In e-folder you can see the attachment for the title with received status.
	'12 In e-folder there will be three title orders. select the ones that are in expected status and click browse and attach and attach a pdf from local
   'Step3 Test step
	'1 Click log tab and click on processing.
	'2 click the magnifying lens next to loan processor and select user markuslp and click ok.
	'3 An error occurred window will open. click ignore.
	'4 Under documents there will be a list of documents. check all of them.
	'5 click efolder and double click on bank statements.
	'6 click on to browse and attach icon on the top right and select a pdf document from your local and open.
	'7 In processing window check all the checkboxes under the tasks.
    '8 Now click finished check box.
'@ ExpectedResult: 
   'Step1 ExpectedResult
	'1 preferred title welcome window opened.
	'2 order tile and closing window will open.
	'3 tile and closing order details window will open.
	'4  your order has been sent to mike jones message will pop up
   'Step2 ExpectedResult
	'1 should be able to login.
	'2 order details will open.(status will change from review request to view details.
	   'prelim information window will open.
	'3 your prelim information has been sent message will appear.
	'4 Title recording fees window will open.
	   'your title and recording fees have been sent message will be seen.
	'5 send messages or documents window will be shown.
	'6 your documents have been delivered message will appear.
	'7 Title order status window will open.
	'8 order update window will open.
	'9 The selected data and documents have been imported successfully message will pop up.
	'12 all three title orders must have received status.
   'Step3 ExpectedResult
	'1 processing worksheet will open.
	'2 select a loan team member window will open.
	'3 window will disappear.
	'4 should be able to check all of them.
	'5 document details (bank statement) will open. 
	'6 under files in the document details(bank statement window you should be able to see your attached document.
	'7 should be able to check all tasks.
	'8 milestone should be finished.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2171","TestCase Name - Processing 8- Order Title", Null

Dim objData,blnDocumentStatus
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_VAPURARM_Processing")
BIZ_Services_SetOrderTitleAndClosing "E2E_VAPURARM"

GUI_Dialog_Encompass_OK("")
GUI_Browser_CloseAllBrowsers g_DefaultBrowser

BIZ_Services_LoginTitleCenter "E2E_VAPURARM_TitleCenter"
BIZ_Services_ProcessTitleCenterDetailsAndSendDocument "E2E_VAPURARM"
GUI_Dialog_Encompass_OKX 25, ""

'BIZ_Services_ImportTitleDocument ""
BIZ_Nav_eFoler_Open()
BIZ_Documents_AttachDocuments "E2E_VAPURARM"
BIZ_Nav_eFoler_Close()

blnDocumentStatus = BIZ_Documents_VerifyDocumentStatus("Title Report", "Received")  
If (blnDocumentStatus = True) Then
   FRM_Logger_ReportPassEvent "Title Report Status","Title Report is in Received Status", Null
Else
	FRM_Logger_ReportFailEvent "Title Report Status","Title Report is not in Received Status", Null
End If

BIZ_Document_AttachMandatoryDocuments "Processing", "E2E_VAPURARM_Processing"
BIZ_Loan_FinishMilestone_AssignUser "Processing", FRM_DS_GetValue(objData, "NextUser")

If BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing") Then
   BIZ_Forms_Open "Borrower Summary - Origination"
   GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_VAPURARM"    
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData 				 = Nothing
	
