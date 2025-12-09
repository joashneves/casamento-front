import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './GuestTable.module.css'; // Import the CSS module

const GuestTable = ({ guests }) => {

  // Template for 'attending' column
  const attendingBodyTemplate = (rowData) => {
    return rowData.attending ? 'Confirmada' : 'Não Ira';
  };

  // Template for 'timestamp' column
  const timestampBodyTemplate = (rowData) => {
    return new Date(rowData.timestamp).toLocaleString();
  };

  return (
     <div className={styles.cardGuest}>
      <DataTable value={guests} stripedRows paginator rows={20} 
        emptyMessage="Nenhum convidado encontrado."
      >
        <Column className={styles.columGuest} field="name" header="Nome" sortable filter filterPlaceholder="Buscar por nome"></Column>
        <Column className={styles.columGuest} field="attending" header="Presença" body={attendingBodyTemplate} sortable></Column>
        <Column className={styles.columGuest} field="message" header="Mensagem" body={(rowData) => rowData.message || '-'}></Column>
        <Column className={styles.columGuest} field="timestamp" header="Registrado Em" body={timestampBodyTemplate} sortable></Column>
      </DataTable>
    </div>
  );
};

export default GuestTable;
