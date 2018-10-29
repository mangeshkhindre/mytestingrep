'=========Send Intial CD - Print Preview Disclosure======
FRM_Logger_ReportStepEvent  "Send Initial CD for Single Borrower Pair through Print Preview", "Started sending Initial CD for Single Borrower Pair through Print Preview", Null
BIZ_DisclosureTracking_SendIntialCD_PrintPreview()

'==================Validate Initial CD Received Date ====================
FRM_Logger_ReportInfoEvent "Verify Sent Date, Earliest Closing Date, CD Received Date ", "Validating Sent Date, Earliest Closing Date, CD Received Date", Null
dtSentDate=DateAdd("d",-10,Date)	
dtSentDate=BIZ_DisclosureTracking_DateCalculation(dtSentDate,1,"Reg_ZBusinessCalender")	
BIZ_DisclosureTracking_NonResc_SingleBorrPair_ValidateIntialRevisedCD strRowID,dtSentDate,"Initial","Yes"

'=========Send Revised CD - eDisclosure======
FRM_Logger_ReportStepEvent "Send Revised CD for Single Borrower Pair through eDisclosure", "Started sending Revised CD for Single Borrower Pair through eDisclosure", Null
BIZ_DisclosureTracking_SendeDisclosure "E2E_DisclosureTracking","E2E_CD_DisclosureTracking"
If Dialog("text:=Encompass","height:=152").Exist(10) Then
	GUI_WinButton_Click Dialog("text:=Encompass","height:=152").WinButton("text:=&Yes")
End If

'======== Set Authentication Code============
BIZ_DisclosureTracking_SetAuthenticationCode "E2E_NBO_DisclosureTracking"

'======== Go to Disclosure Tracking Tool and Validate eDisclosure Status===========
BIZ_Tools_Open "Disclosure Tracking"

'==================Validate Revised CD Received Date ============
FRM_Logger_ReportInfoEvent "Verify Earliest Closing Date, CD Revised Received Date ", "Validationg Earliest Closing Date, CD Revised Received Date", Null
dtSentDate= Date 

BIZ_DisclosureTracking_NonResc_SingleBorrPair_ValidateIntialRevisedCD "E2E_DisclosureTracking",dtSentDate,"Revised","Yes"

'=============== Save Loan ==================
BIZ_Loan_Save	
