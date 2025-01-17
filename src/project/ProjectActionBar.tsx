/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { BoxProps, HStack } from "@chakra-ui/react";
import ConnectDisconnectButton from "./ConnectDisconnectButton";
import DownloadFlashButton from "./DownloadFlashButton";
import LoadButton from "./LoadButton";

const ProjectActionBar = (props: BoxProps) => {
  const size = "lg";
  return (
    <HStack
      {...props}
      justifyContent="space-between"
      pt={5}
      pb={5}
      pl={10}
      pr={10}
    >
      <DownloadFlashButton size={size} />
      <HStack spacing={2.5}>
        <ConnectDisconnectButton />
        <LoadButton mode="button" size={size} />
        {/*Disabled for now but kept around as useful for UI discussions. 
        <ShareButton variant="outline" size={size} />
        */}
      </HStack>
    </HStack>
  );
};

export default ProjectActionBar;
