import {
  dimensionProps,
  separatorPixels,
  useSplitViewContext,
} from "./context";
import { Box, Flex } from "@chakra-ui/react";

const SplitViewDivider = () => {
  const {
    collapsed,
    direction,
    handleMouseDown,
    handleTouchStart,
    handleTouchEndOrMouseUp,
  } = useSplitViewContext();
  const cursor = direction === "row" ? "col-resize" : "row-resize";
  return collapsed ? null : (
    <Flex
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEndOrMouseUp}
      cursor={cursor}
      alignSelf="stretch"
      alignItems="center"
    >
      <Box
        height="100%"
        {...dimensionProps(direction, `${separatorPixels}px`)}
        backgroundColor="gray.50"
      />
    </Flex>
  );
};

export default SplitViewDivider;
