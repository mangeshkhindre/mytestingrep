<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
                   <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type='text/javascript' src='https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.1.1.min.js'></script>
   <script type="text/javascript">

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
		var passCountPie=$("#tbReportCount").find("th.passCountInfo").text();
		var failCountPie=$("#tbReportCount").find("th.failCountInfo").text();
        data.addRows([
          ['Passed', parseInt(passCountPie)],
          ['Failed', parseInt(failCountPie)]
        ]);

        // Set chart options
        var options = {'title':'Execution Details', colors:['#008000', '#ff0000']};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
                                hideGridDetails();
                                fnUpdateGraph();
      }
                  
                  function drawDynamicChart(passCount, failCount) {
                                try{
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Passed', parseInt(passCount)],
          ['Failed', parseInt(failCount)]
        ]);
                                
        // Set chart options
        var options = {'title':'Execution Details', colors:['#008000', '#ff0000']};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
                                }
                                catch(err){
                                                alert(err);
                                }
                }
    </script>

     <style>
        body {font-family:verdana, serif; }
                                table {text-align: left; border: 5px double gray; border-collapse:collapse; font-size:.875em; background:#FFFFFF; table-layout: fixed; }
        td {border: 1px solid black; padding: 3; word-wrap: break-word; overflow: hidden; text-overflow:ellipsis;word-break:break-all; word-wrap:break-word;}
        tr:nth-child(even) {background-color: rgba(230, 240, 255, .6)}
        tr:nth-child(odd) {background-color: #FFFFFF}
        table tr.header2 {background-color:#85B5FF; font-weight:bold;}
        table tr.header {background-color:#AAAAAA; font-size:1em;  font-weight:bold; color:white}
        table tr.step {background-color:#CCCCCC}
        table td.warn {color:#FFA66A; font-weight:bold;}
        table td.pass {color:white; font-weight:bold; background-color:green;}
                                table td.info {color:black; font-weight:bold;}
        table td.fail, td.error, td.fatal {color:white; font-weight:bold;background-color:red;}
        table td.debug {color:grey; font-weight:bold;}
    </style>
<xsl:text disable-output-escaping="yes"> 
                                <![CDATA[      
                                <script type="text/javascript"> 
                                 function showLevel(statusValue){
                                               var statusAry = new Array("trace","debug","info","pass","warn","error","fail","fatal")
           //if status value = all, display all level log
            if (statusValue == "all")
                                                {
                for(var i = 0;i < statusAry.length; i++)
                                                                {
                    eles = getElementsByClassNameAndTagName(statusAry[i],"TD");
                    for (var j =0; j<eles.length;j++){eles[j].parentNode.style.display = "";}
                }
            }
                 else{
                //display selected level log and no display all other level log
                eles = getElementsByClassNameAndTagName(statusValue,"TD");
                for (var j =0; j<eles.length;j++){eles[j].parentNode.style.display = "";}
                
                for(var i = 0;i < statusAry.length; i++){
                                                                                if (statusValue != statusAry[i]){
                        eles = getElementsByClassNameAndTagName(statusAry[i],"TD");
                        for (var j =0; j<eles.length;j++){eles[j].parentNode.style.display = "none";}
                     }
                }
            }
        }   
        
        
        function getElementsByClassNameAndTagName(strClassName,strTagName){
                                                var eles = [];
             var tmpEles = [];
             if (document.getElementsByClassName) {
                tmpEles = document.getElementsByClassName(strClassName);
                                                                for (var i =0; i<tmpEles.length;i++){if(tmpEles[i].tagName == strTagName){ $(tmpEles[i]).closest("tr").addClass("rptFilter"); eles.push(tmpEles[i]);}} 
             } else{
                tmpEles = document.getElementsByTagName(strTagName);
                for (var i =0; i<tmpEles.length;i++){if(tmpEles[i].className == strClassName){ $(tmpEles[i]).closest("tr").addClass("rptFilter"); eles.push(tmpEles[i]);}}
             }
             return eles;
        }  
                                
                                function hideGridDetails()
                                {
                                                var scriptName = "";
                                                $("#tbReport").find("tr").each(function(index, trObj){
                                                                if($(this).index() > 0 && $(this).find("td.stepDescription").text().indexOf(".html") == -1){
                                                                                $(trObj).hide();
                                                                }
                                                                else if($(this).index() > 0) {
                                                                                $(trObj).addClass("rptMainRow");
                                                                                $(trObj).removeClass("show");
                                                                                scriptName = $(trObj).find("td.stepDescription").text();
                                                                                if(scriptName != "" && scriptName.indexOf('\\'))
                                                                                {
                                                                                                scriptName = scriptName.split('\\')[scriptName.split('\\').length - 1];
                                                                                }
                                                                                $(trObj).find("td:eq(0)").text(scriptName.substring(0, scriptName.length - 21));
                                                                }
                                                });
                                                                
                                }
                                
                                $(document).ready(function(){
                                                $("#tbReport td").click(function(){
                                                                if($(this).closest("tr").find("td.stepDescription").text().indexOf(".html") != -1){
                                                                                if($(this).closest("tr").hasClass("show")) {
                                                                                                hideGridDetails();
                                                                                }
                                                                                else {
                                                                                                hideGridDetails();
                                                                                                var $tr = $(this).closest("tr");
                                                                                                var trLst = [];
                                                                                                $("#tbReport").find("td.stepDescription:contains('.html')").each(function(){
                                                                                                                trLst.push($(this).closest("tr").index());
                                                                                                });
                                                                                                if(trLst.length > 0) {
                                                                                                                var index = $.inArray( $tr.index(), trLst), endIndex = 0 , startIndex = $tr.index(), diff = 0;
                                                                                                                if(index != trLst.length - 1) {
                                                                                                                                endIndex = trLst[index + 1];
                                                                                                                }
                                                                                                                else {
                                                                                                                                endIndex = $("#tbReport").find("tr").length;
                                                                                                                }
                                                                                                                $("#tbReport tr:eq("+ startIndex + ")").addClass("show");
                                                                                                                for(var i = startIndex + 1; i < endIndex; i++){
                                                                                                                                $("#tbReport tr:eq("+ i + ")").show();
                                                                                                                                $("#tbReport tr:eq("+ i + ")").addClass("rptItems");
                                                                                                                }                                                                                              
                                                                                                }
                                                                                }
                                                                }
                                                });
                                });
                                
                                function fnUpdateGraph(){
                                                if($("#tbReportCount").find("tr").length > 0){
                                                                drawDynamicChart($("#tbReportCount").find("th.passCountInfo").text(), $("#tbReportCount").find("th.failCountInfo").text());
                                                }
                                }
                                
                                function showImg(imgSrc, H, W, Caption)
{var newImg = window.open("","myImg",config="height="+H+",width="+W+"")
newImg.document.write("<img src='"+imgSrc+"' height='window.innerHeight/2' width='window.innerWidth/2'  onclick='window.close()' style='position:absolute;left:0;top:0'>")
newImg.document.write("<script type='text/javascript'> document.oncontextmenu = new Function(\"return false\")</scr"+"ipt>")
newImg.document.close()}
                                
                                </script> 
                                ]]>
</xsl:text>
  <style type="text/css">
          .tableHeader, tr.tableHeader th
          {
          color: #FFFFFF;
          font-weight: bold;
          font-size: 15px;
          font-family: Verdana;
          background-color: #00008B;
          text-align: center;
          padding: 3px 3px 1px;
          }
          .tableFooter
          {
          color: #AAAAAA;
          font-size: 13px;
          font-family: Verdana;
          text-align: center;
          padding: 3px 3px 1px;
          }
          .tableBorder
          {
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 10px;
          border-top: 3px solid #ccc;
          border-bottom: 3px solid #ccc;
          border-left: 3px solid #ccc;
          border-right: 3px solid #ccc;
          border-width: 2px;
          border-color: #D9D9FF;
          }
          .table_hl
          {
          margin: 2px;
          padding: 5px;
          color: #990000;
          font-weight: bold;
          font-size: 11px;
          font-family: Verdana;
          border-top: 1px solid #669;
          border-bottom: 1px solid #669;
          border: 1px solid #666699;
          text-align: center;
          }
.table_h2 {margin: 2px;padding: 5px;color: #990000;font-weight: bold;font-size: 11px;font-family: Verdana;border-top: 1px solid #669;border-bottom: 1px solid #669;border: 1px solid #666699;text-align: center;}
          .table_cell
          {
          margin: 2px;
          padding: 5px;
          color: #000000;
          font-size: 11px;
          font-family: Verdana;
          border-top: 1px solid #669;
          border-bottom: 1px solid #669;
          border: 1px solid #666699;
          text-align: left;
          }
          .envDetCaption
          {
          padding: 2px;
          font-family: verdana;
          font-size: 11px;
          color: #000000;
          font-weight: bold;
          }
          .envDetValue
          {
          font-family: verdana;
          font-size: 11px;
          color: #000000;
          }
          .envDetColon
          {
          font-family: verdana;
          font-size: 11px;
          font-weight: bold;
          color: #000000;
          }
                                  tr.rptHTML {
                                                background-color: rgb(230, 240, 255);
                                  }
                                  tr.rptItems.rptHTML, tr.rptFilter  {
                                                background-color: #fff;
                                                color:#000;
                                  }
                                  .mainTable td.envDetCaption{
                                                text-align:left;
                                                width: 10% !important;
                                                border:0px;
                                  }.mainTable td.envDetValue{
                                                text-align:left;
                                                width: 40% !important;
                                                border:0px;
                                                border-right: 3px solid black;
                                  }
                                  .trBreak{
                                                width: 2% !important;
                                                border:0px;
                                  }
                                  tr.rptMainRow {
                                                background-color: rgb(133,181,255);
                                  }
                                  <!-- tr.rptMainRow td:not(:first-child) {
                                                display:none;
                                  } -->
        </style>
  <body>
  <h2 style="text-align: center">Reporter Viewer</h2>
  <table cellpadding="0" cellspacing="0" width="100%" style="border-color: Black; overflow: visible" class="mainTable">
    <tr>
                                <th class="tableHeader"  width="100%" colspan="6">Environment Details</th>
                </tr>
                <tr>
                  <td class="envDetCaption">Project</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/Project"/></td>
                  <td class="envDetCaption">User</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/User"/></td>
                </tr>
                <tr>
      <td class="envDetCaption">Environment</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/Environment"/></td>
                  <td class="envDetCaption">Execution Status</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/Status"/></td>
    </tr>
                <tr>
      <td class="envDetCaption">Date</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/DateTimeStamp"/></td>
                  <td class="envDetCaption">Duration</td>
                  <td class="trBreak">:</td>
                  <td class="envDetValue"><xsl:value-of select="ReportViewer/EnvironmentDetails/Duration"/></td>
    </tr>
</table>

  <br></br>
  <table width="100%" id="tbReportCount">
  <tr>
                <th class="tableHeader" colspan="3">HighLevel Summary Report</th>
  </tr>
   <tr>
      <th class="table_cell" width="20%">Total Number of Test Cases</th>
                  <th class="table_cell"><xsl:value-of select="ReportViewer/TestSummaryReport/TotalTestCasesExeucted"/></th>
                  <th class="table_cell" rowspan="5"><div align="center" id="chart_div"></div></th>
                </tr>
                <tr>
      <th class="table_cell">Total Number of Passed Test Cases</th>
                  <th class="table_cell passCountInfo"><xsl:value-of select="ReportViewer/TestSummaryReport/TotalTestCasesPassed"/></th>
                </tr>
                <tr>
      <th class="table_cell">Total Number of Failed Test Cases</th>
                  <th class="table_cell failCountInfo"><xsl:value-of select="ReportViewer/TestSummaryReport/TotalTestCasesFailed"/></th>
                </tr>
  </table>
  <br></br>
  <table border="1" width="100%" id="tbReport">
                <tr class="tableHeader">
            <th width="25%">Step Name</th>
            <th width="50%">Details</th>
            <th width="10%">
                Result
                                <select name="statusVal" onchange = "showLevel(this.value)"> 
                <option value="all" selected="selected">All</option>
                <option value="trace">Trace</option>
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="pass">Pass</option> 
                <option value="warn">Warn</option>
                <option value="error">Error</option>
                <option value="fail">Fail</option>
                <option value="fatal">Fatal</option>    
                </select> 
            </th>

            <th width="10%">Run Time</th>
                                                <th width="5%">Screenshot</th>
        </tr>

                <xsl:for-each select = "ReportViewer/TestCaseName/TestStep"> 
                                <tr>
                                                <xsl:choose>
                                                                <xsl:when test="contains(.,'Start Test Case')">  
                                                                                <td class="stepName">
                                                                                                <xsl:attribute name="class">header2</xsl:attribute>
                                                                                                <xsl:value-of select = "StepName"/>
                                                                                </td> 
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                <td><xsl:attribute name="class"></xsl:attribute>
                                                                                                <xsl:value-of select = "StepName"/></td>
                                                                </xsl:otherwise>
                                                </xsl:choose>                   
                                                <td class="stepDescription"><xsl:value-of select = "StepDescription"/></td>  
                                                <xsl:choose>
                                                                <xsl:when test="contains(., 'Pass')">
                                                                                <td class="pass" bgcolor="green"><xsl:value-of select = "Result"/>  </td>
                                                                </xsl:when>
                                                                <xsl:when test="contains(., 'Fail')">
                                                                                <td class="fail" bgcolor="red"><xsl:value-of select = "Result"/> </td>
                                                                </xsl:when>
                                                                <xsl:when test="contains(., 'Info')">
                                                                                <td class="info" bgcolor="yellow"><xsl:value-of select = "Result"/> </td>
                                                                </xsl:when>
																<xsl:when test="contains(., 'Fatal')">
                                                                                <td class="info" bgcolor="#7f0000"><xsl:value-of select = "Result"/> </td>
                                                                </xsl:when>
                                                </xsl:choose>
                                                <td><xsl:value-of select = "RunTime"/></td>  
                                                <td>
                                                    <img width="100" height="100" border="0" onclick="showImg(this.src, 800, 1200, 'SalesOrderInitialScreen590')">
                                                                                <xsl:attribute name="src">
                                                                                                <xsl:value-of select="Screenshot" />
                                                                                </xsl:attribute>
                                                     </img>
                                                </td>  
                                </tr>
                </xsl:for-each>
                </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
