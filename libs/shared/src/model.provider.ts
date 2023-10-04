import {
    Asset,
    AssetSchema,
    Example,
    ExampleSchema,
    Ticket,
    TicketSchema,
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
]