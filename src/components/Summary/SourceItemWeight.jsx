import { useState, useEffect } from 'react';

export default function SourceItemWeight({ totalWeightsList }) {
  useEffect(() => {
    console.log('this is from the table! ', totalWeightsList);
  }, []);
  return (
    <div>
      {totalWeightsList.map((sourceRow, index) => (
        <>
          <h3 key={index}>{sourceRow.source}</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Weight</th>
              </tr>
            </thead>
            <tbody>
              {sourceRow['totals'].map((lineItem, index) => (
                <tr key={index}>
                  <td> {lineItem.item} </td>
                  <td> {lineItem.totalWeight} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr></hr>
        </>
      ))}
    </div>
  );
}
