import axios from 'axios';

const graphqlQueryString = `
  query LocationBySearchTerm($brandId: Int, $cursor: String, $fuel: Int,
                             $lat: Float, $lng: Float, $maxAge: Int, 
                             $search: String) { 
    locationBySearchTerm(lat: $lat, lng: $lng, search: $search) {
        countryCode   
        displayName   
        latitude   
        longitude   
        regionCode   
        stations(brandId: $brandId, cursor: $cursor, fuel: $fuel, maxAge: $maxAge) {     
            count     
            cursor {  
                next       
            }
            results {
                address {
                    country         
                    line_1         
                    line_2         
                    locality         
                    postal_code         
                    region         
                }       
                badges {         
                    badgeId         
                    callToAction        
                    campaignId        
                    clickTrackingUrl        
                    description       
                    detailsImageUrl         
                    detailsImpressionTrackingUrls         
                    imageUrl         
                    impressionTrackingUrls        
                    targetUrl        
                    title           
                }      
                brandings {        
                    brand_id        
                    branding_type        
                }     
                brands {         
                    brand_id        
                    image_url    
                    name       
                }      
                emergency_status {        
                    has_diesel {         
                        nick_name          
                        report_status           
                        update_date          
                    }         
                    has_gas {         
                        nick_name        
                        report_status        
                        update_date           
                    }        
                    has_power {        
                        nick_name       
                        report_status          
                        update_date          
                    }      
                }       
                enterprise      
                fuels     
                id     
                name    
                offers {         
                    discounts {         
                        grades         
                        pwgb_discount      
                    }        
                    types         
                }      
                pay_status {         
                    is_pay_available       
                }      
                prices {        
                    cash {          
                        nickname        
                        posted_time          
                        price           
                    }      
                    credit {         
                        nickname         
                        posted_time       
                        price           
                    }        
                    discount       
                    fuel_product        
                }     
                ratings_count     
                star_rating       
            }     
        }   
        trends {     
            areaName     
            today     
            todayLow     
            trend     
        }  
    }
  }
`;

const getLocationBySearchTerm = async (search, next) => {
  const { data: { data: { locationBySearchTerm } } } = await axios.post('https://www.gasbuddy.com/graphql', {
    operationName: 'LocationBySearchTerm',
    query: graphqlQueryString,
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

  while (next !== total - 1) {
    const locationBySearchTerm = await getLocationBySearchTerm(search, next);

    if (!locationBySearchTerm) break;

    total = locationBySearchTerm.stations.count;
    resStations = [...resStations, ...locationBySearchTerm.stations.results];
    next = parseInt(locationBySearchTerm.stations.cursor.next);
  }

  res.json({
    count: resStations.length,
    station: resStations
  });
};
