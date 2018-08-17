import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchResult} from '../../models/search-result';
import {YoutubeSearchService} from '../../services/youtube-search.service';
import {fromEvent} from 'rxjs';
import {debounceTime, filter, map, switchAll, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeSearchService, private el: ElementRef) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        filter((text: string) => text.length > 1),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((query: string) => this.youtube.search(query)),
        switchAll(),
        tap(() => this.loading.emit(false)),
      ).subscribe(
      (results: SearchResult[]) => {
        this.results.emit(results);
      },
      (err: any) => { // on error
      },
      () => { // on completion
      }
    );
  }

}
