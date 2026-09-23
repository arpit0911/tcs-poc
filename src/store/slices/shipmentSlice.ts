import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShipmentRecord {
  id: string;
  // Sender
  senderName: string;
  senderEmail: string;
  senderContact: string;
  senderAddress: string;
  requestedDate: string;
  // Receiver
  receiverName: string;
  receiverEmail: string;
  receiverContact: string;
  receiverAddress: string;
  // Parcel
  parcelType: string;
  parcelWeight: string;
  parcelSize: string;
  transport: string;
  remark: string;
  // System
  status: string;
  estimatedDate: string;
}

interface ShipmentState {
  records: ShipmentRecord[];
  editingId: string | null;
}

const initialState: ShipmentState = {
  records: [
    {
      id: "TRK-1001",
      senderName: "System Default",
      senderEmail: "admin@warehouse.com",
      senderContact: "1234567892",
      senderAddress: "123 Warehouse St",
      requestedDate: "2026-09-24",
      receiverName: "Warehouse",
      receiverEmail: "receiving@warehouse.com",
      receiverContact: "1234573213",
      receiverAddress: "456 Storage Ave",
      parcelType: "Box",
      parcelWeight: "10",
      parcelSize: "1x2x3",
      transport: "ground",
      remark: "Initial system record",
      status: "Delayed",
      estimatedDate: "2026-09-26",
    },
    {
      id: "TRK-1000",
      senderName: "System Default",
      senderEmail: "admin@warehouse.com",
      senderContact: "23465434532",
      senderAddress: "123 Warehouse St",
      requestedDate: "2026-09-23",
      receiverName: "Warehouse",
      receiverEmail: "receiving@warehouse.com",
      receiverContact: "2312425343401",
      receiverAddress: "456 Storage Ave",
      parcelType: "Box",
      parcelWeight: "10",
      parcelSize: "1x2x3",
      transport: "ground",
      remark: "Initial system record",
      status: "Delayed",
      estimatedDate: "2026-09-25",
    },
  ],
  editingId: null,
};

const shipmentSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    addShipment: (state, action: PayloadAction<ShipmentRecord>) => {
      state.records.push(action.payload);
    },
    updateShipmentStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>,
    ) => {
      const record = state.records.find((r) => r.id === action.payload.id);
      if (record) record.status = action.payload.status;
    },
    updateEstimatedDate: (
      state,
      action: PayloadAction<{ id: string; date: string }>,
    ) => {
      const record = state.records.find((r) => r.id === action.payload.id);
      if (record) record.estimatedDate = action.payload.date;
    },
    setEditingId: (state, action: PayloadAction<string | null>) => {
      state.editingId = action.payload;
    },
    updateShipment: (state, action: PayloadAction<ShipmentRecord>) => {
      const index = state.records.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
  },
});

export const {
  addShipment,
  updateShipmentStatus,
  updateEstimatedDate,
  setEditingId,
  updateShipment,
} = shipmentSlice.actions;
export default shipmentSlice.reducer;
