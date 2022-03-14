import axios from 'axios';

import { gasBuddyQueryString, petrolimexGasPriceQuery, petrolimexGasPriceUrl } from './constants';

const getLocationBySearchTerm = async (search, next) => {
  const { data: { data: { locationBySearchTerm } } } = await axios.post('https://www.gasbuddy.com/graphql', {
    operationName: 'LocationBySearchTerm',
    query: gasBuddyQueryString,
    variables: {
      fuel: 1,
      maxAge: 0,
      search: search,
      cursor: next ? `${next}` : undefined
    }
  });
  return locationBySearchTerm;
};

export const getPriceByLocationName = async (req, res) => {
  const search = (req.query?.search || '');
  let resStations = [];
  let total = 0;
  let next;
  let error;

  while (next !== total - 1) {
    try {
      const locationBySearchTerm = await getLocationBySearchTerm(search, next);

      if (!locationBySearchTerm) break;

      total = locationBySearchTerm.stations.count;
      resStations = [...resStations, ...locationBySearchTerm.stations.results];
      next = parseInt(locationBySearchTerm.stations.cursor.next);
    } catch (e) {
      error = 'Can not get data from GasBuddy';
      break;
    }
  }

  res.json({
    error,
    count: resStations.length,
    station: resStations
  });
};

export const getPriceInVn = async (_, res) => {
  const url = petrolimexGasPriceUrl + petrolimexGasPriceQuery;
  let prices = [];
  let error;

  try {
    const { data: { Objects: originGasPrices } } = await axios.get(url);

    prices = originGasPrices.map(p => ({
      id: p.Alias,
      name: p.EnglishTitle,
      created: p.Created,
      lastModified: p.LastModified,
      zone1Price: p.Zone1Price,
      zone2Price: p.Zone2Price
    }));
  } catch (e) {
    error = 'Can not get prices from Petrolimex';
  }

  res.json({
    error,
    count: prices.length,
    prices
  });
};
