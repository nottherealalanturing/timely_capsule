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
import { useCallback, useEffect, useState } from 'react';

const ViewCapsulePage = ({ params }) => {
  const [messageData, setMessageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showBeforeTime, setShowBeforeTime] = useState(false);
  const [showAtTime, setShowAtTime] = useState(false);
  const [showPastTime, setShowPastTime] = useState(false);

  const formattedDeletionDate = new Date(
    messageData.deletionTime
  ).toLocaleDateString();

  const checkConditions = useCallback(() => {
    const revealdate = new Date(messageData.unveilingDate);
    const deletedate = new Date(messageData.deletionTime);
    const currentTime = Date.now();

    if (revealdate > currentTime) {
      setShowBeforeTime(true);
      setShowAtTime(false);
      setShowPastTime(false);
    } else if (revealdate <= currentTime) {
      setShowBeforeTime(false);
      setShowAtTime(true);
      setShowPastTime(false);
    } else {
    }

    if (deletedate < currentTime) {
      setShowBeforeTime(false);
      setShowAtTime(false);
      setShowPastTime(true);
    }

    return;
  }, [messageData.unveilingDate, messageData.deletionTime]);

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

  useEffect(() => {
    checkConditions();

    const intervalId = setInterval(() => {
      checkConditions();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [checkConditions]);

  if (loading) {
    return <Loader />;
  }

  if (messageData.url === 0) {
    return <EmptyCapsule />;
  }

  /*   if (new Date(messageData.unveilingDate) > Date.now()) {
    return <UnveilTimer messageData={messageData} />;
  }

  if (new Date(messageData.deletionTime) < Date.now()) {
    return <ExpiredCapsule />;
  }
 */
  return (
    <>
      {showBeforeTime && <UnveilTimer messageData={messageData} />}
      {showAtTime && (
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
      )}
      {showPastTime && <ExpiredCapsule />}
    </>
  );
};

export default ViewCapsulePage;
