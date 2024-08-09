import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { Button, Icon, Input } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import SelectBox from "../../components/form-elements/Selectbox";
import uploadImage from "../../../public/images/p3.png";
import p4 from "../../../public/images/p4.png";
import p5 from "../../../public/images/p5.png";
import Image from "next/image";

const Step5 = ({ formData, setFormData }) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const [maxUsersNumber, setMaxUsersNumber] = useState(
    formData.maxUsersNumber || "1"
  );

  useEffect(() => {
    setValue("maxUsersNumber", maxUsersNumber);
  }, [maxUsersNumber, setValue]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      maxUsersNumber,
    }));
  }, [maxUsersNumber, setFormData]);

  const handleSelectChange = (value) => {
    setMaxUsersNumber(value);
  };

  const formRootClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "100%",
  });

  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  });

  const maxUsersItems = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "10", label: "10" },
  ];

  return (
    <div className={`whiteCard ${formWhiteClasses}`}>
      <div>
        <h4 className="whiteCardTitle mb-1">Hinzugefügte Artikel</h4>

        <div className="productReviewCard">
          <Icon
            icon={`mdi:heart-outline`}
            fontSize="20px"
            marginLeft="auto"
            color="#ED8121"
            aria-hidden
          />
          <Image src={uploadImage} alt={"product"} />
          <h2 className={css({  marginTop: "1.2rem" })}>
            91,12 € &nbsp; <del className="smGrey">113,90 €</del>
          </h2>
          <div>
            <h3>Lammkeule mit knochen 9,5Kg</h3>
            <p className="greyC">11,99 €/ Kg</p>
          </div>
          <button
            type="button"
            className={`addBtn2 ${css({
              marginLeft: "auto",
            })}`}
          >
            <Icon fontSize="24px" color="white" icon="mdi:plus" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="whiteCardTitle mb-1">Neu im Sortiment</h4>
        <div className="productReviewCard">
          <Icon
            icon={`mdi:heart-outline`}
            fontSize="20px"
            marginLeft="auto"
            color="#ED8121"
            aria-hidden
          />
          <div>
            <Image src={p4} alt={"product"} width={90} />

            <Image src={uploadImage} alt={"product"} />
          </div>

          <h2 className={css({  marginTop: "1.2rem" })}>
            91,12 € &nbsp; <del className="smGrey">113,90 €</del>
          </h2>
          <div>
            <h3>Lammkeule mit knochen 9,5Kg</h3>
            <p className="greyC">11,99 €/ Kg</p>
          </div>
          <button
            type="button"
            className={`addBtn2 ${css({
              marginLeft: "auto",
            })}`}
          >
            <Icon fontSize="24px" color="white" icon="mdi:plus" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="whiteCardTitle mb-1">Highlights der Woche</h4>
        <div className="productReviewCard">
          <Icon
            icon={`mdi:heart-outline`}
            fontSize="20px"
            marginLeft="auto"
            color="#ED8121"
            aria-hidden
          />
          <div>
            <Image src={p5} alt={"product"} width={90} />

            <Image src={uploadImage} alt={"product"} />
          </div>

          <h2 className={css({  marginTop: "1.2rem" })}>
            91,12 € &nbsp; <del className="smGrey">113,90 €</del>
          </h2>
          <div>
            <h3>Lammkeule mit knochen 9,5Kg</h3>
            <p className="greyC">11,99 €/ Kg</p>
          </div>
          <button
            type="button"
            className={`addBtn2 ${css({
              marginLeft: "auto",
            })}`}
          >
            <Icon fontSize="24px" color="white" icon="mdi:plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
