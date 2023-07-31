const axios = require('axios');


class FileController {

    async processData() {
        let data = await this.getData();
        return this.getString(this.convertToJson(data));
    }

    async getData() {
        const url = `https://coderbyte.com/api/challenges/json/age-counting`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener detalles externos:', error.message);
            return null;
        }
    }

    convertToJson(data) {
        const dataSlice = data.toString().trim().slice(1, -1);
        const keyValuePairs = dataSlice.split(', ');
        const dataArray = [];

        for (let i = 0; i < keyValuePairs.length; i += 2) {
            const key = keyValuePairs[i].split('=');
            const age = keyValuePairs[i + 1].split('=');
            const obj = {
                key: key[1].trim(),
                age: parseInt(age[1].trim())
            };
            dataArray.push(obj);
        }
        //console.log(dataArray);
        return dataArray;
    }

    getString(dataArray) {
        let stringKeys = "";
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].age === 32) {
                console.log(dataArray[i].key);
                stringKeys += dataArray[i].key + "\n";
            }
        }
        console.log(stringKeys);
        return stringKeys;
    }
}

module.exports = FileController;