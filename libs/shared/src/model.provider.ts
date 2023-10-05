import {
  Asset,
  AssetSchema,
  Example,
  ExampleSchema,
  Ticket,
  TicketSchema,
  Job,
  JobSchema,
  Faq,
  FaqSchema,
} from './schema';
export const DbModels = [
  {
    name: Example.name,
    schema: ExampleSchema,
  },
  {
    name: Asset.name,
    schema: AssetSchema,
  },
  {
    name: Ticket.name,
    schema: TicketSchema,
  },
  {
    name: Job.name,
    schema: JobSchema,
  },
  {
    name: Faq.name,
    schema: FaqSchema,
  },
];
