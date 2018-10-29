    '@**************************************************************************************************
    '@ TestStory: PTAC-1624 Re-Enforcement_LoanSetup
    '@ 			  KBYO2: Automate End to End flow on LE page and CD Page
    '@ TestCase: 
       '1 PTAC-1638 - Loan Custom Fields - Create a new Custom Field with format "DATE"
       '2 PTAC-1639 - Loan Custom Fields - Create a new Custom Field with format "PHONE"
       '3 PTAC-1640 - Loan Custom Fields - Create a new Custom Field with format "DECIMAL_2 (x,xxx.xx)"
   	   '4 PTAC-1641 - Loan Custom Fields - Create a new Custom Field with format "Y/N"
   	   '5 PTAC-1642 -  Loan Custom Fields - Create a new Custom Field with format "DROPDOWN"
   	   '6 PTAC-1643 -  Loan Custom Fields - Create a new Custom Field with format "Check Box"
   	   '7 PTAC-1630 - Loan Custom Fields - Create a new Custom Field with format "INTEGER"
       '8 PTAC-1632 - Loan Custom Fields - Create a new Custom Field with format "STRING"
       '9 PTAC-1634 - Loan Custom Fields - Create a new Custom Field with format "ZIPCODE"
   	   '10 PTAC-1635 - Loan Custom Fields - Create a new Custom Field with format "SSN"
   	   '11 CBIZ-14188 KBYO2 - Create and Set Display Fields for Closing Costs Expiration Date/Time/TimeZone
    '@ Test Automation JIRA Task: PTAC-2375 E2E_LoanSetup_LoanCustomFields_Validate_DateAndPhoneCustomFields
    '							  CTA-280
    '@ TestData: 
       '1 Settings_Loansetup,CustomFields and PTAC-1638_Date
       '2 Settings_Loansetup,FormBuilderFields and PTAC-1638_Date
       '3 Settings_Loansetup,CustomFields and PTAC-1639_Phone
       '4 Settings_Loansetup,FormBuilderFields and PTAC-1639_Phone
	   'CBIZ-14188:
	   '5 "Global_Data", "Login", "sven_admin"
	   '6 "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_KBYO2"
	   '7 "Forms_BorrowerSummaryOrigination", "SetProperty", "E2E_KBYO2"
	   '8 "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "E2E_KBYO2"
	   '9 "Tools_DisclosureTracking", "DisclosureDetailBorrower", "E2E_KBYO2"
    '@ Pre-conditions:
       '1 Login to Form Builder with Admin User
       '2 Create new form and save it.
       '3 Login to Encompass with Admin User
       '4 Navigate to through Encompass Settings > Company/User Setup>Personas
       '5 Select "Loan Officer" Psersona and go to Forms/Tools tab.
       '6 Select newly created form under Input Forms section and Click on Save button.
       '7 Create/setup Non Admin User with "Loan Officer" persona
    '@ Description:  
    '@ TestSteps:
      'Step1 PTAC-1638,PTAC-1639 Test Steps
       '1 Login to Encompass as Admin user.
       '2 Go to Setting window.
       '3 Select Loan Setup-> Loan Custom Fields
      'Step2  PTAC-1638,PTAC-1639 Test Steps
       '1 Clck on new(+) button
      'Step3  PTAC-1638,PTAC-1639 Test Steps
       '1 Enter Field ID
       '2 Enter Description
       '3 select "Date" and "Phone from Format dropdown list.
       '4 Click on OK button
      'Step4  PTAC-1638,PTAC-1639 Test Steps
       '1 Login to Form Builder with Admin User
      'Step5  PTAC-1638,PTAC-1639 Test Steps
       '1 Open Custom Form(created in Pre-Condition)
       '2 Navigate through Edit -> Insert -> add "Text Box" to Form
       '3 go to Properties of "Text Box"
       '4 got to "Field" under Data section
       '5 Click on Field Selector button
       '6 go to Custom Fields tab
       '7 select  Custom Field and Click on OK button
       '8 Click on Save Form button
      'Step6  PTAC-1638,PTAC-1639  Test Steps
       '1 Login to Encompass with new user(Non admin user )
       '2 Go to  Pipeline and Create a new loan
       '3 go to Forms and select custom form(created in Pre-Condition)
       '4 Input date in custom field in format of  "mm/dd/yy"
       '5 Input phone number in custom field 
       '6 Click Save button
       'CBIZ-14188 Test Steps:
       '1 Login to the Encompass with Admin user
	   '2 Create a new form CBIZ-14188 with fields LE1.XD28,LE1.XD8 and LE1.XD9
	   '3 Go to Pipeline.Click New loan.Enter the values in loan as per the test data.Save the loan.
	   '4 Go to Tools->Disclosure Tracking.Send LE 
	   '5 Open the entry log from Disclosure History. Enter Actual Received Date and click on Intent to Proceed checkbox and click ok
	   '6 Verify the fields in New form CBIZ-14188
	   '7 Open the LE disclosure record again and uncheck the Intend to proceed.
	   '8 Verify the values of LE1.X28, LE1.X8 and LE1.X9
	   '9 Go to form CBIZ-14188 again.
    '@ ExpectedResult:
      'Step1 PTAC-1638,PTAC-1639 Expected Steps
       '1 Loan Custom Fields window should be displayed
      'Step2  PTAC-1638,PTAC-1639 Expected Steps
       '1 Loan Custom Field Editor window should be displayed.
      'Step3   PTAC-1638,PTAC-1639 Expected Steps
       '1 New Custom Field should be created
      'Step4   PTAC-1638,PTAC-1639 Expected Steps
       '1 Loan Custom Fields window should be displayed
      'Step5   PTAC-1638,PTAC-1639 Expected Steps
       '1 After Step 5, Field Selector window should be displayed.	After Step 7, Field Id should be assigned to Custom Field.
      'Step6   PTAC-1638,PTAC-1639 Expected Steps 
       '1 After Step 4, custom field should  accept value After Step 5, Loan should save successfully.
       'CBIZ-14188 ExpectedResult:
       '1. User should be able to logged in
   	   '2. Form should be created and should be visible for new loans
	   '3. Loan should be saved successfully.
	   '4. LE should be sent successfully. And record should be added in the DT
	   '5. The Disclosure details pop up box should be closed.
	   '6. In new form, should display the LE1.XD28: NULL, LE1.XD8 : NULL, LE1.XD9 : NULL
	   '7. Checkbox should be unchecked.
	   '8. Check values LE1.X28: Closing Costs Expiration Date, LE1.X8: Closing Costs Expiration Time and LE1.X9 : Closing Costs Expiration Time Zone
	   '9.Verify the values in the field it should display as below
		'LE1.XD28: LE1.X28: Closing Costs Expiration Date
		'LE1.XD8 : LE1.X8: Closing Costs Expiration Time
		'LE1.XD9 : LE1.X9 : Closing Costs Expiration Time Zone
		'Both LE1.XD and LE1.X  field values should be same. 
    '***************************************************************************************************
	FRM_RT_SetupTest(null)
    
    FRM_Logger_ReportInfoEvent "Start Test Case: Validating Custom Fields in Loan Setup","Script Name - E2E_LoanSetup_LoanCustomFields", Null
    
    '====== Delete Existing Form Fields(Precondition) ======
    FRM_Logger_ReportStepEvent "Start Test Case:Pre-condition","To delete Existing Custom fields and Create custom forms", Null
    BIZ_InputFormBuilder_Launch
    BIZ_InputFormBuilder_Login "admin_core2p"
    strFormName= BIZ_GetCustomFormName("PTAC-1638_Date","ValidateFields")
    BIZ_InputFormBuilder_DeleteFormFields strFormName
    
    '====== Create New Form(Precondition) ======
    strFormName1=BIZ_LoanCustomFields_CreateNewForm(strFormName)
    BIZ_InputFormBuilder_Close
    
    BIZ_Login_UserLogin "admin_core2p"
    BIZ_Nav_OpenMenuItem "Encompass;Settings..."
    BIZ_LoanCustomFields_CreateOrSetupNonAdminUser "PTAC-1638_Date"
    BIZ_Nav_HierarchyTree "Company/User Setup","Personas"
    BIZ_LoanCustomFields_AssignPersonaAccess "PTAC-1638_Date",strFormName1
    BIZ_Settings_ClickClose()
    
    
    '====== Login and navigate to loan custom field ======
    
    BIZ_Nav_OpenMenuItem "Encompass;Settings..."
    Wait g_TinyWaitMedium ' Explicit wait used to handle sync issues
    BIZ_Nav_HierarchyTree "Loan Setup","Loan Custom Fields"
    
    '====== Create and validate Custom-Fields ======
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1638","Create a new Custom Field with format DATE ", Null
    strCustomField1 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1638_Date")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1638_Date",strCustomField1
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1639","Create a new Custom Field with format PHONE", Null
    strCustomField2 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1639_Phone")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1639_Phone",strCustomField2
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1640","Create a new Custom Field with format Decimal ", Null
    strCustomField3 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1640_Decimal")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1640_Decimal",strCustomField3
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1641","Create a new Custom Field with format Y/N", Null
    strCustomField4 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1641_YesorNo")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1641_YesorNo",strCustomField4
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1642","Create a new Custom Field with format DROPDOWN", Null
    strCustomField5 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1642_DropDown")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1642_DropDown",strCustomField5
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1643","Create a new Custom Field with format Check Box", Null
    strCustomField6 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1643_CheckBox")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1643_CheckBox",strCustomField6
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1630"," Create a new Custom Field with format INTEGER", Null
    strCustomField7 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1630_Integer")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1630_Integer",strCustomField7
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1632","Create a new Custom Field with format STRING ", Null
    strCustomField8 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1632_String")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1632_String",strCustomField8
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1634"," Create a new Custom Field with format zipcode", Null
    strCustomField9 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1634_Zipcode")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1634_Zipcode",strCustomField9
    
    FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1635","Create a new Custom Field with format SSN", Null
    strCustomField10 = BIZ_Settings_LoanSetup_CreateCustomField("PTAC-1635_SSN")
    BIZ_Settings_LoanSetup_ValidateCustomField "PTAC-1635_SSN",strCustomField10

    BIZ_Settings_ClickClose()
    BIZ_Login_UserLogout()
    
    
    
    '====== Add an object to the Form ======
    BIZ_InputFormBuilder_Launch
    BIZ_InputFormBuilder_Login "admin_core2p"
    
    Dim arrCustomFields(12)
	arrCustomFields(0) = strCustomField1
	arrCustomFields(1) = strCustomField2
	arrCustomFields(2) = strCustomField3
	arrCustomFields(3) = strCustomField4
	arrCustomFields(4) = strCustomField5
	arrCustomFields(5) = strCustomField6
	arrCustomFields(6) = strCustomField7
	arrCustomFields(7) = strCustomField8
	arrCustomFields(8) = strCustomField9
	arrCustomFields(9) = strCustomField10
	arrCustomFields(10)= "LE1.XD28"     '====== Added arrCustomFields(10), arrCustomFields(11) and arrCustomFields(12) to validate KBYO2_CBIZ-14188 ======
	arrCustomFields(11)= "LE1.XD8"
	arrCustomFields(12)= "LE1.XD9"
	
	Dim arrRowID(12)
	arrRowID(0) = "PTAC-1638_Date"      
	arrRowID(1) = "PTAC-1639_Phone"      
	arrRowID(2) = "PTAC-1640_Decimal"    
	arrRowID(3) = "PTAC-1641_YesorNo"      
	arrRowID(4) = "PTAC-1642_DropDown"   
	arrRowID(5) = "PTAC-1643_CheckBox"     
	arrRowID(6) = "PTAC-1630_Integer"      
	arrRowID(7) = "PTAC-1632_String"
	arrRowID(8) = "PTAC-1634_Zipcode"
	arrRowID(9) = "PTAC-1635_SSN"
	arrRowID(10)= "CBIZ-1488_LE1.XD28"	'====== Added arrRowID(10), arrRowID(11) and arrRowID(12) to validate KBYO2_CBIZ-14188 ======
    arrRowID(11)= "CBIZ-1488_LE1.XD8"
    arrRowID(12)= "CBIZ-1488_LE1.XD9"
    
    BIZ_LoanCustomFields_OpenCustomForm strFormName1
    BIZ_LoanCustomFields_SelectCustomFields arrRowID,"CustomForm_ValidateFields",arrCustomFields
    
    
    BIZ_InputFormBuilder_Close
    
    '====== Verification of  Existing User-defined Custom Field ======
    BIZ_Login_UserLogin "LoanOfficer"
    'Create New Blank Loan
    BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Loan Officer - Default View","My Pipeline"
    '======== Go to Borrower Summary - Origination Form and input data for some fields ======== 
	BIZ_BorrowerSummaryOrigination_SetBorrower("E2E_KBYO2")'====== Added to validate KBYO2_CBIZ-14188 ======
	BIZ_BorrowerSummaryOrigination_SetProperty("E2E_KBYO2")'====== Added to validate KBYO2_CBIZ-14188 ======
	BIZ_BorrowerSummaryOrigination_SetTransactionDetails("E2E_KBYO2")'====== Added to validate KBYO2_CBIZ-14188 ======
	
	BIZ_OpenCustomForm "CustomForm_ValidateFields"
    BIZ_CustomFieldVerificationOnLoanFile "Date","PTAC-1638_Date",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "Phone","PTAC-1639_Phone",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "Decimal","PTAC-1640_Decimal",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "Yes/No","PTAC-1641_YesorNo",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "DropDown","PTAC-1642_DropDown",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "CheckBox","PTAC-1643_CheckBox",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "String","PTAC-1632_String",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "Integer","PTAC-1630_Integer",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "ZipCode","PTAC-1634_Zipcode",strFormName1 
    BIZ_CustomFieldVerificationOnLoanFile "SSN","PTAC-1635_SSN",strFormName1 
    BIZ_SaveCustomFormLoan "PTAC-1635_SSN"
    
    RunAction "KBYO2_CBIZ-14188_Closing Costs Expiration_01", oneIteration'====== Added to validate KBYO2_CBIZ-14188 ======
    BIZ_Login_UserLogout()
    
	    '====== Delete Existing custom field  ======
	BIZ_Login_UserLogin "admin_core2p"
	BIZ_Nav_OpenMenuItem "Encompass;Settings..."
	BIZ_Nav_HierarchyTree "Loan Setup","Loan Custom Fields"
	For i = 0 To (UBound(arrCustomFields)-3) 
		BIZ_Settings_LoanSetup_DeleteCustomField arrCustomFields(i)
	Next
	
	BIZ_Settings_ClickClose()
	BIZ_Login_UserLogout()
	
	'====== Delete Existing custom forms  ======
	BIZ_InputFormBuilder_Launch
	BIZ_InputFormBuilder_Login "admin_core2p"
	BIZ_InputFormBuilder_DeleteFormFields strFormName1
	BIZ_InputFormBuilder_Close

    FRM_RT_TearDownTest(Null)
    
    '===============End of script================================
    
 


