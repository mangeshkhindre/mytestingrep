'@******************************************************************************************
'@ TestStory: CBIZ-2621 Add missing field triggers for CD3.X88: LE2.XSTJ
'@ TestCase: CBIZ-2962 TC1-CBIZ-2621-Verify value in custom form with CD3.X88 is update if borrower fee updated -changing total closing costs (LE2.XSTJ) - check for all Purpose of Loan
'@ Test Automation JIRA Task: 
'@ TestData: "Forms_BorrowerSummaryOrigination","SetBorrower","CBIZ2621_BorrwerInfo"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetProperty","CBIZ2621_PropertyInfo"
'@ TestData: "Forms_BorrowerSummaryOrigination","SetTransactionDetails","CBIZ2621_TransactionDetails"
'@ TestData: "Forms_2015Itemization","Set700Section","CBIZ2621_Section700_1"
'@ TestData: "Forms_2015Itemization","Set700Section","CBIZ2621_Section700_2"
'@ Pre-conditions:
'@ Description:Perform all below steps for all types of loan. Check all the values for all type loan purposes. 
'@ TestSteps:
    '1 Create custom form with field ID CD3.X88 from InputFormBuilder.
	'2 Login to Encompass 
	'3 Click on new loan. Enter all basic information as mentioned in the test data.Save the loan.
	'4 Go to LE page 2 and check the 'Use Alternate' checkbox for LE2.X30
	'5 Go to 2015 Itemization form.Enter 1000 value in Borrower NEWHUD2.X1
	'6 Go to Disclosure Tracking and Created LE Record
	'7 Go to newly creted custom form and check value of CD3.X88
	'8 Go to LE Page 2 and check value of LE2.XSTJ
	'9 Go to CD Page 3 and check value of CD3.X88
	'10 Go to 2015 Itemization form.Enter 500 value in Borrower NEWHUD2.X1
	'11 Go to Disclosure Tracking and Created LE Record
	'12 Go to newly creted custom form and check value of CD3.X88
	'13 Go to LE Page 2 and check value of LE2.XSTJ
	'14 Go to CD Page 3 and check value of CD3.X88
'@ ExpectedResult: 1.For step-7,On newly custom form value of CD3.X88 should be equal to NEWHUD2.X1(1000).
'				   2.For step-8,On LE Page 2 value of LE2.XSTJ should be equal to CD3.X88(1000).
'				   3.For step-9,On CD Page 2 value of CD3.X88 should be equal to CD3.X88 from newly created custom form.(1000)
'                  4.For step-12,On newly custom form value of CD3.X88 should be equal to NEWHUD2.X1(500).
'				   5.For step-13,On LE Page 2 value of LE2.XSTJ should be equal to CD3.X88(500).
'				   6.For step-14,On CD Page 2 value of CD3.X88 should be equal to CD3.X88 from newly created custom form.(500)
'********************************************************************************************

'===================Create custom form using InputFormBuilder================
createCustomForm()

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'==================Add Values in Borrower Summary Origination Form===================
BIZ_BorrowerSummaryOrigination_SetBorrower("CBIZ2621_BorrwerInfo")
BIZ_BorrowerSummaryOrigination_SetProperty("CBIZ2621_PropertyInfo")
BIZ_BorrowerSummaryOrigination_SetTransactionDetails("CBIZ2621_TransactionDetails")

fieldTriggerForCD3X88("Purchase")

fieldTriggerForCD3X88("Cash-Out Refinance")

fieldTriggerForCD3X88("NoCash-Out Refinance")

fieldTriggerForCD3X88("ConstructionOnly")

fieldTriggerForCD3X88("ConstructionToPermanent")

fieldTriggerForCD3X88("Other")

'===========Exit from loan===================
BIZ_Loan_Exit(False)

'==================Navigate to home tab==============================
'BIZ_Nav_SelectHomeTab()

'=======================Logout of Application========================
BIZ_Login_UserLogout

'==============Launch Input form builder==================
BIZ_InputFormBuilder_Launch()

'===============login into Input Form builder==================
BIZ_InputFormBuilder_Login "sven_admin"

'=========delete form=====================
BIZ_InputFormBuilder_DeleteForm FRM_RT_GetPropValue("FormName", True)

'=============close input form builder===============
BIZ_InputFormBuilder_Close()
	


