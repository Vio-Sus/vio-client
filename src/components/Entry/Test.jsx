import React from 'react'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';

const MyDoc = () => (
    <Document>
      <Page>
        // My document data
      </Page>
    </Document>
  );

export default function Test() {
  return (
    <div>
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ loading }) =>
        loading ? <button>Loading document...</button> : <button>Download now!</button>
      }
    </PDFDownloadLink>
  </div>
  )
}

