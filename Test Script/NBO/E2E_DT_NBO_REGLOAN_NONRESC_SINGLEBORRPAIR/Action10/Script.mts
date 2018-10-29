'======== Send eConsent and Validate eConsent Status =============
FRM_Logger_ReportStepEvent "Send eConsent for Single Borrower Pair and Accept it", "Started sending for Single Borrower Pair", Null
BIZ_DisclosureTracking_SendeConsent "Yes"

' ======Verify LE Due Date==========
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTracking_LEDueDate()
    
'======== Send Intial LE -Manual =============
FRM_Logger_ReportStepEvent "Send Manual Initial LE for Single Borrower Pair", "Started sending Manual Initial LE for Single Borrower Pair", Null
BIZ_DisclosureTrackingTool_AddDisclosure TRUE,"LE",FALSE,FALSE

'==================Validate Initial LE Received Date ====================
dtSentDate=DateAdd("d",-45,Date)    
dtSentDate=BIZ_DisclosureTracking_DateCalculation(dtSentDate,1,"Reg_ZBusinessCalender")    
BIZ_DisclosureTracking_ValidateIntialRevisedLE dtSentDate,"Initial","Yes"

Dim arrSentDates(2)
arrSentDates(0) = ""
arrSentDates(1) = "12/12/2050"
arrSentDates(2) = CDate(dtSentDate)
BIZ_DisclosureTracking_ValidateLESent arrSentDates,"Initial"

'=================Validate Intent to Proceed and Earliest Fee Collection dates ==================
BIZ_DisclosureTracking_ValidateIntentToProceed_EarliestFeeCollection "Initial"

'=========Revised LE Send - Through Print======
FRM_Logger_ReportStepEvent "Send Revised LE for Single Borrower Pair through Print", "Started sending Revised LE for Single Borrower Pair through Print", Null
BIZ_DisclosureTracking_SendRevisedLE_Print()

'======== Go to Disclosure Tracking Tool ===========
BIZ_Tools_Open "Disclosure Tracking"

'==================Validate Revised LE  Date ============
dtSentDate=DateAdd("d",-20,Date)
dtSentDate=BIZ_DisclosureTracking_DateCalculation(dtSentDate,1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_ValidateIntialRevisedLE dtSentDate,"Revised","Yes"

'================Verify LE Sent Date should be earliest of all Sent Dates=================
Dim arrSentDatesRev(2)
arrSentDatesRev(0) = ""
arrSentDatesRev(1) = "12/12/2050"
arrSentDatesRev(2) = CDate(dtSentDate)
BIZ_DisclosureTracking_ValidateLESent arrSentDatesRev,"Revised"
         
'======================== Save Loan ======================
BIZ_Loan_Save
