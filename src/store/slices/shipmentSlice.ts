import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShipmentRecord {
  id: string;
  senderName: string;
  receiverName: string;
  status: string;
  transport: string;
  requestedDate: string; // From the Sender's form
  estimatedDate: string; // System generated
}

interface ShipmentState {
  records: ShipmentRecord[];
}

const initialState: ShipmentState = {
  records: [
    {
      id: "TRK-1000",
      senderName: "System Default",
      receiverName: "Warehouse",
      status: "Delayed",
      transport: "ground",
      requestedDate: "2026-09-23",
      estimatedDate: "2026-09-25",
    },
    {
      id: "TRK-1020",
      senderName: "System Default",
      receiverName: "Warehouse",
      status: "in-transit",
      transport: "air",
      requestedDate: "2026-10-23",
      estimatedDate: "2026-10-25",
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
      if (record) {
        record.status = action.payload.status;
      }
    },
    updateEstimatedDate: (
      state,
      action: PayloadAction<{ id: string; date: string }>,
    ) => {
      const record = state.records.find((r) => r.id === action.payload.id);
      if (record) {
        record.estimatedDate = action.payload.date;
      }
    },
  },
});

export const { addShipment, updateShipmentStatus, updateEstimatedDate } =
  shipmentSlice.actions;
export default shipmentSlice.reducer;
