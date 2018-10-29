'@**************************************************************************************************
 '@ TestStory: CTA-428 Lender Credit 
 '@ TestCase:    
    '1 CTA-242 HMDA -Verify Closing Cost section for Action(1393) = 1.Loan Originated and 6.Purchased Loan (18.1 release)
 '@ Test Automation JIRA Task: "CTA-429"- Dev Task For TestCase LC-Conventional Refinance
 '@ TestData: BIZ_1003Page1_SetData("FHANoCashOutRefi")
'@ TestData:BIZ_1003Page2_SetMonthlyIncomeExpensesData "LC_Conventional_Refinance"
'@ TestData:BIZ_1003Page2_SetLiabilities "LC_Conventional_Refinance"
'@ TestData:BIZ_BorrowerSummaryOrigination_SetProperty "LC_Conventional_Refinance"
'@ TestData:BIZ_Forms_Open "1003 Page 3"
'@ TestData:BIZ_VOM_SetNewLiabilities "LC_Conventional_Refinance"
'@ TestData:BIZ_2015Itemization_SetE2EBasicData "LC_Conventional_Refinance"
'@ TestData:BIZ_Common_2015Itemization_Set900Section SwfWindow("swfname:=MainForm").Page("index:=0"),"LC_Conventional_Refinance"
'@ TestData:BIZ_2015Itemization_Set800Section("LC_Conventional_Refinance")
'@ TestData:BIZ_2015Itemization_SetFeeDetails "804","LC_Conventional_Refinance_X1109"
'@ TestData:BIZ_2015Itemization_SetFeeDetails "805","LC_Conventional_Refinance_X1142"
'@ TestData:BIZ_2015Itemization_SetFeeDetails "806","LC_Conventional_Refinance_X1178"
'@ TestData:BIZ_2015Itemization_SetFeeDetails "807","LC_Conventional_Refinance_X1208__X1211"

 
'Entering the data on form 1003 Page1    

'1.LoanType(1172) :Conventional
'2.Lien Position(420):First
'3.Amortization type(608):Fixed Rate
'4.Loan Amount(1109):300,000
'5.Total Loan Amt:(2): 300,000
'6.Interest Rate(3):3.5%
'7.Term(4):360
'8.Due In(325): 360
'9.Address(11): 123 Main street
'10.City(12): Fremont
'11.State(14):CA
'12.Zip(15):94536
'13.County(13):Alameda
'14.No. units(16):1
'15.Year Built(18):1999
'16.Purpose Of loan(19): Cash-Out-Refi
'17.PropertywillBe(1811):Primary
'18.Borrower First Name(4000): LCRefinance
'19.BorrowerLAstName(4002):LCRefinance

'Entering the value on form 1003 Page2

'1.base(101): $5000
'2.Haz Ins(230):$55
'3.RE Tax(1405):$75
'4.LiabilityCompanyName(FL0102): Mortatge
'5.FL0108:Mortgage
'6.Balance(FL0113):250,000
'7.Payment(FL0111):1500
'8.MosLeft(FL0112):240
'9.paidOff(FL0118):Check
'10.LiabilityCompanyName(FL0202): StudentLoan
'11.FL0108:INstallment
'12.Balance(FL0213):30,000
'13.Payment(FL0211):550
'14.MosLeft(FL0212):120
'15.paidOff(FL0218):Check

'Entering data on form Boorower Summary-Origination
'1.Estimated Value(1821): 800,000
'2.Appraised Value(356): 800,000

'Entering data on form 1003 Page3
'Click on "Show All(VOM)" Button
'1.Click on new Verification Icon.
'2.Select Mortagage liability
'3.Click on Subject Property(FM0128) field.
'4.Property is used as(FM0141): Primary Resisdence.
'5.Close the window.
'4.Lender credit(141):1000
 '@ ExpectedResult:
'1.Address should be displayed.(FM0106)
'2.Present Market Value(FM0119):800000 (Should be autopopulated)
'3.Mortagage Balance(FM0117): 250,000(Should be autopopulated)
'4.Mortagage Payment(FM0116):1500(Should be autopopulated)
'5.Market Value(919):800,000(Should be autopopulated)
'6.Amount of Mtg(920):250,000(Should be autopopulated)
'7.Mtg Payment(922):1500(Should be autopopulated)
'8.Refinance(1092):280,0000

'2015 itemization entering form

'Our Origination Charge:
'1.Loan originzation Fees (388) : 1%
'2.ApplicaitonFees(L228):200
'3.Processing Fees(1621): 300
'4.Underwriting Fees(300): 999
'Lender Paid Originator Compensation
'5.Origination credit(NEWHUD.X1143):1%
'Originazation/Discount Point Adjustment
'6.Appraisal Fee(641):450(Click on fee details > enter Lender(NEWHUD2.X1109):450 and close)
'7.Credit Report(640): 50(Click on fee details > enter Lender(NEWHUD2.X1142):25 and close)
'8.Tax Service(336):50(Click on Fee details>enter Others(NEWHUD2.X1178):25 and close);SYS.X268:O
'8.Flood certifcation(NEWHUD.X400) :100 (Click on Fee details>enter Lender (NEWHUD2.X1208):25, Others(NEWHUD2.X1211):25 and close)
'Items Required By lender to be paid in Advance
'9.Daily Int charges(332) 10 days
'10.Homeowner Insurance(L251):1 mths
'11.Property Taxes(NEWHUD2.X4397): 1 mths
'12.Flood Insurance(NEWHUD2.X4399): 1 mths
'13.NewHUD2.X4400: 100
'Reserves Deposited with lender
'13.Homeowner's Ins(230):55
'14.Homeowners(1387):1 mths
'15.Property Taxes(231): 75
'16.Property Taxes(1386):1 mths
'@ ExpectedResult:
'Closing Costs Summary
'2.Total Lender Paid CC(LENPC):500
'3.Total Other Paid CC(OTHPCC): 50.00
'4.Total Non-borrower Paid CC(b)(TNBPCC): 550
'5.Total Lender Cerdit©(NEWHUD.X1149):3000
'6.Total Closing Cost(a+b):5,800.67
'7.Total Estimated Funds Needed to Close
'8.Refinance(1092):280,000
'9.Total Costs(1073): 285,300.67
'10.Lender credit(141):1000
'11.cc Paid by broker,lender and Other(1852): 2550
'12.Total Credits(1844):303,550
'13.Cash To Borrower(142):-18,249.33

'Loan Estimation Page 1
'@ ExpectedResult:
'Lender credits(LE2.XLC): 4000

'Closing Disclosure Page 1
'@ ExpectedResult:
'Lender Credits(CD2.XSTLC): 3500
 '**************************************************************************************************

FRM_Logger_ReportInfoEvent "Start Test Case: Lender Credit", "Script Name - CIBIZ_CTA_430_E2E_LC_Conventional_Refinance", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'====== Navigate to pipeline and create a new loan ======
FRM_Logger_ReportStepEvent "Start Test Case:LC-Conventional Refinance", "Lender Credit TestCase", Null
BIZ_Nav_SelectPipelineTab()

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

'====== Open the form 1003 page 1 and Entering the data ======
BIZ_Forms_Open "1003 Page 1"
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Open the form 1003 page 1 and Entering the data", Null
BIZ_1003Page1_SetData("LC_Conventional_Refinance")
wait(3)

'====== Open the form 1003 page 2 and Entering the data ======
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Open the form 1003 page 2 and Entering the data", Null
BIZ_1003Page2_SetMonthlyIncomeExpensesData "LC_Conventional_Refinance"

BIZ_1003Page2_SetLiabilities "LC_Conventional_Refinance"

'====== Open the form Borrower summary form and Entering the data ======
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Open the form Borrower summary form and Entering the data", Null
BIZ_BorrowerSummaryOrigination_SetProperty "LC_Conventional_Refinance"

'====== Open the form 1003 page 3 and Entering the data ======
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Open the form 1003 page 3 and Entering the data", Null
BIZ_Forms_Open "1003 Page 3"

'Define the parent object
Set objParentObject = SwfWindow("swfname:=MainForm")
'FRM_DS_GetTestData
'Define the page object
Set objPgeObject = objParentObject.Page("url:=.*Encompass.*")

objParentObject.WinEdit("regexpwndclass:=Edit","index:=0").HighLight
'Setting the value at 202 field as "Lender Credit"
GUI_WinEdit_Type objParentObject.WinEdit("regexpwndclass:=Edit","index:=0"),"Lender Credit"
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the value at 202 field as 'Lender Credit'", Null

'Set the value to filed 141 as 1000
GUI_WinEdit_Set objParentObject.Page("url:=.*Encompass.*").WebEdit("title:=141.*"),"1000"
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the value at 101 field as 1000", Null

'Clicking the VOM button to set the liabilities
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Clicking the VOM button to set the liabilities", Null
BIZ_VOM_SetNewLiabilities "LC_Conventional_Refinance"
wait(3)

'====== Open the 2015Itemization form and Entering the data ======
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Open the 2015Itemization form and Entering the data", Null
BIZ_2015Itemization_SetE2EBasicData "LC_Conventional_Refinance"

'setting the value for section 900
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "setting the value for section 900", Null
BIZ_Common_2015Itemization_Set900Section SwfWindow("swfname:=MainForm").Page("index:=0"),"LC_Conventional_Refinance"
wait(3)

'setting the value for section 800
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "setting the value for section 800", Null
BIZ_2015Itemization_Set800Section("LC_Conventional_Refinance")

'Entering the value at field number 804 which is  under section 800 ,function clicks on the left detail button to enter the value
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the data to field 804", Null
BIZ_2015Itemization_SetFeeDetails "804","LC_Conventional_Refinance_X1109"

'Entering the value at field number 805 which is  under section 800 ,function clicks on the left detail button to enter the value
BIZ_2015Itemization_SetFeeDetails "805","LC_Conventional_Refinance_X1142"
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the data to field 805", Null

'Entering the value at field number 806 which is  under section 800 ,function clicks on the left detail button to enter the value
BIZ_2015Itemization_SetFeeDetails "806","LC_Conventional_Refinance_X1178"
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the data to field 806", Null

'Entering the value at field number 807 which is  under section 800 ,function clicks on the left detail button to enter the value
BIZ_2015Itemization_SetFeeDetails "807","LC_Conventional_Refinance_X1208__X1211"
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Entering the data to field 807", Null

'All Validation started by pagewise
FRM_Logger_ReportInfoEvent "Test Case:LC-Conventional Refinance", "Validation of auto populated data started by pagewise", Null

'Validation on 1003 page
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "First validation started for Form 1003 Page 3", Null

BIZ_Forms_Open "1003 Page 3"

Set objData1 = FRM_DS_GetTestData("FiledValidation", "Auto_Populated", "LC_Conventional_Refinance")

'Object of field "Market Value(919)" and value should display 800,000(Should be autopopulated)
Set ObjMarketValue919= objPgeObject.WebEdit("html id:=l_919")

BoolValue = GUI_ValidateValueOfObject(ObjMarketValue919, FRM_DS_GetValue(objData1, "Field_919"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Market Value(919)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Market Value(919)' has  NOT validated", Null	
End If

'Object of field "Amount of Mtg(920)" and value should display 250,000(Should be autopopulated)
Set ObjAmountOfMtg920= objPgeObject.WebEdit("html id:=l_920")

BoolValue = GUI_ValidateValueOfObject(ObjAmountOfMtg920,FRM_DS_GetValue(objData1, "Field_920"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Amount of Mtg(920)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Amount of Mtg(920)' has  NOT validated", Null	
End If

'Object of field "Mtg Payment(922)" and value should display 1500(Should be autopopulated)
Set ObjMtgPaymnt922= objPgeObject.WebEdit("html id:=l_922")

BoolValue = GUI_ValidateValueOfObject(ObjMtgPaymnt922,FRM_DS_GetValue(objData1, "Field_922"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Mtg Payment(922)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Mtg Payment(922)' has  NOT validated", Null	
End If

'Object of field "Refinance(1092)" and value should display 280,0000(Should be autopopulated)
Set ObjRefinance1092= objPgeObject.WebEdit("html id:=l_1092")

BoolValue = GUI_ValidateValueOfObject(ObjRefinance1092,FRM_DS_GetValue(objData1, "Field_1092"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Refinance(1092)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Refinance(1092)' has  NOT validated", Null	
End If


'Object of field "cc Paid by broker,lender and Other(1852)" and value should display 2550(Should be autopopulated)
Set ObjPaidby1852= objPgeObject.WebEdit("html id:=l_1852")

BoolValue = GUI_ValidateValueOfObject(ObjPaidby1852,FRM_DS_GetValue(objData1, "Field_1852"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'cc Paid by broker,lender and Other(1852)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'cc Paid by broker,lender and Other(1852)' has  NOT validated", Null	
End If

'Object of field "Total Credits(1844)" and value should display 303,550(Should be autopopulated)
Set ObjTotalCredits1844= objPgeObject.WebEdit("html id:=l_1844")

BoolValue = GUI_ValidateValueOfObject(ObjTotalCredits1844,FRM_DS_GetValue(objData1, "Field_1844"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Credits(1844)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Credits(1844)' has  NOT validated", Null	
End If

wait(4)
'Object of field "Cash To Borrower(142)" and value should display -18,249.33(Should be autopopulated)
Set ObjCashToBrwr= objPgeObject.WebEdit("html id:=l_142")

BoolValue = GUI_ValidateValueOfObject(ObjCashToBrwr,FRM_DS_GetValue(objData1, "Field_142"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Cash To Borrower(142)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Cash To Borrower(142)' has  NOT validated", Null	
End If

'Second Validation on VOM form

'Opening the VOM form
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Second validation started for Form VOM", Null
BIZ_Forms_Open "VOM"

'Object of field "Address(FM0106)" and value should display Ferom(Should be autopopulated)
Set ObjCityFM0106= objPgeObject.WebEdit("html id:=l_FM0006")

BoolValue = GUI_ValidateValueOfObject(ObjCityFM0106,FRM_DS_GetValue(objData1, "FM0106"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Address(FM0106)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Address(FM0106)' has  NOT validated", Null	
End If

'Object of field "Present Market Value(FM0119)" and value should display 800000 (Should be autopopulated)
Set ObjPrsntValuMrktValueFM0119= objPgeObject.WebEdit("html id:=l_FM0019")

BoolValue = GUI_ValidateValueOfObject(ObjPrsntValuMrktValueFM0119,FRM_DS_GetValue(objData1, "FM0119"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Present Market Value(FM0119)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Present Market Value(FM0119)' has  NOT validated", Null	
End If

'Object of field "Mortagage Balance(FM0117)" and value should display 250,000(Should be autopopulated)
Set ObjMrtgBlncFM0117= objPgeObject.WebEdit("html id:=l_FM0017")

BoolValue = GUI_ValidateValueOfObject(ObjMrtgBlncFM0117,FRM_DS_GetValue(objData1, "FM0117"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Mortagage Balance(FM0117)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Mortagage Balance(FM0117)' has  NOT validated", Null	
End If

'Object of field "Mortagage Payment(FM0116)" and value should display 1500(Should be autopopulated)
Set ObjMrtgPymntFM0116= objPgeObject.WebEdit("html id:=l_FM0016")

BoolValue = GUI_ValidateValueOfObject(ObjMrtgPymntFM0116,FRM_DS_GetValue(objData1, "FM0116"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Mortagage Payment(FM0116)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Mortagage Payment(FM0116)' has  NOT validated", Null	
End If

'Opening the 2015 Itemization form for validation

FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Third validation started for Form 2015 Itemization", Null
BIZ_Forms_Open "2015 Itemization"

wait(9)

'Object of field "Total Lender Paid CC(LENPCC)" and value should display 500(Should be autopopulated)
Set ObjTotalLenderPaidCC_LENPC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_LENPCC")

BoolValue = GUI_ValidateValueOfObject(ObjTotalLenderPaidCC_LENPC,FRM_DS_GetValue(objData1, "LENPCC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Lender Paid CC(LENPCC)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Lender Paid CC(LENPCC)' has  NOT validated", Null	
End If


'Object of field "Refinance(1092)" and value should display 280,000(Should be autopopulated)
Set ObjRefinance1092= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_1092")

BoolValue = GUI_ValidateValueOfObject(ObjRefinance1092,FRM_DS_GetValue(objData1, "Field_1092"))
'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Refinance(1092)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Refinance(1092)' has  NOT validated", Null	
End If

'Object of field "Total Other Paid CC(OTHPCC)" and value should display 50.00(Should be autopopulated)
Set ObjotalOthrPaidCC_OTHPCC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_OTHPCC")

BoolValue = GUI_ValidateValueOfObject(ObjotalOthrPaidCC_OTHPCC,FRM_DS_GetValue(objData1, "OTHPCC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Other Paid CC(OTHPCC)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Other Paid CC(OTHPCC)' has  NOT validated", Null	
End If

'Object of field "Total Non-borrower Paid CC(b)(TNBPCC)" and value should display 500(Should be autopopulated)
Set ObjTotalNonBrwrPaidCC_TNBPCC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_TNBPCC")

BoolValue = GUI_ValidateValueOfObject(ObjTotalNonBrwrPaidCC_TNBPCC,FRM_DS_GetValue(objData1, "TNBPCC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Non-borrower Paid CC(b)(TNBPCC)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Non-borrower Paid CC(b)(TNBPCC)' has  NOT validated", Null	
End If

'Object of field "Total Lender Cerdit©(NEWHUD.X1149)" and value should display 3000(Should be autopopulated)
Set ObjTotalLndrCerdit_NEWHUD_X1149= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox649")

BoolValue = GUI_ValidateValueOfObject(ObjTotalLndrCerdit_NEWHUD_X1149,FRM_DS_GetValue(objData1, "NEWHUD.X1149"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Lender Cerdit©(NEWHUD.X1149)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Lender Cerdit©(NEWHUD.X1149)' has  NOT validated", Null	
End If

'Object of field "Total Closing Cost(a+b)" and value should display 5,800.67(Should be autopopulated)
Set ObjTotlClsingCst_TOTPCC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_TOTPCC")

BoolValue = GUI_ValidateValueOfObject(ObjTotlClsingCst_TOTPCC,FRM_DS_GetValue(objData1, "TOTPCC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Closing Cost(a+b)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Closing Cost(a+b)' has  NOT validated", Null	
End If

'Object of field "Total Costs(1073)" and value should display 285,300.67(Should be autopopulated)
Set ObjTotalCosts1073= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_1073")

BoolValue = GUI_ValidateValueOfObject(ObjTotalCosts1073,FRM_DS_GetValue(objData1, "Field_1073"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Costs(1073)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Costs(1073)' has  NOT validated", Null	
End If

'Object of field "cc Paid by broker,lender and Other(1852)" and value should display 2550(Should be autopopulated)
Set ObjPaidby1852= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_1852")

BoolValue = GUI_ValidateValueOfObject(ObjPaidby1852,FRM_DS_GetValue(objData1, "Field_1852"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'cc Paid by broker,lender and Other(1852)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'cc Paid by broker,lender and Other(1852)' has  NOT validated", Null	
End If

'Object of field "Total Credits(1844)" and value should display 303,550(Should be autopopulated)
Set ObjTotalCredits1844= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_1844")

BoolValue = GUI_ValidateValueOfObject(ObjTotalCredits1844,FRM_DS_GetValue(objData1, "Field_1844"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Total Credits(1844)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Total Credits(1844)' has  NOT validated", Null	
End If

'Object of field "Cash To Borrower(142)" and value should display -18,249.33(Should be autopopulated)
Set ObjCashToBrwr= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_142")

BoolValue = GUI_ValidateValueOfObject(ObjCashToBrwr,FRM_DS_GetValue(objData1, "Field_142"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Cash To Borrower(142)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Cash To Borrower(142)' has  NOT validated", Null	
End If

'Open the Closing Disclosure 1 for validation
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Fourth validation started for Form Closing Disclosure Page 1", Null
BIZ_Forms_Open "Closing Disclosure Page 1"

'Object of field "Lender Credits(CD2.XSTLC)" and value should display 3500(Should be autopopulated)
Set ObjLenderCredits_CD2_XSTLC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox90")

BoolValue = GUI_ValidateValueOfObject(ObjLenderCredits_CD2_XSTLC,FRM_DS_GetValue(objData1, "CD2.XSTLC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Lender Credits(CD2.XSTLC)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Lender Credits(CD2.XSTLC)' has  NOT validated", Null	
End If

'Open the Loan Disclosure 1 for validation

BIZ_Forms_Open "Loan Estimate Page 1"
FRM_Logger_ReportStepEvent "Test Case:LC-Conventional Refinance", "Fifth validation started for Form Loan Disclosure 1", Null
'Object of field "Lender credits(LE2.XLC)" and value should display 4000(Should be autopopulated)
Set ObjLenderCredits_LE2_XLC= SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=TextBox73")

BoolValue = GUI_ValidateValueOfObject(ObjLenderCredits_LE2_XLC,FRM_DS_GetValue(objData1, "LE2.XLSC"))

'Below code is to verify the compariosn of Actual and Expected value and log the same in report
If BoolValue Then
FRM_Logger_ReportPassEvent "Test Case:LC-Conventional Refinance", "Field 'Lender credits(LE2.XLC)' has been validated successfully", Null
Else
FRM_Logger_ReportFailEvent "Test Case:LC-Conventional Refinance", "Field 'Lender credits(LE2.XLC)' has  NOT validated", Null	
End If


