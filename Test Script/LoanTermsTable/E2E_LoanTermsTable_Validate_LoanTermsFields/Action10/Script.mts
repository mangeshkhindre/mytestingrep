'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table
'@ TestCase:
   '1 PTAC-1304 Verify Loan term drop down sections UI
'@ Test Automation JIRA Task: PTAC-2056 LoanTermsTable_LoanTermsDropDown_CDPage_Validate
'@ TestData: 
   '1 Forms_BorrowerSummaryOrigination,SetBorrower,1873_LoanTerms_DropDown_CD
   '2 Forms_BorrowerSummaryOrigination,SetTransactionDetails,1873_LoanTerms_DropDown_CD
   '3 Forms_RegZ_CD,SetARM ,1873_LoanTerms_DropDown_CD
   '4 Forms_RegZ-LE,VerifyProjectedPayment,1873_LoanTerms_DropDown_CD"
'@ Pre-conditions: 
'@ Description: Verify Loan term drop down sections UI
'@ TestSteps:
   '1 Log into Encompass as Admin
   '2 Create a new blank loan as per test dataSave loan
   '3 Go to Regz-LE  and fill data as per test data
   '4 Go to Regz-CD  and fill data as per test data
   '5 Go to CD Page1 and See UI mockup for field placement
'@ ExpectedResult:
   '1 User should be able to login successfully.
   '2 loan should be saved
   '3 In CD Page 1 > Loan Terms section:
		'Loan Amount 100000 with Yes option
		'Interest rate- 5% with yes option
	    'Monthly payment & Int - with yes option All are in Greyed out)
'***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case-PTAC-1304", "Verify Loan term drop down sections in CD Page 1", Null


BIZ_Forms_Open "Borrower Summary - Origination"
'SetTransaction details in transaction section
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "1873_LoanTerms_DropDown_CD"

'Navigate to RegZ-LE page
BIZ_Forms_Open "RegZ - LE"

Set objPage  = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")
Set objData	 = FRM_DS_GetTestData("Forms_RegZ-LE", "VerifyProjectedPayment", "1873_LoanTerms_DropDown_CD")

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"PrepaymentMayorWillnot")) Then
	GUI_WebList_Select objPage.WebList("html id:=DropdownBox5"), FRM_DS_GetValue(objData,"PrepaymentMayorWillnot")
End If
 
'Navigate and set data in RegZ-CD page
BIZ_Forms_Open "RegZ - CD"
BIZ_RegZ_CD_SetAdjustableRateMortgage "1873_LoanTerms_DropDown_CD"
  
'Navigate to CD page 1 and validate loan terms section 
BIZ_Forms_Open "Closing Disclosure Page 1"

Set objDataVer	= FRM_DS_GetTestData("LoanTermsTable", "VerifyLoanTermsTable", "1873_LoanTerms_DropDown_CD")
Set objPage  	= SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

GUI_Object_ValidateValue objPage.WebList("html id:=DropdownBox8"),FRM_DS_GetValue(objDataVer,"NEWHUDX6_LoanAmount"),"Can this Amount increase after closing?-'Loan Amount'"
GUI_Object_ValidateValue objPage.WebList("html id:=DropdownBox1"),FRM_DS_GetValue(objDataVer,"NEWHUDX5_InterestRate"),"Can this Amount increase after closing?-'Interest Rate'"
GUI_Object_ValidateValue objPage.WebList("html id:=DropdownBox10"),FRM_DS_GetValue(objDataVer,"NEWHUDX8_MonPrincInt"),"Can this Amount increase after closing?-'Monthly Principal and Interest'"
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox5"),FRM_DS_GetValue(objDataVer,"2_LTT_LoanAmount"),"Loan Amount"
GUI_Object_ValidateValue objPage.WebEdit("html id:=TextBox7"),FRM_DS_GetValue(objDataVer,"NEWHUD.X555_MaxIntRate"),"Interest Rate"   
GUI_Object_ValidateDisabled objPage.WebEdit("html id:=TextBox5"),"Loan Amount"
GUI_Object_ValidateDisabled objPage.WebEdit("html id:=TextBox7"),"Interest Rate"
GUI_Object_ValidateDisabled objPage.WebEdit("html id:=boxField5"),"Monthly Principal and Interest"

Set objPage  	= Nothing
Set objDataVer	= Nothing

