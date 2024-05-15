import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import Navbar from './Navbar';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    beverage: '',
    cleanliness: '',
    overallExperience: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('feedbackData'));
    if (storedData && Array.isArray(storedData)) {
      setSubmissions(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const updatedSubmissions = [...submissions, formData];
      localStorage.setItem('feedbackData', JSON.stringify(updatedSubmissions));
      setSubmissions(updatedSubmissions);
      setSubmitted(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    } else if (isNumeric(data.name)) {
      errors.name = "Name should not contain only numbers";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(data.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!data.service) {
      errors.service = "Service quality rating is required";
    }
    if (!data.beverage) {
      errors.beverage = "Beverage quality rating is required";
    }
    if (!data.cleanliness) {
      errors.cleanliness = "Restaurant cleanliness rating is required";
    }
    if (!data.overallExperience) {
      errors.overallExperience = "Overall dining experience rating is required";
    }
    return errors;
  };

  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  return (
    <>
      <Navbar />
      <Container maxW="xl" pt="80px">
        <Box p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <Heading as="h2" size="lg" mb={6}>Aromatic Bar</Heading>
          <Text mb={4}>
            We are committed to providing you with the best dining experience possible, so we welcome your comments.
            Please fill out this questionnaire. Thank you.
          </Text>
          {submitted ? (
            <Text color="green.500">Thank you for completing the information</Text>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl id="name" mb={4} isInvalid={errors.name}>
                <FormLabel>Customer Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                <Text color="red.500">{errors.name}</Text>
              </FormControl>
              <FormControl id="email" mb={4} isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                <Text color="red.500">{errors.email}</Text>
              </FormControl>
              <FormControl id="phone" mb={4} isInvalid={errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                <Text color="red.500">{errors.phone}</Text>
              </FormControl>
              {[
                { label: 'Service Quality', name: 'service' },
                { label: 'Beverage Quality', name: 'beverage' },
                { label: 'Restaurant Cleanliness', name: 'cleanliness' },
                { label: 'Overall Dining Experience', name: 'overallExperience' }
              ].map(({ label, name }) => (
                <FormControl key={name} id={name} mb={4} isInvalid={errors[name]}>
                  <FormLabel>{label}</FormLabel>
                  <RadioGroup
                    name={name}
                    value={formData[name]}
                    onChange={(value) => handleRadioChange(name, value)}
                  >
                    <Stack direction="row">
                      {['Excellent', 'Good', 'Fair', 'Bad'].map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                  <Text color="red.500">{errors[name]}</Text>
                </FormControl>
              ))}
              <Button justifyContent="center" type="submit" colorScheme="teal">Submit</Button>
            </form>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Home;
