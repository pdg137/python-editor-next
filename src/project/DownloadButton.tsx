/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { Tooltip } from "@chakra-ui/react";
import { RiDownload2Line } from "react-icons/ri";
import { useIntl } from "react-intl";
import CollapsableButton, {
  CollapsibleButtonProps,
} from "../common/CollapsibleButton";
import { ConnectionStatus } from "../device/device";
import { useConnectionStatus } from "../device/device-hooks";
import { useProjectActions } from "./project-hooks";

interface DownloadButtonProps
  extends Omit<CollapsibleButtonProps, "onClick" | "text" | "icon"> {}

/**
 * Download HEX button.
 *
 * This is the main action for programming the micro:bit if the
 * system does not support WebUSB.
 *
 * Otherwise it's a more minor action.
 */
const DownloadButton = (props: DownloadButtonProps) => {
  const actions = useProjectActions();
  const status = useConnectionStatus();
  const supported = status !== ConnectionStatus.NOT_SUPPORTED;
  const intl = useIntl();
  return (
    <Tooltip
      hasArrow
      placement="top-start"
      label={intl.formatMessage({
        id: "download-hover",
      })}
    >
      <CollapsableButton
        {...props}
        variant={!supported ? "solid" : "outline"}
        icon={<RiDownload2Line />}
        onClick={actions.download}
        text={intl.formatMessage({
          id: "download-button",
        })}
      />
    </Tooltip>
  );
};

export default DownloadButton;
