'use client';

import { Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../../public/logo.png';
import timem from '../../public/time-message.png';

const Navbar = () => {
  const pathname = usePathname();

  const isCreateCapsulePage = pathname === '/capsule';

  return (
    <Container maxW={'3xl'}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        py={10}
        bg="white"
        color="white"
      >
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={50} />
        </Link>
        {!isCreateCapsulePage && (
          <Link href="/capsule">
            <Image src={timem} alt="Logo" width={30} height={30} />
          </Link>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
