"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";

export interface PlacesProps {
  id: string;
  children: any;
  onChange: (
    props: {
      latitude: number;
      longitude: number;
      location: string;
      country_code: string;
    } & ILocation
  ) => void;
  country?: string[];
}

export interface ILocation {
  address: string;
  country?: string;
  country_code?: string;
  city?: string;
  longitude: number;
  latitude: number;
}

export function Places({
  id,
  children,
  onChange,
  country = ["GH"],
}: PlacesProps) {
  const autocompleteRef = useRef<any>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      const locationData = (() => {
        const country = place.address_components.find((i) =>
          i.types.includes("country")
        );

        const region = place.address_components.find((i) =>
          i.types.includes("administrative_area_level_1")
        );

        let city = place.address_components.find((i) =>
          i.types.includes("sublocality_level_1")
        );
        if (!city) {
          city = place.address_components.find((i) =>
            i.types.includes("administrative_area_level_2")
          );
        }

        return {
          address: place.formatted_address,
          country: country?.long_name as string,
          country_code: country?.short_name as string,
          city: city?.long_name as string,
          region: region?.long_name,
          longitude: place.geometry.location.lng(),
          latitude: place.geometry.location.lat(),
        };
      })();

      onChange({
        ...locationData,
        location: place.name,
      });
    }
  };

  return (
    <Autocomplete
      className="w-full h-full"
      restrictions={{ country }}
      onLoad={(autocomplete) => {
        autocompleteRef.current = autocomplete;
      }}
      onPlaceChanged={handlePlaceChanged}
    >
      {children}
    </Autocomplete>
  );
}
