import { group } from '../data';
import { sum } from '../aggregateFunctions';
import { expect } from 'chai';
import 'mocha';

describe('group', () => {
    it('should group data by the provided keys and function.', () => {
        const data: ramon.Datum[] = [
            {name: 'John', time: 'winter', commits: 4},
            {name: 'Alice', time: 'winter', commits: 4},
            {name: 'Alice', time: 'fall', commits: 4},
            {name: 'Bob', time: 'winter', commits: 4},
        ];
        const grouping: ramon.Grouping = {
            groupFields: ['name'],
            aggregateField: 'commits',
            aggregateFn: sum
        };
        expect(group(data, grouping)).to.have.deep.members([
            {name: 'John', sum_commits: 4},
            {name: 'Alice', sum_commits: 8},
            {name: 'Bob', sum_commits: 4}
        ]);
    });
});
