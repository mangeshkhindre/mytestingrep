import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReadWriteExcelFile {
	/*----------------------------------------------------------------------------
	Function Name    	: writeXLSXValue
	Description     	: 
	Input Parameters 	:                      
	Return Value    	:  
	Author		        : Sharad Mali
	Date of creation	:
	Date of modification:	
	----------------------------------------------------------------------------*/
	public static boolean writeXLSXValue(String ExcelFileName, String SheetName, String[] valueToWrite)
			throws IOException {
		boolean xlsStatus = false;
		try {
//			String domain = "EM";
//			String userName = "smali";
//			String password = "EllieMae@2018";
			
//			String domain = "DCO";
//			String userName = "smali";
//			String password = "Jun-2018";
//			
//
//			//domain, username, password
//			UserAuthenticator auth = new StaticUserAuthenticator(domain, userName, password);
//			FileSystemOptions opts = new FileSystemOptions();
//			DefaultFileSystemConfigBuilder.getInstance().setUserAuthenticator(opts, auth);
//			FileObject fo = VFS.getManager().resolveFile(ExcelFileName, opts);
//			System.out.println(fo.exists());


			File file = new File(ExcelFileName);
			// Create an object of FileInputStream class to read excel file
			FileInputStream inputStream = new FileInputStream(file);
			// If it is xlsx file then create object of XSSFWorkbook class
			Workbook workbook = new XSSFWorkbook(inputStream);
			// Read excel sheet by sheet name
			Sheet sheet = workbook.getSheetAt(0);
			// Get the current count of rows in excel file
			int rowCount = sheet.getLastRowNum() - sheet.getFirstRowNum();
			// Get the first row from the sheet
			Row row = sheet.getRow(0);
			// Create a new row and append it at last of sheet
			Row newRow = sheet.createRow(rowCount + 1);
			// Create a loop over the cell of newly created Row
			for (int j = 0; j < row.getLastCellNum(); j++) {
				String colName = row.getCell(j).getStringCellValue();				
				// Fill data in Newrow
				Cell cell = newRow.createCell(j);
				if(colName.equalsIgnoreCase("Build_ID") || colName.equalsIgnoreCase("Total_TCs_Executed") || colName.equalsIgnoreCase("Total_TCs_Pass") || colName.equalsIgnoreCase("Total_TCs_Fail")) {
					int val = Integer.parseInt(valueToWrite[j]);
					cell.setCellValue(val);
				} else {
					cell.setCellValue(valueToWrite[j]);
				}
			}
			// Close input stream
			inputStream.close();
			
			// Create an object of FileOutputStream class to create write data in excel file
			FileOutputStream outputStream = new FileOutputStream(new File(ExcelFileName));
			// write data in the excel file
			workbook.write(outputStream);
			// close output stream
			outputStream.close();
			workbook.close();
			xlsStatus = true;

		} catch (FileNotFoundException e) {
			xlsStatus = false;
			System.out.println("File not found:" + e.getMessage());
			;
		} catch (IOException e) {
			xlsStatus = false;			
			System.out.println("File not found:" + e.getMessage());
		}
		return xlsStatus;

	}

}