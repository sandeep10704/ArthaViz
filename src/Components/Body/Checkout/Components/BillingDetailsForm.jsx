import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch } from "react-redux"; 
import { uiActions } from "../../../../store/uiSlice"; 

import ColorPalette from "../../../../Assets/ColorPalette";
import CustomButton from "../../../CommonComponents/CustomButton";

const BillingDetailsForm = () => {
  const dispatch = useDispatch(); 

  const labels = [
    { label: "First name *", required: true, key: "firstName" },
    { label: "Last name *", required: true, key: "lastName" },
    { label: "Company name (optional)", required: false, key: "companyName" },
    { label: "Country / Region *", required: true, key: "country" },
    { label: "Street address *", required: true, key: "streetAddress" },
    { label: "Apartment, suite, etc. (optional)", required: false, key: "apartment" },
    { label: "Town / City *", required: true, key: "city" },
    { label: "State *", required: true, key: "state" },
    { label: "ZIP Code *", required: true, key: "zipCode" },
    { label: "Phone *", required: true, key: "phone" },
    { label: "Email address *", required: true, key: "email" },
  ];

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("direct-bank-transfer");

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
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

      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Order placed successfully!",
          type: "success",
        })
      );

      
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
        {/* Billing Details */}
        <Box
          sx={{
            width: { xs: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Outfit",
              fontWeight: 200,
              lineHeight: "100%",
              letterSpacing: "1%",
            }}
          >
            BILLING DETAILS
          </Typography>

          {labels.map(({ label, required, key }) => (
            <Box
              key={key}
              sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: 200,
                  lineHeight: "100%",
                  letterSpacing: "1%",
                }}
              >
                {label}
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={formData[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                error={!!formErrors[key]}
                helperText={formErrors[key]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: ColorPalette.line,
                    },
                    "&:hover fieldset": {
                      borderColor: ColorPalette.orange,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: ColorPalette.orangeline,
                    },
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
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Outfit",
              fontWeight: 200,
              lineHeight: "100%",
              letterSpacing: "1%",
            }}
          >
            ADDITIONAL INFORMATION
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 200,
                lineHeight: "100%",
                letterSpacing: "1%",
              }}
            >
              Order notes (optional)
            </Typography>
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

      {/* Cart Totals */}
      <Typography
        variant="h6"
        mb={2}
        sx={{ fontFamily: "Outfit", fontWeight: 200, mt: 10 }}
      >
        Cart Totals
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
          Subtotal
        </Typography>
        <Typography color={ColorPalette.orange}>$2000</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
          Total
        </Typography>
        <Typography color={ColorPalette.orange}>$2000</Typography>
      </Box>

      {/* Payment Options */}
      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentChange}
          aria-label="payment method"
          name="payment-method"
        >
          <FormControlLabel
            value="direct-bank-transfer"
            control={<Radio />}
            label="Direct bank transfer"
          />
          <FormControlLabel
            value="check-payments"
            control={<Radio />}
            label="Check payments"
          />
          <FormControlLabel
            value="cash-on-delivery"
            control={<Radio />}
            label="Cash on delivery"
          />
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
