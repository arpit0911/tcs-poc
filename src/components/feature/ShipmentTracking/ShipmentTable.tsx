import React, { useMemo } from "react";
import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  createTableColumn,
  type TableColumnDefinition,
  Select,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  updateShipmentStatus,
  type ShipmentRecord,
} from "../../../store/slices/shipmentSlice";
import { useTableStyles } from "./ShipmentTable.styles";

export const ShipmentTable: React.FC = () => {
  const styles = useTableStyles();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.shipments.records);

  const columns = useMemo<TableColumnDefinition<ShipmentRecord>[]>(
    () => [
      createTableColumn<ShipmentRecord>({
        columnId: "id",
        compare: (a, b) => a.id.localeCompare(b.id),
        renderHeaderCell: () => "Tracking ID",
        renderCell: (item) => item.id,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "sender",
        compare: (a, b) => a.senderName.localeCompare(b.senderName),
        renderHeaderCell: () => "Sender",
        renderCell: (item) => item.senderName,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "receiver",
        compare: (a, b) => a.receiverName.localeCompare(b.receiverName),
        renderHeaderCell: () => "Receiver",
        renderCell: (item) => item.receiverName,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "deliveryDate",
        compare: (a, b) => a.expectedDelivery.localeCompare(b.expectedDelivery),
        renderHeaderCell: () => "Expected Delivery",
        renderCell: (item) => item.expectedDelivery,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "status",
        compare: (a, b) => a.status.localeCompare(b.status),
        renderHeaderCell: () => "Status",
        renderCell: (item) => {
          return (
            <Select
              value={item.status}
              onChange={(_, data) => {
                dispatch(
                  updateShipmentStatus({
                    id: item.id,
                    status: data.value,
                  }),
                );
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          );
        },
      }),
    ],
    [styles, dispatch],
  );

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "16px" }}>Tracking Dashboard</h2>

      <DataGrid
        items={items}
        columns={columns}
        sortable
        selectionMode="multiselect"
        getRowId={(item) => item.id}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell className={styles.headerCell}>
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<ShipmentRecord>>
          {({ item, rowId }) => (
            <DataGridRow<ShipmentRecord> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
