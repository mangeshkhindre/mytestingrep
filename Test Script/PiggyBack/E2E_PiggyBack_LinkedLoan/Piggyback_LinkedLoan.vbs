
'This function is used to link one loan with another loan and exits
'@code
'    Function BIZ_Piggyback_LinkLoan(strFirstLoanToBeOpenedToLink, strSecondLoanToBeLinked)
'@endcode
'@param strFirstLoanToBeOpenedToLink - first loan to be opened
'@param strSecondLoanToBeLinked - pass second loan to be linked with first loan  strLinkedLoan

Function BIZ_Piggyback_LinkLoan(strFirstLoan, strSecondLoan)	
	FRM_Logger_ReportInfoEvent "Start linking first loan to second loan", "Started linking First Loan # '"&strFirstLoan&"' to Second Loan # '"&strSecondLoan&"'", Null	

	Dim objMain, objEncompassMain, objLoanDialog
	Set objMain				=	SwfWindow("swfname:=MainForm")
	Set objEncompassMain	=	SwfWindow("swfname:=MainForm").Page("micclass:=Page")
	Set objLoanDialog		= 	objMain.SwfWindow("swfname:=LinkLoanDialog")
	
	'=====Navigate to Piggback Loans======
	BIZ_Tools_Open "Piggyback Loans"
	
	'=====Click on Link Loan button======
	GUI_Object_WaitTillExistX objEncompassMain.WebButton("html id:=linkloanbutton"), 360	
	GUI_WebButton_Click objEncompassMain.WebButton("html id:=linkloanbutton")
	
	'=====select loan and Click on OK button======
	GUI_Object_WaitTillExistX objLoanDialog, 360	
	GUI_List_ClickRow objLoanDialog.SwfObject("swfname:=detailListView"),objLoanDialog.SwfScrollBar("swfname:=vPanelScrollBar"), "Loan Number", strFirstLoan, True, False, False, "Single" 
	wait g_LongWaitMedium	
	GUI_SwfButton_Click objLoanDialog.SwfButton("swfname:=okbutton")
	
	FRM_Logger_ReportInfoEvent "Linking first loan to second loan", "First Loan # '"&strFirstLoan&"' should be linked with Second Loan # '"&strSecondLoan&"'", Null	
	If GUI_Object_IsExistX (objMain.Dialog("text:=Encompass"),360) Then
		FRM_Logger_ReportPassEvent "Click on Go to Linked Loan", "Clicked on Go to Linked Loan", Null
		GUI_Dialog_Encompass_Yes "Do you want to synchronize data between two loans?"
		GUI_Object_WaitTillExistX objEncompassMain, 480
	End If	
	
	'BIZ_Loan_Exit (True)	
	Set objMain				=	Nothing
	Set objEncompassMain	=	Nothing
	Set objLoanDialog		= 	Nothing
End Function


'This function is for Search loan with column field value 
'@code
'    BIZ_SearchLoanByColumnValue(strColTitle,strColValue)
'@endcode
'@param strColTitle - column name
'@param strColValue - column field value
'@Pre-requisite  Pipeline View and Loan Folder must be selected before calling this procedure
'@Pre-requisite Coulumn must exist on the view

Function BIZ_SearchLoanByColumnValue(strColTitle,strColValue)   
    Dim objLoanList, objColumns, intColIndex, intRowCount,chkFlag
    Set objLoanList = SwfWindow("swfname:=MainForm").SwfObject("swfname:=gvLoans")
	BIZ_Nav_OpenMenuItem "Pipeline;Customize Columns..."
	set objColumns = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfObject("swfname:=gvColumns")
	intColIndex = 0
	intRowCount = objColumns.Object.Items.Count	
	For i = 0 To (intRowCount - 1)	
		If objColumns.Object.Items.Item(i).Checked AND objColumns.Object.Items.Item(i).Text = strColTitle Then			
		   Exit For
		ElseIf objColumns.Object.Items.Item(i).Text=strColTitle Then
		 		objColumns.Object.Items.Item(i).Checked = True
		ElseIf objColumns.Object.Items.Item(i).Checked Then
			   objColumns.Object.Items.Item(i).Checked = False
			   intColIndex = intColIndex + 1
		End If
	Next	
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfButton("swfname:=btnOK")
	SwfWindow("swfname:=MainForm").SwfEdit("swfname:=txtBox","index:=0").Set ""&strColValue&""
	UTIL_Win_SendKey "{ENTER}"
	
	Set objLoanList = Nothing
	set objColumns  = Nothing
End Function


'=============PipeLine CustomizeColumns===============
Function BIZ_PipeLine_CustomizeColumns(strColTitle)
BIZ_Nav_OpenMenuItem "Pipeline;Customize Columns..."
Set objColumns = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfObject("swfname:=gvColumns")
intRowCount = objColumns.Object.Items.Count
For i = 0 To (intRowCount - 1)	
	If objColumns.Object.Items.Item(i).Text = strColTitle Then
	   If objColumns.Object.Items.Item(i).Checked = False Then
	   	  objColumns.Object.Items.Item(i).Checked = True
	   	  GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfButton("swfname:=btnOK")	
	   	  BIZ_Nav_OpenMenuItem "Pipeline;Customize Columns..."
	   	  BIZ_CustomizeColumns_MoveUp strColTitle
	   Else
	   	  BIZ_CustomizeColumns_MoveUp strColTitle   	  
	   End If   		   
	   Exit For
	End If
Next
End Function

'=====================CustomizeColumns MoveUp=============================
Function BIZ_CustomizeColumns_MoveUp(strColTitle)	
	Set objColumns = SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfObject("swfname:=gvColumns")
	intRowCount = objColumns.Object.Items.Count	
	For i = 0 To (intRowCount - 1)		
		If objColumns.Object.Items.Item(i).Text = strColTitle Then
			GUI_SwfEdit_Set SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfEdit("swfname:=txtFind"), strColTitle
			GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfButton("swfname:=btnFind")
			For j = 0 To (i - 1)			
				GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfObject("swfname:=btnMoveUp")
			Next
		   	If Not objColumns.Object.Items.Item(0).Checked Then
			   objColumns.Object.Items.Item(0).Checked = True
			End If
			GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TableLayoutColumnSelector").SwfButton("swfname:=btnOK")
			Exit For
		End If
	Next
End Function


'This function is to set click on Link Loan
'@code
'    BIZ_GoTo_LinkedLoan()
'@endcode
Function BIZ_GoTo_LinkedLoan()
    FRM_Logger_ReportInfoEvent "Go To Linked Loan","Navigate to Linked Loan", null
	
	If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),15) Then
   	 	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
    	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Go to Linked Loan" 
    End If
    
    If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").Dialog("regexpwndtitle:=Encompass"),15) Then
        GUI_WinButton_Click SwfWindow("swfname:=MainForm").Dialog("regexpwndtitle:=Encompass").WinButton("regexpwndtitle:=&Yes")
    End If
    
    If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog"),10) Then
        GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=RegulationAlertDialog").SwfButton("swfname:=btnClose")
    End If  
    
    GUI_Dialog_Encompass_NoX 10,"The status of the currently open loan has changed. Would you like to notify borrowers and partners?"  

	If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").Dialog("title:=Encompass","Index:=0").WinButton("title:=OK","Index:=0"),5) Then
        GUI_SwfButton_Click SwfWindow("swfname:=MainForm").Dialog("title:=Encompass","Index:=0").WinButton("title:=OK","Index:=0")
    End If   
End Function


'This function is to set click on Link Loan
'@code
'    BIZ_SyncData_LinkedLoan()
'@endcode
Function BIZ_SyncData_LinkedLoan()
    FRM_Logger_ReportInfoEvent "Clicked On Sync Data","Sync Data between two loans", null
    
    Set objMain					=	SwfWindow("swfname:=MainForm")
	Set objEncompassDialog		=	objMain.Dialog("text:=Encompass")
	If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),15) Then
   	 	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
    	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data"
    End If
    
    If GUI_Object_IsExistX(objEncompassDialog, 60) Then
		GUI_Dialog_Encompass_YesX 120,"Are you sure you want to synchronize data between two loans?"
		GUI_Dialog_Encompass_OKX 120, "Both loans have been synchronized."
		Wait g_TinyWaitSmall + g_TinyWaitSmall + g_TinyWaitSmall
		BIZ_Loan_Save()
	End If    
End Function
