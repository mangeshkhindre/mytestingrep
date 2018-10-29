'@**************************************************************************************************
'@Test Story: Automate 15.2 ENC-24618 15.2 Commit - Ability to record borrower consent to order credit report
'@Test Case : ENC-26770: TC #1 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Borr. Summary - Origination Form)  
'			  ENC-26774: TC #2 ENC-24618 - Ability to record borrower consent to order credit report: New 'Credit Information' Fields (Borr. Summary - Processing Form)
'@Test Automation JIRA Task: TA-4663
'@ Test Data: Forms_BorrowerSummaryOrigination.xls SetBorrower 24618_Borrower
'			  Forms_BorrowerSummaryOrigination.xls SetCoBorrower 24618_CoBorrower
'			  Forms_BorrowerSummaryOrigination.xls SetCreditInformation 24618_CreditInformation_LongComments
'			  Forms_BorrowerSummaryOrigination.xls SetCreditInformation 24618_CreditInformation_VerifyLongComments
'			  Forms_BorrowerSummaryOrigination.xls SetCreditInformation 24618_CreditInformation_ReEdit
'			  Forms_BorrowerSummaryOrigination.xls SetCreditInformation 24618_CreditInformation_VerifyReEdit
'			  Forms_BorrowerSummaryProcessing.xls SetCreditInformation 24618_CreditInformation_LongComments
'			  Forms_BorrowerSummaryProcessing.xls SetCreditInformation 24618_CreditInformation_VerifyLongComments
'			  Forms_BorrowerSummaryProcessing.xls SetCreditInformation 24618_CreditInformation_ReEdit
'			  Forms_BorrowerSummaryProcessing.xls SetCreditInformation 24618_CreditInformation_VerifyReEdit
'@ Pre-conditions: NA
'@ Description:  
'@ Test Steps:
	'1. Select Pipeline View and Create a new blank loan
	'2. Open Borrower Summary Origination Form
	'3. Add Values in Borrower Summary Origination Form
	'4. Validate that Credit Information new fields exist
	'5. Validate the options in the Authorization method list
	'6. Populate data in the Credit information fields
	'7. Save the loan
	'8. Validate the data in the credit information fields
	'9. Populate data in the Comments field
	'10. Save the laon
	'11. Click the Order credit button
	'12. Select Equifax Mortgage solutions as the provider and click Submit
	'13. Verify that the credit report is received
	'14. Click on Loan tab
	'15. Verify that the credit information fields can be edited and retain their value
	'16. Exit out of loan
	'17. Navigate to home tab
			
'@ Revision History:
	'2/19/2016	 New create Script.
'*************************************************************************************************
	
	strTestCaseNumber = Parameter("strTestCaseNumber")
	If strTestCaseNumber = "1" Then
		FRM_Logger_ReportStepEvent "TC1_ENC24618_OrderCredit", "Verify Credit information fields and order credit on Borrower Summary - Origination", Null
	Else
		FRM_Logger_ReportStepEvent "TC2_ENC24618_OrderCredit", "Verify Credit information fields order credit on Borrower Summary - Processing", Null
	End If
	
	
	'=====================Select Pipeline View and Create a new blank loan====================
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "", "My Pipeline"
	
	'===================Open Borrower Summary Origination Form======================
	BIZ_Forms_Open "Borrower Summary - Origination"
			
	'==================Add Values in Borrower Summary Origination Form===================
	BIZ_BorrowerSummaryOrigination_SetBorrower("24618_Borrower")
	BIZ_BorrowerSummaryOrigination_SetCoBorrower("24618_CoBorrower")
	
	If  strTestCaseNumber = "2" Then
		'=================Go to Borrower Summary - processing form=====================	
		BIZ_Forms_Open "Borrower Summary - Processing"
	End If
	
	Set objItemizationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	
	'==============================Validate that Credit Information new fields exist===============================================
	GUI_Object_ValidateExists objItemizationPage.WebCheckBox("html id:=__cid_CheckBox48_Ctrl"), 5, "Borrower: Authorized Credit Report"
	GUI_Object_ValidateExists objItemizationPage.WebEdit("html id:=TextBox32"), 5, "Borrower: Date Authorized"
	GUI_Object_ValidateExists objItemizationPage.WebList("html id:=DropdownBox8"), 5, "Borrower: Authorization Method"
	GUI_Object_ValidateExists objItemizationPage.WebCheckBox("html id:=__cid_CheckBox49_Ctrl"), 5, "CoBorrower: Authorized Credit Report"
	GUI_Object_ValidateExists objItemizationPage.WebEdit("html id:=TextBox31"), 5, "CoBorrower: Date Authorized"
	GUI_Object_ValidateExists objItemizationPage.WebList("html id:=DropdownBox9"), 5, "CoBorrower: Authorization Method"
	GUI_Object_ValidateExists objItemizationPage.WebEdit("html id:=MultilineTextBox1"), 5, "Credit Information: Comments"
	
	'==============================Validate the options in the Authorization method list================================================
	GUI_Object_ValidateProperty objItemizationPage.WebList("html id:=DropdownBox8"), "all items","Phone;Face to Face;Internet;Mail", "Borrower: Authorization Method"
	GUI_Object_ValidateProperty objItemizationPage.WebList("html id:=DropdownBox9"), "all items","Phone;Face to Face;Internet;Mail", "CoBorrower: Authorization Method"

	'==============================Populate data in the Credit information fields===============================================
	If strTestCaseNumber = "1" Then
		BIZ_BorrowerSummaryOrigination_SetCreditInformation("24618_CreditInformation_LongComments")
	Else
		BIZ_BorrowerSummaryProcessing_SetCreditInformation("24618_CreditInformation_LongComments")
	End If
		
	'================================Save the loan=======================================================
	BIZ_Loan_Save()
	
	'=======================================Validate the data in the credit information fields====================================
	If strTestCaseNumber = "1" Then
		BIZ_BorrowerSummaryOrigination_VerifyCreditInformation("24618_CreditInformation_VerifyLongComments")
	Else
		BIZ_BorrowerSummaryProcessing_VerifyCreditInformation("24618_CreditInformation_VerifyLongComments")
	End If
	
	'===================================Click the Order credit button==========================
	If  strTestCaseNumber = "1" Then
		GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button4")	
	Else
		GUI_WebButton_Click objItemizationPage.WebButton("html id:=Button17")	
	End If
	
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst"), 5, "Providers list"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "List of providers does not come up", Null
		ExitAction
	End If
	
	'==============Select Equifax Mortgage solutions as the provider and click Submit======================
	GUI_SwfList_Select SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfList("swfname:=myLst"), "Equifax Mortgage Solutions"
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfButton("swfname:=submitBtn")
	
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request"), 20, "Credit report request dialog"
	
	If Not GUI_Object_IsExist(SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request")) Then
		FRM_Logger_ReportFailEvent "Exit Action", "Credit report request dialog does not come up", Null
		GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=OrderDialog").SwfButton("swfname:=cancelBtn1")
		ExitAction
	End If
	GUI_WinEdit_Set SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request","index:=0").WinEdit("attached text:=Equifax Mortgage Solutions"), "999EL31714"
	UTIL_Win_SendKEy "{TAB}00vGdxXrjdFfg"
	GUI_WinCheckBox_Set SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request","index:=0").WinCheckBox("text:=Equifax"), "ON"
	GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request").WinButton("text:=Finish")
	
	'=======================Verify that the credit report is received========================================
	GUI_Object_ValidateExists SwfWindow("swfname:=MainForm").WinObject("text:=AVPageView"), 120, "Credit report"
	
	If Not GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").WinObject("text:=AVPageView"), 5) Then
	    FRM_Logger_ReportFailEvent "Exit Action", "Credit report receipt does not come up", Null
		GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("text:=Credit Report Request").WinButton("text:=Cancel")
		ExitAction
	End If
	
	'==================Click on Loan tab=======================================
	GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControl"), "Loan"
	
	'==================Verify that the credit information fields can be edited and retain their value====================
	If strTestCaseNumber = "1" Then
		BIZ_BorrowerSummaryOrigination_SetCreditInformation("24618_CreditInformation_ReEdit")
		BIZ_BorrowerSummaryOrigination_VerifyCreditInformation("24618_CreditInformation_VerifyReEdit")
	Else
		BIZ_BorrowerSummaryProcessing_SetCreditInformation("24618_CreditInformation_ReEdit")
		BIZ_BorrowerSummaryProcessing_VerifyCreditInformation("24618_CreditInformation_VerifyReEdit")
	End If
	
	
	If strTestCaseNumber = "2" Then
		BIZ_Forms_Open "Borrower Summary - Origination"
		
		'========================Validate the changes got carried over to Borrower Summary - Origination form==========================
		BIZ_BorrowerSummaryOrigination_VerifyCreditInformation("24618_CreditInformation_VerifyReEdit")
	End If
	
	'================Exit out of loan=======================
	BIZ_Loan_Exit(False)

	 '==================Navigate to home tab==============================
    BIZ_Nav_SelectHomeTab
    




