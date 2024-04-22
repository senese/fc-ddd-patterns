import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressChangedEvent from "./address-changed.event";
import EnviaConsoleLogHandler from "./handlers/envia-console-log.handler";

it("should register event handler of address changed", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new EnviaConsoleLogHandler();

  eventDispatcher.register("AddressChangedEvent", eventHandler);

  expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
  expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(
    1
  );
  expect(
    eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
  ).toMatchObject(eventHandler);
});

it("should unregister event handler of address changed", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new EnviaConsoleLogHandler();

  eventDispatcher.register("AddressChangedEvent", eventHandler);

  expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
  expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(
    1
  );

  expect(
    eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
  ).toMatchObject(eventHandler);

  eventDispatcher.unregister("AddressChangedEvent", eventHandler);

  expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(
    0
  );
});

it("should unregister all event handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const Log1EventHandler = new EnviaConsoleLogHandler();

  eventDispatcher.register("AddressChangedEvent", Log1EventHandler);
  eventDispatcher.unregisterAll();
  expect(
    eventDispatcher.getEventHandlers["AddressChangedEvent"]
  ).toBeUndefined();
});

it("should notify two events when customer is created", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new EnviaConsoleLogHandler();
  eventDispatcher.register("AddressChangedEvent", eventHandler);

  const spyEventHandler = jest.spyOn(eventHandler, "handle");

  expect(
    eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
  ).toMatchObject(eventHandler);

  const addressChangedEvent = new AddressChangedEvent({
    id: "1",
    name: "Nome 1",
    address: "Rua Teste",
  });

  eventDispatcher.notify(addressChangedEvent);

  expect(spyEventHandler).toHaveBeenCalled();
});
