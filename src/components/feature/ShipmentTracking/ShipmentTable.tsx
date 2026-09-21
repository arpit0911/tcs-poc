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
  Input,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setEditingId,
  updateEstimatedDate,
  updateShipmentStatus,
  type ShipmentRecord,
} from "../../../store/slices/shipmentSlice";
import { useTableStyles } from "./ShipmentTable.styles";
import { DelayedDateEditor } from "./DelayedDateEditor";

export const ShipmentTable: React.FC = () => {
  const styles = useTableStyles();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.shipments.records);
  const editingId = useAppSelector((state) => state.shipments.editingId);

  const columns = useMemo<TableColumnDefinition<ShipmentRecord>[]>(
    () => [
      createTableColumn<ShipmentRecord>({
        columnId: "id",
        compare: (a, b) => a.id.localeCompare(b.id),
        renderHeaderCell: () => "Tracking ID",
        renderCell: (item) => <strong>{item.id}</strong>,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "sender",
        compare: (a, b) => a.senderName.localeCompare(b.senderName),
        renderHeaderCell: () => "Sender",
        renderCell: (item) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{item.senderName}</span>
            <span style={{ fontSize: "12px", color: "gray" }}>
              {item.senderContact}
            </span>
          </div>
        ),
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "receiver",
        compare: (a, b) => a.receiverName.localeCompare(b.receiverName),
        renderHeaderCell: () => "Receiver",
        renderCell: (item) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{item.receiverName}</span>
            <span style={{ fontSize: "12px", color: "gray" }}>
              {item.receiverContact}
            </span>
          </div>
        ),
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "parcel",
        compare: (a, b) => a.parcelType.localeCompare(b.parcelType),
        renderHeaderCell: () => "Parcel Info",
        renderCell: (item) => `${item.parcelType} (${item.parcelWeight}kg)`,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "transport",
        compare: (a, b) => a.transport.localeCompare(b.transport),
        renderHeaderCell: () => "Transport",
        renderCell: (item) => item.transport.toUpperCase(),
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "requestedDate",
        compare: (a, b) => a.requestedDate.localeCompare(b.requestedDate),
        renderHeaderCell: () => "Requested Date",
        renderCell: (item) => item.requestedDate,
      }),
      createTableColumn<ShipmentRecord>({
        columnId: "estimatedDate",
        compare: (a, b) => a.estimatedDate.localeCompare(b.estimatedDate),
        renderHeaderCell: () => "Est. Delivery",
        renderCell: (item) => {
          if (item.status === "Delayed") {
            return <DelayedDateEditor item={item} />;
            // return (
            //   <Input
            //     type="date"
            //     value={item.estimatedDate}
            //     onChange={(_, data) => {
            //       if (data.value) {
            //         dispatch(
            //           updateEstimatedDate({ id: item.id, date: data.value }),
            //         );
            //       }
            //     }}
            //   />
            // );
          }
          return <span>{item.estimatedDate}</span>;
        },
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
                  updateShipmentStatus({ id: item.id, status: data.value }),
                );
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delayed">Delayed</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </Select>
          );
        },
      }),
    ],
    [dispatch],
  );

  return (
    <div className={styles.container} style={{ overflowX: "auto" }}>
      <h2 style={{ marginBottom: "16px" }}>Tracking Dashboard</h2>

      <DataGrid
        items={items}
        columns={columns}
        sortable
        selectionMode="single"
        getRowId={(item) => item.id}
        selectedItems={editingId ? [editingId] : []}
        onSelectionChange={(_, data) => {
          const selectedArray = Array.from(data.selectedItems);
          if (selectedArray.length > 0) {
            dispatch(setEditingId(selectedArray[0] as string));
          } else {
            dispatch(setEditingId(null));
          }
        }}
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
