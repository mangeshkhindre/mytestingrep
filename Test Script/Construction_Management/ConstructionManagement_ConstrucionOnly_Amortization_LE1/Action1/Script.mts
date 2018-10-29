'@**************************************************************************************************
'@ TestStory: 
'@ TestCase:
   '1 	
   '2 PTAC-171 Duplicate a Escrow Record
   '3 PTAC-172 Delete a Escrow Record
   '4 PTAC-545 Verify Rename a Escrow Record
   '5 PTAC-170 Verify Edit a Escrow Record
'@ Test Automation JIRA Task: 
'@ TestData: Settings_TablesFees, EscrowFees and Escrow_Table_Record
'@ Pre-conditions: 
'@ Description: Verify and Validate Create, Duplicate, Delete, Rename, Edit functonality of Escrow record 
'@ TestSteps:
   '1 Verify Creation of a new Escrow Record
   '2 Duplicate a Escrow Record
   '3 Delete a Escrow Record
   '4 Verify Rename a Escrow Record
   '5 Verify Edit a Escrow Record
'@ ExpectedResult:
   '1 New Escrow record to be created that populates in Escrow grid
   '2 Duplicate of newly created Esrow to be created that populates in Escrow grid
   '3 Newly created Escrow record to be deleted shouldn't exists in Escrow grid
   '4 Rename the newly created Escrow record ,that populates in Escrow grid
   '5 System should able to edit the existing created Escrow record
'***************************************************************************************************
FRM_RT_SetupTest(null)



'====== Login to the Encompass as admin ======
BIZ_Login_UserLogin "admin_core2p"


RunAction "ConstructionManagement_LEandCD_AmortizationFixedRate_ProductVerify_01", oneIteration

RunAction "ConstructionManagement_LEandCD_AmortizationARM_ProductVerify_02", oneIteration

BIZ_Login_UserLogout()

FRM_RT_TeardownTest(null)








	
	
	 
	

