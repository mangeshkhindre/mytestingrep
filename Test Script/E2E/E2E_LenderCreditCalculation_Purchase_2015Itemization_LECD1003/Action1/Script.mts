'@**************************************************************************************************
'@ TestStory: 
'@ TestCase:
   '1 	
   '2 
   '3 
   '4 
   '5
'@ Test Automation JIRA Task: 
'@ TestData:
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1
   '2 
   '3 
   '4 
   '5 
'@ ExpectedResult:
   '1 
   '2 
   '3 
   '4 
   '5 
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case","PTAC-1471 - Verify the Lender credit for Purchase type in 2015/LE/CD/1003 pages", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_SelectPipelineTab()
BIZ_Loan_AddNewBlankLoan()
GUI_list_Select SwfWindow("swfname:=MainForm").SwfTab("swfname:=toolsFormsTabControl"), "Forms"
BIZ_Forms_ShowAll

'Step 2

BIZ_1003Page1_SetData "Shared_LenderCreditForConstruction"

Set objLoanFormPage=SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

BIZ_Common_1003Page1_SetBorrower objLoanFormPage, "Shared_LenderCreditForConstruction"

BIZ_Loan_Save()

strLoanNumber=BIZ_Loan_GetLoanNumber()

FRM_Logger_ReportInfoEvent "Loan Creation","'"&FRM_DS_GetValue(objData,"19_PurposeOfLoan")&"' Loan hasbeen created LoanNumber:'"&strLoanNumber&"'",Null

'Step 3

BIZ_1003Page2_SetMonthlyIncomeExpensesData "Shared_LenderCreditForConstruction"
BIZ_1003Page2_SetLiabilities "Shared_LenderCreditForConstruction"
BIZ_Loan_Save()

'Step 4

Set objLoanFormPage=SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

BIZ_BorrowerSummaryOrigination_SetBorrower "Shared_LenderCreditForConstruction"

BIZ_Common_BorrowerSummaryOrigination_SetProperty objLoanFormPage, "Shared_LenderCreditForConstruction"

'Step 5 and 6

Set objData = FRM_DS_GetTestData("Forms_1003page", "1003Page3", "Shared_LenderCreditForConstruction")
Set objQuickEntryVOMWin = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog")
Set objImportMortLiabilityWin = objQuickEntryVOMWin.SwfWindow("swfname:=NewMortgageDialog")
Set objQuickEntryPage=objQuickEntryVOMWin.Page("micclass:=Page","index:=0")
Set obj1003Page3 = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

BIZ_Forms_Open "1003 Page 3"

GUI_WebButton_Click objLoanFormPage.WebButton("html id:=Button1")

GUI_Object_ValidateText objQuickEntryVOMWin,FRM_DS_GetValue(objData,"QuickEntryVOMWindowTxt"),"'"&FRM_DS_GetValue(objData,"QuickEntryVOMWindowTxt")&"' window is dispalyed"

GUI_SwfObject_Click objQuickEntryVOMWin.SwfObject("swfname:=btnNew")

GUI_Object_ValidateText objImportMortLiabilityWin,FRM_DS_GetValue(objData,"ImportMortLiabilityWinTxt"),"'"&FRM_DS_GetValue(objData,"ImportMortLiabilityWinTxt")&"' window is displayed"

'intLiabilityIndex = GUI_List_GetRowIndex(objImportMortLiabilityWin,"Lien Holder",FRM_DS_GetValue(objData,"ImportMortLiabilityWinTxt"))
'GUI_List_SelectItem objImportMortLiabilityWin,FRM_DS_GetValue(objData,"LienHolder"),"Lien Holder"
GUI_SwfList_SetCheckbox objImportMortLiabilityWin.SwfListView("swfname:=liabListView"),"Mortgage",True    '@ remove Mortgage and pass variable nameto select 
GUI_SwfButton_Click objImportMortLiabilityWin.SwfButton("swfname:=okbtn")

GUI_Object_ValidateValue WebEdit("html id:=l_FM0019"),FormatNumber(FRM_DS_GetValue(objData,"FM0119_PresentMarketValue"),2),"FM0119_PresentMarketValue"

val=FRM_DS_GetValue(objData,"FM0128_SubjectProperty")
GUI_WebCheckBox_Set objQuickEntryPage.WebCheckBox("html id:=__cid_CheckBox.*_Ctrl","value:="&val),"ON"

GUI_Object_ValidateValue WebEdit("html id:=l_FM0017"),FormatNumber(FRM_DS_GetValue(objData,"FM0117_MortgageBalance"),2),"FM0117_MortgageBalance"
GUI_Object_ValidateValue WebEdit("html id:=l_FM0016"),FormatNumber(FRM_DS_GetValue(objData,"FM0116_MortgagePayment"),2),"FM0116_MortgagePayment"
GUI_WebList_Select WebList("html id:=DropdownBox3"),FRM_DS_GetValue(objData,"FM0141_Propertyisusedas"),"FM0141_Propertyisusedas"
GUI_List_TextExists objQuickEntryVOMWin.SwfObject("swfname:=gridList"),"Property Is",FRM_DS_GetValue(objData,"FM0141_Propertyisusedas")
GUI_SwfButton_Click objQuickEntryVOMWin.SwfButton("swfname:=btnClose")

BIZ_1003Page3_VerifyAssetsandLiabilities "Shared_LenderCreditForConstruction"

BIZ_Common_1003Page3_VerifyTransactionDetails obj1003Page3,"Shared_LenderCreditForConstruction"

BIZ_Common_1003Page3_SetDetailsTransaction obj1003Page3, "Shared_LenderCreditForConstruction"

'Step 7
Set obj2015Item = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "Shared_LenderCreditForConstruction"

BIZ_Common_2015Itemization_SetFeeDetails obj1003Paobj2015Itemge3,"804","Shared_LenderCreditForConstruction_804"
BIZ_Common_2015Itemization_SetFeeDetails obj2015Item,"805","Shared_LenderCreditForConstruction_805"
BIZ_Common_2015Itemization_SetFeeDetails obj2015Item,"806","Shared_LenderCreditForConstruction_806"
BIZ_Common_2015Itemization_SetFeeDetails obj2015Item,"807","Shared_LenderCreditForConstruction_807"
'BIZ_Common_2015Itemization_Set800Section obj1003Page3, "Shared_LenderCreditForConstruction"
BIZ_Common_2015Itemization_Set900Section obj2015Item,"Shared_LenderCreditForConstruction"
BIZ_Common_2015Itemization_Set1000Section obj2015Item,"Shared_LenderCreditForConstruction"
BIZ_Common_2015Itemization_VerifyClosingCostsSummary obj2015Item,"Shared_LenderCreditForConstruction"
BIZ_Common_2015Itemization_VerifyTotalEstimatedFunds obj2015Item,"Shared_LenderCreditForConstruction"



Function BIZ_2015Itemization_VerifyClosingCostsSummary(strRowID)

FRM_Logger_ReportInfoEvent "Verify Closing Costs Summary in 1400 Section", "Get data using Row Id '"&strRowID&"' in the Forms_2015Itemization datasheet", null
                
    Dim obj2015Item
   
    Set obj2015Item = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
                
                BIZ_Forms_Open "2015 Itemization"
                BIZ_Common_2015Itemization_VerifyClosingCostsSummary objParentObject,strRowID

                Set obj2015Item = Nothing

End Function



Function BIZ_Common_2015Itemization_VerifyClosingCostsSummary(objParentObject,strRowID)

FRM_Logger_ReportInfoEvent "Verify Closing Costs Summary in 1400 Section", "Get data using Row Id '"&strRowID&"' in the Forms_2015Itemization datasheet", null
                
    Dim objData
   
                Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "VerifyClosingCostsSummary", strRowID)
    
    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"LENPCC_TotLenPaidCC")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_LENPCC"),FormatNumber(FRM_DS_GetValue(objData,"LENPCC_TotLenPaidCC"),2),"Total Lender Paid CC"
    End If
   
    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"TNBPCC_TotNonBorrowerPaidCC")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_TNBPCC"),FormatNumber(FRM_DS_GetValue(objData,"LENPCC_TotLenPaidCC"),2),"Total Non Borrower Paid CC"
    End If
    
     If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"TotLenderCredit")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox649"),FormatNumber(FRM_DS_GetValue(objData,"TotLenderCredit"),2),"Total Lender Credit"
    End If
    
    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"TotClosingCosts")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_TOTPCC"),FRM_DS_GetValue(objData,"TotClosingCosts"),"TotalClosing Costs"
    End If
    
    Set objData    = Nothing

End Function



Function BIZ_2015Itemization_VerifyClosingCostsSummary(strRowID)

FRM_Logger_ReportInfoEvent "Verify Total Estimated Fundsin 1400 Section", "Get data using Row Id '"&strRowID&"' in the Forms_2015Itemization datasheet", null
                
    Dim obj2015Item
   
    Set obj2015Item = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
                
                BIZ_Forms_Open "2015 Itemization"
                BIZ_Common_2015Itemization_VerifyTotalEstimatedFunds objParentObject,strRowID

                Set obj2015Item = Nothing

End Function


Function BIZ_Common_2015Itemization_VerifyTotalEstimatedFunds(objParentObject,strRowID)

                FRM_Logger_ReportInfoEvent "Verify Closing Costs Summary in 1400 Section", "Get data using Row Id '"&strRowID&"' in the Forms_2015Itemization datasheet", null
                
    Dim objData
   
                Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "VerifyTotalEstimatedFunds", strRowID)
    
                If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"136_PurchasePrice")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_136"),FormatNumber(FRM_DS_GetValue(objData,"136_PurchasePrice"),2),"Purchase price"
    End If
    
                If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"1073_TotalCosts")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1073"),FRM_DS_GetValue(objData,"1073_TotalCosts"),"Total Costs"
    End If
                
                If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"141_LenderCredit")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_141"),FormatNumber(FRM_DS_GetValue(objData,"141_LenderCredit"),2),"Lender Credit"
    End If
    
    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"1852_CCPaidByBLO")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1852"),FormatNumber(FRM_DS_GetValue(objData,"1852_CCPaidByBLO"),2),"CC Paid By Borrower; Lender; Other"
    End If
    
    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"1844_TotalCredits")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1844"),FormatNumber(FRM_DS_GetValue(objData,"1844_TotalCredits"),2),"Total Credits"
    End If

    If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"142_CashFromBorrower")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_142"),FormatNumber(FRM_DS_GetValue(objData,"142_CashFromBorrower"),2),"Total Credits"
    End If
    
                Set objData = Nothing

End Function


BIZ_Forms_Open "Loan Estimate Page 1"

GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox73"),FRM_DS_GetValue(objData,"LE2.XLC_LenderCredits"),"LE2.XLC field 'LenderCredits'"

BIZ_Forms_Open "Closing Disclosure Page 1"

GUI_Object_ValidateValue objParentObject.WebEdit("html id:=TextBox90"),FRM_DS_GetValue(objData,"CD2.XSTLC_LenderCredits"),"CD2.XSTLC field 'LenderCredits'"


BIZ_Forms_Open "1003 Page 3"

Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "VerifyTotalEstimatedFunds", "Shared_LenderCreditForConstruction")


If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"1852_CCPaidByBLO")) Then
                GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1852"),FormatNumber(FRM_DS_GetValue(objData,"1852_CCPaidByBLO"),2),"CC Paid By Borrower; Lender; Other"
End If

 If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"1844_TotalCredits")) Then
                GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_1844"),FormatNumber(FRM_DS_GetValue(objData,"1844_TotalCredits"),2),"Total Credits"
End If

 If Util_String_IsNotEmpty(FRM_DS_GetValue(objData,"142_CashFromBorrower")) Then
                 GUI_Object_ValidateValue objParentObject.WebEdit("html id:=l_142"),FormatNumber(FRM_DS_GetValue(objData,"142_CashFromBorrower"),2),"Total Credits"
End If



BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
