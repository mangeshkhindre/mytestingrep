'@**************************************************************************************************
'@ TestStory: PTAC-2135 Lender Credit Calculation
'@ TestCase:
   '1 PTAC-1464 Verify the Lender credit for FHANocashoutRefinance type in 2015/LE/CD/1003 pages
   '2 PTAC-1455 Verify the Lender credit for Conventional Refinance type in 2015/LE/CD/1003 pages
'@ Test Automation JIRA Task: PTAC-2345 E2E_LenderCreditCalculation_NoCashOutRefi_CashOutRefi_2015Item_LECD_Validate
'@ TestData: 
   '1 Forms_1003Page1, 1003Page1 and 2345_LenderCreditForFHAandNoCaRefi
   '2 Forms_1003Page1, 1003Page1 and 2345_LenderCreditForConvandCaRefi
   '3 Forms_1003Page2, 1003Page2 and 2345_LenderCreditForFHAandNoCaRefi
   '4 Forms_1003Page2, 1003Page2 and 2345_LenderCreditForConvandCaRefi
   '5 Forms_1003Page3, 1003Page3 and 2345_LenderCreditForFHAandNoCaRefi
   '6 Forms_1003Page3, 1003Page3 and 2345_LenderCreditForConvandCaRefi
   '7 Forms_BorrowerSummaryOrigination, SetBorrower and 2345_LenderCreditForFHAandNoCaRefi
   '8 Forms_BorrowerSummaryOrigination, SetBorrower and 2345_LenderCreditForConvandCaRefi
   '9 Forms_BorrowerSummaryOrigination, SetProperty and 2345_LenderCreditForFHAandNoCaRefi
   '10 Forms_BorrowerSummaryOrigination, SetProperty and 2345_LenderCreditForConvandCaRefi
   '11 Forms_2015Itemization, Set800Section and 2345_LenderCreditForFHAandNoCaRefi
   '12 Forms_2015Itemization, Set800Section and 2345_LenderCreditForConvandCaRefi
   '13 Forms_2015Itemization, SetFeeDetails and 2345_LenderCreditForCoutandRefi_804
   '13 Forms_2015Itemization, SetFeeDetails and 2345_LenderCreditForCoutandRefi_805
   '15 Forms_2015Itemization, SetFeeDetails and 2345_LenderCreditForCoutandRefi_806
   '16 Forms_2015Itemization, SetFeeDetails and 2345_LenderCreditForCoutandRefi_807
   '18 Forms_2015Itemization, Set900Section and 2135_LenderCreditForConstandPur
   '19 Forms_2015Itemization, Set1000Section and 2135_LenderCreditForConstandPur
   '20 Forms_2015Itemization, VerifyTotalEstimatedFunds and 2135_LenderCreditForConstandPur
   '21 Forms_2015Itemization, VerifyClosingCostsSummary and 2135_LenderCreditForConstandPur
   '22 Forms_1003Page3, SetTransactionDetails and 2345_LenderCreditForConvandCaRefi
'@ Pre-conditions: 
'@ Description: Verify Lender credits in 2015 itemization,1003,LE and CD page for CashOutRefi,NoCashoutRefi Loan Purpose and Loan type FHA and Conv
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
   '7 The "Mortgage Balance(FM0117)" value as 250,000(Should be auto populated) and "Mortgage Payment(FM0116) value as 1500(Should be auto populated)
   '8 The Property Information will be auto populated and with "Present Market Value" as '800,000" to be auto populated.
   '9 The "Primary Residence" details should be displayed in the grid.
   '10 The Popup window should be closed, and below data should be displayed, Under Assets and Liabilities (continue) section,
	   'a Market Value(919)Should be auto populated)
	   'b Amount of Mtg(920)(Should be auto populated)
	   'c Mtg Payment(922)(Should be auto populated)
	   'd Purchase Price(136) (Under Details of Transaction section)
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

FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: PTAC-2345","Script Name: E2E_LenderCreditCalculation_NoCashOutRefi_CashOutRefi_2015Item_LECD_Validate", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Run Action to validate the Lender credits in 2015/LE/CD/1003 pages for Loan Type:FHA,PurposeOfLoan:No Cash Out Refinance======
FRM_Logger_ReportStepEvent "Start Test -PTAC-1464","Verify the Lender credit for FHANocashoutRefinance type in 2015/LE/CD/1003 pages", Null
RunAction "LenderCreditCalculation_LenderCredits_Verify", oneIteration, "2345_LenderCreditForFHAandNoCaRefi"

'====== Run Action to validate the Lender credits in 2015/LE/CD/1003 pages for Loan Type:Conventional,PurposeOfLoan:Cash Out Refinance ======
FRM_Logger_ReportStepEvent "Start Test -PTAC-1455","Verify the Lender credit for Conventional Refinance type in 2015/LE/CD/1003 pages", Null
RunAction "LenderCreditCalculation_LenderCredits_Verify", oneIteration, "2345_LenderCreditForConvandCaRefi"

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)