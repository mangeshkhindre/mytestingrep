'@******************************************************************************************
'@ Test Automation JIRA Task: CTA-400
'@ TestData: "Forms_2015Itemization","Forms_ClosingDisclosurePage","ConstructionManagement","Forms_RegZ_CD"
'@ Pre-conditions:
'@ Description: Auto_CBIZ-14310 form should be displayed within the forms section
'@ TestSteps:
    '1 Create Construction Only Loan.
	'2 Login to Encompass 
	'3 Click on new loan. Enter all basic information as mentioned in the test data.Through Construction Mangement Form save it as "constr only".
	'4 Go to Closing Disclosure page and validate the field values
	'5 Go to 2015 Itemization form.Enter 2 % within 800 section (Origination Charges (APR) = 2% (1000). (Set APR Indicator to true))
	'6 Enter the Post Consummation fess within PC1-PC4
	'7.Go to newly creted custom form and check value of NEWHUD2.X4768 (Subsequently Paid Finance Charges)
	'8 Go to Reg Z CD Page and check value of 949 (Prepaid Finance Charges)
	'9 Go to 2015 Itemization form.Check the value of Amount Financed and Updated APR
'@ ExpectedResult: 1.For step-4,The Finanace Charge and Annual Percentage value should be respectively '1,093.75' and '10.5' 
'				   2.For step-7,On  opening custom form 'CBIZ_14310'  the Subsequently paid finance charge should be the same value for addition of PC fields
'				   3.For step-8, On opening RegZ CD Prepaid Finance charges should have the same value as the Origination charges APR (PC fields shouldn't get added)
'                  4.For step-9, On opening Closing disclosure Page 5 finance charge should include Subsequently Finance Charge and prepaid charge to the primary value
'								 Amount Finance should get reduced according the the value entered in Prepaid Finance Charges
'								 APR should get updated according the the values entered (Field 799), -> ((1093.75+1000+700)*100)/((50000*0.5)-1000)/5*12)
'********************************************************************************************

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "sven_admin"

'=====================Select Pipeline View and Create a new blank loan====================
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'==================Add Values in Borrower Summary Origination Form===================
BIZ_ConstructionManagement_SetLoanInfo ("E2E_KBYO2_CBIZ_14310")

BIZ_ClosingDisclosurePage5_VerifyLoanCalculations ("CBIZ_14310_ConstrOnly_Itr1")

BIZ_2015Itemization_Set800Section ("CBIZ_14310")

BIZ_2015Itemization_ConstrFeeClctedPostConsumation ("CBIZ_14310")

'Subsequently paid Finance Charges= PC1+PC2+PC3+PC4 --> paid By borrower

Call verifyNEWHUD2_X4768Value("CBIZ_14310", "Contruction Only")

'Prepaid Finance should not get impacted on Subsequently paid Finance Charges

BIZ_RegZ_CD_VerData("CBIZ_14310_ConstrOnly")

'After entering values in PC--PC4 the same valus should get added within 1206 (APR) for Constr Only Loan

BIZ_ClosingDisclosurePage5_VerifyLoanCalculations ("CBIZ_14310_ConstrOnly_Itr2")


''==============Launch Input form builder==================
'BIZ_InputFormBuilder_Launch()
'
''===============login into Input Form builder==================
'BIZ_InputFormBuilder_Login "sven_admin"
'
''=========delete form=====================
'BIZ_InputFormBuilder_DeleteForm FRM_RT_GetPropValue("FormName", True)
'
''=============close input form builder===============
'BIZ_InputFormBuilder_Close()
	


