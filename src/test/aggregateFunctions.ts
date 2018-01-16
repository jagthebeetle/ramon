import * as agg from '../aggregateFunctions';
import { expect } from 'chai';
import { datasetFromRange } from '../index';

const {data} = datasetFromRange(10);

describe('sum', () => {
    it('should add the values of each datum\'s .[aggregateField].', () => {
        const result = agg.sum(data, 'val');
        expect(result).to.equal(45);
    });

    it('should average the values of all data\'s .[aggregateField].', () => {
        const result = agg.average(data, 'val');
        expect(result).to.equal(4.5);
    });
    

    it('should return data.length.', () => {
        const result = agg.count(data, 'val');
        expect(result).to.equal(10);
    });
});