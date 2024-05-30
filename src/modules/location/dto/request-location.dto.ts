export class CreateLocationDto {
  name: string;
  description?: string;
  sub_status?: string;
  sub_start_date?: Date;
  sub_end_date?: Date;
  media_id?: string;
  venue_operator_id: string;
  location_operator_id: string;
  subscription_id?: string;
}
export class LocationDto {
  venue_operator_id: string;
  location: {
    name: string;
    description?: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: number;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    other: string;
    website: string;
  };
}
