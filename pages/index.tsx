import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Box, Button, Flex} from '@chakra-ui/react';
import {centerAlign} from "consola/utils";

const Home: NextPage = () => {


  return (
    <div className={styles.container}>
        <Flex align="right">
            <ConnectButton />
        </Flex>
        <Flex align="center" justify="center" height="100vh">
        <Box bg="blue" w="300px" h="300px">
            <Flex direction="column" align="center" justify="center" height="100%">
                <Box bg="white" w="150px" h="150px" backgroundImage={}/>
                <Button bg="white" m={4} top={10}>Token Faucet</Button>
                <Button bg="white" m={4} top={5}>Mint NFT</Button>
            </Flex>
        </Box>
        </Flex>
    </div>
  );
};

export default Home;
