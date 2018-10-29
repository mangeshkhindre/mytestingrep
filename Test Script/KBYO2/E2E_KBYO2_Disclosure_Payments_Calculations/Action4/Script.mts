


'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "TC #1 (CBIZ-16570) : KBYO2: Total of Payments Disclosure Calculations ","KBYO2: Total of Payments Disclosure Calculations ",null
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

'====== Navigate to 1003 Page1  Form ====== 
Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objPayoffPayment=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PayoffsAndPaymentsDialog")
Set PCLineDetailsPage=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
Set MIPDialog=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog")
'=========================== 'Set basic loan data TestData ==============================================================
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "KBYO2_CBIZ16570"

strLoanType=Parameter("LoanPurpose")
'strLoanType="Purchase"
Select Case strLoanType
	Case	"Purchase"
			GUI_WebCheckbox_Click objConstructionPage.WebCheckBox("html id:=__cid_CheckBox10_Ctrl")	
	Case	"No cash out refinance"
			GUI_WebCheckbox_Set objConstructionPage.WebCheckBox("html id:=__cid_CheckBox10_Ctrl"),"OFF"
			GUI_WebCheckbox_Click objConstructionPage.WebCheckBox("html id:=__cid_CheckBox12_Ctrl")			
	Case 	"Cash out refinance"
			GUI_WebCheckbox_Set objConstructionPage.WebCheckBox("html id:=__cid_CheckBox12_Ctrl"),"OFF"
			GUI_WebCheckbox_Click objConstructionPage.WebCheckBox("html id:=__cid_CheckBox11_Ctrl")	
	Case 	"Construction"
			GUI_WebCheckbox_Set objConstructionPage.WebCheckBox("html id:=__cid_CheckBox11_Ctrl"),"OFF"
			GUI_WebCheckbox_Click objConstructionPage.WebCheckBox("html id:=__cid_CheckBox13_Ctrl")	
			BIZ_Forms_Open "Construction Management"
			GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=TextBox58"),"12"
	Case 	"Construction Perm"
			GUI_WebCheckbox_Set objConstructionPage.WebCheckBox("html id:=__cid_CheckBox13_Ctrl"),"OFF"
			GUI_WebCheckbox_Click objConstructionPage.WebCheckBox("html id:=__cid_CheckBox15_Ctrl")	
			BIZ_Forms_Open "Construction Management"
			GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=TextBox29"),"5"
			GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=TextBox28"),"12"
			GUI_WebCheckbox_Set objConstructionPage.WebCheckBox("html id:=__cid_CheckBox20_Ctrl"),"ON"
			
End Select

FRM_Logger_ReportStepEvent "Validate LE3.X17 for Loan Purpose:= " &strLoanType,"Validate LE3.X17 for Loan Purpose:= "&strLoanType,null
'=========================== 'Navigate to 2015 Itemization and set Data in 334 ,561 field ==============================================================
BIZ_2015Itemization_Set900Section "KBYO2_16570"

GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop901")
wait 2

'click Seller Obligated Check box 
GUI_WebCheckbox_Click PCLineDetailsPage.WebCheckBox("html id:=__cid_chkSellerObligated_Ctrl")
UTIL_Win_SendKey "%{F4}"

' ************************************ Enter 1000 Section *****************************************************************

BIZ_2015Itemization_Set1000Section "KBYO2_16570"
GUI_WebButton_Click objConstructionPage.WebButton("html id:=StandardButton5")
wait 1
BIZ_MIPDialog_SetDetails "KBYO2_16570"
GUI_SwfButton_Click MIPDialog.SwfButton("swfname:=okBtn")
wait 1

GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
wait 2

'click Seller Obligated Check box 
GUI_WebCheckbox_Click PCLineDetailsPage.WebCheckBox("html id:=__cid_chkSellerObligated_Ctrl")
UTIL_Win_SendKey "%{F4}"

GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop901")
wait 2


strBorrower334=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorPaid"),"value")
strSeller561=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSelPaid"),"value")
strSellerX2177=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSellerObligatedAmt"),"value")



'Formula to get 334+561-NEWHUD2.X2177
dblPurchaseVal901=cdbl(strBorrower334)+cdbl(strSeller561)-cdbl(strSellerX2177)
FRM_Logger_ReportStepEvent "Section 900 value ","Section 900 value:- " &dblPurchaseVal901,null
UTIL_Win_SendKey "%{F4}"
wait 2

GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
wait 2

' ********************************************************************************************************************************
strBorrower338=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorPaid"),"value")
strSeller563=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSelPaid"),"value")
strSellerX2606=GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtSellerObligatedAmt"),"value")


'Formula to get 334+561-NEWHUD2.X2177
dblPurchaseVal1003=cdbl(strBorrower338)+cdbl(strSeller563)-cdbl(strSellerX2606)
FRM_Logger_ReportStepEvent "Section 1000 value ","Section 1000 value:- " &dblPurchaseVal1003,null
UTIL_Win_SendKey "%{F4}"
wait 2
' ************************************Get MI and Interest values for 5 years ***********************************************************************************
'====== Navigate to CD page 1 Form ======

'strLoanType="Construction"
BIZ_Forms_Open "Closing Disclosure Page 1"
Select Case strLoanType
	Case "Construction"
			strval=getAmortizationScheduleDetailsCD1(strLoanType)
			dblPCvalues=SetDataPCFields("CBIZ16570")
			FRM_Logger_ReportStepEvent "PC Section and Field 4088 value ","PC Section and Field 4088 value:- " &dblPCvalues,null
	
	Case Else
			strval=getAmortizationScheduleDetailsCD1(strLoanType)
	
End Select


arrstrval=Split(strval,",")

dblMIval=cdbl(arrstrval(0))
dblInterestval=cdbl(arrstrval(1))

FRM_Logger_ReportStepEvent "Section MI and Interest value ","MI value:- " &dblMIval & " Interest values:- "&dblInterestval,null


' ************************************ Get LE3.X18 and LE2.XSTD values ********************************************************
'====== Navigate to LE Page 3 Form ======
BIZ_Forms_Open "Loan Estimate Page 3"
'LE3X18
dblLE3X18=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox18"),"value"))
'LE3X17
dblLE3X17=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox17"),"value"))
'====== Navigate to LE Page 3 Form ======
BIZ_Forms_Open "Loan Estimate Page 2"

dblLE2XSTD=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox154"),"value"))


' ************************************ Final Summation ********************************************************
Select Case strLoanType
	Case "Construction"
			dblFinalOutput=round(dblLE3X18+dblMIval+dblLE2XSTD+dblPurchaseVal901+dblPurchaseVal1003+dblPCvalues)
	Case Else
			dblFinalOutput=round(dblLE3X18+dblInterestval+dblMIval+dblLE2XSTD+dblPurchaseVal901+dblPurchaseVal1003)
	
End Select


FRM_Logger_ReportStepEvent "Final Calculated value ","Final Calculated value:- " &dblFinalOutput,null

FRM_VerifyEqual dblLE3X17,dblFinalOutput,"Comparision of LE3.X17 with summation of other values","Comparision of LE3.X17 with summation of other values"

'Calculate CD5.X1 value

FRM_Logger_ReportStepEvent "Validate CD5.X1 value ","Validate CD5.X1 value ",null

' ************************************ Caluculate the CD page summation ********************************************************
'====== Navigate to CD page 1 Form ======

Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set PCLineDetailsPage=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
BIZ_Forms_Open "Closing Disclosure Page 2"
'Get CD2.XSTD
dblCD2XSTD=cdbl(GUI_Object_GetPropertyValue(objConstructionPage.WebEdit("html id:=TextBox418"),"value"))

BIZ_Forms_Open "2015 Itemization"
'Get NEWHUD2.X2158 value on 2015 Form
GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop901")
wait 2
dblBorrower2158=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
UTIL_Win_SendKey "%{F4}"
wait 2
'Get NEWHUD2.X2191alue on 2015 Form
GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop902")
wait 2
dblBorrower2191=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
UTIL_Win_SendKey "%{F4}"
wait 2

'Get NEWHUD2.X2191alue on 2015 Form
GUI_WebButton_Click objConstructionPage.WebButton("html id:=btnPop1003")
wait 2
dblBorrower2758=cdbl(GUI_Object_GetPropertyValue 	(PCLineDetailsPage.WebEdit("html id:=txtBorAmtPaid"),"value"))
UTIL_Win_SendKey "%{F4}"
wait 2


'Navigate to RegZ-LE form 
BIZ_Forms_Open "RegZ - LE"

dblBorrower4071=cdbl(GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=l_1207"),"value"))
'Get the summation of all the values..

Select Case strLoanType
	Case "Construction"
			dblBorrowerPCvalues=cdbl(BorrowerPCvalues)
			dblCDfinalval=dblCD2XSTD+dblBorrower2158+dblBorrower2191+dblBorrower2758+dblBorrower4071+dblBorrowerPCvalues
	Case Else
			dblCDfinalval=dblCD2XSTD+dblBorrower2158+dblBorrower2191+dblBorrower2758+dblBorrower4071
	
End Select



'Get the CD5.X1 values

BIZ_Forms_Open "Closing Disclosure Page 5"

wait 2

dblCD5X1=cdbl(GUI_Object_GetPropertyValue (objConstructionPage.WebEdit("html id:=TextBox1"),"value"))

FRM_VerifyEqual cstr(dblCD5X1),cstr(dblCDfinalval),"Comparision of CD5.X1 with summation of other values","Comparision of CD5.X1 with summation of other values"
'msgbox "w"

    
