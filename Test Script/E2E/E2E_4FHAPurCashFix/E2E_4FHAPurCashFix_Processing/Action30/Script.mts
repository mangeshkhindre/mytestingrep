'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3169 FHAPURCHASEFIX - Processing 8- Order Title
'@ Test Automation JIRA Task: PTAC-3153 E2E_4FHAPURCASHFIX_Processing
'@ TestData: 
	'Services/TitleNClosing/E2E_FHAPURCASHFIX
	'Global_Data/Website/E2E_FHAPURCASHFIX_TitleCenter
	'Services/TitleService/E2E_FHAPURCASHFIX
	'eFolder_Tab/AttachDocuments/E2E_FHAPURCASHFIX
	'"Loans/MilestoneDocument/E2E_FHAPURCASHFIX_Processing
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   'Step1 Test Steps:
	'1 click services and click order title.
    '2 click continue.
    '3 select integration testing title service and click next.( For our Prolifics environment select 'Ellie Mae').
    '4 Fill phone number and select check box yes.
    '5 select title tab checkbox-order title under product select alta.jr.title policy under closing and escrow checkbox -order closing/escrow 
	'6 select closing/escrow services and click submit order.
	'7 click ok.
   'Step2 Test Steps:
	'01 now go to tile center link in test data column and login with the credentials provided.
	'02 select your loan based on your order date and product type and click review request.
	    'Fee request - In comments enter" Fee quote is given" and click accept.
	    'closing title- click review.
	    'click prelim information button on top.
	'03 Under title information enter the following values:
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
	'04 click title and recording fee button. Enter the following data:(under paid by borrower)
	    'settlement fee : 1092
	    'closing fee: 200
	    'owners title insurance : 400
	    'lenders title insurance : 500
	    'recording fee: 165
	    'and click send fees button.
	'05 click on send messages or documents button.
	'06 from dropdown next to attach pdf select title report click browse and select any pdf document from local and attach. click send.
	'07 under services tab click on TITLE icon.
	'08 click on import under order update.
	'09 click on import.
	'10 click ok.
	'11 In e-folder you can see the attachment for the title with received status.
	'12 In e-folder there will be three title orders. select the ones that are in expected status and click browse and attach and attach a pdf from local.
   'Step3 Test Steps:
	'1 Click log tab and click on processing.
	'2 click the magnifying lens next to loan processor and select user markuslp and click ok.
	'3 An error occurred window will open. click ignore.
	'4 Under documents there will be a list of documents. check all of them.
	'5 click efolder and double click on bank statements.
	'6 click on to browse and attach icon on the top right and select a pdf document from your local and open.
	'7 In processing window check all the checkboxes under the tasks.
	'8 Now click finished check box.
'@ ExpectedResult: 
   'Step1 Expected result:	
	'1 preferred title welcome window opened.
	'2 order tile and closing window will open.
	'3 tile and closing order details window will open.
	'4 your order has been sent to mike jones message will pop up
   'Step2 Expected result:
	'01 should be able to login.
	'02 order details will open.(status will change from review request to view details.prelim information window will open.
	'03 your prelim information has been sent message will appear.
	'04 Title recording fees window will open.your title and recording fees have been sent message will be seen.
	'05 send messages or documents window will be shown.
	'06 your documents have been delivered message will appear.
	'07 Title order status window will open.
	'08 order update window will open.
	'09 The selected data and documents have been imported successfully message will pop up.
	'10 all three title orders must have received status.
   'Step2 Expected result:
	'1 processing worksheet will open.
	'2 select a loan team member window will open.
	'3 window will disappear.
	'4 should be able to check all of them.
	'5 document details (bank statement) will open. 
	'6 under files in the document details(bank statement window you should be able to see your attached document.
	'7 should be able to check all tasks.
	'8 milestone should be finished.
'********************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case PTAC-3169","FHAPURCHASEFIX - Processing 8- Order Title", Null

Dim objData, blnDocumentStatus
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHAPURCASHFIX_Processing")

BIZ_Services_SetOrderTitleAndClosing "E2E_FHAPURCASHFIX"
GUI_Dialog_Encompass_OK("")
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
BIZ_Services_LoginTitleCenter "E2E_FHAPURCASHFIX_TitleCenter"
BIZ_Services_ProcessTitleCenterDetailsAndSendDocument "E2E_FHAPURCASHFIX"
GUI_Dialog_Encompass_OKX 25, ""
BIZ_Services_ImportTitleDocument ""

wait g_TinyWaitSmall

BIZ_Nav_eFoler_Open()
BIZ_Documents_AttachDocuments "E2E_FHAPURCASHFIX"
BIZ_Nav_eFoler_Close()

blnDocumentStatus = BIZ_Documents_VerifyDocumentStatus("Title Report", "Received")
  
If (blnDocumentStatus = True) Then
	FRM_Logger_ReportPassEvent "Title Report Status","Title Report is in Received Status", Null
Else
	FRM_Logger_ReportFailEvent "Title Report Status","Title Report is not in Received Status", Null
End If

BIZ_Document_AttachMandatoryDocuments "Processing", "E2E_FHAPURCASHFIX_Processing"
BIZ_Loan_FinishMilestone_AssignUser "Processing", FRM_DS_GetValue(objData, "NextUser")

Set objData = Nothing



