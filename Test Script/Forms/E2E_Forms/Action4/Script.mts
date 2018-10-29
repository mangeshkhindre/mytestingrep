'@******************************************************************************************
'@ TestStory: CBIZ-2158 Construction Only TIP (LE3.X16) calculated incorrectly when Est Interest On is A (Half Loan) (EBS)
'@ TestCase: CBIZ-2957 TC1-To verify Construction Only TIP (LE3.X16) calculated correctly when Est Interest On is A (Half Loan) (EBS)
'			 CBIZ-3098 TC2-To verify Construction Only TIP (LE3.X16) calculated correctly when Est Interest On is B (Full Loan) (EBS)
'			 CBIZ-3099 TC3-To verify TIP (LE3.X16) calculated correctly for non construction loan
'@ Test Automation JIRA Task: TA-4796
'@ TestData: Forms_BorrowerSummaryOrigination.xls SetBorrower CBIZ2158_Borrower
'			 Forms_BorrowerSummaryOrigination.xls SetTransactionDetails TC1_CBIZ2158_TransactionDetails
'			 Forms_BorrowerSummaryOrigination.xls SetTransactionDetails TC3_CBIZ2158_TransactionDetails
'			 Forms_RegZ-LE.xls SetConstruction TC1_CBIZ2158_ConstMort
'			 Forms_RegZ-LE.xls SetConstruction TC2_CBIZ2158_ConstMort
'			 Forms_RegZ-LE.xls SetConstruction TC3_CBIZ2158_ConstMort
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Add a new blank loan
	'2 Populate data for Borrower on Borrower Summary Origination
	'3 Populate data for Transaction details on Borrower Summary Origination
	'4 go to form RegZ - LE
	'5 Populate Construction Mortgage data
	'6 Get Estimated Construction Interest
	'7 get Prepaid Interest
	'8 Get Loan Amount
	'9 Calculate Total Interest Percentage
	'10 Get the displayed Total Interest Percentage
	'11 Compare the calculated and actual Total Interest Percentage
'@ ExpectedResult: 
'********************************************************************************************
FRM_Logger_ReportStepEvent "CBIZ-2158", "Verify TIP calculation for 'construction only' loan", Null

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'Populate data for Borrower on Borrower Summary Origination
BIZ_BorrowerSummaryOrigination_SetBorrower "CBIZ2158_Borrower"

'Populate data for Transaction details on Borrower Summary Origination
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "TC1_CBIZ2158_TransactionDetails"

For i = 1 To 2
	If i=1 Then
		FRM_Logger_ReportStepEvent "CBIZ-2957", "Verify TIP(LE3.X16) calculation for 'construction only' loan when Est Interest On is Half Loan", Null
	Else
		FRM_Logger_ReportStepEvent "CBIZ-3098", "Verify TIP(LE3.X16) calculation for 'construction only' loan when Est Interest On is Full Loan", Null
	End If
	'go to form RegZ - LE
	BIZ_Forms_Open "RegZ - LE"
	'Populate Construction Mortgage data
	BIZ_RegZ_LE_SetConstructionMortgage "TC"&i&"_CBIZ2158_ConstMort"
	
	'Get Estimated Construction Interest
	dblEstimatedConstructionInterest = CDbl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox30"), "value"))
	'get Prepaid Interest
	BIZ_Forms_Open "2015 Itemization"
	strPrepaidInterest = GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_334"), "value")
	If strPrepaidInterest <> "" Then
		dblPrepaidInterest = CDbl(strPrepaidInterest)
	Else
		dblPrepaidInterest = 0
	End If
	'Get Loan Amount
	BIZ_Forms_Open "1003 Page 1"
	dblLoanAmount = CDBl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_2"), "value"))
	'Calculate Total Interest Percentage
	BIZ_Forms_Open "Loan Estimate Page 3"
	dblCalculatedTIP = Round(((dblEstimatedConstructionInterest + dblPrepaidInterest)/dblLoanAmount)*100, 3)
	'Get the displayed Total Interest Percentage
	dblActualTIP = CdBl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox20"), "value"))
	'Compare the calculated and actual Total Interest Percentage
	FRM_VerifyEqual dblCalculatedTIP, dblActualTIP, "Compare calculated and Actual Total Interest Percentage", "Compare calculated and Actual Total Interest Percentage"	
Next

FRM_Logger_ReportStepEvent "CBIZ-3099", "Verify TIP(LE3.X16) calculation for 'Non construction' loan", Null

'go to form RegZ - LE
BIZ_Forms_Open "RegZ - LE"
'Populate Construction Mortgage data
BIZ_RegZ_LE_SetConstructionMortgage "TC3_CBIZ2158_ConstMort"
'Get the Total Interest Paid
BIZ_Forms_Open "Closing Disclosure Page 5"
dblTotalInterestPaid = CDbl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox2"), "value"))
'Get the Loan Amount
BIZ_Forms_Open "1003 Page 1"
dblLoanAmount = CDBl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_2"), "value"))
'Calculate Total Interest Percentage
BIZ_Forms_Open "Loan Estimate Page 3"
dblCalculatedTIP = Round((dblTotalInterestPaid/dblLoanAmount)*100, 3)
'Get the displayed Total Interest Percentage
dblActualTIP = CdBl(GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox20"), "value"))
'Compare the calculated and actual Total Interest Percentage
FRM_VerifyEqual dblCalculatedTIP, dblActualTIP, "Compare calculated and Actual Total Interest Percentage", "Compare calculated and Actual Total Interest Percentage"

BIZ_Loan_Exit(False)
