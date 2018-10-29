'@******************************************************************************************
'@ TestStory: 
		'CTA-404:Validate 'Cash To close' Refinance entry
'@ TestCase: 
		'i) Enter the basic data within: "Borrower Summary-Origination"
		'ii) Enter the Liabilities information with 1003 Page 2
		'iii) Enter the Loan Information and Construction Mortgage information within 'RegZ CD'
		'iv) Enter the Closing date within 'CD Page 1'
		'v) Enter the Late fee and alternate check in LE Page 2 and 3
		'vi) Within "2015 Itemization" page enter the appraisal fee(641) and Credit Report(640)
		'vii) Disclose "LE" and "CD"
		'viii) Within "Fee Variance" worksheet validate the value for FV.X340,FV.X341,FV.X342,FV.X343
		'ix) Go To "2015 Itemization" page and modify the Appraisal fee and Credit report
		'x) Change the Bance in VOL page as 192,000

				'◦Expected results: 
				'vi)-> Within "2015 Itemization" page Total Closing Cost should be "530" and Cash to borrower should be "-8470"
						'Within "CD page 2" Total Borrower paid should be "530"
						'Within "CD page 3" Total Closing Cost should be"530", Total payOffs and payments should be "191000", Cash to close
						' should be "8470" and CD3.X92 ahould be "To Borrower"
				'viii)-> Within "Fee Variance Worksheet" FV.X49=530
							'FV.X52=0,IntialLE(FV.X341)=530,LE Baseline(FV.X342)= 530,CD Baseline(FV.X343)=530,Itemization(FV.X344)=530,Itemization(FV.X340)=530						
				'ix) -> Within "2015 Itemization" Total Closing Cost(TOTPCC)=630, Cash To borrower(142)= - 7400
						' Within CD page 2 Total Borrower paid(CD2.XSTJ)=630
						'Within CD page 3 Total Closing Cost(CD3.X82)=630, Closing Costs Paid Before Closing(CD3.X83)=30, Total Payoffs and payment(CD3.X90)=192,000
							'CashToClose(CD3.X91)=7400
				 'x) -> Within "Fee Variance Sheet" IntialLE(FV.X341)=530, LE Baseline(FV.X342)= 530, CD Baseline(FV.X343)=530, Itemization(FV.X344)=530
						'Itemization(FV.X340)=630, FV.X347=100
						'Within "Disclosure Tracking" sheet validate Verify cashTo close(CD3.X91)=8470, cashTo close(CD3.X85)=7400,CD3.X118= NO
						'CD3.X119=YES,CD3.X120=YES,CD3.X121=YES
'@ Test Automation JIRA Task: 
		'CTA-404
'*********************************************************************************************************************
FRM_RT_SetupTest(null)
'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'=====================Select Pipeline View and Create a new blank loan====================
 BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"


'=====================Set the Generic Encompass page for subsequent use====================
 Set objSummaryPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0") 

'=====================Set the Borrower Summary Origination Details====================
 BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_CashTOClose_Refinance"
  
 BIZ_Common_BorrowerSummaryOrigination_SetProperty objSummaryPage, "E2E_CashTOClose_Refinance"
 
 BIZ_Common_BorrowerSummaryOrigination_SetTransactionDetails objSummaryPage,"E2E_CashTOClose_Refinance"
 
 '=====================Set the Details for 1003 page 2====================
 
 BIZ_1003Page2_SetLiabilities "E2E_CashTOClose_Refinance"
 
 '=====================Set the Details for RegZ CD====================
 
 BIZ_RegZ_CD_SetData "E2E_CashTOClose_Refinance"
 
 BIZ_RegZ_CD_SetLoanInformation "E2E_CashTOClose_Refinance"
 
 
 '=====================Set the Details for CD Page 1====================
 BIZ_ClosingDisclosurePage1_SetClosingInformation "E2E_CashTOClose_Refinance"
 
  
 '=====================Set the Details for LE Page====================
 BIZ_LoanEstimatePage3_SetComparisons "E2E_CashTOClose_Refinance"
 
 BIZ_LoanEstimate_CheckUseAlternate ()
 
   
 '=====================Set the Details for 2015 Itemization  Page====================
 BIZ_2015Itemization_SetE2EBasicData "E2E_CashTOClose_Refinance"
 
   
 '=====================Save the Loan and capture the Loan Number for subsequent validations====================
 BIZ_Loan_Save()
	
 strLoanNo = BIZ_Loan_GetLoanNumber()
 
   
 '=====================Enter the date for "Interest From" as it is shown in "Interest To"====================
 
 GUI_WebEdit_Set objSummaryPage.WebEdit("html id:=l_L244"), GUI_Object_GetPropertyValue (objSummaryPage.WebEdit("html id:=l_L245"),"text")
 
  '=====================Validate the details within "2015 Itemization" and CD page 2 and 3====================
 
 BIZ_2015Itemization_VerifyClosingCostsSummary "E2E_CashTOClose_Refinance"
 
 BIZ_ClosingDisclosurePage2_VerifyTotalBorPaid "E2E_CashTOClose_Refinance"
 
 BIZ_ClosingDisclosurePage3_VerTotalPayOffPmnt "E2E_CashTOClose_Refinance"
 
   '=====================Send the LE and CD and validate the values generated within Fee Variance ====================
 
 BIZ_SecondaryMarket_ToolsNavigation "Disclosure Tracking"
 
 BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",False,False
 BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
 
 BIZ_SecondaryMarket_ToolsNavigation "Fee Variance Worksheet"
 BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "E2E_CashTOClose_Refinance"
 BIZ_FeeVariance_VerifyChargesThatCannotIncreaseSection "E2E_CashTOClose_Refinance"
 
  
   '=====================Modify few data in 2015 Itemization and VOL Form and save the loan ====================
 BIZ_2015Itemization_SetE2EBasicData "E2E_CashTOClose_Refinance_Itr1"
 BIZ_2015Itemization_NewHUD2X1134 "E2E_CashTOClose_Refinance_Itr1"
 FRM_Logger_ReportInfoEvent "VOL", "Set VOL data using Row Id E2E_CashTOClose_Refinance_Itr1", null
    
 BIZ_Forms_Open "VOL"
 BIZ_Common_SetVOLData objSummaryPage,"E2E_CashTOClose_Refinance"
 BIZ_Loan_Save()
 
   '=====================Revalidate the values generated within "2015 Itemization" and within "CD Snapshot" of Disclosure tracking ====================
 BIZ_2015Itemization_VerifyClosingCostsSummary "E2E_CashTOClose_Refinance_Itr1"
 
 BIZ_ClosingDisclosurePage2_VerifyTotalBorPaid "E2E_CashTOClose_Refinance_Itr1"
 
 BIZ_ClosingDisclosurePage3_VerTotalPayOffPmnt "E2E_CashTOClose_Refinance_Itr1"
 
 
 BIZ_SecondaryMarket_ToolsNavigation "Fee Variance Worksheet"
 BIZ_FeeVariance_VerifyTotalGoodFaithAmountSection "E2E_CashTOClose_Refinance_Itr1"
 '=====================Redisclose the disclosure ====================
 BIZ_SecondaryMarket_ToolsNavigation "Disclosure Tracking"
 BIZ_DisclosureTrackingTool_AddDisclosure True,"CD",False,False
 BIZ_DisclosureTrackingTool_ClickRecord "Disclosure Type", "Revised", "Double"
 BIZ_DisclosureTrackingTool_OpenSnapShot ("CD")
 Verify_CDSnapshot_CashToClose "E2E_CashTOClose_Refinance","E2E_CashTOClose_Refinance_Itr1"

 '===========Exit from loan===================
BIZ_Loan_Exit(False)


'=======================Logout of Application========================
BIZ_Login_UserLogout

FRM_RT_TeardownTest(null)




 @@ hightlight id_;_658038_;_script infofile_;_ZIP::ssf5.xml_;_
