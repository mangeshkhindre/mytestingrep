
'==========================Initial CD Validation for Rescendable Loans====================
Function BIZ_DisclosureTracking_RescLoan_MultipleBorrPair_ValidateIntialCD(arrInitialCDSentDates,arrBorrPair)
	
	Dim arrRecDates(1)
	Dim arrReceivedDates(1)
    Set objMainForm    =    SwfWindow("swfname:=MainForm")
    
    '======= Set CD Sent Date for Three Borrower Pair============ 	
    strDate1=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(0),"Initial","CD",arrInitialCDSentDates(0),"","","No")
    arrRecDates(0)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(1),"Initial","CD",arrInitialCDSentDates(1),"","","No" )
    arrRecDates(1)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(2),"Initial","CD",arrInitialCDSentDates(2),"","","No" )
    
    '======================Validation Of CD Sent Before selecting Initial CD Recieved====== 
	FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Multiple Borrower Pairs", "Validating CD Sent,CD Received,Earliest Closing before selection of Actual Received Dates for Multiple Borrower Pairs", Null
   	dtExpCDSent=BIZ_GetEarliestDate(arrInitialCDSentDates)    
    dtActualCDSent=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDSent;gcCD;.*"),"text")    
    FRM_VerifyEqual CDate(dtActualCDSent),CDate(dtExpCDSent),"CD Sent Date ","CD Sent Date is Earliest of all Borrower Pair's Sent Dates"
    
    '======================Validation ECD, Before selecting Initial CD Recieved======
    dtCDSent=BIZ_GetLatestDate(arrInitialCDSentDates)
    dtExpECD=BIZ_DisclosureTracking_DateCalculation(cdate(dtCDSent),6,"Reg_ZBusinessCalender")      
    dtECDDate= GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpClosingDate;.*"),"text")
    FRM_VerifyEqual CDate(dtECDDate),CDate(dtExpECD),"Earliest Closing Date","Before selecting Initial CD Recieved, Earliest Closing Date is Latest of all valid Borrower Pair's CD Sent + 6 Days"
      
    '======================Validation CD Received Date, Before selecting Initial CD Recieved======    
    dtExpCDReceived=BIZ_GetLatestDate(arrRecDates)
    dtActualCDReceived=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDReceived;gcCD;.*"),"text")    
    FRM_VerifyEqual CDate(dtActualCDReceived),CDate(dtExpCDReceived),"CD Received Date","CD Received Date is  Latest of Earliest from each valid Borrower Pair's Actual and Presume Received Dates"
       

    '=====================Actual Received Dates of Borrower and Co Borrower for 3 pairs ====================================
    dtActualRec_BorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(0)),1,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(0)),2,"Reg_ZBusinessCalender")
     
    dtActualRec_BorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(1)),2,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(1)),3,"Reg_ZBusinessCalender")
     
    dtActualRec_BorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(2)),2,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrInitialCDSentDates(2)),2,"Reg_ZBusinessCalender")
     
    '======= Set Borrower Pairs Actual Received Dates for Initial CD  ============
   	strDate=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(0),"Initial","CD","",dtActualRec_BorrPair1,dtActualRec_CoBorrPair1,"No")
    arrReceivedDates(0)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(1),"Initial","CD","",dtActualRec_BorrPair2,dtActualRec_CoBorrPair2,"No" )
    arrReceivedDates(1)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(2),"Initial","CD","",dtActualRec_BorrPair3,dtActualRec_CoBorrPair3,"No")
    
    FRM_Logger_ReportStepEvent "Validate CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Multiple Borrower Pairs", "Validating CD Sent,CD Received,Earliest Closing after selection of Actual Received Dates for Multiple Borrower Pairs", Null
    '======================Validation Of CD Sent After selecting Initial CD Recieved======    
	dtExpCDSent=BIZ_GetEarliestDate(arrInitialCDSentDates)
    dtActualCDSent=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDSent;gcCD;.*"),"text")           
    FRM_VerifyEqual CDate(dtActualCDSent),CDate(dtExpCDSent),"CD Sent Date ","CD Sent Date is Earliest of all Borrower Pair's Send Dates"
    
    '======================Validation ECD, After selecting Initial CD Recieved======
    dtExpCDReceived=BIZ_GetLatestDate(arrReceivedDates)
    dtExpECD=BIZ_DisclosureTracking_DateCalculation(cdate(dtExpCDReceived),3,"Reg_ZBusinessCalender")
    dtECDDate= GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpClosingDate;.*"),"text")
    FRM_VerifyEqual CDate(dtECDDate),CDate(dtExpECD),"Earliest Closing Date","After selecting Initial CD Recieved,Earliest Closing Date is CD Received Date + 3 Days"
    
    '======================Validation CD Received Date, After selecting Initial CD Recieved======    
    dtActualCDReceived=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDReceived;gcCD;.*"),"text")    
    FRM_VerifyEqual CDate(dtActualCDReceived),CDate(dtExpCDReceived),"CD Received Date","CD Received Date is Latest of Earliest from each valid Borrower Pair's Actual and Presume Received Dates"
End Function



'==========================Revised CD Validation for Rescendable Loans====================
Function BIZ_DisclosureTracking_RescLoan_MultipleBorrPair_ValidateRevisedCD(arrRevisedCDSentDates,arrBorrPair)
	Dim arrRecDates(1)
	Dim arrReceivedDates(1)
	
    Set objMainForm    =    SwfWindow("swfname:=MainForm")    
    '======= Set CD Sent Date for Three Borrower Pair============    
    strDate1=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(0),"Revised","CD",arrRevisedCDSentDates(0),"","","Yes")   
    arrRecDates(0)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(1),"Revised","CD",arrRevisedCDSentDates(1),"","","Yes")
  	arrRecDates(1)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(2),"Revised","CD",arrRevisedCDSentDates(2),"","","Yes")
    
    '======================Validation Of CD Sent Before selecting Initial CD Recieved======  	
	FRM_Logger_ReportStepEvent "Verify Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pairs", "Validating Revised CD Sent,Revised CD Received,Earliest Closing before selection of Actual Received Dates for Borrower Pairs", Null
    dtExpCDSent=BIZ_GetLatestDate(arrRevisedCDSentDates)
    dtActualCDSent=GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDRevisedSent;gcCD;.*"),"text")    
    FRM_VerifyEqual CDate(dtActualCDSent),CDate(dtExpCDSent),"Revised CD Sent Date ","Revised CD Sent Date is Latest of all Borrower Pair's Sent Dates"
    
    '======================Validation ECD, Before Set Actual Received Date======
    dtCDSent=BIZ_GetLatestDate(arrRevisedCDSentDates)
    dtExpECD=BIZ_DisclosureTracking_DateCalculation(cdate(dtCDSent),6,"Reg_ZBusinessCalender")
    dtECDDate= GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpClosingDate;.*"),"text")
    FRM_VerifyEqual CDate(dtECDDate),CDate(dtExpECD),"Earliest Closing Date","Before selecting Revised CD Recieved, Earliest Closing Date is Latest of all Borrower Pair's CD Sent + 6 Days"
    
    '======================Validation CD Received Date, Before Set Actual Received Date======    
    dtExpCDReceived=BIZ_GetLatestDate(arrRecDates)
    dtActualCDReceived=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDRevisedReceived;gcCD;.*"),"text")
    FRM_VerifyEqual Cdate(dtActualCDReceived),Cdate(dtExpCDReceived),"Revised CD Received Date","Revised CD Received Date is Latest of Earliest from all valid Borrower Pair's Actaul and Presume Dates"
	
	'=====================Actual Received Dates of Borrower and Co Borrower for 3 pairs ====================================
    dtActualRec_BorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(0)),1,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair1=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(0)),2,"Reg_ZBusinessCalender")
     
    dtActualRec_BorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(1)),2,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair2=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(1)),3,"Reg_ZBusinessCalender")
     
    dtActualRec_BorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(2)),2,"Reg_ZBusinessCalender")
    dtActualRec_CoBorrPair3=BIZ_DisclosureTracking_DateCalculation(cdate(arrRevisedCDSentDates(2)),2,"Reg_ZBusinessCalender")
     
    '======= Set Borrower Pairs Actual Received Dates for Revised CD  ============
    strDate=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(0),"Revised","CD","",dtActualRec_BorrPair1,dtActualRec_CoBorrPair1,"No")
    arrReceivedDates(0)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(1),"Revised","CD","",dtActualRec_BorrPair2,dtActualRec_CoBorrPair2,"No")
    arrReceivedDates(1)=BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail (arrBorrPair(2),"Revised","CD","",dtActualRec_BorrPair3,dtActualRec_CoBorrPair3,"No")
 
 	'======================Validation Of Revised CD Sent After Set Actual Received Date======================== 
	FRM_Logger_ReportStepEvent "Verify Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pairs", "Validate Revised CD Sent,Revised CD Received,Earliest Closing after selection of Actual Received Dates for Borrower Pairs", Null 	
    dtExpCDSent=BIZ_GetLatestDate(arrRevisedCDSentDates)
    dtActualCDSent=GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDRevisedSent;gcCD;.*"),"text")    
    FRM_VerifyEqual CDate(dtActualCDSent),CDate(dtExpCDSent),"Revised CD Sent Date ","Revised CD Sent Date is Latest of all Borrower Pair's Sent Dates"
    
    '======================Validation ECD, After Set Actual Received Date======   
    dtExpCDReceived=BIZ_GetLatestDate(arrReceivedDates)
    dtExpECD=BIZ_DisclosureTracking_DateCalculation(cdate(dtExpCDReceived),3,"Reg_ZBusinessCalender")
    dtECDDate= GUI_Object_GetPropertyValue(objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpClosingDate;.*"),"text")
    FRM_VerifyEqual CDate(dtECDDate),CDate(dtExpECD),"Earliest Closing Date","After selecting Revised CD Recieved, Earliest Closing Date is Revised CD Received + 3 Days"
    
    '======================Validation CD Received Date, After Set Actual Received Date======
    dtActualCDReceived=GUI_Object_GetPropertyValue (objMainForm.SwfEdit("swfname:=txtDate","swfname path:=txtDate;dpCDRevisedReceived;gcCD;.*"),"text")
    FRM_VerifyEqual Cdate(dtActualCDReceived),Cdate(dtExpCDReceived),"Revised CD Received Date","Revised CD Received Date is Latest of Earliest from all valid Borrower Pair's Actaul and Presume Dates"
End Function




Function BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail(strBorrPair,strDisclosureType,strLEorCD,dtSentDate,dtBorrActualRecDate,dtCoBorrActualRecDate,strFlagReason)
    Set objMainForm    =    SwfWindow("swfname:=MainForm")    
    intRow    = BIZ_GetRowOfDisclosure(strBorrPair,strDisclosureType,strLEorCD,"Yes")
    GUI_List_ActOnRow objMainForm.SwfObject("swfname:=gvHistory"), intRow, True, False, False, "Double"
    GUI_Dialog_Encompass_OKX 3, "Sundays and legal holidays"
    strDate = BIZ_DisclosureTrackingTool_RescLoan_MulBorr_SetDisclosureDetail(dtSentDate,dtBorrActualRecDate,dtCoBorrActualRecDate,strFlagReason)
    BIZ_DisclosureTrackingTool_RescLoan_BorrPair_SetDisclosureDetail = strDate
End Function


Function BIZ_DisclosureTrackingTool_RescLoan_MulBorr_SetDisclosureDetail(dtSentDate,dtBorrActualRecDate,dtCoBorrActualRecDate,strFlagReason)
    
    FRM_Logger_ReportInfoEvent "Set Disclosure Details", "Set Sent Date, Actual Received Dates of Borrower and Co Borrower", null
    Set objDisclosureWnd = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfTab("swfname:=tcDisclosure")
   
    ReDim arrBorrPairDates(0)
    '==============Unlock Sent Date field and Set Date ======================
    If UTIL_String_IsNotEmpty(dtSentDate) Then    
        If Not objDisclosureWnd.SwfCalendar("swfname:=dtDisclosedDate").GetROProperty("enabled") Then
            Set objSentDate = objDisclosureWnd.SwfObject("swfname:=lbtnSentDate").SwfObject("swfname:=pbIcon")        
            GUI_SwfObject_Click objSentDate
            objDisclosureWnd.SwfCalendar("swfname:=dtDisclosedDate").SetDate CDate(dtSentDate)
        Else
            objDisclosureWnd.SwfCalendar("swfname:=dtDisclosedDate").SetDate CDate(dtSentDate)
        End If
    End If    
    GUI_Dialog_Encompass_OKX 5, "Sundays and legal holidays"  
    
    '================Get the Presumed Received Dates for Borrower and Co Borrower =================    
    Set objBorrRecDate = objDisclosureWnd.SwfObject("swfname:=dpBorrowerReceivedDate").SwfEdit("swfname:=txtDate")
    dtBorrRecDate = GUI_Object_GetPropertyValue(objBorrRecDate,"text")
    
    Set objCoBorrRecDate = objDisclosureWnd.SwfObject("swfname:=dpCoBorrowerReceivedDate").SwfEdit("swfname:=txtDate")
    dtCoBorrRecDate = GUI_Object_GetPropertyValue(objCoBorrRecDate,"text")
    
    '================Get the Borrower and Co Borrower Types ================    
    Set objBorrType = objDisclosureWnd.SwfEdit("swfname:=txtBorrowerType")
    strBorrType = GUI_Object_GetPropertyValue(objBorrType,"text")
    
    Set objCoBorrType = objDisclosureWnd.SwfEdit("swfname:=txtCoBorrowerType")
    strCoBorrType = GUI_Object_GetPropertyValue(objCoBorrType,"text")
    
    If (strBorrType = "Individual" OR strBorrType = "" OR strBorrType = "Trustee" OR strBorrType = "Settlor Trustee") OR (strCoBorrType = "Individual" OR strCoBorrType = "" OR strCoBorrType = "Trustee" OR strCoBorrType = "Settlor Trustee") Then
       FRM_Logger_ReportInfoEvent "Validating the Borrower Types", "As the borrower type is "&strBorrType&" And Co-Borrower Type is "&strCoBorrType&", Dates will be considered for calculation", null
       ReDim Preserve arrBorrPairDates(1)
       arrBorrPairDates(0) =  CDate(dtBorrRecDate)
       arrBorrPairDates(1) =  CDate(dtCoBorrRecDate)
       
       If UTIL_String_IsNotEmpty(dtBorrActualRecDate) AND UTIL_String_IsNotEmpty(dtCoBorrActualRecDate) Then    
            ReDim Preserve arrBorrPairDates(3)
            '==============Set Actual Borrower Received Date ======================    
            GUI_WebEdit_Set objDisclosureWnd.SwfObject("swfname:=dpBorrowerActualReceivedDate").SwfEdit("swfname:=txtDate"), CDate(dtBorrActualRecDate)
        	'==============Set Actual Co Borrower Received Date ======================       
            GUI_WebEdit_Set objDisclosureWnd.SwfObject("swfname:=dpCoBorrowerActualReceivedDate").SwfEdit("swfname:=txtDate"), CDate(dtCoBorrActualRecDate)     
   
           arrBorrPairDates(2) =  CDate(dtBorrActualRecDate)
           arrBorrPairDates(3) =  CDate(dtCoBorrActualRecDate)
       End If
    ELSE
       FRM_Logger_ReportInfoEvent "Validating the Borrower Types", "As the borrower type is "&strBorrType&" And Co-Borrower Type is "&strCoBorrType&", Dates will not  considered for calculation", null           
    End If
    
    strDate=BIZ_DisclosureTrackingTool_RescLoan_GetEarliestLatestDate("Latest")
    
    '=========Select the Reason for Revised CD========
     If    strFlagReason="Yes" Then           
         GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfTab("swfname:=tcDisclosure"), "Reasons"
         GUI_SwfCheckbox_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfCheckBox("swfname:=chkReason1"), "ON"
     End If  	

    '==============Click on OK button =================
    GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfButton("swfname:=btnOK")
    GUI_Dialog_Encompass_OKX 2, "Sundays and legal holidays"    
    BIZ_DisclosureTrackingTool_RescLoan_MulBorr_SetDisclosureDetail= strDate    
End Function



'================Calculating Latest OR Earliest of Received Date for Borrower Pair==============================
Function BIZ_DisclosureTrackingTool_RescLoan_GetEarliestLatestDate(strLatestOREarliest)
  
   	Set objDisclosureWnd = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=DisclosureDetailsDialog2015").SwfTab("swfname:=tcDisclosure")    
    
    '================Get the Borrower and Co Borrower Types ================    
    Set objBorrType = objDisclosureWnd.SwfEdit("swfname:=txtBorrowerType")
    strBorrType = GUI_Object_GetPropertyValue(objBorrType,"text")
    
    Set objCoBorrType = objDisclosureWnd.SwfEdit("swfname:=txtCoBorrowerType")
    strCoBorrType = GUI_Object_GetPropertyValue(objCoBorrType,"text")
    
    If (strBorrType = "Individual" OR strBorrType = "" OR strBorrType = "Trustee" OR strBorrType = "Settlor Trustee") OR (strCoBorrType = "Individual" OR strCoBorrType = "" OR strCoBorrType = "Trustee" OR strCoBorrType = "Settlor Trustee") Then
        ReDim arrBorrDates(0)
		ReDim arrCoBorrDates(0)
		Dim arrEarliest(1)        
		'================Get the Presumed Received and Actual Dates for Borrower  =================    
		Set objBorrPreDate = objDisclosureWnd.SwfObject("swfname:=dpBorrowerReceivedDate").SwfEdit("swfname:=txtDate")
		dtBorrPresumeDate = GUI_Object_GetPropertyValue(objBorrPreDate,"text")
		
		Set objBorrRecDate = objDisclosureWnd.SwfObject("swfname:=dpBorrowerActualReceivedDate").SwfEdit("swfname:=txtDate")
		dtBorrActualDate = GUI_Object_GetPropertyValue(objBorrRecDate,"text")
		
		arrBorrDates(0) =  CDate(dtBorrPresumeDate)		
		If dtBorrActualDate<>"" Then
			ReDim Preserve arrBorrDates(1)
			arrBorrDates(1) =  CDate(dtBorrActualDate)
		End If
		arrEarliest(0)=BIZ_GetEarliestDate(arrBorrDates)       
        
        '================Get the Presumed Received and Actual Dates for CoBorrower  ================= 
        Set objCoBorrPreDate = objDisclosureWnd.SwfObject("swfname:=dpCoBorrowerReceivedDate").SwfEdit("swfname:=txtDate")
    	dtCoBorrPresumeDate = GUI_Object_GetPropertyValue(objCoBorrPreDate,"text")
    	
    	Set objCoRecBorrRecDate = objDisclosureWnd.SwfObject("swfname:=dpCoBorrowerActualReceivedDate").SwfEdit("swfname:=txtDate")
    	dtCoBorrActualDate = GUI_Object_GetPropertyValue(objCoRecBorrRecDate,"text")
    	
    	arrCoBorrDates(0) =  CDate(dtCoBorrPresumeDate)
    	If dtCoBorrActualDate<>"" Then
    		ReDim Preserve arrCoBorrDates(1)
			arrCoBorrDates(1) =  CDate(dtCoBorrActualDate)
		End If      
        arrEarliest(1)=BIZ_GetEarliestDate(arrCoBorrDates)         
    End If       
  
	If (strBorrType = "Individual" OR strBorrType = "" OR strBorrType = "Trustee" OR strBorrType = "Settlor Trustee") OR (strCoBorrType = "Individual" OR strCoBorrType = "" OR strCoBorrType = "Trustee" OR strCoBorrType = "Settlor Trustee") Then
	
		If strLatestOREarliest="Latest" Then
			BIZ_DisclosureTrackingTool_RescLoan_GetEarliestLatestDate=BIZ_GetLatestDate(arrEarliest)
		Else
			BIZ_DisclosureTrackingTool_RescLoan_GetEarliestLatestDate=BIZ_GetEarliestDate(arrEarliest)
		End If
	End If
	
End Function


