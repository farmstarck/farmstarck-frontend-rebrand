import { useMemo } from "react";
import { allStates, fetchLGAs } from "@/data/states";

type DropdownOption = {
  value: string;
  label: string;
};

type UseStatesAndLgasOptions = {
  selectedState?: string;
  selectedLga?: string;
  formatStateLabel?: (state: string) => string;
};

const defaultFormatStateLabel = (state: string) => state;

export const useStatesAndLgas = ({
  selectedState = "",
  selectedLga = "",
  formatStateLabel = defaultFormatStateLabel,
}: UseStatesAndLgasOptions = {}) => {
  const stateOptions = useMemo<DropdownOption[]>(
    () =>
      allStates.map((state) => ({
        label: formatStateLabel(state),
        value: state,
      })),
    [formatStateLabel],
  );

  const lgaOptions = useMemo<DropdownOption[]>(
    () =>
      selectedState
        ? fetchLGAs(selectedState).map((lga) => ({
            label: lga,
            value: lga,
          }))
        : [],
    [selectedState],
  );

  const hasSelectedLga = useMemo(
    () =>
      !selectedLga ||
      lgaOptions.some((option) => option.value === selectedLga),
    [lgaOptions, selectedLga],
  );

  return {
    stateOptions,
    lgaOptions,
    hasSelectedLga,
  };
};
