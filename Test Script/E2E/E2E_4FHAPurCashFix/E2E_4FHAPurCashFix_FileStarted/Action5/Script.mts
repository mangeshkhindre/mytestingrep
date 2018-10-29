'@**************************************************************************************************
'@ TestStory: PTAC-3149 E2E_4FHAPURCASHFIX
'@ TestCase : PTAC-3007 FHAPURCHASEFIX - File Started 3-Complete 1003 forms
'@ Test Automation JIRA Task: PTAC-3150 E2E_4FHAPURCASHFIX_Filestarted
'@ TestData: 
   '1 Forms_1003page, 1003Page1, E2E_FHAPURCASHFIX
   '2 Forms_1003page, SetEmployment, E2E_FHAPURCASHFIX
   '3 Forms_RegZ-LE, SetConstruction, E2E_FHAPURCASHFIX
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 click on forms 1003 page 1.
	  '(Some fields will be populated from Borrower summary origination).
	  'Fill the fields as in Test data.
   '2 Click on forms and select REGZE-LE form.
   '3 Go to 1003 Page2
   '4 Go to 1003 Page3
'@ ExpectedResult:
   '1 Should be able to enter all the values in their respective fields.
   '2 Should be able to enter value.
   '3 Data should be filled successfully.
   '4 Data should be filled successfully.
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3007","FHAPURCHASEFIX - File Started 3-Complete 1003 forms", Null

'Go to Loan Page
BIZ_Nav_SelectLoanTab()

'Saves the Loan Details 
BIZ_Loan_SaveLoanNumber()

'Retrieve the Loan Number 
LoanNumber = BIZ_Loan_GetLoanNumber()

'Enter details in 1003 page 1
BIZ_1003Page1_SetTitleDetails "E2E_FHAPURCASHFIX"
BIZ_1003Page1_SetMiandPiDetails "E2E_FHAPURCASHFIX"
BIZ_1003Page1_SetData "E2E_FHAPURCASHFIX"

'Enter the Employment Details
BIZ_1003Page1_SetEmployment "E2E_FHAPURCASHFIX"

'Enter Details in 1003 page 2
BIZ_Forms_Open "1003 Page 2"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_144"), ""
BIZ_1003Page2_DeleteVODData "E2E_FHAPURCASHFIX"
BIZ_1003Page2_UpdateVODData "E2E_FHAPURCASHFIX1"
BIZ_1003Page2_UpdateVODData "E2E_FHAPURCASHFIX2"

GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0113"), ""
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0111"), ""
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0112"), ""
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0213"), ""
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0211"), ""
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_FL0212"), ""

'Enter details in 1003 Page 3
BIZ_Forms_Open "1003 Page 3"
BIZ_1003Page3_SetLoanOriginator "E2E_FHAPURCASHFIX"
BIZ_1003Page3_SetBorrower  "E2E_FHAPURCASHFIX"
GUI_WebEdit_Set SwfWindow("swfname:=MainForm").Page("index:=0").WebEdit("html id:=l_140"), ""

BIZ_RegZ_LE_SetConstructionMortgage "E2E_FHAPURCASHFIX"
'Saves the Loan Details 
BIZ_Loan_Save()

'As the Save function is not generating the loan number, we are clicking on the save twice
BIZ_Loan_Save()

FRM_Logger_ReportInfoEvent "Fill 1003 Details", "1003 Details are entered for the Loan", Null
