'@******************************************************************************************
'@ TestStory: KBYO2: Automate End to End flow on LE page and CD Page
'@ TestCase: CBIZ-12556 KBYO2 - KBYO2: Core Create Display Fields and Update LE and CD rounding rules per KBYO2 Guidance
'@ Test Automation JIRA Task: CTA-280
'@ TestData: "Global_Data", "Login", "admin_core2p"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "AmortizationSchedule"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "AmortizationSchedule"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "Amortization_Conv_ARMPurchase"
'@ TestData: "Forms_RegZ-LE", "SetARM", "Amortization_Conv_ARMPurchase"	
'@ TestData: "Settings_Loansetup", "FormBuilderFields", "ValidateFields"
'@ TestData: "Settings_Loansetup", "CustomFields",  "CBIZ-12556_KBYO.XD4113" 
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.NEWHUDXD555"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD799"    
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.LE3XD16"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD689"   
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD3"     
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD1699"      
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD2625"
'@ TestData: "Settings_Loansetup", "CustomFields","CBIZ-12556_KBYO.XD697"
'@ TestData: "Settings_Loansetup", "CustomFields", "CBIZ-12556_KBYO.XD695"
'@ Pre-conditions: An ARM loan should be created by entering values in Reg-Z LE form.
'@ Description:  Update Rounding Rules for Display and Document Request only
'1. Round to 3 decimal places (4.2558 would render as 4.256%)
'2. Drop trailing zeroes (4.250 would render as 4.25%, 4.2501 would also render as 4.25%, 4.100 would render as 4.1%)
'3. Truncate at decimal if whole number (4.000 would be 4%)
'Update UI to render Document Request Fields on LE and CD
'1. Core fields should not be impacted outside of LE and CD
'2. UI should show Display fields on LE Pages
'3. UI should show Display fields on CD Pages
'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Create a new custom form with 10 KBYO fields.
	'3 Go to RegZ-LE and CD 5 Page to get value of field IDs mentioned in CBIZ-12556. (2 virtual fields are out of scope) 
	'4 Goto custom form and check whether KBYO fields are rounded.
'@ ExpectedResult: 
	'1. User should be able to log in.
	'2. New custom form with 10 KBYO fields is created.
	'3. Fields Updates should match and updated value should be displayed in the fields.
	'4. KBYO fields should be rounded in custom form.
'********************************************************************************************
'====== Delete Existing Form Fields(Precondition) ======
 FRM_Logger_ReportStepEvent "Start Test Case:Pre-condition","To delete Existing Custom fields and Create custom forms", Null
 BIZ_InputFormBuilder_Launch
 BIZ_InputFormBuilder_Login "admin_core2p"
 strFormName= BIZ_GetCustomFormName("PTAC-1638_Date","ValidateFields")
 BIZ_InputFormBuilder_DeleteFormFields strFormName
    
 '====== Create New Form(Precondition) ======
 strFormName1=BIZ_LoanCustomFields_CreateNewForm(strFormName)
 BIZ_InputFormBuilder_Close

 '====== Add objects to the Form ======
 BIZ_InputFormBuilder_Launch
 BIZ_InputFormBuilder_Login "admin_core2p"
    
    Dim arrCustomFields(9)
	arrCustomFields(0) = "KBYO.XD4113"
	arrCustomFields(1) = "KBYO.NEWHUDXD555"
	arrCustomFields(2) = "KBYO.XD799"
	arrCustomFields(3) = "KBYO.LE3XD16"
	arrCustomFields(4) = "KBYO.XD689"
	arrCustomFields(5) = "KBYO.XD3"
	arrCustomFields(6) = "KBYO.XD1699"
	arrCustomFields(7) = "KBYO.XD2625"
	arrCustomFields(8) = "KBYO.XD697"
	arrCustomFields(9) = "KBYO.XD695"
	
	Dim arrRowID(9)
	arrRowID(0) = "CBIZ-12556_KBYO.XD4113"      
	arrRowID(1) = "CBIZ-12556_KBYO.NEWHUDXD555"      
	arrRowID(2) = "CBIZ-12556_KBYO.XD799"    
	arrRowID(3) = "CBIZ-12556_KBYO.LE3XD16"      
	arrRowID(4) = "CBIZ-12556_KBYO.XD689"   
	arrRowID(5) = "CBIZ-12556_KBYO.XD3"     
	arrRowID(6) = "CBIZ-12556_KBYO.XD1699"      
	arrRowID(7) = "CBIZ-12556_KBYO.XD2625"
	arrRowID(8) = "CBIZ-12556_KBYO.XD697"
	arrRowID(9) = "CBIZ-12556_KBYO.XD695"
    
    BIZ_LoanCustomFields_OpenCustomForm strFormName1
    BIZ_LoanCustomFields_SelectCustomFields arrRowID,"CustomForm_ValidateFields",arrCustomFields
    BIZ_InputFormBuilder_Close

'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new Conventional Loans; Purchase; Fixed","Started creating new Conventional Loans; Purchase; Fixed",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetProperty "AmortizationSchedule"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "Amortization_Conv_ARMPurchase"

'====== Enter values in RegZ - LE form ======
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetAdjustableRateMortgage "Amortization_Conv_ARM"

'====== Save and get loan number ======
BIZ_Loan_Save()

Set objLECDPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

'====== Get field values from RegZ - LE form ======
NEWHUD_X555=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=TextBox5"),"value")
KBYOXD4113_Interest_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=txtTransDetailsInterestRate"),"value")
F799_APR=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=l_799"),"value")
F689_Margin=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=l_689"),"value")
F3_Interest_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=l_3"),"value")
F1699_Minimum_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=I_1699"),"value")
F2625_Maximum_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=I_2625"),"value")
F697_First_Change=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=l_697"),"value")
F695_Subsequent_Change=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=txtLoanInfoARMRateCap"),"value")
BIZ_Forms_Open "Closing Disclosure Page 5"
GUI_Object_WaitTillExist(objLECDPage.WebEdit("html id:=TextBox5","title:=LE3.X16: The amount of interest that the borrower will pay over the loan term as a percentage."))		'Wait added so that TIP field is identified 
CD5_LE3_X16_TIP=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("html id:=TextBox5"),"value")

'====== Remove trailing zeros of field values obtained from RegZ - LE form by calling BIZ_KBYO2_removetz function  ======
round_NEWHUD_X555=BIZ_KBYO2_removetz(NEWHUD_X555)
round_KBYOXD4113_Interest_Rate=BIZ_KBYO2_removetz(KBYOXD4113_Interest_Rate)
round_799_APR=BIZ_KBYO2_removetz(F799_APR)
round_689_Margin=BIZ_KBYO2_removetz(F689_Margin)
round_3_Interest_Rate=BIZ_KBYO2_removetz(F3_Interest_Rate)
round_1699_Minimum_Rate=BIZ_KBYO2_removetz(F1699_Minimum_Rate)
round_2625_Maximum_Rate=BIZ_KBYO2_removetz(F2625_Maximum_Rate)
round_697_First_Change=BIZ_KBYO2_removetz(F697_First_Change)
round_695_Subsequent_Change=BIZ_KBYO2_removetz(F695_Subsequent_Change)
round_LE3_X16_TIP=BIZ_KBYO2_removetz(CD5_LE3_X16_TIP)

'====== Navigate to custom form ======
BIZ_Forms_Open strFormName1

'====== Recieve values from custom form ======
custom_NEWHUD_X555=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.NEWHUDXD555"),"value")
custom_4113_Interest_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD4113"),"value")
custom_799_APR=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD799"),"value")
custom_LE3_X16_TIP=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.LE3XD16"),"value")
custom_689_Margin=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD689"),"value")
custom_3_Interest_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD3"),"value")
custom_1699_Minimum_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD1699"),"value")
custom_2625_Maximum_Rate=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD2625"),"value")
custom_697_First_Change=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD697"),"value")
custom_695_Subsequent_Change=GUI_Object_GetPropertyValue(objLECDPage.WebEdit("title:=KBYO.XD695"),"value")

'====== Get values from custom form ======
FRM_VerifyEqual round_NEWHUD_X555, custom_NEWHUD_X555, "KBYO.NEWHUDXD555 field", "Value of KBYO.NEWHUDXD555 field is"
FRM_VerifyEqual round_KBYOXD4113_Interest_Rate, custom_4113_Interest_Rate, "KBYOX.D4113 Interest_Rate field", "Value of KBYOX.D4113 Interest_Rate is"
FRM_VerifyEqual round_799_APR, custom_799_APR, "KBYO.XD799 APR field", "Value of KBYO.XD799 APR field is"
FRM_VerifyEqual round_LE3_X16_TIP, custom_LE3_X16_TIP, "KBYO.LE3XD16 TIP field", "Value of KBYO.LE3XD16 TIP field is"
FRM_VerifyEqual round_689_Margin, custom_689_Margin, "KBYO.XD689 Margin field", "Value of KBYO.XD689 Margin field is"
FRM_VerifyEqual round_3_Interest_Rate, custom_3_Interest_Rate, "KBYO.XD3 Interest Rate field", "Value of KBYO.XD3 Interest Rate field is"
FRM_VerifyEqual round_1699_Minimum_Rate, custom_1699_Minimum_Rate, "KBYO.XD1699 Minimum Rate field", "Value of KBYO.XD1699 Minimum Rate field is"
FRM_VerifyEqual round_2625_Maximum_Rate, custom_2625_Maximum_Rate, "KBYO.XD2625 Maximum Rate field", "Value of KBYO.XD2625 Maximum Rate field is"
FRM_VerifyEqual round_697_First_Change, custom_697_First_Change, "KBYO.XD697 First Change field", "Value of KBYO.XD697 First Change field is"
FRM_VerifyEqual round_695_Subsequent_Change, custom_695_Subsequent_Change, "KBYO.XD695 Subsequent Change field", "Value of KBYO.XD695 Subsequent Change field is"
'====== Exit the loan ======
BIZ_Loan_Exit(False)
'====== Logout of Encompass ======
BIZ_Login_UserLogout()	

'====== Delete Existing custom forms  ======
BIZ_InputFormBuilder_Launch
BIZ_InputFormBuilder_Login "admin_core2p"
BIZ_InputFormBuilder_DeleteFormFields strFormName1
BIZ_InputFormBuilder_Close
