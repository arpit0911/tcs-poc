import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { TabList, Tab, Button } from "@fluentui/react-components";
import { SenderDetailsTab, ReceiverDetailsTab, ParcelDetailsTab } from "./Tabs";
import { useShippingStyles } from "./ShippingForm.styles";
import { addShipment } from "../../../store/slices/shipmentSlice";
import { useAppDispatch } from "../../../store/hooks";

export const ShippingForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useShippingStyles();
  const [selectedTab, setSelectedTab] = useState<string>("sender");

  const methods = useForm({
    defaultValues: {
      sender: {
        fullName: "",
        email: "",
        contact: "",
        address: "",
        expectedDelivery: "",
      },
      receiver: {
        fullName: "",
        email: "",
        contact: "",
        address: "",
      },
      parcel: { type: "", weight: "", size: "", transport: "", remark: "" },
    },
    mode: "onTouched",
  });

  const liveData = methods.watch();

  const onSubmit = (data: any) => {
    const newTrackingId = `TRK-${Math.floor(1000 + Math.random() * 9000)}`;

    dispatch(
      addShipment({
        id: newTrackingId,
        senderName: `${data.sender.firstName} ${data.sender.lastName}`,
        receiverName: `${data.receiver.firstName} ${data.receiver.lastName}`,
        status: "Pending",
        transport: data.parcel.transport,
        expectedDelivery: data.sender.expectedDelivery,
      }),
    );

    alert(
      `Label generated for ${newTrackingId}. Data pushed to tracking grid.`,
    );
    methods.reset(); 
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TabList
            selectedValue={selectedTab}
            onTabSelect={(_, data) => setSelectedTab(data.value as string)}
          >
            <Tab value="sender">Sender Details</Tab>
            <Tab value="receiver">Receiver Details</Tab>
            <Tab value="parcel">Parcel Details</Tab>
          </TabList>

          <div className={styles.tabContent}>
            {selectedTab === "sender" && <SenderDetailsTab />}
            {selectedTab === "receiver" && <ReceiverDetailsTab />}
            {selectedTab === "parcel" && <ParcelDetailsTab />}

            <Button
              appearance="primary"
              type="submit"
              className={styles.primaryButton}
            >
              Print Label
            </Button>
          </div>
        </form>
      </FormProvider>

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
