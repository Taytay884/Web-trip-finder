import { envs } from './core/config/env';
import {Server, ServerOptions} from './server';

(() => {
    main();
})();

function main(): void {
    const server = new Server({
        port: envs.PORT
    } as ServerOptions);
    void server.start();
}