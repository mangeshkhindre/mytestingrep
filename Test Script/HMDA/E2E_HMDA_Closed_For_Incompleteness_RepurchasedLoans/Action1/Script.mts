'@**************************************************************************************************
 '@ TestStory: CTA139-HMDA_E2E
 '@ TestCase:
    '1 CTA139_Verify_ActionTaken_File_Closed_For_Incompleteness_RepurchasedLoans
 '@ Test Automation JIRA Task: CTA139_Verify_ActionTaken_File_Closed_For_Incompleteness_RepurchasedLoans
 '@ TestData: 
 '@ Pre-conditions: 
 	'1. User logged into Encompass with Admin credentials. 
	'2. User have created a 'Loan Folder'- HMDA
 '@ Description: 
 '@ TestSteps:
    'CTA139 Teststeps
     '01 Login to Encompass with the following credentials: admin
     '02 Navigate to Encompass >> Settings >> Loan Setup >> HMDA Profiles
     '03 Click on New HMDA Profiles Add Icon and create a new profile with HMDA Application Date as '745 - Application Date'
     '04 Click on Save and close HMDA Profile form
     '05 Click on Company/User setup--> Orginazation/users. Click on 'Administration' on left side under  'organization'. > Click on Edit Icon.
     '06 Click on + icon next to ' Legal Entity Idetentifier(LEI) on the organization Details Window and select the newly created HMDA Profile in Step 03
     '07 Close Encompass setting window
     '08 Click on Pipeline and create a new loan under HMDA folder.
	 '09 Fill all the fields in Borrower Summary origination page as per test data.    
	 '09 Fill all the fields in 1003 Page 3 page as per test data. 
	 '09 Fill all the fields in 2015 Itemisation page as per test data. 
	 '09 Fill all the fields in RegZ-LE page as per test data.
	' 10 Got HMDa information PAge and vand repurchase dat as todays date ,ULDD.X172=1. Site Built
	'Validate 2 tabs are cretae
	'Loan Type (HMDA.X30)= Conventional
	'Action Taken = 6. Purchased Loan (Disabled)
	'Type of Purchaser(1397)= 0. Not Applicable
	'HOEPA Status(HMDA.X13)= 3. Not Applicable	 
     'Verify Total Loan Costs HMDA.X77 = NA 
	'"Verify Total Points and Fees HMDA.X78 = NA
	'"
	'"Verify Origination Charges HMDA.X79 = CD2.XSTA
	'"
	'Verify Discount Points HMDA.X35 = OrignationCharges1B + OriginationCharges1C
	'Verify Lender Credits HMDA.X80 = CD2.XSTLC
	'Verify Interest Rate HMDA.X81 = NA
	'Verify Prepayment Penalty Period HMDA.X82 = RE88395.X316
	'Verify Loan Term HMDA.X83 = 325
	'Verify Intro Rate Period HMDA.X84 = NA
	'Balloon Payment(1659) =NO
	'Interest Only(2982)=No
	'Negative Amortization(NEWHUD.X6)=No
	'Verify Property Value HMDA.X85 = NA
	'Manufactured Secured Property Type(HMDA.X39)=3. Not Applicable
	'Manufactured Home Land Property Interest(HMDA.X40)=5. Not Applicable
	'NMLS Loan Originator ID(HMDA.X86) =3238
 '**************************************************************************************************
FRM_RT_SetupTest null

FRM_Logger_ReportInfoEvent "Start Test Case: CTA139","Script Name - CTA139_Verify_ActionTaken_File_Closed_For_Incompleteness_RepurchasedLoans", Null

'======= Verify Income field value for 2018 HMDA under Originated/Adverse Action Loans tab when setting as Report Income NO and Income NA =======
FRM_Logger_ReportStepEvent "Start Test Case: CTA139","CTA139_Verify_ActionTaken_File_Closed_For_Incompleteness_RepurchasedLoans", Null
''RunAction "HMDA_ReportIncome_EmployeeLoanCheck", oneIteration, "Report_Income_No"

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'Added below code to create Automation Loan Folder 
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

'====== Create new HMDA Profile ======
BIZ_HMDA_AddNewHMDAProfile "CTA-134"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"
wait g_TinyWaitLarge
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnEditOrg")
FRM_Logger_ReportInfoEvent "Click on Edit Object","Clicked on Edit Object", Null
GUI_SwfObject_Click SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfObject("swfname:=stdButtonNewHMDAProfile")
FRM_Logger_ReportInfoEvent "Click on Add button","Clicked on Add Button on Legal Entity Identifer", Null
	
Set objProfileList2 = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfObject("swfname:=gvHMDAProfile")
Set objScrollBar = objProfileList2.SwfScrollBar("swfname:=vPanelScrollBar") 

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CTA-134")

'====== Click on Profile Name CTA134 profile======
GUI_List_ClickRow objProfileList2,objScrollBar,"Profile Name",FRM_DS_GetValue(objProfileDetails,"ProfileName"),True,False,False,"Single"

Set objProfileDetails=Nothing

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfButton("swfname:=okBtn")

SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn").Object.PerformClick

Set objSettingWindow   = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer")
'Added for having access to automation loan folder
BIZ_Nav_HierarchyTree "Company/User Setup", "User Groups"
GUI_SwfList_Select objSettingWindow.SwfListView("swfname:=lvGroup"), "All Users"
GUI_SwfTab_Click objSettingWindow.SwfTab("swfname:=tabControl1"), "Loans"
GUI_SwfList_SetCheckbox objSettingWindow.SwfListView("swfname:=listViewLoanFolders"),"Automation", micChecked
If objSettingWindow.SwfObject("swfname:=stdIconBtnSave").GetROProperty("Enabled") = True Then
	GUI_SwfObject_Click objSettingWindow.SwfObject("swfname:=stdIconBtnSave")
End If
Set objSettingWindow   =nothing
'====== Close Encompass Settings======
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfButton("swfname:=btnClose")

'====== Logout and Login ======
BIZ_Login_UserLogout()
BIZ_Login_UserLogin "admin_core2p"

'====== Create a new Loan ======
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View","Automation"

'====== Set Borrower Information======
BIZ_BorrowerSummaryOrigination_SetBorrower "CTA_139"

'====== Set Co-Borrower Information======
BIZ_BorrowerSummaryOrigination_SetProperty "CTA_139"

'====== Set Transaction Details Information======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "CTA_139"
strDueinVal325=GetDueInValue()
'====== Set 2015 Itemization======

BIZ_2015Itemization_Set800Section "27202_27436"

'====== Set Specific vvalues to line items======
'FRM_RT_SetupTest null
Set obj2015ItemzationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
set obj2015DataEntry=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
GUI_WebEdit_Set obj2015ItemzationPage.WebEdit("html id:=TextBox157"), "1"
GUI_WebEdit_Set obj2015ItemzationPage.WebEdit("html id:=TextBox158"), "1"
'click image Closer to 802e
obj2015ItemzationPage.WebButton("html id:=ImageButton5").Click
wait g_TinyWaitLarge
obj2015DataEntry.WebEdit("html id:=txtBorPOC").Set "1000"
GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
set obj2015DataEntry=nothing

'====== Set 1003 Page 3 Information====== 
BIZ_Forms_open "1003 Page 3"
BIZ_1003Page3_SetDetailsTransaction "CTA_139"
BIZ_1003Page3_SetLoanOriginator "CTA_139"
strNMLSID=GetNMLSID()
'====== Set RegZ-LE Information====== 
BIZ_Forms_open "RegZ - LE"
GUI_List_Select obj2015ItemzationPage.WebList("html id:=DropdownBox5"),"may"
BIZ_RegZ_LE_SetPrepaymentPenalty "PTAC-667" 
SetPrepaymentPenalty "CTA-134"
strPrePenaltyval=GetPenaltyValue()

'========ATR/QM Management=================
Set obj2015ItemzationPage = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
BIZ_Forms_open "ATR/QM Management"
GUI_SwfTab_Click SwfWindow("swfname:=MainForm").SwfTab("swfname:=tabControlForm"), "ATR/QM Eligibility"
GUI_WebCheckbox_Set obj2015ItemzationPage.WebCheckBox("html id:=__cid_CheckBox1_Ctrl"),"ON"

'====== Loan Save====== 
BIZ_Loan_Save()
'====== Navigate to CLosing Disclosure Page 2=========
BIZ_Forms_Open "Closing Disclosure Page 2"
obj2015ItemzationPage.highlight
obj2015ItemzationPage.WebEdit("html id:=TextBox322").highlight
strCD2XSTA=GUI_Object_GetPropertyValue (obj2015ItemzationPage.WebEdit("html id:=TextBox322"),"value")
strCD2XSTA=Replace(strCD2XSTA,",","")
strOrigination1B=GUI_Object_GetPropertyValue (obj2015ItemzationPage.WebEdit("html id:=OriginationCharges1B"),"value")
strOrigination1C=GUI_Object_GetPropertyValue (obj2015ItemzationPage.WebEdit("html id:=OriginationCharges1C"),"value")
strTotalCharges=cint(strOrigination1B)+cint(strOrigination1C)

'====== Navigate to CLosing Disclosure Page 1=========
BIZ_Forms_Open "Closing Disclosure Page 1"
strCD2XSTLC=GUI_Object_GetPropertyValue (obj2015ItemzationPage.WebEdit("html id:=TextBox90"),"value")
'strCD2XSTLC=Replace(strCD2XSTLC,",","")

'====== Navigate to "HMDA Information form"===========
BIZ_Forms_open "HMDA Information"
BIZ_HMDA_SetHMDAYear "CTA-134"
FRM_VerifyEqual "2018 HMDA Originated/Adverse Action Loans",ValidateOriginatedTab_HMDA2018,"Tab Validation For HMDa info page","Tab Validation For HMDa info page"
BIZ_HMDA_2018LoanAndOriginationInformation "CTA_139"

wait g_ShortWaitMedium
BIZ_HMDAPageObj.WebList("html id:=DropdownBox11","class:=inputSelect","html tag:=SELECT","index:=4").highlight
GUI_WebList_Select BIZ_HMDAPageObj.WebList("html id:=DropdownBox11","class:=inputSelect","html tag:=SELECT","index:=4"),"1. Site-built"
wait g_TinyWaitMedium
If BIZ_HMDAPageObj.WebList("html id:=DropdownBox11","class:=inputSelect","html tag:=SELECT","index:=4").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=DropdownBox11","class:=inputSelect","html tag:=SELECT","index:=4"),"selection","1. Site-built","Construction Method Selection"
Else
	FRM_Logger_ReportFailEvent "Construction Method Selection","Construction Method Selection is incorrect",Null
End If

'obj2015ItemzationPage.WebList("html id:=DropdownBox11").Select "1. Site-built"
BIZ_HMDAInformation_SetNMLSInfo "CTA_139"
Wait g_ShortWaitSmall
ValidateBothTabs()
'====== Navigate to "Repurchased Loans" and validate all things===========
'Loan Type UI validation
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX30").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX30"),"selection","1. Conventional","Loan Type"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Loan Type Object doest not exist on Repurchased tab",Null
End If
'Action Taken is diabled and UI validation
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX95").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX95"),"selection","6. Purchased loan","Action Taken"
	GUI_Object_ValidateDisabled BIZ_HMDAPageObj.WebList("html id:=l_HMDAX95"),"Action Taken is Disabled"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Action Taken Object doest not exist on Repurchased tab",Null
End If
'Type of Purchaser
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX94").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX94"),"selection","0. Not applicable","Type Of Purchaser"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Type of Purchaser Object doest not exist on Repurchased tab",Null
End If
'HOEPA Status
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX13"),"selection","3. Not applicable","HOEPA Status"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","HOEPA Status Object doest not exist on Repurchased tab",Null
End If

'====== Step 13===========

'Total loan Costs HMDA.X77 = NA
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX77"),"value","NA","Total loan Costs HMDA.X77"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Total loan Costs HMDA.X77 Object doest not exist on Repurchased tab",Null
End If

'Total points and fees HMDA.X78 = NA
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78").Exist(2) Then
wait(3)
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX78"),"value","NA","Total points and fees HMDA.X78"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Total points and fees HMDA.X78 Object doest not exist on Repurchased tab",Null
End If

'Origination Charges HMDA.X79
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79").Exist(2) Then
	'******************183 Changes CBIZ-16085 *******************************************
	'For Scenario 2,2,2 Expected value is NA
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"value","NA","Origination Charges HMDA.X79"
	'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX79"),"value",strCD2XSTA,"Origination Charges HMDA.X79"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Origination Charges HMDA.X79 Object doest not exist on Repurchased tab",Null
End If

'Discount Points HMDA.X35
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35").Exist(2) Then
	'******************183 Changes CBIZ-16085 *******************************************
	'For Scenario 2,2,2 Expected value is NA
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"value","NA","Discount Points HMDA.X35"
	'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX35"),"value",Replace(formatnumber(strTotalCharges,2),",",""),"Discount Points HMDA.X35"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Discount Points HMDA.X35 Object doest not exist on Repurchased tab",Null
End If

'Lender Credits HMDA.X80
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80").Exist(2) Then
	'GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"value",strCD2XSTLC,"Lender Credits HMDA.X80"
	'183 HMDA Change CBIZ-12992
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX80"),"value","NA","Lender Credits HMDA.X80"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Lender Credits HMDA.X80 Object doest not exist on Repurchased tab",Null
End If

'Interest Rate HMDA.X81 = NA
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX81"),"value","NA","Interest Rate HMDA.X81"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Interest Rate HMDA.X81 Object doest not exist on Repurchased tab",Null
End If

'PrePayment Penalty HMDA.X82
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX82"),"value",strPrePenaltyval,"PrePayment Penalty HMDA.X82"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","PrePayment Penalty HMDA.X82 Object doest not exist on Repurchased tab",Null
End If

'Loan Term HMDA.X83
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX83"),"value",strDueinVal325,"Loan Term HMDA.X83"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Loan Term HMDA.X83 Object doest not exist on Repurchased tab",Null
End If

'Intro Rate Period HMDA.X84 =0 or Blank

If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX84"),"value","NA","Intro Rate Period HMDA.X84"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Intro Rate Period HMDA.X84 Object doest not exist on Repurchased tab",Null
End If

'Balloon Payment MDA.X83
If BIZ_HMDAPageObj.WebList("html id:=l_1659").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_1659"),"selection","No","Balloon Payment"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Balloon Payment Object doest not exist on Repurchased tab",Null
End If

'Interest only
If BIZ_HMDAPageObj.WebList("html id:=l_2982").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_2982"),"selection","No","Interest only"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Interest only Object doest not exist on Repurchased tab",Null
End If

'Negative Amortization
If BIZ_HMDAPageObj.WebList("html id:=l_NEWHUDX6").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_NEWHUDX6"),"selection","No","Negative Amortization"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Negative Amortization Object doest not exist on Repurchased tab",Null
End If

'Property value HMDA.X85
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX85"),"value","NA","Property value HMDA.X85"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Property value HMDA.X85 Object doest not exist on Repurchased tab",Null
End If

'Manufactured Secured Property Type HMDA.X39
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX39").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX39"),"selection","3. Not applicable","Manufactured Secured Property Type HMDA.X39"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Manufactured Secured Property Type HMDA.X39 Object doest not exist on Repurchased tab",Null
End If

'Manufactured Home Land Property Interest HMDA.X40
If BIZ_HMDAPageObj.WebList("html id:=l_HMDAX40").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebList("html id:=l_HMDAX40"),"selection","5. Not applicable","Manufactured Home Land Property Interest HMDA.X40"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","Manufactured Home Land Property Interest HMDA.X40 Object doest not exist on Repurchased tab",Null
End If


'NMLS Loan Originatior ID HMDA.X86
If BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX86").Exist(2) Then
	GUI_Object_ValidateProperty BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX86"),"value",strNMLSID,"NMLS Loan Originatior ID HMDA.X86"
Else
	FRM_Logger_ReportFailEvent "Repurchased Loan Tab Validation","NMLS Loan Originatior ID HMDA.X86 Object doest not exist on Repurchased tab",Null
End If





Set obj2015ItemzationPage =nothing
'====== Set Disclosure Information======


BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)
