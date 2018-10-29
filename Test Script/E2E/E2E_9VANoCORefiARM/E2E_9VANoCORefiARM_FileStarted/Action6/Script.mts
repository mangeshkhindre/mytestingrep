'@**************************************************************************************************
'@ TestStory: PTAC-2802 E2E_9VANoCORefiARM
'@ TestCase : PTAC-2393 File started 5 - Add VOL for subject property and attach to VOM
'@ Test Automation JIRA Task: PTAC-2803 E2E_9VANoCORefiARM_FileStarted
'@ TestData: 
   'Forms_VOL, SetVOLData, strRowID
'@ Pre-conditions: 
'@ Description:  
'@ TestSteps:
   '1 Click on 'Verifs' tab and click on 'VOL'.Click 'Yes' in the message pop up window
   '2 Click on 'New verif' icon.
   '3 Select 'VOL' is for borrower from the dropdown.Enter the following fields:Name: Wells Fargo.Account type: Mortgage
	  'Account in name of :John Homeowner
	  'Factor for revolving debt 
	  'balance: 50,000 months left: 240
	  'check the check box -will be paid off
	  'payment: 200
   '4 Click on 'Verifs' tab and click on 'VOM'
   '5 Click on 'new verif' icon.
   '6 Check the check box for wells fargo and click on 'ok'
   '7 Enter the following data in VOM page that opens:
	  'Check the check box for subject property
	  'For 'property is used as' select 'primary residence' from the dropdown
	  'Click on Attach/Show liens button
	  'Type of property: Single family
	  'Date acquired: 01/01/1985
'@ ExpectedResult: 
   '1 VOL page should open.An Encompass pop up will also open with a Fannie Mae message.Pop up will close
   '2 New VOL page should open.
   '3 Should be able to enter all fields
   '4 VOM page should open
   '5 Import mortgage from liability window will open.
   '6 Pop up will close and VOM page should be visible
   '7 Should be able to enter the values
'***************************************************************************************************

FRM_Logger_ReportStepEvent "Start Test Case: PTAC-2393","File started 5 - Add VOL for subject property and attach to VOM",Null

BIZ_Nav_OpenMenuItem "Verifs;VOL"

GUI_Dialog_Encompass_YesX 30,""

BIZ_VOL_SetVOLData "E2E_VANoCORefiARM"

BIZ_Nav_OpenMenuItem "Verifs;VOM"

BIZ_VOM_SelectLiability "E2E_VANoCORefiARM"

BIZ_VOM_SetVOMData "E2E_VANoCORefiARM"