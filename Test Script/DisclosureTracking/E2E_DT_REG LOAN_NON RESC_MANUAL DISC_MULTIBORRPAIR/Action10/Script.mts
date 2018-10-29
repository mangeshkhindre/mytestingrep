' ======Verify LE Due Date and Application Date==========
BIZ_Tools_Open "Disclosure Tracking"
BIZ_DisclosureTracking_LEDueDate()

'=========Send Intial LE - Manual Disclosure======
FRM_Logger_ReportInfoEvent "Send Manual Initial LE for Multiple Borrower Pairs", "Started sending Manual Initial LE for Multiple Borrower Pairs", Null

'================Inital LE Sent Dates=================
Dim arrInitialLESentDates(2)
 arrInitialLESentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-45,Date),1,"Reg_ZBusinessCalender")
 arrInitialLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-43,Date),1,"Reg_ZBusinessCalender")
 arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
 
'===============Getting the borrower pair====================== 
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")
   
'======= Add Initial LE Disclosure and Set LE Sent Date and keep received dates as blank============
FRM_Logger_ReportStepEvent "Validate Initial LE Dates : Start", "Initial LE Dates Validations ", null

BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 1st Borrower Pair "&strBorrPair1, "Validate Initial LE Dates for 1st Borrower Pair when No Received Dates are Entered", null

BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"LE"
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","LE",arrInitialLESentDates(0),"","","No","No")

'=========Validate LE Sent, LE Received, ECD for 1st Invalid borrower pair===================
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
dtECDDate= GUI_Object_GetPropertyValue(objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate"),"text")
strECDFieldDesc="LE Sent Date should be blank as Invalid borrower pair"
FRM_VerifyEqual dtECDDate,dtEarliestDate,"LE Sent Date",strECDFieldDesc

dtECDDate= GUI_Object_GetPropertyValue(objLoanPage.SwfObject("swfname:=dpClosingDate").SwfEdit("swfname:=txtDate"),"text")
strECDFieldDesc="Earliest Closing Date should be blank as Invalid borrower pair"
FRM_VerifyEqual dtECDDate,dtEarliestDate,"Earliest Closing Date",strECDFieldDesc


Set objLEReceived = objLoanPage.SwfObject("swfname:=dpLEReceived").SwfEdit("swfname:=txtDate")
dtEarliestDate = ""
strLERecFieldDesc="LE Received Date should be blank as Invalid borrower pair" 
dtLERecDate= GUI_Object_GetPropertyValue(objLEReceived,"text")
FRM_VerifyEqual dtLERecDate,dtEarliestDate,"LE Received Date",strLERecFieldDesc

'==============================Second Valid Borowwer Pair Validations=====================
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 2nd Borrower Pair "&strBorrPair2, "Validate Initial LE Dates for 2nd Borrower Pair when No Received Dates are Entered", null
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"LE"
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","LE",arrInitialLESentDates(1),"","","No","No")
'=========Validate LE Sent, LE Received, ECD for 2nd borrower pair===================
'sent
arrInitialLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-43,Date),1,"Reg_ZBusinessCalender")
arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,Date),1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"
 
 'ecd
 Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

'received
dtEarliestDate=BIZ_GetEarliestDate(arrDatesBorrower2)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"
 
'=============================3rd Valid Borrower Pair validations=========================
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 3rd Borrower Pair "&strBorrPair3, "Validate Initial LE Dates for 3rd Borrower Pair when No Received Dates are Entered", null
arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"LE"
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","LE",arrInitialLESentDates(2),"","","No","No")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'sent
arrInitialLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-43,Date),1,"Reg_ZBusinessCalender")
arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

'=====================Validate ECD in LE when no Received Dates are entered ======================
'Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

'=============Validate Initial LE Received Date when No Received Dates are Entered =================   
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'======= Add Initial LE Disclosure and Set LE Sent Date and enter received dates ============
'==================Set Actual Received Dates for Borrower and Co-Borrower================
FRM_Logger_ReportStepEvent "Validate Initial LE Dates", "Validate Initial LE Dates when Actual Received Dates are Entered", null
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 1st Borrower Pair "&strBorrPair1, "Validate Initial LE Dates for 1st Borrower Pair when Received Dates are Entered", null
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(0)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(0)),2,"Reg_ZBusinessCalender")
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","LE",arrInitialLESentDates(0),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

'=========Validate LE Sent, LE Received, ECD for 1st Invalid borrower pair===================
FRM_Logger_ReportStepEvent "Validate LE Sent Date for LE for 1st Borrower Pair", "LESent Date should remain same as previous as Borrower pair is invalid", null
arrInitialLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-43,Date),1,"Reg_ZBusinessCalender")
arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

FRM_Logger_ReportStepEvent "Validate Earliest Closing Dates for LE for 1st Borrower Pair", "ECD should remain same as previous as Borrower pair is invalid", null
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

FRM_Logger_ReportStepEvent "Validate LE Received Date for 1st Invalid Borrower Pair ", "LE Received Dates should remain same as previous as Borrower pair is invalid", null
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'==============================Second Borrower Pair when dates are entered=============================
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 2nd Borrower Pair "&strBorrPair2, "Validate Initial LE Dates for 2nd Borrower Pair when Received Dates are Entered", null
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(1)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(1)),2,"Reg_ZBusinessCalender")
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","LE",arrInitialLESentDates(1),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")
'=========Validate LE Sent, LE Received, ECD for 2nd borrower pair===================
'sent
arrInitialLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-43,Date),1,"Reg_ZBusinessCalender")
 arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
 BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

'ecd
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc
'received
dtEarliestDate=BIZ_GetEarliestDate(arrDatesBorrower2)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'===================Third Borowwer Pair when dates are entered==================
FRM_Logger_ReportStepEvent "Validate Initial LE Dates for 3rd Borrower Pair "&strBorrPair3, "Validate Initial LE Dates for 3rd Borrower Pair when Received Dates are Entered", null
arrInitialLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-44,Date),1,"Reg_ZBusinessCalender")
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(2)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(2)),2,"Reg_ZBusinessCalender")
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","LE",arrInitialLESentDates(2),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'================Verify LE Sent Date should be earliest of all Sent Dates=================
'sent
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"
  'ecd
 '=====================Validate ECD in LE after entering Received Dates ======================
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,After selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc 
'=============Validate Initial LE Received Date when Actual Received Dates are Entered===================
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'====================Validate IntentToProceed and EarliestFeeCollection==================
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
BIZ_DisclosureTracking_ValidateIntentToProceed_EarliestFeeCollection_MulBorrPair strBorrPair2,"Initial","LE","Yes"	


'===========================================Revised LE===========================
 '================Revised LE Sent Dates=================
FRM_Logger_ReportStepEvent "Revised LE Validations- Start", "Validate Dates for Revised LE", null
Dim arrRevisedLESentDates(2)
 arrRevisedLESentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-37,Date),1,"Reg_ZBusinessCalender")
 arrRevisedLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-35,Date),1,"Reg_ZBusinessCalender")
 arrRevisedLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-36,Date),1,"Reg_ZBusinessCalender")
 
 '======= Add Revised LE Disclosure and Set LE Sent Date and keep received dates as blank============
 FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 1st Borrower Pair "&strBorrPair1, "Validate Revised LE Dates for 1st Borrower Pair when No Received Dates are Entered", null
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"LE"
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","LE",arrRevisedLESentDates(0),"","","Yes","No")

'=============Revised LE Sent Date================
FRM_Logger_ReportStepEvent "Validate Revised LE Sent Date for 1st Borrower Pair", "Revised LESent Date for 1st Invalid Borrower Pair when no Received Dates are entered should be blank", null
dtECDDate= GUI_Object_GetPropertyValue(objLoanPage.SwfObject("swfname:=dpLERevisedSent").SwfEdit("swfname:=txtDate"),"text")
strECDFieldDesc="Revised LE Sent Date should be blank as Invalid borrower pair"
dtEarliestDate=""
FRM_VerifyEqual dtECDDate,dtEarliestDate,"Revised LE Sent Date",strECDFieldDesc

'=====================Validate ECD in Revised LE  ======================
FRM_Logger_ReportStepEvent "Validate Earliest Closing  Dates for Revised LE when 1st Borrower Pair is Entered", "ECD should remain same as previous date validated as its an Invalid Borowwer Pair", null  
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,when Revised LE is done for 1st Invalid Borrower Pair : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc
'==================Revised LE for 1st Invalid Borrower Pair========================
'===========Validate Revised LE Received ====================
FRM_Logger_ReportStepEvent "Validate Revised LE Received Date for 1st Borrower Pair ", "Revised LE Received for 1st Invalid Borrower Pair should be blank when No Received Dates are Entered", null
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLERevisedReceived = objLoanPage.SwfObject("swfname:=dpLERevisedReceived").SwfEdit("swfname:=txtDate")
        
dtEarliestDate = ""
strLERecFieldDesc="Revised LE Received Date should be blank as Invalid borrower pair" 
dtLERecDate= GUI_Object_GetPropertyValue(objLERevisedReceived,"text")
FRM_VerifyEqual dtLERecDate,dtEarliestDate,"Revised LE Received Date",strLERecFieldDesc

'===========================2nd Borowwer Pair==================
FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 2nd Borrower Pair "&strBorrPair2, "Validate Revised LE Dates for 2nd Borrower Pair when No Received Dates are Entered", null
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"LE"
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","LE",arrRevisedLESentDates(1),"","","Yes","No")

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
'FRM_Logger_ReportStepEvent "Validate Revised LE Sent Date when 2nd Borowwer Pair is Entered", "Verify Revised LE Sent Date when No Received Dates are Entered", null
arrRevisedLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-35,Date),1,"Reg_ZBusinessCalender")
arrRevisedLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,Date),1,"Reg_ZBusinessCalender") 
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when no Received Dates are entered ======================    
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLERevisedSent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Revised LE Recieved for 2nd Borrower Pair: is Revised LE Sent + 7 Days"

BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",7,dtLESent,strECDFieldDesc
'=============Validate LE Received Date when No Received Dates are Entered =================
dtEarliestDate=BIZ_GetEarliestDate(arrDatesBorrower2)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'======================3rd Borowwer Pair========================
FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 3rd Borrower Pair "&strBorrPair3, "Validate Revised LE Dates for 3rd Borrower Pair when No Received Dates are Entered", null
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"LE"
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","LE",arrRevisedLESentDates(2),"","","Yes","No")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then    
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
 BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when no Received Dates are entered ======================
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLERevisedSent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Revised LE Recieved for 3rd Borrower Pair: is Revised LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",7,dtLESent,strECDFieldDesc

'=============Validate LE Received Date when No Received Dates are Entered =================
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'===============Validate Revised LE Dates when Actual Received Dates are entered======================    
FRM_Logger_ReportStepEvent "Validate Revised LE Dates", "Validate Revised LE Dates when Actual Received Dates are Entered", null
FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 1st Borrower Pair "&strBorrPair1, "Validate Revised LE Dates for 1st Borrower Pair when Received Dates are Entered", null

dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(0)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(0)),2,"Reg_ZBusinessCalender")
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","LE",arrRevisedLESentDates(0),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

'=============1st Borrower Pair when received dates are eneterd====================
'=========Validate LE Sent, LE Received, ECD for 1st Invalid borrower pair===================
FRM_Logger_ReportStepEvent "Validate Revised LE Sent Date for LE for 1st Borrower Pair", "Revised LESent Date should remain same as previous as Borrower pair is invalid", null
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

FRM_Logger_ReportStepEvent "Validate Earliest Closing Dates for LE for 1st Borrower Pair", "ECD should remain same as previous as Borrower pair is invalid", null
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLERevisedSent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,After selecting Revised LE Recieved for 1st Borrower Pair: is Revised LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",7,dtLESent,strECDFieldDesc

FRM_Logger_ReportStepEvent "Validate Revised LE Received Date for 1st Invalid Borrower Pair ", "Revised LE Received Dates should remain same as previous as Borrower pair is invalid", null
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'==============================2nd Borowwer Pair when received dates are eneterd ======================
FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 2nd Borrower Pair "&strBorrPair2, "Validate Revised LE Dates for 2nd Borrower Pair when Received Dates are Entered", null
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(1)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(1)),2,"Reg_ZBusinessCalender")
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","LE",arrRevisedLESentDates(1),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

'=============Validate Revised LE Received Date when Received Dates are Entered =================
arrRevisedLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-35,Date),1,"Reg_ZBusinessCalender")
arrRevisedLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,Date),1,"Reg_ZBusinessCalender")
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"
     
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLERevisedReceived = objLoanPage.SwfObject("swfname:=dpLERevisedReceived").SwfEdit("swfname:=txtDate")
dtLERevisedReceived=GUI_Object_GetPropertyValue (objLERevisedReceived,"text")
strECDFieldDesc="Earliest Closing Date for 2nd Borrower Pair,After selecting LE Recieved : is Revised LE Receieved + 4 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",4,dtLERevisedReceived,strECDFieldDesc
dtEarliestDate=BIZ_GetEarliestDate(arrDatesBorrower2)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'============================3rd Borowwer Pair when received dates are entered=====================
FRM_Logger_ReportStepEvent "Validate Revised LE Dates for 3rd Borrower Pair "&strBorrPair3, "Validate Revised LE Dates for 3rd Borrower Pair when Received Dates are Entered", null
arrRevisedLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-36,Date),1,"Reg_ZBusinessCalender")
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(2)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(2)),2,"Reg_ZBusinessCalender")
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","LE",arrRevisedLESentDates(2),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then    
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when Received Dates are entered ======================      
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLERevisedReceived = objLoanPage.SwfObject("swfname:=dpLERevisedReceived").SwfEdit("swfname:=txtDate")
dtLERevisedReceived=GUI_Object_GetPropertyValue (objLERevisedReceived,"text")
strECDFieldDesc="Earliest Closing Date,After selecting LE Recieved : is Revised LE Receieved + 4 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",4,dtLERevisedReceived,strECDFieldDesc

'=============Validate Revised LE Received Date when No Received Dates are Entered =================   
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'======================== Save Loan ===============================
'BIZ_Loan_Save
