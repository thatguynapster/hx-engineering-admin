import { UseDropdownMenuOptions, useDropdownMenu } from "@restart/ui";
import { motion } from "framer-motion";
import useIsomorphicEffect from "@restart/hooks/useIsomorphicEffect";
import styled from "styled-components";
import { classNames } from "@/libs";

export interface MenuProps extends UseDropdownMenuOptions {
  className?: string;
  role?: string;
  children?: any;
}

export const Menu = ({ role, className, children, ...rest }: MenuProps) => {
  const [props, { toggle, show, popper }] = useDropdownMenu({
    flip: true,
    fixed: true,
    offset: [0, 8],
    placement: "bottom-end",
    ...rest,
  });

  useIsomorphicEffect(() => {
    if (show) popper?.update();
  }, [show]);

  return (
    <StyledMenu
      {...props}
      role={role}
      initial="hidden"
      animate={show ? "opened" : "hidden"}
      variants={{
        hidden: { opacity: 0, pointerEvents: "none" },
        opened: { opacity: 1, pointerEvents: "inherit" },
      }}
      className={classNames(
        "shadow-3xl bg-white dark:bg-neutral-gray",
        "shadow dark:shadow-none",
        className
      )}
    >
      {children}
    </StyledMenu>
  );
};

/**
 * styles
 */

const StyledMenu = styled(motion.div)`
  z-index: 10;
  display: flex;
  overflow: auto;
  min-width: 240px;
  border-radius: 0.5rem;
  flex-direction: column;
`;

export default Menu;
