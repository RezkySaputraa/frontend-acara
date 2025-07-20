import { DateValue } from "@heroui/react";

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean | string;
  isPublished: boolean | string;
  isOnline: boolean | string;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  banner: string | FileList;
}

interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

interface IRegency {
  name: string;
  id: string;
}

export type { IEvent, IRegency, IEventForm };
