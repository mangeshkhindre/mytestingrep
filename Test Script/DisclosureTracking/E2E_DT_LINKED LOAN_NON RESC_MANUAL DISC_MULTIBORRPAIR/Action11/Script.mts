'==========================Send Intial CD - Manual Disclosure======
FRM_Logger_ReportStepEvent "Send Manual Initial CD for Multiple Borrower Pairs", "Started sending Manual Initial CD for Multiple Borrower Pairs", Null

'===========Get borrwer pair names ============
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")

'================Inital CD Sent Dates=================
Dim arrInitialCDSentDates(2)
 arrInitialCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-30,Date),1,"Reg_ZBusinessCalender")
 arrInitialCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-28,Date),1,"Reg_ZBusinessCalender")
 arrInitialCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-29,Date),1,"Reg_ZBusinessCalender") 

'======= Add Initial CD Disclosure for all three borrower paris ============
FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'==================Validate Initial CD Received Date for Multiple Borrower Pairs ====================
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_ValidateIntialCD arrInitialCDSentDates,strBorrPair1,strBorrPair2,strBorrPair3,"No"

'=========Send Revised CD - Manual Disclosure======
FRM_Logger_ReportStepEvent "Send Revised Manual Revised CD for Multiple Borrower Pairs", "Started sending Manual Revised CD for Multiple Borrower Pairs", Null

'================Revised CD Sent Dates=================
dtRevised=DateAdd("d",9,arrInitialCDSentDates(1))
Dim arrRevisedCDSentDates(2)
 arrRevisedCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(dtRevised,3,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(dtRevised,2,"Reg_ZBusinessCalender")
 
'======= Add Revised CD Disclosure for all three borrower paris ============
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD"  

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD"  

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'==================Validate Initial CD Received Date ====================
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_ValidateRevisedCD arrRevisedCDSentDates,strBorrPair1,strBorrPair2,strBorrPair3,"No"

'=============== Save Loan ==================
BIZ_Loan_Save  
