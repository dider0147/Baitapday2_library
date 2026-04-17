const EventEmitter = require('events');

class mEmitter {
    constructor() {
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
        this._targetMaps = new Map();
    }

    emit(...args) {
        this._emiter.emit(...args);
    }

    registerEvent(event, listener, target) {
        this._emiter.on(event, listener);
        this.cacheTargetEvent(event, listener, target);
    }

    registerOnce(event, listener, target) {
        this._emiter.once(event, listener);
        this.cacheTargetEvent(event, listener, target);
    }

    removeEvent(event, listener) {
        this._emiter.removeListener(event, listener);
    }
    cacheTargetEvent(event, listener, target) {
        if (target) {
            if (!this._targetMaps.has(target)) {
                this._targetMaps.set(target, []);
            }
            this._targetMaps.get(target).push({ event, listener });
        }
    }
    removeAllEventsByTarget(target) {
        if (!target || !this._targetMaps || !this._targetMaps.has(target)) {
                return;
            }

        const events = this._targetMaps.get(target);
        events.forEach(item => {
            this._emiter.removeListener(item.event, item.listener);
        });

        this._targetMaps.delete(target);
    }

    destroy() {
        this._emiter.removeAllListeners();
        this._emiter = null;
        mEmitter.instance = null;
    }
}

mEmitter.instance = null;
module.exports = mEmitter;