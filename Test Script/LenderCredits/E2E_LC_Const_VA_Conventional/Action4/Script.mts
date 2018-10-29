'BIZ_1003Page3_SetDetailsTransaction "PTAC-669"

BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

'====== Navigate to pipeline and create a new loan ======
strLoanType=Parameter("LoanPurpose")
FRM_Logger_ReportStepEvent "TC 01: E2E_Lender_Credit","E2E_Lender_Credit ",null

'====== Navigate to 1003 Page1  Form ====== 
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objPayoffPayment=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PayoffsAndPaymentsDialog")
Set objQuickEntryPopupDialog = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
Set MIPDialog=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog")
'=========================== 'Set basic loan data TestData ==============================================================
BIZ_Forms_Open "1003 Page 1"
BIZ_1003Page1_SetData "CTA407"


'strLoanType="Purchase"
Select Case strLoanType
					
	Case 	"Construction"
			strFname="LCConst"
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox3_Ctrl"), "ON" 'Loan Type
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox16_Ctrl"), "ON" 'Loan Purpose
			
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox3_Ctrl")) 
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox16_Ctrl"))
			
			If GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox3_Ctrl")) AND GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox16_Ctrl"))  Then
				FRM_Logger_ReportInfoEvent "Loan Type and Purchase Selection","Conventional and Constructional only  is selected successfully","Conventional and construction only is selected successfully"
			End If
	
	Case	"VA_Purchase"
			strFname="LCVAPurchase"
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox5_Ctrl"), "ON" 'Loan Type
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"), "ON" 'Loan Purpose
			
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox5_Ctrl")) 
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"))
			
			If GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox5_Ctrl")) AND GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"))  Then
				FRM_Logger_ReportInfoEvent "Loan Type and Purchase Selection","VA and Purchase is selected successfully","VA and Purchase is selected successfully"
			End If
			
			
	Case	"Conventional_Purchase"
			strFname="LCConPurchase"
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox3_Ctrl"), "ON" 'Loan Type
			GUI_WebCheckBox_Set objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"), "ON" 'Loan Purpose
			
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox5_Ctrl")) 
			GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"))
			
			If GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox5_Ctrl")) AND GUI_WebCheckbox_IsChecked(objConstructionPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"))  Then
				FRM_Logger_ReportInfoEvent "Loan Type and Purchase Selection","Conventional and Purchase is selected successfully","VA and Purchase is selected successfully"
			End If		
	
			
	
			
			
End Select

GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=l_36"),strFname
GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=l_37"),strFname


FRM_Logger_ReportStepEvent "Data Entry for 1003 Page 2","Data Entry for 1003 Page 2",null
'=========================== 'Navigate to 1003 Page 2 and set the Testdata ==============================================================

BIZ_1003Page2_SetMonthlyIncomeExpensesData "CTA407"
BIZ_1003Page2_SetLiabilities "CTA407"
BIZ_BorrowerSummaryOrigination_SetProperty "CTA407"


BIZ_Forms_Open "1003 Page 3"
BIZ_VOM_SetNewLiabilities "CTA407"



'Set 141 Lender Credit as 1000
objConstructionPage.WinEdit("regexpwndclass:=Edit","index:=0").Set "Lender Credit"
GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=l_141"),"1000"



GUI_WebButton_Click objConstructionPage.WebButton("html id:=Button1")
wait 2
FRM_Logger_ReportStepEvent "Step 5 Validations","Step 5 Validations",null


'City 
FRM_VerifyEqual GUI_Object_GetPropertyValue (objQuickEntryPopupDialog.WebEdit("html id:=l_FM0006"),"value"),"Fremont","City","City"

'Present market Values
FRM_VerifyEqual GUI_Object_GetPropertyValue (objQuickEntryPopupDialog.WebEdit("html id:=l_FM0019"),"value"),"800,000.00","Present Market Value","Present Market Value"

'Mortgage Balance
FRM_VerifyEqual GUI_Object_GetPropertyValue (objQuickEntryPopupDialog.WebEdit("html id:=l_FM0017"),"value"),"250,000.00","Mortgage Balance","Mortgage Balance Value"

'Mortgage Payment
FRM_VerifyEqual GUI_Object_GetPropertyValue (objQuickEntryPopupDialog.WebEdit("html id:=l_FM0016"),"value"),"1,500.00","Mortgage Payment","Mortgage Balance Payment"

GUI_WebButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
wait 2
'Market Values
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_919"),"value"),"800,000.00","Market Value","Market Value"

'Amount of Mortgage
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_920"),"value"),"250,000.00","Amount of Mortgage","Amount of Mortgage"

'Mortgage Pyment
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_922"),"value"),"1,500.00","Amount of Mortgage","Mortgage Payment"


'Purchase Price
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_136"),"value"),"700,000.00","Purchase Price","Purchase Price"
' ************************************ Enter data in 2015 itemization form Section *****************************************************************
FRM_Logger_ReportStepEvent "Data Entry for 2015 itemization form Section","Data Entry for 2015 itemization form Section",null

BIZ_2015Itemization_Set800Section "CTA407"
set800Adjustment "CTA407"
BIZ_2015Itemization_Set900Section "CTA407"
BIZ_2015Itemization_Set1000Section "CTA407"

' ************************************ Step6 validation in 2015 itemization form Section *****************************************************************

FRM_Logger_ReportStepEvent "Step6 validation for Closing Costs Summary","Step6 validation for Closing Costs Summary",null

'Total Lender Paid CC
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_LENPCC"),"value"),"500.00","Total Lender Paid CC","Total Lender Paid CC"

'Total Other Paid CC
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_OTHPCC"),"value"),"50.00","Total Other Paid CC","Total Other Paid CC"

'Total Non-Borrower Paid CC (b)
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_TNBPCC"),"value"),"550.00","Total Non-Borrower Paid CC (b)","Total Non-Borrower Paid CC (b)"

'Total Lender Credit (c)
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox649"),"value"),"6,000.00","Total Lender Credit (c)","Total Lender Credit (c)"

'Total Closing Costs
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_TOTPCC"),"value"),"9,092.33","Total Closing Costs","Total Closing Costs"

If strLoanType="Purchase" Then
    'Total Other Paid CC
	FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_OTHPCC"),"value"),"50.00","Total Other Paid CC","Total Other Paid CC"
End If

'*******************************************************************************************************************************************************************************
FRM_Logger_ReportStepEvent "Step6 validation for Total Estimated Funds Needed to Close","Step6 validation for Total Estimated Funds Needed to Close",null

'Purchase Price
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_136"),"value"),"700,000.00","Purchase Price","Purchase Price"

'Total Costs
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1073"),"value"),"708,592.33","Total Costs","Total Costs"

'Lender Credit
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_141"),"value"),"1,000.00","Lender Credit","Lender Credit"

'CC Paid by Broker, Lender, and Other
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1852"),"value"),"5,550.00","CC Paid by Broker Lender and Other","CC Paid by Broker, Lender, and Other"

'Total Credits
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1844"),"value"),"606,550.00","Total Credits","Total Credits"

'Cash from borrower
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_142"),"value"),"102,042.33","Cash from borrower","Cash from borrower"

'*******************************************************************************************************************************************************************************
FRM_Logger_ReportStepEvent "Step 7 Loan Estimation Page 1","Step 7 Loan Estimation Page 1",null

BIZ_Forms_Open "Loan Estimate Page 1"
'LE2.XLC
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox73"),"value"),"7,000","LE2.XLC","LE2.XLC"

'*******************************************************************************************************************************************************************************
FRM_Logger_ReportStepEvent "Step 8 Closing Disclosure Page 1","Step 8 Closing Disclosure Page 1",null

BIZ_Forms_Open "Closing Disclosure Page 1"

'CD2.XSTLC
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox90"),"value"),"6,500.00","CD2.XSTLC","CD2.XSTLC"

'*******************************************************************************************************************************************************************************
FRM_Logger_ReportStepEvent "Step 9 1003 Page 3","Step 9 1003 Page 3",null

BIZ_Forms_Open "1003 Page 3"

'CC paid by Broker, Lender, Oth.
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1852"),"value"),"5,550.00","CC paid by Broker, Lender, Oth.","CC paid by Broker, Lender, Oth."


'Total Credits
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1844"),"value"),"606,550.00","Total Credits","Total Credits"


'Cash from borrower
FRM_VerifyEqual GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_142"),"value"),"102,042.33","Cash from borrower","Cash from borrower"

BIZ_Loan_Save()




'
'GUI_WebCheckbox_Click PCLineDetailsPage.WebCheckBox("html id:=__cid_chkSellerObligated_Ctrl")
'
'
'
'
'BIZ_2015Itemization_Set1000Section "KBYO2_16570"
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=StandardButton5")
'wait 1
'BIZ_MIPDialog_SetDetails "KBYO2_16570"
'GUI_SwfButton_Click MIPDialog.SwfButton("swfname:=okBtn")
'wait 1
'
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
'wait 2
'
''click Seller Obligated Check box 
'GUI_WebCheckbox_Click PCLineDetailsPage.WebCheckBox("html id:=__cid_chkSellerObligated_Ctrl")
'UTIL_Win_SendKey "%{F4}"
'
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop901")
'wait 2
'
'
'strBorrower334=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorPaid"),"value")
'strSeller561=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSelPaid"),"value")
'strSellerX2177=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSellerObligatedAmt"),"value")
'
'
'
''Formula to get 334+561-NEWHUD2.X2177
'dblPurchaseVal901=cdbl(strBorrower334)+cdbl(strSeller561)-cdbl(strSellerX2177)
'FRM_Logger_ReportStepEvent "Section 900 value ","Section 900 value:- " &dblPurchaseVal901,null
'UTIL_Win_SendKey "%{F4}"
'wait 2
'
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
'wait 2
'
'' ********************************************************************************************************************************
'strBorrower338=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorPaid"),"value")
'strSeller563=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSelPaid"),"value")
'strSellerX2606=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSellerObligatedAmt"),"value")
'
'
''Formula to get 334+561-NEWHUD2.X2177
'dblPurchaseVal1003=cdbl(strBorrower338)+cdbl(strSeller563)-cdbl(strSellerX2606)
'FRM_Logger_ReportStepEvent "Section 1000 value ","Section 1000 value:- " &dblPurchaseVal1003,null
'UTIL_Win_SendKey "%{F4}"
'wait 2
'' ************************************Get MI and Interest values for 5 years ***********************************************************************************
''====== Navigate to CD page 1 Form ======
'
''strLoanType="Construction"
'BIZ_Forms_Open "Closing Disclosure Page 1"
'Select Case strLoanType
'	Case "Construction"
'			strval=getAmortizationScheduleDetailsCD1(strLoanType)
'			dblPCvalues=SetDataPCFields("CBIZ16570")
'			FRM_Logger_ReportStepEvent "PC Section and Field 4088 value ","PC Section and Field 4088 value:- " &dblPCvalues,null
'	
'	Case Else
'			strval=getAmortizationScheduleDetailsCD1(strLoanType)
'	
'End Select
'
'
'arrstrval=Split(strval,",")
'
'dblMIval=cdbl(arrstrval(0))
'dblInterestval=cdbl(arrstrval(1))
'
'FRM_Logger_ReportStepEvent "Section MI and Interest value ","MI value:- " &dblMIval & " Interest values:- "&dblInterestval,null
'
'
'' ************************************ Get LE3.X18 and LE2.XSTD values ********************************************************
''====== Navigate to LE Page 3 Form ======
'BIZ_Forms_Open "Loan Estimate Page 3"
''LE3X18
'dblLE3X18=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox18"),"value"))
''LE3X17
'dblLE3X17=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox17"),"value"))
''====== Navigate to LE Page 3 Form ======
'BIZ_Forms_Open "Loan Estimate Page 2"
'
'dblLE2XSTD=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox154"),"value"))
'
'
'' ************************************ Final Summation ********************************************************
'Select Case strLoanType
'	Case "Construction"
'			dblFinalOutput=round(dblLE3X18+dblMIval+dblLE2XSTD+dblPurchaseVal901+dblPurchaseVal1003+dblPCvalues)
'	Case Else
'			dblFinalOutput=round(dblLE3X18+dblInterestval+dblMIval+dblLE2XSTD+dblPurchaseVal901+dblPurchaseVal1003)
'	
'End Select
'
'
'FRM_Logger_ReportStepEvent "Final Calculated value ","Final Calculated value:- " &dblFinalOutput,null
'
'FRM_VerifyEqual dblLE3X17,dblFinalOutput,"Comparision of LE3.X17 with summation of other values","Comparision of LE3.X17 with summation of other values"
'
''Calculate CD5.X1 value
'
'FRM_Logger_ReportStepEvent "Validate CD5.X1 value ","Validate CD5.X1 value ",null
'
'' ************************************ Caluculate the CD page summation ********************************************************
''====== Navigate to CD page 1 Form ======
'
'Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
'Set PCLineDetailsPage=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
'BIZ_Forms_Open "Closing Disclosure Page 2"
''Get CD2.XSTD
'dblCD2XSTD=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox418"),"value"))
'
'BIZ_Forms_Open "2015 Itemization"
''Get NEWHUD2.X2158 value on 2015 Form
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop901")
'wait 2
'dblBorrower2158=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
'UTIL_Win_SendKey "%{F4}"
'wait 2
''Get NEWHUD2.X2191alue on 2015 Form
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop902")
'wait 2
'dblBorrower2191=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
'UTIL_Win_SendKey "%{F4}"
'wait 2
'
''Get NEWHUD2.X2191alue on 2015 Form
'GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
'wait 2
'dblBorrower2758=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
'UTIL_Win_SendKey "%{F4}"
'wait 2
'
'
''Navigate to RegZ-LE form 
'BIZ_Forms_Open "RegZ - LE"
'
'dblBorrower4071=cdbl(GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1207"),"value"))
''Get the summation of all the values..
'
'Select Case strLoanType
'	Case "Construction"
'			dblBorrowerPCvalues=cdbl(BorrowerPCvalues)
'			dblCDfinalval=dblCD2XSTD+dblBorrower2158+dblBorrower2191+dblBorrower2758+dblBorrower4071+dblBorrowerPCvalues
'	Case Else
'			dblCDfinalval=dblCD2XSTD+dblBorrower2158+dblBorrower2191+dblBorrower2758+dblBorrower4071
'	
'End Select
'
'
'
''Get the CD5.X1 values
'
'BIZ_Forms_Open "Closing Disclosure Page 5"
'
'dblCD5X1=cdbl(GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox1"),"value"))
'
'FRM_VerifyEqual cstr(dblCD5X1),cstr(dblCDfinalval),"Comparision of CD5.X1 with summation of other values","Comparision of CD5.X1 with summation of other values"
''msgbox "w"
'
'   
