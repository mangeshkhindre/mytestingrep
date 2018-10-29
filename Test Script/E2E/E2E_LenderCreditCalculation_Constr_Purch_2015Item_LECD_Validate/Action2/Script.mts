'@**************************************************************************************************
'@ TestStory: PTAC-2135
'@ TestCase:
   '1 PTAC-1472 Verify the Lender credit for Construction type in 2015/LE/CD/1003 pages
   '2 PTAC-1471 Verify the Lender credit for VA Purchase type in 2015/LE/CD/1003 pages
   '3 PTAC-1459 Verify the Lender credit for Conventional Purchase type in 2015/LE/CD/1003 pages
'@ Test Automation JIRA Task: PTAC-2178 E2E_LenderCreditCalculation_ConstrandPurch_2015Item_LECD1003
'@ TestData: 
   '1 Forms_1003Page1, 1003Page1 and 2135_LenderCreditForConstandPur
   '2 Forms_1003Page1, 1003Page1 and 2135_LenderCreditForConstandPur
   '3 Forms_1003Page1, 1003Page1 and 2135_LenderCreditForConstandPur
   '4 Forms_BorrowerSummaryOrigination, SetBorrower and 2135_LenderCreditForConstandPur
   '5 Forms_BorrowerSummaryOrigination, SetProperty and 2135_LenderCreditForConstandPur
   '6 Forms_1003page, 1003Page1 and 2135_LenderCredit_ConvandConst
   '7 Forms_1003page, 1003Page1 and 2135_LenderCredit_VAandPur
   '8 Forms_1003page, 1003Page1 and 2135_LenderCredit_ConvandPur
   '9 Forms_2015Itemization, Set800Section and 135_LenderCreditForConstandPur
   '10 Forms_2015Itemization, SetFeeDetails and 135_LenderCreditForConstandPur_804
   '11 Forms_2015Itemization, SetFeeDetails and 135_LenderCreditForConstandPur_805
   '12 Forms_2015Itemization, SetFeeDetails and 135_LenderCreditForConstandPur_806
   '13 Forms_2015Itemization, SetFeeDetails and 135_LenderCreditForConstandPur_807
   '14 Forms_1003page, 1003Page3 and 2135_LenderCreditForConstandPur
   '15 Forms_2015Itemization, Set900Section and 2135_LenderCreditForConstandPur
   '16 Forms_2015Itemization, Set1000Section and 2135_LenderCreditForConstandPur
   '17 Forms_2015Itemization, VerifyTotalEstimatedFunds and 2135_LenderCreditForConstandPur
   '18 Forms_2015Itemization, VerifyClosingCostsSummary and 2135_LenderCreditForConstandPur
'@ Pre-conditions: 
'@ Description: Verify Lender credits in 2015 itemizatuion,1003,lLEand Cd page for Contsruction,Purchane Laon Purpose and Loan type VA and Conv
'@ TestSteps:
   '1 Login to Encompass with admin
   '2 Navigate to  1003 Page1, fill the details mentioned in test data, save
   '3 Navigate to 1003 Page2, fill the details mentioned in test data, save
   '4 Navigate to Borrower Origination Summary form, fill the details mentioned in test data, save
   '5 Navigate to 1003 Page3, and click on Show All(VOM) button.
   '6 Click on new Verification Icon.
   '7 Select Mortgage liability,click on OK button and close the pop up
   '8 In "Quick Entry,VOM" window, verify
   '9 In "Quick Entry, VOM" window,  Click on Subject Property(FM0128) field.
  '10 For "Property is used as(FM0141)" field, select the "Primary Residence" drop down value.
  '11 Close the "Quick Entry-VOM" window and verify the values
  '12 In Details of Transaction section, in 'L' drop down field, choose the"Lender credit" and enter the '1000'(F141) value,save and verify
  '13 Navigate to 2015 Itemization form, fill the details mentioned in test data, verify the 'Closing Costs Summary' section and 'Total Estimated funds needed to close' section in 2015 Itemization form.
  '14 Go to 'Loan Estimate Page 1'> Costs at Closing section, verify the 'Lender Credits'
  '15 Go to 'Closing Disclosure Page 1'> Costs at Closing section, verify the 'Lender Credits'
  '16 Go to 1003 Page 3, verify the Details of transaction section
'@ ExpectedResult:
   '1 User should be logged to Encompass successfully
   '2 The data to be saved with loan number
   '3 The data should be saved.
   '4 It should display the "Quick Entry-VOM" pop up window
   '5 It displays the 'Import Mortgage From Liability" pop up window
   '6 The data to be selected, and pop up to be closed.
   '7 The "Mortgage Balance(FM0117)" value as (Should be auto populated) and "Mortgage Payment(FM0116) value as (Should be auto populated)
   '8 The Property Information will be auto populated and with "Present Market Value" as '800,000" to be auto populated.
   '9 The "Primary Residence" details should be displayed in the grid.
   '10 The Popup window should be closed, and below data should be displayed, Under Assets and Liabilities (continue) section,
	   'a Market Value(919):(Should be auto populated)
	   'b Amount of Mtg(920):Should be auto populated)
	   'c Mtg Payment(922):(Should be auto populated)
	   'd Purchase Price(136): (Under Details of Transaction section)
   '11 The data to be entered
   '12 In "Closing Costs Summary", below field values to be displayed,
	   'Total Lender Paid CC(LENPCC)
	   'Total Non-borrower Paid CC(b)(TNBPCC)
	   'Total Lender Cerdit©(NEWHUD.X1149)
	   'Total Closing Cost(a+b)
	'13 In "Total Estimated Funds Needed to Close" section, below field values to be displayed,
	   'Purchase(136)
	   'Total Costs
       'Lender credit(141)
	   'cc Paid by broker,lender and Other(1852)
	   'Total Credits(1844)
       'Cash from Borrower(142)
 	'14 It should display as, Lender credits(LE2.XLC)
 	'15 It should display as, Lender Credits(CD2.XSTLC)
 	'16 It should display as
	   'CC paid by broker,Lender,Oth(1852)
	   'Total Credits(1844)
	   'Cash from borrower
'***************************************************************************************************

'====== Go to PipeLine>>Create Loan =====
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","My Pipeline"
BIZ_1003Page1_SetData "2135_LenderCreditForConstandPur"
BIZ_Loan_Save()
BIZ_1003Page2_SetMonthlyIncomeExpensesData "2135_LenderCreditForConstandPur"
BIZ_1003Page2_SetLiabilities "2135_LenderCreditForConstandPur"
BIZ_Loan_Save()
BIZ_BorrowerSummaryOrigination_SetBorrower "2135_LenderCreditForConstandPur"
BIZ_BorrowerSummaryOrigination_SetProperty "2135_LenderCreditForConstandPur"
BIZ_Loan_Save()

Dim strRowID, objPage, objDataInput,objData, strval
strRowID  = "2135_LenderCreditForConstandPur"

'Set LoanType and Purpose Of Loan in 1003  Page 1
BIZ_Forms_Open "1003 Page 1"
Set objPage      = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
Set objDataInput = FRM_DS_GetTestData("Forms_1003page", "1003Page1", Parameter("strInputRowID"))

strval = FRM_DS_GetValue(objDataInput, "1172_LoanType")
If UTIL_String_IsNotEmpty(strval) Then	
   GUI_WebCheckBox_Set objPage.WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&strval), "ON"
   FRM_Logger_ReportInfoEvent "LoanType selection","Loan Type selected as " &strval,Null
End If 

strval = FRM_DS_GetValue(objDataInput, "19_PurposeOfLoan")
If UTIL_String_IsNotEmpty(strval) Then	
   GUI_WebCheckBox_Set objPage.WebCheckbox("html id:=__cid_CheckBox.*_Ctrl", "value:="&strval), "ON"
   FRM_Logger_ReportInfoEvent "LoanPurpose selection","Loan Purpose selected as " &strval,Null
End If 

'Validate the VOM details in 1003 page 3
LenderCreditCalculation_1003Page3_VOMDetails_Validate strRowID

'Validate the Lender Credits in 2015 Itemization Page
BIZ_2015Itemization_Set800Section strRowID
BIZ_2015Itemization_SetFeeDetails "804","2135_LenderCreditForConstandPur_804"
BIZ_2015Itemization_SetFeeDetails "805","2135_LenderCreditForConstandPur_805"
BIZ_2015Itemization_SetFeeDetails "806","2135_LenderCreditForConstandPur_806"
BIZ_2015Itemization_SetFeeDetails "807","2135_LenderCreditForConstandPur_807"
BIZ_Common_2015Itemization_Set900Section objPage,strRowID
BIZ_Common_2015Itemization_Set1000Section objPage,strRowID
BIZ_2015Itemization_VerifyClosingCostsSummary strRowID
BIZ_2015Itemization_VerifyTotalEstimatedFunds strRowID

'Validate the Lender Credits in LE and CD Page
Set objData = FRM_DS_GetTestData("Forms_1003page", "1003Page3", strRowID)
BIZ_Forms_Open "Loan Estimate Page 1"
Wait g_LongWaitLarge
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox73"),FRM_DS_GetValue(objData,"LE2.XLC_LenderCredits"),"LE2.XLC Lender Credits "
BIZ_Forms_Open "Closing Disclosure Page 1"
Wait g_LongWaitLarge
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox90"),FRM_DS_GetValue(objData,"CD2.XSTLC_LenderCredits"),"CD2.XSTLC Lender Credits"

'Validate the Lender Credits in 1003 Page
BIZ_Forms_Open "1003 Page 3"
Wait g_LongWaitLarge
GUI_Object_ValidateValue objPage.WebEdit("html id:=l_1852"),FRM_DS_GetValue(objData, "1852_CCPaidbyLenderBroker"), "F1852 CCPaidbyLenderBroker"
GUI_Object_ValidateValue objPage.WebEdit("html id:=l_1844"),FRM_DS_GetValue(objData, "1844_TotalCredits"), "F1844 TotalCredits"
GUI_Object_ValidateValue objPage.WebEdit("html id:=l_142"),FRM_DS_GetValue(objData, "142_CashFromBorrower"), "F142 CashFromBorrower"

Set objPage      = Nothing
Set objData 	 = Nothing
Set objDataInput = Nothing

'Exit Loan 
BIZ_Loan_SaveLoanNumber()
strLoanNumber=BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit True

'Navigate to Pipeline and delete Loan number
BIZ_Loan_SearchLoanByColumnValueDisplayLoanInGrid "Loan Number", strLoanNumber
BIZ_Loan_DeleteLoan()
