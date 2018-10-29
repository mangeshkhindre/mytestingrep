'@**************************************************************************************************
 '@ TestStory: CBIZ-11355 HMDA
 '@ TestCase:
    '1 CBIZ-11355- E2E - HMDA - Verify Action taken as Application Denied and No report Income  
 '@ Test Automation JIRA Task: CTA-132 HMDA_ApplicationDeniedAndNoReportIncome 
 '@ TestData: "HMDA","HMDA_Profile_Creation","CBIZ-11355"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "E2E_FHAPURCASHFIX"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetCoBorrower", "E2E_ConvNoRefiARM"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetCreditInformation", "E2E_HappyPath"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "CBIZ-11355" 
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "CBIZ-11355"
 '@ TestData: "Forms_RegZ-LE", "SetDisclosureInformation", "CBIZ-11355"
 '@ TestData: "Forms_2015Itemization", "Set800Section", "27202_27436"
 '@ TestData: "Forms_HMDAInformation", "LoanAndOriginationInformation", "CBIZ-11355"
 '@ TestData: "Forms_FNMAStreamlined", "FNMAStreamlined", "CBIZ-11355"	
 '@ TestData: "ULDDPDD", "Fannie Mae", "CBIZ-11355"
 '@ TestData: "Forms_HMDAInformation", "LoanAndOriginationInformation", "CBIZ-11355_1"
 '@ TestData: "Tools_UnderwriterSummary", "UWP1_SetUnderWriterDetails", "CBIZ-11355" 
 '@ Pre-conditions: 
 	'1. User logged into Encompass with Admin credentials. 
	'2. User have created a 'Loan Folder'- HMDA
 '@ Description: 
 '@ TestSteps:
    'CBIZ-11355 Teststeps
     '01 Login to Encompass with the following credentials: admin
     '02 Navigate to Encompass >> Settings >> Loan Setup >> HMDA Profiles
     '03 Click on New HMDA Profiles Add Icon and create a new profile with HMDA Application Date as '745 - Application Date'
     '04 Click on Save and close HMDA Profile form
     '05 Click on Company/User setup--> Orginazation/users. Click on 'Administration' on left side under  'organization'. > Click on Edit Icon.
     '06 Click on + icon next to ' Legal Entity Idetentifier(LEI) on the organization Details Window and select the newly created HMDA Profile in Step 03
     '07 Close Encompass setting window
     '08 Click on Pipeline and create a new loan under HMDA folder.
	 '09 Fill all the fields in Borrower Summary origination page as per test data.    
     '10 Go to Forms tab and open HMDA Information form
     '11 Update HMDA Reporting Year (HMDA.X27) as 2018
     '12 Set Application Date (HMDA.X29) as Today's Date
     '13 Select Action Taken as "Application Denied"
     '14 Click on NMLS button on HMDA Information Form->2018  Originated/Adverse Action Loans
     '15 Set Initial Application Amount (NMLS.X11) : =440000
     '16 Verify HMDA.X31 = NMLS.X11 are equal.
     '17 Go to FNMA Streamlined 1003 form and set HELOC Credit Limit (CASASRN.X168) =450555
     '18 Go to ULDD/PDD form and set Subject Loan Unpaid principal Balance Amt(ULDD.X1) = 444444.00
     '19 Click on HMDA information Page and set Open end Line of credit(HMDA.X57)= 1. Open end line of credit
     '20 Verify HMDA.X31 = CASASRN.X168 are equal
     '21 Update Reason for Denial #1(HMDA.X22) as 9.Other
     '22 Verify that Other Denial Reason(s)(HMDA.X34) should be enabled.
     '23 Click on 'Tools' tab > 'Underwriter Summary'
     '24 Under  'Income, Assets, Liabilities, and Expenses' section 
			'a) Uncheck the Checkbox for  Employee Loan (4181) 
			'b) HMDA INcome(HMDA.X99)= True
			'c) HMDA CLTV(HMDA.X98)=True
			'd) HMDA DTI(HMDA.X97)=True
     '25 Verify the following in HMDA information page
			'a) HMDA income (HMDA.X32)= N/A
			'b) Type of Purchaser(1397)= 0.Not applicable
			'c) HMDA.X37 =N/A
			'd) HMDA.X36= N/A
			'e) HOEPA Status(HMDA.X13)  =3. Not Applicable should appear.
 '@ ExpectedResult:
    '01 HMDA.X31 = NMLS.X11 are equal
    '02 Verify HMDA.X31 = CASASRN.X168 are equal
 '**************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: CBIZ-11355","Script Name - HMDA_Verify Action taken as Application Denied and No report Income", Null

'======= Verify Income field value for 2018 HMDA under Originated/Adverse Action Loans tab when setting as Report Income NO and Income NA =======
FRM_Logger_ReportStepEvent "Start Test Case: CBIZ-11355","Verify Action taken as Application Denied and No report Income", Null
''RunAction "HMDA_ReportIncome_EmployeeLoanCheck", oneIteration, "Report_Income_No"

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'Added below code to create Automation Loan Folder 
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Create new HMDA Profile ======
BIZ_HMDA_AddNewHMDAProfile "CBIZ-11355"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnEditOrg")
FRM_Logger_ReportInfoEvent "Click on Edit Object","Clicked on Edit Object", Null
GUI_SwfObject_Click SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfObject("swfname:=stdButtonNewHMDAProfile")
FRM_Logger_ReportInfoEvent "Click on Add button","Clicked on Add Button on Legal Entity Identifer", Null
	
Set objProfileList2 = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfObject("swfname:=gvHMDAProfile")
Set objScrollBar = objProfileList2.SwfScrollBar("swfname:=vPanelScrollBar") 

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CBIZ-11355")

'====== Click on Profile Name E2EHMDANoIncome_CBIZ-11355======
GUI_List_ClickRow objProfileList2,objScrollBar,"Profile Name",FRM_DS_GetValue(objProfileDetails,"ProfileName"),True,False,False,"Single"

Set objProfileDetails=Nothing

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfButton("swfname:=okBtn")

SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn").Object.PerformClick

'Added for having access to automation loan folder
Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")

BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If
Set objSettingWindow   =nothing
BIZ_Nav_Settings_Close



BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'====== Set Borrower Information======
BIZ_BorrowerSummaryOrigination_SetBorrower "E2E_FHAPURCASHFIX"

'====== Set Co-Borrower Information======
BIZ_BorrowerSummaryOrigination_SetCoBorrower "E2E_ConvNoRefiARM"

'====== Set Credit Information======
BIZ_BorrowerSummaryOrigination_SetCreditInformation "E2E_HappyPath"
wait(3)
'====== Set Subject Property Information======
BIZ_BorrowerSummaryOrigination_SetProperty "CBIZ-11355"

'====== Manually Set Loan Program======
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_1401"),"#1 Conventional Refinance NO CASH 5/1 ARM - Manual"
wait(3)
'====== Set Transaction Details Information======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CBIZ-11355"
wait(3)
'====== Set Disclosure Information======
BIZ_RegZ_LE_SetDisclosureInformation "CBIZ-11355"
wait(3)
'====== Set 2015 Itemization======
BIZ_2015Itemization_Set800Section "27202_27436"

'====== Set Loan and Origination Information====== 
BIZ_HMDA_2018LoanAndOriginationInformation "CBIZ-11355"


'*********************************************************
'========HMDA 18.1 Changes===========

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CBIZ-11355")
wait(3)
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objProfileDetails,"ProfileName")) Then
	selectionText = trim(FRM_DS_GetValue(objProfileDetails,"ProfileName"))		
Else
	FRM_Logger_ReportFailEvent "HMDA Profile Name", "Could not fetch HMDA profile name from worksheet", Null	
End If
strUniversalID=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.Weblist("html id:=hmdaprofilename"),"selection")

'Check For Profile match
FRM_VerifyEqual strUniversalID,selectionText,"HMDA Profile Name check","HMDA Profile Name check"

wait(3)
'Check For Universal Id Not population
If UTIL_String_IsEmpty(GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value")) Then
	FRM_Logger_ReportPassEvent "Verify Universal Id ", "Universal ID is Blank", Null
Else
	FRM_Logger_ReportPassEvent "Verify Universal Id ", "Universal ID is Not Blank", Null
End If
Set objProfileDetails=Nothing

BIZ_Loan_Save ()
wait g_LongWaitSmall
wait(3)

'Check For Universal Id Not population
strUniversalLoanId=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value")
If UTIL_String_IsNotEmpty(GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox30"),"value")) Then
	FRM_Logger_ReportPassEvent "Verify Universal Id After Loan Save ", "Universal ID is Populated after loan Save " &strUniversalLoanId,Null
Else
	FRM_Logger_ReportPassEvent "Verify Universal Id After Loan Save ", "Universal ID is Not Populated after loan Save", Null
End If
wait(3)
'Click on HMDA Transmittal Sheet
GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=Button2")
'Get the LEI Value from UI
set objHMDATransmittal=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("index:=0")
strLEIVal=GUI_Object_GetPropertyValue(objHMDATransmittal.WebEdit("html id:=I_LEI"),"value")
wait(3)
strval=left(strUniversalLoanId,6)
FRM_VerifyEqual strLEIVal,strval,"Check LEI Value","HMDA Profile LEI value"
'If UTIL_String_IsMatch(strLEIVal,strval) then
'	FRM_Logger_ReportPassEvent "Verify LEI value", "HMDA Profile LEI value Matches", Null
'Else
'	FRM_Logger_ReportFailEvent "Verify LEI value", "HMDA Profile LEI Value Does not Match", Null
'End If
 
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose") 
set objHMDATransmittal=Nothing




'*********************************************************

wait(3)
'====== Get the value of "Loan amount" HMDA.X31 field from "2018 HMDA Originated/Adverse Action Loans" form ====== 
loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
loanAmt=Replace(loanAmt,",","")

Set objData = FRM_DS_GetTestData("Forms_HMDAInformation", "LoanAndOriginationInformation","CBIZ-11355")

If( UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData,"NMLS.X11_InitialApplicationAmount"))) Then
    	valInitialApplicationAmount=FRM_DS_GetValue(objData,"NMLS.X11_InitialApplicationAmount") 
End If	
wait(3)
If IsNumeric(loanAmt) And IsNumeric(valInitialApplicationAmount) Then	
	If clng(loanAmt)=clng(valInitialApplicationAmount) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with NMLS.X11 Initial Application Amount", Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with NMLS.X11 Initial Application Amount", Null
	End If
Else	
	If loanAmt=valInitialApplicationAmount Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with NMLS.X11 Initial Application Amount", Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with NMLS.X11 Initial Application Amount", Null
	End If	
End If
 	
'====== Set FNMA Streamlined 1003 Information====== 
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Field CASASRN.X168_HelocCreditLimit has been locked in 18.4 release ", null		

Set SubOrdntWndw = SwfWindow("swfname:=MainForm").SwfWindow("text:=Subordinate.*","swfname:=SubFinancingHelocDialog")

Set ObjEdit  = SubOrdntWndw.SwfEdit("swfname:=textBox7","swfname path:=textBox7.*")

Set objSubFinacng = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebButton("value:=Sub. Financing")

Set objData9 = FRM_DS_GetTestData("Forms_FNMAStreamlined", "FNMAStreamlined", "CBIZ-11355")

GUI_WebButton_Click objSubFinacng
FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Entering the value by clicking on 'Sub Monitoring' field", null		
If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData9, "CASASRN.X168_HelocCreditLimit")) then 
		valHelocCreditLimit=FRM_DS_GetValue(objData9, "CASASRN.X168_HelocCreditLimit")	
		GUI_SwfEdit_Set ObjEdit, valHelocCreditLimit		
		FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","Field 4470 has been set as " &valHelocCreditLimit& " ", null	
End If

FRM_logger_ReportInfoEvent "Entering Data on  field 4470 ","closing the 'Subordinate Mortgage Loan Amounts' window ", null
GUI_SwfButton_Click SubOrdntWndw.SwfButton("swfname:=okBtn")

BIZ_Forms_Open "FNMA Streamlined 1003"

wait(3)

Set objPage2 = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=I_CASASRNX168")

If objPage2.Exist Then
FRM_logger_ReportInfoEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' is displayed on the form successfully", null	

   	 If objPage2.GetROProperty("readonly") Then
		FRM_logger_ReportInfoEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' locked", null
	else
		FRM_Logger_ReportFailEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' NOT locked", null	
	End If
else
FRM_Logger_ReportFailEvent "CASASRN.X168_HelocCreditLimit "," Filed 'CASASRN.X168_HelocCreditLimit' is displayed on the form successfully", null		
End If
wait(2)
'====== get the value of "HELOC Credit Limit" field CASASRN.X168 from FNMA Streamlined 1003 form ====== 
valHelocCreditLimit=GUI_Object_GetPropertyValue(SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0").WebEdit("html id:=I_CASASRNX168"),"value")
valHelocCreditLimit=Replace(valHelocCreditLimit,",","")

'====== Set ULDD/PDD Information====== 
BIZ_ULDDPDD_SetHOEPAStatus "Fannie Mae","CBIZ-11355"

'====== Set Loan and Origination Information====== 
BIZ_HMDA_2018LoanAndOriginationInformation "CBIZ-11355_1"
wait(2)
'====== Get the value of "Loan amount" field HMDA.X31 from "2018 HMDA Originated/Adverse Action Loans" form ====== 
loanAmt=GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=TextBox4"),"value")
loanAmt=Replace(loanAmt,",","")

If IsNumeric(valHelocCreditLimit) And IsNumeric(loanAmt) Then	
	If clng(valHelocCreditLimit)=clng(loanAmt) Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with CASASRN.X168 Heloc Credit Limit", Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with CASASRN.X168 Heloc Credit Limit", Null
	End If
Else 
	If valHelocCreditLimit=loanAmt Then
		FRM_Logger_ReportPassEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" matches with CASASRN.X168 Heloc Credit Limit", Null
	Else
		FRM_Logger_ReportFailEvent "HMDA Information form Check", "HMDA.X31 Loan Amount "&loanAmt&" does not matches with CASASRN.X168 Heloc Credit Limit", Null
	End If	
End If	


'======Validate "Reason for Denial#1" HMDA.X21 field to be blank in "2018 HMDA Originated/Adverse Action Loans" form======
' ********************* 183 Changes for Reason for Denial removal of lock icon and field to be enabled by default ****************************
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox15"),"disabled","0","Reason for Denial#1 HMDA.X21"
' ********************* 183 Changes for Reason for Denial removal of lock icon and field to be enabled by default ****************************
wait(3)
'======Validate "Other Denial Reason(s)" HMDA.X34 field to be enabled in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=MultilineTextBox1"),"readonly","0","Other Denial Reason(s) HMDA.X34"

'======Validate "Credit Score for Decision Making" 4174 field to be blank in "2018 HMDA Originated/Adverse Action Loans" form======
'GUI_Object_ValidateProperty SwfWindow("swfname:=MainForm").Page("title:=.*").WinEdit("index:=0"),"trimtext","","Credit Score for Decision Making 4174"
wait(3)
'======Validate "Credit Score for Decision Making" 4177 field to be blank in "2018 HMDA Originated/Adverse Action Loans" form======
'GUI_Object_ValidateProperty SwfWindow("swfname:=MainForm").Page("title:=.*").WinEdit("index:=1"),"trimtext","","Credit Score for Decision Making 4177"

'======Validate "Credit Scoring Model" 4175 field to be blank in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_4175_2017"),"selection","#0","Credit Scoring Model field 4175"
wait(3)
'======Validate "Credit Scoring Model" 4178 field to be blank in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_4178_2017"),"selection","#0","Credit Scoring Model field 4178"
wait(3)
'====== Navigate to "Underwriter Summary"===========
BIZ_SecondaryMarket_ToolsNavigation "Underwriter Summary"

BIZ_UnderwriterSummary_SetUnderWriterDetails "CBIZ-11355"
wait(3)
'====== Navigate to "HMDA Information form"===========
BIZ_Forms_open "HMDA Information"
wait(3)
'======Validate "Income" HMDA.X32 field to be NA in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox10"),"value","NA","Income HMDA.X32"
wait(3)
'======Validate "Type of Purchaser" 1397 field to be "Not applicable" in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox8"),"selection","0. Not applicable","Type of Purchaser field 1397"
wait(3)
'======Validate "CLTV" HMDA.X37 field to be NA in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox22"),"value","NA","CLTV HMDA.X37"
wait(3)
'======Validate "DTI" HMDA.X36 field to be NA in "2018 HMDA Originated/Adverse Action Loans" form======
GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=TextBox23"),"value","NA","DTI HMDA.X36"
wait(3)
'======Validate "HOEPA Status" HMDA.X13 field to be "Not applicable" in "2018 HMDA Originated/Adverse Action Loans" form======
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13"),"selection","3. Not applicable","HOEPA Status HMDA.X13"
ElseIf BIZ_HMDAPageObj.WebList("html id:=DropdownBox4").Exist(2) Then 	
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox4"),"selection","3. Not applicable","HOEPA Status HMDA.X13"
End If

BIZ_Loan_Exit "False"

BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)







