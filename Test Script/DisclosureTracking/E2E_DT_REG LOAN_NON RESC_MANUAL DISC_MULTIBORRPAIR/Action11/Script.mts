FRM_Logger_ReportStepEvent "Send Manual Initial CD for Multiple Borrower Pairs", "Started sending Manual Initial CD for Multiple Borrower Pairs", Null
'===========Get borrwer pair names ============
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")

'========================= Sending Intial CD for Pair-1 ================
ReDim arrInitialCDSentDates(0)
arrInitialCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-30,Date),1,"Reg_ZBusinessCalender")

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair1, Null
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD" 
arrBorrPair1=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","CD",arrInitialCDSentDates(0),"","","No","No")

'========================= Validating IntialCDReceived for Pair-1 ================
FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, "Validating CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, Null
If ubound(arrBorrPair1)>0 Then 	
	dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")
	dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
Else
	dtExpCDReceived=""
	dtCDSent=arrInitialCDSentDates(0)
End If
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"Before"

'========================= Sending Intial CD for Pair-2 ================
FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair2, Null
ReDim Preserve arrInitialCDSentDates(1) 
arrInitialCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-28,Date),1,"Reg_ZBusinessCalender") 
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD"  
arrBorrPair2=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","CD",arrInitialCDSentDates(1),"","","No","No")

'========================= Validating IntialCDReceived for Pair-2 ================
FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, "Validating CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, Null
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"Before"

'========================= Sending Intial CD for Pair-3 ================
FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair3, Null
ReDim  Preserve arrInitialCDSentDates(2)
arrInitialCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-29,Date),1,"Reg_ZBusinessCalender") 
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"
arrBorrPair3=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","CD",arrInitialCDSentDates(2),"","","No","No")

'========================= Validating IntialCDReceived for Pair-3 ================
FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, "Validating CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, Null
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"Before"

'=================================================Calculating Actual Received Dates of Borrower and Co Borrower for 3 pairs =================================
dtActualRec_BorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(0)),4,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(0)),2,"Reg_ZBusinessCalender")
 
dtActualRec_BorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(1)),3,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(1)),1,"Reg_ZBusinessCalender")
 
dtActualRec_BorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(2)),3,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(2)),1,"Reg_ZBusinessCalender")


'======= Set Borrower Pair-1 Actual Received Dates for Initial CD and Validating IntialCDReceived for Pair-1 ============
arrBorrPair1=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","CD","",dtActualRec_BorrPair1,dtActualRec_CoBorrPair1,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, "Validating CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"After"

'======= Set Borrower Pair-2 Actual Received Dates for Initial CD and Validating IntialCDReceived for Pair-3 ============
arrBorrPair2=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","CD","",dtActualRec_BorrPair2,dtActualRec_CoBorrPair2,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, "Validating CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"After"  
    
'======= Set Borrower Pair-3 Actual Received Dates for Initial CD and Validating IntialCDReceived for Pair-3 ============
arrBorrPair3=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","CD","",dtActualRec_BorrPair3,dtActualRec_CoBorrPair3,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,arrInitialCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrBorrPair1,arrBorrPair2,arrBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, "Validating CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_IntialCDReceived arrInitialCDSentDates,dtCDSent,dtExpCDReceived,"After"



'==============================================================================Send Revised CD - Manual Disclosure=========================================================
FRM_Logger_ReportStepEvent "Send Manual Revised CD for Multiple Borrower Pairs", "Started sending Manual Revised CD for Multiple Borrower Pairs", Null

'========================= Sending Revised CD for Pair-1 ================
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair1, Null
dtRevised=DateAdd("d",9,arrInitialCDSentDates(1))
ReDim arrRevisedCDSentDates(0) 
arrRevisedCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
BIZ_Forms_Open "Borrower Summary - Origination"

BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD"  
arrRevisedBorrPair1=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","CD",arrRevisedCDSentDates(0),"","","Yes","No") 

'========================= Validating RevisedCDReceived for Pair-1 ================
FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, "Validating Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, Null
If ubound(arrRevisedBorrPair1)>0 Then 	
	dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
	dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")
Else
	dtCDSent=arrRevisedCDSentDates(0)
	dtExpCDReceived=""
End If
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"Before","Invalid"


'========================= Sending Revised CD for Pair-2 ================
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair2, Null
dtRevised=DateAdd("d",11,arrInitialCDSentDates(1))
ReDim Preserve arrRevisedCDSentDates(1) 
arrRevisedCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD" 
arrRevisedBorrPair2=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","CD",arrRevisedCDSentDates(1),"","","Yes","No")

'========================= Validating RevisedCDReceived for Pair-2 ================
FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, "Validating Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, Null
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"Before","Valid"

'========================= Sending Revised CD for Pair-3 ================
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair3, Null
dtRevised=DateAdd("d",10,arrInitialCDSentDates(1))
ReDim Preserve arrRevisedCDSentDates(2) 
arrRevisedCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"
arrRevisedBorrPair3=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","CD",arrRevisedCDSentDates(2),"","","Yes","No") 

'========================= Validating RevisedCDReceived for Pair-3 ================
FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, "Validating Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, Null
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"Before","Valid"
   

'=====================Caculationg Actual Received Dates of Borrower and Co Borrower for 3 pairs ====================================
dtActualRec_BorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(0)),4,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(0)),2,"Reg_ZBusinessCalender")
 
dtActualRec_BorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(1)),3,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(1)),1,"Reg_ZBusinessCalender")
 
dtActualRec_BorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(2)),3,"Reg_ZBusinessCalender")
dtActualRec_CoBorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(2)),1,"Reg_ZBusinessCalender")
 
          
'======= Set Borrower Pair-1 Actual Received Dates for Revised CD and Validating Revised CDReceived for Pair-1 ============
arrRevisedBorrPair1=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","CD","",dtActualRec_BorrPair1,dtActualRec_CoBorrPair1,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, "Validating Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair1, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"After","Invalid"

'======= Set Borrower Pair-2 Actual Received Dates for Revised CD and Validating IntialCDReceived for Pair-2 ============
arrRevisedBorrPair2=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","CD","",dtActualRec_BorrPair2,dtActualRec_CoBorrPair2,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, "Validating Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair2, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"After","Second" 

'======= Set Borrower Pair-3 Actual Received Dates for Revised CD and Validating Revised CDReceived for Pair-3 ============
arrRevisedBorrPair3=BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","CD","",dtActualRec_BorrPair3,dtActualRec_CoBorrPair3,"No","No")
dtCDSent=BIZ_DisclosureTracking_CDSentDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,arrRevisedCDSentDates,"Earliest")
dtExpCDReceived=BIZ_DisclosureTracking_CDReceivedDateCalculation(arrRevisedBorrPair1,arrRevisedBorrPair2,arrRevisedBorrPair3,"Earliest")

FRM_Logger_ReportStepEvent "Validate Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, "Validating Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pair: "&strBorrPair3, Null
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_RevisedCDReceived arrRevisedCDSentDates,dtCDSent,dtExpCDReceived,"After","Valid"

'=============== Save Loan ==================
BIZ_Loan_Save  
