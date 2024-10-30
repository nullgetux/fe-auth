import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";


const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false
});

const FixedHeader = ({ data }: { data: any[] }) => {
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.nama,
      sortable: true
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true
    },
    {
      name: "Peran",
      selector: (row: any) => row.role?.nama,
      sortable: true
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button size="sm" variant="info" onClick={() => handleView(row)}>
            <FeatherIcon icon="eye" style={{ marginRight: '3px', width: '16px', height: '16px' }} />
          </Button>
          <Button size="sm" variant="warning" onClick={() => handleEdit(row)}>
            <FeatherIcon icon="edit" style={{ marginRight: '3px', width: '16px', height: '16px' }} />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            <FeatherIcon icon="trash" style={{ marginRight: '3px', width: '16px', height: '16px' }} />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px' // Atur lebar kolom aksi di sini
    }
  ];

  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (row: any) => {
    console.log("Lihat:", row);
  };

  const handleEdit = (row: any) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row: any) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      console.log("Hapus:", row);
    }
  };

  const filteredData = data.filter((row: any) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <div className="dt-responsive">
            <DataTable
              striped={true}
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="300px"
              className="table-bordered nowrap"
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FixedHeader;
