import {
    execaCommand
} from 'execa';
import { run } from 'node:test';

let running = false;
const retries = 3;

function runAfterCloseBundle() {
    return {
        name: 'run-after-close-bundle',
        async closeBundle() {
            try {

                let r = 0;
                while (r < retries) {

                    if (!running) {
                        running = true;
                        console.log('running yalc push --changed');
                        await execaCommand('yalc push --changed');
                        running = false;
                        break;
                    }

                    await sleep(1000);
                    r = r + 1;
                    if (r >= retries) {
                        console.log('running yalc push --changed ABORTED');
                        running = false;
                        break;
                    }

                }


            } catch (error) {
                running = false;
                console.error(`failed to run yalc push --changed`);
                console.error(error);
            }
        }
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default runAfterCloseBundle;