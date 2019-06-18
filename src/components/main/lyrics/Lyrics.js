import React, { Component } from "react";
import LyricsSection from "./LyricsSection";

import counter from "../../../logic/counter";
import SectionAnimation from "./logic/section-animation";

class Lyrics extends Component {
   state = {};

   // upadteLyricsBody = function() {
   //    this.setState({});
   // };
   // upadteLyricsBody = this.upadteLyricsBody.bind(this);

   componentDidMount() {
      counter.data.callbackOn.barChange = function() {
         console.log("scroll to next section");
      };
      this.sectionAnimation = new SectionAnimation(
         "lyrics-body",
         "lyrics-section",
         "section-content"
      );
   }

   handleScroll() {
      console.log(this.sectionAnimation.anim());
   }
   handleScroll = this.handleScroll.bind(this);

   render() {
      const allLocations = counter.data.locationOf.allBars();

      const lyricsSections = allLocations.map((item, index) => {
         const currentBar = counter.lyricsData.sections[item[0]].bars[item[1]];

         return (
            <LyricsSection
               key={index}
               text={currentBar.text}
               chords={currentBar.chords}
            />
         );
      });

      return (
         <div>
            <div className="lyrics-header">
               <h2>{counter.lyricsData.title}</h2>
               <p className="lyrics-info row">
                  <span className="lyrics-info-item col">
                     Tempo: {counter.lyricsData.tempo}
                  </span>
                  <span className="lyrics-info-item col">
                     Time: {counter.lyricsData.time}
                  </span>
                  <a
                     className="lyrics-info-item col"
                     href={counter.lyricsData.link}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <i>YT</i>
                  </a>
               </p>
            </div>
            <div className="lyrics-body" onScroll={this.handleScroll}>
               {lyricsSections}
            </div>
         </div>
      );
   }
}

export default Lyrics;
