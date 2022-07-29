import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { userStore } from "../../stores/UserStore";
import { propertyStore } from "../../stores/PropertyStore";
import { accessToken } from "../../Utilities/Utilities";
import { appStore } from "../../stores/AppStore";

const applyForm = (props) => {
  const token = userStore((state) => state.token);
  const getUser = userStore((state) => state.getUser);
  const user = userStore((state) => state.user);
  const setSendingStatus = appStore(
    (state) => state.setSendingStatus
  );

  const setSelectedCoordinate = propertyStore((state) => state.setSelectedCoordinate)
  const setSendingMessage = appStore((state) => state.setSendingMessage);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const coords = propertyStore((state) => state.selectedCoordinates);
  const [chosenFile, setChosenFile] = useState();

  useEffect(() => {
    setValue("coordinates", coords);
  }, [coords]);

  const handleChosenFile = (e) => {
    setChosenFile(e.target.files.item(0).name);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setValue("coordinates", "");
    setValue("applicantId", user.id);
    setValue("status", "pending");
  }, [user]);

  const submitForm = (data) => {
    console.log(data.coordinates);

    const submitData = {
      tdId: data.tdId,
      applicantId: data.applicantId,
      name: data.ownername,
      address: data.address,
      assessedValue: data.assessedValue,
      classification: data.classification,
      coordinates: data.coordinates,
      status: data.status,
      image: data.image[0],
    };

    try {
      axios
        .post("http://localhost:8000/api/apply", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          reset();
          console.log(response);
          setSelectedCoordinate('')
          setChosenFile(null)

        })
        .finally(() => {
          setSendingStatus('success');
          setSendingMessage("Your application sent successfully.");

          setTimeout(() => {
            setSendingMessage('')
          }, 2500)
        });
    } catch (err) {
      setSendingApplyStatus('error');
      setSendingMessage("Your application failed to send.");
      console.log(`error ${err}`);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="applyForm">
      <input
        type="hidden"
        name="applicantId"
        {...register("applicantId", { required: true })}
      />
      <input
        type="hidden"
        name="status"
        {...register("status", { required: true })}
      />
      <div className="formGroup">
        <label
          htmlFor="tdId"
          data-required={errors.tdId?.type == "required" ? "*Required" : ""}
        >
          Tax declaration number
        </label>
        <input
          type="text"
          id="tdId"
          className="td"
          name="tdId"
          {...register("tdId", { required: true })}
          placeholder="Tax Declaration Number"
          autoComplete="off"
        />
      </div>
      <div className="formGroup">
        <label
          htmlFor="ownername"
          data-required={
            errors.ownername?.type == "required" ? "*Required" : ""
          }
        >
          Owner Name
        </label>
        <input
          type="text"
          id="ownername"
          className=""
          name="ownername"
          {...register("ownername", { required: true })}
          placeholder="Owner Name"
          autoComplete="off"
        />
      </div>

      <div className="formGroup">
        <label
          htmlFor="address"
          data-required={errors.address?.type === "required" ? "*Required" : ""}
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          className="address"
          name="address"
          {...register("address", { required: true })}
          placeholder="Property Address"
          autoComplete="off"
        />
      </div>
      <div className="formGroup">
        <label
          htmlFor="assessedValue"
          data-required={
            errors.assessedValue?.type === "required" ? "*Required" : ""
          }
        >
          Assessed Value
        </label>
        <input
          type="number"
          id="assessedValue"
          className="assessedValue"
          name="assessedValue"
          {...register("assessedValue", { required: true })}
          placeholder="Assessed Value"
          autoComplete="off"
        />
      </div>

      <div className="formGroup">
        <label
          htmlFor="classification"
          data-required={
            errors.classification?.type == "required" ? "*Required" : ""
          }
        >
          Classification
        </label>
        <select
          id="classification"
          className="classification"
          {...register("classification", { required: true })}
        >
          <option value="">Select Classification</option>
          <option value="R">Residential</option>
          <option value="A">Agricultural</option>
          <option value="C">Commercial</option>
          <option value="I">Industrial</option>
          <option value="M">Mineral</option>
        </select>
      </div>
      <div className="formGroup">
        <label
          htmlFor="coordinates"
          data-required={
            errors.coordinates?.type === "required" ? "*Required" : ""
          }
        >
          Coordinates
        </label>
        <input
          type="text"
          id="coordinates"
          disabled={true}
          className="coordinates"
          name="coordinates"
          defaultValue=""
          {...register("coordinates", { required: true })}
          placeholder="Click or tap the map"
          autoComplete="off"
        />
      </div>
      <div className="formGroup">
        <label
          data-required={errors.image?.type === "required" ? "*Required" : ""}
        >
          Upload a photo of receipt
        </label>
        <div className="__image-container">
          <label htmlFor="image" className="imageLabel">
            Click here to upload
          </label>
          <input
            type="file"
            id="image"
            className="__receipt-image"
            name="image"
            {...register("image", { required: true })}
            onChange={handleChosenFile}
          />

          {chosenFile && <p id="chosenFile" className="chosenFile">File name: {chosenFile}</p>}
        </div>
      </div>

      <div className="__footerButtons">
        <button className="applyButton" type="submit">
          Apply
        </button>
      </div>
    </form>
  );
};

export default applyForm;
