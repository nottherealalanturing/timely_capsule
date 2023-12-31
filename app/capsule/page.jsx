'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineSubtitles } from 'react-icons/md';
import DatePicker from '../component/DateTime';
import CapsuleCreatedPage from '../component/successcapsule';
import DurationTimer from '../component/durationtimer';
import { addHoursAndMinutes } from '../utils/dateconverter';

const CreateCapsulePage = () => {
  const [deletionTime, setDeletionTime] = useState(new Date());
  const [unveilingDate, setUnveilingDate] = useState(new Date());
  const [formInput, setFormInputs] = useState({});
  const [createdCapsule, setCreatedCapsule] = useState(false);
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState({ hours: 0, minutes: 1 });

  const handleDeletionTimeChange = (date) => {
    setDeletionTime(
      addHoursAndMinutes(unveilingDate, duration[0], duration[1])
    );
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormInputs((e) => ({ ...e, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      formInput['title'].length !== 0 ||
      formInput['content'].length !== 0 ||
      formInput['sender'].length !== 0
    ) {
      try {
        const response = await fetch('/api/craft', {
          method: 'POST',
          body: JSON.stringify({
            ...formInput,
            unveilingDate,
            deletionTime: addHoursAndMinutes(
              unveilingDate,
              parseInt(duration['hours']),
              parseInt(duration['minutes'])
            ),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        setFormInputs({
          sender: '',
          title: '',
          content: '',
        });

        setUrl(data.url);
        setCreatedCapsule(true);
      } catch (error) {
        console.error('Error generating ID:', error);
      }
    }
  };

  return createdCapsule ? (
    <CapsuleCreatedPage capsuleUrl={url} />
  ) : (
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
          Craft a fleeting message that will grace the fabric of time before
          gracefully fading away.
        </Text>
      </VStack>
      <Box mt={8}>
        <form>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="msgsender">Sender</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<Icon as={MdOutlineSubtitles} color="gray.300" />}
                />
                <Input
                  type="text"
                  id="msgsender"
                  placeholder="Name of sender"
                  borderRadius="md"
                  name="sender"
                  onChange={handleInputChange}
                  value={formInput['sender']}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="messageTitle">Message Title</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<Icon as={MdOutlineSubtitles} color="gray.300" />}
                />
                <Input
                  type="text"
                  id="messageTitle"
                  placeholder="Title of your message"
                  borderRadius="md"
                  name="title"
                  onChange={handleInputChange}
                  value={formInput['title']}
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
                name="content"
                onChange={handleInputChange}
                value={formInput['content']}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="unveilDateTime">Unveil Date & Time</FormLabel>
              <DatePicker
                onChange={(e) => setUnveilingDate(e)}
                selectedDate={unveilingDate}
                showTimeSelect
                dateFormat="Pp"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deletionTime">
                Auto-Delete Time (HH:MM)
              </FormLabel>
            </FormControl>
            <DurationTimer timer={[duration, setDuration]} />

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
