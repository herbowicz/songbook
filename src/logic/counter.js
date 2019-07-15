class Counter {
    constructor(lyricsData) {
        const counter = this;

        this.iteration = 0;
        this.action = {
            start: function() {
                const delay = (60 / counter.data.tempo) * 1000;
                const songTiming = counter.data.songTiming();
                const iterationDelay =
                    counter.data.songTiming() * counter.data.barDelay;
                const callback = callback => {
                    callback
                        ? callback()
                        : console.warn(
                              "Assign function to both properties of counter.data.callbackOn"
                          );
                };

                counter.isRun = setInterval(function() {
                    callback(counter.data.callbackOn.eachIteration);

                    counter.iteration++;
                    if (
                        (counter.iteration - 1) % songTiming === 0 &&
                        counter.iteration !== 1 &&
                        counter.iteration - 1 > iterationDelay
                    ) {
                        if (counter.data.lyricsEnd()) {
                            counter.action.pause();
                            counter.data.callbackOn.lyricsEnd();
                            counter.data.currentlyMarkedSectionIndex = 0;
                        } else {
                            callback(counter.data.callbackOn.barChange);
                        }
                    }
                }, delay);
            },
            pause: function() {
                clearInterval(counter.isRun);
                counter.isRun = 0;
                counter.iteration = 0;
                counter.data.callbackOn.metronomStop();
            },
            toggle: function() {
                if (counter.isRun) {
                    this.pause();
                } else {
                    this.start();
                }
            },
            restart: function() {
                if (counter.isRun && counter.data.allowRestart) {
                    console.log("restart");
                    this.pause();
                    this.start();
                }
            }
        };

        this.data = {
            callbackOn: {
                _eachIteration: null,
                set eachIteration(value) {
                    this._eachIteration = value;
                },
                get eachIteration() {
                    return this._eachIteration;
                },
                _barChange: null,
                set barChange(value) {
                    this._barChange = value;
                },
                get barChange() {
                    return this._barChange;
                },
                _lyricsEnd: null,
                set lyricsEnd(value) {
                    this._lyricsEnd = value;
                },
                get lyricsEnd() {
                    return this._lyricsEnd;
                },
                _metronomStop: null,
                set metronomStop(value) {
                    this._metronomStop = value;
                },
                get metronomStop() {
                    return this._metronomStop;
                }
            },
            _tempo: lyricsData.tempo,
            set tempo(value) {
                this._tempo = value;
                if (counter.data.isRun) {
                    counter.pause();
                    counter.start();
                }
            },
            get tempo() {
                return this._tempo;
            },
            songTiming: function() {
                const slashIndex = lyricsData.time.search("/");
                const meterString = lyricsData.time.substring(0, slashIndex);
                return Number(meterString);
            },
            locationOfAllBars: function() {
                const sections = counter.lyricsData.sections;
                const map = sections.map(function(section, secIndex) {
                    return section.bars.map(function(bar, barIndex) {
                        return [secIndex, barIndex];
                    });
                });
                const reduced = map.reduce(function(total, item) {
                    return total.concat(item);
                });
                return reduced;
            },
            _currentlyMarkedSectionIndex: 0,
            get currentlyMarkedSectionIndex() {
                return this._currentlyMarkedSectionIndex;
            },
            set currentlyMarkedSectionIndex(value) {
                this._currentlyMarkedSectionIndex = value;
            },
            lyricsEnd: function() {
                return (
                    counter.data.currentlyMarkedSectionIndex ===
                    counter.data.locationOfAllBars().length - 1
                );
            },
            _barDelay: 0,
            get barDelay() {
                return this._barDelay;
            },
            set barDelay(value) {
                this._barDelay = value;
            },
            _allowRestart: true,
            get allowRestart() {
                return this._allowRestart;
            },
            set allowRestart(value) {
                this._allowRestart = value;
            }
        };

        this.lyricsData = lyricsData;
        this.isRun = 0;
    }
}

export default Counter;
