'@******************************************************************************************
'@ TestStory: PTAC-899 Tables and fees
'@ TestCase: PTAC-200 Verifying the HELOC Table values population in loan origination process for Draw/Repay & vice versa 
'@ Test Automation JIRA Task: PTAC-1031 Settings_TablesandFees_HELOCTable_Check
'@ TestData: 
    '1 Forms_BorrowerSummaryOrigination  SetHeadInfo and PTAC-200
    '2 Forms_BorrowerSummaryOrigination  SetBorrower and PTAC-200
    '3 Forms_BorrowerSummaryOrigination  SetProperty and PTAC-200
	'4 Forms_BorrowerSummaryOrigination  SetTransactionDetails and PTAC-200
	'5 Forms_BorrowerSummaryOrigination  SetSSNVerificationBorrower and PTAC-200  	                
    '6 Forms_1003 PageSetTitleDetails and PTAC-200
    '7 Forms_1003 1003Page2 and PTAC-200 
	'8 Forms_1003 SetEmployment and PTAC-200 
    '9 Forms_2015Itemization, Set800Section, PTAC-200             
    '10  Settings_TablesFees, HelocTable and "PTAC-200_2"
    '11  Settings_TablesFees, HelocTable and "PTAC-195"
'@ Pre-conditions: 
   '1 Go to Settings window > Tables and Fees > HELOC Table,Created HELOC Table 
'@ Description:  NA
'@ TestSteps:
   '1 Create a HELOC table with MMP details.
      'Close Settings window.
      'Select New loan from Loan menu,  go to Borrower Summary - Origination form, set Loan Type as HELOC.
      'Go to REGZ - LE form.
      'Go to HELOC Section
      'Click Edit icon for Draw/Repay Period field and select value as "Draw"
      'Click on Select From Template button
      'Select the appropriate HELOC table with Draw type
      'Click Select and ok button
   '2 Enter the data in Annual Fee
   '3 Create a HELOC table with MMP details. Close Settings window.
      'Select New loan from Loan menu,  go to Borrower Summary - Origination form, set Loan Type as HELOC.
      'Go to REGZ - LE form. Go to HELOC Section. Click Edit icon for Draw/Repay Period field and select value as Repayment
      'Click on Select From Template button. Select the appropriate HELOC table with Repayment type. Click Select and ok button
   '4 Enter the data in Annual Fee
'@ ExpectedResult:
   '1 System Automatically populates the data in Draw field as "12" & Repay period as "0"
   '2 System should able to enter data in  Annual Fee
   '3 System Automatically populates the data in Draw field as "0" & Repay period as "12" 
   '4 System should able to enter data in  Annual Fee 

'********************************************************************************************
'======== Login to the Encompass as admin========     
BIZ_Login_UserLogin "admin_core2p"

'=======Create a Automation folder if not present=============
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"
BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

FRM_Logger_ReportStepEvent "Scenario #1: Verify Create, Edit, Dulpicate, Delete of single record in Heloc Table and Re-Enforcement","Validate Create, Edit, Dulpicate, Delete of single record in Heloc Table and Re-Enforcement", Null 
Dim strRowID, strRowID2, strRowID3, strPopUpText, strHelocTableDrawName, strHelocTableRepaymentName
strRowID="PTAC-200"
strRowID2="PeriodType_Draw"
strRowID3="PeriodType_Repayment"
strPopUpText="Are you sure you want to delete the selected HELOC table.*"
strPopUpText1="Are you sure you want to delete selected year.*"

'====== Navigate to Encompass->Settings and 'Go to Tables and Fees->Heloc ======
FRM_Logger_ReportStepEvent "Step: Test Case #1: Verify Create new scenario in Heloc Table and Verifying the HELOC Table values population in loan origination process for Draw/Repay & vice versa","Creating new a scenario in Heloc Table and Verifying the HELOC Table values population in loan origination process for Draw/Repay & vice versa",Null
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "HELOC Table"

'====== 'Create Heloc Table Record for Draw and Repayment ======
strHelocTableDrawName      = BIZ_Settings_TablesAndFeees_HelocTableCreation (strRowID2)
BIZ_Settings_TablesAndFeees_Verify_HelocTableValues strHelocTableDrawName,strRowID2
strHelocTableRepaymentName = BIZ_Settings_TablesAndFeees_HelocTableCreation (strRowID3)
BIZ_Settings_TablesAndFeees_Verify_HelocTableValues strHelocTableRepaymentName,strRowID3
BIZ_Settings_ClickClose()

'====== 'Create a New Loan ======
FRM_Logger_ReportInfoEvent "Start new Loan Creation","Started new Loan Creation", Null
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"  							
BIZ_BorrowerSummaryOrigination_SetHeadInfo strRowID
BIZ_BorrowerSummaryOrigination_SetBorrower strRowID
BIZ_BorrowerSummaryOrigination_SetSSNVerification_Borrower strRowID
BIZ_BorrowerSummaryOrigination_SetCreditInformation strRowID
BIZ_BorrowerSummaryOrigination_SetProperty strRowID
BIZ_BorrowerSummaryOrigination_SetTransactionDetails strRowID
BIZ_1003Page1_SetEmployment strRowID
BIZ_1003Page1_SetTitleDetails strRowID
BIZ_BorrowerSummaryOrigination_SetProperty_EstateWillBeHeldIn(strRowID)
BIZ_1003Page2_SetMonthlyIncomeExpensesData strRowID
BIZ_Forms_Open "2015 itemization"
BIZ_2015Itemization_Set800Section strRowID

BIZ_TablesAndFeees_Verify_HelocDrawRepayment strHelocTableDrawName,"Draw",strRowID2
BIZ_TablesAndFeees_Verify_HelocDrawRepayment strHelocTableRepaymentName,"Repayment",strRowID3
BIZ_Loan_Exit False

'====== Rename of Newly Created HELOC Table ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Tables and Fees", "HELOC Table"
FRM_Logger_ReportStepEvent "Test Case #2: Verify Rename of Heloc Table","Renaming of Heloc table",Null
strReNameHelocTN=BIZ_Settings_TablesandFeees_HelocTableRename(strHelocTableDrawName,strRowID2)
BIZ_Settings_TablesandFeees_Verify_EditedHelocTableValues strReNameHelocTN,strRowID2

'====== Verify edit the HELOC table & and its MM Details ======
FRM_Logger_ReportStepEvent "Test Case #3: Verify Edit of Heloc Table","Editing of Heloc table",Null
BIZ_Settings_TablesAndFeees_EditHelocTable strReNameHelocTN,"HelocTable_Edit"
BIZ_Settings_TablesandFeees_Verify_EditedHelocTableValues strReNameHelocTN,"HelocTable_Edit"

'====== Verifyduplicate the HELOC table & and its MM Details ======
FRM_Logger_ReportStepEvent "Test Case #4: Verify Duplicate of Heloc Table","Duplicating of Heloc table",Null
strDuplicateHelocTN=BIZ_Settings_TablesAndFeees_DuplicateHelocTable (strReNameHelocTN,"HelocTable_Duplicate")
BIZ_Settings_TablesAndFeees_VerifyHelocTableNameCreatedOrDelete strDuplicateHelocTN,"True"

'====== Verify delete the HELOC table & and its MM Details ======
FRM_Logger_ReportStepEvent "Test Case #5: Verify delete the HELOC table & and its MM Details", "Deletion of the HELOC table & and its MM Details", Null
BIZ_Settings_TablesAndFeees_DeleteHelocTableRecord strReNameHelocTN,strRowID2,strPopUpText1
BIZ_Settings_TablesAndFeees_DeleteHelocTableRecord strDuplicateHelocTN,"HelocTable_Duplicate",strPopUpText1
BIZ_Settings_TablesAndFeees_DeleteHelocTable strReNameHelocTN,strPopUpText
BIZ_Settings_TablesAndFeees_DeleteHelocTable strDuplicateHelocTN,strPopUpText
BIZ_Settings_TablesAndFeees_DeleteHelocTable strHelocTableRepaymentName,strPopUpText
BIZ_Settings_TablesAndFeees_VerifyHelocTableNameCreatedOrDelete strReNameHelocTN,"False"
BIZ_Settings_TablesAndFeees_VerifyHelocTableNameCreatedOrDelete strDuplicateHelocTN,"False"
BIZ_Settings_ClickClose()

'===== To logout from Encompass =====
BIZ_Login_UserLogout()
