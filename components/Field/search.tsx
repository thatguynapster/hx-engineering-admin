import { ChangeEvent, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import debounce from "lodash/debounce";
import { Group, Input } from ".";

export interface SearchProps {
  onSearch: (search: string) => void;
  placeholder?: string;
  value?: string;
  delay?: number;
}

export function Search({
  value,
  delay = 500,
  onSearch,
  placeholder,
}: SearchProps) {
  /**
   * state
   */
  const [search, setSearch] = useState<string>(() => value || "");

  /**
   * function
   */
  const handleSearch = useCallback(
    debounce((search: string) => {
      onSearch(search);
    }, delay),
    []
  );

  return (
    <Group name="search" withFormik={false} wrapperClassName="!mb-0 w-full">
      <span className="block pl-4">
        <MagnifyingGlassIcon
          className="h-5 w-5 stroke-[2.5px]"
          color="var(--color-neutral-400)"
        />
      </span>
      <Input
        type="search"
        name="search"
        withFormik={false}
        value={search || ""}
        className="pl-1"
        placeholder={placeholder || "Search ..."}
        onChange={({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          setSearch(value);
          handleSearch(value);
        }}
      />
    </Group>
  );
}
