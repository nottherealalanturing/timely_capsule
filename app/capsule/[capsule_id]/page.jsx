'use client';

import EmptyCapsule from '@/app/component/emptycapsule';
import ExpiredCapsule from '@/app/component/expiredcapsule';
import Loader from '@/app/component/loader';
import Countdown from '@/app/component/timeremaining';
import UnveilTimer from '@/app/component/unveiltimer';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ViewCapsulePage = ({ params }) => {
  const [messageData, setMessageData] = useState({});
  const [loading, setLoading] = useState(true);

  const formattedDeletionDate = new Date(
    messageData.deletionTime
  ).toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/craft/${params.capsule_id}`);
        const data = await response.json();
        setMessageData({ ...data });
      } catch (error) {
        console.error('Error generating ID:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.capsule_id]);

  if (loading) {
    return <Loader />;
  }

  if (messageData.url === 0) {
    return <EmptyCapsule />;
  }

  if (new Date(messageData.unveilingDate) > Date.now()) {
    return <UnveilTimer messageData={messageData} />;
  }

  if (new Date(messageData.deletionTime) < Date.now()) {
    return <ExpiredCapsule />;
  }

  return (
    <Box p={8} maxW="xl" mx="auto">
      <VStack spacing={8} align="stretch" py={{ base: 12, md: 30 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {messageData.title}
        </Heading>
        <Text color={'gray.500'}>
          {formattedDeletionDate} | ID: {messageData.url}
        </Text>
        <Divider />
        <Text color={'gray.800'} fontSize="lg">
          {messageData.content}
        </Text>
        <Divider />
        <Text color={'gray.500'}>
          This message will be deleted in{' '}
          <Countdown date={messageData.deletionTime} />
        </Text>
        <HStack spacing={4} align="center" justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{messageData.sender}</Text>
            <Text color={'gray.500'}>{formattedDeletionDate}</Text>
          </VStack>
          <Avatar size="md" name={messageData.sender} bg={'gray.500'} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ViewCapsulePage;
