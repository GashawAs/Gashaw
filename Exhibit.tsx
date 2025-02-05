import { useState, ChangeEvent } from "react";
import { Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Modal, Box, Select, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import "./exhibit.scss";

interface ExhibitFormData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  requestId: number | null;
}

interface RequestData {
  id: number;
  requestDate: string;
  dailyRef: string;
  description: string;
  CRNO: string;
  investigationOffice: string;
}

export default function Exhibit() {
  const [formData, setFormData] = useState<ExhibitFormData>({
    id: Date.now(),
    name: "",
    email: "",
    address: "",
    phone: "",
    requestId: null,
  });

  const [tableData, setTableData] = useState<ExhibitFormData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ExhibitFormData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock Request Data
  const [requests] = useState<RequestData[]>([
    { id: 1, requestDate: "2024-02-05", dailyRef: "DR123", description: "Sample Request", CRNO: "CR001", investigationOffice: "Office A" },
    { id: 2, requestDate: "2024-02-06", dailyRef: "DR456", description: "Another Request", CRNO: "CR002", investigationOffice: "Office B" }
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData.name && formData.email) {
      setTableData([...tableData, formData]);
      setFormData({ id: Date.now(), name: "", email: "", address: "", phone: "", requestId: null });
      setShowForm(false);
    }
  };

  const handleEdit = (index: number) => {
    setFormData(tableData[index]);
    setTableData(tableData.filter((_, i) => i !== index));
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleDetail = (data: ExhibitFormData) => {
    setSelectedDetail(data);
    setShowDetailModal(true);
  };

  return (
    <div className="form">
      <Button variant="contained" className="add-button" onClick={() => setShowForm(true)}>
        <Add /> Add Exhibit
      </Button>

      {/* Modal for Input Form */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box className="modal-box">
          <h2>Enter Exhibit Details</h2>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Phone number" name="phone" value={formData.phone} onChange={handleChange} margin="dense" />

          {/* Request ID Selection */}
          <Select
            fullWidth
            value={formData.requestId || ""}
            onChange={(e) => setFormData({ ...formData, requestId: Number(e.target.value) })}
            displayEmpty
          >
            <MenuItem value="">Select Request ID</MenuItem>
            {requests.map((request) => (
              <MenuItem key={request.id} value={request.id}>
                {request.id} - {request.dailyRef}
              </MenuItem>
            ))}
          </Select>

          <div className="modal-actions">
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>

      {/* Detail Modal */}
      <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)}>
        <Box className="modal-box">
          <h2>Exhibit Details</h2>
          {selectedDetail && (
            <>
              <p><strong>Name:</strong> {selectedDetail.name}</p>
              <p><strong>Email:</strong> {selectedDetail.email}</p>
              <p><strong>Address:</strong> {selectedDetail.address}</p>
              <p><strong>Phone:</strong> {selectedDetail.phone}</p>

              {/* Fetching and Displaying Related Request Details */}
              {selectedDetail.requestId ? (
                (() => {
                  const request = requests.find(req => req.id === selectedDetail.requestId);
                  return request ? (
                    <>
                      <h3>Linked Request</h3>
                      <p><strong>Request ID:</strong> {request.id}</p>
                      <p><strong>Request Date:</strong> {request.requestDate}</p>
                      <p><strong>Daily Reference:</strong> {request.dailyRef}</p>
                      <p><strong>Description:</strong> {request.description}</p>
                      <p><strong>CRNO:</strong> {request.CRNO}</p>
                      <p><strong>Investigation Office:</strong> {request.investigationOffice}</p>
                    </>
                  ) : (
                    <p>No request found for this exhibit.</p>
                  );
                })()
              ) : (
                <p>No request linked.</p>
              )}
            </>
          )}
          <Button variant="contained" onClick={() => setShowDetailModal(false)}>Close</Button>
        </Box>
      </Modal>

      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Address</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>Request ID</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.address}</TableCell>
              <TableCell>{data.phone}</TableCell>
              <TableCell>{data.requestId || "Not Linked"}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(index)}>Delete</Button>
                <Button variant="outlined" color="info" onClick={() => handleDetail(data)}>Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


// import { useState, useEffect, ChangeEvent } from "react";
// import { Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Modal, Box, Select, MenuItem } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import axios from "axios"; // Import axios for API calls
// import "./exhibit.scss";

// interface ExhibitFormData {
//   id: number;
//   name: string;
//   email: string;
//   address: string;
//   phone: string;
//   requestId: number | null;
// }

// interface RequestData {
//   id: number;
//   requestDate: string;
//   dailyRef: string;
//   description: string;
//   CRNO: string;
//   investigationOffice: string;
// }

// export default function Exhibit() {
//   const [formData, setFormData] = useState<ExhibitFormData>({
//     id: Date.now(),
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//     requestId: null,
//   });

//   const [tableData, setTableData] = useState<ExhibitFormData[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDetail, setSelectedDetail] = useState<ExhibitFormData | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [requests, setRequests] = useState<RequestData[]>([]); // State for API data

//   // Fetch Request Data from API
//   useEffect(() => {
//     axios
//       .get("https://your-api.com/requests") // Replace with your actual API endpoint
//       .then((response) => {
//         setRequests(response.data); // Store fetched data in state
//       })
//       .catch((error) => {
//         console.error("Error fetching request data:", error);
//       });
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
//     const { name, value } = e.target as HTMLInputElement;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     if (formData.name && formData.email) {
//       setTableData([...tableData, formData]);
//       setFormData({ id: Date.now(), name: "", email: "", address: "", phone: "", requestId: null });
//       setShowForm(false);
//     }
//   };

//   return (
//     <div className="form">
//       <Button variant="contained" className="add-button" onClick={() => setShowForm(true)}>
//         <Add /> Add Exhibit
//       </Button>

//       {/* Modal for Input Form */}
//       <Modal open={showForm} onClose={() => setShowForm(false)}>
//         <Box className="modal-box">
//           <h2>Enter Exhibit Details</h2>
//           <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="dense" />
//           <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="dense" />
//           <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="dense" />
//           <TextField fullWidth label="Phone number" name="phone" value={formData.phone} onChange={handleChange} margin="dense" />

//           {/* Request ID Selection from API */}
//           <Select
//             fullWidth
//             value={formData.requestId || ""}
//             onChange={(e) => setFormData({ ...formData, requestId: Number(e.target.value) })}
//             displayEmpty
//           >
//             <MenuItem value="">Select Request ID</MenuItem>
//             {requests.map((request) => (
//               <MenuItem key={request.id} value={request.id}>
//                 {request.id} - {request.dailyRef}
//               </MenuItem>
//             ))}
//           </Select>

//           <div className="modal-actions">
//             <Button variant="contained" onClick={handleSave}>Save</Button>
//             <Button variant="outlined" onClick={() => setShowForm(false)}>Cancel</Button>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
