'@******************************************************************************************
'@ TestStory: CBIZ-14301: KBYO2: Identify Subsequently Paid Charge as a Finance Charge for APR Calculation
'@ TestCase: 
'@ Test Automation JIRA Task: CTA-400
'@ TestData: Forms_ClosingDisclosurePage
'			 ConstructionManagement
'			 Forms_2015Itemization
'@ Pre-conditions: Construction Only loan should be created with proper data values
'@ Description:  
'@ TestSteps:
	'1 Modify the Construction Only loan tas "Construction Perm"
	'2 Within 2015 itemization modify the PC value so that the summation matches to 300
'@ ExpectedResult: 
'********************************************************************************************
FRM_Logger_ReportStepEvent "Construction to Perm", "Verify APR, Finanace Charge, Amount Financed for 'construction to perm' loan ", Null

'=====================Select Pipeline View and Open the Loan with Loan number====================
BIZ_Nav_SelectPipelineTab()
BIZ_Loan_OpenByLoanNumber FRM_RT_GetPropValue(g_FRM_Prop_LoanNo,False)

'Populate data for Borrower on Costruction Management form with the test data set
BIZ_ConstructionManagement_SetLoanInfo ("CBIZ_14310_ConstrPerm")


BIZ_2015Itemization_Set900Section ("CBIZ_14310_ConstrPerm")

'Modify the post conumation fee for Contr to Perm
BIZ_2015Itemization_ConstrFeeClctedPostConsumation ("CBIZ_14310_ConstrPerm")

'Validate Total Of payments
BIZ_RegZ_CD_VerData("CBIZ_14310_ConstrPerm")

'Clearing the fisrt amort Date as Blank as suggested by Functional Lead

BIZ_Forms_Open "Construction Management"

Set objConstructionPage = SwfWindow("swfname:=MainForm").Page("micclass:=Page","index:=0")

GUI_WebEdit_Set objConstructionPage.WebEdit("html id:=TextBox16"),""

'Validate the subsequent data in Closing Disclosure page 5
BIZ_ClosingDisclosurePage5_VerifyLoanCalculations ("CBIZ_14310_ConstrPerm")


'===========Exit from loan===================
BIZ_Loan_Exit(False)


'=======================Logout of Application========================
BIZ_Login_UserLogout
