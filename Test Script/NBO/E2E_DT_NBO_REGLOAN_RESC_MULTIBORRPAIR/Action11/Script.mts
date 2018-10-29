If Parameter("strPurposeLoan") = "Primary" Then
   intDay1=DateAdd("d",-26,Date)
   intDay2=DateAdd("d",-25,Date)
   intDay3=DateAdd("d",-24,Date)
Else
   intDay1=DateAdd("d",-22,Date)
   intDay2=DateAdd("d",-21,Date)
   intDay3=DateAdd("d",-20,Date)
End If

FRM_Logger_ReportStepEvent "Start send Manual Initial CD for Multiple Borrower Pairs", "Started sending Manual Initial CD for Multiple Borrower Pairs", Null
'===========Get borrwer pair names ============
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")

'========== add NBOs to borrower pair=====
BIZ_AddNBO_BorrowerPair "E2E_DT_NBO1",strBorrPair3
BIZ_AddNBO_BorrowerPair "E2E_DT_NBO2",strBorrPair3

Dim arrInitialBorrPair()
ReDim Preserve arrInitialBorrPair(0)
arrInitialBorrPair(0) = strBorrPair1
ReDim Preserve arrInitialBorrPair(1)
arrInitialBorrPair(1) = strBorrPair2
ReDim Preserve arrInitialBorrPair(2)
arrInitialBorrPair(2) = strBorrPair3

'================Inital CD Sent Dates=================
Dim arrInitialCDSentDates(2)
 arrInitialCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(intDay1,1,"Reg_ZBusinessCalender")  
 arrInitialCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(intDay2,1,"Reg_ZBusinessCalender") 
 arrInitialCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(intDay3,1,"Reg_ZBusinessCalender") 

'======= Add Initial CD Disclosure for all three borrower paris ============
FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'==================Validate Initial CD Received Date for Multiple Borrower Pairs ====================
BIZ_DisclosureTracking_RescLoan_MultipleBorrPair_ValidateIntialCD arrInitialCDSentDates,arrInitialBorrPair,"Yes"

'==================Revise CD STARTS===============================
FRM_Logger_ReportStepEvent "Start send Manual Revised CD for Multiple Borrower Pairs", "Started sending Manual Revised CD for Multiple Borrower Pairs", Null

Dim arrRevisedBorrPair()
ReDim Preserve arrRevisedBorrPair(0)
arrRevisedBorrPair(0) = strBorrPair1
ReDim Preserve arrRevisedBorrPair(1)
arrRevisedBorrPair(1) = strBorrPair2
ReDim Preserve arrRevisedBorrPair(2)
arrRevisedBorrPair(2) = strBorrPair3

'================Revised CD Sent Dates=================
dtRevised=DateAdd("d",9,arrInitialCDSentDates(2))
Dim arrRevisedCDSentDates(2)
 arrRevisedCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(dtRevised,2,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(dtRevised,3,"Reg_ZBusinessCalender")
 
'======= Add Revised CD Disclosure for all three borrower paris ============
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD"  

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'==================Validate Initial CD Received Date ====================
BIZ_DisclosureTracking_RescLoan_MultipleBorrPair_ValidateRevisedCD arrRevisedCDSentDates,arrRevisedBorrPair,"Yes"
'==========================Save Loan Number ===================
BIZ_Loan_Save
