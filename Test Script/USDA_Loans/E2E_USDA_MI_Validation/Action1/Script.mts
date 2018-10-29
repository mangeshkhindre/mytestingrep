'@**************************************************************************************************
'@ TestStory: PTAC-1586 USDA Loans, MI Pop Up, Calculations
'@ TestCase: 
    '1 PTAC-1442 - Validation of UI for USDA MIP pop up
    '2 PTAC-1477 - Validation of MIP calculation   
    '3 PTAC-1443 - Validation of the change in PMI calculator when loan type is changed
    '4 PTAC-1444 - Verification of Loan Amount and Appraised Amount when changed in MIP/PMI/GuaranteeFee Window    
	'5 CBIZ-4849 - Validation of Projected Payments Table    
	'6 PTAC-2768 - PMI Mid Point Cancellation calculation (Standard Loan Term)
	'7 PTAC-2769 - PMI Mid Point Cancellation calculation (Odd Loan Term)   
'@ Test Automation JIRA Task: CTA-318 Script optimization for USDA_Loans
'@ TestData: 01 "Forms_BorrowerSummaryOrigination", "SetBorrower", "USDA_BorrowerSummaryData"
			'02 "Forms_BorrowerSummaryOrigination", "SetProperty", "USDA_BorrowerSummaryData"
			'03 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "USDA_BorrowerSummaryData"
		    '04 "Forms_1003Page", "1003Page1", "PTAC-1477_SetData"
		    '05 "Forms_1003Page", "1003Page1", "PTAC-1477_SetCheckBoxData"
		    '06 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC-1443_SelectFHALoanType"
		    '07 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC-1443_SelectLoanType"		 
		    '08 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC-1443_SelectOtherLoanType"
		    '09 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC-1443_SelectVALoanType"	
			'10 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC-1443_SelectUSDALoanType"	
			'11 "Forms_1003Page", "1003Page1", "CBIZ-4849"	
			'12 "Forms_1003Page", "1003Page1", "PTAC-1444_SetData"	
			'13 "Forms_1003Page", "1003Page1","PTAC-1443_MIPCalculation"	
			'14 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC_2768PMIMidPoint_StandardLoanTerm"	
			'15 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "PTAC_2769PMIMidPoint_OddLoanTerm"				
'@ Pre-conditions: None   
'@ Description:  
'@ TestSteps:
   '01 Validation of UI for USDA MIP pop up 
   '02 Select '1003 Page 1' - > go to 'I. Types of Mortgage and Terms of Loan' - > MIP / FF field and click on 'Edit Field Value'
   '03 Verify that 'Loan Amount' and 'Appraised Amount' field values are populated by Default
   '04 Go to 'Monthly Mortgage Insurance/USDA Annual Fee Premium' and verify that 'Calculated Based On - Loan Amount' is selected default
   '05 In MIP/PMI/Guarantee Fee Calculation' popup window, go to 'Guarantee Fee percentage' label and select '1.00' from the drop down list
   '06 Click on 'OK' button in MIP/PMI/Guarantee Fee Calculation' popup window
   '07 Click on MIP/FF 'Edit Value Field' and reopen the MIP calculator and check the check box 'Entire Guarantee Fee will be financed'
   '08 Verify the 'Guarantee Fee Amount' and 'Total Loan Amount'    
   '09 Validation of change in PMI calculator when loan type is changed
   '10 Verification of Loan Amount and Appraised Amount when changed in MIP/PMI/GuaranteeFee Window
   '11 Validation of Projected Payments Table
'@ ExpectedResult:
   '1 MIP/PMI/Guarantee Fee Calculation' popup window has below four sections:
  		'a) Loan Information
	    'b) Financed Guarantee Fee
		'c) For Financing a portion of the guarantee Fee
		'd) Monthly mortgage Insurance/USDA annual fee Premium
   '2 Verify MIP/PMI/Guarantee Fee Calculation Fields 
   '3 Verify MIP/PMI/Guarantee Fee Calculation Fields 
      'a Total Loan Amount
      'b Guarantee Fee Amount
      'c For Financing a portion of the guarantee Fee
      'd Monthly mortgage Insurance/USDA annual fee Premium
'***************************************************************************************************
FRM_RT_SetupTest(null)

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1593","Script Name - USDA_ValidationofUIForUSDAMIPPopUp", Null

'====== Login to Encompass as Admin ======
BIZ_Login_UserLogin "admin_core2p"
'====== Select Pipeline Tab ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation" 
'====== Validation of the UI for USDA MIP pop up ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1442","Validation of the UI for USDA MIP pop up", Null
USDA_SetBorrowerSummary "USDA_BorrowerSummaryData"
'====== Verify Sections in MIP/PMI/Guarantee Fee Calculation Under 1003 Page 1 ======
USDA_MIPPopUpUIValidation()

'====== Validation of MIP calculation ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1477","Validation of MIP calculation", Null
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopUpValidation "USDA_BorrowerSummaryData"
'GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
'====== Set Data in MIPPop ======
USDA_MIPPopGuarantee "PTAC-1477_SetData"
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuarantee "PTAC-1477_SetCheckBoxData"
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
'====== Verify Guarantee Fee and Total Loan Amount ======
USDA_GuaranteeFeeAndTotalLoanAmountVerification "PTAC-1477_SetCheckBoxData"

'====== Validation of the change in PMI calculator when loan type is changed ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1443","Validation of the change in PMI calculator when loan type is changed", Null
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuaranteeFee_Select "PTAC-1443_PMICalculation","ComboBox"
USDA_MIPPopGuaranteeValidation "PTAC-1443_PMICalculation"
'====== Verify GuaranteeFee in MIPPopup ======
'=====Change the Loan Type to 'Conventional'======
USDA_SelectLoanType "PTAC-1443_SelectLoanType"
USDA_MIPFFVerification()
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuaranteeFee_Select "PTAC-1443_PMICalculation","Edit"
USDA_MIPCalculationValidation "PTAC-1443_MIPCalculation"
'BIZ_Forms_Open "Borrower Summary - Origination"
'=====Change the Loan Type to 'FHA'======
USDA_SelectLoanType "PTAC-1443_SelectFHALoanType"
USDA_MIPFFVerification()
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuaranteeFee_Select "PTAC-1443_PMICalculation","Edit"
USDA_MIPCalculationValidation "PTAC-1443_MIPCalculation"
'BIZ_Forms_Open "Borrower Summary - Origination"
'=====Change the Loan Type to 'VA'======
USDA_SelectLoanType "PTAC-1443_SelectVALoanType"
USDA_MIPFFVerification()
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuaranteeFee_Select "PTAC-1443_PMICalculation","Edit"
USDA_MIPCalculationValidation "PTAC-1443_MIPCalculation"
'BIZ_Forms_Open "Borrower Summary - Origination"
'=====Change the Loan Type to 'Other'======
USDA_SelectLoanType "PTAC-1443_SelectOtherLoanType"
USDA_MIPFFVerification()
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuaranteeFee_Select "PTAC-1443_PMICalculation","Edit"
USDA_MIPCalculationValidation "PTAC-1443_MIPCalculation"
'=====Change the Loan Type back to 'USDA-RHS'======
USDA_SelectLoanType "PTAC-1443_SelectUSDALoanType"

'====== Verification of Loan Amount and Appraised Amount in MIP/PMI/GuaranteeFee Window ======
FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1444","Verification of Loan Amount and Appraised Amount when changed in MIP/PMI/GuaranteeFee Window", Null
'====== Set Data in MIPPop ======	
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuarantee "PTAC-1444_SetData"
BIZ_Forms_Open "Borrower Summary - Origination"
'====== Verify Loan Amount and Appraised Amount ======
USDA_LoanAndAppraisedAmountVerification "PTAC-1444_SetData"

'====== Verification of Projected Payments Table ======
FRM_Logger_ReportStepEvent "Start Test Case: CBIZ-4849","Validation of Projected Payments Table", Null
BIZ_Forms_Open "1003 Page 1"
'====== Set Data in MIPPop ======	
GUI_Image_Click SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebButton("html id:=StandardButton2").Image("file name:=edit.png")
USDA_MIPPopGuarantee "CBIZ-4849"
BIZ_Forms_Open "Loan Estimate Page 1"
USDA_VerifyAmortizationSchedule()

'======  PTAC-2768 PMI Mid Point Cancellation calculation (Standard Loan Term)  ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2768","PMI Mid Point Cancellation calculation (Standard Loan Term)", Null
'change the loan type to conventional
USDA_SelectLoanType "PTAC-1443_SelectLoanType"
FRM_Logger_ReportInfoEvent "Verify Term", "Term has been set as Standard Loan Term(360)", null
'BIZ_Forms_Open "1003 Page 1"
'Set obj1003Page1 = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
'GUI_WebEdit_Set obj1003Page1.WebEdit("html id:=l_4"),"360"
'strValue = GUI_Object_GetPropertyValue(obj1003Page1.WebEdit("html id:=l_4"),"value")
'If strValue="360" Then
'	FRM_Logger_ReportInfoEvent "Verify Term", "Term has been set as Standard Loan Term(360)", null
'Else
'	FRM_Logger_ReportFailEvent "Verify Term", "Term has not been set as Standard Loan Term(360)", null	
'End If
'Set obj1003Page1 = Nothing
'====== Set MI and PI Details ======
MI_1003Page1_SetMiandPiDetails "PTAC_2768_PMIMidPoint"
'====== Naviate to RegZ - LE ======
BIZ_Forms_Open "RegZ - CD"
'====== Validate Final MI Amount At Month ======
MI_ValidateFinalMIAmountAtMonth "180", "360"

'======  PTAC-2769 PMI Mid Point Cancellation calculation (Odd Loan Term) ======
FRM_Logger_ReportStepEvent "Start Test Case : PTAC-2769","TestCase Name - PMI Mid Point Cancellation calculation (Odd Loan Term)", Null
'BIZ_Forms_Open "1003 Page 1"
Set objRegZcdPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page")
GUI_WebEdit_Set objRegZcdPage.WebEdit("html id:=l_4"),"363"
strValue = GUI_Object_GetPropertyValue(objRegZcdPage.WebEdit("html id:=l_4"),"value")
If strValue="363" Then
	FRM_Logger_ReportInfoEvent "Verify Term", "Term has been set as Odd Loan Term(363)", null
Else
	FRM_Logger_ReportFailEvent "Verify Term", "Term has not been set as Odd Loan Term(363)", null	
End If
Set objRegZcdPage = Nothing
'====== Set MI and PI Details ======
'MI_1003Page1_SetMiandPiDetails "PTAC_2768_PMIMidPoint"
'====== Naviate to RegZ - LE ======
'BIZ_Forms_Open "RegZ - CD"
'====== Validate Final MI Amount At Month ======
MI_ValidateFinalMIAmountAtMonth "182", "363"
BIZ_Loan_Save()

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
