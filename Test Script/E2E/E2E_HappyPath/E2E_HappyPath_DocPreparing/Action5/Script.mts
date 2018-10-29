'@**************************************************************************************************
'@ TestStory: PTAC-1129  E2E_HappyPath
'@ TestCase:  PTAC-1163 HP Doc Preparing 4-Complete Closing RegZ-CD with Plan code & Data Audit 
'@ Test Automation JIRA Task: PTAC-1175
'@ TestData: 
	'1 Forms_ClosingDisclosurePage,SetLender,PTAC1175_DocPrep
	'2 Forms_REGZ_CD,SelectPlanCode,PTAC1175_DocPrep
'@ Pre-conditions: 
'@ Description: Closing RegZ-CD with Plan code & Data Audit 
'@ TestSteps:
   '1 Under the forms tab, click on Closing Disclosure page 5.
	  'Under contact information, click on "Copy from 1003" button from lender section. 
	  'Enter Contact NMLS ID: 224466.Enter phone number: 111-111-2341
	  'In the 1003 page-1, next to mailing address check the checkbox "Same as Present".
	  'Note: In the Happypath document it shows later but it should be done at this step to clear the Audits
   '2 Under the forms tab, click show all checkbox then Select "RegZ-CD" form 
   '3 Click on Plan code button
      'Select "All Fixed Rate Conventional 1st Lien Loans" and click select button
   '4 Update the fields shown below to the closing expected date
   '5 On the ‘RegZ – CD’ form, click on the ‘Audit’ button and then ‘Ok’ on the pop up
	  'Select radio button 
	  '"Review" and click ok
	  'Click the "Order Docs" button
	  'Click send 
	  'Enter the To email Id: and click Send button
	  'In the Disclosure tracking, verify "closing docs ordered
'@ ExpectedResult: 
	'1 The page should open and data should display
       'Checkbox should be checked
	'2 RegZ-CD should open
	'3 The Select Plan code window should be open
       'The pop up window should closed and under description all data should populated
	'4 The date should be displayed
	'5 "Select Report Type" pop up should open
	   'The window should be closed and "Closing Docs Audit window should open
	   'Encompass window should open with "The custom letter "Borrower Appraisal Acknowledgement doc" is no longer available 
	   'Another Encompass window should open with "The custom letter "Loan Applicants Attestation.DOC" is no longer available 
	   'Another Encompass window should open with message
	   'Select Document window should open 
	   'Send window should open
	   'The disclosure tracking should open 
	   'There should be an enter in the grid
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-1163 ","HP Doc Preparing 4-Complete Closing RegZ-CD with Plan code & Data Audit", Null

BIZ_1003Page3_SetLoanOriginator  "E2E_HappyPath"
BIZ_Loan_SaveLoanNumber()

'Variable declaration
Dim strClosingDate, objParentObject, strDisclosureMethod
Set objParentObject = SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")

'Open form
BIZ_Forms_Open "Closing Disclosure Page 5"

'Check if form is opened
FRM_VerifyTrue BIZ_Forms_GetFormTitle()="Closing Disclosure Page 5", "Open Form", "Form 'Closing Disclosure Page 5' is opened"

'Click on Copy from 1003 button
GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("name:=Copy From 1003")

'Set test data for Contact NMLS ID and Phone
BIZ_ClosingDisclosurePage5_SetLender "PTAC1175_DocPrep"

BIZ_Forms_Open "1003 Page 1"

'Click on same as present checkbox in mailing address section
GUI_WebCheckBox_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebCheckBox("html id:=__cid_CheckBox26_Ctrl")

BIZ_Forms_Open "RegZ - CD"

'Check if form is opened
FRM_VerifyTrue BIZ_Forms_GetFormTitle()="RegZ - CD", "Open Form", "Form 'RegZ - CD' is opened"

'Select plan code in RegZ-CD
BIZ_REGZ_CD_SelectPlanCode "PTAC1175_DocPrep"
strClosingDate =  GUI_Object_GetPropertyValue(objParentObject.WebEdit("html id:=l_748","index:=0"),"value")

'Set Disbursement Date same as Closing date
GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L244","index:=0"),strClosingDate

'Set Doc Signing date same as closing date
GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_1887","index:=0"),strClosingDate

'Set Document date same as closing date
GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L770"),strClosingDate

'Review Audit and order closing docs
BIZ_RegZ_CD_AuditOrderDocs "PTAC1175_DocPrep"

'Check if entry is generated in Disclosure Tracking history
BIZ_Tools_Open "Disclosure Tracking"
strDisclosureMethod = "Closing Docs Order"

boolOrderClosingDocs = GUI_List_ClickRow(SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvHistory"),Null,"Method",strDisclosureMethod,True,False,False,"Single")
FRM_VerifyTrue  boolOrderClosingDocs,"Closing Docs","Closing Docs Ordered"

Set objParentObject = Nothing
