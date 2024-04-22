import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handlers/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handlers/envia-console-log2.handler";

it("should register event handlers of a customer", () => {
  const eventDispatcher = new EventDispatcher();
  const Log1EventHandler = new EnviaConsoleLog1Handler();
  const Log2EventHandler = new EnviaConsoleLog2Handler();

  eventDispatcher.register("CustomerCreatedEvent", Log1EventHandler);
  eventDispatcher.register("CustomerCreatedEvent", Log2EventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
  ).toBeDefined();
  expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
    2
  );
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
  ).toMatchObject(Log1EventHandler);  
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
  ).toMatchObject(Log2EventHandler);
});

it("should unregister event handlers of a customer", () => {
  const eventDispatcher = new EventDispatcher();
  const Log1EventHandler = new EnviaConsoleLog1Handler();
  const Log2EventHandler = new EnviaConsoleLog2Handler();

  eventDispatcher.register("CustomerCreatedEvent", Log1EventHandler);
  eventDispatcher.register("CustomerCreatedEvent", Log2EventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
  ).toBeDefined();
  expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
    2
  );
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
  ).toMatchObject(Log1EventHandler);
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
  ).toMatchObject(Log2EventHandler);

  eventDispatcher.unregister("CustomerCreatedEvent", Log1EventHandler);
  expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
    1
  );

  eventDispatcher.unregister("CustomerCreatedEvent", Log2EventHandler);
  expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
    0
  );
});

it("should unregister all event handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const Log1EventHandler = new EnviaConsoleLog1Handler();
  const Log2EventHandler = new EnviaConsoleLog2Handler();

  eventDispatcher.register("CustomerCreatedEvent", Log1EventHandler);
  eventDispatcher.register("CustomerCreatedEvent", Log2EventHandler);

  eventDispatcher.unregisterAll()

  expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined()
})

it("should notify two events when customer is created", () => {
  const eventDispatcher = new EventDispatcher();
  const Log1EventHandler = new EnviaConsoleLog1Handler();
  const Log2EventHandler = new EnviaConsoleLog2Handler();
  eventDispatcher.register("CustomerCreatedEvent", Log1EventHandler);
  eventDispatcher.register("CustomerCreatedEvent", Log2EventHandler);

  const spyLog1EventHandler = jest.spyOn(Log1EventHandler, "handle");
  const spyLog2EventHandler = jest.spyOn(Log2EventHandler, "handle");

  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
  ).toMatchObject(Log1EventHandler);
  expect(
    eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
  ).toMatchObject(Log2EventHandler);

  const customerCreatedEvent = new CustomerCreatedEvent({
    id: "1",
    name: "Customer 1",
  });

  eventDispatcher.notify(customerCreatedEvent);

  expect(spyLog1EventHandler).toHaveBeenCalled();
  expect(spyLog2EventHandler).toHaveBeenCalled();
});
