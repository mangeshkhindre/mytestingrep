'@**************************************************************************************************
 '@ TestStory: CTA-242 HMDA 
 '@ TestCase:    
    '1 CTA-242 HMDA -Verify Closing Cost section for Action(1393) = 1.Loan Originated and 6.Purchased Loan (18.1 release)
 '@ Test Automation JIRA Task: CTA-136_VerifyClosingCostSection
 '@ TestData: "HMDA","HMDA_Profile_Creation","CTA-134"
 '@ TestData: "Setttings_CompanyUserSetup", "OrganizationUsers_CreateUser", "BR_NonAdminUser"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "SecondaryMarket_CorrespondentLoan"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "TC1_CBIZ17_BorrowerInfo"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "TC1_CBIZ17_TransactionDetails"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "PTAC-3103" 
 '@ TestData: "Forms_2015Itemization", "Set800Section", "CTA-134"
 '@ TestData: "Forms_1003page", "SetDetailsTransaction", "PTAC-669"
 '@ TestData: "Forms_RegZ-LE", "SetPrepaymentPenalty", "CTA-134"
 '@ TestData: "Forms_RegZ-LE", "SetARM", "PTAC-1583"	
 '@ TestData: "Forms_HMDAInformation", "LoanAndOriginationInformation", "CTA-134"
 '@ Pre-conditions: 
 	'1. User logged into Encompass with Admin credentials. 
	'2. User have created a 'Loan Folder'- HMDA
 '@ Description: 
 '@ TestSteps:
    'CTA-134 Teststeps
     '01 Login to Encompass with the following credentials: admin
     '02 Navigate to Encompass >> Settings >> Loan Setup >> HMDA Profiles
     '03 Click on New HMDA Profiles Add Icon and create a new profile with HMDA Application Date as '745 - Application Date'
     '04 Click on Save and close HMDA Profile form
     '05 Click on Company/User setup--> Orginazation/users. Click on 'Administration' on left side under  'organization'. > Click on Edit Icon.
     '06 Click on + icon next to ' Legal Entity Idetentifier(LEI) on the organization Details Window and select the newly created HMDA Profile in Step 03
     '07 Create a new user
     '08 Logout and Login with Newly created User
     '09 Click on Pipeline and create a new loan under HMDA folder.
	 '10 Fill all the fields in Borrower Summary origination page as per test data.    
	 '11 2015 Itemization-Fill first 6 line item of field 801
	 '12 2015 Itemization-Fill 802e to 802h
	 '13 Navigate to 1003 Page 3 and fill Prepayment section and Amortization section as per test data
	 '14 Navigate to RegZ-LE and fill Details of Transaction section as per test data
     '15 Go to Forms tab and open HMDA Information form
     '16 Update HMDA Reporting Year (HMDA.X27) as 2018
     '17 Select Action Taken as "Loan Originated"
			'a) Verify Total Loan Costs HMDA.X77 = CD2.XSTD
			'b) Verify Total Points and Fees HMDA.X78 = NA
			'c) Verify Origination Charges HMDA.X79 = CD2.XSTA
			'd) Verify Discount Points HMDA.X35 = OrignationCharges1B + OriginationCharges1C
			'e) Verify Lender Credits HMDA.X80 = CD2.XSTLC
			'f) Verify Interest Rate HMDA.X81 = 4113
			'g) Verify Prepayment Penalty Period HMDA.X82 = RE88395.X316
			'h) Verify Loan Term HMDA.X83 = 325
			'i) Verify Intro Rate Period HMDA.X84 = 696
			'j) Verify Property Value HMDA.X85 = 356  
	 '18 Verify that Universal Loan ID(HMDA.X28) should not get generated as Channel is Correspondent			
     '19 Navigate to ATR/QM management and check the QM.X103 checkbox
     '20 Click on HMDA information Page and 
			'a) Verify Total Loan Costs HMDA.X77 = NA
			'b) Verify Total Points and Fees HMDA.X78 = S32DISC.X48    
     '21 Select Reverse Mortgage(HMDA.X56)=1. Reverse Mortgage and 
			'a) Verify Prepayment Penalty Period HMDA.X82 = NA
			'b) Verify Loan Term HMDA.X83 = NA
     '22 Select form RESPA-TILA version = Old GFE and Hud 1
     '23 Verify following:
			'a) Verify Total Loan Costs HMDA.X77 = NA
			'b) Verify Origination Charges HMDA.X79 = NA    
			'c) Verify Discount Points HMDA.X35 = NA
			'd) Verify  Lender Credits HMDA.X80 = NA
     '24 Select form RESPA-TILA version = RESPA-TILA 2015 LE and CD
     '25 Again select form RESPA-TILA version = 2010 GFE and Hud 1     
     '26 Verify following:
			'a) Verify Total Loan Costs HMDA.X77 = NA
			'b) Verify Origination Charges HMDA.X79 = NA    
			'c) Verify Discount Points HMDA.X35 = NA
			'd) Verify  Lender Credits HMDA.X80 = NA
     '27 Select form RESPA-TILA version = RESPA-TILA 2015 LE and CD
     '28 Navigate to Borrower Summary-Origination form and update Channel (2626) - Brokered
     '29 Navigate to HMDA Information and Verify Universal Loan ID(HMDA.X28) should not be generated as Channel (2626) - Brokered 
	 '30 Navigate to Borrower Summary-Origination form and update Channel (2626) - Banked-Retail
	 '31 Navigate to HMDA Information and Verify Universal Loan ID(HMDA.X28) should be generated	 
	 '32 Enter - Reporting LEI (HMDA.X106) = 44444444 and Click on calculate ULI button, select Reporting LEI in popup and click OK
	 '33 Verify that the Verify Universal Loan ID(HMDA.X28) starts with Reporting LEI  44444444 
	 '34 Navigate to ATR/QM management and uncheck the QM.X103 checkbox
     '35 Select Action Taken as "Purchased Loan" and save the loan
			'a) Verify Total Loan Costs HMDA.X77 = CD2.XSTD
			'b) Verify Total Points and Fees HMDA.X78 = NA
			'c) Verify Origination Charges HMDA.X79 = CD2.XSTA
			'd) Verify Discount Points HMDA.X35 = OrignationCharges1B + OriginationCharges1C
			'e) Verify Lender Credits HMDA.X80 = CD2.XSTLC
			'f) Verify Interest Rate HMDA.X81 = 4113
			'g) Verify Prepayment Penalty Period HMDA.X82 = NA
			'h) Verify Loan Term HMDA.X83 = NA
			'i) Verify Intro Rate Period HMDA.X84 = NA
			'j) Verify Property Value HMDA.X85 = 356  
				

 '@ ExpectedResult:
	'01) Total Loan Costs HMDA.X77 = CD2.XSTD
	'02) Total Points and Fees HMDA.X78 = NA
	'03) Origination Charges HMDA.X79 = CD2.XSTA
	'04) Discount Points HMDA.X35 = OrignationCharges1B + OriginationCharges1C
	'05) Lender Credits HMDA.X80 = CD2.XSTLC
	'06) Interest Rate HMDA.X81 = 4113
	'07) Prepayment Penalty Period HMDA.X82 = RE88395.X316
	'08) Loan Term HMDA.X83 = 325
	'09) Intro Rate Period HMDA.X84 = 696
	'10) Property Value HMDA.X85 = 356  
 '**************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: CTA-242","Script Name - HMDA_Verify Closing Cost Section", Null

FRM_Logger_ReportStepEvent "Start Test Step","Verify Closing Cost Section for Action Taken as 'Loan Originated'", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
'Added below code to create Automation Loan Folder 
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"
'Added below code to create Automation Loan Folder 

'====== Create new HMDA Profile ======
BIZ_HMDA_AddNewHMDAProfile "CTA-134"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnEditOrg")
FRM_Logger_ReportInfoEvent "Click on Edit Object","Clicked on Edit Object", Null
GUI_SwfObject_Click SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfObject("swfname:=stdButtonNewHMDAProfile")
FRM_Logger_ReportInfoEvent "Click on Add button","Clicked on Add Button on Legal Entity Identifer", Null

Set objProfileList2 = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfObject("swfname:=gvHMDAProfile")
Set objScrollBar = objProfileList2.SwfScrollBar("swfname:=vPanelScrollBar") 

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CTA-134")

'====== Click on Profile Name======
GUI_List_ClickRow objProfileList2,objScrollBar,"Profile Name",FRM_DS_GetValue(objProfileDetails,"ProfileName"),True,False,False,"Single"

Set objProfileDetails=Nothing
Set objProfileList2 =Nothing

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfButton("swfname:=okBtn")

'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn").Object.PerformClick

'====== Create a new user======
BIZ_OrganizationUsers_CreateUser("BR_NonAdminUser")
'Added to select userGroup and check Automation Loan folder access

Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If
Set objSettingWindow    =nothing
BIZ_Nav_Settings_Close
'Added to select userGroup and check Automation Loan folder access

BIZ_Login_UserLogout()

'====== Login to the Encompass with BR_NonAdminUser profile ======
BIZ_Login_UserLogin "BR_NonAdminUser"

BIZ_Nav_SelectPipelineTab()

'txtPipelineView = SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboView").GetROProperty("selection")

'BIZ_Nav_SelectTabControl("Home")

'BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder trim(txtPipelineView),"My Pipeline"
'Added to maintain cocnsistency
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Administrator - Default View","Automation"

'====== Set Borrower Header Information======
BIZ_BorrowerSummaryOrigination_SetHeadInfo "SecondaryMarket_CorrespondentLoan"

'====== Set Borrower Information======
BIZ_BorrowerSummaryOrigination_SetBorrower "TC1_CBIZ17_BorrowerInfo"

'====== Set Transaction Details Information======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA-134"

'====== Set Subject Property Information======
BIZ_BorrowerSummaryOrigination_SetProperty "PTAC-3103"

'====== Set 2015 Itemization (Our Origination Charge section and Origination / Discount Point Adjustment section)======
BIZ_2015Itemization_Set800Section "CTA-134"

BIZ_Forms_Open "1003 Page 3"

'====== Set 1003 Page 3 (Details of Transaction section)======
BIZ_1003Page3_SetDetailsTransaction "PTAC-669"

BIZ_Forms_Open "RegZ - LE"
	
'====== Set RegZ-LE form (Prepayment section)======
BIZ_RegZ_LE_SetPrepaymentPenalty "CTA-134"

'====== Set RegZ-LE form (Adjustable Rate Mortgage section)======
BIZ_RegZ_LE_SetAdjustableRateMortgage "PTAC-1583"

chkFixedRate=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebCheckBox("html id:=__cid_CheckBox47_Ctrl"),"checked")

'====== Set Action Taken as 'Loan Originated'====== 
BIZ_HMDA_2018LoanAndOriginationInformation "CTA-134"

BIZ_Loan_Save()

'======Verify Universal Loan ID HMDA.X28 should not get generated as Channel is Correspondent=====
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox30").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value","","Universal Loan ID HMDA.X28"
End If

'======Get the value of "Discount Points" HMDA.X35 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox19").Exist(2) Then
	discPts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox19"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then	
	discPts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"value")
End If

If discPts="" Then
	discPts=0
Else
	discPts=clng(discPts)
End If

'======Get the value of "Total Loan Costs" HMDA.X77 fieldfrom "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	totalLoanCosts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	totalLoanCosts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"value")
End If	
totalLoanCosts=Replace(totalLoanCosts,",","")

'============== Changes for 183 Version ===================================

'====== Open ATR/QM Management form======
BIZ_Forms_Open "ATR/QM Management"

'====== Open Qualification tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "Qualification"

'======Get the value of "Total Points and Fees" S32DISC.X48 field from "ATR/QM Management" form======
totPointsFees=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=l_S32DISCX48"),"value")
totPointsFees=Replace(totPointsFees,",","")

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"
'============== Changes for 183 Version ===================================




'======Get the value of "Total Points And Fees" HMDA.X78 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox17").Exist(2) Then
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value")
	'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value","NA","Total Points And Fees HMDA.X78"
	'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value",totPointsFees,"Total Points And Fees HMDA.X78"'183 Change for Validation instead of NA	
    GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value","NA","Total Points And Fees HMDA.X78"'183 Change for Validation instead of NA	

ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78").Exist(2) Then	
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value")
'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value","NA","Total Points And Fees HMDA.X78"
End If
'totalPtFees=Replace(totalPtFees,",","")

'======Get the value of "Origination Charges" HMDA.X79 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox18").Exist(2) Then
	origCharges=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox18"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then	
	origCharges=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"value")
End If
origCharges=Replace(origCharges,",","")

'======Get the value of "Lender Credits" HMDA.X80 fieldfrom "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox20").Exist(2) Then
	lenderCredits=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox20"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80").Exist(2) Then	
	lenderCredits=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"value")
End If

lenderCredits=Replace(lenderCredits,",","")

'======Get the value of "Interest Rate" HMDA.X81 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox21").Exist(2) Then
	intRate=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox21"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81").Exist(2) Then	
	intRate=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81"),"value")
End If
intRate=Replace(intRate,",","")

'======Get the value of "Prepayment Penalty period" HMDA.X82 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox27").Exist(2) Then
	ppp=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox27"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82").Exist(2) Then	
	ppp=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82"),"value")
End If
ppp=Replace(ppp,",","")

'======Get the value of "Loan Term" HMDA.X83 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox24").Exist(2) Then
	loanTerm=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox24"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83").Exist(2) Then	
	loanTerm=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83"),"value")
End If
loanTerm=Replace(loanTerm,",","")

'======Get the value of "Intro Rate Period" HMDA.X84 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox25").Exist(2) Then
	introRatePeriod=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox25"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84").Exist(2) Then	
	introRatePeriod=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84"),"value")
End If
introRatePeriod=Replace(introRatePeriod,",","")

'======Get the value of "Property Value" HMDA.X85 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox29").Exist(2) Then
	propValue=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox29"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85").Exist(2) Then	
	propValue=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85"),"value")
End If
propValue=Replace(propValue,",","")

'====== Open Closing Disclosure Page 1 form======
BIZ_Forms_Open "Closing Disclosure Page 1"

'======Get the value of "Loan Costs" CD2.XSTD field from "Closing Disclosure Page 1" form======
loanCosts=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox88"),"value")
loanCosts=Replace(loanCosts,",","")

If IsNumeric(totalLoanCosts) And IsNumeric(loanCosts) Then	
	If clng(totalLoanCosts)=clng(loanCosts) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" matches with CD2.XSTD Loan Costs "&loanCosts, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" does not matches with CD2.XSTD Loan Costs "&loanCosts, Null
	End If
Else
	If totalLoanCosts=loanCosts Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" matches with CD2.XSTD Loan Costs "&loanCosts, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" does not matches with CD2.XSTD Loan Costs "&loanCosts, Null
	End If
End If

'======Get the value of "Interest Rate" field 4113 from "Closing Disclosure Page 1" form======
interestRate=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox7"),"value")
interestRate=Replace(interestRate,",","")

If IsNumeric(intRate) And IsNumeric(interestRate) Then
	If clng(intRate)=clng(interestRate) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" matches with field 4113 Interest Rate "&interestRate, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" does not matches with field 4113 Interest Rate "&interestRate, Null
	End If
Else
	If intRate=interestRate Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" matches with field 4113 Interest Rate "&interestRate, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" does not matches with field 4113 Interest Rate "&interestRate, Null
	End If
End If




'======Get the value of CD2.XSTLC field from "Closing Disclosure Page 1" form======
cd2xsltc=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=TextBox90"),"value")
cd2xsltc=Replace(cd2xsltc,",","")

If  IsNumeric(lenderCredits) And IsNumeric(cd2xsltc) Then
	If clng(lenderCredits)=clng(cd2xsltc) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" matches with field CD2.XSTLC "&cd2xsltc, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" does not matches with field CD2.XSTLC "&cd2xsltc, Null
	End If	
Else
	If lenderCredits=cd2xsltc Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" matches with field CD2.XSTLC "&cd2xsltc, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" does not matches with field CD2.XSTLC "&cd2xsltc, Null
	End If	
End If


'====== Open Closing Disclosure Page 2 form======
BIZ_Forms_Open "Closing Disclosure Page 2"

'======Get the value of "Total Borrower Paid" CD2.XSTD field from "Closing Disclosure Page 2" form======
amtTotBorrPaid=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox418"),"value")
amtTotBorrPaid=Replace(amtTotBorrPaid,",","")

'======Get the value of "Section Total A" CD2.XSTA field from "Closing Disclosure Page 2" form======
secTotA=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox322"),"value")
secTotA=Replace(secTotA,",","")

If  IsNumeric(origCharges) And IsNumeric(secTotA) Then
	If clng(origCharges)=clng(secTotA) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" does not matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	End If	
Else
	If origCharges=secTotA Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" does not matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	End If
End If

'======Get the value of "OriginationCharges1B" field from "Closing Disclosure Page 2" form======
origCharges1B=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=OriginationCharges1B"),"value")
origCharges1B=Replace(origCharges1B,",","")

If origCharges1B="" Then
	origCharges1B=0
Else
	origCharges1B=clng(origCharges1B)
End If

'======Get the value of "OriginationCharges1C" field from "Closing Disclosure Page 2" form======
origCharges1C=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=OriginationCharges1C"),"value")
origCharges1C=Replace(origCharges1C,",","")

If origCharges1C="" Then
	origCharges1C=0
Else
	origCharges1C=clng(origCharges1C)
End If

If discPts=origCharges1B + origCharges1C Then
	FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X35 Discount Points "&discPts&" matches with the sum of fields origCharges1B and origCharges1C "&origCharges1B + origCharges1C, Null
Else
	FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X35 Discount Points "&discPts&" does not matches with the sum of fields origCharges1B and origCharges1C "&origCharges1B + origCharges1C, Null
End If

'====== Open ATR/QM Management form======
BIZ_Forms_Open "ATR/QM Management"

'====== Open Qualification tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "Qualification"

'======Get the value of "Prepayment Penalty Period" RE88395.X316 field from "ATR/QM Management" form======
prePayPeriod=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=l_X316"),"value")
prePayPeriod=Replace(prePayPeriod,",","")

If IsNumeric(ppp) And IsNumeric(prePayPeriod) Then
	If clng(ppp)=clng(prePayPeriod) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" does not matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
	End If	
Else
	If ppp=prePayPeriod Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" does not matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
	End If	
End If

'CTA-417 start
'====== Open RegZ-CD form======
BIZ_Forms_Open "RegZ - CD"
Set objData = FRM_DS_GetTestData("Forms_RegZ-LE", "Regz_CD", "PTAC-1583")	
'GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_682"),"04/01/2018"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_682"),FRM_DS_GetValue(objData, "FirstPayment_Date")
SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_363").Click
On Error Goto 0  
Set objWshShell = CreateObject("WScript.Shell")
For i = 1 To 3 Step 1
	objWshShell.SendKeys("{TAB}")
Next    
Set objWshShell = Nothing
'GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_L244"),"02/05/2018"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_L244"),FRM_DS_GetValue(objData, "Disb_Date")

Date1 =FRM_DS_GetValue(objData, "Disb_Date")
Date2 =FRM_DS_GetValue(objData, "FirstPayment_Date")
date3=DateDiff("d",Date1,Date2)
'msgbox "date3"&date3

numofmonthsinbet = date3/30
'msgbox "numofmonthsinbet"&numofmonthsinbet

If numofmonthsinbet > 1 Then
	newvar = split(numofmonthsinbet,".")
	newvalue = newvar(0)
	'msgbox "newvalue"&newvalue
else
	newvalue = 1
End If

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"
'======Get the value of "Intro Rate Period" HMDA.X84 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox25").Exist(2) Then
	introRatePeriod=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox25"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84").Exist(2) Then	
	introRatePeriod=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84"),"value")
End If
introRatePeriod=Replace(introRatePeriod,",","")
'msgbox "introRatePeriod"&introRatePeriod
'CTA-417 end
'====== Open RegZ - LE form======
BIZ_Forms_Open "RegZ - LE"

'======Get the value of "Due In" 325 field from "RegZ - LE" form======
dueIn=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_325"),"value")
dueIn=Replace(dueIn,",","")

If IsNumeric(loanTerm) And IsNumeric(dueIn) Then
	If clng(loanTerm)=clng(dueIn) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" matches with field 325 Due In "&dueIn, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" does not matches with field 325 Due In "&dueIn, Null
	End If	
Else
	If loanTerm=dueIn Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" matches with field 325 Due In "&dueIn, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" does not matches with field 325 Due In "&dueIn, Null
	End If	
End If

'======Get the value of "1st Change" 696 field from "RegZ - LE" form======
fstChange=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_696"),"value")
fstChange=Replace(fstChange,",","")

If IsNumeric(fstChange) And IsNumeric(introRatePeriod) Then
	If chkFixedRate="0" Then
		newCal = newvalue + clng(fstChange)
		'msgbox "newCal"&newCal
		If clng(newCal)=clng(introRatePeriod) Then
		'If clng(fstChange)=clng(introRatePeriod) Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" matches with field 696 1st Change "&fstChange, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" does not matches with field 696 1st Change "&fstChange, Null
		End If		
	End If
Else
	If chkFixedRate="0" Then
		If fstChange=introRatePeriod Then
			FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" matches with field 696 1st Change "&fstChange, Null
		Else
			FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" does not matches with field 696 1st Change "&fstChange, Null
		End If
	End If
End If

'msgbox "introRatePeriod after 1 level"&introRatePeriod

'======Get the value of "Appraised Value" 356 field from "RegZ - LE" form======
apprVal=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_356"),"value")
apprVal=Replace(apprVal,",","")

If IsNumeric(propValue) And IsNumeric(apprVal) Then
	If clng(propValue)=clng(apprVal) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	End If	
Else
	If propValue=apprVal Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	End If	
End If

'====== Open ATR/QM Management form======
BIZ_Forms_Open "ATR/QM Management"

'====== Open Qualification tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "Qualification"

'======Get the value of "Total Points and Fees" S32DISC.X48 field from "ATR/QM Management" form======
totPointsFees=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=l_S32DISCX48"),"value")
totPointsFees=Replace(totPointsFees,",","")

'====== Open ATR/QM Eligibility tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "ATR/QM Eligibility"

Set objExemChkBox = SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebTable("html tag:=TABLE","index:=3").WebCheckBox("html id:=__cid_CheckBox1_Ctrl")

'====== Check the QM.X103 checkbox======
If NOT GUI_Object_GetPropertyValue(objExemChkBox,"checked") Then
	GUI_Object_Click objExemChkBox,"WebCheckBox","Check ATR/QM Eligibility Exemption"
	FRM_Logger_ReportInfoEvent "ATR/QM Eligibility Exemption Check Box","Checked ATR/QM Eligibility Exemption Check Box", Null
Else
	FRM_Logger_ReportInfoEvent "ATR/QM Eligibility Exemption Check Box","ATR/QM Eligibility Exemption Check Box is already checked", Null
End If
		
Set objExemChkBox = Nothing

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"

Wait g_TinyWaitSmall

'======Validate the value of "Total Loan Costs" HMDA.X77 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"NA","Field HMDA.X77 = Total Loan Costs"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"NA","Field HMDA.X77 = Total Loan Costs"
End If	



'============== Changes for 183 Version ===================================


'======Validate the value of "Total Points And Fees" HMDA.X78 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox17").Exist(2) Then
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value")
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"NA","Field HMDA.X78 = Total Points And Fees"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78").Exist(2) Then	
	totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value")
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"NA","Field HMDA.X78 = Total Points And Fees"	
End If


'totalPtFees=Replace(totalPtFees,",","")
'
'If IsNumeric(totalPtFees) And IsNumeric(totPointsFees) Then	
'	If clng(totalPtFees)=clng(totPointsFees) Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" does not matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	End If	
'Else
'	If totalPtFees=totPointsFees Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" does not matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	End If	
'End If

'============== Changes for 183 Version ===================================


'====== Select Reverse Mortgage(HMDA.X56)=1. Reverse Mortgage ======
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox34","index:=0"), "1. Reverse mortgage"
FRM_logger_ReportInfoEvent "HMDA.X56_ReverseMortgage","Field HMDA.X56_ReverseMortgage has been set as Reverse mortgage ", null 

'======Validate the value of "Prepayment Penalty period" HMDA.X82 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox27").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox27"),"NA","Field HMDA.X82 = Prepayment Penalty period"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82"),"NA","Field HMDA.X82 = Prepayment Penalty period"
End If

'======Validate the value of "Loan Term" HMDA.X83 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox24").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox24"),"NA","Field HMDA.X83 = Loan Term"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83"),"NA","Field HMDA.X83 = Loan Term"
End If

'======Open form RESPA-TILA -Old GFE and Hud 1======
BIZ_Loan_SwitchFormVersion "Old GFE and HUD-1"

'======Validate the value of "Total Loan Costs" HMDA.X77 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"NA","Field HMDA.X77 = Total Loan Costs"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"NA","Field HMDA.X77 = Total Loan Costs"
End If

'======Validate the value of "Origination Charges" HMDA.X79 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox18").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox18"),"NA","Field HMDA.X79 = Origination Charges"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then		
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"NA","Field HMDA.X79 = Origination Charges"
End If

'======Validate the value of "Discount Points" HMDA.X35 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox19").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox19"),"NA","Field HMDA.X35 = Discount Points"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"NA","Field HMDA.X35 = Discount Points"
End If

'======Validate the value of "Lender Credits" HMDA.X80 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox20").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox20"),"NA","Field HMDA.X80 = Lender Credits"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"NA","Field HMDA.X80 = Lender Credits"
End If

'======Open form RESPA-TILA -RESPA-TILA 2015 LE and CD======
BIZ_Loan_SwitchFormVersion "RESPA-TILA 2015 LE and CD"

'======Open form RESPA-TILA -RESPA 2010 GFE and HUD-1======
BIZ_Loan_SwitchFormVersion "RESPA 2010 GFE and HUD-1"

'======Validate the value of "Total Loan Costs" HMDA.X77 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"NA","Field HMDA.X77 = Total Loan Costs"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"NA","Field HMDA.X77 = Total Loan Costs"
End If	

'======Validate the value of "Origination Charges" HMDA.X79 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox18").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox18"),"NA","Field HMDA.X79 = Origination Charges"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then		
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"NA","Field HMDA.X79 = Origination Charges"
End If

'======Validate the value of "Discount Points" HMDA.X35 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox19").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox19"),"NA","Field HMDA.X35 = Discount Points"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"NA","Field HMDA.X35 = Discount Points"
End If

'======Validate the value of "Lender Credits" HMDA.X80 field to be NA======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox20").Exist(2) Then
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=TextBox20"),"NA","Field HMDA.X80 = Lender Credits"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80").Exist(2) Then	
	GUI_Object_ValidateValue BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"NA","Field HMDA.X80 = Lender Credits"
End If

'======Open form RESPA-TILA -RESPA-TILA 2015 LE and CD======
BIZ_Loan_SwitchFormVersion "RESPA-TILA 2015 LE and CD"

'====== Open Borrower Summary-Origination form======
BIZ_Forms_Open "Borrower Summary - Origination"

'======Update Channel (2626) - "Brokered"======
If  GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox6"), 10) Then
	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox6"), "Brokered"
	FRM_Logger_ReportInfoEvent "Update Channel 2626","Channel has been set as 'Brokered'",null
End If

FRM_Logger_ReportStepEvent "Start Test Step","Verify Closing Cost Section for Action Taken as 'Purchased loan'", Null

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"

'====== Set Action Taken as 'Purchased loan'======
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropDownBox3","index:=4"), "6. Purchased loan"
FRM_logger_ReportInfoEvent "1393_ActionTaken","Field 1393_ActionTaken has been set as 6.Purchased loan", null 

BIZ_Loan_Save()

'======Verify Universal Loan ID HMDA.X28 should not get generated as Channel is Brokered=====
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox30").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value","","Universal Loan ID HMDA.X28"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28"),"value","","Universal Loan ID HMDA.X28"
End If

'====== Open Borrower Summary-Origination form======
BIZ_Forms_Open "Borrower Summary - Origination"
 
'======Update Channel (2626) - "Banked-Retail"======
If  GUI_Object_IsExistX(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox6"), 10) Then
	GUI_WebList_Select SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebList("html id:=DropdownBox6"), "Banked - Retail"
	'Added to handle popup
	wait 2
	If SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").Exist(2) Then
		SwfWindow("swfname:=MainForm").Dialog("text:=Encompass").WinButton("text:=&Yes").Click
	End If
	FRM_Logger_ReportInfoEvent "Update Channel 2626","Channel has been set as 'Banked - Retail'",null
End If

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"

'======Get the value of Universal Loan ID HMDA.X28 field from "2018 HMDA Originated/Adverse Action Loans" form=====
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox30").Exist(2) Then	
	univLoanID=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28").Exist(2) Then
	univLoanID=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28"),"value")
End If	

'======Verify Universal Loan ID HMDA.X28 should get generated as Channel is "Banked-Retail"=====
If univLoanID<>"" Then
	FRM_Logger_ReportPassEvent "Universal Loan ID HMDA.X28 check","Universal Loan ID HMDA.X28 is not blank since Channel is Banked-Retail", Null
Else
	FRM_Logger_ReportFailEvent "Universal Loan ID HMDA.X28 check","Universal Loan ID HMDA.X28 is blank despite Channel being Banked-Retail", Null	
End If

'====== Set Reporting LEI HMDA.X106======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox1").Exist(2) Then
	GUI_WebEdit_Set BIZ_HMDAPageObj.WebEdit("html id:=TextBox1"), "44444444"
	FRM_Logger_ReportInfoEvent "Reporting LEI HMDA.X106", "Reporting LEI HMDA.X106 has been set as '44444444'", Null
End If	

'======Click on Calculate ULI button======
GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=Button1")

'======Select LEI as Reporting LEI======
If GUI_Object_IsExistX(BIZ_HMDAPageObj.SwfWindow("swfname:=HMDAGenerateULIDialog"),10) Then
	GUI_SwfRadioButton_Click BIZ_HMDAPageObj.SwfWindow("swfname:=HMDAGenerateULIDialog").SwfRadioButton("swfname:=reportingRadio")
	FRM_Logger_ReportInfoEvent "Calculate Universal Loan ID Dialog Box", "Reporting LEI radio button has been selected", Null
	GUI_SwfButton_Click BIZ_HMDAPageObj.SwfWindow("swfname:=HMDAGenerateULIDialog").SwfButton("swfname:=okBtn")
Else
	FRM_Logger_ReportFailEvent "Universal Loan ID Dialog Box", "Universal Loan ID Dialog Box does not appear after clicking Calculate ULI button", Null
End If

'======Get the value of Universal Loan ID HMDA.X28 field from "2018 HMDA Originated/Adverse Action Loans" form=====
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox30").Exist(2) Then	
	univLoanID=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28").Exist(2) Then
	univLoanID=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX28"),"value")
End If	

'======Verify Universal Loan ID HMDA.X28 should start with Reporting LEI "44444444"=====
If Left(univLoanID,8)="44444444" Then
	FRM_Logger_ReportPassEvent "Universal Loan ID HMDA.X28","Universal Loan ID HMDA.X28 is "&univLoanID&" which starts with Reporting LEI 44444444", Null
Else
	FRM_Logger_ReportFailEvent "Universal Loan ID HMDA.X28","Universal Loan ID HMDA.X28 is "&univLoanID&" which does not starts with Reporting LEI 44444444", Null	
End If

'====== Open ATR/QM Management form======
BIZ_Forms_Open "ATR/QM Management"

'====== Open ATR/QM Eligibility tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "ATR/QM Eligibility"

Set objExemChkBox = SwfWindow("swfname:=MainForm").Page("micclass:=Page").WebTable("html tag:=TABLE","index:=3").WebCheckBox("html id:=__cid_CheckBox1_Ctrl")

'====== Uncheck the QM.X103 checkbox======
If NOT GUI_Object_GetPropertyValue(objExemChkBox,"unchecked") Then
	GUI_Object_Click objExemChkBox,"WebCheckBox","Uncheck ATR/QM Eligibility Exemption"
	FRM_Logger_ReportInfoEvent "ATR/QM Eligibility Exemption Check Box","Unchecked ATR/QM Eligibility Exemption Check Box", Null
Else
	FRM_Logger_ReportInfoEvent "ATR/QM Eligibility Exemption Check Box","ATR/QM Eligibility Exemption Check Box is already unchecked", Null
End If
		
Set objExemChkBox = Nothing

'====== Open HMDA Information form======

BIZ_Forms_open "HMDA Information"


'*************************'Added below code to cater JIRA CBIZ-16085  changes to HMDA.35 fields.*******************************

FRM_Logger_ReportStepEvent "Verify HMDA.X35 Field","Verify HMDA.X35,HMDA.X77,HMDA.X78,HMDA.X79 for combination 1,0,2 Action Taken as 'Purchased Loan'", Null

'======Get the value of "Total Loan Costs" HMDA.X77 fieldfrom "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	totalLoanCosts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"value","NA","Total Loan Costs HMDA.X77"
End If	

'======Get the value of "Total Points And Fees" HMDA.X78 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox17").Exist(2) Then
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value")
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value","NA","Total Points And Fees HMDA.X78"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78").Exist(2) Then	
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value")
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value","NA","Total Points And Fees HMDA.X78"
End If

'======Get the value of "Origination Charges" HMDA.X79 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox18").Exist(2) Then
	origCharges=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox18"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"value","NA","Origination Charges HMDA.X79"
	
End If


'======Get the value of "Discount Points" HMDA.X35 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox19").Exist(2) Then
	discPts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox19"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"value","NA","Discount Points HMDA.X79"
End If

FRM_Logger_ReportStepEvent "Verify HMDA Fields ","Verify HMDA.X35,HMDA.X77,HMDA.X78,HMDA.X79 for combination 2,2,2 Action Taken as 'Purchased Loan'", Null
'====== Select Reverse Mortgage(HMDA.X56)=2.Not a Reverse Mortgage ======
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX56","index:=0"), "2. Not a reverse mortgage"
FRM_logger_ReportInfoEvent "HMDA.X56_ReverseMortgage","Field HMDA.X56_ReverseMortgage has been set as 2. Not a reverse mortgage ", null 


'====== Select Open-End Line of Credit(HMDA.X57)=2.Not a Reverse Mortgage ======
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=l_HMDAX57","index:=0"), "2. Not an open-end line of credit"
FRM_logger_ReportInfoEvent "HMDA.X57_ReverseMortgage","Field HMDA.X57_Open_Line_of_Credit has been set as 2. Not an open-end line of credit ", null 

'*************************'Added below code to cater JIRA CBIZ-16085  changes to HMDA.35 fields.*******************************


'======Get the value of "Discount Points" HMDA.X35 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox19").Exist(2) Then
	discPts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox19"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then	
	discPts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"value")
End If
discPts=Replace(discPts,",","")

If discPts="" Then
	discPts=0
Else
	discPts=clng(discPts)
End If

'======Get the value of "Total Loan Costs" HMDA.X77 fieldfrom "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox16").Exist(2) Then
	totalLoanCosts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox16"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then	
	totalLoanCosts=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"value")
End If	
totalLoanCosts=Replace(totalLoanCosts,",","")

'======Get the value of "Total Points And Fees" HMDA.X78 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox17").Exist(2) Then
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value")
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox17"),"value","NA","Total Points And Fees HMDA.X78"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78").Exist(2) Then	
	'totalPtFees=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value")
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value","NA","Total Points And Fees HMDA.X78"
End If
'totalPtFees=Replace(totalPtFees,",","")

'======Get the value of "Origination Charges" HMDA.X79 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox18").Exist(2) Then
	origCharges=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox18"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then	
	origCharges=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"value")
End If
origCharges=Replace(origCharges,",","")

'======Get the value of "Lender Credits" HMDA.X80 fieldfrom "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox20").Exist(2) Then
	lenderCredits=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox20"),"value")
	FRM_VerifyEqual lenderCredits,"NA","Total Points And Fees HMDA.X78",null
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80").Exist(2) Then	
	lenderCredits=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"value")
	'FRM_VerifyEqual lenderCredits,"NA","Total Points And Fees HMDA.X78",null
End If
lenderCredits=Replace(lenderCredits,",","")

'======Get the value of "Interest Rate" HMDA.X81 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox21").Exist(2) Then
	intRate=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox21"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81").Exist(2) Then	
	intRate=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81"),"value")
End If
intRate=Replace(intRate,",","")

'======Validate the value of "Prepayment Penalty period" HMDA.X82 field in "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox27").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox27"),"value","NA","Prepayment Penalty period HMDA.X82"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82"),"value","NA","Prepayment Penalty period HMDA.X82"
End If
 
'======Validate the value of "Loan Term" HMDA.X83 field in "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox24").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox24"),"value","360","Loan Term HMDA.X83"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83"),"value","360","Loan Term HMDA.X83"
End If

'======Validate the value of "Intro Rate Period" HMDA.X84 field in "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox25").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox25"),"value","NA","Intro Rate Period HMDA.X84"
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84").Exist(2) Then	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84"),"value","NA","Intro Rate Period HMDA.X84"
End If

'======Get the value of "Property Value" HMDA.X85 field from "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebEdit("html id:=TextBox29").Exist(2) Then
	propValue=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox29"),"value")
ElseIf BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85").Exist(2) Then	
	propValue=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85"),"value")
End If
propValue=Replace(propValue,",","")

'====== Open Closing Disclosure Page 1 form======
BIZ_Forms_Open "Closing Disclosure Page 1"

'======Get the value of "Loan Costs" field from "Closing Disclosure Page 1" form======
loanCosts=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox88"),"value")
loanCosts=Replace(loanCosts,",","")

If IsNumeric(totalLoanCosts) And IsNumeric(loanCosts) Then
	If clng(totalLoanCosts)=clng(loanCosts) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" matches with CD2.XSTD Loan Costs "&loanCosts, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" does not matches with CD2.XSTD Loan Costs "&loanCosts, Null
	End If
Else
	If totalLoanCosts=loanCosts Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" matches with CD2.XSTD Loan Costs "&loanCosts, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X77 Total Loan Costs "&totalLoanCosts&" does not matches with CD2.XSTD Loan Costs "&loanCosts, Null
	End If
End If

'======Get the value of "Interest Rate" field 4113 from "Closing Disclosure Page 1" form======
interestRate=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox7"),"value")
interestRate=Replace(interestRate,",","")

If IsNumeric(intRate) And IsNumeric(interestRate) Then
	If clng(intRate)=clng(interestRate) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" matches with field 4113 Interest Rate "&interestRate, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" does not matches with field 4113 Interest Rate "&interestRate, Null
	End If
Else
	If intRate=interestRate Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" matches with field 4113 Interest Rate "&interestRate, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X81 Interest Rate "&intRate&" does not matches with field 4113 Interest Rate "&interestRate, Null
	End If
End If

'============== Changes for 183 Version ===================================
''======Get the value of CD2.XSTLC field from "Closing Disclosure Page 1" form======
'cd2xsltc=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=TextBox90"),"value")
'cd2xsltc=Replace(cd2xsltc,",","")
'
'If IsNumeric(lenderCredits) And IsNumeric(cd2xsltc) Then
'	If clng(lenderCredits)=clng(cd2xsltc) Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" matches with field CD2.XSTLC "&cd2xsltc, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" does not matches with field CD2.XSTLC "&cd2xsltc, Null
'	End If
'Else
'	If lenderCredits=cd2xsltc Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" matches with field CD2.XSTLC "&cd2xsltc, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X80 Lender Credits "&lenderCredits&" does not matches with field CD2.XSTLC "&cd2xsltc, Null
'	End If
'End If
'============== Changes for 183 Version ===================================
'====== Open Closing Disclosure Page 2 form======
BIZ_Forms_Open "Closing Disclosure Page 2"

'======Get the value of "Total Borrower Paid" CD2.XSTD field from "Closing Disclosure Page 2" form======
amtTotBorrPaid=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox418"),"value")
amtTotBorrPaid=Replace(amtTotBorrPaid,",","")

'======Get the value of "Section Total A" CD2.XSTA field from "Closing Disclosure Page 2" form======
secTotA=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=TextBox322"),"value")
secTotA=Replace(secTotA,",","")

If IsNumeric(origCharges) And IsNumeric(secTotA) Then
	If clng(origCharges)=clng(secTotA) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" does not matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	End If
Else
	If origCharges=secTotA Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X79 Origination Charges "&origCharges&" does not matches with field CD2.XSTA Section Total A amount "&secTotA, Null
	End If
End If

'======Get the value of "OriginationCharges1B" field from "Closing Disclosure Page 2" form======
origCharges1B=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=OriginationCharges1B"),"value")
origCharges1B=Replace(origCharges1B,",","")

If origCharges1B="" Then
	origCharges1B=0
Else
	origCharges1B=clng(origCharges1B)
End If

'======Get the value of "OriginationCharges1C" field from "Closing Disclosure Page 2" form======
origCharges1C=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=OriginationCharges1C"),"value")
origCharges1C=Replace(origCharges1C,",","")

If origCharges1C="" Then
	origCharges1C=0
Else
	origCharges1C=clng(origCharges1C)
End If

If clng(discPts)=clng(origCharges1B) + clng(origCharges1C) Then
	FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X35 Discount Points "&discPts&" matches with the sum of fields origCharges1B and origCharges1C "&origCharges1B + origCharges1C, Null
Else
	FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X35 Discount Points "&discPts&" does not matches with the sum of fields origCharges1B and origCharges1C "&origCharges1B + origCharges1C, Null
End If

'====== Open ATR/QM Management form======
BIZ_Forms_Open "ATR/QM Management"

'====== Open Qualification tab in ATR/QM Management form======
GUI_Swftab_Click SwfWindow("swfname:=MainForm").swfWindow("swfname:=mainPanel").swfTab("swfname:=tabcontrolform") , "Qualification"

''======Get the value of "Total Points and Fees" S32DISC.X48 field from "ATR/QM Management" form======
'totPointsFees=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=l_S32DISCX48"),"value")
'totPointsFees=Replace(totPointsFees,",","")
'
'If IsNumeric(totalPtFees) And IsNumeric(totPointsFees) Then
'	If clng(totalPtFees)=clng(totPointsFees) Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" does not matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	End If
'Else
'	If totalPtFees=totPointsFees Then
'		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	Else
'		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X78 Total Points and Fees "&totalPtFees&" does not matches with field S32DISC.X48 Total Points and Fees "&totPointsFees, Null
'	End If	
'End If

''======Get the value of "Prepayment Penalty Period" RE88395.X316 field from "ATR/QM Management" form======
'prePayPeriod=GUI_Object_GetPropertyValue (SwfWindow("swfname:=MainForm").Swfwindow("swfname:=mainPanel").Page("title:=.*","index:=0").WebEdit("html id:=l_X316"),"value")
'prePayPeriod=Replace(prePayPeriod,",","")
'
'If clng(ppp)=clng(prePayPeriod) Then
'	FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
'Else
'	FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X82 Prepayment Penalty Period "&ppp&" does not matches with field RE88395.X316 Prepayment Penalty Period "&prePayPeriod, Null
'End If

'====== Open RegZ - LE form======
BIZ_Forms_Open "RegZ - LE"
'
''======Get the value of "Due In" 325 field from "RegZ - LE" form======
'dueIn=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_325"),"value")
'dueIn=Replace(dueIn,",","")
'
'If clng(loanTerm)=clng(dueIn) Then
'	FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" matches with field 325 Due In "&dueIn, Null
'Else
'	FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X83 Loan Term "&loanTerm&" does not matches with field 325 Due In "&dueIn, Null
'End If
'
'======Get the value of "1st Change" 696 field from "RegZ - LE" form======
fstChange=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_696"),"value")
fstChange=Replace(fstChange,",","")
'msgbox "introRatePeriod after 2 level"&introRatePeriod
If IsNumeric(fstChange) And IsNumeric(introRatePeriod) Then
	newCal = newvalue + clng(fstChange)
	'msgbox "newCal"&newCal
	If clng(newCal)=clng(introRatePeriod) Then
	'If clng(fstChange)=clng(introRatePeriod) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" matches with field 696 1st Change "&fstChange, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" does not matches with field 696 1st Change "&fstChange, Null
	End If
Else
	If fstChange=introRatePeriod Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" matches with field 696 1st Change "&fstChange, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X84 Intro Rate Period "&introRatePeriod&" does not matches with field 696 1st Change "&fstChange, Null
	End If
End If


'======Get the value of "Appraised Value" 356 field from "RegZ - LE" form======
apprVal=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*", "index:=0").WebEdit("html id:=l_356"),"value")
apprVal=Replace(apprVal,",","")

If IsNumeric(propValue) And IsNumeric(apprVal) Then
	If clng(propValue)=clng(apprVal) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	End If	
Else
	If propValue=apprVal Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X85 Property Value "&propValue&" matches with field 356 Appraised Value "&apprVal, Null
	End If	
End If

BIZ_Loan_Exit "False"

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
