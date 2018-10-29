'@******************************************************************************************
'@ TestStory: 
		'CBIZ-14301 KBYO2: Identify Subsequently Paid Charge as a Finance Charge for APR Calculation
'@ TestCase: 
		'1. Calculate Subsequently Paid Finance Charge (New FIeld)
 			'Create new calculation field: SubsequentlyPaidFinanceCharge as 
 			'the sum of all Borrower Paid + Broker Paid + Other Paid amounts in new fee containers PC1, PC2, PC3 and PC4
		'2. Update Finance Charge (Field 1206) Construction Only 
			'i.If Loan Purpose is Construction only, add Subsequently paid finance charge to Finance Charge (1206)
			'ii.Subsequently paid finance charge will not impact Amount Financed (948)
			'iii.Subsequently paid finance charge will not be included in Prepaid Finance Charge (949)
		'3. Update APR Calculation (Field 799) Construction Only=
			'((Estimated Construction Interest (4088) + Prepaid Finance Charges (949) + Subsequent Finance Charge)*100_
			'/(1/2 Commitment Amount - Prepaid Finance Charges (949)))/Construction Period Months*12 Months*
		'4. Update Prepaid Finance Charge (949) calculation to include Subsequently Paid Finance charge for C2P only
			 'i.If loan purpose is Construction to Permanent, include Subsequently Paid Finance Charge in Prepaid Finance Charge (949)
			 'ii.This will impact Amount Financed (reduced in the amount of the subsequently paid finance charge) (Field 948)
             'iii.This will impact Finance charge (increased in the amount of the subsequently paid finance charge) FIeld 1206
         '5. For C2P Loan validate the following scenario:
         	    '◦Construction Management Fields ◾Loan Amount: $50,000
				'◾Construction Period Dates:
				'◾Construction Interest To Date = 04/01/2014
				'◾Construction Interest From Date = 04/01/2014
				'◾Construction First Payment Date = 05/01/2014
				'◾Construction Period End Date = 09/01/2014
				'◾Required Interest Reserves = False
				'◾Construction Rate: 10.5%
				'◾Construction Amortization: Fixed
				'◾Construction Period = 5 months
				'◾Permanent Rate: 10.5%
				'◾Permanent Amortization: Fixed
				'◾Permanent Term = 360 months
				'◾Permanent Due in = 360 Months
				'◦Itemization Fields ◾Origination Charges (APR) = 2% (1000). (Set APR Indicator to true)
				'◾Post Consummation Fee = $300

				'◦Expected results: ◾Estimated Construction Interest: 1093.75
				'◾APR (799): 10.8836%
				'◾Finance Charge (1206): $117046.30
				'◾Amount Financed (948): $48,700
				'◾Total of Payments (1207): $165,746.30
	
'@ Test Automation JIRA Task: 
		'??
'*********************************************************************************************************************
FRM_RT_SetupTest(null)

'===================Create custom form using InputFormBuilder================
Call createCustomForm()


RunAction "Validate_ConstrOnlyLoan", oneIteration

RunAction "Validate_ConstrPermLoan", oneIteration

FRM_RT_TeardownTest(null)




 @@ hightlight id_;_658038_;_script infofile_;_ZIP::ssf5.xml_;_
