import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Image,
  Heading,
  Button,
  
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);
  return (
    <Flex
      bg="teal.500"
      w="100%"
      px={4}
      py={3}
      alignItems="center"
      boxShadow="md"
      position="fixed"
      zIndex={1}
      marginBottom="30px"
    >
      <Flex alignItems="center">
        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAGQAfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/9oACAEBAAAAAPpQAAAAAAAAVI2yACjHKE90wBijROy/QAQ8qwr26wCOWPZ192gAAAAAAAAAAAAAf//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAoCAhADEAAAAAAAAAAJINUACKAAAAAAAAD/xAAqEAACAQQABAMJAAAAAAAAAAABAgMABBESEyEwQSJScSMkMjNQUWBhkf/aAAgBAQABPwD6s8uhAxmo5A+3YimnAZlAzg4pG2UHqSyEMADSO7qGc5JqMtHKX7EEUilQc9zQkkWTUN4SuajbZAemyyEsdTSxOABqeQpo7sudeQ/YqJJ+e4JPpRjfZTqe9QhlJBB6UmRFKQcEIxoXvuhXd+N5qMs8zwwJKU9krO1Azwzrbmcssq8m7rUPHM1wDcyEQ1azu/xXMpbRzrVk7PbIzsWOT0nGyOvmUj+0LYizNvuPWns2IiaOXSVEC7VDauJeNNLu9JblHuW2+bUFrPENOPlMMNcfera2mgKgz5QZ8OPxb//EABYRAAMAAAAAAAAAAAAAAAAAAAFAUP/aAAgBAgEBPwBIxv/EABYRAAMAAAAAAAAAAAAAAAAAAAFAUP/aAAgBAwEBPwBIxv/Z" alt="Logo" boxSize="40px" mr={2} />
        <Heading as="h1" size="md" color="white">Hotel</Heading>
      </Flex>
      <Spacer />
      <Box marginRight="30px">
        
        <Link to="/" color="white" mr={4}>Home</Link>
        
        
      </Box>
      <Box><Link to="/details" color="white" mr={4}>Feedback Details</Link></Box>
      <Spacer />
      <Flex>
        <IconButton
          aria-label="Toggle color mode"
          variant="ghost"
          color="current"
          onClick={toggleColorMode}
          icon={colorModeIcon}
        />
        <Button ml={4} colorScheme="whiteAlpha">Sign In</Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
