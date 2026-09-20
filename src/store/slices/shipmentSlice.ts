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
}

const initialState: ShipmentState = {
  records: [
    {
      id: "TRK-1001",
      senderName: "System Default",
      senderEmail: "admin@warehouse.com",
      senderContact: "555-0000",
      senderAddress: "123 Warehouse St",
      requestedDate: "2026-09-24",
      receiverName: "Warehouse",
      receiverEmail: "receiving@warehouse.com",
      receiverContact: "555-0001",
      receiverAddress: "456 Storage Ave",
      parcelType: "Box",
      parcelWeight: "10",
      parcelSize: "Medium",
      transport: "ground",
      remark: "Initial system record",
      status: "Delayed",
      estimatedDate: "2026-09-26",
    },
    {
      id: "TRK-1000",
      senderName: "System Default",
      senderEmail: "admin@warehouse.com",
      senderContact: "555-0000",
      senderAddress: "123 Warehouse St",
      requestedDate: "2026-09-23",
      receiverName: "Warehouse",
      receiverEmail: "receiving@warehouse.com",
      receiverContact: "555-0001",
      receiverAddress: "456 Storage Ave",
      parcelType: "Box",
      parcelWeight: "10",
      parcelSize: "Medium",
      transport: "ground",
      remark: "Initial system record",
      status: "Delayed",
      estimatedDate: "2026-09-25",
    },
  ],
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
  },
});

export const { addShipment, updateShipmentStatus, updateEstimatedDate } =
  shipmentSlice.actions;
export default shipmentSlice.reducer;
