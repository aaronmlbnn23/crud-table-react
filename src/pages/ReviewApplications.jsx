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
import ImageViewer from "../components/imageViewer";

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
  const [dataToApprove, setDataToApprovedOrReject] = useState();
  const sendingMessage = appStore((state) => state.sendingMessage);
  const sendingStatus = appStore((state) => state.sendingStatus);
  const revertApplication = appStore((state) => state.revertApplication);
  const [dataToRevert, setDataToRevert] = useState();
  const approveStatus = appStore((state) => state.approveStatus)

  const rejectApplication = appStore((state) => state.rejectApplication);
  const [actionFunction, setActionFunction] = useState("approve");

  useEffect(() => {
    const fetchApplication = async () => {
      getUser()
      await getApplication(id, user.token);
    };
    fetchApplication();
  }, []);

  const openApproveModal = (data) => {
    setModalOpen(true);
    setDataToApprovedOrReject(data);
    setActionFunction("approve");
  };

  const openRejectModal = (data) => {
    setDataToApprovedOrReject(data);
    setActionFunction("reject");
    setModalOpen(true);
  };

  const openRevertModal = (data) => {
    setDataToRevert(data);
    setActionFunction("revert");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleApprove = async () => {
    await approveApplication(dataToApprove, token);
    setModalOpen(false);
  };
  const handleReject = async () => {
    rejectApplication(dataToApprove, token);
    setModalOpen(false);
  };

  const handleRevert = async () => {
    await revertApplication(dataToRevert, token);
    setModalOpen(false);
  };
  const switchAction = (action) => {
    switch (action) {
      case "approve":
        return handleApprove;
      case "reject":
        return handleReject;
      case "revert":
        return handleRevert;
      default:
        return;
    }
  };

  const toggleImageViewer = () => {
    const imageviewer = document.querySelector('#image-viewer')
    imageviewer.classList?.add('active')
  }

  return (
    <>
      {!loading && application != 0 ? (
        <div className="review-application-wrapper">
          <ConfirmModal
            message={
              application.status == "pending"
                ? "Are you sure you want to continue this action?"
                : "Are you sure you want to revert?"
            }
            title={
              application.status == "pending" ? "Continue Action" : "Revert"
            }
            action={actionFunction && switchAction(actionFunction)}
            handleClose={handleClose}
            open={isConfirmModalOpen}
          />
          {sendingMessage && sendingStatus ? (
            <Toaster message={sendingMessage} status={sendingStatus} approveStatus={approveStatus} />
          ) : (
            ""
          )}
          <div className="page-title-container">
            <h3 className="page-title">Application / {id}</h3>
          </div>
          <div className="main-content">
            <div className="review-card">

              <div className="review-title">
                <h3>Application Details</h3>
              </div>
              <div className="review-content">
                <div className="review-details">

                  <table>

                    <thead>
                      <tr>

                      <th>Data</th>
                      <th>Value</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td>Tax Declaration Number:</td>
                        <td>{application.tdId}</td>
                      </tr>
                      <tr>
                        <td>Applicant ID:</td>
                        <td>{application.applicantId}</td>
                      </tr>
                      <tr>
                        <td>Owner Name:</td>
                        <td>{application.name}</td>
                      </tr>
                      <tr>
                        <td>Classification:</td>
                        <td>{application.classification}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{application.address}</td>
                      </tr>
                      <tr>
                        <td>Assessed Value:</td>
                        <td>{application.assessedValue}</td>
                      </tr>
                      <tr>
                        <td>Coordinates:</td>
                        <td>{application.coordinates}</td>
                      </tr>
                      <tr>
                        <td>Application Status:</td>
                        <td>{application.status}</td>
                      </tr>
                      <tr>
                        <td>Proof image:</td>
                        <td><div className="__review-image">

                          <img
                            id="application-image"
                            src={`http://localhost:8000/storage/images/${application && application.image.split("/")[2]
                              }`}
                            alt="application-image"
                            onClick={() => toggleImageViewer()}
                          ></img>

                          <ImageViewer className="__image-viewer" imageUrl={`http://localhost:8000/storage/images/${application && application.image.split("/")[2]
                            }`} />


                        </div></td>
                      </tr>

                    </tbody>
                  </table>

                </div>
                <div className="review-footer">
                  <div className="action-buttons">
                    {application.status == "pending" ? (
                      <>
                        <button
                          className="rejectBtn btn-primary"
                          onClick={() => openRejectModal(application)}
                        >
                          Reject
                        </button>
                        <button
                          className="approveBtn btn-primary"
                          onClick={() => openApproveModal(application)}
                        >
                          Approve
                        </button>

                      </>
                    ) : (
                      <button
                        className="btn revertBtn"
                        onClick={() => openRevertModal(application)}
                      >
                        Revert
                      </button>
                    )}</div>
                </div>
              </div>
            </div>


            <div className="review-map-card">
              <div className="review-title">
                <h3>Location</h3>
              </div>
              <div className="review-content">
                <Map applicationData={application} />
              </div>

            </div>

          </div>
        </div>
      ) : (
        <Loader />
      )
      }
    </>
  );
};

export default ReviewApplications;
