'@**************************************************************************************************
'@ TestStory: PTAC-2445 E2E_5FHANoCHOTRefiFix
'@ TestCase : PTAC-1829 FHANOCHOTREFIFIX Processing 8- Order title
'@ Test Automation JIRA Task: PTAC-2880 E2E_5FHANoCHOTRefiFix_Processing
'@ TestData: 
	'1 Services, TitleNClosing, E2E_FHANoCHOTRefiFix
	'2 Global_Data, Website, E2E_FHANoCHOTRefiFix_TitleCenter
	'3 Services, TitleService, E2E_FHANoCHOTRefiFix
	'4 eFolder_Tab, AttachDocuments, E2E_FHANoCHOTRefiFix
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
    '01 click services and click order title
    '02 If 'EllieMae' is not under 'My provider' click on 'All Providers' tab and click the 'clear' button 
        'and then select the 'Elliemae' from the list and click on 'Add to my list'
    '03 Fill phone number and select check box -request fee quote and comment- yes
    '04 select title tab.checkbox-order title
    '05 under product select alta.jr.title policy.under closing and escrow checkbox -order closing,escrow 
    '06 select closing,escrow services.Select Payoff tab and enter your loan number for loan number field, for all other fields enter any value
    '07 Select Verifications tab and check on the check box 'verify Homeowners insurance give 
	    'company name: xy
	    'phone number: 1122344455
	    'Account number:555666
	    'agent name : agent1'submit order.Check the checkbox and enter all the other fields with any value.click ok
    '08 now go to tile center link in test data column and login with the credentials provided
    '09 select your loan based on your order date and product type and click review request.
       'Fee request - In comments enter" Fee quote is given" and click accept.
    '10 closing title- click review.click prelim information button on top
    '11 Under title information enter the following values:
	 	'book:3298
	 	'page:38
	 	'parcel:3847
	 	'lot:32
	 	'block:234
	 	'section:3214
	 	'original principal:333,333
	 	'current principal:333333
	 	'title report date: today's date and click send
    '12 click title and recording fee button. Enter the following data:(under paid by borrower)
		'settlement fee : 1092
		'closing fee: 200
		'owners title insurance : 400
		'lenders title insurance : 500
		'recording fee: 165 and click send fees button
	'13 click on send messages or documents button.from dropdown next to attach pdf select title report 
	    'click browse and select any pdf document from local and attach. click send.
	'14 under services tab click on TITLE icon.click on import under order update.click on import.click ok
	'15 In e-folder you can see the attachment for the title with received status.
	     'In e-folder there will be three title orders. select the ones that are in expected status and click browse and attach and attach a pdf from local
	'16 Click log tab and click on processing.Click the magnifying lens next to loan processor and select user clarklp and click ok.
	'17 An error occurred window will open. click ignore.Under documents there will be a list of documents.check all of them
	'18 Click efolder and double click on bank statements.
	    'Click on to browse and attach icon on the top right and select a pdf document from your local and open.
	'19 In processing window check all the checkboxes under the tasks.Now click finished check box
'@ ExpectedResult: 
    '01 preferred title welcome window opened
    '02 order tile and closing window will open
    '03 tile and closing order details window will open
    '04 your order has been sent to mike jones message will pop up
    '05 should be able to login
    '06 order details will open.(status will change from review request to view details.prelim information window will open
    '07 your prelim information has been sent message will appear
    '08 Title recording fees window will open.your title and recording fees have been sent message will be seen
    '09 send messagesor documents window will be shown
    '10 your documents have been delivered message will appear
    '11 Title order status window will open
    '12 order update window will open
    '13 The selected data and documents have been imported successfully message will pop up
    '14 all three title orders must have received status
    '15 processing worksheet will open
    '16 select a loan team member window will open
    '17 window will disappear
    '18 should be able to check all of them
    '19 document details (bank statement) will open
    '20 under files in the document details(bank statement window you should be able to see your attached document
    '21 should be able to check all tasks
    '22 Milestone should be finished
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1829","FHANOCHOTREFIFIX Processing 8- Order title", Null

Dim objData,blnDocumentStatus
Set objData = FRM_DS_GetTestData("Loans", "Milestone", "E2E_FHANOCHOTREFIFIX_Processing")

BIZ_Services_SetOrderTitleAndClosing "E2E_FHANoCHOTRefiFix"

GUI_Dialog_Encompass_OK("")
GUI_Browser_CloseAllBrowsers g_DefaultBrowser
GUI_Browser_CloseAllBrowsers g_DefaultBrowser

BIZ_Services_LoginTitleCenter "E2E_FHANoCHOTRefiFix_TitleCenter"
BIZ_Services_ProcessTitleCenterDetailsAndSendDocument "E2E_FHANoCHOTRefiFix"

GUI_Dialog_Encompass_OKX 50, ""

BIZ_Services_ImportTitleDocument ""
BIZ_Nav_eFoler_Open()
BIZ_Documents_AttachDocuments "E2E_FHANoCHOTRefiFix"
BIZ_Nav_eFoler_Close()

blnDocumentStatus = BIZ_Documents_VerifyDocumentStatus("Title Report", "Received")  
If (blnDocumentStatus = True) Then
   FRM_Logger_ReportPassEvent "Title Report Status","Title Report is in Received Status", Null
Else
   FRM_Logger_ReportPassEvent "Title Report Status","Title Report is not in Received Status", Null
End If

BIZ_Document_AttachMandatoryDocuments "Processing", "E2E_FHANoCHOTRefiFix_Processing"
BIZ_Loan_FinishMilestone_AssignUser "Processing", FRM_DS_GetValue(objData, "NextUser")

If (BIZ_Loan_VerifyIfMilestoneIsCompletedForLoan("Processing")) Then 
    BIZ_Forms_Open "Borrower Summary - Origination"
    GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox10"), "MS4Complete_FHANoCHOTRefiFix"
End If

'Exists the Loan Details
BIZ_Loan_Exit True

'Logs out of Encompass
BIZ_Login_UserLogout()

Set objData  = Nothing