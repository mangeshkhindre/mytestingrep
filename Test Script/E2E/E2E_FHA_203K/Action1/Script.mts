

FRM_RT_SetupTest(null)

BIZ_Login_UserLogin "admin_default"

'======== Create new loan========
FRM_Logger_ReportInfoEvent "New Loan","Create New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"

'============= Swich to RESPA-TILA 2015 LE and CD form ==================
BIZ_Loan_SwitchFormVersion "RESPA-TILA 2015 LE and CD"

'======= Enter details in Borrower Summary - Origination form ================
BIZ_Forms_Open "Borrower Summary - Origination"

BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHA_203K_BorrowerInfo"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_FHA_203K_PropertyInfo"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_FHA_203K_TransactionDetails"

'=========== Enter details in 1003 Page 1 =================
BIZ_Forms_Open "1003 Page 1"
GUI_WebButton_Click SwfWindow("swfname:=Mainform").Page("micclass:=Page").WebButton("html id:=StandardButton2")
GUI_SwfEdit_Set SwfWindow("swfname:=Mainform").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateFundingTxt"), "1.75"
GUI_SwfEdit_Set SwfWindow("swfname:=Mainform").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateMI1Txt"), "0.8"
GUI_SwfEdit_Set SwfWindow("swfname:=Mainform").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=monthMI1Txt"), "360"
GUI_SwfEdit_Set SwfWindow("swfname:=Mainform").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateMICancelTxt"), "78.00"
GUI_SwfButton_Click SwfWindow("swfname:=Mainform").SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn")

'============== Enter details in FHA Management form ===============
BIZ_Forms_Open "FHA Management"
BIZ_FHAManagement_BasicInfo "E2E_FHA_203K_BasicInfo"
BIZ_FHAManagement_SetFHA203k "E2E_FHA_203K_FHAInfo"

Set objFHAManagementPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

dblSum1A = CDBL(objFHAManagementPage.WebEdit("html id:=TextBox1").GetROProperty("value")) + CDBL(objFHAManagementPage.WebEdit("html id:=l_max23kx19").GetROProperty("value"))_
+ CDBL(objFHAManagementPage.WebEdit("html id:=TextBox4").GetROProperty("value")) + CDBL(objFHAManagementPage.WebEdit("html id:=TextBox3").GetROProperty("value"))_
+ CDBL(objFHAManagementPage.WebEdit("html id:=TextBox6").GetROProperty("value")) + CDBL(objFHAManagementPage.WebEdit("html id:=TextBox5").GetROProperty("value"))_
+ CDBL(objFHAManagementPage.WebEdit("html id:=TextBox7").GetROProperty("value"))

dblSum1B = CDBL(objFHAManagementPage.WebEdit("html id:=TextBox12").GetROProperty("value"))

dblSum1C = CDBL(objFHAManagementPage.WebEdit("html id:=TextBox13").GetROProperty("value"))

dblSum1A1B1C = dblSum1A + dblSum1B + dblSum1C

If (dblSum1A1B1C * 0.015) > 350 Then
	FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=TextBox44").GetROProperty("value")), CDBL(dblSum1A * 1.5),"MAX23K.X44","Verify MAX23K.X44 field value"
Else
	FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=TextBox44").GetROProperty("value")), CDBL("350.00"),"MAX23K.X44","Verify MAX23K.X44 field value"
End If

FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=TextBox43").GetROProperty("value")),CDBL(objFHAManagementPage.WebEdit("html id:=TextBox8").GetROProperty("value")) * dblSum1A1B1C * 0.01, "MAX23K.X27","Verify MAX23K.X27 field value"

dblSumD1D2 = CDBL(objFHAManagementPage.WebEdit("html id:=l_X44").GetROProperty("value")) + CDBL(objFHAManagementPage.WebEdit("html id:=TextBox10").GetROProperty("value"))

FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=l_X82").GetROProperty("value")),dblSumD1D2, "MAX23K.X82","Verify MAX23K.X82 field value"
FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=l_MAX70").GetROProperty("value")), dblSum1A, "MAX23K.X70","Verify MAX23K.X70 field value"
FRM_VerifyEqual CDBL(objFHAManagementPage.WebEdit("html id:=TextBox15").GetROProperty("value")),dblSum1A1B1C + dblSumD1D2, "MAX23K.X83","Verify MAX23K.X83 field value"

dblSum2C = CDBL(objFHAManagementPage.WebEdit("html id:=l_X84").GetROProperty("value"))
dblSum2D= CDBL(objFHAManagementPage.WebEdit("html id:=TextBox18").GetROProperty("value"))

