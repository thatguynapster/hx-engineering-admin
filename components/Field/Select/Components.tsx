import { components, DropdownIndicatorProps, StylesConfig } from "react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

// dropdown indicator
const DropdownIndicator = ({
  hasValue,
  isFocused,
  ...props
}: DropdownIndicatorProps) => (
  <components.DropdownIndicator
    {...{ isFocused, hasValue, ...props }}
    className="text-neutral-10"
  >
    {isFocused && !hasValue ? (
      <ChevronUpIcon className="w-5 h-5 stroke-[3px]" />
    ) : (
      <ChevronDownIcon className="w-5 h-5 stroke-[3px]" />
    )}
  </components.DropdownIndicator>
);

const Components = {
  DropdownIndicator,
  IndicatorSeparator: () => null,
};

/**
 * styles
 */
export const styles: StylesConfig = {
  container: (styles: any) => ({
    ...styles,
    padding: 0,
    width: "100%",
  }),
  input: (styles: any) => ({
    ...styles,
    margin: "0",
  }),
  control: (styles: any, { isDisabled }: any) => ({
    ...styles,
    borderColor: "transparent !important",
    backgroundColor: isDisabled ? "var(--color-gray-100)" : "transparent",
    borderRadius: "0.375rem",
    minHeight: "2.875rem",
    borderWidth: 0,
    boxShadow: "none",
    padding: "0 1rem",
  }),
  menuList: () => ({
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "auto",
    maxHeight: 200,
  }),
  menuPortal: (styles: any) => ({ ...styles, zIndex: 999 }),
  menu: (styles: any) => ({
    ...styles,
    boxShadow: "0 0.0625rem 0.375rem 0.0625rem rgb(6 31 60 / 12%)",
    border: "none !important",
    backgroundColor: "#fff",
    paddingBottom: "0.25rem",
    paddingTop: "0.25rem",
    zIndex: 999,
  }),
  option: (styles: any, { isSelected }: any) => ({
    ...styles,
    backgroundColor:
      (isSelected && "var(--color-gray-100)!important") || "#fff!important",
    padding: "0.625rem 1rem",
    fontSize: "0.875rem",
    color: "#000",
    cursor: "pointer",
    outline: "none",
  }),
  multiValue: (styles: any) => ({
    gap: 4,
    display: "flex",
    borderRadius: 24,
    alignItems: "center",
    padding: "0.5rem 0.75rem",
    backgroundColor: "rgba(var(--color-primary-rgb), 0.15)",
  }),
  multiValueLabel: (styles: any) => ({ fontSize: "0.875rem" }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    padding: "0",
    "&:hover": {
      backgroundColor: "transparent",
      // color: "#000",
    },
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    gap: 4,
    height: "100%",
    padding: "0rem",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    width: "100%",
    // color: "#000",
    cursor: "pointer",
    fontSize: 14,
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "var(--color-neutral-400)",
    fontSize: 14,
    fontWeight: 400,
    margin: "0",
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    cursor: "pointer",
  }),
  dropdownIndicator: (styles: any) => ({ ...styles, padding: 0 }),
};

export default Object.assign(Components, { styles });
