'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
} from '@chakra-ui/react';
import { MdOutlineSubtitles } from 'react-icons/md';

import DatePicker from '../component/DateTime';

const CreateCapsulePage = () => {
  const [deletionDate, setDeletionDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [formInput, setFormInputs] = useState({});

  const handleDeletionDateChange = (date) => {
    setDeletionDate(date);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormInputs((e) => ({ ...e, [name]: value }));
  };

  const handleSubmit = () => {
    console.log({ ...formInput, startDate, deletionDate });
  };

  return (
    <Box p={8} maxW="xl" mx="auto">
      <VStack spacing={8} align="center">
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Craft Your
          <Text as={'span'} color={'green.400'}>
            Capsule
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Write a timeless message that will transcend through time.
        </Text>
      </VStack>
      <Box mt={8}>
        <form>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="messageTitle">Sender</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={MdOutlineSubtitles} color="gray.300" />}
                />
                <Input
                  type="text"
                  id="send"
                  placeholder="Name of sender"
                  borderRadius="md"
                  name="sender"
                  onChange={handleInputChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="messageTitle">Message Title</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={MdOutlineSubtitles} color="gray.300" />}
                />
                <Input
                  type="text"
                  id="messageTitle"
                  placeholder="Title of your message"
                  borderRadius="md"
                  name="title"
                  onChange={handleInputChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="messageContent">Message Content</FormLabel>
              <Textarea
                id="messageContent"
                placeholder="Write your message here..."
                size="lg"
                borderRadius="md"
                name="message"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deletionDate">Deletion Time</FormLabel>
              <DatePicker
                onChange={(e) => setDeletionDate(e)}
                selectedDate={deletionDate}
                timeCaption="Time"
                dateFormat="h:mm aa"
                showTimeSelectOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="unveilDateTime">Unveil Date & Time</FormLabel>
              <DatePicker
                onChange={(e) => setStartDate(e)}
                selectedDate={startDate}
                showTimeSelect
                dateFormat="Pp"
              />
            </FormControl>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              onClick={handleSubmit}
            >
              Seal this capsule!
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateCapsulePage;
