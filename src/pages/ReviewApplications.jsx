import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { propertyStore } from "../stores/PropertyStore";
import { userStore } from "../stores/UserStore";
import Map from "../tax-payer-side/taxpayer-components/map";
import Loader from "../components/loader";
import ConfirmModal from "../components/confirmModal";
import { appStore } from "../stores/AppStore";
import { accessToken } from "../Utilities/Utilities";
import Toaster from "../components/toaster";

const ReviewApplications = () => {
  const { id } = useParams();
  const getApplication = appStore((state) => state.fetchApplication);
  const getUser = userStore((state) => state.getUser);
  const application = appStore((state) => state.application);

  const approveApplication = appStore((state) => state.approveApplication);
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);
  const [imageUrl, setImageUrl] = useState();
  const loading = appStore((state) => state.loading);
  const [isConfirmModalOpen, setModalOpen] = useState(false);
  const [dataToApprove, setDataToApproved] = useState();
  const sendingMessage = appStore((state) => state.sendingMessage)
  const sendingStatus = appStore((state) => state.sendingStatus)
  const revertApplication = appStore((state) => state.revertApplication)
  const [dataToRevert, setDataToRevert] = useState()

  useEffect(() => {
    const fetchApplication = async () => {
      await getApplication(id, accessToken);
    };
    fetchApplication();
  }, []);

  const openApproveModal = (data) => {
    setModalOpen(true);
    setDataToApproved(data);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleApprove = async () => {
    await approveApplication(dataToApprove, token);
    setModalOpen(false);
  };

  const openRevertModal = (data) => {
    setModalOpen(true)
    setDataToRevert(data)
  }

  const handleRevert = async () => {
    await revertApplication(dataToRevert, token)
    setModalOpen(false)
  }

  return (
    <>
      {!loading && application != 0 ? (
        <div className="review-application-wrapper">
          <ConfirmModal
            message={application.status == 'pending' ? "Are you sure you want to approve this property?" : 'Are you sure you want to revert?'}
            title={application.status == 'pending' ? 'Approve Property' : 'Revert'}
            action={application.status == 'pending' ? handleApprove : handleRevert}
            handleClose={handleClose}
            open={isConfirmModalOpen}
          />
          {sendingMessage && sendingStatus ? (
            <Toaster message={sendingMessage} status={sendingStatus} />
          ) : (
            ""
          )}

          <div className="review-container">
            <div className="review-items">
              ReviewApplications
              <span>Tax declaration number: {application.tdId}</span>
              <span>Owner Name: {application.name}</span>
              <span>Classification: {application.classification}</span>
              <span>Address: {application.address}</span>
              <span>Assessed Value: {application.assessedValue}</span>
              <span>Status: {application.status}</span>
              <img
                src={`http://localhost:8000/storage/images/${
                  application && application.image.split("/")[2]
                }`}
                alt="application-image"
              ></img>
            </div>
            {application.status == "pending" ? (
              <button
                className="approveBtn btn-primary"
                onClick={() => openApproveModal(application)}
              >
                Approve
              </button>
            ) : (
              <button className="btn revertBtn" onClick={() => openRevertModal(application)}>Revert</button>
            )}
          </div>
          <div className="__map-wrapper">
            <Map applicationData={application} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ReviewApplications;
