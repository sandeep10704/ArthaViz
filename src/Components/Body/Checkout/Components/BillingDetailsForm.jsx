import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/uiSlice";

import { db } from "../../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import ColorPalette from "../../../../Assets/ColorPalette";
import CustomButton from "../../../CommonComponents/CustomButton";

import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { placeOrder } from "../../../../store/checkoutSlice";

const BillingDetailsForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const labels = [
    { label: "First name *", required: true, key: "firstName" },
    { label: "Last name *", required: true, key: "lastName" },
    { label: "Company name (optional)", required: false, key: "companyName" },
    { label: "Country / Region *", required: true, key: "country" },
    { label: "State *", required: true, key: "state" },
    { label: "Town / City *", required: true, key: "city" },
    { label: "ZIP Code *", required: true, key: "zipCode" },
    { label: "Street address *", required: true, key: "streetAddress" },
    { label: "Apartment, suite, etc. (optional)", required: false, key: "apartment" },



    { label: "Phone *", required: true, key: "phone" },
    { label: "Email address *", required: true, key: "email" },
  ];
  const { userProfile } = useSelector((state) => state.auth);

  const handleUseProfileAsBilling = () => {
    console.log("🔎 userProfile =", userProfile);

    if (!userProfile) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "No profile data found.",
        type: "error",
      }));
      return;
    }

    // Extracting country, state, city as strings from object or directly if string
    const extractLabel = (field) => {
      if (!field) return "";
      if (typeof field === "string") return field;
      if (typeof field === "object" && field.label) return field.label;
      return "";
    };

    const countryName = extractLabel(userProfile.country);
    const stateName = extractLabel(userProfile.state);
    const cityName = extractLabel(userProfile.city);

    console.log("✅ Extracted countryName =", countryName);
    console.log("✅ Extracted stateName =", stateName);
    console.log("✅ Extracted cityName =", cityName);

    // Map profile data to billing form keys
    const nameParts = userProfile.fullName ? userProfile.fullName.trim().split(" ") : [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Map profile data to billing form keys
    const mappedData = {
      firstName,
      lastName,
      phone: userProfile.phone || "",
      email: userProfile.email || user.email || "",
      country: countryName,
      state: stateName,
      city: cityName,
      streetAddress: userProfile.streetAddress || "",
      apartment: userProfile.apartment || "",
      zipCode: userProfile.zipCode || "",
      companyName: userProfile.companyName || "",
    };


    // Process country
    const countryObj = Country.getAllCountries().find(c =>
      c.name.toLowerCase() === countryName.toLowerCase()
    );

    // Process state
    let stateObj = null;
    if (countryObj && stateName) {
      stateObj = State.getStatesOfCountry(countryObj.isoCode).find(s =>
        s.name.toLowerCase() === stateName.toLowerCase()
      );
    }

    // Process city
    let cityObj = null;
    if (countryObj && stateObj && cityName) {
      cityObj = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).find(ci =>
        ci.name.toLowerCase() === cityName.toLowerCase()
      );
    }

    // Update React Selects and mappedData
    if (countryObj) {
      setSelectedCountry({ value: countryObj.isoCode, label: countryObj.name });
      mappedData.country = countryObj.name;
    } else {
      setSelectedCountry(null);
    }

    if (stateObj) {
      setSelectedState({ value: stateObj.isoCode, label: stateObj.name });
      mappedData.state = stateObj.name;
    } else {
      setSelectedState(null);
    }

    if (cityObj) {
      setSelectedCity({ value: cityObj.name, label: cityObj.name });
      mappedData.city = cityObj.name;
    } else {
      setSelectedCity(null);
    }

    setFormData(mappedData);

    console.log("✅ Final mappedData =", mappedData);

    dispatch(uiActions.showNotification({
      open: true,
      message: "Billing data filled from profile.",
      type: "success",
    }));
  };




  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("direct-bank-transfer");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
    : [];

  const cityOptions = selectedCountry && selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
      value: city.name,
      label: city.name,
    }))
    : [];

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    handleInputChange("country", option.label);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (option) => {
    setSelectedState(option);
    handleInputChange("state", option.label);
    setSelectedCity(null);
  };

  const handleCityChange = (option) => {
    setSelectedCity(option);
    handleInputChange("city", option.label);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSaveBillingData = async () => {
    if (!user) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Please login to save billing data.",
        type: "error",
      }));
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { billingData: formData }, { merge: true });
      dispatch(uiActions.showNotification({
        open: true,
        message: "Billing data saved to profile.",
        type: "success",
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Failed to save billing data.",
        type: "error",
      }));
    }
  };

  const handleFillBillingData = async () => {
    if (!user) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Please login to fill billing data.",
        type: "error",
      }));
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.billingData) {
          const saved = data.billingData;
          setFormData(saved);

          const countryObj = Country.getAllCountries().find(c => c.name === saved.country);
          const stateObj = countryObj ? State.getStatesOfCountry(countryObj.isoCode).find(s => s.name === saved.state) : null;
          const cityObj = (countryObj && stateObj) ? City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).find(ci => ci.name === saved.city) : null;

          setSelectedCountry(countryObj ? { value: countryObj.isoCode, label: countryObj.name } : null);
          setSelectedState(stateObj ? { value: stateObj.isoCode, label: stateObj.name } : null);
          setSelectedCity(cityObj ? { value: cityObj.name, label: cityObj.name } : null);

          dispatch(uiActions.showNotification({
            open: true,
            message: "Billing data filled from saved data.",
            type: "success",
          }));
        } else {
          dispatch(uiActions.showNotification({
            open: true,
            message: "No saved billing data found.",
            type: "info",
          }));
        }
      }
    } catch (error) {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Failed to fetch billing data.",
        type: "error",
      }));
    }
  };

  const handleSubmit = () => {
    let errors = {};
    labels.forEach(({ key, required, label }) => {
      if (required && !formData[key]) {
        errors[key] = `${label.replace("*", "")} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      errors.phone = "Enter a valid phone number";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formData, paymentMethod);

      // ✅ Dispatch placeOrder thunk here
      dispatch(placeOrder({ formData, paymentMethod }))
        .unwrap()
        .then(() => {
          console.log("Order placed and product sales updated!");
          // Optional: clear form or cart here if needed
        })
        .catch((error) => {
          console.error("Failed to place order:", error);
        });

    } else {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Please fill all required fields correctly.",
          type: "error",
        })
      );
    }
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "60px",
      borderRadius: "10px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <Box
      sx={{
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        width: { xs: "100%", sm: "100%", md: "1200px" },
        px: { xs: 0, sm: 0, md: 0 },
      }}
    >
      <Box
        sx={{
          mx: "auto",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="h6">BILLING DETAILS</Typography>

          {labels.map(({ label, key }) => (
            <Box key={key} sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <Typography>{label}</Typography>
              {key === "country" ? (
                <Select
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  styles={customSelectStyles}
                />
              ) : key === "state" ? (
                <Select
                  options={stateOptions}
                  value={selectedState}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  isDisabled={!selectedCountry}
                  styles={customSelectStyles}
                />
              ) : key === "city" ? (
                <Select
                  options={cityOptions}
                  value={selectedCity}
                  onChange={handleCityChange}
                  placeholder="Select City"
                  isDisabled={!selectedState}
                  styles={customSelectStyles}
                />
              ) : (
                <TextField
                  variant="outlined"
                  fullWidth
                  value={formData[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  error={!!formErrors[key]}
                  helperText={formErrors[key]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: ColorPalette.line },
                      "&:hover fieldset": { borderColor: ColorPalette.orange },
                      "&.Mui-focused fieldset": { borderColor: ColorPalette.orangeline },
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "60px",
                      borderRadius: "10px",
                      padding: "0 16px",
                      fontFamily: "Outfit",
                      fontWeight: 200,
                    },
                  }}
                />
              )}
            </Box>
          ))}


        </Box>

        <Box
          sx={{
            width: { xs: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="h6">ADDITIONAL INFORMATION</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography>Order notes (optional)</Typography>
            <TextField
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={formData["orderNotes"] || ""}
              onChange={(e) => handleInputChange("orderNotes", e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: "10px",
                  padding: "16px",
                  fontFamily: "Outfit",
                  fontWeight: 200,
                },
              }}
              placeholder="Notes about your order, like special notes for delivery."
            />
          </Box>

        </Box>

      </Box>
      <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
        <CustomButton text={" Save Billing Data"} onClick={handleSaveBillingData} />
        <CustomButton text={" Fill Saved Data"} onClick={handleFillBillingData} />
        <CustomButton text={" Use Profile as Billing"} onClick={handleUseProfileAsBilling} />

      </Box>

      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentChange}
          aria-label="payment method"
          name="payment-method"
        >
          <FormControlLabel value="direct-bank-transfer" control={<Radio />} label="Direct bank transfer" />
          <FormControlLabel value="check-payments" control={<Radio />} label="Check payments" />
          <FormControlLabel value="cash-on-delivery" control={<Radio />} label="Cash on delivery" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>

      <Box sx={{ width: "auto" }}>
        <CustomButton text={"Place an order"} onClick={handleSubmit} />
      </Box>
    </Box>
  );
};

export default BillingDetailsForm;
