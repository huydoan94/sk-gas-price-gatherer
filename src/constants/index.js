export const gasBuddyQueryString = `
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

export const petrolimexGasPriceUrl = 'https://portals.petrolimex.com.vn/~apis/portals/cms.item/search?x-request=';

export const petrolimexGasPriceQuery = 'eyJGaWx0ZXJCeSI6eyJBbmQiOlt7IlN5c3RlbUlEIjp7IkVxdWFscyI6IjY3ODNkYz' +
    'EyNzFmZjQ0OWU5NWI3NGE5NTIwOTY0MTY5In19LHsiUmVwb3NpdG9yeUlEIjp7IkVxdWFscyI6ImE5NTQ1MWUyM2I0NzRmZTU4ODZiZmI3Y2Y4ND' +
    'NmNTNjIn19LHsiUmVwb3NpdG9yeUVudGl0eUlEIjp7IkVxdWFscyI6IjM4MDEzNzhmZTFlMDQ1YjFhZmExMGRlN2M1Nzc2MTI0In1' +
    '9LHsiU3RhdHVzIjp7IkVxdWFscyI6IlB1Ymxpc2hlZCJ9fV19LCJTb3J0QnkiOnsiQ3JlYXRlZCI6IkFzY2VuZGluZyJ9LCJQYWdpb' +
    'mF0aW9uIjp7IlRvdGFsUmVjb3JkcyI6LTEsIlRvdGFsUGFnZXMiOjAsIlBhZ2VTaXplIjoxMDAsIlBhZ2VOdW1iZXIiOjB9fQ';
