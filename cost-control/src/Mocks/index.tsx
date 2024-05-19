import { setupWorker, SetupWorker } from "msw/browser";
import { groupBillHandlers } from "./Handlers/GroupBill";
import { billHandlers } from "./Handlers/Bill";
import { transactionHandlers } from "./Handlers/Transaction";

const worker: SetupWorker = setupWorker(
    ...groupBillHandlers,
    ...billHandlers,
    ...transactionHandlers
);

export function startWorker(): Promise<void> {
    return worker.start({
        onUnhandledRequest(req, print) {
            return; // Пропустим все запросы, не подходящие под наши хэндлеры
        },
    }) as Promise<void>; // либа не экспортирует нужный интерфейс
}
