'@**************************************************************************************************
'@ TestStory: NICE 9913 Reports
'@ TestCase: 
    '1 NICE 9913 Add 18.3 New Fields to Reporting Database.
'@ Test Automation JIRA Task: NICE-10688 Reports_GenerateMultipleField_FilteredCriteria
'@ TestData: 
	'1 NewField.xls this sheet should be within the script level folder
'@ Pre-conditions:
	'1 Login as Admin user and a construction Loan should be created within the automation folder 
	'(As of now NBO and XCO fields has been taken care manually 
'@ Description: Creation of  new report with new fields and assert the values entered within form fill up.
'@ TestSteps:
	'1 Login to Encompass with Admin user credentials.
    '2 In the Reports tab, create a new report "Auto Report-Loan Report"
    '3 Go to Fields tab, add few fields.
    '4 Go to Folders tab, select "automation" folder.
    '5 Go to Filters tab and add filters, Save the report
    '6 Go to Pipeline and select loan folder "Automation"
    '8 Create a construction loanswith:
     'a all the relevant data provided within 'NewField.xls' , we are not supposed to fill up or validate data for "SKIP"-ed field
    '9 Now, go to Reports tab, Generate report for "Auto Report-Loan Report", Open and verify the generated excel report.
'@ ExpectedResult:
	'1 Admin user is logged into Encompass
    '2 Newly created report is saved successfully.
    '3 New Construction Laon is successfully created.
    '4 New report is generated successfully.
    '5 In the excel report, all respective column values should match with the NewField.xls referred
'***************************************************************************************************

FRM_RT_SetupTest(null)

FRM_Logger_ReportInfoEvent "Start Test Case : PTAC-3736","Script Name: Reports_GenerateDynamicReport_FilteredCriteria", Null

'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"

FRM_Logger_ReportStepEvent "Start Test Case:PTAC-693","Verify if the user is able to generate the report for the filtered criteria.", Null

Dim objMain, objMainMenu, objReportList, objMainScreen, objReportOptionsDialog, objUsersList, objDataForLoanAmount, objDataForName

Set objMain					=	SwfWindow("swfname:=MainForm")
Set objMainMenu 			=	objMain.SwfToolbar("swfname:=mainMenu")
Set objReportList			=	objMain.SwfObject("swfname:=gvDirectory")
Set objMainScreen			=	objMain.SwfWindow("swfname:=MainScreen")
Set objReportOptionsDialog	=	objMain.SwfWindow("swfname:=ReportOption")
Set objUsersList			=	objReportOptionsDialog.SwfWindow("swfname:=ContactAssignment").SwfListView("swfname:=listView1")

'====== Pre-condition ======
UTIL_Win_CloseExcel()
Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues

'====== Create Loan folder & two loans ======
BIZ_Nav_OpenMenuItem "Encompass;Settings..."
BIZ_Nav_HierarchyTree "Loan Setup", "Loan Folders"
strLoanFolder	=	BIZ_Settings_CreateLoanFolder("Automation" , "OFF" , "OFF")
strLoanFolder="Automation"
Wait g_TinyWaitSmall + g_TinyWaitSmall		'@ Explicit wait used to handle sync issues
BIZ_Pipeline_SelectPipelineViewAndLoanFolder "Super Administrator - Default View", strLoanFolder
BIZ_Loan_AddNewBlankLoanUnderSelectedLoanFolder "Super Administrator - Default View", strLoanFolder
strLoanNumber="1231805EM27056139"
BIZ_Loan_OpenByLoanNumber (strLoanNumber)
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_BorrowerSummaryOrigination_SetBorrower "PTAC-693_Loan1"
BIZ_BorrowerSummaryOrigination_SetTransactionDetails "PTAC-693_Loan1"



 @@ hightlight id_;_SwfWindow("Encompass - Build 18.3.0.0 2").Page("Page").WebEdit("WebEdit")_;_script infofile_;_ZIP::ssf12.xml_;_
Datatable.AddSheet ("NewFields")
DataTable.ImportSheet Environment("TestDir")&"\NewField.xls", 1, "NewFields"
'introw=DataTable.GetSheet("NewFields").GetRowCount()

 Set objMain	=SwfWindow("swfname:=MainForm")
LayeredFlag=False
For i = 1 To introw Step 1
	DataTable.SetCurrentRow(i)
	MyNewDataValue = DataTable.Value("FieldID", "NewFields")
	
	If DataTable.Value("Value", "NewFields")<>"SKIP" Then
	 Set WshShell = CreateObject("WScript.Shell")
	
	If DataTable.Value("UI_layer", "NewFields") ="Layered" Then
			Select Case Left(Split(DataTable.Value("Description", "NewFields"),"PC")(1),1)
				Case "1"
				   Set PClayerWindowButton=objMain.Page("index:=0").WebButton("html id:=btnPopup2001")
				 Case "2"
				 	Set PClayerWindowButton=objMain.Page("index:=0").WebButton("html id:=btnPopup2002")
				 Case "3"
				 	Set PClayerWindowButton=objMain.Page("index:=0").WebButton("html id:=btnPopup2003")
				 Case "4"
				 	Set PClayerWindowButton=objMain.Page("index:=0").WebButton("html id:=btnPopup2004")
		
			End Select
			
			LayeredFlag=True
			'objMain.SwfWindow("swfname:=QuickEntryPopupDialog").Exist(2) 
			If not objMain.SwfWindow("swfname:=QuickEntryPopupDialog").WaitProperty("swfname","QuickEntryPopupDialog") Then
				GUI_WebButton_Click PClayerWindowButton
			End If
			Set objMain	=	objMain.SwfWindow("swfname:=QuickEntryPopupDialog")
		Else
		
			If LayeredFlag Then
				GUI_SwfObj_PerClick objMain.SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
			End If

			LayeredFlag=False
			
			
		End If
	Select Case DataTable.Value("ClassName", "NewFields")
	
		
		   Case "WebCheckBox"
		
		   	 
		   	  If  objMain.Page("index:=0").WebCheckBox(DataTable.Value("Property", "NewFields")).Exist(1) Then
		   	    objMain.Page("index:=0").WebCheckBox(DataTable.Value("Property", "NewFields")).highlight
		   	  	GUI_WebCheckbox_Set objMain.Page("index:=0").WebCheckBox(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  	objfound=true
		   	  Else
		   	  		
					objMain.Activate
     				WshShell.SendKeys "^g"
					GUI_SwfEdit_Set objMain.SwfWindow("swfname:=FieldGoToDialog").SwfEdit("swfname:=findTxt"),MyNewDataValue
	
					GUI_SwfButton_Click objMain.SwfWindow("swfname:=FieldGoToDialog").SwfButton("swfname:=findBtn")
					wait 10
				 If  objMain.Page("index:=0").WebCheckBox(DataTable.Value("Property", "NewFields")).Exist(1) Then
		   	  		GUI_WebCheckbox_Set objMain.Page("index:=0").WebCheckBox(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  		objfound=true
		   	   End If
		  	End If
		   Case "WebEdit"
	
	
		  	 If objMain.Page("index:=0").WebEdit(DataTable.Value("Property", "NewFields")).Exist(1) Then
		  	   objMain.Page("index:=0").WebEdit(DataTable.Value("Property", "NewFields")).highlight
		   	  	GUI_WebEdit_Set objMain.Page("index:=0").WebEdit(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  	objfound=true
		   	  Else
		   	  		
					objMain.Activate
     				WshShell.SendKeys "^g"
					GUI_SwfEdit_Set objMain.SwfWindow("swfname:=FieldGoToDialog").SwfEdit("swfname:=findTxt"),MyNewDataValue
	
					GUI_SwfButton_Click objMain.SwfWindow("swfname:=FieldGoToDialog").SwfButton("swfname:=findBtn")
					wait 10
				  If objMain.Page("index:=0").WebEdit(DataTable.Value("Property", "NewFields")).Exist(1) Then
		  	   	
		   	  		GUI_WebEdit_Set objMain.Page("index:=0").WebEdit(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  		objfound=true
		   	   End If
		  
		   	  End If
	
		    Case "WebList"
		
		   	
		   	If objMain.Page("index:=0").WebList(DataTable.Value("Property", "NewFields")).Exist(1) Then
		   	 objMain.Page("index:=0").WebList(DataTable.Value("Property", "NewFields")).highlight
		   	  GUI_List_Select objMain.Page("index:=0").WebList(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  objfound=true
		   	  
		   	 Else
		   	  		
					objMain.Activate
     				WshShell.SendKeys "^g"
					GUI_SwfEdit_Set objMain.SwfWindow("swfname:=FieldGoToDialog").SwfEdit("swfname:=findTxt"),MyNewDataValue
	
					GUI_SwfButton_Click objMain.SwfWindow("swfname:=FieldGoToDialog").SwfButton("swfname:=findBtn")
					wait 10
				 If objMain.Page("index:=0").WebList(DataTable.Value("Property", "NewFields")).Exist(1) Then
		   	 		
		   	  		GUI_List_Select objMain.Page("index:=0").WebList(DataTable.Value("Property", "NewFields")),DataTable.Value("Value", "NewFields")
		   	  		objfound=true
		   	  	End If
		  
		   	 End If
		
		   
		  
	End Select
	
	 If err.number<>0 or not objfound Then
		   	 Print "Unable to identify Object: "&DataTable.Value("Property", "NewFields")&" with dataval as "&DataTable.Value("Value", "NewFields")
		   	 err.clear
		   End If
		objfound=false
	 Set objMain	=	SwfWindow("swfname:=MainForm")
	End If 
	
Next

	If LayeredFlag Then
			GUI_SwfObj_PerClick objMain.SwfWindow("swfname:=QuickEntryPopupDialog").SwfButton("swfname:=btnClose")
	End If
BIZ_Loan_Save()
strFirstLoan	=	BIZ_Loan_GetLoanNumber()
BIZ_Loan_Exit True
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues


'====== Create Report & Add Fields ======
BIZ_Nav_SelectTabControl "Reports"

If GUI_Object_IsExistX (objReportList, 60) Then
	FRM_Logger_ReportPassEvent "Reports Tab","Reports Tab Opened",Null
Else
	FRM_Logger_ReportFailEvent "Reports Tab","Reports Tab not Opened",Null
End If

strReportName = BIZ_Reports_CreateNewReport ("Auto_9913", "Personal Reports")
GUI_Object_WaitTillVisibleX objReportList, 480		'@ To handle sync Related Issues
GUI_Object_WaitTillExistX objReportList, 60		'@ To handle sync Related Issues
GUI_List_ClickRow objReportList, None, "Name", strReportName, True, False, False, "Single"

introw=DataTable.GetSheet("NewFields").GetRowCount()

For i = 1 To introw Step 1
DataTable.SetCurrentRow(i)
MyNewDataValue = DataTable.Value("FieldID", "NewFields")
BIZ_Reports_AddField MyNewDataValue
Next 

GUI_Object_WaitTillExistX objMain.SwfObject("swfname:=btnSave"), 60	'@ To handle sync Related Issues
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues

'BIZ_Reports_MilestonesTab "Define the loans to include in the report by milestone criteria.", "Started;Processing"
BIZ_Reports_AddFilter "Loan Number","Is (Exact)",strLoanNumber
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues
BIZ_Reports_FoldersTab "Select loan folders manually.", strLoanFolder
GUI_SwfObject_Click objMain.SwfObject("swfname:=btnSave")
Wait g_TinyWaitSmall		'@ Explicit wait used to handle sync issues


GUI_Object_WaitTillExistX objMainScreen.SwfButton("swfname:=btnGenerateReport"), 60	'@ To handle sync Related Issues
GUI_SwfButton_Click objMainScreen.SwfButton("swfname:=btnGenerateReport")

If GUI_Object_IsExistX (objMain.SwfWindow("swfname:=ProgressDialog","swfname path:=ProgressDialog"), 35) Then
	FRM_Logger_ReportPassEvent "Process Dialog", "Report Generated", Null
	Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
	strExcelFilePath = Pathfinder.Locate("Test Report\")&"GenerateReport"&UTIL_Math_RandomNo()&".xlsx"
	UTIL_Excel_Opened_File_Save strExcelFilePath
	Wait g_LongWaitMedium		'@ Explicit wait used to handle sync issues
	
	introw=DataTable.GetSheet("NewFields").GetRowCount()

	For i = 1 To introw Step 1
	DataTable.SetCurrentRow(i)
		DataDesc = DataTable.Value("Description", "NewFields")
		ColNum=UTIL_Excel_GetColumnIndexByName(strExcelFilePath,"Table",Ucase(DataDesc))
	
	If  ColNum<>-1 Then
		 
		 Presentdata=UTIL_Excel_GetCellData (strExcelFilePath,"Table",2,ColNum)
	Else
		ColNum=UTIL_Excel_GetColumnIndexByName(strExcelFilePath,"Table",DataDesc)
		If  ColNum<>-1 Then
			 Presentdata=UTIL_Excel_GetCellData (strExcelFilePath,"Table",2,ColNum)
		Else
			Presentdata="COL NOT FOUND"		 
	 End If
	End If
	 ExcelData=DataTable.Value("Value", "NewFields")
	If Ucase(ExcelData)<>"SKIP" Then
		
	
	   FRM_VerifyEqual Presentdata, ExcelData ,_
	   DataDesc,DataDesc&" we entered and excel sheet value"
	End If
	
	Next
	
	Wait g_ShortWaitMedium		'@ Explicit wait used to handle sync issues
	'UTIL_Excel_Opened_File_Delete strExcelFilePath
End If

Wait g_ShortWaitMedium		'@ Explicit wait used to handle sync issues
UTIL_Win_CloseExcel()

'====== Delete the existing report ======
BIZ_Reports_DeleteReport strReportName, "Personal Reports"


wait g_ShortWaitTime ' Due To Sync Issue We Are Explicitly Passing Wait Statement
'====== Delete Loans ======
BIZ_Pipeline_SelectLoanFolder strLoanFolder
BIZ_Loan_DeleteLoan()



Set objMain					=	Nothing
Set objMainMenu 			=	Nothing
Set objReportList			=	Nothing
Set objMainScreen			=	Nothing
Set objReportOptionsDialog	=	Nothing
Set objUsersList			=	Nothing
Set objDataForLoanAmount	=	Nothing
Set objDataForName			=	Nothing

'====== Logout from the application ======
BIZ_Nav_SelectHomeTab()

BIZ_Login_UserLogout()
FRM_RT_TearDownTest(Null)
