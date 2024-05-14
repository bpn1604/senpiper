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
  Container
} from "@chakra-ui/react"
import Navbar from './Navbar';

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        beverage: '',
        cleanliness: '',
        overallExperience: ''
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
            [name]: value
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
        return errors;
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
                <Text mb={4}>We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</Text>
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
                        {['Service Quality', 'Beverage Quality', 'Restaurant Cleanliness', 'Overall Dining Experience'].map((question, index) => (
                            <div key={index}>
                                <Heading as="h3" size="md" mb={4}>{question}</Heading>
                                <RadioGroup mb={4} name={question.toLowerCase()} value={formData[question.toLowerCase()]}>
                                    <Stack direction="row">
                                        {['Excellent', 'Good', 'Fair', 'Bad'].map((option, idx) => (
                                            <Radio key={idx} value={option} onChange={(e) => handleChange({ target: { name: question.toLowerCase(), value: e.target.value } })}>
                                                {option}
                                            </Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </div>
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
