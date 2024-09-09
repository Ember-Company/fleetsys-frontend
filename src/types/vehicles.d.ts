import { type ReactNode } from 'react';

// export interface StatusColors extends Pick<ChipOwnProps, 'color'>{};
export type StatusColors = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface VTabsConfig {
  title: string;
  panel: ReactNode;
}

export interface VTabsConfigTransformed {
  titles: string[];
  panels: ReactNode[];
}
export interface VehiclePayload {
  name: string;
}

export interface VehicleType {
  id: string;
  company_id: string;
  name: string;
  attributes: VehicleTypeAttribute[];
  vehicles_count: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleTypeAttribute {
  id: string;
  name: string;
}

export type AttributePayload = Pick<VehicleTypeAttribute, 'name'>;

export interface VehicleStatus {
  // map(arg0: (t: any) => any): any;
  id: string;
  company_id: string;
  name: string;
  status_color: StatusColors;
  vehicles_count: number;
  created_at: string;
  updated_at: string;
}

export type VehicleStatusPayload = Pick<VehicleStatus, 'name' | 'status_color'>;
export type VehicleTypePayload = Pick<VehicleType, 'name'>;

export interface Vehicle {
  id: string;
  company_id: string;
  vehicle_type_id: string;
  vehicle_status_id: string;
  current_location_id: string | null;
  fuel_volume_unit: number;
  fuel_type: number;
  system_of_measurement: number;
  primary_meter_unit: number;
  ownership: number;
  name: string;
  primary_meter_value: number | null;
  primary_meter_usage_per_day: number | null;
  in_service_meter_value: number | null;
  in_service_date: string | null;
  out_of_service_meter_value: number | null;
  out_of_service_date: string | null;
  estimated_service_months: number | null;
  estimated_replacement_mileage: number | null;
  estimated_resale_price_cents: number | null;
  fuel_entries_count: number;
  service_entries_count: number;
  service_reminders_count: number;
  vehicle_renewal_reminders_count: number;
  color: string;
  license_plate: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string | null;
  documents_count: number;
  images_count: number;
  issues_count: number;
  work_orders_count: number;
  registration_expiration_month: string | null;
  registration_state: string | null;
  default_image_url_small: string | null;
  loan_ended_at: string | null;
  loan_description: string | null;
  loan_started_at: string | null;
  loan_vendor_name: string | null;
  inspection_schedules_count: number;
  specs: string | null;
  default_img_url: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  vehicle_type: VehicleType;
  vehicle_status: VehicleStatus;
}
