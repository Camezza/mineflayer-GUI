import * as mineflayer from 'mineflayer'; 
import { Item as PrismarineItem } from 'prismarine-item'
import { Window }  from 'prismarine-windows'
import assert from 'assert';

export namespace mineflayer_gui {

    type iterable_type = 'window' | 'display' | 'item';

    // options for changing click variations
    export interface ClickOptions {
        clicktype?:('left' | 'right'),
        clickamount?:number,
        shift?:boolean,
    }

    // parameters to narrow down what to click whilst navigating a GUI
    export interface Item {
        display?:string,
        type?:string,
        data?:number,
        count?:number,
        options?:ClickOptions,
    };

    export class plugin {
        private bot:mineflayer.Bot

        constructor(bot:mineflayer.Bot) {
            this.bot = bot;
        }

        private retreiveIterableType(iterable:(string | Item | Window)): iterable_type {
            switch (typeof iterable) {
                case 'object': // may not work.
                    {
                        if (iterable instanceof Window) {
                            return 'window';
                        }
                        return 'item';
                    }

                case 'string': return 'display';
                default: throw new Error(`Invalid path value specified. Must be either a string (displayname), window, or item.`);
            }
        }

        // retreives a window object by navigating through a specified GUI path
        // If path begins with a string/Item, will begin by searching hotbar.
        // If path contains a window, will begin search from there
        async retreiveWindow(...path:((string | Item | Window)[])): Promise<Window|null> {
            let current_window:Window;
            for (let i = 0, pathlength = path.length; i < pathlength; i++) {
                let iterable = path[i];
                let type = this.retreiveIterableType(iterable);
                assert.ok(type !== 'window' || type === 'window' && i < 1, `Window can only be referenced at beginning of path.`);

                switch (type) {
                    case 'window':
                        {
                            assert.ok(iterable instanceof Window, `'window' type was given when not a window.`);
                            current_window = iterable;
                        }
                    case 'display':
                        {
                            assert.ok(typeof iterable === 'string', `'display' type was given when not a string.`);
                            let item:Item = { display: iterable }
                            if (i < 1) {
                            }
                        }
                    case 'item':
                        {
                            assert.ok(!(iterable instanceof Window) && !(typeof iterable === 'string'), `'item' type was given when not an item.`);
                            let item:Item = iterable;
                            if (i < 1) {
                            }
                        }
                }
            }
        }

        async retreiveItem(...path:((string | Item | Window)[])): Promise<PrismarineItem|null> {

        }

        async clickItem(...path:((string | Item | Window)[])): Promise<boolean|null> {

        }
    }
}