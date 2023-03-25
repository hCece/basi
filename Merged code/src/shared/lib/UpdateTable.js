
const phpRequest = new PhpRequest();
let previousData = null;

class UpdateTable{
    update = function(tableBody, storedProcedure) {
        phpRequest.mySql(storedProcedure, 'GET', {});
        const responseData = phpRequest.getResponse();

        if (responseData !== previousData) {
        previousData = responseData;
        const jsonData = JSON.parse(responseData);
        console.log(jsonData);
        tableBody.innerHTML = ''; // Clear the existing table rows
        for (let i = 0; i < jsonData.length; i++) {
            this.fillRow(jsonData, tableBody, i);
            }
        }
        return tableBody;
    };



    fillRow = function(jsonData, tableBody, i) {
        const data = jsonData[i];
        let j = 0;
        const row = tableBody.insertRow(i); // Create a new table row
        for(const value in data){
            const cell = row.insertCell(j); // Insert a new cell in the row
            cell.innerHTML = data[value]; // Update the cell value with the JSON data
            j++;
        }
    }
    
}

  
  
  
  
  