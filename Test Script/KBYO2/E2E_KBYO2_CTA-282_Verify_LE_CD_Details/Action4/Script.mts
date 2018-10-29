'@******************************************************************************************
'@ TestStory: KBYO2: Automate End to End flow on LE page and CD Page
'@ TestCase: CBIZ-12551 KBYO2 - QA Only Update escrowed description flags on LE and CD
'@ Test Automation JIRA Task: CTA-280
'@ TestData: "Global_Data", "Login", "admin_core2p"
'@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "CBIZ_12551"
'@ TestData: "Forms_RegZ-LE", "SetConstruction", "CBIZ_12551"
'@ TestData: "Forms_2015Itemization", "Set900Section", "CBIZ_12551"
'@ TestData: "Forms_2015Itemization", "Set1000Section", "CBIZ_12551_903SetRate"
'@ TestData: "Forms_2015Itemization", "Set1000Section", "CBIZ_12551"	
'@ TestData: "Forms_AggregateEscrowAccount", "SetData", "CBIZ_12551"
'@ Pre-conditions: Login credentials for Encompass with Admin user is available.
'@ Description: Impacts fields: LE1.X30, LE1.X31, LE1.X32, CD1.X4, CD1.X5, CD1.X6
'For each, update rules for partially escrowed to display "Some" instead of "Yes, Some."
'No change to current rules for determining if escrow line is partially escrowed, this update is just for verbiage rendered in the fields.
'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Go to Borrower Summary - Origination page and enter the test data as given in Test data column of CTA-282, step 22.
	'3 Go to 2015 Itemization form. Enter the test data as given in Test Data column of CTA-282, step 23.
	'4 Go to Line 1011. Click Aggregate Set up. Enter data as per Test data column of CTA-282, step 24.
	'5 Go to Loan Estimate page 1, Verify LE1.X30, LE1.X31, LE1.X32
	'6 Go to Closing Disclosure page 1, verify CD1.X4, CD1.X5, CD1.X6
'@ ExpectedResult: 
	'1. User should be able to log in.
	'2. Loan should be created and saved
	'3. Data should be entered successfully.
	'4. Data should be entered successfully.
	'5. It should display "Some".
	'6. It should display "Some".
'********************************************************************************************
'====== Login to the Encompass as admin =====
BIZ_Login_UserLogin "admin_core2p"

'Commented below code as it is covered in KBYO2_CBIZ-12556_LE and CD rounding rules per KBYO2 Guidance action
''=======Create a Automation folder if not present=============
'BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
'BIZ_Settings_CreateLoanFolder "Automation","OFF","ON"

'====== Create Loan ======
FRM_Logger_ReportInfoEvent "Start create new Conventional Loan;Purchase","Start creating new Conventional Loan; Purchase",Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'====== Enter data in Borrower Summary - Origination page ======
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CBIZ_12551"

'====== Enter values in RegZ - LE form ======
BIZ_Forms_Open "RegZ - LE"
BIZ_RegZ_LE_SetConstructionMortgage "CBIZ_12551"

BIZ_Forms_Open "2015 Itemization"

'Set data in 900 section
BIZ_2015Itemization_Set900Section "CBIZ_12551"

'Set data in Rate edit field value under 903 section
BIZ_Forms_2015Itemization_EditFieldValueButton_SetRate "CBIZ_12551_903SetRate","Insurance"

'Set data in Rate edit field value under 1004 section
BIZ_Forms_2015Itemization_1004_EditButtonTaxWin_SetRate "CBIZ_12551"

'Set data in 1000 section
BIZ_2015Itemization_Set1000Section "CBIZ_12551"

'====== Set Data in Initial Escrow Account SetUp Screen ======
BIZ_Forms_Open "Aggregate Escrow Account"
BIZ_AggregateEscrowAccount_InitialEscrowAccountSetUp_SetData "CBIZ_12551"

'====== Save and get loan number ======
BIZ_Loan_Save()

'====== Verify Escrowed Description Flags ======
verify_escrowed_description_flags()




'====== Exit the loan ======
BIZ_Loan_Exit(False)


