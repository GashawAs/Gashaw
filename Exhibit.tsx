import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Modal,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid2,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./exhibit.scss";
import { Link } from "react-router-dom";
import RequestList from "../request exhibit/RequestList";

interface ChildExhibit {
  description: string;
  model: string;
  receivedAmount: number;
  measurementUnit: string;
  motorNumber: string;
  chassisNumber: string;
  id?: string; // Auto-generated ID
}

const Exhibit: React.FC = () => {
  const [investigatorName, setInvestigatorName] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [suspectName, setSuspectName] = useState("");
  const [description, setDescription] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [exhibitRegistrationNumber, setExhibitRegistrationNumber] =
    useState("");
  const [categoryId, setCategoryId] = useState("");

  const [childExhibits, setChildExhibits] = useState<ChildExhibit[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newChild, setNewChild] = useState<ChildExhibit>({
    description: "",
    model: "",
    receivedAmount: 0,
    measurementUnit: "",
    motorNumber: "",
    chassisNumber: "",
  });

  const categories = [
    "Weapon",
    "Wild Animal",
    "Money",
    "Vehicle",
    "Illegal Drugs",
    "Other Special Exhibit",
  ];

  const handleAddChildExhibit = () => setOpenModal(true);
  const handleChildChange = (field: string, value: any) =>
    setNewChild({ ...newChild, [field]: value });

  const handleSaveChildExhibit = () => {
    setChildExhibits([
      ...childExhibits,
      { ...newChild, id: String(childExhibits.length + 1) },
    ]);
    setNewChild({
      description: "",
      model: "",
      receivedAmount: 0,
      measurementUnit: "",
      motorNumber: "",
      chassisNumber: "",
    });
    setOpenModal(false);
  };

  const handleCancel = () => setOpenModal(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExhibit = {
      receiptNumber,
      suspectName,
      description,
      receiverName,
      exhibitRegistrationNumber,
      investigatorName,
      categoryId,
      // exhibitChilds: childExhibits,
    };

    try {
      await axios.post("http://localhost:9191/EFPExhibit/exhibits", newExhibit);
      alert("Exhibit Registered Successfully");
    } catch (error) {
      console.error(error);
      alert("Error registering exhibit");
    }
  };

  const columns: GridColDef[] = [
    { field: "description", headerName: "Description", width: 200 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "receivedAmount", headerName: "Received Amount", width: 180 },
    { field: "measurementUnit", headerName: "Measurement Unit", width: 180 },
    { field: "motorNumber", headerName: "Motor Number", width: 180 },
    { field: "chassisNumber", headerName: "Chassis Number", width: 180 },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4">Register Exhibit</Typography>

      {/* <div className="request">
              <RequestList />
            </div> */}
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Investigator Name"
            value={investigatorName}
            onChange={(e) => setInvestigatorName(e.target.value)}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Receipt Number"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Suspect Name"
            value={suspectName}
            onChange={(e) => setSuspectName(e.target.value)}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Receiver Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exhibit Registration Number"
            value={exhibitRegistrationNumber}
            onChange={(e) => setExhibitRegistrationNumber(e.target.value)}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value as string)}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Register Exhibit
              </Button>
            </Box>
           
          </FormControl>
        </Grid2>
      </Grid2>

      <Box mt={3}>
        <Typography variant="h6">Child Exhibits</Typography>
        <DataGrid
          rows={childExhibits}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
        />
      </Box>

      <Box mt={2}>
        <Button
          startIcon={<AddCircleIcon />}
          variant="contained"
          color="primary"
          onClick={handleAddChildExhibit}
        >
          Add Child Exhibit
        </Button>
      </Box>

      {/* Modal for Adding Child Exhibit */}
      <Modal open={openModal} onClose={handleCancel}>
        <Box
          p={4}
          bgcolor="white"
          mx="auto"
          my={10}
          width={400}
          borderRadius={2}
        >
          <Typography variant="h6">Add Child Exhibit</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={newChild.description}
            onChange={(e) => handleChildChange("description", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Model"
            value={newChild.model}
            onChange={(e) => handleChildChange("model", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Received Amount"
            value={newChild.receivedAmount}
            onChange={(e) =>
              handleChildChange("receivedAmount", Number(e.target.value))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Measurement Unit"
            value={newChild.measurementUnit}
            onChange={(e) =>
              handleChildChange("measurementUnit", e.target.value)
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Motor Number"
            value={newChild.motorNumber}
            onChange={(e) => handleChildChange("motorNumber", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Chassis Number"
            value={newChild.chassisNumber}
            onChange={(e) => handleChildChange("chassisNumber", e.target.value)}
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChildExhibit}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Exhibit;
