import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Dropdown from '@/components/Dropdown';
import FlightCard from '@/components/FlightCard';
import useAuth from '@/providers/AuthContext';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDebouncedCallback } from 'use-debounce';
const fakeFlights = [
  {
    id: '13554-2507201135--32480-0-12712-2507201425',
    price: {
      raw: 822,
      formatted: '$822',
      pricingOptionId: 'O9-bWcB0HTBb',
    },
    legs: [
      {
        id: '13554-2507201135--32480-0-12712-2507201425',
        origin: {
          id: 'LHR',
          entityId: '95565050',
          name: 'London Heathrow',
          displayCode: 'LHR',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 470,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-07-20T11:35:00',
        arrival: '2025-07-20T14:25:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -32480,
              alternateId: 'BA',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/BA.png',
              name: 'British Airways',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '13554-12712-2507201135-2507201425--32480',
            origin: {
              flightPlaceId: 'LHR',
              displayCode: 'LHR',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Heathrow',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T11:35:00',
            arrival: '2025-07-20T14:25:00',
            durationInMinutes: 470,
            flightNumber: '173',
            marketingCarrier: {
              id: -32480,
              name: 'British Airways',
              alternateId: 'BA',
              allianceId: -32000,
              displayCode: 'BA',
            },
            operatingCarrier: {
              id: -32480,
              name: 'British Airways',
              alternateId: 'BA',
              allianceId: -32000,
              displayCode: 'BA',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    eco: {
      ecoContenderDelta: 10.033703,
    },
    fareAttributes: {},
    tags: ['cheapest', 'shortest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.999,
  },
  {
    id: '13554-2507201155--32171-0-12712-2507201522',
    price: {
      raw: 1168.24,
      formatted: '$1,169',
      pricingOptionId: 'OUq9lV20_iYM',
    },
    legs: [
      {
        id: '13554-2507201155--32171-0-12712-2507201522',
        origin: {
          id: 'LHR',
          entityId: '95565050',
          name: 'London Heathrow',
          displayCode: 'LHR',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 507,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-07-20T11:55:00',
        arrival: '2025-07-20T15:22:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -32171,
              alternateId: 'B6',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/B6.png',
              name: 'jetBlue',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '13554-12712-2507201155-2507201522--32171',
            origin: {
              flightPlaceId: 'LHR',
              displayCode: 'LHR',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Heathrow',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T11:55:00',
            arrival: '2025-07-20T15:22:00',
            durationInMinutes: 507,
            flightNumber: '20',
            marketingCarrier: {
              id: -32171,
              name: 'jetBlue',
              alternateId: 'B6',
              allianceId: 0,
              displayCode: 'B6',
            },
            operatingCarrier: {
              id: -32171,
              name: 'jetBlue',
              alternateId: 'B6',
              allianceId: 0,
              displayCode: 'B6',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.619401,
  },
  {
    id: '16574-2507200725--31927-1-12712-2507201845',
    price: {
      raw: 883.94,
      formatted: '$884',
      pricingOptionId: 'ofAekNIArUjt',
    },
    legs: [
      {
        id: '16574-2507200725--31927-1-12712-2507201845',
        origin: {
          id: 'STN',
          entityId: '95565052',
          name: 'London Stansted',
          displayCode: 'STN',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 980,
        stopCount: 1,
        isSmallestStops: false,
        departure: '2025-07-20T07:25:00',
        arrival: '2025-07-20T18:45:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -31927,
              alternateId: 'AT',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/AT.png',
              name: 'Royal Air Maroc',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '16574-10622-2507200725-2507201045--31927',
            origin: {
              flightPlaceId: 'STN',
              displayCode: 'STN',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Stansted',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'CMN',
              displayCode: 'CMN',
              parent: {
                flightPlaceId: 'CASA',
                displayCode: 'CAS',
                name: 'Casablanca',
                type: 'City',
              },
              name: 'Casablanca Mohamed V.',
              type: 'Airport',
              country: 'Morocco',
            },
            departure: '2025-07-20T07:25:00',
            arrival: '2025-07-20T10:45:00',
            durationInMinutes: 200,
            flightNumber: '809',
            marketingCarrier: {
              id: -31927,
              name: 'Royal Air Maroc',
              alternateId: 'AT',
              allianceId: -32000,
              displayCode: 'AT',
            },
            operatingCarrier: {
              id: -31927,
              name: 'Royal Air Maroc',
              alternateId: 'AT',
              allianceId: -32000,
              displayCode: 'AT',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
          {
            id: '10622-12712-2507201555-2507201845--31927',
            origin: {
              flightPlaceId: 'CMN',
              displayCode: 'CMN',
              parent: {
                flightPlaceId: 'CASA',
                displayCode: 'CAS',
                name: 'Casablanca',
                type: 'City',
              },
              name: 'Casablanca Mohamed V.',
              type: 'Airport',
              country: 'Morocco',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T15:55:00',
            arrival: '2025-07-20T18:45:00',
            durationInMinutes: 470,
            flightNumber: '200',
            marketingCarrier: {
              id: -31927,
              name: 'Royal Air Maroc',
              alternateId: 'AT',
              allianceId: -32000,
              displayCode: 'AT',
            },
            operatingCarrier: {
              id: -31927,
              name: 'Royal Air Maroc',
              alternateId: 'AT',
              allianceId: -32000,
              displayCode: 'AT',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    tags: ['second_cheapest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.454275,
  },
  {
    id: '13554-2507200815--32171-0-12712-2507201128',
    price: {
      raw: 1577.83,
      formatted: '$1,578',
      pricingOptionId: 'U85OXpeG1KTr',
    },
    legs: [
      {
        id: '13554-2507200815--32171-0-12712-2507201128',
        origin: {
          id: 'LHR',
          entityId: '95565050',
          name: 'London Heathrow',
          displayCode: 'LHR',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 493,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-07-20T08:15:00',
        arrival: '2025-07-20T11:28:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -32171,
              alternateId: 'B6',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/B6.png',
              name: 'jetBlue',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '13554-12712-2507200815-2507201128--32171',
            origin: {
              flightPlaceId: 'LHR',
              displayCode: 'LHR',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Heathrow',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T08:15:00',
            arrival: '2025-07-20T11:28:00',
            durationInMinutes: 493,
            flightNumber: '2220',
            marketingCarrier: {
              id: -32171,
              name: 'jetBlue',
              alternateId: 'B6',
              allianceId: 0,
              displayCode: 'B6',
            },
            operatingCarrier: {
              id: -32171,
              name: 'jetBlue',
              alternateId: 'B6',
              allianceId: 0,
              displayCode: 'B6',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    tags: ['third_shortest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.422306,
  },
  {
    id: '13542-2507201305--30598-0-12712-2507201555',
    price: {
      raw: 2146.57,
      formatted: '$2,147',
      pricingOptionId: 'jo-yi4SpBIQX',
    },
    legs: [
      {
        id: '13542-2507201305--30598-0-12712-2507201555',
        origin: {
          id: 'LGW',
          entityId: '95565051',
          name: 'London Gatwick',
          displayCode: 'LGW',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 470,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-07-20T13:05:00',
        arrival: '2025-07-20T15:55:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30598,
              alternateId: 'I)',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/I%29.png',
              name: 'Norse Atlantic Airways (UK)',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '13542-12712-2507201305-2507201555--30598',
            origin: {
              flightPlaceId: 'LGW',
              displayCode: 'LGW',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Gatwick',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T13:05:00',
            arrival: '2025-07-20T15:55:00',
            durationInMinutes: 470,
            flightNumber: '701',
            marketingCarrier: {
              id: -30598,
              name: 'Norse Atlantic Airways (UK)',
              alternateId: 'I)',
              allianceId: 0,
              displayCode: 'Z0',
            },
            operatingCarrier: {
              id: -30598,
              name: 'Norse Atlantic Airways (UK)',
              alternateId: 'I)',
              allianceId: 0,
              displayCode: 'Z0',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    tags: ['second_shortest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.406803,
  },
  {
    id: '16574-2507201140--30460-1-16643-2507201805',
    price: {
      raw: 927.25,
      formatted: '$928',
      pricingOptionId: 'osx8xHDBVJD4',
    },
    legs: [
      {
        id: '16574-2507201140--30460-1-16643-2507201805',
        origin: {
          id: 'STN',
          entityId: '95565052',
          name: 'London Stansted',
          displayCode: 'STN',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'SWF',
          entityId: '95566280',
          name: 'Stewart International',
          displayCode: 'SWF',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 685,
        stopCount: 1,
        isSmallestStops: false,
        departure: '2025-07-20T11:40:00',
        arrival: '2025-07-20T18:05:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30460,
              alternateId: 'IK',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/IK.png',
              name: 'World Ticket Ltd',
            },
          ],
          operating: [
            {
              id: -30789,
              alternateId: 'PA',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/PA.png',
              name: 'Fly Play',
            },
          ],
          operationType: 'not_operated',
        },
        segments: [
          {
            id: '16574-12974-2507201140-2507201345--30460',
            origin: {
              flightPlaceId: 'STN',
              displayCode: 'STN',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Stansted',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'KEF',
              displayCode: 'KEF',
              parent: {
                flightPlaceId: 'REYK',
                displayCode: 'REK',
                name: 'Reykjavik',
                type: 'City',
              },
              name: 'Reykjavik Keflavik',
              type: 'Airport',
              country: 'Iceland',
            },
            departure: '2025-07-20T11:40:00',
            arrival: '2025-07-20T13:45:00',
            durationInMinutes: 185,
            flightNumber: '267',
            marketingCarrier: {
              id: -30460,
              name: 'World Ticket Ltd',
              alternateId: 'IK',
              allianceId: 0,
              displayCode: 'W1',
            },
            operatingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
          {
            id: '12974-16643-2507201600-2507201805--30460',
            origin: {
              flightPlaceId: 'KEF',
              displayCode: 'KEF',
              parent: {
                flightPlaceId: 'REYK',
                displayCode: 'REK',
                name: 'Reykjavik',
                type: 'City',
              },
              name: 'Reykjavik Keflavik',
              type: 'Airport',
              country: 'Iceland',
            },
            destination: {
              flightPlaceId: 'SWF',
              displayCode: 'SWF',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'Stewart International',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T16:00:00',
            arrival: '2025-07-20T18:05:00',
            durationInMinutes: 365,
            flightNumber: '204',
            marketingCarrier: {
              id: -30460,
              name: 'World Ticket Ltd',
              alternateId: 'IK',
              allianceId: 0,
              displayCode: 'W1',
            },
            operatingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    tags: ['third_cheapest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.39811,
  },
  {
    id: '16574-2507201140--30789-1-16643-2507201805',
    price: {
      raw: 1061.97,
      formatted: '$1,062',
      pricingOptionId: 'zoxHOEaVz487',
    },
    legs: [
      {
        id: '16574-2507201140--30789-1-16643-2507201805',
        origin: {
          id: 'STN',
          entityId: '95565052',
          name: 'London Stansted',
          displayCode: 'STN',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'SWF',
          entityId: '95566280',
          name: 'Stewart International',
          displayCode: 'SWF',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 685,
        stopCount: 1,
        isSmallestStops: false,
        departure: '2025-07-20T11:40:00',
        arrival: '2025-07-20T18:05:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30789,
              alternateId: 'PA',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/PA.png',
              name: 'Fly Play',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '16574-12974-2507201140-2507201345--30789',
            origin: {
              flightPlaceId: 'STN',
              displayCode: 'STN',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Stansted',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'KEF',
              displayCode: 'KEF',
              parent: {
                flightPlaceId: 'REYK',
                displayCode: 'REK',
                name: 'Reykjavik',
                type: 'City',
              },
              name: 'Reykjavik Keflavik',
              type: 'Airport',
              country: 'Iceland',
            },
            departure: '2025-07-20T11:40:00',
            arrival: '2025-07-20T13:45:00',
            durationInMinutes: 185,
            flightNumber: '801',
            marketingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            operatingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
          {
            id: '12974-16643-2507201600-2507201805--30789',
            origin: {
              flightPlaceId: 'KEF',
              displayCode: 'KEF',
              parent: {
                flightPlaceId: 'REYK',
                displayCode: 'REK',
                name: 'Reykjavik',
                type: 'City',
              },
              name: 'Reykjavik Keflavik',
              type: 'Airport',
              country: 'Iceland',
            },
            destination: {
              flightPlaceId: 'SWF',
              displayCode: 'SWF',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'Stewart International',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T16:00:00',
            arrival: '2025-07-20T18:05:00',
            durationInMinutes: 365,
            flightNumber: '121',
            marketingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            operatingCarrier: {
              id: -30789,
              name: 'Fly Play',
              alternateId: 'PA',
              allianceId: 0,
              displayCode: 'OG',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.389729,
  },
  {
    id: '16574-2507201140--31915,-32753-1-12712-2507201650',
    price: {
      raw: 985.42,
      formatted: '$986',
      pricingOptionId: 'n8RiVnmsC43Z',
    },
    legs: [
      {
        id: '16574-2507201140--31915,-32753-1-12712-2507201650',
        origin: {
          id: 'STN',
          entityId: '95565052',
          name: 'London Stansted',
          displayCode: 'STN',
          city: 'London',
          country: 'United Kingdom',
          isHighlighted: false,
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
          isHighlighted: false,
        },
        durationInMinutes: 610,
        stopCount: 1,
        isSmallestStops: false,
        departure: '2025-07-20T11:40:00',
        arrival: '2025-07-20T16:50:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -31915,
              alternateId: 'FR',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/FR.png',
              name: 'Ryanair',
            },
            {
              id: -32753,
              alternateId: 'EI',
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/EI.png',
              name: 'Aer Lingus',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '16574-16422-2507201140-2507201310--31915',
            origin: {
              flightPlaceId: 'STN',
              displayCode: 'STN',
              parent: {
                flightPlaceId: 'LOND',
                displayCode: 'LON',
                name: 'London',
                type: 'City',
              },
              name: 'London Stansted',
              type: 'Airport',
              country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'SNN',
              displayCode: 'SNN',
              parent: {
                flightPlaceId: 'SHAN',
                displayCode: 'SNN',
                name: 'Shannon',
                type: 'City',
              },
              name: 'Shannon',
              type: 'Airport',
              country: 'Ireland',
            },
            departure: '2025-07-20T11:40:00',
            arrival: '2025-07-20T13:10:00',
            durationInMinutes: 90,
            flightNumber: '310',
            marketingCarrier: {
              id: -31915,
              name: 'Ryanair',
              alternateId: 'FR',
              allianceId: 0,
              displayCode: 'FR',
            },
            operatingCarrier: {
              id: -31915,
              name: 'Ryanair',
              alternateId: 'FR',
              allianceId: 0,
              displayCode: 'FR',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
          {
            id: '16422-12712-2507201435-2507201650--32753',
            origin: {
              flightPlaceId: 'SNN',
              displayCode: 'SNN',
              parent: {
                flightPlaceId: 'SHAN',
                displayCode: 'SNN',
                name: 'Shannon',
                type: 'City',
              },
              name: 'Shannon',
              type: 'Airport',
              country: 'Ireland',
            },
            destination: {
              flightPlaceId: 'JFK',
              displayCode: 'JFK',
              parent: {
                flightPlaceId: 'NYCA',
                displayCode: 'NYC',
                name: 'New York',
                type: 'City',
              },
              name: 'New York John F. Kennedy',
              type: 'Airport',
              country: 'United States',
            },
            departure: '2025-07-20T14:35:00',
            arrival: '2025-07-20T16:50:00',
            durationInMinutes: 435,
            flightNumber: '111',
            marketingCarrier: {
              id: -32753,
              name: 'Aer Lingus',
              alternateId: 'EI',
              allianceId: 0,
              displayCode: 'EI',
            },
            operatingCarrier: {
              id: -32753,
              name: 'Aer Lingus',
              alternateId: 'EI',
              allianceId: 0,
              displayCode: 'EI',
            },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: true,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.372042,
  },
];
const flightsAPI = 'https://sky-scrapper.p.rapidapi.com/api/';
function Home() {
  const { logout } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [departure, setDeparture] = useState<string>('');
  const [arrival, setArrival] = useState<string>('');
  const [depAirports, setDepAirports] = useState<any[]>([]);
  const [arrAirports, setArrAirports] = useState<any[]>([]);
  const [selectedDepAirport, setSelectedDepAirport] = useState<any>(null);
  const [selectedArrAirport, setSelectedArrAirport] = useState<any>(null);
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedAirport = useDebouncedCallback(getAirports, 750);
  const depAirportsOptions = depAirports?.map((airport: any) => ({
    label: airport.name,
    value: `${airport.skyId}-${airport.entityId}`,
  }));
  const arrAirportsOptions = arrAirports?.map((airport: any) => ({
    label: airport.name,
    value: `${airport.skyId}-${airport.entityId}`,
  }));
  const isSearchDisabled =
    !selectedDepAirport || !selectedArrAirport || !departDate;
  function handleAirportChange(text: string, type: 'departure' | 'arrival') {
    if (type === 'departure') {
      setDeparture(text);
    } else {
      setArrival(text);
    }
    if (text.length > 2) {
      debouncedAirport(text, type);
    }
  }
  function scrollToTop() {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  function handleScroll(event: any) {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollButton(scrollY > 100);
  }

  async function getAirports(query: string, type: 'departure' | 'arrival') {
    try {
      const { data: response } = await axios.get(
        flightsAPI + 'v1/flights/searchAirport',
        {
          params: { query },
          headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_SKYSCRAPPER_API_KEY,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          },
        }
      );
      const airports = response.data.filter(
        (airport: any) =>
          airport.navigation.entityType.toLowerCase() !== 'airport'
      );
      const airportsFormated = airports.map((airport: any) => ({
        entityId: airport.navigation.entityId,
        skyId: airport.skyId,
        name: airport.presentation.suggestionTitle,
        country: airport.presentation.subtitle,
      }));
      if (type === 'departure') {
        setDepAirports(airportsFormated);
      } else {
        setArrAirports(airportsFormated);
      }
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  }
  async function searchFlights() {
    if (!selectedDepAirport || !selectedArrAirport || !departDate) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'Please select both departure and arrival airports and a departure date.',
      });
      return;
    }

    setIsLoading(true);
    setFlights([]);

    try {
      const [depSkyId, depEntityId] = selectedDepAirport.split('-');
      const [arrSkyId, arrEntityId] = selectedArrAirport.split('-');
      const date = departDate?.toISOString().split('T')[0];

      const { data: response } = await axios.get(
        flightsAPI + 'v2/flights/searchFlights',
        {
          params: {
            originSkyId: depSkyId,
            destinationSkyId: arrSkyId,
            originEntityId: depEntityId,
            destinationEntityId: arrEntityId,
            date,
            cabinClass: 'economy',
            adults: 1,
            sortBy: 'best',
            currency: 'USD',
            market: 'en-US',
            countryCode: 'US',
          },
          headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_SKYSCRAPPER_API_KEY,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          },
        }
      );

      if (response.data && response.data.itineraries) {
        setFlights(response.data.itineraries);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `Found ${response.data.itineraries.length} flights`,
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'No flights found',
          text2: 'Try different dates or airports',
        });
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to search flights. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function getAirportName(
    value: string,
    type: 'departure' | 'arrival'
  ): string {
    const airports = type === 'departure' ? depAirports : arrAirports;
    const airport = airports.find(
      (airport: any) => `${airport.skyId}-${airport.entityId}` === value
    );
    return airport ? airport.name : '';
  }

  useEffect(() => {
    console.log('Flights ', flights);
  }, [flights]);
  const { height: screenHeight } = Dimensions.get('window');
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView
        ref={scrollViewRef}
        className='flex-1  p-5'
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text className='text-white font-bold text-2xl'>
          Find Your Perfect Flight
        </Text>
        <Text className='text-[#9ca3af] text-sm mt-2'>
          Search and compare flights from hundreds of airlines
        </Text>
        <View className=' w-full bg-[#1f2937f6] gap-3 justify-center items-center p-3 mt-10 border border-gray-600 rounded-lg'>
          <View className='flex flex-row items-center gap-2 w-full'>
            <Text className='text-white font-bold'>Search Flights</Text>
          </View>
          <View className='w-full gap-3'>
            <Dropdown
              label='From (search to get suggestions)*'
              data={depAirportsOptions}
              value={selectedDepAirport}
              onSelectionChange={setSelectedDepAirport}
              search={true}
              onSearch={(text) => handleAirportChange(text, 'departure')}
              placeholder='Origin City or Airport'
              Icon={
                <FontAwesome5 name='plane-departure' size={18} color='gray' />
              }
            />
            <Dropdown
              label='To (search to get suggestions)*'
              data={arrAirportsOptions}
              value={selectedArrAirport}
              onSelectionChange={setSelectedArrAirport}
              search={true}
              onSearch={(text) => handleAirportChange(text, 'arrival')}
              placeholder='Arrival City or Airport'
              Icon={
                <FontAwesome5 name='plane-arrival' size={18} color='gray' />
              }
            />
          </View>
          <View className='flex-row items-center justify-between w-full gap-2'>
            <View className='flex-1'>
              <DatePicker
                label='Departure Date*'
                value={departDate}
                onChange={setDepartDate}
              />
            </View>
            <View className='flex-1'>
              <DatePicker
                label='Return Date'
                value={returnDate}
                onChange={setReturnDate}
              />
            </View>
          </View>
          <Button
            disabled={isSearchDisabled || isLoading}
            onPress={searchFlights}
            color='primary'
            Icon={
              isLoading ? (
                <ActivityIndicator size={18} color='black' />
              ) : (
                <Fontisto name='zoom' size={18} color='black' />
              )
            }
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </Button>
        </View>
        <View className='w-full mt-5'>
          {isLoading ? (
            <View className='bg-[#1f2937f6] p-4 rounded-lg border border-gray-600'>
              <Text className='text-white font-bold mb-2'>
                Searching for flights...
              </Text>
              <Text className='text-gray-400'>
                Please wait while we search for the best flights for you.
              </Text>
            </View>
          ) : flights.length > 0 ? (
            <View>
              {/* Flight route info */}
              <View className='bg-[#1f2937f6] p-3 rounded-lg border border-gray-600 mb-4'>
                <Text className='text-white font-medium text-center'>
                  {getAirportName(selectedDepAirport, 'departure')} {'->'}
                  {getAirportName(selectedArrAirport, 'arrival')}
                </Text>
                <Text className='text-gray-400 text-sm text-center mt-1'>
                  {departDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>

              <View className='flex-row justify-between items-center mb-4'>
                <Text className='text-white font-bold text-lg'>
                  Flight Results ({flights.length})
                </Text>
                <View className='flex-row items-center'>
                  <MaterialIcons name='sort' size={20} color='gray' />
                  <Text className='text-gray-400 ml-1'>Sort by: Best</Text>
                </View>
              </View>

              {flights.map((flight, index) => (
                <FlightCard key={flight.id || index} flight={flight} />
              ))}
            </View>
          ) : (
            <View className='bg-[#1f2937f6] p-4 rounded-lg border border-gray-600'>
              <Text className='text-white font-bold mb-2'>Flight Results</Text>
              <Text className='text-gray-400'>
                Search for flights to see results here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Scroll to top button*/}
      {showScrollButton && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={{
            position: 'absolute',
            right: 20,
            top: screenHeight - 150 - 24,
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'rgba(31, 41, 55, 0.9)',
            borderWidth: 1,
            borderColor: '#4B5563',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 10,
          }}
        >
          <Entypo name='arrow-with-circle-up' size={20} color='white' />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Home;
