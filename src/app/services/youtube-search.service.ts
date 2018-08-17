import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {SearchResult} from '../models/search-result';

const YOUTUBE_API_KEY = 'AIzaSyCyHgyf4X7Tq6FKtsYHRGpBSTzDjJHh_ps';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';


@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(private http: HttpClient) {
  }

  search(query: string): Observable<SearchResult[]> {
    const params: HttpParams = new HttpParams()
      .set('key', YOUTUBE_API_KEY)
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', '10')
      .set('q', query);
    const httpOptions = {
      params
    };
    const queryUrl = `${YOUTUBE_API_URL}`;
    return this.http.get(queryUrl, httpOptions)
      .pipe(
        map(response => {
          return <any>response['items']
            .map(item => {
              // console.log("raw item", item); // uncomment if you want to debug
              return new SearchResult({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.high.url
              });
            });
        })
      );
  }
}
