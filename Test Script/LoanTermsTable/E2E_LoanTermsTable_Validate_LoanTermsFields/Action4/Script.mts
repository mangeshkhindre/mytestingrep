'@**************************************************************************************************
'@ TestStory: PTAC-1873 Loan Terms Table 
'@ TestCase:
   '1 PTAC-1847 Verify Loan term tables for Loan purpose is Purchase 	
'@ Test Automation JIRA Task: PTAC-3443 LoanTermsTable_LoanPurpose_LoanTerms_Verify
'@ TestData: 
  '1 LoanTermsTable,VerifyLoanTermsTable,PTAC-1874_LoanTermsTable_1847
'@ Pre-conditions: 
'@ Description: Verify and Validate Create, Duplicate, Delete, Rename, Edit functonality of Escrow record 
'@ TestSteps:
   '1 Login into the Encompass with Admin user.
   '2 "Enter the loan data as given in the test data column.Save the loan."
   '3 Go to LE page 1 and verify the value of the F(LE1.X2)
   '4 Change data in field Term field
'@ ExpectedResult:
   '1 User should be able to login successfully.
   '2 Loan should be saved successfully.
   '3 loan term should be 30 years under loan details section
   '4 F(LE1.X2) should show blank value and F(LE1.X3) should show 18 months.
   '5 User should be able to login successfully.
   '6 Loan should be saved successfully.
 '***************************************************************************************************
FRM_Logger_ReportStepEvent "Start Test Case- PTAC-1847", "Verify field Term in LoanTermTables when Loan purpose is Purchase", Null 
Dim objLoanFormPage,objData
strRowID=Parameter("strRowID")		
Set objLoanFormPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
Set objData 		= FRM_DS_GetTestData("LoanTermsTable", "VerifyLoanTermsTable", strRowID)

If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emFormMenuBox"),"Loan Estimate Page 1") Then
	'Navigate to LE page 1
	BIZ_Forms_Open "Loan Estimate Page 1"
	GUI_Object_ValidateValue objLoanFormPage.WebEdit("html id:=TextBox15"), FRM_DS_GetValue(objData, "LE1.X2_LoanTermsYrs"),"Loan term(LE1.X2) should be 30 years under loan details section"
Else
	FRM_Logger_ReportFailEvent "Verify Loan Estimate Page or form exists or not in list","Loan Estimate Page or form doesn't exist",Null
End If

If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "Term")) Then 
	'Set data in Borrower summary origination form
	 BIZ_Forms_Open "Borrower Summary - Origination"			
     GUI_WebEdit_Set objLoanFormPage.WebEdit("html id:=l_4"), FRM_DS_GetValue(objData, "Term")          
End If 

If GUI_List_VerifyItemExists(SwfWindow("swfname:=MainForm").SwfList("swfname:=emFormMenuBox"),"Loan Estimate Page 1") Then
	'Navigate to LE page 1
	BIZ_Forms_Open "Loan Estimate Page 1"
	GUI_Object_ValidateValue objLoanFormPage.WebEdit("html id:=TextBox15"), FRM_DS_GetValue(objData, "LE1.X2_LoanTermsYrs_Blank"),"Loan Term(LE1.X2) should show blank value"
	GUI_Object_ValidateValue objLoanFormPage.WebEdit("html id:=TextBox22"), FRM_DS_GetValue(objData, "LE1.X3_LoanTermsMnths"),"Loan Term(LE1.X3) should show 18 months under loan details section"
Else
	FRM_Logger_ReportFailEvent "Verify Loan Estimate Page or form exists or not in list","Loan Estimate Page or form doesn't exist",Null
End If

Set objLoanFormPage = Nothing
Set objData         = Nothing


