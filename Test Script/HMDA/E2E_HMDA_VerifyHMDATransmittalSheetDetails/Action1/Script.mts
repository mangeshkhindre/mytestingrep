'@**************************************************************************************************
 '@ TestStory: CTA-138 HMDA 
 '@ TestCase:
    '1 CTA-138 HMDA-Verify HMDA Transmittal Sheet Details as per Linked HMDA Profile and LEI  
 '@ Test Automation JIRA Task: CTA-146
 '@ TestData: "HMDA","HMDA_Profile_Creation","CTA-138"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetHeadInfo", "SecondaryMarket_CorrespondentLoan"  
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetBorrower", "TC1_CBIZ17_BorrowerInfo"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetTransactionDetails", "TC1_CBIZ17_TransactionDetails"
 '@ TestData: "Forms_BorrowerSummaryOrigination", "SetProperty", "PTAC-3103" 
 '@ Pre-conditions: None
	'1. User have created a 'Loan Folder'- My Pipeline
 '@ Description: 
 '@ TestSteps:
    'CTA-138 Teststeps
     '01 Login to Encompass with the following credentials: admin
     '02 Navigate to Encompass >> Settings >> Loan Setup >> HMDA Profiles
     '03 Click on New HMDA Profiles Add Icon and create a new profile as per test data
     '04 Click on Save and close HMDA Profile form
     '05 Click on Company/User setup--> Orginazation/users. Click on 'Administration' on left side under  'organization'. > Click on Edit Icon.
     '06 Click on + icon next to ' Legal Entity Idetentifier(LEI) on the organization Details Window and select the newly created HMDA Profile in Step 03
     '07 Logout and Login again
     '08 Click on Pipeline and create a new loan under 'My Pipeline' folder
     '09 Go to Forms tab and open HMDA Information form
     '10 Update HMDA Reporting Year (HMDA.X27) as 2018
     '11 Click on HMDA Transmittal Sheet button 
     '12 Verify the fields in HMDA Transmittal Sheet which should match the test data used for creation of new profile in Step 03	

 '@ ExpectedResult:
	'01) Field Information in HMDA Transmittal Sheet should match the test data
 '**************************************************************************************************
FRM_RT_SetupTest(Null)

FRM_Logger_ReportInfoEvent "Start Test Case: CTA-138","Script Name - HMDA-Verify HMDA Transmittal Sheet Details as per Linked HMDA Profile and LEI", Null

FRM_Logger_ReportStepEvent "Start Test Step","Script Name - HMDA-Verify HMDA Transmittal Sheet Details as per Linked HMDA Profile and LEI", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

'====== Go to Settings/Loan Setup,HMDA Settings ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."

'====== Create new HMDA Profile ======
BIZ_HMDA_AddNewHMDAProfile "CTA-138"

BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Company/User Setup","Organization/Users"

'====== Click on Edit Organization button on Organization/Users form======
GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=stdIconBtnEditOrg")
FRM_Logger_ReportInfoEvent "Click on Edit Button","Clicked on Edit Organization Button on Organization/Users form", Null

'====== Click on Add button on Legal Entity Identifer(LEI) field======
GUI_SwfObject_Click SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfObject("swfname:=stdButtonNewHMDAProfile")
FRM_Logger_ReportInfoEvent "Click on Add button","Clicked on Add Button on Legal Entity Identifer(LEI) field", Null

Set objProfileList2 = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfObject("swfname:=gvHMDAProfile")
Set objScrollBar = objProfileList2.SwfScrollBar("swfname:=vPanelScrollBar") 

Set objProfileDetails=FRM_DS_GetTestData("HMDA","HMDA_Profile_Creation","CTA-138")

'====== Click on Profile Name CBIZ-11355 ======
GUI_List_ClickRow objProfileList2,objScrollBar,"Profile Name",FRM_DS_GetValue(objProfileDetails,"ProfileName"),True,False,False,"Single"

Set objScrollBar=Nothing
Set objProfileList2 =Nothing

GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfWindow("swfname:=AddEditLEIDialog").SwfButton("swfname:=okBtn")

'GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn")
SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=AddEditOrgDialog").SwfButton("swfname:=okBtn").Object.PerformClick

BIZ_Login_UserLogout()

'====== Login to the Encompass again as Admin ======
BIZ_Login_UserLogin "admin_core2p"

BIZ_Nav_SelectPipelineTab()

txtPipelineView = SwfWindow("swfname:=MainForm").SwfComboBox("swfname:=cboView").GetROProperty("selection")

BIZ_Nav_SelectTabControl("Home")

BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder trim(txtPipelineView),"My Pipeline"

'====== Set Borrower Header Information======
BIZ_BorrowerSummaryOrigination_SetHeadInfo "SecondaryMarket_CorrespondentLoan"

'====== Set Borrower Information======
BIZ_BorrowerSummaryOrigination_SetBorrower "TC1_CBIZ17_BorrowerInfo"

'====== Set Transaction Details Information======
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "TC1_CBIZ17_TransactionDetails"

'====== Set Subject Property Information======
BIZ_BorrowerSummaryOrigination_SetProperty "PTAC-3103"

BIZ_Loan_Save()

'====== Open HMDA Information form======
BIZ_Forms_open "HMDA Information"

strCurrYear= GUI_Object_GetPropertyValue(BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX27"),"value") 

'====== Change HMDA year to 2018 ======
If strCurrYear <> "2018" Then
	GUI_WebEdit_Set BIZ_HMDAPageObj.WebEdit("html id:=l_699"), ""
	GUI_Image_Click(BIZ_HMDAPageObj.Image("file name:=field-unlock.png","index:=1"))
	GUI_WebEdit_Set BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX27"), ""
	GUI_WebEdit_Set BIZ_HMDAPageObj.WebEdit("html id:=l_HMDAX27"), "2018" 		       			
End If

'====== Click on HMDA Transmittal Sheet button ======
GUI_WebButton_Click BIZ_HMDAPageObj.WebButton("html id:=Button2")

Set objTransmittalSheet= SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("index:=0")

'======Validate the value of "Respondent ID" HMDA.X71 ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_RespondentID"),FRM_DS_GetValue(objProfileDetails,"RespondentID"),"Field HMDA.X71 = Respondent ID"

'======Validate the value of "Tax ID" HMDA.X69 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_TaxID"),FRM_DS_GetValue(objProfileDetails,"TaxID"),"Field HMDA.X69 = Tax ID"

'======Validate the value of "Agency" field======
GUI_Object_ValidateProperty objTransmittalSheet.WebList("html id:=I_Agency"),"selection",FRM_DS_GetValue(objProfileDetails,"Agency"),"Field = Agency"

'======Validate the value of "LEI" HMDA.X70 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_LEI"),FRM_DS_GetValue(objProfileDetails,"LEI"),"Field HMDA.X70 = LEI"

'======Validate the value of "Company Name" HMDA.X59 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_CompanyName"),FRM_DS_GetValue(objProfileDetails,"CompanyName"),"Field HMDA.X59 = Company Name"

'======Validate the value of "Contact Person Name" HMDA.X60 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_Name"),FRM_DS_GetValue(objProfileDetails,"ContactPersonName"),"Field HMDA.X60 = Contact Person Name"

'======Validate the value of "Contact Person Address" HMDA.X63 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_Address"),FRM_DS_GetValue(objProfileDetails,"ContactPersonAddress"),"Field HMDA.X63 = Contact Person Address"

'======Validate the value of "Contact Person City" HMDA.X64 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_City"),FRM_DS_GetValue(objProfileDetails,"ContactPersonCity"),"Field HMDA.X64 = Contact Person City"

'======Validate the value of "Contact Person State" HMDA.X65 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_State"),FRM_DS_GetValue(objProfileDetails,"ContactPersonState"),"Field HMDA.X65 = Contact Person State"

'======Validate the value of "Contact Person Zip" HMDA.X66 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ZIPCode"),FRM_DS_GetValue(objProfileDetails,"ContactPersonZip"),"Field HMDA.X66 = Contact Person Zip"

'======Validate the value of "Contact Person Phone" HMDA.X61 field ======
phoneNo=FRM_DS_GetValue(objProfileDetails,"ContactPersonPhone")
phoneNo=Left(phoneNo,3)&"-"&Mid(phoneNo,4,3)&"-"&Right(phoneNo,4)

GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_Phone"),phoneNo,"Field HMDA.X61 = Contact Person Phone"

'======Validate the value of "Contact Person Fax" HMDA.X67 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_Fax"),FRM_DS_GetValue(objProfileDetails,"ContactPersonFax"),"Field HMDA.X67 = Contact Person Fax"

'======Validate the value of "Contact Person Email" HMDA.X62 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_Email"),FRM_DS_GetValue(objProfileDetails,"ContactPersonEmail"),"Field HMDA.X62 = Contact Person Email"

'======Validate the value of "Parent Mailing Name" HMDA.X72 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ParentName"),FRM_DS_GetValue(objProfileDetails,"ParentMailingName"),"Field HMDA.X72 = Parent Mailing Name"

'======Validate the value of "Parent Mailing Address" HMDA.X73 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ParentAddress"),FRM_DS_GetValue(objProfileDetails,"ParentMailingAddress"),"Field HMDA.X73 = Parent Mailing Address"

'======Validate the value of "Parent Mailing City" HMDA.X74 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ParentCity"),FRM_DS_GetValue(objProfileDetails,"ParentMailingCity"),"Field HMDA.X74 = Parent Mailing City"

'======Validate the value of "Parent Mailing State" HMDA.X75 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ParentState"),FRM_DS_GetValue(objProfileDetails,"ParentMailingState"),"Field HMDA.X75 = Parent Mailing State"

'======Validate the value of "Parent Mailing Zip Code" HMDA.X76 field ======
GUI_Object_ValidateValue objTransmittalSheet.WebEdit("html id:=I_ParentZipCode"),FRM_DS_GetValue(objProfileDetails,"ParentMailingZip"),"Field HMDA.X76 = Parent Mailing Zip Code"

Set objTransmittalSheet=Nothing
Set objProfileDetails=Nothing

'====== Click on Close button on HMDA Transmittal Sheet button ======
GUI_WebButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")

BIZ_Loan_Exit "False"

'====== Logout From Encompass ======
BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
