FRM_Logger_ReportStepEvent "TC #1 (CBIZ-15817): E2E_KBYO2_Support_Cure_Principal_Reduction ","E2E_KBYO2_Support_Cure_Principal_Reduction ",null

BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation"

'====== Set Page objects for various pages for easiness ====== 
Set objMainPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objPayoffPayment=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=PayoffsAndPaymentsDialog")
Set objAddUCDDetails=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
Set objAddAdjustment=objPayoffPayment.SwfWindow("swfname:=NonVOLEntryDialog")
Set objPayoffList=objPayoffPayment.SwfObject("swfname:=listViewLiabs")

FRM_Logger_ReportStepEvent "Validate the Standard version on CD3 page","Validate the Standard version on CD3 page ",null

strdata=setandValidateCureDetails(222)

'====== Validate whether data is Populated in K section of CD3 L84 ======
FRM_Logger_ReportStepEvent "Verification of Data Population in K Section of CD3","Verification of Data Population in K Section of CD3",Null
ValidateCD3KSection(strdata)

'====== Validate whether data can be updated SELLER ======
GUI_WebButton_Click objMainPage.WebButton("html id:=Button4")'Click payment and payoff button
GUI_List_ActOnRow objPayoffList,0,True,False,False,"Double"
GUI_SwfComboBox_Select objAddAdjustment.SwfComboBox("swfname:=cmdPaidBy"),"Seller"
GUI_SwfButton_Click objAddAdjustment.SwfButton("swfname:=btnOk")
strDataAU=GUI_List_GetCellData (objPayoffList,0,"Description of Purpose")
GUI_SwfButton_Click objPayoffPayment.SwfButton("swfname:=okBtn")
GUI_WinButton_Click  objPayoffPayment.Dialog("text:=Encompass").WinButton("text:=&Yes")

'====== Validate whether data can be updated in K Section ======
FRM_Logger_ReportStepEvent "Verification of Data Population in K Section of CD3 after Type updation","Verification of Data Population in K Section of CD3 after Type updation",Null
ValidateCD3KSection(strDataAU)

FRM_Logger_ReportStepEvent "Verification of Data Population in K Section of CD3 after Data updation","Verification of Data Population in K Section of CD3 after Data updation",Null
strdata=setandValidateCureDetails(333)

ValidateCD3KSection(strdata)


'====== Validate whether Data Entries are Overridden by Feevariance POC ======
'Clear the POC variance first
addPOCVariance(" ")
'====== Add 2 Entries for Standard version from CD3 Adjustments and Other Credits ======
'====== Navigate to CD page 3 Form ======
inttotal=setUCDDetails(100,200)
inttotal=FormatNumber(inttotal,2)
wait 2
FRM_VerifyEqual inttotal,GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBoxCD4"),"value"),"Validate Overriding of 2 Entries for UCD details","Validate Overriding of 2 Entries for UCD details"

strdata=setandValidateCureDetails(400)
ValidateCD3KSection(strdata)

'================================= ALTERNATE VERSION =========================================================


FRM_Logger_ReportStepEvent "Validate the Alternate version on CD3 page","Validate the Alternate version on CD3 page ",null

'Clear the POC variance first
addPOCVariance(" ")
'====== Navigate to LE Page 2 Form ======
BIZ_Forms_Open "Loan Estimate Page 2"
GUI_WebCheckbox_Set objMainPage.WebCheckBox("html id:=__cid_CheckBox4_Ctrl"),"ON"
'====== Add adjustments on LE2 page for gift and rebate credit ======
addAdjustmentsAlternate "Gift",100
addAdjustmentsAlternate "Rebate Credit",200
'====== Validate whether Data Entries are Appended by Feevariance POC ======
'====== Validate the entries on CD3 page ======
BIZ_Forms_Open "Closing Disclosure Page 3"
strvalbeforePOC=GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox174"),"value")
FRM_Logger_ReportStepEvent "Validate the values in Alternate version on CD3 page","Validate the values in Alternate version on CD3 page:= "&strvalbeforePOC,null

addPOCVariance(500)
BIZ_Forms_Open "Closing Disclosure Page 3"
strvalafterPOC=GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox174"),"value")

FRM_Logger_ReportStepEvent "Validate the values in Alternate version on CD3 page","Validate the values in Alternate version on CD3 page:= "&strvalafterPOC,null

If strvalbeforePOC<>strvalafterPOC Then
	FRM_Logger_ReportPassEvent "POC variance appending the CD3 page adjustments","POC variance appending the CD3 page adjustments",null
Else
	FRM_Logger_ReportFailEvent "POC variance NOT appending the CD3 page adjustments","POC variance NOT appending the CD3 page adjustments",null
End If

'====== Validate the entries on CD3 page in Remarks section for Standard version ======

FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version","Validate the Remark Section for Standard Version",null
'Clear the POC variance first
addPOCVariance(" ")
'====== Navigate to LE Page 2 Form ======
BIZ_Forms_Open "Loan Estimate Page 2"
GUI_WebCheckbox_Set objMainPage.WebCheckBox("html id:=__cid_CheckBox4_Ctrl"),"OFF"
'====== Set Data in OriginationFee and Loan amount ======
setLoanAmountandOriFeeData


'====== Validate the Remark Section for Standard Version for See Label ======
FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version for See Label","Validate the Remark Section for Standard Version for See Label",null
validateRemarkSection objMainPage.WebElement("html id:=panelSTDTotalClosingCost1"),"Validate the Remark Section for Standard Version for POC variance","YES"

'====== Validate the Remark Section for Standard Version for POC variance ======
FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version for POC variance","Validate the Remark Section for Standard Version for POC variance",null
'Add POC variance 
addPOCVariance(200)

validateRemarkSection objMainPage.WebElement("html id:=lblprincipal"),"Section K Below for credit of excess amount","YES"

'====== Validate the Remark Section for Standard Version for LC variance ======
FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version for LC variance","Validate the Remark Section for Standard Version for LC variance",null
'Add LC variance 
addLCVariance(200)

'====== Validate the Applied Cure Field as addition of 396+397 ======
FRM_Logger_ReportStepEvent "Validate the Applied Cure Field","Validate the Applied Cure Field",null

intvalX397=clng(GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=editCurePrincipal"),"value"))
intvalX396=clng(GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=editCureToLender"),"value"))
intvalX366=clng(GUI_Object_GetPropertyValue(objMainPage.WebEdit("html id:=edit1"),"value"))

intvalSum=intvalX396+intvalX397

FRM_VerifyEqual intvalX366,intvalSum,"Validate the Summation of 396 and 397 fields ","Validate the Summation of 396 and 397 fields "

'====== Validate the CD2.X2 on CD2 page ======
BIZ_Forms_Open "Closing Disclosure Page 2"
FRM_VerifyEqual "200.00",GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=txtLenderCredit"),"value"),"Validate the CD2.X2 on CD2 page","Validate the CD2.X2 on CD2 page"

validateRemarkSection objMainPage.WebElement("html id:=stdClsPnl1"),"Validate the Remark Section for Standard Version for LC variance","YES"
validateRemarkSection objMainPage.WebElement("html id:=lblLenderCredits"),"Validate Lender Credits on p.2 for credit of excess amount.","YES"


'====== Validate the Remark Section for Standard Version for LC variance Removal ======
FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version for LC variance Removal","Validate the Remark Section for Standard Version for LC variance Removal",null
'Add LC variance 
addLCVariance(" ")
 

'====== Validate the entries on CD3 page ======

BIZ_Forms_Open "Closing Disclosure Page 3"
'@smaitra: Changed as per "CBIZ-18833--> Earlier we used to call this function with "NO"
validateRemarkSection objMainPage.WebElement("html id:=stdClsPnl1"),"Validate the Remark Section for Standard Version for LC variance Removal","YES"
validateRemarkSection objMainPage.WebElement("html id:=lblLenderCredits"),"Validate Lender Credits on p.2 for credit of excess amount Removal","NO"

'====== Validate the Remark Section for Standard Version for POC variance Removal ======
FRM_Logger_ReportStepEvent "Validate the Remark Section for Standard Version for POC variance Removal","Validate the Remark Section for Standard Version for POC variance Removal",null
'Add LC variance 
addPOCVariance(" ")
'====== Validate the entries on CD3 page ======
BIZ_Forms_Open "Closing Disclosure Page 3"
validateRemarkSection objMainPage.WebElement("html id:=lblprincipal"),"Validate the Remark Section for Standard Version for POC variance Removal","NO"
















 
