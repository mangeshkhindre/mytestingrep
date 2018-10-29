'@******************************************************************************************
'@ TestStory: 
'@ TestCase: E2E_2015Itemization
'@ Test Automation JIRA Task: TA-4709
'@ TestData: "Forms_2015Itemization","Set800Section","E2E_2015Itemization_Section800_CC"
'@ TestData: "Forms_2015Itemization","Set900Section","E2E_2015Itemization_Section900_CC"
'@ TestData: "Forms_2015Itemization","Set1000Section","E2E_2015Itemization_Section1000_CC"
'@ TestData: "Forms_2015Itemization","Set1100Section","E2E_2015Itemization_Section1100_CC"
'@ TestData: "Forms_2015Itemization","Set1200Section","E2E_2015Itemization_Section1200_CC"
'@ TestData: "Forms_2015Itemization","Set1300Section","E2E_2015Itemization_Section1300_CC"
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
	'1 Login to Encompass as an admin user
	'2 Go to Settings->Loan Templates->Closing Cost
	'2 Create new closing cost template
	'3 Enter data in closing cost template
	'4 Save template
'@ ExpectedResult: 1.New closing cost template should be created.
'                  2.Data should be set properly.
'					
'********************************************************************************************
FRM_Logger_ReportStepEvent "TC1","Test step-1 Create new closing cost template and set data.",Null

'=============Go to Settings->Loan Templates->Closing Costs============
BIZ_Nav_HierarchyTree "Loan Templates","Closing Costs"

'========Delete existings closing Cost template-Changed the name of template=============
'BIZ_ClosingCosts_DeleteExisting("E2E_2015Itemization")

Set objClosingCostsList = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfObject("swfname:=gvDirectory")
Set scrollbarClosingCosts = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfScrollBar("swfname:=vPanelScrollBar")
'check if the template already exists
exist = GUI_List_ClickRow (objClosingCostsList, scrollbarClosingCosts, "Name", "E2E_2015Itemization", True, False, False, "Single")
If Not exist Then
	
	'========Create new closing Cost template=============
	BIZ_ClosingCosts_CreateNew "E2E_2015Itemization","2015 Itemization"

	'===============Open Closing cost template==========
	BIZ_ClosingCosts_OpenTemplate("E2E_2015Itemization")
	
	Dim objClosingCostTemplate
	Set objClosingCostTemplate = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=TemplateDialog").Page("title:=.*","index:=0")
	
	'==============Sometimes more time is taking to display fields on closing cost template=============
	GUI_Object_WaitTillExist objClosingCostTemplate.WebEdit("html id:=TextBox12")
	
	'============Set Data in closing cost template=========
	'==============Set data in 800 Section================
	BIZ_Common_2015Itemization_Set800Section objClosingCostTemplate,"E2E_2015Itemization_Section800_CC"
	
	'===============Check the checkboxes in 800 section=============
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"801d",Array("Impacts APR")
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"804",Array("Seller Obligated")
	
	'===============Set data in fee details window in 800 line==============
	BIZ_Common_2015Itemization_SetFeeDetails objClosingCostTemplate,"801b","E2E_2015Itemization_801b"
	BIZ_Common_2015Itemization_SetFeeDetails objClosingCostTemplate,"801c","E2E_2015Itemization_801c"
	BIZ_Common_2015Itemization_SetFeeDetails objClosingCostTemplate,"805","E2E_2015Itemization_805"
	
	'==============Set data in 900 Section================
	BIZ_Common_2015Itemization_Set900Section objClosingCostTemplate,"E2E_2015Itemization_Section900_CC"
	
	'===============Check the checkboxes in 900 section=============
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"904",Array("Borrower Can Shop")
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"907", Array("Borrower Can Shop","Borrower Did Shop")
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"908", Array("Property Taxes")
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"911", Array("Other")
	BIZ_Common_2015Itemization_FeeDetails_ClickCheckbox objClosingCostTemplate,"912", Array("Homeowner's Insurance")
	
	'==============Set data in 1000 Section================
	BIZ_Common_2015Itemization_Set1000Section objClosingCostTemplate,"E2E_2015Itemization_Section1000_CC"
	
	'==============Set data in 1100 Section================
	BIZ_Common_2015Itemization_Set1100Section objClosingCostTemplate,"E2E_2015Itemization_Section1100_CC"
	
	'==============Set data in 1200 Section================
	BIZ_Common_2015Itemization_Set1200Section objClosingCostTemplate,"E2E_2015Itemization_Section1200_CC"
	
	'==============Set data in 1300 Section================
	BIZ_Common_2015Itemization_Set1300Section objClosingCostTemplate,"E2E_2015Itemization_Section1300_CC"
	
	''===========Set % for home Insurance in 903 line============
	'GUI_WebButton_Click objClosingCostTemplate.WebButton("html id:=StandardButton4")
	'
	'Dim objHomeInsurance
	'Set objHomeInsurance = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=SetUpContainer").SwfWindow("swfname:=TemplateDialog").SwfWindow("swfname:=InsuranceDialog")
	'GUI_SwfEdit_Set objHomeInsurance.SwfEdit("swfname:=rateTxt"),"1"
	'GUI_SwfButton_Click objHomeInsurance.SwfButton("swfname:=okBtn")
	'
	'===============save Closing cost template============
	BIZ_ClosingCostDetails_Save() 

End If
	
Set objClosingCostsList   = Nothing
Set scrollbarClosingCosts = Nothing

'============Close Settings window==============
BIZ_Nav_Settings_Close()
