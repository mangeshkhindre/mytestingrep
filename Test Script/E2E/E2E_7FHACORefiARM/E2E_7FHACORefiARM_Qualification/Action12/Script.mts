'@**************************************************************************************************
'@ TestStory: PTAC-2703 E2E_7FHACORefiARM
'@ TestCase: PTAC-2417 - FHACOREFIARM Qualification2-Fill 2015 Itemization
'@ Test Automation JIRA Task: PTAC-2714 E2E_7FHACORefiARM_Qualification
'@ TestData: NA
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 In forms select 2015 Itemization form
   '2 Enter the values as in test data
'@ ExpectedResult: 
   '1 2015 Itemization Form should open.
   '2 should be able to input values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2417", "FHACOREFIARM Qualification2-Fill 2015 Itemization", Null

Dim strFromDate, objParentObject, strToDate, BlnButtonStatus
Set objParentObject = SwfWindow("swfname:=MainForm").Page("index:=0")

'Open 2015 Itemization form
BIZ_Forms_Open "2015 Itemization"

strFromDate =  objParentObject.WebEdit("html id:=l_L244").GetROProperty("value")

If(Len(Trim(Replace(strFromDate, "/",""))) = 0) Then 	
   objParentObject.WebEdit("html id:=l_L244").Set Date()
   strToDate = DateAdd("d", 10, Date())
Else
   strToDate = DateAdd("d", 10, strFromDate)
End If

BlnButtonStatus = GUI_Object_GetPropertyValue(objParentObject.WebButton("html id:=FieldLock2"), "title")

If(InStr(BlnButtonStatus, "Use the Calculated Value") > 0) Then 
   GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
Else
   GUI_WebButton_Click objParentObject.WebButton("html id:=FieldLock2")
   GUI_WebEdit_Set objParentObject.WebEdit("html id:=l_L245"), strToDate
End If
 
BIZ_2015Itemization_Set1200Section "E2E_FHACORefiARM"

Set objParentObject = Nothing
