import { filterBySource } from './chartHelpers';
import { graphApi } from './mockData';

describe('make chart dataset', () => {
  test('empty array returns empty', () => {
    // define the input
    let input = [];

    // define the expected output
    const expected = [];

    // test it
    expect(filterBySource(input)).toEqual(expected);
  });

  test('given 1 entry', () => {
    // define the input
    let input = [
      {
        itemName: 'Paper Cups',
        sourceName: 'Cafe 1',
        date: '2022-01-28',
        totalWeight: '5.55',
      },
    ];

    // define the expected output
    const expected = [
      {
        label: 'Paper Cups', // item name
        data: [5.55], // weights
      },
    ];

    // test it
    expect(
      filterBySource(input).map((a) => ({ label: a.label, data: a.data }))
    ).toEqual(expected);
  });

  test('given 2 entries', () => {
    // define the input
    let input = [
      {
        itemName: 'Paper Cups',
        sourceName: 'Cafe 1',
        date: '2022-01-28',
        totalWeight: '5.55',
      },
      {
        itemName: 'Paper Cups',
        sourceName: 'Cafe 1',
        date: '2022-01-28',
        totalWeight: '15.55',
      },
    ];

    // define the expected output
    const expected = [
      {
        label: 'Paper Cups', // item name
        data: [5.55, 15.55], // weights
      },
    ];

    // test it
    expect(
      filterBySource(input).map((a) => ({ label: a.label, data: a.data }))
    ).toEqual(expected);
  });

  test('given 2 entries with 2 different items', () => {
    // define the input
    let input = [
      {
        itemName: 'Paper Cups',
        sourceName: 'Cafe 1',
        date: '2022-01-28',
        totalWeight: '5.55',
      },
      {
        itemName: 'Coffee Chaff',
        sourceName: 'Cafe 1',
        date: '2022-01-28',
        totalWeight: '15.55',
      },
    ];

    // define the expected output
    const expected = [
      {
        label: 'Paper Cups', // item name
        data: [5.55], // weights
      },
      {
        label: 'Coffee Chaff', // item name
        data: [15.55], // weights
      },
    ];

    // test it
    expect(
      filterBySource(input).map((a) => ({ label: a.label, data: a.data }))
    ).toEqual(expected);
  });
});
