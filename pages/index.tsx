import React from 'react';
import { Box, Button, Image, VStack, Heading, Text, useBoolean } from '@chakra-ui/react';


const NFTMinter = () => {
    // State hooks to handle the button's disabled state and loading state
    const [isMinting, setIsMinting] = useBoolean(false);
    const [isTokenFaucet, setIsTokenFaucet] = useBoolean(false);

    // Function to simulate minting process
    const handleMint = async () => {
        setIsMinting.on();
        // Simulate minting process...
        setIsMinting.off();
    };

    // Function to simulate token faucet process
    const handleTokenFaucet = async () => {
        setIsTokenFaucet.on();
        // Simulate token faucet process...
        setIsTokenFaucet.off();
    };

    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="2xl"
            p={6}
            m="40px auto"
            textAlign="center"
            bg="white"
        >
            <Heading fontSize="2xl" mb={4}>Mint NFT with the Adam Token</Heading>
            <Box
                bg="gray.200"
                h="200px"
                mb={6}
                position="relative"
                boxShadow="inner"
            >
                <Image
                    src="/images/img.png"
                    alt="NFT image"
                />
            </Box>
            <VStack spacing={5}>
                <Button
                    variant="solid"
                    size="md"
                    colorScheme="twitter"
                    isLoading={isMinting}
                    isDisabled={isMinting}
                    onClick={handleMint}
                >
                    Mint NFT
                </Button>
                <Button
                    variant="solid"
                    size="md"
                    colorScheme="twitter"
                    isLoading={isTokenFaucet}
                    isDisabled={isTokenFaucet}
                    onClick={handleTokenFaucet}
                >
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
