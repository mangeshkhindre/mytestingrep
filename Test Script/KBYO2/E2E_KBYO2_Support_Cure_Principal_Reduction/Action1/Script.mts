'@******************************************************************************************
'@ TestStory:CBIZ-15817: KBYO2: : KBYO2: Support Cure with Principal Reduction

'@ Test Automation JIRA Task: CTA-402

'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Goto Fee Varinace Sheet and add POC 
	'3 Go to CD page of the ARM loan and verify the 12 new Display field IDs mentioned in CBIZ-12556. (2 virtual fields are out of scope)
	'4 Create a new custom form with 10 KBYO fields.
	'5 Goto custom form and check whether KBYO fields are rounded.
'@ ExpectedResult: 
	'1. User should be able to log in.
	'2. Fields Updates should match and updated value should be displayed in the fields.
	'3. Fields Updates should match and updated value should be displayed in the fields.
	'4. New custom form with 10 KBYO fields is created.
	'5. KBYO fields should be rounded in custom form.
'CBIZ-12551:
'@ TestSteps:
	'1 Login to the Encompass with Admin user.
	'2 Go to Borrower Summary - Origination page and enter the test data as given in Test data column of CTA-282, step 22.
	'3 Go to 2015 Itemization form. Enter the test data as given in Test Data column of CTA-282, step 23.
	'4 Go to Line 1011. Click Aggregate Set up. Enter data as per Test data column of CTA-282, step 24.
	'5 Go to Loan Estimate page 1, Verify LE1.X30, LE1.X31, LE1.X32
	'6 Go to Closing Disclosure page 1, verify CD1.X4, CD1.X5, CD1.X6
'@ ExpectedResult: 
	'1. Payoff Payment Popup And updation of Data Entry in Table shoiuld happen
	'2.K section L84 Field value on CD3 shud be eqaual to varince added
	'3. Data should be entered successfully.
	'4. Data should be entered successfully.
	'5. It should display "Some".
	'6. It should display "Some".
'********************************************************************************************
FRM_RT_SetupTest(Null)

'====== Login to the Encompass as admin ========
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'Added below code to create Automation Loan Folder 
BIZ_Nav_HierarchyTree "Loan Setup","Loan Folders"

BIZ_Settings_CreateLoanFolder "Automation","OFF","OFF"

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


RunAction "SupportCure_Principal_Reduction", oneIteration


BIZ_Login_UserLogout()
FRM_RT_TeardownTest null




	
	

