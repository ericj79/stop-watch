class ResultsCollection {
    collection = [];

    getCollection() {
        return collection;
    }

    addResult(result) {
        let index = 0;
        for (let index = 0; index < this.collection.length; index++) {
            let current = this.collection[index];
            if (result.time < current.time) {
                break;
            }             
        }
        this.collection.splice(index, 0 , result);
        return index;
    }

}
results = new ResultsCollection();

module.exports = results;