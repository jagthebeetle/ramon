import { group } from '../data';
import { sum } from '../aggregateFunctions';

describe('group', () => {
    it('should group data by the provided keys and function.', () => {
        type testDatum = {name: string, time: string, commits: number};
        const data: testDatum[] = [
            {name: 'John', time: 'winter', commits: 4},
            {name: 'Alice', time: 'winter', commits: 4},
            {name: 'Alice', time: 'fall', commits: 4},
            {name: 'Bob', time: 'winter', commits: 4},
        ];
        const grouping: ramon.Grouping<testDatum> = {
            groupFields: ['name'],
            aggregateField: 'commits',
            aggregateFn: sum
        };
        expect(group(data, grouping)).toEqual([
            {name: 'John', sum_commits: 4},
            {name: 'Alice', sum_commits: 8},
            {name: 'Bob', sum_commits: 4}
        ]);
    });
});
