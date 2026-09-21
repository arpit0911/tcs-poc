import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { TabList, Tab, Button } from "@fluentui/react-components";
import { SenderDetailsTab, ReceiverDetailsTab, ParcelDetailsTab } from "./Tabs";
import { useShippingStyles } from "./ShippingForm.styles";
import {
  addShipment,
  setEditingId,
  updateShipment,
} from "../../../store/slices/shipmentSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { showToast } from "../../../store/slices/toastSlice";

export const ShippingForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useShippingStyles();

  const records = useAppSelector((state) => state.shipments.records);
  const editingId = useAppSelector((state) => state.shipments.editingId);

  const [selectedTab, setSelectedTab] = useState<string>("sender");

  const defaultFormValues = {
    sender: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      requestedDate: "",
    },
    receiver: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
    },
    parcel: { type: "", weight: "", size: "", transport: "", remark: "" },
  };

  const methods = useForm({
    defaultValues: defaultFormValues,
    mode: "onTouched",
  });

  const liveData = methods.watch();

  useEffect(() => {
    if (editingId) {
      const recordToEdit = records.find((r) => r.id === editingId);
      if (recordToEdit) {
        methods.reset({
          sender: {
            fullName: recordToEdit.senderName,
            email: recordToEdit.senderEmail,
            contact: recordToEdit.senderContact,
            address: recordToEdit.senderAddress,
            requestedDate:
              recordToEdit.requestedDate !== "N/A"
                ? recordToEdit.requestedDate
                : "",
          },
          receiver: {
            fullName: recordToEdit.receiverName,
            email: recordToEdit.receiverEmail,
            contact: recordToEdit.receiverContact,
            address: recordToEdit.receiverAddress,
          },
          parcel: {
            type:
              recordToEdit.parcelType === "N/A" ? "" : recordToEdit.parcelType,
            weight:
              recordToEdit.parcelWeight === "N/A"
                ? ""
                : recordToEdit.parcelWeight,
            size:
              recordToEdit.parcelSize === "N/A" ? "" : recordToEdit.parcelSize,
            transport: recordToEdit.transport,
            remark: recordToEdit.remark === "None" ? "" : recordToEdit.remark,
          },
        });
      }
    } else {
      methods.reset(defaultFormValues);
    }
  }, [editingId, records, methods]);

  const generateDeliveryDate = (transportType: string) => {
    const deliveryDate = new Date();
    const transitDays = transportType === "air" ? 2 : 5;
    deliveryDate.setDate(deliveryDate.getDate() + transitDays);
    return deliveryDate.toISOString().split("T")[0];
  };
  const onSubmit = (data: any) => {
    const mappedData = {
      // Sender
      senderName: `${data.sender.fullName} `,
      senderEmail: data.sender.email,
      senderContact: data.sender.contact,
      senderAddress: data.sender.address,
      requestedDate: data.sender.requestedDate || "N/A",
      // Receiver
      receiverName: `${data.receiver.fullName}`,
      receiverEmail: data.receiver.email,
      receiverContact: data.receiver.contact,
      receiverAddress: data.receiver.address,
      // Parcel
      parcelType: data.parcel.type || "N/A",
      parcelWeight: data.parcel.weight || "N/A",
      parcelSize: data.parcel.size || "N/A",
      transport: data.parcel.transport,
      remark: data.parcel.remark || "None",
    };

    if (editingId) {
      // UPDATE EXISTING RECORD
      const existingRecord = records.find((r) => r.id === editingId);
      dispatch(
        updateShipment({
          ...existingRecord!,
          ...mappedData,
        }),
      );
      dispatch(setEditingId(null));
      dispatch(
        showToast({
          title: "Label Updated",
          message: "Shipment updated successfully!",
          intent: "success",
        }),
      );
    } else {
      // CREATE NEW RECORD
      dispatch(
        addShipment({
          ...mappedData,
          id: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
          status: "Pending",
          estimatedDate: generateDeliveryDate(data.parcel.transport),
        }),
      );
      dispatch(
        showToast({
          title: "Label Generated",
          message: `Estimated Delivery: ${generateDeliveryDate(data.parcel.transport)}`,
          intent: "success",
        }),
      );
    }

    methods.reset(defaultFormValues);
    setSelectedTab("sender");
  };

  const onInvalid = (errors: any) => {
    console.log("Validation errors:", errors);
    if (errors.sender) {
      setSelectedTab("sender");
    } else if (errors.receiver) {
      setSelectedTab("receiver");
    } else if (errors.parcel) {
      setSelectedTab("parcel");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} noValidate>
            <TabList
              selectedValue={selectedTab}
              onTabSelect={(_, data) => setSelectedTab(data.value as string)}
            >
              <Tab value="sender">Sender Details</Tab>
              <Tab value="receiver">Receiver Details</Tab>
              <Tab value="parcel">Parcel Details</Tab>
            </TabList>

            <div className={styles.tabContent}>
              <div
                style={{ display: selectedTab === "sender" ? "block" : "none" }}
              >
                <SenderDetailsTab />
              </div>

              <div
                style={{
                  display: selectedTab === "receiver" ? "block" : "none",
                }}
              >
                <ReceiverDetailsTab />
              </div>

              <div
                style={{ display: selectedTab === "parcel" ? "block" : "none" }}
              >
                <ParcelDetailsTab />
              </div>
              <div className={styles.actionContainer}>
                <Button appearance="primary" type="submit">
                  {editingId ? "Update Shipment" : "Print Label"}
                </Button>

                {editingId && (
                  <Button
                    appearance="outline"
                    onClick={() => {
                      dispatch(setEditingId(null));
                      methods.reset(defaultFormValues);
                    }}
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <div className={styles.previewCard}>
        <h2>Shipping Label Preview</h2>

        <div className={styles.previewGrid}>
          <div>
            <div className={styles.sectionTitle}>FROM:</div>
            <strong>{liveData.sender.fullName}</strong>
            <br />
            {liveData.sender.address}
            <br />
            {liveData.sender.contact} | {liveData.sender.email}
          </div>

          <div>
            <div className={styles.sectionTitle}>TO:</div>
            <strong>{liveData.receiver.fullName}</strong>
            <br />
            {liveData.receiver.address}
            <br />
            {liveData.receiver.contact} | {liveData.receiver.email}
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <div className={styles.sectionTitle}>PARCEL INFO:</div>
          <div>
            <strong>Type:</strong> {liveData.parcel.type.toUpperCase() || "N/A"}
          </div>
          <div>
            <strong>Weight:</strong>
            {liveData.parcel.weight ? `${liveData.parcel.weight} kg` : "N/A"}
          </div>
          <div>
            <strong>Size:</strong> {liveData.parcel.size || "N/A"}
          </div>
          <div>
            <strong>Transport:</strong>
            {liveData.parcel.transport.toUpperCase() || "N/A"}
          </div>
          {liveData.parcel.remark && (
            <div>
              <strong>Remark:</strong> {liveData.parcel.remark}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
