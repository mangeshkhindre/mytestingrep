::cd..
::cd\   
pushd "%~dp0"
   set cdFilePath=%1
	 set filePath=%2
 	 set pieCharHeader=%3
	 set passCount=%4
	 set failCount=%5


::cd %cdFilePath% 
java -cp %filePath%\JR\*;.\EmailPieCharJar.jar;. StatusEmailBody %pieCharHeader% %passCount% %failCount% %filePath%"\\SummaryReport\\ImagePieCrtEmBdy.png" %filePath%\\SummaryReport\\HtmlPieCrtEmBdy.html"
