
	'JIRA16344,CTA374


	
	FRM_Logger_ReportStepEvent "CBIZ-16344 :- E2E_KBYO2_LE_CD_FeeVariance ","E2E_KBYO2_LE_CD_FeeVariance ",null
	BIZ_Nav_SelectPipelineTab()
	BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", "Automation" 

	BIZ_Forms_Open "2015 Itemization"
	Set objParentObject=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").Page("title:=.*","index:=0")
	Set obj2015pageobject=SwfWindow("swfname:=MainForm").Page("title:=.*","index:=0")
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfButton("swfname:=btnCollapse")
	wait 1
	GUI_WebButton_Click SwfWindow("swfname:=MainForm").Page("index:=0").WebButton("html id:=btnSwitch900")
	wait 1
	
	'Added as part of KBYO2 CTA-374	 'Rohit
	'*************************** 907 *********************************
	Set objData = FRM_DS_GetTestData("Forms_2015Itemization", "Set900Section", "CTA-374")
	
	GUI_WebButton_Click obj2015pageobject.WebButton("html id:=btnPop907")
	wait 2
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "907_L259")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtLineDesc"),FRM_DS_GetValue(objData, "907_L259")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "907_NEWHUD2.X4401")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtMonths"),FRM_DS_GetValue(objData, "907_NEWHUD2.X4401")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "907_NEWHUD2.X4402")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtUnitBorPaid"),FRM_DS_GetValue(objData, "907_NEWHUD2.X4402")
	End If
	
	'GUI_swfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
	UTIL_Win_SendKey "%{F4}"
	
	
	'*************************** 909 *********************************
	GUI_WebButton_Click obj2015pageobject.WebButton("html id:=btnPop909")
	wait 2
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "909_NEWHUD.X583")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtLineDesc"),FRM_DS_GetValue(objData, "909_NEWHUD.X583")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "909_NEWHUD2.X4405")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtMonths"),FRM_DS_GetValue(objData, "909_NEWHUD2.X4405")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "909_NEWHUD2.X4406")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtUnitBorPaid"),FRM_DS_GetValue(objData, "909_NEWHUD2.X4406")
	End If
	
	'GUI_swfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
	UTIL_Win_SendKey "%{F4}"

	'*************************** 911 *********************************
	GUI_WebButton_Click obj2015pageobject.WebButton("html id:=btnPop911")
	wait 2
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "911_NEWHUD.X1586")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtLineDesc"),FRM_DS_GetValue(objData, "911_NEWHUD.X1586")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "911_NEWHUD2.X4409")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtMonths"),FRM_DS_GetValue(objData, "911_NEWHUD2.X4409")
	End If
	
	If UTIL_String_IsNotEmpty(FRM_DS_GetValue(objData, "911_NEWHUD2.X4410")) Then
		GUI_WebEdit_Set objParentObject.WebEdit("html id:=txtUnitBorPaid"),FRM_DS_GetValue(objData, "911_NEWHUD2.X4410")
	End If
	
	'GUI_swfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
	UTIL_Win_SendKey "%{F4}"
	
	
	
	'Added as part of KBYO2 CTA-374	 'Rohit
	Set objData = Nothing	
	
	FRM_Logger_ReportStepEvent "Validate LE sent ","Send the LE ",null
	
	'LE sent 
	BIZ_Tools_Open "Disclosure Tracking"
	BIZ_DisclosureTrackingTool_AddDisclosure True,"LE",true,true
	
	FRM_Logger_ReportStepEvent "Validate Fee Variance Worksheet ","Validate Fee Variance Worksheet ",null
	'Validate Fee Variance Sheet
	BIZ_Tools_Open "Fee Variance Worksheet"
	wait 1
	 
	FRM_VerifyEqual GUI_Object_GetPropertyValue (obj2015pageobject.WebEdit("html id:=TextBox306"),"value"),"Line 907","Validate FV.X227 Field","Validate FV.X227 Field"
	FRM_VerifyEqual GUI_Object_GetPropertyValue (obj2015pageobject.WebEdit("html id:=TextBox307"),"value"),"Line 909","Validate FV.X239 Field","Validate FV.X239 Field"
	FRM_VerifyEqual GUI_Object_GetPropertyValue (obj2015pageobject.WebEdit("html id:=TextBox309"),"value"),"Line 911","Validate FV.X251 Field","Validate FV.X251 Field"

	

'====== Logout of Encompass ======
BIZ_Login_UserLogout()	
