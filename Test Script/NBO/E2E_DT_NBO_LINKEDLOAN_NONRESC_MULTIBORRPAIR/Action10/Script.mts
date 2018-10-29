'===============Getting the borrower pair====================== 
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")

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
    
'======= Add Initial LE Disclosure and Set LE Sent Date and keep received dates as blank============
FRM_Logger_ReportStepEvent "Validate Initial LE Sent ,ECD and LE Received Dates in Primary Loan ", "Validate Initial LE Dates for Primary Loan when no Received Dates are entered", null
 
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Send Manual Initial LE for Borrower Pair: "&strBorrPair1, "Started sending Manual Initial LE for Borrower Pair: "&strBorrPair1, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure trim(strBorrPair1),"LE"
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","LE",arrInitialLESentDates(0),"","","No","No")

FRM_Logger_ReportInfoEvent "Send Manual Initial LE for Borrower Pair: "&strBorrPair2, "Started sending Manual Initial LE for Borrower Pair: "&strBorrPair2, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"LE"
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","LE",arrInitialLESentDates(1),"","","No","No")

FRM_Logger_ReportInfoEvent "Send Manual Initial LE for Borrower Pair: "&strBorrPair3, "Started sending Manual Initial LE for Borrower Pair: "&strBorrPair3, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"LE"
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","LE",arrInitialLESentDates(2),"","","No","Yes")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'======Click on Sync Data in Toolbar======
If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),5) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
   	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data" 
End If

'======Select template and Sync Data between two loans======
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) = True Then
    Set objSyncTemp=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
	GUI_List_ClickRow objSyncTemp,Null,"Name","Const-to-Perm Sync",True,False,False,"Single" 'template name Const-to-Perm Sync
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
	GUI_Dialog_Encompass_YesX 5,"Are you sure you want to synchronize data between two loans?" 
	GUI_Dialog_Encompass_OKX 10,"Both loans have been synchronized."
End If

'=================sent date======================
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

'=====================Validate ECD in LE when no Received Dates are entered ======================     
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

'=============Validate Initial LE Received Date when No Received Dates are Entered =================
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'==========Click on Linked Loan===================
BIZ_DisclosureTracking_LinkLoanClick()

'============sent date======================
FRM_Logger_ReportStepEvent "Validate Initial LE Sent ,ECD and LE Received Dates in Linked Loan ", "Validate Initial LE Dates in Linked Loan when no Received Dates are entered", null 
'================ Validate Disclosure Recipient DropDown ComboBox===========
BIZ_DT_NBO_LinkedLoan_DisclosureRecipientDropDownComboBox strBorrPair1,"Initial","LE","No"
BIZ_DT_NBO_LinkedLoan_DisclosureRecipientDropDownComboBox strBorrPair2,"Initial","LE","No"
BIZ_DT_NBO_LinkedLoan_DisclosureRecipientDropDownComboBox strBorrPair3,"Initial","LE","Yes"

BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"
'=============Validate Initial LE Received Date when No Received Dates are Entered =================
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'=====================Validate ECD in LE when no Received Dates are entered ======================      
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

'==========Click on Linked Loan===================
BIZ_DisclosureTracking_LinkLoanClick()
FRM_Logger_ReportStepEvent "Go To Primary  Loan and and Validate Initial LE Sent ,ECD and LE Received Dates ","Enter Received Dates for the Borrower Pair in Primary Loan for Initial LE ", null
'======= Add Initial LE Disclosure and Set LE Sent Date and enter received dates ============
'==================Set Actual Received Dates for Borrower and Co-Borrower================    
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(0)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(0)),2,"Reg_ZBusinessCalender")
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Initial","LE",arrInitialLESentDates(0),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(1)),3,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(1)),2,"Reg_ZBusinessCalender")
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Initial","LE",arrInitialLESentDates(1),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(2)),3,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialLESentDates(2)),2,"Reg_ZBusinessCalender")
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Initial","LE",arrInitialLESentDates(2),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","Yes")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If
   
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

'=====================Validate ECD in LE after entering Received Dates ======================       
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")
dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,After selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

'=============Validate Initial LE Received Date when Actual Received Dates are Entered=================== 
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'==== Verifying NBO received date with LE Received date====
 'dtNBOActualRecDate=DateAdd("d",-2,cdate(dtCoBorrActualRecDate))
 dtNBOActualRecDate=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,cdate(dtCoBorrActualRecDate)),-1,"Reg_ZBusinessCalender")
 FRM_VerifyNotEqual CDate(dtEarliestDate),CDate(dtNBOActualRecDate),"LE Received Date","NBOs Date is not considered in LE Received Date calculation"

'====================Validate IntentToProceed and EarliestFeeCollection==================
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
BIZ_DisclosureTracking_ValidateIntentToProceed_EarliestFeeCollection_MulBorrPair strBorrPair2,"Initial","LE","Yes"	

'==========Click on Linked Loan===================
BIZ_DisclosureTracking_LinkLoanClick()

'=============Validate Initial LE Received Date when Actual Received Dates are Entered===================
FRM_Logger_ReportStepEvent "Validate Initial LE Sent ,ECD and LE Received Dates in Linked Loan ", "Validate Initial LE Dates in Linked Loan when Received Dates are entered", null
 
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrInitialLESentDates,"Initial"

'=====================Validate ECD in LE after entering Received Dates ======================       
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLESent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,After selecting Initial LE Recieved : is LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Initial",7,dtLESent,strECDFieldDesc

dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Initial"

'==== Verifying NBO received date with LE Received date====
'dtNBOActualRecDate=DateAdd("d",-2,cdate(dtCoBorrActualRecDate))
dtNBOActualRecDate=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,cdate(dtCoBorrActualRecDate)),-1,"Reg_ZBusinessCalender")
FRM_VerifyNotEqual CDate(dtEarliestDate),CDate(dtNBOActualRecDate),"LE Received Date","NBOs Date is not considered in LE Received Date calculation"

FRM_Logger_ReportStepEvent "Validate EarliestFeeCollection Dates in Linked Loan ", "Validate for EarliestFeeCollection Dates in Linked Loan ", null
BIZ_DisclosureTracking_VerifyEarliestFeeCollection()

FRM_Logger_ReportStepEvent "Validate IntenttoProceed Dates in Linked Loan ", "Validate for IntenttoProceed Dates in Linked Loan ", null
BIZ_DisclosureTracking_VerifyIntenttoProceed()   


'=======================================Revised LE===========================
'================Revised LE Sent Dates=================
'==========Click on Linked Loan===================
BIZ_DisclosureTracking_LinkLoanClick()
FRM_Logger_ReportStepEvent "Revised LE Validations-Start", "Validate Dates for Revised LE", null

Dim arrRevisedLESentDates(2)
 arrRevisedLESentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-37,Date),1,"Reg_ZBusinessCalender")
 arrRevisedLESentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-36,Date),1,"Reg_ZBusinessCalender")
 arrRevisedLESentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-35,Date),1,"Reg_ZBusinessCalender")

FRM_Logger_ReportStepEvent "Validate Revised LE Sent ,ECD and Revised LE Received Dates in Primary Loan ", "Validate Revised LE Dates for Primary Loan when no Received Dates are entered", null 
'======= Add Revised LE Disclosure and Set LE Sent Date and keep received dates as blank============
FRM_Logger_ReportInfoEvent "Send Manual Revised LE for Borrower Pair: "&strBorrPair1, "Started sending Manual Revised LE for Borrower Pair: "&strBorrPair1, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"LE"
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","LE",arrRevisedLESentDates(0),"","","Yes","No")

FRM_Logger_ReportInfoEvent "Send Manual Revised LE for Borrower Pair: "&strBorrPair2, "Started sending Manual Revised LE for Borrower Pair: "&strBorrPair2, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"LE"
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","LE",arrRevisedLESentDates(1),"","","Yes","No")

FRM_Logger_ReportInfoEvent "Send Manual Revised LE for Borrower Pair: "&strBorrPair3, "Started sending Manual Revised LE for Borrower Pair: "&strBorrPair3, Null   
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"LE"
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","LE",arrRevisedLESentDates(2),"","","Yes","Yes")

If UBound(arrDatesBorrower2) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    arrAllDates = BIZ_CombineDates(arrDatesBorrower2,arrDatesBorrower3)
ElseIf UBound(arrDatesBorrower1) > 0 AND UBound(arrDatesBorrower3) > 0 Then
    
    arrAllDates = BIZ_CombineDates(arrDatesBorrower1,arrDatesBorrower3)
End If

'======Click on Sync Data in Toolbar======
If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),5) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
   	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data" 
End If

'======Select template and Sync Data between two loans======
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) = True Then
    Set objSyncTemp=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
	GUI_List_ClickRow objSyncTemp,Null,"Name","Const-to-Perm Sync",True,False,False,"Single" 'template name Const-to-Perm Sync
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
	GUI_Dialog_Encompass_YesX 5,"Are you sure you want to synchronize data between two loans?" 
	GUI_Dialog_Encompass_OKX 10,"Both loans have been synchronized."
End If

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when no Received Dates are entered ======================        
Set objLoanPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MainScreen").SwfWindow("swfname:=LoanPage")
Set objLESentDate = objLoanPage.SwfObject("swfname:=dpLERevisedSent").SwfEdit("swfname:=txtDate")

dtLESent=GUI_Object_GetPropertyValue (objLESentDate,"text")
strECDFieldDesc="Earliest Closing Date,Before selecting Revised LE Recieved : is Revised LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",7,dtLESent,strECDFieldDesc

'=============Validate LE Received Date when No Received Dates are Entered =================     
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'==========Click on Linked Loan===================
FRM_Logger_ReportStepEvent "Validate Revised LE Sent ,ECD and Revised LE Received Dates in Linked Loan ", "Validate Revised LE Dates in Linked Loan when no Received Dates are entered", null
BIZ_DisclosureTracking_LinkLoanClick()

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when no Received Dates are entered ======================
strECDFieldDesc="Earliest Closing Date in Linked Loan,Before selecting Revised LE Recieved : is Revised LE Sent + 7 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",7,dtLESent,strECDFieldDesc

'=============Validate LE Received Date when No Received Dates are Entered =================
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'===============Validate Revised LE Dates when Actual Received Dates are entered======================   
FRM_Logger_ReportStepEvent "Go To Primary  Loan and and Validate Revised LE Sent ,ECD and Revised LE Received Dates ","Enter Received Dates for the Borrower Pair in Primary Loan for Revised LE ", null
BIZ_DisclosureTracking_LinkLoanClick()
  
dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(0)),4,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(0)),2,"Reg_ZBusinessCalender")
arrDatesBorrower1 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair1,"Revised","LE",arrRevisedLESentDates(0),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(1)),3,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(1)),2,"Reg_ZBusinessCalender")
arrDatesBorrower2 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair2,"Revised","LE",arrRevisedLESentDates(1),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","No")

dtBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(2)),3,"Reg_ZBusinessCalender")
dtCoBorrActualRecDate=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedLESentDates(2)),2,"Reg_ZBusinessCalender")
arrDatesBorrower3 = BIZ_DisclosureTrackingTool_BorrPair_SetDisclosureDetail(strBorrPair3,"Revised","LE",arrRevisedLESentDates(2),dtBorrActualRecDate,dtCoBorrActualRecDate,"No","Yes")

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
Set objLERevisedReceived = objLoanPage.SwfObject("swfname:=dpLERevisedReceived").SwfEdit("swfname:=txtDate")
dtLERevisedReceived=GUI_Object_GetPropertyValue (objLERevisedReceived,"text")
strECDFieldDesc="Earliest Closing Date,After selecting LE Recieved : is Revised LE Receieved + 4 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",4,dtLERevisedReceived,strECDFieldDesc

'=============Validate Revised LE Received Date when Received Dates are Entered =================   
dtEarliestDate=BIZ_GetEarliestDate(arrAllDates)
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'==== Verifying NBO received date with LE Received date====
 'dtNBOActualRecDate=DateAdd("d",-2,cdate(dtCoBorrActualRecDate))
 dtNBOActualRecDate=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,cdate(dtCoBorrActualRecDate)),-1,"Reg_ZBusinessCalender")
 FRM_VerifyNotEqual CDate(dtEarliestDate),CDate(dtNBOActualRecDate),"Revised LE Received Date","NBOs Date is not considered in Revised LE Received Date calculation"

'===================Link Loan Dates check when Actual received dates are enetered
FRM_Logger_ReportStepEvent "Validate Revised LE Sent ,ECD and Revised LE Received Dates in Linked Loan ", "Validate Revised LE Dates in Linked Loan when Received Dates are entered", null
BIZ_DisclosureTracking_LinkLoanClick()

'======Validate LE Sent Date when No Dates are Entered==========
'================Verify LE Sent Date should be earliest of all Sent Dates=================
BIZ_DisclosureTracking_ValidateLESent arrRevisedLESentDates,"Revised"

'=====================Validate ECD in  Revised LE when no Received Dates are entered ======================
strECDFieldDesc="Earliest Closing Date,After selecting LE Recieved in Linked Loan: is Revised LE Receieved + 4 Days"
BIZ_DisclosureTrackingTool_ValidateECDLE "Revised",4,dtLERevisedReceived,strECDFieldDesc

'=============Validate Revised LE Received Date when No Received Dates are Entered =================
BIZ_DisclosureTracking_ValidateLEReceived dtEarliestDate,"Revised"

'==== Verifying NBO received date with LE Received date====
 'dtNBOActualRecDate=DateAdd("d",-2,cdate(dtCoBorrActualRecDate))
 dtNBOActualRecDate=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-1,cdate(dtCoBorrActualRecDate)),-1,"Reg_ZBusinessCalender")
 FRM_VerifyNotEqual CDate(dtEarliestDate),CDate(dtNBOActualRecDate),"Revised LE Received Date","NBOs Date is not considered in Revised LE Received Date calculation"

'==========Click on Linked Loan===================
BIZ_DisclosureTracking_LinkLoanClick()
'======================== Save Loan ===============================
'BIZ_Loan_Save


