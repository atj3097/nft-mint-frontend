import React, { useState, useEffect } from 'react';
import { Box, Button, Image, VStack, Heading, Text, useBoolean } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';
import nftAbi from '../contract-abi/nft-abi.json';
import tokenAbi from '../contract-abi/token-abi.json';
import {ConnectButton} from "@rainbow-me/rainbowkit";

const tokenAddress = '0x34A1D3fff3958843C43aD80F30b94c510645C316';

const NFTMinter = () => {
    // State hooks for the component
    const [hasToken, setHasToken] = useState(false);

    const { config } = usePrepareContractWrite({
        address: tokenAddress,
        abi: tokenAbi.abi,
        functionName: 'tokenFaucet'
    });

    const { data, isLoading, isSuccess, write} = useContractWrite(config)

    useEffect(() => {
        if (isSuccess) {
            console.log("success")
        }
    }, [data, isSuccess])

    return (
        <div>
            <ConnectButton />
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={6} m="40px auto" textAlign="center" bg="white">
            <Heading fontSize="2xl" mb={4}>Mint NFT with the Adam Token</Heading>
            <Box bg="gray.200" h="200px" mb={6} position="relative" boxShadow="inner">
                <Image src="/images/img.png" alt="NFT image" opacity={hasToken ? 1 : 0.4} />
            </Box>
            <VStack spacing={5}>
                {/*<Button variant="solid" size="md" colorScheme="twitter" isLoading={isMinting} isDisabled={isMinting}>*/}
                {/*    Mint NFT*/}
                {/*</Button>*/}
                <Button variant="solid" size="md" colorScheme="twitter"
                        onClick={() => write?.()}>
                    Tap for Token Faucet
                </Button>
            </VStack>
            <Text fontSize="sm" color="gray.600" mt={4}>
                {/*When this button is tapped, the NFT is minted, but should be faded until it's verified that the user has the token.*/}
            </Text>
        </Box>
        </div>
    );
};

export default NFTMinter;
