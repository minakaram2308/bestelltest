// types.ts
export interface Bezeichnung {
  image: string;
  text: string;
  description: string;
}

export interface TableRowData {
  artNr: string;
  bezeichnung: Bezeichnung;
  verFugbarkeit: string;
  verkaufspreisNetto: string;
  verkaufspreisEinzelnNetto: string;
  reserviert: string;
  mwSt: string;
  verfugbareMenge: string;
  mhd: string;
}

  
  export interface TableProps {
    columns: string[];
    data: TableRowData[];
  }
  