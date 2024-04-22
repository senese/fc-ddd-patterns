import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChanged from "../address-changed.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<AddressChanged>
{
  handle(event: AddressChanged): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
