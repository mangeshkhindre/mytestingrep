'@**************************************************************************************************
'@ TestStory: CTA-370
'@ TestCase: CBIZ-14112 KBYO2 - Update CD Page 4 Escrow Calculations to Include Mortgage Insurance
' Scenario1: Purchase-USDA, Monthly
' Scenario2: Construction-Perm, Construction Period=12 months, escrow date basis= 1st Amort date, Monthly
' Scenario3: Construction-Perm, Construction Period=12 months, escrow date basis= 1st Payment date, Monthly
' Scenario4: Purchase-USDA, Biweekly
' Scenario5: Construction-Perm, Construction Period=12 months, escrow date basis= 1st Amort date, Biweekly
' Scenario6: Construction-Perm, Construction Period=12 months, escrow date basis= 1st Payment date, Biweekly
' Scenario7: Purchase-MI
' Scenario8: Construction
'@ Test Automation JIRA Task: CTA-387 - E2E_KBYO2_EscrowCalculations_CDPage4
'@ TestData:	BorrowerSummaryOrigination, SetBorrower, E2E_KBYO2_EscrowCalculatioins
'				BorrowerSummaryOrigination, SetProperty, E2E_KBYO2_EscrowCalculatioins
'				BorrowerSummaryOrigination, SetTransactionDetails, E2E_KBYO2_EscrowCalculatioins
'				ClosingDisclosurePage1, SetClosingInformation, E2E_KBYO2_EscrowCalculatioins
'				AggregateEscrowAccount, Setup, E2E_KBYO2_EscrowCalculatioins
'@ Pre-conditions: NA
'@ Description:  
	'@ Test Step
	'1. Login to Encompass
	'2. Create a new loan
	'3. Enter data in Borrower Summary Origination
	'4. Enter data in Agreegate Escrow Account

'@Expected Results
	'-1) Validate below fields on CD Page 4.
'		a. CD4.X9 checkbox
'		b. HUD66
'		c. HUD67
'		d. CD4X10
'		e. CD4X40
'		f. CD4X40
'		g. CD4X41
'******************************************************************************************************************************************

strRowID = "E2E_KBYO2_EscrowCalculatioins"
strRowBiweekly = "E2E_KBYO2_EscrowCalculatioins_Biweekly"

strTestScenario = Parameter("TestScenario")
Set objMainPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
Set objMIPage = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog")

FRM_Logger_ReportStepEvent "Start test scenario","Test scenario " & strTestScenario, Null

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "Automation"

'===== Enter data in Borrower Summary Origination =======
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID

If strTestScenario = "2" OR strTestScenario = "3" OR strTestScenario = "5" OR strTestScenario = "6" Then
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox15_Ctrl"), "ON"
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox19_Ctrl"), "ON"
ElseIf strTestScenario = "7" Then
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox19_Ctrl"), "ON"
ElseIf strTestScenario = "8" Then
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox19_Ctrl"), "ON"
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox13_Ctrl"), "ON"
End If

BIZ_Forms_Open "1003 Page 2"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_233"), "20"

'======== Go to Closing Disclosure Page 1 ===============
BIZ_Forms_Open "Closing Disclosure Page 1"
BIZ_ClosingDisclosurePage1_SetClosingInformation strRowID

'======== Go to RegZ - CD ===============

If strTestScenario = "4" OR strTestScenario = "5" OR strTestScenario = "6" Then
	BIZ_Forms_Open "RegZ - CD"
	GUI_WebCheckBox_Set objMainPage.WebCheckbox("html id:=__cid_CheckBox24_Ctrl"), "ON"
End If

'======== Go to Construction Management ===============
If strTestScenario = "2" OR strTestScenario = "3" OR strTestScenario = "5" OR strTestScenario = "6" Then
	BIZ_Forms_Open "Construction Management"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=TextBox28"), "12"
ElseIf strTestScenario = "8" Then
	BIZ_Forms_Open "1003 Page 1"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1176"), "12"
End If

'======== Go to Aggregate Escrow Account ===============
BIZ_Forms_Open "Aggregate Escrow Account"
BIZ_AggregateEscrowAccount_SetData strRowID
If strTestScenario = "1" OR strTestScenario = "2" OR strTestScenario = "3" OR strTestScenario = "7" OR strTestScenario = "8" Then
	BIZ_Forms_AggregateEscrowAccount_SetUp strRowID
Else
	BIZ_Forms_AggregateEscrowAccount_SetUp strRowBiweekly
End If

If strTestScenario = "2" OR strTestScenario = "5" Then
	GUI_WebList_Select objMainPage.WebList("html id:=DropdownBox1"), "1st Amort Date"
ElseIf strTestScenario = "3" OR strTestScenario = "6" Then
	GUI_WebList_Select objMainPage.WebList("html id:=DropdownBox1"), "1st Payment Date"
End If

If strTestScenario = "2" OR strTestScenario = "3" OR strTestScenario = "5" OR strTestScenario = "6" OR strTestScenario = "7" Then
	GUI_WebButton_Click objMainPage.WebButton("html id:=StandardButton8")
	GUI_SwfEdit_Set objMIPage.SwfEdit("swfname:=rateFundingTxt"),".1"
	GUI_SwfEdit_Set objMIPage.SwfEdit("swfname:=rateMI1Txt"),".1"
	GUI_SwfEdit_Set objMIPage.SwfEdit("swfname:=monthMI1Txt"),"12"
	GUI_SwfButton_Click objMIPage.SwfButton("swfname:=okBtn")
End If

Set objData = FRM_DS_GetTestData("Forms_AggregateEscrowAccount", "SetData", strRowID)

int231 = FRM_DS_GetValue(objData, "231_Tax")
int230 = FRM_DS_GetValue(objData, "230_HazardInsurance")
int235 = FRM_DS_GetValue(objData, "235_FloodInsurance")
int268 = FRM_DS_GetValue(objData, "L268_CityPropertyTax")
int1630 = FRM_DS_GetValue(objData, "1630_Tax1")
int253 = FRM_DS_GetValue(objData, "253_Tax2")
int254 = FRM_DS_GetValue(objData, "254_Tax3")
int1707 = FRM_DS_GetValue(objData, "NEWHUD.X1707")
ActHUD24 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=l_HUD24"),"value")
If GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=l_232"),"value") = "" Then
	int232 = "0.00"
Else
	int232 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=l_232"),"value")
End If

'======== Go to Closing Disclosure Page 4 ===============
BIZ_Forms_Open "Closing Disclosure Page 4"

GUI_Object_ValidateChecked objMainPage.WebCheckBox("html id:=__cid_CheckBox11_Ctrl"),"1","Validate CD4.X9 checkbox"

ExpTotal = FormatNumber((int231 + int230 + int232 + int235 + int268 + int1630 + int253 + int254 + int1707) * 12,2)
ActHUD66 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox6"),"value")
If strTestScenario = "2" OR strTestScenario = "5" Then
	FRM_VerifyEqual ActHUD66, "0.00" , "Verify HUD66 field value", "Verify HUD66 field"
Else 
	FRM_VerifyEqual ActHUD66, ExpTotal, "Verify HUD66 field value", "Verify HUD66 field"
End If

ActHUD67 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox15"),"value")
If strTestScenario = "2" OR strTestScenario = "5" Then
	FRM_VerifyEqual ActHUD67, "0.00", "Verify HUD67 field value", "Verify HUD67 field"
Else
	FRM_VerifyEqual ActHUD67, "240.00", "Verify HUD67 field value", "Verify HUD67 field"
End if

ActCD4X10 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox17"),"value")
FRM_VerifyEqual ActCD4X10, ActHUD24, "Verify CD4X10 field value", "Verify CD4X10 field"

ActCD4X44 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=TextBox16"),"value")
ExpCD4X44 = FormatNumber(ExpTotal - ActCD4X10,2)
FRM_VerifyEqual ActCD4X44, ExpCD4X44, "Verify CD4X44 field value", "Verify CD4X44 field"

ActCD4X40 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=txtCDX40"),"value")
If strTestScenario = "2" OR strTestScenario = "5" Then
	FRM_VerifyEqual ActCD4X40, "", "Verify CD4X40 field value", "Verify CD4X40 field"
Else
	FRM_VerifyEqual ActCD4X40, ActHUD66, "Verify CD4X40 field value", "Verify CD4X40 field"
End If 

ActCD4X41 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=txtCDX41"),"value")
If strTestScenario = "2" OR strTestScenario = "5" Then
	FRM_VerifyEqual ActCD4X41, "", "Verify CD4X41 field value", "Verify CD4X41 field"
Else
	FRM_VerifyEqual ActCD4X41, "240.00", "Verify CD4X41 field value", "Verify CD4X41 field"
End if

If strTestScenario = "1" OR strTestScenario = "2" OR strTestScenario = "3" OR strTestScenario = "7" OR strTestScenario = "8" Then
	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=escrowedPropertyCostsBasisDropDown"),"1st Payment Date"
	
	ActCD4X40 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=txtCDX40"),"value")
	ExpCD4X40 = FormatNumber(cdbl(ActHUD66) + cdbl(ActCD4X10),2)
	FRM_VerifyEqual ActCD4X40, ExpCD4X40, "Verify CD4X40 field value", "Verify CD4X40 field"
	
	ActCD4X41 = GUI_Object_GetPropertyValue (objMainPage.WebEdit("html id:=txtCDX41"),"value")
	ExpCD4X41 = FormatNumber(cdbl(ActHUD67) + 20,2)
	FRM_VerifyEqual ActCD4X41, ExpCD4X41, "Verify CD4X41 field value", "Verify CD4X41 field"
End if 

BIZ_Loan_Exit False

Set objMainPage = Nothing
Set objMIPage = Nothing
Set objData = Nothing
