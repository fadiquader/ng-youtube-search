import { Component, OnInit } from '@angular/core';
import {SearchResult} from '../models/search-result';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;
  constructor() { }

  ngOnInit() {
  }
  updateResults(results: SearchResult[]): void {
    this.results = results;
    // console.log("results:", this.results); // uncomment to take a look
  }
}
