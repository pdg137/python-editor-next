/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import {
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  ThemeTypings,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { RiDownload2Line, RiFlashlightFill } from "react-icons/ri";
import { FormattedMessage } from "react-intl";
import { ConnectionStatus } from "../device/device";
import { useConnectionStatus } from "../device/device-hooks";
import DownloadButton from "./DownloadButton";
import FlashButton from "./FlashButton";
import { useProjectActions } from "./project-hooks";

interface DownloadFlashButtonProps {
  size?: ThemeTypings["components"]["Button"]["sizes"];
}

/**
 * The device connection area.
 *
 * It shows the current connection status and allows the user to
 * flash (if WebUSB is supported) or otherwise just download a HEX.
 */
const DownloadFlashButton = ({ size }: DownloadFlashButtonProps) => {
  const status = useConnectionStatus();
  const connected = status === ConnectionStatus.CONNECTED;
  const supported = status !== ConnectionStatus.NOT_SUPPORTED;
  const actions = useProjectActions();
  const buttonWidth = "10rem"; // 8.1 with md buttons
  return (
    <HStack>
      <Menu>
        <ButtonGroup isAttached>
          {connected ? (
            <FlashButton width={buttonWidth} mode={"button"} size={size} />
          ) : (
            <DownloadButton width={buttonWidth} mode={"button"} size={size} />
          )}
          <MenuButton
            variant={connected || !supported ? "solid" : "outline"}
            borderLeft="1px"
            borderRadius="button"
            as={IconButton}
            // Shift to compensate for border radius on the right
            icon={
              <MdMoreVert
                style={{
                  marginLeft: "calc(-0.15 * var(--chakra-radii-button))",
                }}
              />
            }
            size={size}
          />
          <Portal>
            {/* z-index above the xterm.js's layers (currently 10 but given some margin for increases as it can vary with config) */}
            <MenuList zIndex={20}>
              {!connected && (
                <MenuItem
                  target="_blank"
                  rel="noopener"
                  icon={<RiFlashlightFill />}
                  onClick={actions.flash}
                >
                  <FormattedMessage id="flash-button" />
                </MenuItem>
              )}
              {connected && (
                <MenuItem
                  target="_blank"
                  rel="noopener"
                  icon={<RiDownload2Line />}
                  onClick={actions.download}
                >
                  <FormattedMessage id="download-hex" />
                </MenuItem>
              )}
              <MenuItem
                target="_blank"
                rel="noopener"
                icon={<RiDownload2Line />}
                onClick={actions.downloadMainFile}
              >
                <FormattedMessage id="download-python" />
              </MenuItem>
            </MenuList>
          </Portal>
        </ButtonGroup>
      </Menu>
    </HStack>
  );
};

export default DownloadFlashButton;
