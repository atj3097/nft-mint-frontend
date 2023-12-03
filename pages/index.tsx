import React, { useState, useEffect } from 'react';
import { Box, Button, Image, VStack, Heading, Text, useBoolean } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';
import nftAbi from '../contract-abi/nft-abi.json';
import tokenAbi from '../contract-abi/token-abi.json';

const NFTMinter = () => {
    // State hooks for the component
    const [isMinting, setIsMinting] = useBoolean(false);
    const [isTokenFaucet, setIsTokenFaucet] = useBoolean(false);
    const [hasToken, setHasToken] = useState(false);


    const nftContract = usePrepareContractWrite({
        address: '0x90193C961A926261B756D1E5bb255e67ff9498A1',
        abi: nftAbi.abi
    })

    const tokenContract = usePrepareContractWrite({
        address: '0x34A1D3fff3958843C43aD80F30b94c510645C316',
        abi: tokenAbi.abi
    });

    // Function to simulate minting process
    const handleMint = async () => {
        setIsMinting.on();
        try {
            // Here you would call the mint function on your NFT contract
            const tx = await nftContract.mint(/* parameters if needed */);
            await tx.wait();
            setHasToken(true);
        } catch (error) {
            console.error('Minting failed', error);
        }
        setIsMinting.off();
    };

    // Function to simulate token faucet process
    const handleTokenFaucet = async () => {
        setIsTokenFaucet.on();
        try {
            // Here you would call the faucet function on your token contract
            const tx = await tokenContract.faucet(/* parameters if needed */);
            await tx.wait();
        } catch (error) {
            console.error('Token faucet failed', error);
        }
        setIsTokenFaucet.off();
    };

    // Effect to check if the user has the token
    useEffect(() => {
        if (!signer) return;
        // Here you would check if the connected wallet has the token
        // For example, calling a balanceOf or similar function on the token contract
        const checkHasToken = async () => {
            const address = await signer.getAddress();
            const balance = await tokenContract.balanceOf(address);
            setHasToken(balance > 0);
        };

        checkHasToken();
    }, [signer, tokenContract]);

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={6} m="40px auto" textAlign="center" bg="white">
            <Heading fontSize="2xl" mb={4}>Mint NFT with the Adam Token</Heading>
            <Box bg="gray.200" h="200px" mb={6} position="relative" boxShadow="inner">
                <Image src="/images/img.png" alt="NFT image" opacity={hasToken ? 1 : 0.4} />
            </Box>
            <VStack spacing={5}>
                <Button variant="solid" size="md" colorScheme="twitter" isLoading={isMinting} isDisabled={isMinting} onClick={handleMint}>
                    Mint NFT
                </Button>
                <Button variant="solid" size="md" colorScheme="twitter" isLoading={isTokenFaucet} isDisabled={isTokenFaucet} onClick={handleTokenFaucet}>
                    Tap for Token Faucet
                </Button>
            </VStack>
            <Text fontSize="sm" color="gray.600" mt={4}>
                When this button is tapped, the NFT is minted, but should be faded until it's verified that the user has the token.
            </Text>
        </Box>
    );
};

export default NFTMinter;
