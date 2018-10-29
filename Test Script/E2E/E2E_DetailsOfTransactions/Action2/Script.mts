'@******************************************************************************************
'@ TestStory: 
'@ TestCase: 
'@ Test Automation JIRA Task: TA-4710 Automate E2E_DetailsOfTransactions
'@ TestData: Forms_BorrowerSummaryOrigination.xlsx, SetBorrower, E2E_DetailsOfTransactions_BorrowerInfo
'			 Forms_BorrowerSummaryOrigination.xlsx, SetProperty, E2E_DetailsOfTransactions_PropertyInfo
'			 Forms_BorrowerSummaryOrigination.xlsx, SetTransactionDetails, E2E_DetailsOfTransactions_TransactionDetail
'			 Forms_RegZ_CD.xlsx, SetData, E2E_DetailsOfTransactions_SetData
'			 Forms_VOL.xlsx, SetVOLData, E2E_DetailsOfTransaction_SetData
'			 Forms_2015Itemization.xlsx, Set800Section, E2E_DetailsOfTransaction_Section800
'			 Forms_2015Itemization.xlsx, Set1000Section, E2E_DetailsOfTransaction_Section1000
'    		 Forms_2015Itemization.xlsx, TotalEstimatedFunds, 4710_Data1
'    		 Forms_2015Itemization.xlsx, TotalEstimatedFunds, 4710_Data2
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Log into Encompass as Admin
	'2 Create new loan and setup data according to 'Test Data' column
	'3 Click on 1003 Page 3 Form  and confirm the 'Expected Results'
'@ ExpectedResult: 
'	1 Verify expected results on 1003 page 3
'********************************************************************************************

strTestCaseNumber = Parameter("strTestCase")

FRM_Logger_ReportInfoEvent "Test Case "&strTestCaseNumber,"E2E Details of transactions", Null

'======== Create new loan ==============================
FRM_Logger_ReportInfoEvent "New Loan","Create a New Loan", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"

'================= Enter data in Borrower Summary Origination form ===========================
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_DetailsOfTransactions_BorrowerInfo"
BIZ_BorrowerSummaryOrigination_SetProperty "E2E_DetailsOfTransactions_PropertyInfo"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "E2E_DetailsOfTransactions_TransactionDetail"
If strTestCaseNumber = "2" Then
	GUI_WebCheckBox_Set  SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckbox("html id:=__cid_CheckBox10_Ctrl"), "ON"
	GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_136"), "115000" 
End If

'================== Enter daa in Regz CD form ================================================
BIZ_RegZ_CD_SetData "E2E_DetailsOfTransactions_SetData"
	
'================== Enter data in VOL form ===================================================
If strTestCaseNumber = "1" Then
	BIZ_VOL_SetVOLData "E2E_DetailsOfTransaction_SetData"	
End If

'================ Enter data in 2015 Itemization form ======================================
BIZ_Forms_Open "2015 Itemization"
BIZ_2015Itemization_Set800Section "E2E_DetailsOfTransaction_Section800"
BIZ_2015Itemization_Set1000Section "E2E_DetailsOfTransaction_Section1000"

GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox106"), "L"
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton22")
GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfEdit("swfname:=rateFundingTxt"), "1"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=MIPDialog").SwfButton("swfname:=okBtn")

'================== Validate Expected Results ================================================
BIZ_Forms_Open "2015 Itemization"
Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "TotalEstimatedFunds", "4710_Data"&strTestCaseNumber)
strPurchasePrice = FRM_DS_GetValue(objData, "136_PurchasePrice")
strRefinance = FRM_DS_GetValue(objData, "1092_Refinance")
strEstimatePrepaids = FRM_DS_GetValue(objData, "138_EstimatedPrepaidItems")
strEstimatedClosingCosts = FRM_DS_GetValue(objData, "137_EstimatedClosingCosts")
strPMIMIPFundingFee = FRM_DS_GetValue(objData, "969_PMIMIPFundingFee")
strTotalCosts = FRM_DS_GetValue(objData, "1073_TotalCosts")
strSellerPadiCC =  FRM_DS_GetValue(objData, "143_CCPaidBySeller")
strCCPaidByBrokerLenderOther = FRM_DS_GetValue(objData, "1852_CCPaidByBrokerLenderAndOther")
strCashToBorrower = FRM_DS_GetValue(objData, "142_CashToBorrower")

GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_136"), strPurchasePrice, "Purchase Price"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1092"), strRefinance, "Refiance"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_138"), strEstimatePrepaids, "Estimated prepaids"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_137"), strEstimatedClosingCosts, "Estimated Closing Costs"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_969"), strPMIMIPFundingFee, "PMI, MIP, Funding Fee"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1073"), strTotalCosts, "Total Costs"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_143"), strSellerPadiCC, "Seller Paid CC"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_1852"), strCCPaidByBrokerLenderOther, "CC paid by Broker Lender, Oth"
GUI_Object_ValidateValue SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=l_142"), strCashToBorrower, "Cash To borrower"

BIZ_Loan_Exit(False)
	
'================== Go to Home page ===========================================
BIZ_Nav_SelectHomeTab


