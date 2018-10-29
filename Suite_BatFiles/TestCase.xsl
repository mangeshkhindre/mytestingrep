<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">

  <html>
     <style>
        body {font-family:verdana, serif; }
		table {text-align: left; border: 5px double gray; border-collapse:collapse; font-size:.875em; background:#FFFFFF; table-layout: fixed; }
        td, th {border: 1px solid black; padding: 3; word-wrap: break-word; overflow: hidden; text-overflow:ellipsis;word-break:break-all; word-wrap:break-word;}
        tr:nth-child(even) {background-color: #E6F0FF}
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
            if (statusValue == "all"){
                for(var i = 0;i < statusAry.length; i++){
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
                for (var i =0; i<tmpEles.length;i++){if(tmpEles[i].tagName == strTagName){eles.push(tmpEles[i]);}} 
             } else{
                tmpEles = document.getElementsByTagName(strTagName);
                for (var i =0; i<tmpEles.length;i++){if(tmpEles[i].className == strClassName){eles.push(tmpEles[i]);}}
             }
             return eles;
        }  
		function showImg(imgSrc, H, W, Caption) 
		{
			var newImg = window.open("","myImg",config="height="+H+",width="+W+"")
			newImg.document.write("<title>"+ Caption +"</title>")
			newImg.document.write("<img src='"+ imgSrc +"' height='window.innerHeight/2' width='window.innerWidth/2'  onclick='window.close()' style='position:absolute;left:0;top:0'>")
			newImg.document.write("<script type='text/javascript'> document.oncontextmenu = new Function(\"return false\")</scr"+"ipt>")
			newImg.document.close()
		}
    	</script> 
		]]>
	</xsl:text>
 <body>
    <table width = "100%" border="1">
        <tr class="header">
            <td width="25%">Step Name</td>
            <td width="50%">Details</td>
            <td width="10%">
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
            </td>

            <td width="25%">Run Time</td>
			<td width="25%">Screenshot</td>
        </tr>
		<xsl:for-each select = "TestCase/TestStep"> 
			<tr> 
                <td><xsl:value-of select = "StepName"/></td> 
				<td><xsl:value-of select = "StepDescription"/></td> 
				
				<xsl:choose> 
                    <xsl:when test = "Result = 'Pass'"> 
                        <td class="pass"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
					<xsl:when test = "Result = 'Fail'"> 
                        <td class="fail"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
					<xsl:when test = "Result = 'Info'"> 
                        <td class="info"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 	
					<xsl:when test = "Result = 'Debug'"> 
                        <td class="debug"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
					<xsl:when test = "Result = 'Error'"> 
                        <td class="error"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
					<xsl:when test = "Result = 'Fatal'"> 
                        <td class="fatal"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
					<xsl:when test = "Result = 'Warn'"> 
                        <td class="warn"><xsl:value-of select = "Result"/></td> 
                    </xsl:when> 
                    <xsl:otherwise> 
						<td><xsl:value-of select = "Result"/></td> 
                    </xsl:otherwise> 
                 </xsl:choose> 
				 <td><xsl:value-of select = "RunTime"/></td> 
				 <td>
				 <img width="50" height="50" onclick="showImg(this.src, 800, 1200, '')">
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