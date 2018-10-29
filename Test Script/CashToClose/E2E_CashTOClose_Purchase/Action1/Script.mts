'@******************************************************************************************
'@ TestStory: 
		'CTA-405:Validate 'Cash To close' Purchase entry
'@ TestCase: 
		'i) Enter the basic data within: "Borrower Summary-Origination"
		'ii) Enter the Disbursement date and First payment date in RegZ CD
		'iii) Enter the Closing date within 'CD Page 1'
		'iv) Enter the Late fee and alternate check in LE Page 2 and 3
		'v) Within CD page 2 and 3 validate Total Cost Entries
		'vi) Disclose "LE" and "CD"
		'vii) Within "Fee Variance" worksheet validate the value for FV.X340,FV.X341,FV.X342,FV.X343
		'viii) Go To "2015 Itemization" page and modify the Appraisal fee and Credit report
		'ix) Validate Fee Variance Worksheet and Disclosure Tracking Entries

				'◦Expected results: 
				'iv)->'Within "CD page 2" Total Borrower paid should be "530"
						'Within "CD page 3" Total Closing Cost should be"530", Total payOffs and payments should be "0.00", Cash to close
						' should be "199,470" and CD3.X92 ahould be "To Borrower"
				'vi)-> Within "Fee Variance Worksheet" FV.X49=530
							'FV.X52=0,IntialLE(FV.X341)=530,LE Baseline(FV.X342)= 530,CD Baseline(FV.X343)=530,Itemization(FV.X344)=530,Itemization(FV.X340)=530						
				'ix) -> Within "2015 Itemization" Total Closing Cost(TOTPCC)=630, 
						' Within CD page 2 Total Borrower paid(CD2.XSTJ)=630
						'Within CD page 3 Total Closing Cost(CD3.X82)=630, Closing Costs Paid Before Closing(CD3.X83)=30, Total Payoffs and payment(CD3.X90)=0
							'CashToClose(CD3.X91)=199,470
				 'x) -> Within "Fee Variance Sheet" IntialLE(FV.X341)=530, LE Baseline(FV.X342)= 530, CD Baseline(FV.X343)=530, Itemization(FV.X344)=530
						'Itemization(FV.X340)=630, FV.X347=100
						'Within "Disclosure Tracking" sheet validate Verify cashTo close(CD3.X91)=199,470, cashTo close(CD3.X85)=199,400,CD3.X118= NO
						'CD3.X119=YES,CD3.X120=YES,CD3.X121=NO
'@ Test Automation JIRA Task: 
		'CTA-405
'*********************************************************************************************************************
FRM_RT_SetupTest(null)
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'=====================Select Pipeline View and Create a new blank loan====================
 BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"


'=====================Set the Generic Encompass page for subsequent use====================
 Set objSummaryPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0") 

'=====================Set the Borrower Summary Origination Details====================
 BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CashTOClose_Purchase"
  
 BIZ_Common_BorrowerSummaryOrigination_SetProperty objSummaryPage, "E2E_CashTOClose_Purchase"
 
 BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails objSummaryPage,"E2E_CashTOClose_Purchase"
 
 
 '=====================Set the Details for RegZ CD====================
 
 BIZ_RegZ_CD_SetData "E2E_CashTOClose_Purchase"
 BIZ_RegZ_CD_SetLoanInformation "E2E_CashTOClose_Purchase"
 BIZ_RegZ_CD_SetConstructionMortgage "E2E_CashTOClose_Purchase"

 '=====================Set the Details for CD Page 1====================
 BIZ_ClosingDisclosurePage1_SetClosingInformation "E2E_CashTOClose_Purchase"
 
  
 '=====================Set the Details for LE Page====================

 BIZ_LoanEstimatePage3_SetComparisons "E2E_CashTOClose_Purchase"
 BIZ_LoanEstimate_CheckUseAlternate ()
 
  '=====================Set the Details for 2015 Itemization  Page====================
 BIZ_2015Itemization_SetE2EBasicData "E2E_CashTOClose_Purchase"
 
     
 '=====================Enter the date for "Interest From" as it is shown in "Interest To"====================
 
 GUI_WebEdit_Set objSummaryPage.WebEdit("html id:=l_L244"), GUI_Object_GetPropertyValue (objSummaryPage.WebEdit("html id:=l_L245"),"value")
 
  '=====================Verify the details in CD page 2 and 3====================
  
 
 '=====================Save the Loan and capture the Loan Number for subsequent validations====================
 BIZ_Loan_Save()
   
 BIZ_2015Itemization_VerifyClosingCostsSummary "E2E_CashTOClose_Purchase"
 BIZ_ClosingDisclosurePage2_VerifyTotalBorPaid "E2E_CashTOClose_Purchase"
 BIZ_ClosingDisclosurePage3_VerTotalPayOffPmnt "E2E_CashTOClose_Purchase"
 
   '=====================Navigate to the Disc Tracking Tools and Disclose LE and CD====================
  BIZ_SecondaryMarket_ToolsNavigation "Disclosure Tracking"
 
 BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
 BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
 
  '=====================Navigate to Fee variance and validate the values ====================
 BIZ_SecondaryMarket_ToolsNavigation "Fee Variance Worksheet"
 BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "E2E_CashTOClose_Purchase"
 BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "E2E_CashTOClose_Purchase"
 
  '=====================Navigate to 2015 Itemization and enter the details ====================
 BIZ_2015Itemization_SetE2EBasicData "E2E_CashTOClose_Purchase_Itr1"
 BIZ_2015Itemization_NewHUD2X1134 "E2E_CashTOClose_Purchase_Itr1"
 

 '=====================Save the Loan and capture the Loan Number for subsequent validations====================
 BIZ_Loan_Save()
	
 strLoanNo = BIZ_Loan_GetLoanNumber()
 '=====================Validate the details in 2015 itemization and CD page 2 and 3====================
 
 BIZ_2015Itemization_VerifyClosingCostsSummary "E2E_CashTOClose_Purchase_Itr1"
 
 BIZ_ClosingDisclosurePage2_VerifyTotalBorPaid "E2E_CashTOClose_Purchase_Itr1"
 
 BIZ_ClosingDisclosurePage3_VerTotalPayOffPmnt "E2E_CashTOClose_Purchase_Itr1"
   
 
  '=====================Validate the details in Fee variance sheet====================
 BIZ_SecondaryMarket_ToolsNavigation "Fee Variance Worksheet"
 BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "E2E_CashTOClose_Purchase_Itr1"
'=====================Redisclose the disclosure ====================
 BIZ_SecondaryMarket_ToolsNavigation "Disclosure Tracking"
 BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
 BIZ_DisclosureTrackingTool_ClickRecord "Disclosure Type", "Revised", "Double"
 BIZ_DisclosureTrackingTool_OpenSnapShot ("CD")
 Verify_CDSnapshot_CashToClose_Pur "E2E_CashTOClose_Purchase_Itr1"

 '===========Exit from loan===================
BIZ_Loan_Exit(False)


'=======================Logout of Application========================
BIZ_Login_UserLogout

FRM_RT_TeardownTest(null)



