import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShipmentRecord {
  id: string;
  senderName: string;
  receiverName: string;
  status: string;
  transport: string;
  expectedDelivery: string;
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
      status: "Pending",
      transport: "ground",
      expectedDelivery: "2026-10-01",
    },
    {
      id: "TRK-1020",
      senderName: "System Default",
      receiverName: "Warehouse",
      status: "in-transit",
      transport: "air",
      expectedDelivery: "2026-10-01",
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
  },
});

export const { addShipment, updateShipmentStatus } = shipmentSlice.actions;
export default shipmentSlice.reducer;
