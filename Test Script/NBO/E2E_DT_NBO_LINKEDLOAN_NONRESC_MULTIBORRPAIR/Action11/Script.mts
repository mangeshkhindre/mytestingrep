'==========================Send Intial CD - Manual Disclosure======
FRM_Logger_ReportStepEvent "Send Manual Initial CD for Multiple Borrower Pairs", "Started sending Manual Initial CD for Multiple Borrower Pairs", Null

'===========Get borrwer pair names ============
strBorrPair1=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR1")
strBorrPair2=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR2")
strBorrPair3=BIZ_DisclosureTrackingTool_GetBorrowerPair("E2E_DT_NONRESC_PAIR3")

'================Inital CD Sent Dates=================
Dim arrInitialCDSentDates(2)
 arrInitialCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-30,Date),1,"Reg_ZBusinessCalender")
 arrInitialCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-28,Date),1,"Reg_ZBusinessCalender")
 arrInitialCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(DateAdd("d",-29,Date),1,"Reg_ZBusinessCalender") 

'======= Add Initial CD Disclosure for all three borrower paris ============
FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_Forms_Open "Borrower Summary - Origination"
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD" 

FRM_Logger_ReportInfoEvent "Send Manual Initial CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Initial CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'======Click on Sync Data in Toolbar======
If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),5) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
   	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data" 
End If

'======Select template and Sync Data between two loans======
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) = True Then
    Set objSyncTemp=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
	GUI_List_ClickRow objSyncTemp,Null,"Name","Const-to-Perm Sync",True,False,False,"Single" 'template name Const-to-Perm Sync
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
	GUI_Dialog_Encompass_YesX 5,"Are you sure you want to synchronize data between two loans?" 
	GUI_Dialog_Encompass_OKX 10,"Both loans have been synchronized."
End If

'==================Validate Initial CD Received Date for Multiple Borrower Pairs ====================
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_ValidateIntialCD arrInitialCDSentDates,strBorrPair1,strBorrPair2,strBorrPair3,"Yes"

'=========Send Revised CD - Manual Disclosure======
FRM_Logger_ReportStepEvent "Send Revised Manual Revised CD for Multiple Borrower Pairs", "Started sending Manual Revised CD for Multiple Borrower Pairs", Null

'================Revised CD Sent Dates=================
dtRevised=DateAdd("d",9,arrInitialCDSentDates(1))
Dim arrRevisedCDSentDates(2)
 arrRevisedCDSentDates(0)=BIZ_DisclosureTracking_DateCalculation(dtRevised,1,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(1)=BIZ_DisclosureTracking_DateCalculation(dtRevised,3,"Reg_ZBusinessCalender")
 arrRevisedCDSentDates(2)=BIZ_DisclosureTracking_DateCalculation(dtRevised,2,"Reg_ZBusinessCalender")
 
'======= Add Revised CD Disclosure for all three borrower paris ============
BIZ_Forms_Open "Borrower Summary - Origination"
FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair1, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair1, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair1,"CD"  

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair2, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair2, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair2,"CD"  

FRM_Logger_ReportInfoEvent "Send Manual Revised CD for Borrower Pair: "&strBorrPair3, "Started sending Manual Revised CD for Borrower Pair: "&strBorrPair3, Null    
BIZ_DisclosureTracking_MultipleBorrPair_AddDisclosure strBorrPair3,"CD"

'======Click on Sync Data in Toolbar======
If GUI_Object_IsExistX (SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan"),5) Then
	GUI_SwfObject_Click SwfWindow("swfname:=MainForm").SwfObject("swfname:=elmLinkedLoan")
   	GUI_SwfToolbar_Select  SwfWindow("swfname:=MainForm").SwfToolbar("swftypename:=System.Windows.Forms.ContextMenuStrip","swfname:="), "Sync Data" 
End If

'======Select template and Sync Data between two loans======
If GUI_Object_IsExist(SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog")) = True Then
    Set objSyncTemp=SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfObject("swfname:=gvDirectory")
	GUI_List_ClickRow objSyncTemp,Null,"Name","Const-to-Perm Sync",True,False,False,"Single" 'template name Const-to-Perm Sync
	GUI_SwfButton_Click SwfWindow("swfname:=MainForm").SwfWindow("swfname:=TemplateSelectionDialog").SwfButton("swfname:=selectBtn")
	GUI_Dialog_Encompass_YesX 5,"Are you sure you want to synchronize data between two loans?" 
	GUI_Dialog_Encompass_OKX 10,"Both loans have been synchronized."
End If

'==================Validate Initial CD Received Date ====================
BIZ_DisclosureTracking_NonResc_MultipleBorrPair_ValidateRevisedCD arrRevisedCDSentDates,strBorrPair1,strBorrPair2,strBorrPair3,"Yes"

'=============== Save Loan ==================
BIZ_Loan_Save  
