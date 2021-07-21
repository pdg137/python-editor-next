/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { Button, Tooltip } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { RiUsbLine } from "react-icons/ri";
import { FormattedMessage, useIntl } from "react-intl";
import { ConnectionStatus } from "../device/device";
import { useConnectionStatus } from "../device/device-hooks";
import { useProjectActions } from "./project-hooks";

const ConnectDisconnectButton = () => {
  const status = useConnectionStatus();
  const supported = status !== ConnectionStatus.NOT_SUPPORTED;
  const connected = useConnectionStatus() === ConnectionStatus.CONNECTED;
  const actions = useProjectActions();
  const handleToggleConnected = useCallback(async () => {
    if (connected) {
      await actions.disconnect();
    } else {
      await actions.connect();
    }
  }, [connected, actions]);

  const intl = useIntl();
  const tooltip = intl.formatMessage({
    id: connected ? "disconnect-hover" : "connect-hover",
  });
  return (
    <Tooltip hasArrow placement="top-start" label={tooltip}>
      <Button
        size="lg"
        variant={supported && !connected ? "solid" : "outline"}
        leftIcon={<RiUsbLine />}
        onClick={handleToggleConnected}
      >
        <FormattedMessage
          id={connected ? "disconnect-button" : "connect-button"}
        />
      </Button>
    </Tooltip>
  );
};

export default ConnectDisconnectButton;
