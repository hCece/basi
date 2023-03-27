
const phpRequest = new PhpRequest();
let previousData = null;

//This class keeps a table updated in real time, bu making request to a php server 
// and changing the consent into the sent table.
class UpdateTable{
    /** 
     * This function takes in input the name of a stored procedure/query and the body of a table,
     * makes a request to the php server and the return value get's populated
     * @param {tBody} tableBody 
     * @param {<PhpRequest.DB>} storedProcedure 
     * @returns 
     */
    update = function(tableBody, storedProcedure) {
        phpRequest.mySql(storedProcedure, 'GET', {});
        const responseData = phpRequest.getResponse();

        if (responseData !== previousData) {
        previousData = responseData;
        const jsonData = JSON.parse(responseData);
        console.log(jsonData);
        tableBody.innerHTML = ''; // Clear the existing table rows
        for (let row = 0; row < jsonData.length; row++) {
            this.fillRow(jsonData, tableBody, row);
            }
        }
        return tableBody;
    };


    /** Populates a single row of data. It iterates over a single json object, 
     * extracts each point of data and set's it into a cell.
     * @param {json} jsonData 
     * @param {tBody} tableBody 
     * @param {int} nrRow 
     */
    fillRow = function(jsonData, tableBody, nrRow) {
        const data = jsonData[nrRow];
        let j = 0;
        const row = tableBody.insertRow(nrRow); // Create a new table row
        for(const value in data){
            const cell = row.insertCell(j); // Insert a new cell in the row
            cell.innerHTML = data[value]; // Update the cell value with the JSON data
            j++;
        }
    }
    
}

  
  
  
  
  