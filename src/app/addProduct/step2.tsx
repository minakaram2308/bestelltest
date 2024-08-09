import React, { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Icon, Input, InputWithIcon } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { CheckIcon } from "@radix-ui/react-icons";
import { Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import "rc-slider/assets/index.css";
import TabsList from "@/components/ui/tabs/tabsList";
import TabsTrigger from "@/components/ui/tabs/tabsTriggers";
import * as Tabs from "@radix-ui/react-tabs";
import { useProductsCategories } from "@/hooks/useProducts/getProductCategories";
import Image from "next/image";
import uploadImage from "../../../public/images/placeholder.jpg";
import classNames from "classnames";
import { useGetAllProducts } from "@/hooks/useProducts/getAllProducts";
const Step2 = ({ formData, setFormData }) => {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [selectedDeliveryCostType, setSelectedDeliveryCostType] = useState(
    formData.deliveryPriceType || "LOCATION"
  );
  const [cityCosts, setCityCosts] = useState(
    formData.deliveryLocationPrices || [{ city: "", price: "" }]
  );

  const [isChecked1, setIsChecked1] = useState(formData.canPickup || false);
  const [isChecked2, setIsChecked2] = useState(formData.canPickup || false);
  const [radius, setRadius] = useState(formData.radius || 0);
  const [categories, setCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTab, setSelectedTab] = useState("Food");
  const { fetchProductsCategories, loading, error, data } =
    useProductsCategories("EN", selectedTab === "Food");

  const { fetchAllProducts, loading2, error2, data2 } = useGetAllProducts("EN");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchProductsCategories();
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, [loading]);

  useEffect(() => {
    const loadRecommended = async () => {
      try {
        const res = await fetchAllProducts();
        setRecommendedProducts(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadRecommended();
  }, [loading2]);

  const filteredCategories = useMemo(() => {
    const result = categories.filter((category) =>
      selectedTab === "Food" ? category.isFood : !category.isFood
    );
    return result;
  }, [selectedTab, categories]);

  const filteredRecommendedProducts = useMemo(() => {
    const result = recommendedProducts.filter((Product) =>
      selectedTab === "Food"
        ? Product.productCategory.isFood
        : !Product.productCategory.isFood
    );
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = result.filter((product) => {
        const titleMatch =
          product.title && product.title.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch =
          product.description &&
          product.description.toLowerCase().includes(lowerCaseQuery);
        return titleMatch || descriptionMatch;
      });
      return filtered;
    } else {
      return result;
    }
  }, [selectedTab, recommendedProducts, searchQuery]);

  const FoodTab = () => {
    return (
      <div className={formWhiteClasses}>
        <h4 className="whiteCardTitle mb-1">Kategorie</h4>
        <div>
          <RadioGroup.Root
            className="categoryContainer"
            value={formData.creditOffer || "default"}
            onValueChange={(value) => handleRadioChange("creditOffer", value)}
            aria-label="View density"
          >
            {!loading &&
              filteredCategories?.map((category, index) => (
                <div className="radioBox categoryItem" key={index}>
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="default"
                    id="r1d"
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="r1">
                    {category.label}
                  </label>
                </div>
              ))}
          </RadioGroup.Root>
        </div>
        <h4 className="whiteCardTitle mb-1" style={{ marginTop: "1rem" }}>
          Allergen
        </h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked1 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c1"
            checked={isChecked1}
            disabled
            onCheckedChange={(checked) => {
              setIsChecked1(checked);
              setValue("canDeliver", checked);
              setFormData({ ...formData, canDeliver: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c1">
            Dieses Produkt enthählt keine Allergene
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked2 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c2"
            checked={isChecked2}
            onCheckedChange={(checked) => {
              setIsChecked2(checked);
              setValue("canPickup", checked);
              setFormData({ ...formData, canPickup: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c2">
            Dieses Produkt enthählt Gluten
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked2 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c2"
            checked={isChecked2}
            onCheckedChange={(checked) => {
              setIsChecked2(checked);
              setValue("canPickup", checked);
              setFormData({ ...formData, canPickup: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c2">
            Dieses Produkt enthählt Lakatos
          </label>
        </div>
      </div>
    );
  };
  const NonFoodTab = () => {
    return (
      <div className={formWhiteClasses}>
        <h4 className="whiteCardTitle mb-1">Kategorie2</h4>
        <div>
          <RadioGroup.Root
            className="categoryContainer"
            value={formData.creditOffer || "default"}
            onValueChange={(value) => handleRadioChange("creditOffer", value)}
            aria-label="View density"
          >
            {filteredCategories.map((category, index) => (
              <div className="radioBox categoryItem" key={index}>
                <RadioGroup.Item
                  className="RadioGroupItem"
                  value="default"
                  id="r1"
                >
                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <label className="Label" htmlFor="r1">
                  {category.label}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
        </div>
        <h4 className="whiteCardTitle mb-1" style={{ marginTop: "1rem" }}>
          Allergen
        </h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked1 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c1"
            checked={isChecked1}
            disabled
            onCheckedChange={(checked) => {
              setIsChecked1(checked);
              setValue("canDeliver", checked);
              setFormData({ ...formData, canDeliver: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c1">
            Dieses Produkt enthählt keine Allergene
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked2 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c2"
            checked={isChecked2}
            onCheckedChange={(checked) => {
              setIsChecked2(checked);
              setValue("canPickup", checked);
              setFormData({ ...formData, canPickup: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c2">
            Dieses Produkt enthählt Gluten
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked2 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c2"
            checked={isChecked2}
            onCheckedChange={(checked) => {
              setIsChecked2(checked);
              setValue("canPickup", checked);
              setFormData({ ...formData, canPickup: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c2">
            Dieses Produkt enthählt Lakatos
          </label>
        </div>
      </div>
    );
  };

  const tabs = useMemo(
    () => [
      { label: "Food", value: "Food", Component: FoodTab },
      { label: "Non Food", value: "Non Food", Component: NonFoodTab },
    ],
    []
  );

  useEffect(() => {
    setValue("deliveryPriceType", selectedDeliveryCostType);
    setValue("deliveryLocationPrices", cityCosts);
    setValue("canDeliver", isChecked1);
    setValue("canPickup", isChecked2);
    setValue("radius", radius);
  }, [
    selectedDeliveryCostType,
    cityCosts,
    isChecked1,
    isChecked2,
    radius,
    setValue,
  ]);

  const formRootClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  });

  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  });

  const handleCheckboxChange = (productId, isChecked) => {
    let updatedSelectedProductIds;
    if (isChecked) {
      updatedSelectedProductIds = [...selectedProductIds, productId];
    } else {
      updatedSelectedProductIds = selectedProductIds.filter(id => id !== productId);
    }
    setSelectedProductIds(updatedSelectedProductIds);
    setFormData({ ...formData, recommendProductIds: updatedSelectedProductIds });
    setValue("recommendProductIds", [...items, updatedSelectedProductIds]);
  };



  const searchClasses = css({
    borderRadius: "12px",
    padding: "16px",
    minWidth: { base: "auto", lg: "500px" },
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    fontSize: "1rem",
  });

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    console.log("first", inputValue);
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setValue("keywords", [...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div className={`${formRootClasses}`}>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <Tabs.Root defaultValue={tabs[0].value} onValueChange={setSelectedTab}>
          <Flex justifyContent="center" alignItems="center" gap="32px">
            <div style={{ display: "flex", justifyContent: "center", width: "50%" }}>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    label={tab.label}
                  />
                ))}
              </TabsList>
            </div>
          </Flex>
          {selectedTab === "Food" ? <FoodTab /> : <NonFoodTab />}
        </Tabs.Root>
      </div>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle mb-1">Darstellung-Display</h4>
        <Flex>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox.Root
              className={`CheckboxRoot ${formData.showAsNewProduct ? "checkbox-checked" : "checkbox-unchecked"}`}
              id="c1"
              checked={formData.showAsNewProduct}
              onCheckedChange={(checked) => {
                setValue("showAsNewProduct", checked);
                setFormData({ ...formData, showAsNewProduct: checked });
              }}
            >
              <Checkbox.Indicator className="CheckboxIndicator">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="Label" htmlFor="c1">
              Neu im Sortiment
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "2rem",
            }}
          >
            <Checkbox.Root
              className={`CheckboxRoot ${formData.showAsPopularProduct ? "checkbox-checked" : "checkbox-unchecked"}`}
              id="c2"
              checked={formData.showAsPopularProduct}
              onCheckedChange={(checked) => {
                setValue("showAsPopularProduct", checked);
                setFormData({ ...formData, showAsPopularProduct: checked });
              }}
            >
              <Checkbox.Indicator className="CheckboxIndicator">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="Label" htmlFor="c2">
              Beliebte Artikel
            </label>
          </div>
        </Flex>
      </div>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle mb-1">Schlagworte & Übersetzung</h4>
        <div>
          <div className="stringsListInput">
            <Form.Field name="keywords">
              <FormControl name="keywords" control={control}>
                <div style={{ position: "relative" }}>
                  <Input
                    className={css({ width: "100%" })}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    value={inputValue}
                  />
                  <button onClick={handleAddItem}>Weiter</button>
                </div>
              </FormControl>
              <Form.Message match="valueMissing">
                {errors?.firstName?.message}
              </Form.Message>
            </Form.Field>
          </div>
          <ul className="stringsList">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{ marginRight: "0.5rem" }}
                >
                  <Icon
                    margin="auto 5px"
                    icon="mdi:close"
                    fontSize={"18px"}
                    aria-hidden
                  />
                </button>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle mb-1">Empfohlene Artikel</h4>
        <p className="smGrey">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever
          since the 1500s, when
        </p>
        <InputWithIcon
          placeholder="Search product or Art.-Nr."
          icon={<Icon icon="mingcute:search-line" />}
          className={classNames(
            "primaryBg searchplaceholder b-none",
            searchClasses
          )}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Artikel auswählen ({filteredRecommendedProducts?.length})
        </h2>
        <div className="scrollbar" id="style-1">
          <div className="force-overflow">
            <Flex flexDirection={"column"} gap={5}>
              {filteredRecommendedProducts.map((product) => (
                <div className="recomProduct" key={product.id}>
                  <Checkbox.Root
                    className={`CheckboxRoot ${selectedProductIds.includes(product.id) ? "checkbox-checked" : "checkbox-unchecked"}`}
                    id={`checkbox-${product.id}`}
                    checked={selectedProductIds.includes(product.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(product.id, checked)
                    }
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Image
                    src={product.image ?? uploadImage}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                  <div>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                  </div>
                </div>
              ))}
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
