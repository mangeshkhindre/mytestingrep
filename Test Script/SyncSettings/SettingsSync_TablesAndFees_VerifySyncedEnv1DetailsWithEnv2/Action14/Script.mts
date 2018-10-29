'@**************************************************************************************************
'@ TestStory: PTAC-3253 Settings Sync
'@ TestCase: PTAC-3454 The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1
'@ Test Automation JIRA Task: PTAC-3432 SettingsSync_TablesAndFees_VerifySyncedEnv1DetailsWithEnv2
'@ TestData:    
	'1 Global_Data, Login, Sync_Admin_Login1
	'2 Global_Data, Login, Sync_Admin_Login
	'3 Settings_TablesFees, TaxRecord, SettingsSync_CityTax
'@ Pre-conditions: 
	'Login into Settings Sync Tool with Environment1 and Environment2 credentials.
	'	Note: Launch the Admin tool from All Programs --> Admin tool --> Click on Settings Sync Tool, Enter the login credentials and click "Login" button
'@ Description: The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1.
	'*Note:*
	'Sort the rows on the 'Scenario' column in both systems, then you can get the same records in both systems.
	'Select the record from source system which should not be available in target system.
	'If selected record present in the target system, delete the record in target system before syncing to target system.
'@ TestSteps:
	'Updated at Action Level
'@ ExpectedResult:
	'Updated at Action Level
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-3454", "The objective of test case is to verify synced 'FHA download' data in Environment 2 should match with Environment 1.", Null

'====== Select FHA (Download) Tab ======
GUI_SwfTab_Click SwfWindow("swfname:=SettingsToolMain").SwfTab("swfname:=tabCtrlMain"), "FHA (Download)"
Wait g_ShortWaitMedium

'====== Click on Sync arrow button ======
BIZ_SyncSettings_ClickArrow()

If GUI_Object_IsExist(SwfWindow("swfname:=SettingsToolMain").Dialog("regexpwndtitle:=Encompass")) Then
	GUI_Dialog_Encompass_Ok Null
End If










Function Settings_Sync_TablesAndFees_CreateFee()
	
	Dim objList1, objList2, intTotCol, intRowNum1, intRowNum2, intCount
	Set objList1 = SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=listViewMI","index:=1")
	Set objList2 = SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=listViewMI","index:=0")
	
	intTotCol = objList.Object.Items.Item(0).Subitems.Count
	
	intRowNum1 = GUI_List_GetNumberofRows(objList1)
	intRowNum2 = GUI_List_GetNumberofRows(objList2)
	
	For i = 1 To intRowNum1 
		For j = 1 To intRowNum2
			intCount = 0
			For k = 1 To intTotCol
				intList1 = GUI_List_GetCellData(objList1, i, k)
				intList2 = GUI_List_GetCellData(objList2, j, k)
				If intList1 = intList2 Then
					intCount = intCount + 1
				End If
			Next
			If intCount = intTotCol Then
				Exit For 
			End If
		Next
		If intCount = intTotCol Then
			Exit For 
		End If
	Next
	
	If intCount = intTotCol Then
		GUI_List_ActOnRow objList2, j, True, False, False, Single
		GUI_SwfObject_Click SwfWindow("swfname:=SettingsToolMain").SwfObject("swfname:=stdIconBtnDelete","index:=0")	
	End If
	GUI_List_ActOnRow objList1, i, True, False, False, Single
	BIZ_SyncSettings_ClickArrow()
	
	
	
	
End Function
